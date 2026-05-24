import {
  AgentTool,
  createLocalToolkit,
  renderYaml,
} from "@ubento/workspace.agent";
import z from "zod";

export const createRuntimeToolkit = ({
  focusBoard,
  readNode,
  clickNode,
  setValue,
  getValue,
  readLogs,
  readContext,
}: {
  focusBoard: (args: {
    location: { boardId: string; params: Record<string, string> };
  }) => Promise<void>;
  readNode: (selector: string) => Promise<string>;
  // events
  clickNode: (selector: string) => Promise<void>;
  setValue: (args: { selector: string; value: string }) => Promise<void>;
  getValue: (selector: string) => Promise<string>;
  // logs
  readLogs: (args: { from?: number; count?: number }) => Promise<string>;
  // state
  readContext: (path: string) => Promise<unknown>;
}) => {
  const focusBoardArgs = z.object({
    boardId: z.string().describe("The ID of the board to focus"),
    params: z
      .record(z.string(), z.string())
      .optional()
      .describe("Optional parameters to pass to the board"),
  });

  const focusBoardTool: AgentTool<typeof focusBoardArgs> = {
    name: "focus_board",
    description:
      "Focus/navigate to a specific board to inspect its active runtime.",
    args: focusBoardArgs,
    run: async ({ args }) => {
      await focusBoard({
        location: { boardId: args.boardId, params: args.params || {} },
      });
      return {
        content: [
          { type: "text", text: `Focused board "${args.boardId}".` },
        ],
      };
    },
  };

  const readNodeArgs = z.object({
    selector: z.string().describe("CSS Selector of the element to read. To select elements by bento ID, use '[bento-id=\"ID\"]'"),
  });

  const readNodeTool: AgentTool<typeof readNodeArgs> = {
    name: "read_node",
    description:
      "Read the HTML content/structure of a rendered element on the active board by its CSS Selector.",
    args: readNodeArgs,
    run: async ({ args }) => {
      const html = await readNode(args.selector);
      return {
        content: [{ type: "text", text: html }],
      };
    },
  };

  const clickNodeArgs = z.object({
    selector: z.string().describe("CSS Selector of the element to click. To select elements by bento ID, use '[bento-id=\"ID\"]'"),
  });

  const clickNodeTool: AgentTool<typeof clickNodeArgs> = {
    name: "click_node",
    description: "Simulate a click event on an active element by its CSS Selector.",
    args: clickNodeArgs,
    run: async ({ args }) => {
      await clickNode(args.selector);
      return {
        content: [
          { type: "text", text: `Clicked node matching selector "${args.selector}".` },
        ],
      };
    },
  };

  const setValueArgs = z.object({
    selector: z.string().describe("CSS Selector of the element/field to set value for. To select elements by bento ID, use '[bento-id=\"ID\"]'"),
    value: z.string().describe("The value to set"),
  });

  const setValueTool: AgentTool<typeof setValueArgs> = {
    name: "set_value",
    description: "Set the value of an input or selection field in the active runtime.",
    args: setValueArgs,
    run: async ({ args }) => {
      await setValue({ selector: args.selector, value: args.value });
      return {
        content: [
          { type: "text", text: `Set value of node matching selector "${args.selector}" to "${args.value}".` },
        ],
      };
    },
  };

  const getValueArgs = z.object({
    selector: z.string().describe("CSS Selector of the element to get the value of. To select elements by bento ID, use '[bento-id=\"ID\"]'"),
  });

  const getValueTool: AgentTool<typeof getValueArgs> = {
    name: "get_value",
    description: "Get the current value or text of an element in the active runtime.",
    args: getValueArgs,
    run: async ({ args }) => {
      const value = await getValue(args.selector);
      return {
        content: [{ type: "text", text: value }],
      };
    },
  };

  const readLogsArgs = z.object({
    from: z.number().optional().describe("The starting index for logs retrieval"),
    count: z.number().optional().describe("The maximum number of logs to retrieve"),
  });

  const readLogsTool: AgentTool<typeof readLogsArgs> = {
    name: "read_logs",
    description: "Read console logs from the active runtime.",
    args: readLogsArgs,
    run: async ({ args }) => {
      const logs = await readLogs({ from: args.from, count: args.count });
      return {
        content: [{ type: "text", text: logs || "No logs available." }],
      };
    },
  };

  const readContextArgs = z.object({
    path: z.string().describe("The JSON path of the context or state to read"),
  });

  const readContextTool: AgentTool<typeof readContextArgs> = {
    name: "read_context",
    description: "Read active runtime context or state value at a given JSON path.",
    args: readContextArgs,
    run: async ({ args }) => {
      const value = await readContext(args.path);
      return {
        content: [{ type: "text", text: renderYaml(value) }],
      };
    },
  };

  const waitArgs = z.object({
    duration: z.number().describe("The duration to wait in milliseconds"),
    reason: z.string().describe("The reason for pausing execution (e.g. 'Waiting for UI to update')"),
  });

  const waitTool: AgentTool<typeof waitArgs> = {
    name: "wait",
    description: "Pause execution for a specified duration (e.g., waiting for page load, animations, or async processing).",
    args: waitArgs,
    run: async ({ args }) => {
      await new Promise((resolve) => setTimeout(resolve, args.duration));
      return {
        content: [
          { type: "text", text: `Waited for ${args.duration}ms. Reason: ${args.reason}` },
        ],
      };
    },
  };

  return createLocalToolkit({
    name: "runtime",
    description: "Tools for inspecting and interacting with the active runtime in real time",
    tools: {
      focusBoard: focusBoardTool,
      readNode: readNodeTool,
      clickNode: clickNodeTool,
      setValue: setValueTool,
      getValue: getValueTool,
      readLogs: readLogsTool,
      readContext: readContextTool,
      wait: waitTool,
    },
  });
};
