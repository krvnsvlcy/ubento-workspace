import {
  ubentoEntities,
  generateBareId,
  makeEntityId,
} from "@ubento/primitives";
import {
  NotFoundError,
  ValidationError,
  prismaListWithCursor,
} from "@ubento/service-toolkit";
import {
  Broker,
  OrganizationInvite,
  OrganizationInviteStatus,
  OrganizationMembership,
} from "@prisma/client";
import { OrganizationMembership as WOOrganizationMembership } from "@workos-inc/node";
import crypto from "crypto";
import prisma from "../../../lib/prisma.js";
import { workos } from "../../../lib/workos.js";
import { getOrganization, workosRoleFromInternalRole } from "./organization.js";

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
function sanitizeInvite(invite: OrganizationInvite) {
  const { token_hash, ...rest } = invite;
  return rest;
}

export async function listOrganizationInvites({
  organization_id,
  statuses,
  email,
  limit,
  cursor,
  sort = "newest",
}: {
  organization_id: string;
  statuses?: OrganizationInviteStatus[];
  email?: string;
  limit?: number;
  cursor?: string;
  sort?: "newest" | "recent";
}) {
  const orderBy =
    sort === "recent"
      ? [{ updated_at: "desc" }, { id: "desc" }]
      : /* default newest */ [{ created_at: "desc" }, { id: "desc" }];

  const { items, ...rest } = await prismaListWithCursor(
    prisma.organizationInvite,
    {
      limit,
      cursor,
      orderBy,
      where: {
        organization_id,
        ...(statuses && { status: { in: statuses } }),
        ...(email && { email: { contains: email, mode: "insensitive" } }),
      },
      resolveCursor: (item) => ({ id: item.id }),
    },
  );

  return {
    ...rest,
    items: items.map(sanitizeInvite),
  };
}
export async function createOrganizationInvite({
  organization_id,
  email,
  role,
  invited_by,
  expires_in_seconds = 259200, // 3 days default
}: {
  organization_id: string;
  email: string;
  role: string;
  invited_by: string;
  expires_in_seconds?: number;
}) {
  // Validate organization exists
  const organization = await getOrganization(organization_id);
  if (!organization) {
    throw new NotFoundError("Organization not found");
  }

  // Check for existing pending invite
  const existingInvite = await prisma.organizationInvite.findFirst({
    where: {
      organization_id,
      email: email.toLowerCase(),
      status: OrganizationInviteStatus.PENDING,
    },
  });

  if (existingInvite) {
    throw new ValidationError("An active invite already exists for this email");
  }

  // Generate invite
  const inviteId = makeEntityId({
    code: ubentoEntities.organizationInvite.code,
    bareId: generateBareId(),
  });

  const { token, hash } = generateInviteToken();
  const expiresAt = new Date(Date.now() + expires_in_seconds * 1000);

  const invite = await prisma.organizationInvite.create({
    data: {
      id: inviteId,
      organization_id,
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
export async function getOrganizationInvite(id: string) {
  const invite = await prisma.organizationInvite.findUnique({
    where: { id },
  });
  return invite ? sanitizeInvite(invite) : null;
}
export async function revokeOrganizationInvite(id: string, revoked_by: string) {
  const invite = await prisma.organizationInvite.findUnique({
    where: { id },
  });

  if (!invite) {
    throw new NotFoundError("Invite not found");
  }

  if (invite.status !== OrganizationInviteStatus.PENDING) {
    throw new ValidationError("Invite cannot be revoked");
  }

  const updatedInvite = await prisma.organizationInvite.update({
    where: { id },
    data: {
      status: OrganizationInviteStatus.REVOKED,
      revoked_at: new Date(),
      revoked_by,
    },
  });

  return sanitizeInvite(updatedInvite);
}
export async function acceptOrganizationInvite({
  id,
  token,
  accepted_by,
}: {
  id: string;
  token: string;
  accepted_by: string;
}) {
  const invite = await prisma.organizationInvite.findUnique({
    where: { id },
  });
  if (!invite) {
    throw new NotFoundError("Invite not found");
  }
  if (invite.status !== OrganizationInviteStatus.PENDING) {
    throw new ValidationError("Invite cannot be accepted");
  }
  if (invite.expires_at < new Date()) {
    throw new ValidationError("Invite has expired");
  }
  if (!checkInviteToken(token, invite.token_hash)) {
    throw new ValidationError("Invalid token");
  }

  const organization = await getOrganization(invite.organization_id);
  if (!organization) {
    throw new NotFoundError("Organization not found");
  }

  let membership: OrganizationMembership | null = null;
  let workosMembership: WOOrganizationMembership | null = null;
  try {
    membership = await prisma.organizationMembership.create({
      data: {
        id: makeEntityId({
          code: ubentoEntities.organizationMembership.code,
          bareId: generateBareId(),
        }),
        organization_id: organization.id,
        user_id: accepted_by,
        role: invite.role,
      },
    });
    if (organization.broker === Broker.WORKOS) {
      workosMembership =
        await workos.userManagement.createOrganizationMembership({
          organizationId: organization.broker_id,
          userId: accepted_by,
          roleSlug: workosRoleFromInternalRole(invite.role),
        });
    }
    const updatedInvite = await prisma.organizationInvite.update({
      where: { id },
      data: {
        status: OrganizationInviteStatus.ACCEPTED,
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
      await prisma.organizationMembership.delete({
        where: { id: membership.id },
      });
    }
    throw e;
  }
}

export async function resolveInviteByToken(token: string) {
  const rawHash = crypto.createHash("sha256").update(token).digest("hex");
  const storedHash = `sha256:${rawHash}`;

  const invite = await prisma.organizationInvite.findFirst({
    where: { token_hash: storedHash },
  });

  if (!invite) throw new NotFoundError("Invite not found");
  if (invite.status !== OrganizationInviteStatus.PENDING)
    throw new ValidationError("Invite invalid");
  if (invite.expires_at < new Date())
    throw new ValidationError("Invite expired");

  const organization = await getOrganization(invite.organization_id);

  return {
    invite: sanitizeInvite(invite),
    organization,
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
  return await acceptOrganizationInvite({
    id: invite.id,
    token,
    accepted_by,
  });
}
