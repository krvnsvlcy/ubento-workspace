import { Logger } from "@elllphnt/elll-engine";
import { BehaviorSubject, distinctUntilChanged } from "rxjs";
import { LanguageModel } from "~/lib/models.js";
import { AgentThread } from "./thread.js";

// 1. Expanded execution statuses for better flow tracking
export enum AgentReplayStatus {
  Idle = "idle",
  Running = "running",
  Completed = "completed",
  Stopped = "stopped",
}

// 2. More granular error codes
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
    cause?: unknown; // Preserves the original stack trace
    data?: unknown;
  }) {
    super(message);
    this.name = "AgentExecutionError";
    this.code = code;
    this.cause = cause;
    this.data = data;
  }
}

export type AgentModelMap = {
  summarize?: LanguageModel;
};

// 3. Clear return types for loop control
type TurnResult = {
  shouldContinue: boolean;
  reason?: string;
};

export class AgentReplay {
  readonly thread: AgentThread;
  readonly logger?: Logger;
  private shouldStop = false;

  private _statu$ = new BehaviorSubject<AgentReplayStatus>(
    AgentReplayStatus.Idle,
  );
  private _error$ = new BehaviorSubject<AgentExecutionError | undefined>(
    undefined,
  );
  private _activeEventId$ = new BehaviorSubject<string | undefined>(undefined);

  get agent() {
    return this.thread.agent;
  }
  get status() {
    return this._statu$.value;
  }
  get status$() {
    return this._statu$.asObservable().pipe(distinctUntilChanged());
  }
  get error() {
    return this._error$.value;
  }
  get error$() {
    return this._error$.asObservable().pipe(distinctUntilChanged());
  }
  get activeEventId$() {
    return this._activeEventId$.asObservable();
  }
  get activeEventId() {
    return this._activeEventId$.value;
  }

  constructor({ thread }: { thread: AgentThread }) {
    this.thread = thread;
    this.logger = this.agent.logger?.child({ module: "agent-replay" });
  }

  stop() {
    this.shouldStop = true;
  }
}
