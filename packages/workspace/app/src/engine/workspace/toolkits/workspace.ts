import { BoardSpec } from "@ubento/bento.core";
import { ParsedSpec } from "@ubento/bento.runtime";
import {
  AgentTool,
  createLocalToolkit,
  renderYaml,
} from "@ubento/workspace.agent";
import z from "zod";

export const createWorkspaceToolkit = ({
  goTo,
  updateBoard,
  deleteBoard,
  createBoard,
}: {
  goTo: (args: {
    location: { boardId: string; params: Record<string, string> };
  }) => void;
  updateBoard: (args: {
    boardId: string;
    update: { title?: string };
  }) => Promise<void>;
  deleteBoard: (args: { boardId: string }) => Promise<void>;
  createBoard: (args: {
    title: string;
  }) => Promise<ParsedSpec<BoardSpec> & { boardId: string; id: string }>;
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

  return createLocalToolkit({
    name: "workspace",
    description: "Tools for navigating and inspecting the current workspace",
    tools: {
      goToTool,
      updateBoardTool,
      deleteBoardTool,
      createBoardTool,
    },
  });
};
