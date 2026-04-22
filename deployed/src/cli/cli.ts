import { Command } from "commander";
import "../env.js"; // Ensure environment variables are loaded
import { registerClientsCommands } from "./commands/clients.js";
import { registerTeamsCommands } from "./commands/teams.js";

import { registerSessionsCommands } from "./commands/sessions.js";
import { registerUsersCommands } from "./commands/users.js";

const program = new Command();

program
  .name("identity-cli")
  .description("CLI for the identity service")
  .version("1.0.0");

registerClientsCommands(program);
registerTeamsCommands(program);

registerSessionsCommands(program);
registerUsersCommands(program);

program.parse(process.argv);
