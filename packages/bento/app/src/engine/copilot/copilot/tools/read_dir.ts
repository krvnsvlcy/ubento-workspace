import { z } from "zod";
import { Tool } from "@/engine/copilot/agent/tool.js";
import { AgentActionInstance } from "@/engine/copilot/agent/message.js";
import { UbentoSDK } from "@ubento/sdk";

export const readDirSchema = z.object({
  path: z.string().describe("The path of the directory to read"),
});

export function createReadDirTool({
  ubentoApi,
}: {
  ubentoApi: UbentoSDK;
}): Tool<typeof readDirSchema> {
  return {
    name: "read_dir",
    description: "List the contents of a directory in the workspace.",
    args: readDirSchema,
    async run(args, action: AgentActionInstance) {
      // Shim for SDK directory reading
      return {
        content: [{ type: "text", text: `Contents of ${args.path}` }],
      };
    },
  };
}
