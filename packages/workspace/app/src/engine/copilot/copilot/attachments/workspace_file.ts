import { Agent } from "@ubento/workspace.agent";
import { AttachmentType } from "@ubento/workspace.agent";
import { CopilotAttachmentInputEvent } from "../input.js";

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
    match: (event: CopilotAttachmentInputEvent) => {
      return !!(event.payload as any).files && (event.payload as any).files.length > 0;
    },
    handle: (event: CopilotAttachmentInputEvent) => {
      const filePaths = (event.payload as any).filePaths || [];
      return filePaths.map((filePath: string) => {
        return {
          path: filePath,
        };
      });
    },
    toMessageAttachment: (data: { path: string }) => {
      return data;
    },
    format: async (data: { path: string }) => {
      return {
        type: "file",
        label: data.path,
        url: "#",
        mediaType: "application/octet-stream",
      };
    },
    icon: (data: { path: string }, agent: Agent) => "file",
    label: (data: { path: string }, agent: Agent) => data.path,
  };
}
