import { IntelligenceMessageData } from "./message/message.js";
import { AgentResource } from "./resource.js";

export type AgentHistoryMessageEntry = {
  type: "message";
  role: "user" | "agent";
  messageId: string;
  data: IntelligenceMessageData;
};

export type AgentHistorySummaryEntry = {
  type: "summary";
  messageIds: string[];
  data: string;
};

export type AgentHistoryEntry =
  | AgentHistoryMessageEntry
  | AgentHistorySummaryEntry;

export type ToolReference = {
  set: string;
  tool: string;
};

export type SkillReference = {
  id: string;
};

export type AgentContext = {
  history?: AgentHistoryEntry[];
  resources?: AgentResource[];
};

export type AgentContextStats = {
  window: number;
  budget: number;
  usage: number;
  breakdown: Record<string, number>;
};
