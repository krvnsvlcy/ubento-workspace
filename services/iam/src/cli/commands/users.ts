import { Command } from "commander";
import { listUserTeams } from "../../entities/management/team/memberships.js";
import {
  addUserRoles,
  deleteUser,
  getUser,
  listUsers,
  removeUserRoles,
  syncUser,
} from "../../entities/management/user.js";

export function registerUsersCommands(program: Command) {
  const users = program.command("users").description("User management");

  users
    .command("list")
    .description("List users")
    .option("-e, --email <email>", "Filter by email")
    .option("-l, --limit <limit>", "Limit results", parseInt)
    .option("-c, --cursor <cursor>", "Cursor for pagination")
    .action(async (options) => {
      const result = await listUsers({
        email: options.email,
        limit: options.limit,
        cursor: options.cursor,
      });
      console.log(JSON.stringify(result, null, 2));
    });

  users
    .command("get")
    .description("Get a user by ID")
    .argument("<id>", "User ID")
    .action(async (id) => {
      const user = await getUser(id);
      console.log(JSON.stringify(user, null, 2));
    });

  users
    .command("delete")
    .description("Delete a user")
    .argument("<id>", "User ID")
    .action(async (id) => {
      await deleteUser(id);
      console.log(`User ${id} deleted`);
    });

  users
    .command("sync")
    .description("Sync a user")
    .argument("<broker>", "Broker")
    .argument("<broker_id>", "Broker ID")
    .action(async (broker, brokerId) => {
      const user = await syncUser({ broker, brokerId });
      console.log(JSON.stringify(user, null, 2));
    });

  users
    .command("add-roles")
    .description("Add roles to a user")
    .argument("<id>", "User ID")
    .argument("<roles...>", "Roles to add")
    .action(async (id, roles) => {
      const user = await addUserRoles(id, roles);
      console.log(JSON.stringify(user, null, 2));
    });

  users
    .command("remove-roles")
    .description("Remove roles from a user")
    .argument("<id>", "User ID")
    .argument("<roles...>", "Roles to remove")
    .action(async (id, roles) => {
      const user = await removeUserRoles(id, roles);
      console.log(JSON.stringify(user, null, 2));
    });

  users
    .command("teams")
    .description("List teams for a user")
    .argument("<user_id>", "User ID")
    .action(async (userId) => {
      const { items: teams } = await listUserTeams({ user_id: userId });
      console.log(JSON.stringify(teams, null, 2));
    });
}
