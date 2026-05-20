import { AgentTool } from "../tool.js";

export interface ToolSummary {
  name: string;
  description?: string;
}

export interface Toolkit {
  readonly name: string;
  readonly description?: string;

  listTools(): Promise<ToolSummary[]>;
  getTool(name: string): Promise<AgentTool | undefined>;
}
