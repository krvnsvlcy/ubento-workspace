import { z } from "zod";
import { Tool, ToolCallResult } from "../tool.js";

export const responseToolSchema = z.object({
  content: z
    .string()
    .describe("Final response content to display to the user in Markdown"),
});

export const responseTool: Tool<typeof responseToolSchema, {}> & {
  toolName: string;
} = {
  name: "response",
  toolName: "response",
  description: "Submit your final work and results to the user.",
  args: responseToolSchema,
  async run(args, action) {
    const thread = action.message.execution.thread;
    await thread.setResource({
      key: "response",
      type: "response",
      data: args.content,
    });
    return {
      content: [{ type: "text", text: "Response sent to user." }],
    };
  },
};

export { responseTool as ResponseTool };

