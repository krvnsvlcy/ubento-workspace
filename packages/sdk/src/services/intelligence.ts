import { createIntelligenceServiceClient } from "~/clients/intelligence/client.js";
import { intelligenceClient } from "~/index.js";
import { extractResponseData } from "~/lib/client.js";
import { extractCursorPage } from "~/lib/pagination.js";
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
    });
  }

  async proxyToModel(modelId: string, requestBody: Record<string, never>) {
    const result = await this.intelligenceClient.post(
      "/intelligence/models/{model_id}",
      {
        params: {
          path: { model_id: modelId },
        },
        body: requestBody,
      },
    );
    return extractResponseData(result, true);
  }

  async query(data: {
    instructions: string;
    query: string;
    model_id: string;
    schema?: Record<string, never>;
    format?: "json";
  }) {
    const result = await this.intelligenceClient.post("/intelligence/query", {
      body: data,
    });
    return extractResponseData(result, true);
  }

  async listThreads(options: {
    workspace_id: string;
    members?: string;
    cursor?: string;
    limit?: number;
  }) {
    const result = await this.intelligenceClient.get("/intelligence/threads", {
      params: {
        query: options,
      },
    });
    return extractCursorPage(result.response, {
      items: result.data,
      fetcher: this.intelligenceClient.fetch,
    });
  }

  async createThread(data: { title?: string; workspace_id: string }) {
    const result = await this.intelligenceClient.post("/intelligence/threads", {
      body: data,
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
    return extractResponseData(result);
  }

  async updateThread(
    threadId: string,
    data: {
      title?: string;
      metadata?: Record<string, never>;
      context?: Record<string, never>;
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

  // Files

  async uploadFile(workspaceId: string, file: File | Blob) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("workspace_id", workspaceId);

    const result = await this.intelligenceClient.fetch(
      new Request(
        new URL("/intelligence/files", this.intelligenceClient.baseUrl),
        {
          method: "POST",
          body: formData,
        },
      ),
    );
    if (!result.ok) {
      throw new Error(`Failed to upload file: ${result.statusText}`);
    }
    return (await result.json()) as intelligenceClient.File;
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
    return extractResponseData(result);
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
    return extractResponseData(result);
  }

  async listMessages(
    threadId: string,
    options?: {
      limit?: number;
      offset?: number;
      cursor?: string;
      direction?: string;
      order?: string[];
    },
  ) {
    const result = await this.intelligenceClient.get(
      "/intelligence/threads/{thread_id}/messages",
      {
        params: {
          path: { thread_id: threadId },
          query: options,
        },
      },
    );
    return extractCursorPage(result.response, {
      items: result.data,
      fetcher: this.intelligenceClient.fetch,
    });
  }

  async createMessage(
    threadId: string,
    data: {
      message: {
        role: "user" | "agent";
        author?: string;
        data: Record<string, never>;
      };
    },
  ) {
    const result = await this.intelligenceClient.post(
      "/intelligence/threads/{thread_id}/messages",
      {
        params: {
          path: { thread_id: threadId },
        },
        body: data,
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
    return extractResponseData(result);
  }

  async updateMessage(
    messageId: string,
    data: {
      data?: Record<string, never>;
      status?: "in_progress" | "completed" | "errored" | "aborted";
      error?: string;
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

  async readWebPage(
    url: string,
    options?: { format: "raw" | "json" | "markdown" },
  ) {
    const result = await this.intelligenceClient.post(
      "/intelligence/tools/read-webpage",
      {
        body: { url, format: options?.format },
      },
    );
    return extractResponseData(result, true);
  }
}
