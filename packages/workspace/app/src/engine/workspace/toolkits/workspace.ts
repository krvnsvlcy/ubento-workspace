import { AgentTool, createLocalToolkit } from "@ubento/workspace.agent";
import z from "zod";
import { WorkspaceToolApi } from "../environment";
import { WorkspaceSpec } from "@ubento/bento.runtime";

export const createWorkspaceToolkit = (
  api: WorkspaceToolApi,
  options?: {
    getWorkspaceSpec: () => WorkspaceSpec | undefined;
    updateWorkspaceSpec: (spec: WorkspaceSpec) => Promise<void>;
  },
) => {
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
      await api.withCopilotChanges(
        () =>
          api.updateBoard({
            boardId: args.boardId,
            update: args.metadata,
          }),
        () => [`boards.${args.boardId}`],
      );
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
      await api.withCopilotChanges(
        async () => {
          for (const boardId of args.boardIds) {
            await api.deleteBoard({ boardId });
          }
        },
        () => args.boardIds.map((boardId) => `boards.${boardId}`),
      );
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
      const result = await api.withCopilotChanges(
        () =>
          api.createBoard({
            title: args.title,
          }),
        (res) => [`boards.${res.id}`],
      );
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
    description:
      "List all boards in the current workspace, showing their IDs, titles, and children.",
    args: z.object({}),
    run: async () => {
      const boards = await api.listBoards();
      return {
        content: [
          {
            type: "text",
            text:
              boards.length > 0
                ? boards
                    .map(
                      (b) =>
                        `- ${b.title} (ID: ${b.id}, module ID: ${b.module?.id || "none"})${b.children.length > 0 ? `, children: [${b.children.join(", ")}]` : ""}`,
                    )
                    .join("\n")
                : "No boards found in the workspace.",
          },
        ],
        structuredContent: boards,
      };
    },
  };

  const readBoardArgs = z.object({
    boardId: z.string().describe("The ID of the board to read"),
  });
  const readBoardTool: AgentTool<typeof readBoardArgs> = {
    name: "read_board",
    description: "Read the details/metadata of a specific board, including its associated module.",
    args: readBoardArgs,
    run: async ({ args }) => {
      const spec = options?.getWorkspaceSpec();
      const board = spec?.boards?.[args.boardId];
      if (!board) {
        return {
          content: [{ type: "text", text: `Error: Board "${args.boardId}" not found.` }],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: `Board Details:
- ID: ${board.id}
- Title: ${board.title}
- Associated Module ID: ${board.module?.id || "none"}
- Associated Module Version ID: ${board.module?.versionId || "none"}${board.children && board.children.length > 0 ? `\n- Children: ${board.children.join(", ")}` : ""}`,
          },
        ],
        structuredContent: board,
      };
    },
  };

  const listPackagesTool: AgentTool = {
    name: "list_packages",
    description: "List all installed packages and their versions in the current workspace.",
    args: z.object({}),
    run: async () => {
      const spec = options?.getWorkspaceSpec();
      const packages = spec?.packages || {};
      const packageList = Object.entries(packages);
      return {
        content: [
          {
            type: "text",
            text:
              packageList.length > 0
                ? packageList.map(([name, version]) => `- ${name}: ${version}`).join("\n")
                : "No packages installed in the workspace.",
          },
        ],
        structuredContent: packages,
      };
    },
  };

  const installPackageArgs = z.object({
    name: z.string().describe("The name of the package to install (e.g. 'lodash')"),
    version: z.string().describe("The version of the package to install (e.g. '4.17.21')"),
  });
  const installPackageTool: AgentTool<typeof installPackageArgs> = {
    name: "install_package",
    description: "Install or update a package in the workspace.",
    args: installPackageArgs,
    run: async ({ args }) => {
      const spec = options?.getWorkspaceSpec();
      if (!spec || !options) {
        return {
          content: [{ type: "text", text: "Error: Workspace options/spec not available." }],
        };
      }
      const saveAndUpdate = async () => {
        const nextPackages = { ...spec.packages, [args.name]: args.version };
        await options.updateWorkspaceSpec({
          ...spec,
          packages: nextPackages,
        });
      };
      await api.withCopilotChanges(saveAndUpdate, () => [`packages.${args.name}`]);
      return {
        content: [
          {
            type: "text",
            text: `Successfully installed package "${args.name}" at version "${args.version}".`,
          },
        ],
      };
    },
  };

  const removePackageArgs = z.object({
    name: z.string().describe("The name of the package to remove"),
  });
  const removePackageTool: AgentTool<typeof removePackageArgs> = {
    name: "remove_package",
    description: "Remove a package from the workspace.",
    args: removePackageArgs,
    run: async ({ args }) => {
      const spec = options?.getWorkspaceSpec();
      if (!spec || !options) {
        return {
          content: [{ type: "text", text: "Error: Workspace options/spec not available." }],
        };
      }
      if (!spec.packages || !spec.packages[args.name]) {
        return {
          content: [{ type: "text", text: `Package "${args.name}" is not installed.` }],
        };
      }
      const saveAndUpdate = async () => {
        const nextPackages = { ...spec.packages };
        delete nextPackages[args.name];
        await options.updateWorkspaceSpec({
          ...spec,
          packages: nextPackages,
        });
      };
      await api.withCopilotChanges(saveAndUpdate, () => [`packages.${args.name}`]);
      return {
        content: [
          {
            type: "text",
            text: `Successfully removed package "${args.name}".`,
          },
        ],
      };
    },
  };

  const listModulesTool: AgentTool = {
    name: "list_modules",
    description: "List all modules in the workspace, showing their IDs and version IDs.",
    args: z.object({}),
    run: async () => {
      const spec = options?.getWorkspaceSpec();
      if (!spec) {
        return {
          content: [{ type: "text", text: "Error: Workspace spec not available." }],
        };
      }
      const modules: Record<string, { id: string; versionId: string; source: string }> = {};
      if (spec.modules) {
        for (const [id, ref] of Object.entries(spec.modules)) {
          modules[id] = { id, versionId: ref.versionId, source: "workspace" };
        }
      }
      if (spec.boards) {
        for (const board of Object.values(spec.boards)) {
          if (board.module?.id) {
            modules[board.module.id] = {
              id: board.module.id,
              versionId: board.module.versionId,
              source: `board: ${board.title} (${board.id})`,
            };
          }
        }
      }
      const moduleList = Object.values(modules);
      return {
        content: [
          {
            type: "text",
            text:
              moduleList.length > 0
                ? moduleList.map((m) => `- Module ID: ${m.id} (Version: ${m.versionId || "none"}, Source: ${m.source})`).join("\n")
                : "No modules found in the workspace.",
          },
        ],
        structuredContent: moduleList,
      };
    },
  };

  return createLocalToolkit({
    name: "workspace",
    description: "Tools for navigating and inspecting the current workspace",
    tools: {
      goTo: goToTool,
      updateBoard: updateBoardTool,
      deleteBoard: deleteBoardTool,
      createBoard: createBoardTool,
      listBoards: listBoardsTool,
      readBoard: readBoardTool,
      listPackages: listPackagesTool,
      installPackage: installPackageTool,
      removePackage: removePackageTool,
      listModules: listModulesTool,
    },
  });
};
