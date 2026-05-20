import { Command } from "commander";
import {
  createTeamInvite,
  listTeamInvites,
  revokeTeamInvite,
} from "../../entities/management/team/invites.js";
import {
  addMemberToTeam,
  listTeamMembers,
  removeMemberFromTeam,
} from "../../entities/management/team/memberships.js";
import {
  createTeam,
  deleteTeam,
  getTeam,
  listTeams,
  updateTeam,
} from "../../entities/management/team/team.js";

export function registerTeamsCommands(program: Command) {
  const teams = program.command("teams").description("Team management");

  teams
    .command("list")
    .description("List teams")
    .option("-n, --name <name>", "Filter by name")
    .option("--handle <handle>", "Filter by handle")
    .option("-l, --limit <limit>", "Limit results", parseInt)
    .option("-c, --cursor <cursor>", "Cursor for pagination")
    .action(async (options) => {
      const result = await listTeams({
        name: options.name,
        handle: options.handle,
        limit: options.limit,
        cursor: options.cursor,
      });
      console.log(JSON.stringify(result, null, 2));
    });

  teams
    .command("get")
    .description("Get a team by ID")
    .argument("<id>", "Team ID")
    .action(async (id) => {
      const team = await getTeam(id);
      console.log(JSON.stringify(team, null, 2));
    });

  teams
    .command("create")
    .description("Create a new team")
    .requiredOption("-n, --name <name>", "Team name")
    .requiredOption("--handle <handle>", "Team handle")
    .requiredOption("-o, --owner <owner_id>", "Owner user ID")
    .action(async (options) => {
      const team = await createTeam({
        name: options.name,
        handle: options.handle,
        members: [{ user_id: options.owner, role: "team:owner" }],
      });
      console.log(JSON.stringify(team, null, 2));
    });

  teams
    .command("update")
    .description("Update a team")
    .argument("<id>", "Team ID")
    .option("-n, --name <name>", "New name")
    .option("--handle <handle>", "New handle")
    .action(async (id, options) => {
      const team = await updateTeam(id, {
        name: options.name,
        handle: options.handle,
      });
      console.log(JSON.stringify(team, null, 2));
    });

  teams
    .command("delete")
    .description("Delete a team (soft delete)")
    .argument("<id>", "Team ID")
    .action(async (id) => {
      await deleteTeam(id);
      console.log(`Team ${id} deleted`);
    });

  // ==================== Members ====================

  const members = teams.command("members").description("Team members");

  members
    .command("list")
    .description("List team members")
    .argument("<team_id>", "Team ID")
    .option("-l, --limit <limit>", "Limit results", parseInt)
    .option("-c, --cursor <cursor>", "Cursor for pagination")
    .action(async (teamId, options) => {
      const result = await listTeamMembers({
        team_id: teamId,
        limit: options.limit,
        cursor: options.cursor,
      });
      console.log(JSON.stringify(result, null, 2));
    });

  members
    .command("add")
    .description("Add a member to a team")
    .argument("<team_id>", "Team ID")
    .requiredOption("-u, --user-id <user_id>", "User ID")
    .requiredOption("-r, --role <role>", "Role (e.g., team:member)")
    .action(async (teamId, options) => {
      const result = await addMemberToTeam({
        teamId: teamId,
        userId: options.userId,
        role: options.role,
      });
      console.log(JSON.stringify(result, null, 2));
    });

  members
    .command("remove")
    .description("Remove a member from a team")
    .argument("<team_id>", "Team ID")
    .requiredOption("-u, --user-id <user_id>", "User ID")
    .action(async (teamId, options) => {
      await removeMemberFromTeam({
        teamId: teamId,
        userId: options.userId,
      });
      console.log(`User ${options.userId} removed from team ${teamId}`);
    });

  // ==================== Invites ====================

  const invites = teams.command("invites").description("Team invites");

  invites
    .command("list")
    .description("List team invites")
    .argument("<team_id>", "Team ID")
    .option("-s, --status <status>", "Filter by status")
    .option("-l, --limit <limit>", "Limit results", parseInt)
    .option("-c, --cursor <cursor>", "Cursor for pagination")
    .action(async (teamId, options) => {
      const result = await listTeamInvites({
        team_id: teamId,
        statuses: options.status ? [options.status] : undefined,
        limit: options.limit,
        cursor: options.cursor,
      });
      console.log(JSON.stringify(result, null, 2));
    });

  invites
    .command("create")
    .description("Create a team invite")
    .argument("<team_id>", "Team ID")
    .requiredOption("-e, --email <email>", "Invitee email")
    .requiredOption("-r, --role <role>", "Role to assign")
    .requiredOption("-b, --invited-by <user_id>", "Inviter user ID")
    .option("-x, --expires <seconds>", "Expiration in seconds", parseInt)
    .action(async (teamId, options) => {
      const result = await createTeamInvite({
        team_id: teamId,
        email: options.email,
        role: options.role,
        invited_by: options.invitedBy,
        expires_in_seconds: options.expires,
      });
      console.log(JSON.stringify(result, null, 2));
    });

  invites
    .command("revoke")
    .description("Revoke a team invite")
    .argument("<invite_id>", "Invite ID")
    .requiredOption("-u, --user-id <user_id>", "User performing revocation")
    .action(async (inviteId, options) => {
      const result = await revokeTeamInvite(inviteId, options.userId);
      console.log(JSON.stringify(result, null, 2));
    });
}
