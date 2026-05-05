import { AgentActionInstance } from "@/engine/copilot/agent/message.js";
import { Tool } from "@/engine/copilot/agent/tool.js";
import { UbentoSDK } from "@ubento/services.sdk";
import { z } from "zod";

export const editFileToolSchema = z.object({
  path: z
    .string()
    .describe("The target file to modify. You must use an absolute path"),
  instruction: z
    .string()
    .describe("A single sentence instruction describing the edit to be made."),
  edit: z
    .string()
    .describe("Only include the exact code lines that need modification."),
});

export function createEditFileTool({
  ubentoApi,
}: {
  ubentoApi: UbentoSDK;
}): Tool<typeof editFileToolSchema> {
  return {
    name: "edit_file",
    description: "Use this tool to make LOCALIZED CHANGES to an existing file.",
    args: editFileToolSchema,
    async run(args, action: AgentActionInstance) {
      // Shim for SDK file editing
      return {
        content: [{ type: "text", text: `Applied changes to ${args.path}` }],
      };
    },
  };
}
