import z from "zod";
import { Tool } from "../../tool.js";

export const agentManagerSchema = z.object({
  actions: z.array(
    z.object({
      tool: z.string(),
      args: z.looseObject({}).nullable().default(null),
    }),
  ),
});

export function buildAgentManagerSchema(
  tools: Tool[],
  finishSchema: z.ZodTypeAny = z.null(),
) {
  return z.object({
    actions: z.array(
      z.discriminatedUnion("tool", [
        z.object({
          tool: z.literal("finish"),
          args: finishSchema,
        }),
        ...tools.map((tool) => {
          return z.object({
            tool: z.literal(tool.name),
            args: tool.args || z.null().default(null),
          });
        }),
      ]),
    ),
  });
}

export type AgentManagerSchema = z.infer<
  ReturnType<typeof buildAgentManagerSchema>
>;

export function fixAgentManagerCommonOutputPitfalls(
  output: unknown,
): [unknown, string[]] {
  const fixes: string[] = [];
  if (
    typeof output === "object" &&
    output &&
    "actions" in output &&
    Array.isArray(output.actions)
  ) {
    for (let i = 0; i < output.actions.length; i++) {
      const act = output.actions[i];
      if (typeof act === "object") {
        // fix args: "null" to null
        if (act.args === "null") {
          act.args = null;
          fixes.push(
            `Fixed args: \"null\" to null for action ${i} (${act.tool})`,
          );
        }

        if (!act.args) {
          act.args = {};
          fixes.push(
            `Fixed args: undefined to {} for action ${i} (${act.tool})`,
          );
        }
      }
    }
  }
  return [output, fixes];
}
