import { Command } from "commander";
import { getWebhookEvent, listWebhookEvents } from "../../routines/webhooks.js";

export function registerWebhooksCommands(program: Command) {
    const webhooks = program.command("webhooks").description("Webhook event management");

    const events = webhooks.command("event").description("Webhook event operations");

    events
        .command("get")
        .description("Get a webhook event by ID")
        .argument("<id>", "Event ID")
        .action(async (id) => {
            const event = await getWebhookEvent(id);
            console.log(JSON.stringify(event, null, 2));
        });

    events
        .command("list")
        .description("List webhook events")
        .option("-p, --provider <provider>", "Filter by provider")
        .option("--processed <processed>", "Filter by processed status (true/false)")
        .option("--created_after <date>", "Created after (ISO date)")
        .option("--created_before <date>", "Created before (ISO date)")
        .option("-l, --limit <limit>", "Limit results", parseInt)
        .option("-c, --cursor <cursor>", "Cursor for pagination")
        .action(async (options) => {
            const result = await listWebhookEvents({
                ...options,
                processed: options.processed === "true" ? true : options.processed === "false" ? false : undefined,
                created_after: options.created_after ? new Date(options.created_after) : undefined,
                created_before: options.created_before ? new Date(options.created_before) : undefined,
            });
            console.log(JSON.stringify(result, null, 2));
        });
}
