import { IntelligenceFile } from "@elllphnt/backend/build/resources/intelligence_file.js";
import { Elll } from "@elllphnt/elll-engine";
import { elllIcons16 } from "@elllphnt/elll-icons/16";
import { fileIcon } from "@elllphnt/elll-primitives-domain";
import { map, of } from "rxjs";
import { AttachmentType } from "~/lib/agents/attachments/attachments.js";
import { MessageItem } from "~/lib/agents/message/item.js";
import { CopilotAttachmentInputEvent } from "../input.js";

export function intelligenceFileCopilotInputAttachmentType(
  elll: Elll,
): AttachmentType<
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
    defaultIcon: elllIcons16.core.files.file,
    match: () => {
      return true;
    },
    handle: (event: CopilotAttachmentInputEvent) => {
      const _workspace = event.copilot.elll.repository?.workspace;
      if (!_workspace) {
        throw new Error("No workspace found");
      }
      const workspace = _workspace;

      const files = event.payload.files;
      return files.map((file) => {
        return async () => {
          const intelligenceFile = await workspace.uploadIntelligenceFile(file);
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
      const intelligenceFile = elll.backend.resource<IntelligenceFile>(
        data.id,
        true,
      );
      const intelligenceFileData = await intelligenceFile?.getData();
      if (!intelligenceFileData) {
        console.warn(`Intelligence file not found: ${data.id}`);
        return undefined;
      }
      const publicUrl = await intelligenceFile?.getPublicUrl({
        ttl: 15 * 60 * 1000,
      });
      const name = intelligenceFileData.name;

      if (intelligenceFileData.type.startsWith("image/")) {
        return {
          type: "image",
          label: name,
          url: new URL(publicUrl).toString(),
          mediaType: intelligenceFileData.type,
        };
      } else {
        return {
          type: "file",
          label: name,
          url: new URL(publicUrl).toString(),
          mediaType: intelligenceFileData.type,
        };
      }
    },
    icon: (data, copilot) => {
      const intelligenceFile = copilot?.elll.backend.resource<IntelligenceFile>(
        data.id,
        true,
      );
      return [
        fileIcon(intelligenceFile?.type),
        intelligenceFile?.type$.pipe(map((t) => fileIcon(t))) ?? of(undefined),
      ];
    },
    label: (data, copilot) => {
      const intelligenceFile = copilot?.elll.backend.resource<IntelligenceFile>(
        data.id,
        true,
      );
      return [
        intelligenceFile?.name,
        intelligenceFile?.name$.pipe(map((n) => n)) ?? of(undefined),
      ];
    },
  };
}
