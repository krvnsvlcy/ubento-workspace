import { UbentoService } from "@/services/ubento/ubento.js";
import { WorkspaceSpec } from "@ubento/bento.core";
import { AgentTool, createLocalToolkit } from "@ubento/workspace.agent";
import z from "zod";

export const createModuleToolkit = ({
  ubento,
  getWorkspaceSpec,
  updateWorkspaceSpec,
}: {
  ubento: UbentoService;
  getWorkspaceSpec: () => WorkspaceSpec | undefined;
  updateWorkspaceSpec: (workspaceSpec: WorkspaceSpec) => Promise<void>;
}) => {
  /** Resolve board → module id + latest version id from the workspace spec */
  function resolveBoardModule(boardId: string): {
    moduleId: string;
    versionId: string;
  } | null {
    const spec = getWorkspaceSpec();
    const board = spec?.boards?.[boardId];
    if (!board?.module?.id) return null;
    return { moduleId: board.module.id, versionId: board.module.versionId };
  }
  async function updateBoardModule(boardId: string, versionId: string) {
    const spec = getWorkspaceSpec();
    if (!spec) return;
    const board = spec.boards?.[boardId];
    if (!board) return;
    spec.boards = {
      ...spec.boards,
      [boardId]: {
        ...board,
        module: {
          ...board.module,
          versionId,
        },
      },
    };
    await updateWorkspaceSpec(spec);
  }

  // ── read_board_module ──────────────────────────────────────────────────────

  const readBoardModuleArgs = z.object({
    boardId: z
      .string()
      .describe("The ID of the board whose module code to read"),
  });

  const readBoardModuleTool: AgentTool<typeof readBoardModuleArgs> = {
    name: "read_board_module",
    description:
      "Read the current source code of the module that backs a board. " +
      "Pass the board ID — the module is resolved automatically from the workspace spec.",
    args: readBoardModuleArgs,
    run: async ({ args }) => {
      const ref = resolveBoardModule(args.boardId);
      if (!ref) {
        return {
          content: [
            {
              type: "text",
              text: `Error: Board "${args.boardId}" not found in the workspace spec or has no associated module.`,
            },
          ],
        };
      }

      let vId = ref.versionId;
      if (!vId) {
        const mod = await ubento.sdk.module.getModule(ref.moduleId);
        vId = mod.latest_version_id || "";
      }
      if (!vId) {
        return {
          content: [
            {
              type: "text",
              text: `Error: Module "${ref.moduleId}" for board "${args.boardId}" has no versions.`,
            },
          ],
        };
      }

      const code = await ubento.sdk.module.readModuleVersionFile(
        ref.moduleId,
        vId,
        "index.tsx",
      );
      return {
        content: [{ type: "text", text: code ?? "" }],
      };
    },
  };

  // ── write_board_module ─────────────────────────────────────────────────────

  const writeBoardModuleArgs = z.object({
    boardId: z
      .string()
      .describe("The ID of the board whose module code to write"),
    content: z
      .string()
      .describe("The full new content of the module file (index.tsx)"),
  });

  const writeBoardModuleTool: AgentTool<typeof writeBoardModuleArgs> = {
    name: "write_board_module",
    description:
      "Save a new version of the module that backs a board. " +
      "Pass the board ID — the module is resolved automatically from the workspace spec.",
    args: writeBoardModuleArgs,
    run: async ({ args }) => {
      const ref = resolveBoardModule(args.boardId);
      if (!ref) {
        return {
          content: [
            {
              type: "text",
              text: `Error: Board "${args.boardId}" not found in the workspace spec or has no associated module.`,
            },
          ],
        };
      }

      const result = await ubento.sdk.module.saveModuleVersion(ref.moduleId, {
        content: args.content,
      });
      await updateBoardModule(args.boardId, result.latest_version_id);

      return {
        content: [
          {
            type: "text",
            text: `Successfully saved module for board "${args.boardId}". New version ID: "${result.latest_version_id}".`,
          },
        ],
      };
    },
  };

  return createLocalToolkit({
    name: "module",
    description: "Tools for reading and writing board module code",
    tools: {
      readBoardModule: readBoardModuleTool,
      writeBoardModule: writeBoardModuleTool,
    },
  });
};
