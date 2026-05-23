import { Command } from "commander";
import {
  commitUsageHold,
  getUsageCounter,
  getUsageHold,
  listUsageCounters,
  listUsageEvents,
  releaseUsageHold,
  reserveUsage,
} from "../../routines/usage.js";

export function registerUsageCommands(program: Command) {
  const usage = program.command("usage").description("Usage management");

  // ==================== Counters ====================

  const counters = usage
    .command("counter")
    .description("Usage counter management");

  counters
    .command("get")
    .description("Get a usage counter by ID")
    .argument("<id>", "Counter ID")
    .action(async (id) => {
      const counter = await getUsageCounter(id);
      console.log(JSON.stringify(counter, null, 2));
    });

  counters
    .command("list")
    .description("List usage counters")
    .argument("<team_id>", "Organization ID")
    .option("-c, --code <code>", "Filter by code")
    .option("-g, --group <group>", "Filter by group")
    .option("-l, --limit <limit>", "Limit results", parseInt)
    .option("--cursor <cursor>", "Cursor for pagination")
    .action(async (team_id, options) => {
      const result = await listUsageCounters({
        team_id,
        code: options.code,
        group: options.group,
        limit: options.limit,
        cursor: options.cursor,
      });
      console.log(JSON.stringify(result, null, 2));
    });

  // ==================== Holds ====================

  const holds = usage.command("hold").description("Usage hold management");

  holds
    .command("get")
    .description("Get a usage hold by ID")
    .argument("<id>", "Hold ID")
    .action(async (id) => {
      const hold = await getUsageHold(id);
      console.log(JSON.stringify(hold, null, 2));
    });

  holds
    .command("reserve")
    .description("Reserve usage")
    .argument("<team_id>", "Organization ID")
    .argument("<code>", "Counter code")
    .argument("<amount>", "Amount", parseFloat)
    .argument("<ref>", "Reference ID")
    .argument("<note>", "Note")
    .argument("<duration>", "Duration in ms", parseFloat)
    .option("--data <data>", "Additional JSON data")
    .action(
      async (team_id, code, amount, ref, note, duration, options) => {
        const data = options.data ? JSON.parse(options.data) : undefined;
        const hold = await reserveUsage({
          team_id,
          feature_code: code,
          amount,
          note,
          duration,
          ref,
          data,
        });
        console.log(JSON.stringify(hold, null, 2));
      },
    );

  holds
    .command("commit")
    .description("Commit a usage hold")
    .argument("<id>", "Hold ID")
    .action(async (id) => {
      const result = await commitUsageHold(id);
      console.log(JSON.stringify(result, null, 2));
    });

  holds
    .command("release")
    .description("Release a usage hold")
    .argument("<id>", "Hold ID")
    .action(async (id) => {
      const result = await releaseUsageHold(id);
      console.log(JSON.stringify(result, null, 2));
    });

  // ==================== Events ====================

  const events = usage.command("event").description("Usage event management");

  events
    .command("list")
    .description("List usage events")
    .option(
      "-t, --team_id <team_id>",
      "Filter by organization ID",
    )
    .option("-c, --counter_code <counter_code>", "Filter by counter code")
    .option("-g, --counter_group <counter_group>", "Filter by counter group")
    .option("-r, --ref <ref>", "Filter by reference")
    .option("--created_after <date>", "Created after (ISO date)")
    .option("--created_before <date>", "Created before (ISO date)")
    .option("-l, --limit <limit>", "Limit results", parseInt)
    .option("--cursor <cursor>", "Cursor for pagination")
    .action(async (options) => {
      const result = await listUsageEvents({
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
