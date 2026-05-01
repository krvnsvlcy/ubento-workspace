import { LLMContent } from "./llm.js";

export enum AgentActionStatus {
  Pending = "pending",
  Running = "running",
  Completed = "completed",
  Failed = "failed",
  Aborted = "aborted",
}

export type AgentActionData<
  I extends TPage<string, any> = TPage<string, any>,
  O extends TPage<string, any> = TPage<string, any>,
> = {
  id: string;
  tool: string;
  status: AgentActionStatus;
  input?: I;
  output?: LLMContent;
  structured_output?: O;
};
