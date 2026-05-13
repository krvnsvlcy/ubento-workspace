import { AgentTool } from "../tool";
import { Toolkit } from "./toolkit";

export function createLocalToolkit<TM extends Record<string, AgentTool>>({
  name,
  description,
  tools,
}: {
  name: string;
  description?: string;
  tools: TM;
}): Toolkit & { tools: TM } {
  return {
    name,
    description,
    listTools: async () =>
      Object.values(tools).map((t) => ({
        name: t.name,
        description: t.description,
      })),
    getTool: async (name) => tools[name],
    tools,
  };
}
