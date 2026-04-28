import { AgentActionData } from "./action.js";
import { MessageAttachment as MessageAttachmentData } from "./attachments.js";
import { AgentError } from "./error.js";

export type AgentEventType<T extends string, D> = {
  type: T;
  data: D;
};

export type AgentEventData =
  | AgentEventType<"action", AgentActionData>
  | AgentEventType<"error", AgentError>;

export type AgentMessageStatus = "success" | "error";

export type AgentMessageError = {
  origin: "agent" | "system" | "user" | "tool";
  type: string;
  message: string;
};
export type AgentMessageData = {
  reasoning?: string;
  events?: AgentEventData[];
  status?: AgentMessageStatus;
  error?: AgentMessageError;
};

export type UserMessageData = {
  text: string;
  attachments?: MessageAttachmentData[];
};

export type IntelligenceMessageData = UserMessageData | AgentMessageData;
