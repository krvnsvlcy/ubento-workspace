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
    team_id,
    members,
    limit,
    cursor,
    sort,
  }: {
    workspace_id?: string;
    team_id?: string;
    members?: string[];
    limit?: number;
    cursor?: string;
    sort?: "recent" | "newest" | "id";
  } = {}) {
    const result = await this.intelligenceClient.get("/intelligence/threads", {
      params: {
        query: {
          workspace_id,
          team_id,
          members: members?.join(","),
          limit,
          cursor,
          sort,
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

  async createThread(data: {
    team_id?: string;
    workspace_id?: string;
    title?: string;
  }) {
    const result = await this.intelligenceClient.post("/intelligence/threads", {
      body: data,
    });
    return extractResponseData(result, true);
  }

  async updateThread(
    threadId: string,
    data: {
      title?: string;
      metadata?: Record<string, any>;
      context?: Record<string, any>;
    },
  ) {
    const result = await this.intelligenceClient.patch(
      "/intelligence/threads/{thread_id}",
      {
        params: {
          path: { thread_id: threadId },
        },
        body: data,
      },
    );
    return extractResponseData(result, true);
  }

  async deleteThread(threadId: string) {
    const result = await this.intelligenceClient.delete(
      "/intelligence/threads/{thread_id}",
      {
        params: {
          path: { thread_id: threadId },
        },
      },
    );
    return extractResponseData(result, true);
  }

  async generateThreadTitle(threadId: string) {
    const result = await this.intelligenceClient.post(
      "/intelligence/threads/{thread_id}/generate-title",
      {
        params: {
          path: { thread_id: threadId },
        },
      },
    );
    return extractResponseData(result, true);
  }

  // ===== Messages =====

  async listMessages({
    thread_id,
    limit,
    cursor,
    sort,
  }: {
    thread_id: string;
    limit?: number;
    cursor?: string;
    sort?: "newest" | "oldest";
  }) {
    const result = await this.intelligenceClient.get(
      "/intelligence/threads/{thread_id}/messages",
      {
        params: {
          path: { thread_id },
          query: {
            limit,
            cursor,
            sort,
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

  async getMessage(messageId: string) {
    const result = await this.intelligenceClient.get(
      "/intelligence/messages/{message_id}",
      {
        params: {
          path: { message_id: messageId },
        },
      },
    );
    return extractResponseData(result, true);
  }

  async updateMessage(
    messageId: string,
    data: {
      data?: any;
    },
  ) {
    const result = await this.intelligenceClient.patch(
      "/intelligence/messages/{message_id}",
      {
        params: {
          path: { message_id: messageId },
        },
        body: data,
      },
    );
    return extractResponseData(result, true);
  }

  async deleteMessage(messageId: string) {
    const result = await this.intelligenceClient.delete(
      "/intelligence/messages/{message_id}",
      {
        params: {
          path: { message_id: messageId },
        },
      },
    );
    return extractResponseData(result, true);
  }

  async deleteMessages(messageIds: string[]) {
    const result = await this.intelligenceClient.delete(
      "/intelligence/messages",
      {
        body: {
          message_ids: messageIds,
        },
      },
    );
    return extractResponseData(result, true);
  }

  // ===== Files =====

  async listFiles({
    workspace_id,
    team_id,
    limit,
    cursor,
  }: {
    workspace_id?: string;
    team_id?: string;
    limit?: number;
    cursor?: string;
  } = {}) {
    const result = await this.intelligenceClient.get("/intelligence/files", {
      params: {
        query: {
          workspace_id,
          team_id,
          limit,
          cursor,
        },
      },
    });
    return extractResponseData(result, true);
  }

  async getFile(fileId: string) {
    const result = await this.intelligenceClient.get(
      "/intelligence/files/{file_id}",
      {
        params: {
          path: { file_id: fileId },
        },
      },
    );
    return extractResponseData(result, true);
  }

  async getFileUrl(fileId: string) {
    const result = await this.intelligenceClient.get(
      "/intelligence/files/{file_id}/url",
      {
        params: {
          path: { file_id: fileId },
        },
      },
    );
    return extractResponseData(result, true);
  }

  async createFile(data: {
    file: File | Blob;
    team_id: string;
    workspace_id?: string;
  }) {
    const body = new FormData();
    body.append("file", data.file);
    body.append("team_id", data.team_id);
    if (data.workspace_id) {
      body.append("workspace_id", data.workspace_id);
    }

    const result = await this.intelligenceClient.post("/intelligence/files", {
      body: body as any,
    });
    return extractResponseData(result, true);
  }

  // ===== Tools =====

  async readWebpage(
    url: string,
    format: "markdown" | "raw" | "json" = "markdown",
  ) {
    const result = await this.intelligenceClient.post(
      "/intelligence/tools/read-webpage",
      {
        body: { url, format },
      },
    );
    return extractResponseData(result, true);
  }
}
