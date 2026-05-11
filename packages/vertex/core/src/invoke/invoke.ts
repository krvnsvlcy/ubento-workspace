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
