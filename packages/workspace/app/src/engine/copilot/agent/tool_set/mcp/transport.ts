// import {
//   FetchLike,
//   normalizeHeaders,
//   Transport,
// } from "@modelcontextprotocol/sdk/shared/transport.js";
// import {
//   isInitializedNotification,
//   isJSONRPCRequest,
//   isJSONRPCResultResponse,
//   JSONRPCMessage,
//   JSONRPCMessageSchema,
// } from "@modelcontextprotocol/sdk/types.js";

type Transport = any;
type FetchLike = any;
type JSONRPCMessage = any;
const JSONRPCMessageSchema = { parse: (v: any) => v };
const isJSONRPCResultResponse = (v: any) => true;
const isJSONRPCRequest = (v: any) => true;
const isInitializedNotification = (v: any) => true;
const normalizeHeaders = (v: any) => v;

// ============================================================================
// 1. Universal Error Classes
// ============================================================================

export enum SdkErrorCode {
  ClientHttpFailedToOpenStream = "ClientHttpFailedToOpenStream",
  ClientHttpNotImplemented = "ClientHttpNotImplemented",
  ClientHttpUnexpectedContent = "ClientHttpUnexpectedContent",
  ClientHttpFailedToTerminateSession = "ClientHttpFailedToTerminateSession",
}

export class SdkError extends Error {
  public readonly code: SdkErrorCode;
  public readonly data?: any;

  constructor(code: SdkErrorCode, message: string, data?: any) {
    super(message);
    this.name = "SdkError";
    this.code = code;
    this.data = data;
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SdkError);
    }
  }
}

// ============================================================================
// 2. Universal SSE Parser (Web Streams API)
// ============================================================================

export interface SseEvent {
  id?: string;
  event?: string;
  data?: string;
}

/**
 * A universal TransformStream that parses raw text chunks into Server-Sent Events.
 * Conforms to the standard SSE specification.
 */
class EventSourceParserStream extends TransformStream<string, SseEvent> {
  constructor(options?: { onRetry?: (retryMs: number) => void }) {
    let buffer = "";

    super({
      transform(chunk, controller) {
        buffer += chunk;
        // SSE blocks are separated by double newlines (\n\n or \r\n\r\n)
        const parts = buffer.split(/\r?\n\r?\n/);
        // The last part is either an empty string (if it ended exactly on a boundary)
        // or a partial chunk. We keep it in the buffer.
        buffer = parts.pop() || "";

        for (const part of parts) {
          if (!part.trim()) continue; // Ignore empty blocks

          const lines = part.split(/\r?\n/);
          const event: SseEvent = { data: "" };
          const dataLines: string[] = [];

          for (const line of lines) {
            if (line.startsWith(":")) continue; // Comment line, ignore

            const colonIdx = line.indexOf(":");
            const field = colonIdx !== -1 ? line.slice(0, colonIdx) : line;
            const value =
              colonIdx !== -1 ? line.slice(colonIdx + 1).trimStart() : "";

            switch (field) {
              case "id":
                event.id = value;
                break;
              case "event":
                event.event = value;
                break;
              case "data":
                dataLines.push(value);
                break;
              case "retry":
                if (options?.onRetry) {
                  const retryMs = parseInt(value, 10);
                  if (!isNaN(retryMs)) {
                    options.onRetry(retryMs);
                  }
                }
                break;
            }
          }

          if (dataLines.length > 0) {
            event.data = dataLines.join("\n");
          }
          controller.enqueue(event);
        }
      },
    });
  }
}

// ============================================================================
// 3. Configuration & Interfaces
// ============================================================================

const DEFAULT_STREAMABLE_HTTP_RECONNECTION_OPTIONS: StreamableHTTPReconnectionOptions =
  {
    initialReconnectionDelay: 1000,
    maxReconnectionDelay: 30_000,
    reconnectionDelayGrowFactor: 1.5,
    maxRetries: 2,
  };

export interface StartSSEOptions {
  resumptionToken?: string;
  onresumptiontoken?: (token: string) => void;
  replayMessageId?: string | number;
}

export interface StreamableHTTPReconnectionOptions {
  maxReconnectionDelay: number;
  initialReconnectionDelay: number;
  reconnectionDelayGrowFactor: number;
  maxRetries: number;
}

/**
 * A minimal interface for providing authentication tokens.
 * The implementer handles all caching, refreshing, and storage logic.
 */
export interface TokenManager {
  getToken(): string | Promise<string>;
}

export class HttpTransport implements Transport {
  private _abortController?: AbortController;
  private _url: URL;
  private _requestInit?: RequestInit;
  private _fetch?: FetchLike;
  private _sessionId?: string;
  private _reconnectionOptions: StreamableHTTPReconnectionOptions;
  private _protocolVersion?: string;
  private _serverRetryMs?: number;
  private _reconnectionTimeout?: ReturnType<typeof setTimeout>;
  private _tokenManager?: TokenManager;

  onclose?: () => void;
  onerror?: (error: Error) => void;
  onmessage?: (message: JSONRPCMessage) => void;

  constructor(
    url: URL,
    opts?: {
      requestInit?: RequestInit;
      fetch?: FetchLike;
      reconnectionOptions?: StreamableHTTPReconnectionOptions;
      sessionId?: string;
      tokenManager?: TokenManager;
    },
  ) {
    this._url = url;
    this._requestInit = opts?.requestInit;
    this._fetch = opts?.fetch;
    this._sessionId = opts?.sessionId;
    this._tokenManager = opts?.tokenManager;
    this._reconnectionOptions =
      opts?.reconnectionOptions ?? DEFAULT_STREAMABLE_HTTP_RECONNECTION_OPTIONS;
  }

  private async _commonHeaders(): Promise<Headers> {
    const headers: Record<string, string> = {};

    // Fetch and inject the token right before the request
    if (this._tokenManager) {
      const token = await this._tokenManager.getToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    if (this._sessionId) {
      headers["mcp-session-id"] = this._sessionId;
    }
    if (this._protocolVersion) {
      headers["mcp-protocol-version"] = this._protocolVersion;
    }

    const extraHeaders = normalizeHeaders(this._requestInit?.headers);

    return new Headers({
      ...headers,
      ...extraHeaders,
    });
  }

  private async _startSse(options: StartSSEOptions): Promise<void> {
    const { resumptionToken } = options;

    try {
      const headers = await this._commonHeaders();
      headers.set("Accept", "text/event-stream");

      if (resumptionToken) {
        headers.set("last-event-id", resumptionToken);
      }

      const response = await (this._fetch ?? fetch)(this._url, {
        ...this._requestInit,
        method: "GET",
        headers,
        signal: this._abortController?.signal,
      });

      if (!response.ok) {
        const text = await response.text?.().catch(() => null);

        if (response.status === 405) {
          return; // Expected if GET SSE is not supported
        }

        throw new SdkError(
          SdkErrorCode.ClientHttpFailedToOpenStream,
          `Failed to open SSE stream: ${response.status} ${response.statusText}`,
          { status: response.status, text },
        );
      }

      this._handleSseStream(response.body, options, true);
    } catch (error) {
      this.onerror?.(error as Error);
      throw error;
    }
  }

  private _getNextReconnectionDelay(attempt: number): number {
    if (this._serverRetryMs !== undefined) return this._serverRetryMs;
    const {
      initialReconnectionDelay,
      reconnectionDelayGrowFactor,
      maxReconnectionDelay,
    } = this._reconnectionOptions;
    return Math.min(
      initialReconnectionDelay * Math.pow(reconnectionDelayGrowFactor, attempt),
      maxReconnectionDelay,
    );
  }

  private _scheduleReconnection(
    options: StartSSEOptions,
    attemptCount = 0,
  ): void {
    const maxRetries = this._reconnectionOptions.maxRetries;

    if (attemptCount >= maxRetries) {
      this.onerror?.(
        new Error(`Maximum reconnection attempts (${maxRetries}) exceeded.`),
      );
      return;
    }

    const delay = this._getNextReconnectionDelay(attemptCount);

    this._reconnectionTimeout = setTimeout(() => {
      this._startSse(options).catch((error) => {
        this.onerror?.(
          new Error(
            `Failed to reconnect SSE stream: ${error instanceof Error ? error.message : String(error)}`,
          ),
        );
        this._scheduleReconnection(options, attemptCount + 1);
      });
    }, delay);
  }

  private _handleSseStream(
    stream: ReadableStream<Uint8Array> | null,
    options: StartSSEOptions,
    isReconnectable: boolean,
  ): void {
    if (!stream) return;

    const { onresumptiontoken, replayMessageId } = options;
    let lastEventId: string | undefined;
    let hasPrimingEvent = false;
    let receivedResponse = false;

    const processStream = async () => {
      try {
        const reader = stream
          // @ts-expect-error TextDecoderStream writable accepts BufferSource but TS lib types it as Uint8Array
          .pipeThrough(new TextDecoderStream())
          .pipeThrough(
            new EventSourceParserStream({
              onRetry: (retryMs: number) => {
                this._serverRetryMs = retryMs;
              },
            }),
          )
          .getReader();

        while (true) {
          const { value: event, done } = await reader.read();
          if (done) break;

          if (event.id) {
            lastEventId = event.id;
            hasPrimingEvent = true;
            onresumptiontoken?.(event.id);
          }

          if (!event.data) continue;

          if (!event.event || event.event === "message") {
            try {
              const message = JSONRPCMessageSchema.parse(
                JSON.parse(event.data),
              );
              if (isJSONRPCResultResponse(message)) {
                receivedResponse = true;
                if (replayMessageId !== undefined) {
                  message.id = replayMessageId;
                }
              }
              this.onmessage?.(message);
            } catch (error) {
              this.onerror?.(error as Error);
            }
          }
        }

        const canResume = isReconnectable || hasPrimingEvent;
        const needsReconnect = canResume && !receivedResponse;
        if (
          needsReconnect &&
          this._abortController &&
          !this._abortController.signal.aborted
        ) {
          this._scheduleReconnection(
            {
              resumptionToken: lastEventId,
              onresumptiontoken,
              replayMessageId,
            },
            0,
          );
        }
      } catch (error) {
        this.onerror?.(new Error(`SSE stream disconnected: ${error}`));
        const canResume = isReconnectable || hasPrimingEvent;
        const needsReconnect = canResume && !receivedResponse;
        if (
          needsReconnect &&
          this._abortController &&
          !this._abortController.signal.aborted
        ) {
          try {
            this._scheduleReconnection(
              {
                resumptionToken: lastEventId,
                onresumptiontoken,
                replayMessageId,
              },
              0,
            );
          } catch (err) {
            this.onerror?.(
              new Error(
                `Failed to reconnect: ${err instanceof Error ? err.message : String(err)}`,
              ),
            );
          }
        }
      }
    };
    processStream();
  }

  async start() {
    if (this._abortController) {
      throw new Error("StreamableHTTPClientTransport already started!");
    }
    this._abortController = new AbortController();
  }

  async close(): Promise<void> {
    if (this._reconnectionTimeout) {
      clearTimeout(this._reconnectionTimeout);
      this._reconnectionTimeout = undefined;
    }
    this._abortController?.abort();
    this.onclose?.();
  }

  async send(
    message: JSONRPCMessage | JSONRPCMessage[],
    options?: {
      resumptionToken?: string;
      onresumptiontoken?: (token: string) => void;
    },
  ): Promise<void> {
    try {
      const { resumptionToken, onresumptiontoken } = options || {};

      if (resumptionToken) {
        this._startSse({
          resumptionToken,
          replayMessageId: isJSONRPCRequest(message) ? message.id : undefined,
        }).catch((error) => this.onerror?.(error));
        return;
      }

      const headers = await this._commonHeaders();
      headers.set("content-type", "application/json");
      headers.set("accept", "application/json, text/event-stream");

      const init = {
        ...this._requestInit,
        method: "POST",
        headers,
        body: JSON.stringify(message),
        signal: this._abortController?.signal,
      };

      const response = await (this._fetch ?? fetch)(this._url, init);

      const sessionId = response.headers.get("mcp-session-id");
      if (sessionId) {
        this._sessionId = sessionId;
      }

      if (!response.ok) {
        const text = await response.text?.().catch(() => null);
        throw new SdkError(
          SdkErrorCode.ClientHttpNotImplemented,
          `Error POSTing to endpoint: ${response.status} ${text}`,
          {
            status: response.status,
            text,
          },
        );
      }

      if (response.status === 202) {
        await response.text?.().catch(() => {});
        if (isInitializedNotification(message)) {
          this._startSse({ resumptionToken: undefined }).catch((error) =>
            this.onerror?.(error),
          );
        }
        return;
      }

      const messages = Array.isArray(message) ? message : [message];
      const hasRequests = messages.some(
        (msg) => "method" in msg && "id" in msg && msg.id !== undefined,
      );
      const contentType = response.headers.get("content-type");

      if (hasRequests) {
        if (contentType?.includes("text/event-stream")) {
          this._handleSseStream(response.body, { onresumptiontoken }, false);
        } else if (contentType?.includes("application/json")) {
          const data = await response.json();
          const responseMessages = Array.isArray(data)
            ? data.map((msg) => JSONRPCMessageSchema.parse(msg))
            : [JSONRPCMessageSchema.parse(data)];

          for (const msg of responseMessages) {
            this.onmessage?.(msg);
          }
        } else {
          await response.text?.().catch(() => {});
          throw new SdkError(
            SdkErrorCode.ClientHttpUnexpectedContent,
            `Unexpected content type: ${contentType}`,
            { contentType },
          );
        }
      } else {
        await response.text?.().catch(() => {});
      }
    } catch (error) {
      this.onerror?.(error as Error);
      throw error;
    }
  }

  get sessionId(): string | undefined {
    return this._sessionId;
  }

  async terminateSession(): Promise<void> {
    if (!this._sessionId) return;

    try {
      const headers = await this._commonHeaders();
      const init = {
        ...this._requestInit,
        method: "DELETE",
        headers,
        signal: this._abortController?.signal,
      };

      const response = await (this._fetch ?? fetch)(this._url, init);
      await response.text?.().catch(() => {});

      if (!response.ok && response.status !== 405) {
        throw new SdkError(
          SdkErrorCode.ClientHttpFailedToTerminateSession,
          `Failed to terminate session: ${response.statusText}`,
          {
            status: response.status,
            statusText: response.statusText,
          },
        );
      }

      this._sessionId = undefined;
    } catch (error) {
      this.onerror?.(error as Error);
      throw error;
    }
  }

  setProtocolVersion(version: string): void {
    this._protocolVersion = version;
  }
  get protocolVersion(): string | undefined {
    return this._protocolVersion;
  }

  async resumeStream(
    lastEventId: string,
    options?: { onresumptiontoken?: (token: string) => void },
  ): Promise<void> {
    await this._startSse({
      resumptionToken: lastEventId,
      onresumptiontoken: options?.onresumptiontoken,
    });
  }
}
