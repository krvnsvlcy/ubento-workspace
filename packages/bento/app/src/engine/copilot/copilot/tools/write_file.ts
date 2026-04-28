import { Elll } from "@elllphnt/elll-engine";
import { FileContentDiagnostic } from "@elllphnt/workspace-worker-client";
import { z } from "zod";
import { AgentAction } from "~/lib/agents/message.js";
import { fileResource } from "../resources/file.js";
import { isFileWriteAllowed } from "../utils/deny_list.js";
import { EditorTool } from "./editor_tool.js";

export const writeFileToolSchema = z.object({
  path: z.string().describe("Path to the file to write"),
  type: z
    .enum(["elll", "script", "json", "markdown", "text", "yaml"])
    .describe("The type of the file"),
  content: z.string().describe("Content to write to the file"),
});

export class WriteFileTool extends EditorTool<
  typeof writeFileToolSchema,
  {
    success: boolean;
    contentLength?: number;
    diagnostics?: FileContentDiagnostic[];
    error?: string;
  }
> {
  static readonly toolName = "write_file";

  constructor({ elll }: { elll: Elll }) {
    super({
      elll,
      name: WriteFileTool.toolName,
      description: [
        "Use this tool to CREATE a new file or COMPLETELY OVERWRITE an existing file with new content.",
        "This tool replaces the entire file contents - use edit_file for localized changes to existing files.",
        "",
        "When to use this tool:",
        "- Creating a new file from scratch",
        "- Completely rewriting a file with new content",
        "- The changes are so extensive that a full rewrite is clearer than a localized edit",
        "",
        "When NOT to use this tool:",
        "- Making small, localized changes to an existing file (use edit_file instead)",
        "- Modifying only a few lines or functions in a large file (use edit_file instead)",
      ].join("\n"),
      args: writeFileToolSchema,
      playable: true,
    });
  }

  async play(args: z.infer<typeof writeFileToolSchema>) {
    if (!isFileWriteAllowed(args.path)) {
      return {
        content: [
          {
            type: "text" as const,
            text: "File is not allowed to be written to.",
          },
        ],
      };
    }

    const worker = this.getWorkerOrThrow();
    const result = await worker.writeFileAtPath({
      path: args.path,
      text: args.content,
      type: args.type,
      options: {
        autoCreateMissingPaths: true,
      },
    });
    if (result.success) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Wrote ${args.content.length} characters to the file.`,
          },
        ],
        structuredContent: {
          success: true,
          contentLength: args.content.length,
          diagnostics: result.diagnostics,
        },
      };
    } else {
      const errorText = [
        `Failed to write file at path ${args.path}: ${result.error}`,
        ...(result.diagnostics?.map((d) => JSON.stringify(d, null, 2)) ?? []),
      ].join("\n");
      return {
        isError: true,
        content: [
          {
            type: "text" as const,
            text: errorText,
          },
        ],
        structuredContent: {
          success: false,
          error: errorText,
        },
      };
    }
  }
  async run(args: z.infer<typeof writeFileToolSchema>, action: AgentAction) {
    const result = await this.play(args);

    if (!result.isError) {
      await action.message.execution.thread.setResource({
        type: fileResource.type,
        key: args.path,
        data: fileResource.data({ path: args.path }),
      });
    }

    return result;
  }
}
