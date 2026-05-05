import { Tool } from "../tool.js";

export interface ToolSummary {
  name: string;
  description?: string;
}

export interface ToolSet {
  readonly name: string;
  readonly description?: string;
  readonly enabled: boolean;

  listTools(): Promise<ToolSummary[]>;
  searchTools(query: string): Promise<ToolSummary[]>;
  getTool(name: string): Promise<Tool | undefined>;

  enable(): void;
  disable(): void;
}

export interface ToolSetConfig {
  name: string;
  description?: string;
  listTools: () => Promise<ToolSummary[]>;
  getTool: (name: string) => Promise<Tool | undefined>;
  searchTools?: (query: string) => Promise<ToolSummary[]>;
}

export function createToolSet(config: ToolSetConfig): ToolSet {
  let _enabled = true;

  return {
    name: config.name,
    description: config.description,
    get enabled() {
      return _enabled;
    },

    listTools: config.listTools,
    getTool: config.getTool,
    searchTools:
      config.searchTools ||
      (async (query) => {
        // Default search implementation if needed or just return list
        const tools = await config.listTools();
        return tools.filter(
          (t) => t.name.includes(query) || t.description?.includes(query),
        );
      }),

    enable: () => {
      _enabled = true;
    },
    disable: () => {
      _enabled = false;
    },
  };
}
