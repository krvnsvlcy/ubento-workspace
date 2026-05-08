import { z } from "zod";
import { AgentTool } from "../tool/tool.js";

export const responseToolSchema = z.object({
  content: z
    .string()
    .describe("Final response content to display to the user in Markdown"),
});

export const responseTool: AgentTool<typeof responseToolSchema> & {
  toolName: string;
} = {
  name: "response",
  toolName: "response",
  description: "Submit your final work and results to the user.",
  args: responseToolSchema,
  async run({ args }) {
    return {
      content: [{ type: "text", text: "Response sent to user." }],
      structuredContent: { response: args.content },
      shouldEnd: true,
    };
  },
};

export { responseTool as ResponseTool };
