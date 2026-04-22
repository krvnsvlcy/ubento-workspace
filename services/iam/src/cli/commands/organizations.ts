import { Command } from "commander";
import {
  createOrganizationInvite,
  listOrganizationInvites,
  revokeOrganizationInvite,
} from "../../entities/management/organization/invites.js";
import {
  addMemberToOrganization,
  listOrganizationMembers,
  removeMemberFromOrganization,
} from "../../entities/management/organization/memberships.js";
import {
  createOrganization,
  deleteOrganization,
  getOrganization,
  listOrganizations,
  updateOrganization,
} from "../../entities/management/organization/organization.js";

export function registerOrganizationsCommands(program: Command) {
  const orgs = program
    .command("organizations")
    .description("Organization management");

  orgs
    .command("list")
    .description("List organizations")
    .option("-n, --name <name>", "Filter by name")
    .option("--handle <handle>", "Filter by handle")
    .option("-l, --limit <limit>", "Limit results", parseInt)
    .option("-c, --cursor <cursor>", "Cursor for pagination")
    .action(async (options) => {
      const result = await listOrganizations({
        name: options.name,
        handle: options.handle,
        limit: options.limit,
        cursor: options.cursor,
      });
      console.log(JSON.stringify(result, null, 2));
    });

  orgs
    .command("get")
    .description("Get an organization by ID")
    .argument("<id>", "Organization ID")
    .action(async (id) => {
      const org = await getOrganization(id);
      console.log(JSON.stringify(org, null, 2));
    });

  orgs
    .command("create")
    .description("Create a new organization")
    .requiredOption("-n, --name <name>", "Organization name")
    .requiredOption("--handle <handle>", "Organization handle")
    .requiredOption("-o, --owner <owner_id>", "Owner user ID")
    .action(async (options) => {
      const org = await createOrganization({
        name: options.name,
        handle: options.handle,
        members: [{ user_id: options.owner, role: "organization:owner" }],
      });
      console.log(JSON.stringify(org, null, 2));
    });

  orgs
    .command("update")
    .description("Update an organization")
    .argument("<id>", "Organization ID")
    .option("-n, --name <name>", "New name")
    .option("--handle <handle>", "New handle")
    .action(async (id, options) => {
      const org = await updateOrganization(id, {
        name: options.name,
        handle: options.handle,
      });
      console.log(JSON.stringify(org, null, 2));
    });

  orgs
    .command("delete")
    .description("Delete an organization (soft delete)")
    .argument("<id>", "Organization ID")
    .action(async (id) => {
      await deleteOrganization(id);
      console.log(`Organization ${id} deleted`);
    });

  // ==================== Members ====================

  const members = orgs.command("members").description("Organization members");

  members
    .command("list")
    .description("List organization members")
    .argument("<org_id>", "Organization ID")
    .action(async (orgId) => {
      const result = await listOrganizationMembers(orgId);
      console.log(JSON.stringify(result, null, 2));
    });

  members
    .command("add")
    .description("Add a member to an organization")
    .argument("<org_id>", "Organization ID")
    .requiredOption("-u, --user-id <user_id>", "User ID")
    .requiredOption("-r, --role <role>", "Role (e.g., organization:member)")
    .action(async (orgId, options) => {
      const result = await addMemberToOrganization({
        organizationId: orgId,
        userId: options.userId,
        role: options.role,
      });
      console.log(JSON.stringify(result, null, 2));
    });

  members
    .command("remove")
    .description("Remove a member from an organization")
    .argument("<org_id>", "Organization ID")
    .requiredOption("-u, --user-id <user_id>", "User ID")
    .action(async (orgId, options) => {
      await removeMemberFromOrganization({
        organizationId: orgId,
        userId: options.userId,
      });
      console.log(`User ${options.userId} removed from organization ${orgId}`);
    });

  // ==================== Invites ====================

  const invites = orgs.command("invites").description("Organization invites");

  invites
    .command("list")
    .description("List organization invites")
    .argument("<org_id>", "Organization ID")
    .option("-s, --status <status>", "Filter by status")
    .option("-l, --limit <limit>", "Limit results", parseInt)
    .option("-c, --cursor <cursor>", "Cursor for pagination")
    .action(async (orgId, options) => {
      const result = await listOrganizationInvites({
        organization_id: orgId,
        statuses: options.status ? [options.status] : undefined,
        limit: options.limit,
        cursor: options.cursor,
      });
      console.log(JSON.stringify(result, null, 2));
    });

  invites
    .command("create")
    .description("Create an organization invite")
    .argument("<org_id>", "Organization ID")
    .requiredOption("-e, --email <email>", "Invitee email")
    .requiredOption("-r, --role <role>", "Role to assign")
    .requiredOption("-b, --invited-by <user_id>", "Inviter user ID")
    .option("-x, --expires <seconds>", "Expiration in seconds", parseInt)
    .action(async (orgId, options) => {
      const result = await createOrganizationInvite({
        organization_id: orgId,
        email: options.email,
        role: options.role,
        invited_by: options.invitedBy,
        expires_in_seconds: options.expires,
      });
      console.log(JSON.stringify(result, null, 2));
    });

  invites
    .command("revoke")
    .description("Revoke an organization invite")
    .argument("<invite_id>", "Invite ID")
    .requiredOption("-u, --user-id <user_id>", "User performing revocation")
    .action(async (inviteId, options) => {
      const result = await revokeOrganizationInvite(inviteId, options.userId);
      console.log(JSON.stringify(result, null, 2));
    });
}
