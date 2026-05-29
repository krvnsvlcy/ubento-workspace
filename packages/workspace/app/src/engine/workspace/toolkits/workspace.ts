import { WorkspaceBoardSpec } from "@ubento/bento.runtime";
import { AgentTool, createLocalToolkit } from "@ubento/workspace.agent";
import z from "zod";
import { WorkspaceToolApi } from "../environment";

export const createWorkspaceToolkit = (api: WorkspaceToolApi) => {
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
      api.goTo({
        location: { boardId: args.boardId, params: args.params || {} },
      });
      return {
        content: [
          { type: "text", text: `Navigated to board "${args.boardId}".` },
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

  const updateBoardTool: AgentTool<typeof updateBoardMetadataArgs> = {
    name: "update_board_metadata",
    description: "Update the metadata of a specific board (e.g., title).",
    args: updateBoardMetadataArgs,
    run: async ({ args }) => {
      await api.updateBoard({
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
        await api.deleteBoard({ boardId });
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
      const result = await api.createBoard({
        title: args.title,
      });
      return {
        content: [
          {
            type: "text",
            text: `Board "${result.title}" created successfully with ID "${result.id}".`,
          },
        ],
        structuredContent: result,
      };
    },
  };

  const listBoardsTool: AgentTool = {
    name: "list_boards",
    description: "List all boards in the current workspace, showing their IDs, titles, and children.",
    args: z.object({}),
    run: async () => {
      const boards = await api.listBoards();
      return {
        content: [
          {
            type: "text",
            text: boards.length > 0
              ? boards.map((b) => `- ${b.title} (ID: ${b.id})${b.children.length > 0 ? `, children: [${b.children.join(", ")}]` : ""}`).join("\n")
              : "No boards found in the workspace.",
          },
        ],
        structuredContent: boards,
      };
    },
  };

  return createLocalToolkit({
    name: "workspace",
    description: "Tools for navigating and inspecting the current workspace",
    tools: {
      goToTool,
      updateBoardTool,
      deleteBoardTool,
      createBoardTool,
      listBoardsTool,
    },
  });
};
