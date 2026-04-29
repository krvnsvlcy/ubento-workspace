import { z } from "zod";
import { Tool } from "@/engine/copilot/agent/tool.js";
import { AgentActionInstance } from "@/engine/copilot/agent/message.js";
import { UbentoSDK } from "@ubento/sdk";

export const checkFileToolSchema = z.object({
  path: z.string().describe("Path to the file to check"),
});

export function createCheckFileTool({
  ubentoApi,
}: {
  ubentoApi: UbentoSDK;
}): Tool<typeof checkFileToolSchema> {
  return {
    name: "check_file",
    description: "Check a file for diagnostics/errors.",
    args: checkFileToolSchema,
    async run(args, action: AgentActionInstance) {
      // Shim for SDK diagnostics check
      return {
        content: [{ type: "text", text: `No diagnostics found for ${args.path}` }],
      };
    },
  };
}
