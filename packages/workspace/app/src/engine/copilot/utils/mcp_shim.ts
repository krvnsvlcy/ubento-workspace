export class Client {
  constructor(options: any) {}
  async connect(transport: any) {}
  async listTools() { return { tools: [] }; }
  async callTool(args: any) { return { content: [], structuredContent: undefined, isError: false }; }
  async close() {}
}

export class StreamableHTTPClientTransport {
  constructor(url: string, options: any) {}
}
