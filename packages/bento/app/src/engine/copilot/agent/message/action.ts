import { LLMContent } from "./llm.js";

export enum AgentActionStatus {
  Pending = "pending",
  Running = "running",
  Completed = "completed",
  Failed = "failed",
  Aborted = "aborted",
}

export type AgentActionData<
  I extends Record<string, any> = Record<string, any>,
  O extends Record<string, any> = Record<string, any>,
> = {
  id: string;
  tool: string;
  status: AgentActionStatus;
  input?: I;
  output?: LLMContent;
  structured_output?: O;
};
