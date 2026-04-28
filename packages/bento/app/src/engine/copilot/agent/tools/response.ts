import { z } from "zod";
import { Tool, ToolCallResult } from "../tool.js";

export const responseToolSchema = z.object({
  content: z
    .string()
    .describe("Final response content to display to the user in Markdown"),
});

export const responseTool: Tool<typeof responseToolSchema, {}> = {
  name: "response",
  description: "Send a message to the user. Use this to provide updates, ask for input, or respond to user queries.",
  args: responseToolSchema,
  async run(args, action) {
    const thread = action.message.execution.getState().thread;
    const setResource = thread.getState ? (p: any) => thread.getState().setResource(p) : (p: any) => (thread as any).setResource(p);

    await setResource({
      key: "response",
      type: "response",
      data: args.content,
    });
    return {
      content: [{ type: "text", text: "Response sent to user." }],
    };
  },
};

