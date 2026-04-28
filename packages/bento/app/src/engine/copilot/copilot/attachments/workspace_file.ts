import { editorDataTransferTypes } from "@elllphnt/elll-editor-extension";
import { Elll } from "@elllphnt/elll-engine";
import { elllIcons16 } from "@elllphnt/elll-icons/16";
import { fileIcon } from "@elllphnt/elll-primitives-domain";
import { map, of, switchMap } from "rxjs";
import { AttachmentType } from "../../agent/attachments.js";
import { CopilotAttachmentInputEvent } from "../input.js";

export function workspaceFileCopilotInputAttachmentType(
  elll: Elll,
): AttachmentType<
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
    defaultIcon: elllIcons16.core.files.file,
    match: (event) => {
      return event.payload.has(editorDataTransferTypes.workspaceFilePaths);
    },
    handle: (event: CopilotAttachmentInputEvent) => {
      const filePaths = event.payload.getData(
        editorDataTransferTypes.workspaceFilePaths,
      );
      if (!filePaths) {
        throw new Error("No file paths found");
      }
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
      const workspace = elll.repository?.workspace;
      if (!workspace) {
        throw new Error("No workspace found");
      }
      const workspaceFile = await workspace.getFileAtPath(data.path);
      if (!workspaceFile) {
        console.warn(`Workspace file not found: ${data.path}`);
        return undefined;
      }
      const fileData = await workspaceFile.getData();
      if (!fileData) {
        console.warn(`Workspace file not found: ${data.path}`);
        return undefined;
      }

      return {
        type: "data",
        label: fileData.path,
        data: {
          path: fileData.path,
          type: fileData.type,
        },
      };
    },
    icon: (data) => {
      const workspace = elll.repository?.workspace;
      if (!workspace) {
        throw new Error("No workspace found");
      }
      const query = workspace.fileAtPath(data.path, {
        autoFetch: true,
      });
      return [
        fileIcon(query.result?.type),
        query.result$.pipe(
          switchMap((r) => r?.type$ ?? of(undefined)),
          map((t) => fileIcon(t)),
        ),
      ];
    },
    label: (data) => {
      const workspace = elll.repository?.workspace;
      if (!workspace) {
        throw new Error("No workspace found");
      }
      const query = workspace.fileAtPath(data.path, {
        autoFetch: true,
      });
      return [
        query.result?.name,
        query.result$.pipe(switchMap((r) => r?.name$ ?? of(undefined))),
      ];
    },
  };
}
