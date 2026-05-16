import { BoardSpec } from "@ubento/bento.core";
import { ParsedSpec, SpecIssue } from "@ubento/bento.runtime";
import {
  AgentTool,
  createLocalToolkit,
  renderYaml,
} from "@ubento/workspace.agent";
import z from "zod";
import { extractBoardContext } from "../engine";

export const createWorkspaceToolkit = ({
  goTo,
  // boards
  getBoard,
  listBoards,
  updateBoard,
  deleteBoard,
  createBoard,
  // board specs
  readBoardSpec,
  updateBoardSpec,
  resolveBoardContextSchema,
}: {
  goTo: (args: {
    location: { boardId: string; params: Record<string, string> };
  }) => void;
  // boards
  getBoard: (args: {
    boardId: string;
  }) => Promise<{ id: string; title: string; spec: any }>;
  listBoards: () => Promise<{ boards: Array<{ id: string; title: string }> }>;
  updateBoard: (args: {
    boardId: string;
    update: { title?: string };
  }) => Promise<void>;
  deleteBoard: (args: { boardId: string }) => Promise<void>;
  createBoard: (args: { title: string }) => Promise<ParsedSpec<BoardSpec>>;
  // board specs
  readBoardSpec: (args: { boardId: string }) => Promise<any>;
  updateBoardSpec: (args: {
    boardId: string;
    patch: any[];
  }) => Promise<ParsedSpec<BoardSpec>>;
  resolveBoardContextSchema: (args: { boardId: string }) => Promise<any>;
}) => {
  const goToArgs = z.object({
    boardId: z.string().describe("The ID of the board to navigate to"),
    params: z
      .record(z.string(), z.string())
      .optional()
      .describe("Optional parameters to pass to the board"),
  });
  const goToTool: AgentTool<typeof goToArgs> = {
    name: "go_to",
    description:
      "Navigate to a specific board in the workspace. Use this to open a board by its ID.",
    args: goToArgs,
    run: async ({ args }) => {
      goTo({
        location: { boardId: args.boardId, params: args.params || {} },
      });
      return {
        content: [
          { type: "text", text: `Navigated to board "${args.boardId}".` },
        ],
      };
    },
  };

  const getBoardArgs = z.object({
    boardId: z.string().describe("The ID of the board to retrieve"),
  });
  const getBoardTool: AgentTool<typeof getBoardArgs> = {
    name: "get_board",
    description:
      "Get detailed information about a specific board, including its spec and configuration.",
    args: getBoardArgs,
    run: async ({ args }) => {
      const board = await getBoard({ boardId: args.boardId });
      return {
        content: [
          {
            type: "text",
            text: renderYaml({
              id: board.id,
              title: board.title,
              spec: board.spec,
            }),
          },
        ],
      };
    },
  };

  const listBoardsTool: AgentTool = {
    name: "list_boards",
    description: "List all boards available in the current workspace.",
    args: z.object({}),
    run: async () => {
      const result = await listBoards();
      const summary = result.boards.map((b) => ({
        id: b.id,
        title: b.title,
      }));
      return {
        content: [{ type: "text", text: renderYaml(summary) }],
      };
    },
  };

  const readBoardSpecArgs = z.object({
    boardId: z.string().describe("The ID of the board to read the spec from"),
  });
  const readBoardSpecTool: AgentTool<typeof readBoardSpecArgs> = {
    name: "read_board_spec",
    description: "Read the specification of a specific board.",
    args: readBoardSpecArgs,
    run: async ({ args }) => {
      const spec = await readBoardSpec({ boardId: args.boardId });
      return {
        content: [{ type: "text", text: renderYaml(spec) }],
        structuredContent: spec,
      };
    },
  };

  const updateBoardSpecArgs = z.object({
    boardId: z.string().describe("The ID of the board to update"),
    patch: z
      .array(z.any())
      .describe("JSON Patch operations to apply to the board spec"),
  });
  const updateBoardSpecTool: AgentTool<typeof updateBoardSpecArgs> = {
    name: "update_board_spec",
    description: [
      "Update the specification of a specific board using JSON Patch.",
      "",
      "Example patch to add an element and update children:",
      "```json",
      "[",
      "  {",
      '    "op": "add",',
      '    "path": "/elements/my_element",',
      '    "value": { "component": "Card" }',
      "  },",
      "  {",
      '    "op": "add",',
      '    "path": "/children/-",',
      '    "value": "my_element"',
      "  }",
      "]",
      "```",
    ].join("\n"),
    args: updateBoardSpecArgs,
    run: async ({ args }) => {
      const result = await updateBoardSpec({
        boardId: args.boardId,
        patch: args.patch as any,
      });
      return {
        content: [
          {
            type: "text",
            text: renderYaml({
              isValid: result.isValid,
              issues: result.issues || [],
            }),
          },
        ],
        structuredContent: result,
      };
    },
  };

  const updateBoardMetadataArgs = z.object({
    boardId: z.string().describe("The ID of the board to update"),
    metadata: z
      .object({
        title: z.string().optional().describe("The new title for the board"),
      })
      .describe("The metadata updates to apply"),
  });

  const updateBoardTool: AgentTool<typeof updateBoardMetadataArgs> = {
    name: "update_board_metadata",
    description: "Update the metadata of a specific board (e.g., title).",
    args: updateBoardMetadataArgs,
    run: async ({ args }) => {
      await updateBoard({
        boardId: args.boardId,
        update: args.metadata,
      });
      return {
        content: [
          {
            type: "text",
            text: `Updated metadata for board "${args.boardId}".`,
          },
        ],
      };
    },
  };

  const deleteBoardArgs = z.object({
    boardIds: z.array(z.string()).describe("The IDs of the boards to delete"),
  });

  const deleteBoardTool: AgentTool<typeof deleteBoardArgs> = {
    name: "delete_boards",
    description: "Delete one or more boards by their IDs.",
    args: deleteBoardArgs,
    run: async ({ args }) => {
      for (const boardId of args.boardIds) {
        await deleteBoard({ boardId });
      }
      return {
        content: [
          {
            type: "text",
            text: `Deleted ${args.boardIds.length} board(s): ${args.boardIds.map((id) => `"${id}"`).join(", ")}.`,
          },
        ],
      };
    },
  };

  const createBoardArgs = z.object({
    title: z.string().describe("The title of the new board"),
  });

  const createBoardTool: AgentTool<typeof createBoardArgs> = {
    name: "create_board",
    description: "Create a new board in the workspace.",
    args: createBoardArgs,
    run: async ({ args }) => {
      const result = await createBoard({
        title: args.title,
      });
      return {
        content: [
          {
            type: "text",
            text: renderYaml({
              isValid: result.isValid,
              issues: result.issues || [],
            }),
          },
        ],
        structuredContent: result,
      };
    },
  };

  const checkBoardArgs = z.object({
    boardId: z.string().describe("The ID of the board to check"),
  });

  const checkBoardTool: AgentTool<typeof checkBoardArgs> = {
    name: "check_board",
    description: "Check the status and errors of a specific board.",
    args: checkBoardArgs,
    run: async ({ args }) => {
      const result = await readBoardSpec({ boardId: args.boardId });
      return {
        content: [
          {
            type: "text",
            text: renderYaml({
              isValid: result.isValid,
              issues: result.issues || [],
            }),
          },
        ],
        structuredContent: result,
      };
    },
  };

  const readBoardContextArgs = z.object({
    boardId: z
      .string()
      .describe("The ID of the board to read the context from"),
  });
  const readBoardContextTool: AgentTool<typeof readBoardContextArgs> = {
    name: "read_board_context",
    description:
      "Read the context-related parts of a board specification (params, state, store).",
    args: readBoardContextArgs,
    run: async ({ args }) => {
      const spec = await readBoardSpec({ boardId: args.boardId });
      const context = extractBoardContext(spec);
      return {
        content: [{ type: "text", text: renderYaml(context) }],
        structuredContent: context,
      };
    },
  };

  const updateBoardContextArgs = z.object({
    boardId: z.string().describe("The ID of the board to update"),
    patch: z
      .array(z.any())
      .describe("JSON Patch operations to apply to the board context"),
  });
  const updateBoardContextTool: AgentTool<typeof updateBoardContextArgs> = {
    name: "update_board_context",
    description:
      "Update the context-related parts of a board specification (params, state, store) using JSON Patch.",
    args: updateBoardContextArgs,
    run: async ({ args }) => {
      const spec = await updateBoardSpec({
        boardId: args.boardId,
        patch: args.patch as any,
      });
      const context = extractBoardContext(spec);
      return {
        content: [
          {
            type: "text",
            text: renderYaml({
              isValid: context.isValid,
              issues: context.issues,
            }),
          },
        ],
        structuredContent: context,
      };
    },
  };

  const checkBoardContextArgs = z.object({
    boardId: z.string().describe("The ID of the board to check"),
  });
  const checkBoardContextTool: AgentTool<typeof checkBoardContextArgs> = {
    name: "check_board_context",
    description:
      "Check the status and errors of a specific board's context configuration.",
    args: checkBoardContextArgs,
    run: async ({ args }) => {
      const result = await readBoardSpec({ boardId: args.boardId });
      const context = extractBoardContext(result);

      return {
        content: [
          {
            type: "text",
            text: renderYaml({
              isValid: context.isValid,
              issues: context.issues,
            }),
          },
        ],
        structuredContent: context,
      };
    },
  };

  const getResolvedBoardContextArgs = z.object({
    boardId: z
      .string()
      .describe("The ID of the board to get the resolved context for"),
  });
  const getResolvedBoardContextTool: AgentTool<
    typeof getResolvedBoardContextArgs
  > = {
    name: "get_resolved_board_context",
    description: "Get the resolved schema for the board context.",
    args: getResolvedBoardContextArgs,
    run: async ({ args }) => {
      const result = await resolveBoardContextSchema({ boardId: args.boardId });
      return {
        content: [{ type: "text", text: renderYaml(result) }],
        structuredContent: result,
      };
    },
  };

  const extractBoardUi = (spec: ParsedSpec<BoardSpec>) => {
    const uiFields = new Set(["elements", "children", "style"]);
    let uiData = {};
    if (spec.data && typeof spec.data === "object") {
      uiData = {
        elements: (spec.data as any)?.elements,
        children: (spec.data as any)?.children,
        style: (spec.data as any)?.style,
      };
    }

    let uiIssues: SpecIssue[] = [];
    if (spec.issues) {
      uiIssues = spec.issues.filter((issue: SpecIssue) =>
        uiFields.has(issue.location[0]),
      );
    }

    return {
      isValid: uiIssues.length === 0,
      data: uiData,
      issues: uiIssues,
    };
  };

  const readBoardUiArgs = z.object({
    boardId: z
      .string()
      .describe("The ID of the board to read the UI specification from"),
  });
  const readBoardUiTool: AgentTool<typeof readBoardUiArgs> = {
    name: "read_board_ui",
    description:
      "Read the UI-related parts of a board specification (elements, children, style).",
    args: readBoardUiArgs,
    run: async ({ args }) => {
      const spec = await readBoardSpec({ boardId: args.boardId });
      const ui = extractBoardUi(spec);
      return {
        content: [{ type: "text", text: renderYaml(ui.data) }],
        structuredContent: ui.data,
      };
    },
  };

  const updateBoardUiArgs = z.object({
    boardId: z.string().describe("The ID of the board to update"),
    patch: z
      .array(z.any())
      .describe("JSON Patch operations to apply to the board UI"),
  });
  const updateBoardUiTool: AgentTool<typeof updateBoardUiArgs> = {
    name: "update_board_ui",
    description:
      "Update the UI-related parts of a board specification (elements, children, style) using JSON Patch.",
    args: updateBoardUiArgs,
    run: async ({ args }) => {
      const spec = await updateBoardSpec({
        boardId: args.boardId,
        patch: args.patch as any,
      });
      const ui = extractBoardUi(spec);
      return {
        content: [
          {
            type: "text",
            text: renderYaml({
              isValid: ui.isValid,
              issues: ui.issues,
            }),
          },
        ],
        structuredContent: ui,
      };
    },
  };

  const checkBoardUiArgs = z.object({
    boardId: z.string().describe("The ID of the board to check"),
  });
  const checkBoardUiTool: AgentTool<typeof checkBoardUiArgs> = {
    name: "check_board_ui",
    description:
      "Check the status and errors of a specific board's UI configuration.",
    args: checkBoardUiArgs,
    run: async ({ args }) => {
      const result = await readBoardSpec({ boardId: args.boardId });
      const ui = extractBoardUi(result);

      return {
        content: [
          {
            type: "text",
            text: renderYaml({
              isValid: ui.isValid,
              issues: ui.issues,
            }),
          },
        ],
        structuredContent: ui,
      };
    },
  };

  return createLocalToolkit({
    name: "workspace",
    description: "Tools for navigating and inspecting the current workspace",
    tools: {
      goToTool,
      getBoardTool,
      listBoardsTool,
      readBoardSpecTool,
      updateBoardSpecTool,
      updateBoardTool,
      deleteBoardTool,
      createBoardTool,
      checkBoardTool,
      readBoardContextTool,
      updateBoardContextTool,
      checkBoardContextTool,
      getResolvedBoardContextTool,
      readBoardUiTool,
      updateBoardUiTool,
      checkBoardUiTool,
    },
  });
};
