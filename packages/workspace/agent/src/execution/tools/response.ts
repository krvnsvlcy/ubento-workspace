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
  description: "Submit your final response. Only call this when you are done.",
  args: responseToolSchema,
  async run({ args, thread }) {
    await thread.context.setResponse(args.content);
    return {
      content: [{ type: "text", text: "Response sent." }],
      structuredContent: { response: args.content },
      shouldEnd: true,
    };
  },
};

export { responseTool as ResponseTool };
