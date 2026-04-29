import { Command } from "commander";
import { getOrder, listOrders } from "../../routines/orders.js";

export function registerOrdersCommands(program: Command) {
  const orders = program.command("orders").description("Orders management");

  orders
    .command("get")
    .description("Get an order")
    .argument("<id>", "Order ID")
    .action(async (id) => {
      const order = await getOrder(id);
      console.log(JSON.stringify(order, null, 2));
    });

  orders
    .command("list")
    .description("List orders")
    .option(
      "-t, --organization_id <organization_id>",
      "Filter by organization ID",
    )
    .option("-s, --status <status>", "Filter by status")
    .option("--created_after <date>", "Created after (ISO date)")
    .option("--created_before <date>", "Created before (ISO date)")
    .option("-l, --limit <limit>", "Limit results", parseInt)
    .option("-c, --cursor <cursor>", "Cursor for pagination")
    .action(async (options) => {
      const result = await listOrders({
        ...options,
        created_after: options.created_after
          ? new Date(options.created_after)
          : undefined,
        created_before: options.created_before
          ? new Date(options.created_before)
          : undefined,
      });
      console.log(JSON.stringify(result, null, 2));
    });
}
