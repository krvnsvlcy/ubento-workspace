import { Command } from "commander";
import {
  cancelSubscription,
  getActiveSubscription,
  getInvoice,
  getSubscription,
  listInvoices,
  listSubscriptions,
} from "../../routines/subscriptions.js";

export function registerSubscriptionsCommands(program: Command) {
  const subscriptions = program
    .command("subscriptions")
    .description("Subscription management");

  // ==================== Subscriptions ====================

  const subs = subscriptions
    .command("subscription")
    .description("Subscription operations");

  subs
    .command("get")
    .description("Get a subscription by ID")
    .argument("<id>", "Subscription ID")
    .action(async (id) => {
      const sub = await getSubscription(id);
      console.log(JSON.stringify(sub, null, 2));
    });

  subs
    .command("get-active")
    .description("Get active subscription for product")
    .argument("<organization_id>", "Organization ID")
    .argument("<product_code>", "Product code")
    .action(async (organization_id, product_code) => {
      const sub = await getActiveSubscription(organization_id, product_code);
      console.log(JSON.stringify(sub, null, 2));
    });

  subs
    .command("list")
    .description("List subscriptions")
    .option(
      "-t, --organization_id <organization_id>",
      "Filter by organization ID",
    )
    .option("-p, --product_code <product_code>", "Filter by product code")
    .option("-o, --offer_code <offer_code>", "Filter by offer code")
    .option("-s, --status <status>", "Filter by status")
    .option("-l, --limit <limit>", "Limit results", parseInt)
    .option("-c, --cursor <cursor>", "Cursor for pagination")
    .action(async (options) => {
      const result = await listSubscriptions(options);
      console.log(JSON.stringify(result, null, 2));
    });

  subs
    .command("cancel")
    .description("Cancel a subscription")
    .argument("<id>", "Subscription ID")
    .action(async (id) => {
      const sub = await cancelSubscription(id);
      console.log(JSON.stringify(sub, null, 2));
    });

  // ==================== Invoices ====================

  const invoices = subscriptions
    .command("invoice")
    .description("Invoice operations");

  invoices
    .command("get")
    .description("Get an invoice by ID")
    .argument("<id>", "Invoice ID")
    .action(async (id) => {
      const invoice = await getInvoice(id);
      console.log(JSON.stringify(invoice, null, 2));
    });

  invoices
    .command("list")
    .description("List invoices")
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
      const result = await listInvoices({
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
