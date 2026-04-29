import { createIntelligenceServiceClient } from "~/clients/intelligence/client.js";
import { extractResponseData } from "~/lib/client.js";
import { TokenManager } from "~/lib/token_manager.js";

export class IntelligenceService {
  private intelligenceClient: ReturnType<
    typeof createIntelligenceServiceClient
  >;

  constructor({
    baseUrl,
    tokenManager,
  }: {
    baseUrl?: string;
    tokenManager: TokenManager;
  }) {
    this.intelligenceClient = createIntelligenceServiceClient({
      baseUrl,
      tokenManager,
      headers: {
        "x-ubento-service": "intelligence",
      },
    });
  }

  // ===== Threads =====

  async listThreads({
    workspace_id,
    limit,
    cursor,
  }: {
    workspace_id: string;
    limit?: number;
    cursor?: string;
  }) {
    const result = await this.intelligenceClient.get("/intelligence/threads", {
      params: {
        query: {
          workspace_id,
          limit,
          cursor,
        },
      },
    });
    return extractResponseData(result, true);
  }

  async getThread(threadId: string) {
    const result = await this.intelligenceClient.get(
      "/intelligence/threads/{thread_id}",
      {
        params: {
          path: { thread_id: threadId },
        },
      },
    );
    return extractResponseData(result, true);
  }

  async createThread(data: { workspace_id: string; title?: string }) {
    const result = await this.intelligenceClient.post("/intelligence/threads", {
      body: data,
    });
    return extractResponseData(result, true);
  }

  // ===== Messages =====

  async listMessages({
    thread_id,
    limit,
    cursor,
  }: {
    thread_id: string;
    limit?: number;
    cursor?: string;
  }) {
    const result = await this.intelligenceClient.get(
      "/intelligence/threads/{thread_id}/messages",
      {
        params: {
          path: { thread_id },
          query: {
            limit,
            cursor,
          },
        },
      },
    );
    return extractResponseData(result, true);
  }

  async createMessage(data: {
    thread_id: string;
    role: "user" | "agent";
    content?: string;
    author?: string;
    messageData?: any;
  }) {
    const result = await this.intelligenceClient.post(
      "/intelligence/threads/{thread_id}/messages",
      {
        params: {
          path: { thread_id: data.thread_id },
        },
        body: {
          message: {
            role: data.role,
            author: data.author,
            data: data.messageData || { text: data.content },
          },
        },
      },
    );
    return extractResponseData(result, true);
  }
}
