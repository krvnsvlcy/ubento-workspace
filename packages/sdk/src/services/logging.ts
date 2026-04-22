import type {
  LogBatchCreate,
  LogCreate,
  SinkCreate,
} from "~/clients/logging/client.js";
import { createLoggingServiceClient } from "~/clients/logging/client.js";
import { extractResponseData } from "~/lib/client.js";
import { extractCursorPage } from "~/lib/pagination.js";
import { TokenManager } from "~/lib/token_manager.js";

export class LoggingService {
  private loggingClient: ReturnType<typeof createLoggingServiceClient>;

  constructor({
    baseUrl,
    tokenManager,
  }: {
    baseUrl?: string;
    tokenManager: TokenManager;
  }) {
    this.loggingClient = createLoggingServiceClient({
      baseUrl,
      tokenManager,
    });
  }

  async listLogSinks(options?: { cursor?: string; limit?: number }) {
    const result = await this.loggingClient.get("/logging/sinks", {
      params: {
        query: options,
      },
    });
    return extractResponseData(result, true);
  }

  async createLogSink(data: SinkCreate) {
    const result = await this.loggingClient.post("/logging/sinks", {
      body: data,
    });
    return extractResponseData(result, true);
  }
  async getOrCreateLogSink(
    key: string,
    data?: {
      name?: string;
      description?: string;
    }
  ) {
    const result = await this.loggingClient.get("/logging/sinks/by-key/{key}", {
      params: {
        path: { key },
        query: {
          name: data?.name,
          description: data?.description,
        } as any,
      },
    });
    return extractResponseData(result, true);
  }
  async getLogSink(sinkId: string) {
    const result = await this.loggingClient.get("/logging/sinks/{sink_id}", {
      params: {
        path: { sink_id: sinkId },
      },
    });
    return extractResponseData(result);
  }
  async closeLogSink(sinkId: string) {
    const result = await this.loggingClient.post(
      "/logging/sinks/{sink_id}/close",
      {
        params: {
          path: { sink_id: sinkId },
        },
      }
    );
    return extractResponseData(result);
  }

  async updateLogSink(sinkId: string) {
    const result = await this.loggingClient.post(
      "/logging/sinks/{sink_id}/close",
      {
        params: {
          path: { sink_id: sinkId },
        },
      }
    );
    return extractResponseData(result, true);
  }

  async createLog(sinkId: string, data: LogCreate) {
    const result = await this.loggingClient.post(
      "/logging/sinks/{sink_id}/logs",
      {
        params: {
          path: { sink_id: sinkId },
        },
        body: data,
      }
    );
    return extractResponseData(result, true);
  }
  async createLogBatch(sinkId: string, data: LogBatchCreate) {
    const result = await this.loggingClient.post(
      "/logging/sinks/{sink_id}/logs/batch",
      {
        params: {
          path: { sink_id: sinkId },
        },
        body: data,
      }
    );
    return extractResponseData(result, true);
  }
  async listLogs(
    sinkId: string,
    options?: { cursor?: string; limit?: number }
  ) {
    const result = await this.loggingClient.get(
      "/logging/sinks/{sink_id}/logs",
      {
        params: {
          path: { sink_id: sinkId },
          query: options,
        },
      }
    );
    return extractCursorPage(result.response, {
      items: result.data,
      fetcher: this.loggingClient.fetch,
    });
  }
  async subscribeToLogSink(sinkId: string) {
    const result = await this.loggingClient.get(
      "/logging/sinks/{sink_id}/stream",
      {
        params: {
          path: { sink_id: sinkId },
        },
      }
    );
    return extractResponseData(result, true);
  }
}
