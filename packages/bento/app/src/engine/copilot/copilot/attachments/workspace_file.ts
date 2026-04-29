import { AttachmentType } from "../../agent/attachments.js";
import { CopilotAttachmentInputEvent } from "../input.js";
import { Agent } from "../../agent/agent.js";

export function workspaceFileCopilotInputAttachmentType(): AttachmentType<
  {
    path: string;
  },
  {
    path: string;
  }
> {
  return {
    type: "workspace-file",
    defaultLabel: "File",
    defaultIcon: "file",
    match: (event) => {
      return !!event.payload.files && event.payload.files.length > 0;
    },
    handle: (event: CopilotAttachmentInputEvent) => {
      const filePaths = (event.payload as any).filePaths || [];
      return filePaths.map((filePath: string) => {
        return {
          path: filePath,
        };
      });
    },
    toMessageAttachment: (data) => {
      return data;
    },
    format: async (data) => {
      return {
        type: "file",
        label: data.path,
        url: "#",
        mediaType: "application/octet-stream",
      };
    },
    icon: (data, agent: Agent) => "file",
    label: (data, agent: Agent) => data.path,
  };
}
