import { z } from "zod";
import {
  Client,
  StreamableHTTPClientTransport,
} from "../../../utils/mcp_shim.js";
import { LLMContent } from "../../message/llm.js";
import { Tool } from "../../tool.js";
import { createToolSet, ToolSet } from "../tool_set.js";

export enum ExtensionStatus {
  Disconnected = "disconnected",
  Connecting = "connecting",
  Connected = "connected",
  Errored = "errored",
}

export type TokenProvider = () => string | engineStateChanged<string>;

export type AgentExtensionToolDef = {
  name: string;
  inputSchema: any;
  description?: string;
};

export type MCPToolOutput = {
  content: any[];
  structuredContent?: any;
  isError?: boolean;
};

export interface McpToolSetConfig {
  name: string;
  url: string;
  tokenProvider?: TokenProvider;
  headers?: Record<string, string>;
}

export interface McpToolSet extends ToolSet {
  status: ExtensionStatus;
  connect(): engineStateChanged<void>;
  disconnect(): engineStateChanged<void>;
}

export function createMcpToolSet(config: McpToolSetConfig): McpToolSet {
  const client = new Client({
    name: config.name,
    version: "1.0.0",
  });

  let _status = ExtensionStatus.Disconnected;
  let _toolMap: Record<string, AgentExtensionToolDef> | undefined = undefined;
  const _toolInstanceMap: Record<string, Tool> = {};

  const baseToolSet = createToolSet({
    name: config.name,
    listTools: async () => {
      const map = await getToolMap();
      return Object.values(map).map((t: any) => ({
        name: t.name,
        description: t.description,
      }));
    },
    getTool: async (name) => {
      if (_toolInstanceMap[name]) return _toolInstanceMap[name];
      const map = await getToolMap();
      const toolDef = map[name];
      if (!toolDef) return undefined;

      const tool: Tool = {
        name: `${config.name}:${toolDef.name}`,
        description: toolDef.description || "",
        args: z.any() as any, // Standardize on any for dynamic schemas
        run: async (args, action) => {
          await awaitConnected();
          const result = await client.callTool({
            name: toolDef.name,
            arguments: args as any,
          });
          return {
            content: mcpContentToLlmContent(result.content),
            structuredContent: result.structuredContent,
            isError: !!result.isError,
          };
        },
      };

      _toolInstanceMap[name] = tool;
      return tool;
    },
  });

  async function getToolMap(): engineStateChanged<
    Record<string, AgentExtensionToolDef>
  > {
    if (_toolMap) return _toolMap;
    await awaitConnected();
    const result = await client.listTools();
    _toolMap = Object.fromEntries(
      (result.tools as any[]).map((t) => [t.name, t]),
    );
    return _toolMap!;
  }

  async function awaitConnected() {
    if (_status === ExtensionStatus.Connected) return;
    await connect();
  }

  async function connect() {
    _status = ExtensionStatus.Connecting;
    try {
      const transport = new StreamableHTTPClientTransport(config.url, {
        headers: config.headers,
      });

      await client.connect(transport);
      _status = ExtensionStatus.Connected;
    } catch (e) {
      _status = ExtensionStatus.Errored;
      throw e;
    }
  }

  async function disconnect() {
    await client.close();
    _status = ExtensionStatus.Disconnected;
  }

  return {
    ...baseToolSet,
    get status() {
      return _status;
    },
    connect,
    disconnect,
  };
}

function mcpContentToLlmContent(content: any[]): LLMContent {
  return content.map((c: any) => {
    if (c.type === "text") {
      return { type: "text", text: c.text };
    }
    if (c.type === "image") {
      return {
        type: "image",
        mediaType: c.mediaType,
        data: c.data,
      };
    }
    return { type: "text", text: JSON.stringify(c) };
  }) as LLMContent;
}
