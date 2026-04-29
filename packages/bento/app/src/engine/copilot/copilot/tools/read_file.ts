import { z } from "zod";
import { Tool } from "@/engine/copilot/agent/tool.js";
import { AgentActionInstance } from "@/engine/copilot/agent/message.js";
import { UbentoSDK } from "@ubento/sdk";

export const readFileSchema = z.object({
  path: z.string().describe("The path of the file to read"),
});

export function createReadFileTool({
  ubentoApi,
}: {
  ubentoApi: UbentoSDK;
}): Tool<typeof readFileSchema> {
  return {
    name: "read_file",
    description: "Read the content of a file in the workspace.",
    args: readFileSchema,
    async run(args, action: AgentActionInstance) {
      // Shim for SDK file reading
      return {
        content: [{ type: "text", text: `Content of ${args.path}` }],
      };
    },
  };
}
