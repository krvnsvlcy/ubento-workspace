import { AgentTool } from "../tool";
import { Toolkit } from "./toolkit";

export function createLocalToolkit({
  name,
  description,
  tools,
}: {
  name: string;
  description?: string;
  tools: AgentTool[];
}): Toolkit {
  return {
    name,
    description,
    listTools: async () =>
      tools.map((t) => ({ name: t.name, description: t.description })),
    getTool: async (name) => tools.find((t) => t.name === name),
  };
}
