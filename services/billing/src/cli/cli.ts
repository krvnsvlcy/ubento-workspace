import { Command } from "commander";
import "../env.js"; // Ensure environment variables are loaded
import { registerCatalogCommands } from "./commands/catalog.js";
import { registerCheckoutCommands } from "./commands/checkout.js";
import { registerEntitlementsCommands } from "./commands/entitlements.js";
import { registerOrdersCommands } from "./commands/orders.js";
import { registerSubscriptionsCommands } from "./commands/subscriptions.js";
import { registerUsageCommands } from "./commands/usage.js";
import { registerWebhooksCommands } from "./commands/webhooks.js";

const program = new Command();

program
  .name("billing-cli")
  .description("CLI for the billing service")
  .version("1.0.0");

registerCatalogCommands(program);
registerCheckoutCommands(program);
registerEntitlementsCommands(program);
registerOrdersCommands(program);
registerSubscriptionsCommands(program);
registerUsageCommands(program);
registerWebhooksCommands(program);

program.parse(process.argv);
