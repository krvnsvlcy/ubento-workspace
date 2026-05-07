import { AttachmentType } from "@ubento/workspace.agent";
import { MessageItem } from "@ubento/workspace.agent";
import { Agent } from "@ubento/workspace.agent";
import { CopilotAttachmentInputEvent } from "../input.js";

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
    toMessageAttachment: (data: { file: File; intelligenceFile: IntelligenceFile }) => {
      return {
        id: data.intelligenceFile.id,
      };
    },
    format: async (data: { id: string }): Promise<MessageItem | undefined> => {
      // Shim for formatting
      return {
        type: "file",
        label: "File",
        url: "#",
        mediaType: "application/octet-stream",
      };
    },
    icon: (data: { id: string }, agent: Agent) => "file",
    label: (data: { id: string }, agent: Agent) => "File",
  };
}
