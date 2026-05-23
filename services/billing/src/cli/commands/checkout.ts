import { Command } from "commander";
import {
  createCheckout,
  deleteCheckout,
  getCheckout,
  listCheckouts,
  updateCheckout,
} from "../../routines/checkout.js";

export function registerCheckoutCommands(program: Command) {
  const checkout = program
    .command("checkout")
    .description("Checkout management");

  checkout
    .command("create")
    .description("Create a checkout session")
    .argument("<team_id>", "Organization ID")
    .argument("<product_code>", "Product code")
    .argument("<offer_code>", "Offer code")
    .argument("<quantity>", "Quantity", parseFloat)
    .argument("<redirect_url>", "Redirect URL")
    .option("--email <email>", "Customer email")
    .option("--name <name>", "Customer name")
    .option("--duration <duration>", "Session duration in seconds", parseFloat)
    .action(
      async (
        team_id,
        product_code,
        offer_code,
        quantity,
        redirect_url,
        options,
      ) => {
        const session = await createCheckout({
          team_id,
          product_code,
          offer_code,
          quantity,
          redirect_url,
          duration: options.duration,
          data: {
            email: options.email,
            name: options.name,
          },
        });
        console.log(JSON.stringify(session, null, 2));
      },
    );

  checkout
    .command("get")
    .description("Get a checkout session")
    .argument("<id>", "Checkout ID")
    .action(async (id) => {
      const session = await getCheckout(id);
      console.log(JSON.stringify(session, null, 2));
    });

  checkout
    .command("list")
    .description("List checkout sessions")
    .option(
      "-t, --team_id <team_id>",
      "Filter by organization ID",
    )
    .option("-p, --product_code <product_code>", "Filter by product code")
    .option("-o, --offer_code <offer_code>", "Filter by offer code")
    .option("-l, --limit <limit>", "Limit results", parseInt)
    .option("-c, --cursor <cursor>", "Cursor for pagination")
    .action(async (options) => {
      const result = await listCheckouts(options);
      console.log(JSON.stringify(result, null, 2));
    });

  checkout
    .command("update")
    .description("Update a checkout session (metadata only)")
    .argument("<id>", "Checkout ID")
    .argument("<data>", "JSON data string")
    .action(async (id, dataStr) => {
      const data = JSON.parse(dataStr);
      const session = await updateCheckout(id, { data });
      console.log(JSON.stringify(session, null, 2));
    });

  checkout
    .command("delete")
    .description("Delete a checkout session")
    .argument("<id>", "Checkout ID")
    .action(async (id) => {
      const session = await deleteCheckout(id);
      console.log(JSON.stringify(session, null, 2));
    });
}
