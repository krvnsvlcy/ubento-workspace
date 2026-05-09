import {
  AgentTool,
  createLocalToolkit,
  renderYaml,
} from "@ubento/workspace.agent";
import z from "zod";

export const createWorkspaceToolkit = ({
  goTo,
  getBoard,
  listBoards,
  readBoardSpec,
  updateBoardSpec,
  updateBoardMetadata,
  deleteBoard,
  createBoard,
}: {
  goTo: (args: {
    location: { boardId: string; params: Record<string, string> };
  }) => void;
  getBoard: (args: {
    boardId: string;
  }) => Promise<{ id: string; title: string; spec: any }>;
  listBoards: () => Promise<{ boards: Array<{ id: string; title: string }> }>;
  readBoardSpec: (args: { boardId: string }) => Promise<any>;
  updateBoardSpec: (args: { boardId: string; patch: any[] }) => Promise<void>;
  updateBoardMetadata: (args: {
    boardId: string;
    metadata: { title?: string };
  }) => Promise<void>;
  deleteBoard: (args: { boardId: string }) => Promise<void>;
  createBoard: (args: { name: string }) => Promise<{ id: string }>;
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
    description:
      "Update the specification of a specific board using JSON Patch.",
    args: updateBoardSpecArgs,
    run: async ({ args }) => {
      await updateBoardSpec({
        boardId: args.boardId,
        patch: args.patch as any,
      });
      return {
        content: [
          { type: "text", text: `Updated board spec for "${args.boardId}".` },
        ],
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

  const updateBoardMetadataTool: AgentTool<typeof updateBoardMetadataArgs> = {
    name: "update_board_metadata",
    description: "Update the metadata of a specific board (e.g., title).",
    args: updateBoardMetadataArgs,
    run: async ({ args }) => {
      await updateBoardMetadata({
        boardId: args.boardId,
        metadata: args.metadata,
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
        name: args.title,
      });
      return {
        content: [
          {
            type: "text",
            text: `Created board "${args.title}" with ID "${result.id}".`,
          },
        ],
      };
    },
  };

  return createLocalToolkit({
    name: "workspace",
    description: "Tools for navigating and inspecting the current workspace",
    tools: [
      goToTool,
      getBoardTool,
      listBoardsTool,
      readBoardSpecTool,
      updateBoardSpecTool,
      updateBoardMetadataTool,
      deleteBoardTool,
      createBoardTool,
    ],
  });
};
