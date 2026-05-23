import { Command } from "commander";
import {
  Entitlement,
  resolveEntitlementGrantTable,
} from "../../routines/entitlements/entitlements.js";

export function registerEntitlementsCommands(program: Command) {
  const entitlements = program
    .command("entitlements")
    .description("Entitlement management");

  entitlements
    .command("resolve-grant-table")
    .description("Resolve entitlement grant table")
    .argument("<team_id>", "Organization ID")
    .action(async (team_id) => {
      const table = await resolveEntitlementGrantTable(team_id);
      console.log(JSON.stringify(table, null, 2));
    });
  entitlements
    .command("issue-manual-grant")
    .description("Issue a manual entitlement grant")
    .argument("<team_id>", "Organization ID")
    .argument("<feature_code>", "Feature Code")
    .argument("<type>", "Entitlement Type (QUOTA or ACCESS)")
    .argument("<expires_in>", "Duration until expiration (e.g. 5d, 2w, 1m, 1y)")
    .option("-a, --amount <amount>", "Amount for QUOTA type")
    .action(
      async (team_id, feature_code, type, expires_in, options) => {
        const amount = options.amount ? parseInt(options.amount, 10) : null;

        const match = expires_in.trim().match(/^(\d+)([dwmy])$/);
        if (!match) {
          console.error(
            "Invalid expiration duration. Please use format like 5d, 2w, 1m, 1y.",
          );
          process.exit(1);
        }

        const num = parseInt(match[1], 10);
        const unit = match[2];
        const date = new Date();

        if (unit === "d") {
          date.setDate(date.getDate() + num);
        } else if (unit === "w") {
          date.setDate(date.getDate() + num * 7);
        } else if (unit === "m") {
          date.setMonth(date.getMonth() + num);
        } else if (unit === "y") {
          date.setFullYear(date.getFullYear() + num);
        }

        if (type === "QUOTA" && amount === null) {
          console.error("Amount is required for QUOTA type grants.");
          process.exit(1);
        }

        let data: Entitlement;
        if (type === "QUOTA") {
          data = {
            feature_code,
            amount: amount as number,
            merge_strategy: "SUM",
          };
        } else {
          data = {
            feature_code,
          };
        }

        const grant = await (
          await import("../../lib/prisma.js")
        ).default.entitlementGrant.create({
          data: {
            id: crypto.randomUUID(),
            team_id,
            data,
            expires_at: date,
          },
        });

        console.log(`Successfully issued grant ${grant.id}`);
        console.log(JSON.stringify(grant, null, 2));
      },
    );
}
