import {
  DiagnosticManager,
  FileDiagnostic,
} from "@elllphnt/elll-editor-extension";
import { Elll } from "@elllphnt/elll-engine";
import { z } from "zod";
import { isFileReadAllowed } from "../utils/deny_list.js";
import { EditorTool } from "./editor_tool.js";

export const checkFileToolSchema = z.object({
  path: z.string().describe("Path to the file to check"),
});

export class CheckFileTool extends EditorTool<
  typeof checkFileToolSchema,
  {
    diagnostics: Record<string, FileDiagnostic[]>;
  }
> {
  static readonly toolName = "check_file";
  private diagnosticManager: DiagnosticManager;

  constructor({
    elll,
    diagnosticManager,
  }: {
    elll: Elll;
    diagnosticManager: DiagnosticManager;
  }) {
    super({
      elll,
      name: CheckFileTool.toolName,
      description: "Check a file for diagnostics/errors.",
      args: checkFileToolSchema,
    });
    this.diagnosticManager = diagnosticManager;
  }

  async run(args: z.infer<typeof checkFileToolSchema>, _action: any) {
    const worker = this.getWorkerOrThrow();
    if (!isFileReadAllowed(args.path)) {
      return {
        content: [
          {
            type: "text" as const,
            text: "File is not allowed to be read.",
          },
        ],
      };
    }

    const file = await worker.getFileAtPath(args.path);
    if (!file) {
      return {
        content: [
          {
            type: "text" as const,
            text: "No diagnostics found.",
          },
        ],
        structuredContent: {
          diagnostics: {},
        },
      };
    }

    const diagnostics = this.diagnosticManager.fileDiagnostics(file.id);
    const allDiagnostics = Object.values(diagnostics).flat();
    const contentText =
      allDiagnostics.length === 0
        ? "No diagnostics found."
        : allDiagnostics
            .map(
              (d) =>
                `[${d.severity.toUpperCase()}] ${d.message} at line ${d.start} (${d.source})`,
            )
            .join("\n");

    return {
      content: [
        {
          type: "text" as const,
          text: contentText,
        },
      ],
      structuredContent: {
        diagnostics,
      },
    };
  }
}
