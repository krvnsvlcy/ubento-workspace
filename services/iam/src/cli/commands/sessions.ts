import { Command } from "commander";
import {
  getSession,
  listSessions,
  revokeSession,
} from "../../entities/auth/session.js";

export function registerSessionsCommands(program: Command) {
  const sessions = program
    .command("sessions")
    .description("Session management");

  sessions
    .command("list")
    .description("List sessions")
    .option("-u, --user-id <user_id>", "Filter by user ID")
    .option("-s, --status <status>", "Filter by status")
    .option("-l, --limit <limit>", "Limit results", parseInt)
    .option("-c, --cursor <cursor>", "Cursor for pagination")
    .action(async (options) => {
      const result = await listSessions({
        user_id: options.userId,
        status: options.status,
        limit: options.limit,
        cursor: options.cursor,
      });
      console.log(JSON.stringify(result, null, 2));
    });

  sessions
    .command("get")
    .description("Get a session by ID")
    .argument("<id>", "Session ID")
    .action(async (id) => {
      const session = await getSession(id);
      console.log(JSON.stringify(session, null, 2));
    });

  sessions
    .command("revoke")
    .description("Revoke a session")
    .argument("<id>", "Session ID")
    .action(async (id) => {
      const session = await revokeSession(id);
      console.log(JSON.stringify(session, null, 2));
    });
}
