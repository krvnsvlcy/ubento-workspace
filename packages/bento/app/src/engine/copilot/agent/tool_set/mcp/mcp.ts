import { Elll } from "@elllphnt/elll-engine";
import { Client } from "@modelcontextprotocol/sdk/client";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { BehaviorSubject, filter, firstValueFrom } from "rxjs";
import { z } from "zod";
import { LLMContent, LLMContentBlock } from "../../message/llm.js";
import { Tool, ToolCallResult } from "../../tool.js";
import { ToolSet } from "../tool_set.js";

export enum ExtensionStatus {
  Disconnected,
  Connecting,
  Connected,
  Errored,
}

export type TokenProvider = () => string | Promise<string>;

export type AgentExtensionToolDef = {
  name: string;
  inputSchema: any;
  description?: string;
};

export type MCPToolOutput = Awaited<ReturnType<Client["callTool"]>>;

export class McpToolSet extends ToolSet {
  readonly url: string;
  readonly client: Client;

  private _tokenProvider?: TokenProvider;
  private _headers?: HeadersInit;
  private _toolMap: Record<string, AgentExtensionToolDef> | undefined =
    undefined;

  constructor({
    elll,
    name,
    url,
    tokenProvider,
    headers,
  }: {
    elll: Elll;
    name: string;
    url: string;
    tokenProvider?: TokenProvider;
    headers?: Record<string, string>;
  }) {
    super({ elll, name });
    this.url = url;
    this._tokenProvider = tokenProvider;
    this._headers = headers;
    this.client = new Client({
      name,
      version: "1.0.0",
    });

    this.addDisposer(() => {
      this.client.close();
    });
  }

  protected _status$ = new BehaviorSubject<ExtensionStatus>(
    ExtensionStatus.Disconnected,
  );
  get status() {
    return this._status$.value;
  }
  get status$() {
    return this._status$.asObservable();
  }

  protected async awaitConnected() {
    if (this.status === ExtensionStatus.Connected) return;
    if (
      this.status === ExtensionStatus.Errored ||
      this.status === ExtensionStatus.Disconnected
    ) {
      await this.connect();
    } else {
      const status = await firstValueFrom(
        this.status$.pipe(
          filter(
            (status) =>
              status === ExtensionStatus.Connected ||
              status === ExtensionStatus.Errored,
          ),
        ),
      );
      if (status === ExtensionStatus.Errored) {
        throw new Error("Extension is errored");
      }
    }
  }

  async connect() {
    this._status$.next(ExtensionStatus.Connecting);
    try {
      await this.client.connect(
        new StreamableHTTPClientTransport(new URL(this.url), {
          fetch: async (url, init) => {
            const token = await this._tokenProvider?.();
            const fetchInit = { ...init };
            const headers = new Headers(fetchInit.headers);

            if (this._headers) {
              for (const [key, value] of Object.entries(this._headers)) {
                headers.set(key, value);
              }
            }

            if (token) {
              headers.set("Authorization", `Bearer ${token}`);
            }

            fetchInit.headers = headers;
            return fetch(url, fetchInit);
          },
        }),
      );
      this._status$.next(ExtensionStatus.Connected);
    } catch (error) {
      console.error(error);
      this._status$.next(ExtensionStatus.Errored);
      throw error;
    }
  }

  async disconnect() {
    this._status$.next(ExtensionStatus.Disconnected);
    this.client.close();
  }

  private async getToolMap(): Promise<Record<string, AgentExtensionToolDef>> {
    if (this._toolMap) {
      return this._toolMap;
    }
    await this.awaitConnected();
    const result = await this.client.listTools();
    this._toolMap = Object.fromEntries(result.tools.map((t) => [t.name, t]));
    return this._toolMap;
  }

  async listTools(): Promise<AgentExtensionToolDef[]> {
    return Object.values(await this.getToolMap());
  }

  async getToolDef(name: string): Promise<AgentExtensionToolDef | undefined> {
    return (await this.getToolMap())[name];
  }

  async callTool(
    name: string,
    args?: Record<string, unknown>,
  ): Promise<MCPToolOutput> {
    await this.awaitConnected();
    return this.client.callTool({ name, arguments: args });
  }

  async getTool(name: string): Promise<any | undefined> {
    let tool = this._toolInstanceMap[name];
    if (tool) {
      return tool;
    }
    const toolDef = await this.getToolDef(name);
    if (!toolDef) {
      return undefined;
    }
    tool = new McpTool({ extension: this, toolDef }) as any;
    this._toolInstanceMap[name] = tool;
    return tool;
  }

  async searchTools(query: string) {
    const tools = await this.listTools();
    return tools
      .filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.description?.toLowerCase().includes(query.toLowerCase()),
      )
      .map((t) => ({
        name: t.name,
        description: t.description,
      }));
  }
}

class McpTool extends Tool {
  readonly toolSet: McpToolSet;
  readonly toolDef: AgentExtensionToolDef;

  constructor({
    extension,
    toolDef,
  }: {
    extension: McpToolSet;
    toolDef: AgentExtensionToolDef;
  }) {
    super({
      name: `${extension.name}.${toolDef.name}`,
      description: toolDef.description || "",
      args: z.fromJSONSchema(toolDef.inputSchema as any) as any,
    });
    this.toolSet = extension;
    this.toolDef = toolDef;
  }

  async run(args: Record<string, unknown>): Promise<ToolCallResult<any>> {
    const result = await this.toolSet.callTool(this.toolDef.name, args);
    return {
      content: mcpContentToLlmContent(result.content),
      structuredContent: result.structuredContent,
      isError: !!result.isError,
    };
  }
}

export function mcpContentToLlmContent(
  output: MCPToolOutput["content"],
): LLMContent {
  const content: LLMContentBlock[] = [];

  if (!Array.isArray(output)) {
    console.error("Invalid MCP tool output content", output);
    return [{ type: "text", text: "Invalid MCP tool output content" }];
  }

  for (const item of output) {
    switch (item.type) {
      case "text":
        content.push({ type: "text", text: item.text || "" });
        break;

      case "image":
        content.push({
          type: "image",
          data: item.data,
          mimeType: item.mimeType || "image/png",
        });
        break;

      case "audio":
        content.push({
          type: "audio",
          data: item.data,
          mimeType: item.mimeType || "audio/wav",
        });
        break;

      case "resource":
        content.push({
          type: "resource",
          resource: item.resource,
        });
        break;

      case "resource_link":
        content.push({
          type: "resource_link",
          uri: item.uri,
          name: item.name || "Unnamed Resource",
        });
        break;

      default:
        content.push({
          type: "text",
          text: `[Unknown content type returned: ${item?.type}]`,
        });
        break;
    }
  }

  return content;
}
