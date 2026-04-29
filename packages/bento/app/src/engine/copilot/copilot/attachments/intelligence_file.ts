import { AttachmentType } from "@/engine/copilot/agent/attachments.js";
import { MessageItem } from "@/engine/copilot/agent/message/item.js";
import { CopilotAttachmentInputEvent } from "../input.js";
import { Agent } from "../../agent/agent.js";

export interface IntelligenceFile {
  id: string;
  name: string;
  type: string;
}

export function intelligenceFileCopilotInputAttachmentType(): AttachmentType<
  {
    file: File;
    intelligenceFile: IntelligenceFile;
  },
  {
    id: string;
  }
> {
  return {
    type: "intelligence-file",
    defaultLabel: "File",
    defaultIcon: "file",
    match: () => {
      return true;
    },
    handle: (event: CopilotAttachmentInputEvent) => {
      const files = event.payload.files;
      if (!files) return [];

      return files.map((file: File) => {
        return async () => {
          // Shim for upload
          const intelligenceFile: IntelligenceFile = {
            id: crypto.randomUUID(),
            name: file.name,
            type: file.type,
          };
          return {
            file,
            intelligenceFile,
          };
        };
      });
    },
    toMessageAttachment: (data) => {
      return {
        id: data.intelligenceFile.id,
      };
    },
    format: async (data): Promise<MessageItem | undefined> => {
      // Shim for formatting
      return {
        type: "file",
        label: "File",
        url: "#",
        mediaType: "application/octet-stream",
      };
    },
    icon: (data, agent: Agent) => "file",
    label: (data, agent: Agent) => "File",
  };
}
