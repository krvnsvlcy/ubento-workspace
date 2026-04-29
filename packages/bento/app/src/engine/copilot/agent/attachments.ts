import { Agent } from "./agent.js";
import { CopilotAttachmentInputEvent } from "../copilot/input.js";
import { MessageItem } from "./message/item.js";

export type AttachmentType<InputData, MessageData> = {
  type: string;
  defaultLabel?: string;
  defaultIcon?: string;
  match: (event: CopilotAttachmentInputEvent) => boolean;
  handle: (
    event: CopilotAttachmentInputEvent,
  ) => NonNullable<InputData | (() => Promise<InputData>)>[];
  toMessageAttachment: (data: InputData, agent: Agent) => MessageData;
  format: (data: MessageData) => Promise<MessageItem | undefined>;
  icon: (data: MessageData, agent: Agent) => string;
  label: (data: MessageData, agent: Agent) => string;
};
