import { AgentTool } from "@/execution/tool/tool";
import z from "zod";

export const agentOrchestratorOutputSchema = z.object({
  actions: z.array(
    z.object({
      tool: z.string(),
      args: z.looseObject({}).nullable().default(null),
    }),
  ),
});
export type AgentOrchestratorOutputSchema = z.infer<
  typeof agentOrchestratorOutputSchema
>;

export function buildAgentOrchestratorOutputSchema(
  tools: AgentTool[],
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

export function fixAgentOrchestratorCommonOutputPitfalls(
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
