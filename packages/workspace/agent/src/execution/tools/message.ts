import { z } from "zod";
import { AgentTool } from "../tool.js";

export const messageToolSchema = z.object({
  content: z
    .string()
    .describe("Message content to display to the user in Markdown"),
  after: z
    .enum(["continue", "await_response", "finish"])
    .describe("What to do after this message."),
});

export const messageTool: AgentTool<typeof messageToolSchema, {}> & {
  toolName: string;
} = {
  name: "message",
  toolName: "message",
  description:
    "Send a message to the user. Use this to provide updates, ask for input, or respond to user queries.",
  args: messageToolSchema,
  async run(args) {
    return {
      content: [{ type: "text", text: `Message sent to user.` }],
      shouldEnd: args.after === "finish" || args.after === "await_response",
    };
  },
};

export { messageTool as MessageTool };
