import z from "zod";

export const agentOrchestratorOutputSchema = z.union([
  z.object({
    actions: z.array(
      z.object({
        tool: z.string(),
        args: z.looseObject({}).nullable().default(null),
      }),
    ),
  }),
  z.object({
    response: z.string(),
  }),
]);
export type AgentOrchestratorOutputSchema = z.infer<
  typeof agentOrchestratorOutputSchema
>;

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
