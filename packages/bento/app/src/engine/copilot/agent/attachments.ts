import { Copilot } from "../copilot/copilot.js";
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
  toMessageAttachment: (data: InputData, copilot: Copilot) => MessageData;
  format: (data: MessageData) => Promise<MessageItem | undefined>;
  icon: string;
  label: string;
};
