import { AgentEventData } from "./message.js";

export enum AgentTaskStatus {
  Pending = "pending",
  Running = "running",
  Completed = "completed",
  Failed = "failed",
  Aborted = "aborted",
}

export type AgentTask = {
  id: string;
  iteration: number;
  agent: string;
  title: string;
  preamble: string;
  message: string;
  status: AgentTaskStatus;
  data?: Record<string, any>;
  output?: string;
  error?: string;
  events?: AgentEventData[];
};
