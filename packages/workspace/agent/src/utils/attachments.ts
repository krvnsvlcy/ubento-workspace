import { Agent } from "../agent/agent.js";
import { MessageItem } from "./ui.js";

export type AttachmentInputEvent = any;

export type AttachmentType<InputData, MessageData> = {
  type: string;
  defaultLabel?: string;
  defaultIcon?: string;
  match: (event: AttachmentInputEvent) => boolean;
  handle: (
    event: AttachmentInputEvent,
  ) => NonNullable<InputData | (() => Promise<InputData>)>[];
  toMessageAttachment: (data: InputData, agent: Agent) => MessageData;
  format: (data: MessageData) => Promise<MessageItem | undefined>;
  icon: (data: MessageData, agent: Agent) => string;
  label: (data: MessageData, agent: Agent) => string;
};
