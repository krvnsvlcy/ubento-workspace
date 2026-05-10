import {
  ConnectionCredentials,
  ConnectionProviderConfig,
} from "../connection/connections.js";
import { ConnectionSpec } from "../spec/connection.js";
import { OperationSpec } from "../spec/operation.js";
import { invokeHttpService } from "./http.js";

export type InvokeErrorCode =
  | "UNSUPPORTED_HANDLER_TYPE"
  | "INVALID_REQUEST_ERROR"
  | "UPSTREAM_ERROR";
export type InvokeError = {
  code: InvokeErrorCode;
  message: string;
  details?: unknown;
};

export type InvokeResult<T = unknown> =
  | { data: T; error: null }
  | { data: null; error: InvokeError };

export async function invokeService(params: {
  operation: OperationSpec;
  connection?: {
    spec: ConnectionSpec;
    provider: ConnectionProviderConfig;
    credentials: ConnectionCredentials;
  };
  args: Record<string, unknown>;
}): Promise<InvokeResult> {
  const { operation } = params;

  if (operation.handler.type === "http") {
    return invokeHttpService({
      handler: operation.handler,
      connection: params.connection,
      args: params.args,
    });
  }

  return {
    data: null,
    error: {
      code: "UNSUPPORTED_HANDLER_TYPE",
      message: `Handler type '${(operation.handler as any).type}' is not supported.`,
    },
  };
}
