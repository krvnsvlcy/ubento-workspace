export enum AgentExecutionErrorCode {
  RATE_LIMIT_EXCEEDED = "rate_limit_exceeded",
  MODEL_GENERATION_FAILED = "model_generation_failed",
  PARSING_ERROR = "parsing_error",
  TOOL_EXECUTION_FAILED = "tool_execution_failed",
  NO_ACTIONS_RETURNED = "no_actions_returned",
  ABORTED = "aborted",
  UNKNOWN = "unknown",
}

export class AgentExecutionError extends Error {
  code: AgentExecutionErrorCode;
  cause?: unknown;
  data?: unknown;

  constructor({
    code,
    message,
    cause,
    data,
  }: {
    code: AgentExecutionErrorCode;
    message: string;
    cause?: unknown;
    data?: unknown;
  }) {
    super(message);
    this.name = "AgentExecutionError";
    this.code = code;
    this.cause = cause;
    this.data = data;
  }
}
