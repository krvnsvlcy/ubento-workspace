import {
  Broker,
  TeamInvite,
  TeamInviteStatus,
  TeamMembership,
} from "@prisma/client";
import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/primitives";
import {
  NotFoundError,
  ValidationError,
  prismaListWithCursor,
} from "@ubento/service-toolkit";
import { OrganizationMembership as WOOrganizationMembership } from "@workos-inc/node";
import crypto from "crypto";
import prisma from "../../../lib/prisma.js";
import { workos } from "../../../lib/workos.js";
import { getTeam, workosRoleFromInternalRole } from "./team.js";

function generateInviteToken() {
  const token = crypto.randomBytes(32).toString("hex");
  const hash = crypto.createHash("sha256").update(token).digest("hex");
  return { token, hash };
}
function checkInviteToken(token: string, hash: string) {
  const [algo, hashString] = hash.split(":", 2);
  switch (algo) {
    case "sha256":
      return (
        crypto.createHash("sha256").update(token).digest("hex") === hashString
      );
    default:
      return false;
  }
}
function sanitizeInvite(invite: TeamInvite) {
  const { token_hash, ...rest } = invite;
  return rest;
}

export async function listTeamInvites({
  team_id,
  statuses,
  email,
  limit,
  cursor,
  sort = "newest",
}: {
  team_id: string;
  statuses?: TeamInviteStatus[];
  email?: string;
  limit?: number;
  cursor?: string;
  sort?: "newest" | "recent";
}) {
  const orderBy =
    sort === "recent"
      ? [{ updated_at: "desc" }, { id: "desc" }]
      : /* default newest */ [{ created_at: "desc" }, { id: "desc" }];

  const { items, ...rest } = await prismaListWithCursor(prisma.teamInvite, {
    limit,
    cursor,
    orderBy,
    where: {
      team_id,
      ...(statuses && { status: { in: statuses } }),
      ...(email && { email: { contains: email, mode: "insensitive" } }),
    },
    resolveCursor: (item) => ({ id: item.id }),
  });

  return {
    ...rest,
    items: items.map(sanitizeInvite),
  };
}
export async function createTeamInvite({
  team_id,
  email,
  role,
  invited_by,
  expires_in_seconds = 259200, // 3 days default
}: {
  team_id: string;
  email: string;
  role: string;
  invited_by: string;
  expires_in_seconds?: number;
}) {
  // Validate team exists
  const team = await getTeam(team_id);
  if (!team) {
    throw new NotFoundError("Team not found");
  }

  // Check for existing pending invite
  const existingInvite = await prisma.teamInvite.findFirst({
    where: {
      team_id,
      email: email.toLowerCase(),
      status: TeamInviteStatus.PENDING,
    },
  });

  if (existingInvite) {
    throw new ValidationError("An active invite already exists for this email");
  }

  // Generate invite
  const inviteId = makeEntityId({
    code: ubentoEntities.teamInvite.code,
    bareId: generateBareId(),
  });

  const { token, hash } = generateInviteToken();
  const expiresAt = new Date(Date.now() + expires_in_seconds * 1000);

  const invite = await prisma.teamInvite.create({
    data: {
      id: inviteId,
      team_id,
      email: email.toLowerCase(),
      role,
      token_hash: hash,
      expires_at: expiresAt,
      invited_by,
    },
  });

  return {
    invite: sanitizeInvite(invite),
    token,
  };
}
export async function getTeamInvite(id: string) {
  const invite = await prisma.teamInvite.findUnique({
    where: { id },
  });
  return invite ? sanitizeInvite(invite) : null;
}
export async function revokeTeamInvite(id: string, revoked_by: string) {
  const invite = await prisma.teamInvite.findUnique({
    where: { id },
  });

  if (!invite) {
    throw new NotFoundError("Invite not found");
  }

  if (invite.status !== TeamInviteStatus.PENDING) {
    throw new ValidationError("Invite cannot be revoked");
  }

  const updatedInvite = await prisma.teamInvite.update({
    where: { id },
    data: {
      status: TeamInviteStatus.REVOKED,
      revoked_at: new Date(),
      revoked_by,
    },
  });

  return sanitizeInvite(updatedInvite);
}
export async function acceptTeamInvite({
  id,
  token,
  accepted_by,
}: {
  id: string;
  token: string;
  accepted_by: string;
}) {
  const invite = await prisma.teamInvite.findUnique({
    where: { id },
  });
  if (!invite) {
    throw new NotFoundError("Invite not found");
  }
  if (invite.status !== TeamInviteStatus.PENDING) {
    throw new ValidationError("Invite cannot be accepted");
  }
  if (invite.expires_at < new Date()) {
    throw new ValidationError("Invite has expired");
  }
  if (!invite.token_hash || !checkInviteToken(token, invite.token_hash)) {
    throw new ValidationError("Invalid token");
  }

  const team = await getTeam(invite.team_id);
  if (!team) {
    throw new NotFoundError("Team not found");
  }

  let membership: TeamMembership | null = null;
  let workosMembership: WOOrganizationMembership | null = null;
  try {
    membership = await prisma.teamMembership.create({
      data: {
        id: makeEntityId({
          code: ubentoEntities.teamMembership.code,
          bareId: generateBareId(),
        }),
        team_id: team.id,
        user_id: accepted_by,
        role: invite.role,
      },
    });
    if (team.broker === Broker.WORKOS) {
      workosMembership =
        await workos.userManagement.createOrganizationMembership({
          organizationId: team.broker_id,
          userId: accepted_by,
          roleSlug: workosRoleFromInternalRole(invite.role),
        });
    }
    const updatedInvite = await prisma.teamInvite.update({
      where: { id },
      data: {
        status: TeamInviteStatus.ACCEPTED,
        accepted_by,
        accepted_at: new Date(),
      },
    });

    return sanitizeInvite(updatedInvite);
  } catch (e) {
    if (workosMembership) {
      await workos.userManagement.deleteOrganizationMembership(
        workosMembership.id,
      );
    }
    if (membership) {
      await prisma.teamMembership.delete({
        where: { id: membership.id },
      });
    }
    throw e;
  }
}

export async function resolveInviteByToken(token: string) {
  const rawHash = crypto.createHash("sha256").update(token).digest("hex");
  const storedHash = `sha256:${rawHash}`;

  const invite = await prisma.teamInvite.findFirst({
    where: { token_hash: storedHash },
  });

  if (!invite) throw new NotFoundError("Invite not found");
  if (invite.status !== TeamInviteStatus.PENDING)
    throw new ValidationError("Invite invalid");
  if (invite.expires_at < new Date())
    throw new ValidationError("Invite expired");

  const team = await getTeam(invite.team_id);

  return {
    invite: sanitizeInvite(invite),
    team,
  };
}

export async function acceptInviteByToken({
  token,
  accepted_by,
}: {
  token: string;
  accepted_by: string;
}) {
  const { invite } = await resolveInviteByToken(token);
  return await acceptTeamInvite({
    id: invite.id,
    token,
    accepted_by,
  });
}
