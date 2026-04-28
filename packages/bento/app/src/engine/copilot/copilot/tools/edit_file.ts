import { Elll } from "@elllphnt/elll-engine";
import * as diff from "diff";
import { z } from "zod";
import { isFileWriteAllowed } from "../utils/deny_list.js";
import { EditorTool } from "./editor_tool.js";

const relaceKey = "rlc-LGO0dRRhoUi45CiEJUBgImfTQmwmIylkwdRkfg";

export const editFileToolSchema = z.object({
  path: z
    .string()
    .describe("The target file to modify. You must use an absolute path"),
  instruction: z.string()
    .describe(`A single sentence instruction describing the edit to be made.
This helps guide the apply model in merging the changes correctly.
Use first person perspective and focus on clarifying any ambiguous aspects of the edit.
Keep it brief and avoid repeating information from previous messages.`),
  edit: z.string()
    .describe(`Only include the exact code lines that need modification.
Do not include any code that stays the same - those sections should be marked with comments appropriate for the language, like: \`// ... existing code ...\``),
});

interface ApplyRequest {
  initialCode: string;
  editSnippet: string;
  instruction: string;
}

interface ApplyResponse {
  mergedCode: string;
}

export class EditFileTool extends EditorTool<
  typeof editFileToolSchema,
  { message: string }
> {
  static readonly toolName = "edit_file";

  constructor({ elll }: { elll: Elll }) {
    super({
      elll,
      name: EditFileTool.toolName,
      description: [
        "Use this tool to make LOCALIZED CHANGES to an existing file. Do NOT use this to create new files or completely rewrite files - use write_file for that.",
        "This tool uses an AI-powered merge system to apply your changes to the existing code.",
        "",
        "IMPORTANT: Only include the code lines that need modification in the `edit` field.",
        "Follow these formatting rules:",
        '- Abbreviate sections of the code that will remain the same by replacing those sections with a comment like "// ... existing code ...", "// ... rest of code ...", "// ... keep existing code ...".',
        "  - Be precise with the location of these comments within your edit snippet. The merge model will use the context clues you provide to accurately apply your changes.",
        '  - If applicable, include concise information about specific code segments you wish to retain: "// ... keep calculateTotalFunction ...".',
        "  - If you plan on deleting a section, you must provide the context to delete it. Some options:",
        "      1. If the initial code is ```code \\n Block 1 \\n Block 2 \\n Block 3 \\n code```, and you want to remove Block 2, you would output ```// ... existing code ... \\n Block 1 \\n  Block 3 \\n // ... rest of code ...```.",
        "      2. If the initial code is ```code \\n Block \\n code```, and you want to remove Block, you can also specify ```// ... existing code ... \\n // remove Block \\n // ... rest of code ...```.",
        "  - Use the comment format applicable to the specific language to express these truncations.",
        "  - Preserve the indentation and code structure of exactly how you believe the final code will look.",
        "  - Be as length efficient as possible without omitting key context.",
      ].join("\n"),
      args: editFileToolSchema,
    });
  }

  async run(args: z.infer<typeof editFileToolSchema>, _action: any) {
    const worker = this.getWorkerOrThrow();

    // Check if file exists
    const existingFile = await worker.getFileAtPath(args.path);

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

    // Reject if file doesn't exist - use write_file tool instead
    if (!existingFile) {
      throw new Error(
        `File ${args.path} does not exist. Use the write_file tool to create new files.`,
      );
    }

    // Call Relace Apply endpoint
    try {
      const fileContent = await worker.readFileAtPath(args.path);
      const initialCode = fileContent.text;

      const request: ApplyRequest = {
        initialCode,
        editSnippet: args.edit,
        instruction: args.instruction,
      };

      const response = await fetch(
        "https://instantapply.endpoint.relace.run/v1/code/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${relaceKey}`,
          },
          body: JSON.stringify(request),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApplyResponse = await response.json();

      // Generate unified diff
      const patch = diff.createPatch(
        args.path,
        initialCode,
        result.mergedCode,
        "before",
        "after",
      );

      // Check if there are actual changes
      const hasChanges = initialCode !== result.mergedCode;

      if (hasChanges) {
        await worker.writeFileAtPath({
          path: args.path,
          text: result.mergedCode,
          type: "file",
        });
        const msg = `Applied code changes using Relace API.\n\nChanges made:\n${patch}`;
        return {
          content: [{ type: "text" as const, text: msg }],
          structuredContent: { message: msg },
        };
      } else {
        return {
          content: [{ type: "text" as const, text: "No changes made" }],
          structuredContent: { message: "No changes made" },
        };
      }
    } catch (e) {
      const msg = `Error applying code changes: ${e instanceof Error ? e.message : String(e)}`;
      return {
        isError: true,
        content: [{ type: "text" as const, text: msg }],
      };
    }
  }
}
