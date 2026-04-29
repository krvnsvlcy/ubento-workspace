import { z } from "zod";
import { Tool } from "@/engine/copilot/agent/tool.js";
import { AgentActionInstance } from "@/engine/copilot/agent/message.js";
import { UbentoSDK } from "@ubento/sdk";

export const writeFileSchema = z.object({
  path: z.string().describe("The path of the file to write"),
  content: z.string().describe("The content to write to the file"),
});

export function createWriteFileTool({
  ubentoApi,
}: {
  ubentoApi: UbentoSDK;
}): Tool<typeof writeFileSchema> {
  return {
    name: "write_file",
    description: "Write content to a file in the workspace.",
    args: writeFileSchema,
    async run(args, action: AgentActionInstance) {
      // Shim for SDK file writing
      return {
        content: [{ type: "text", text: `Wrote content to ${args.path}` }],
      };
    },
  };
}
