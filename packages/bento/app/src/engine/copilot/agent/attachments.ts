import { CopilotAttachmentInputEvent } from "../copilot/input.js";
import { Agent } from "./agent.js";
import { MessageItem } from "./message/item.js";

export type AttachmentType<InputData, MessageData> = {
  type: string;
  defaultLabel?: string;
  defaultIcon?: string;
  match: (event: CopilotAttachmentInputEvent) => boolean;
  handle: (
    event: CopilotAttachmentInputEvent,
  ) => NonNullable<InputData | (() => engineStateChanged<InputData>)>[];
  toMessageAttachment: (data: InputData, agent: Agent) => MessageData;
  format: (data: MessageData) => engineStateChanged<MessageItem | undefined>;
  icon: (data: MessageData, agent: Agent) => string;
  label: (data: MessageData, agent: Agent) => string;
};
