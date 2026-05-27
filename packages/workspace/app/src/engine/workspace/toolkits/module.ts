import { UbentoService } from "@/services/ubento/ubento.js";
import { WorkspaceSpec } from "@ubento/bento.runtime";
import { AgentTool, createLocalToolkit } from "@ubento/workspace.agent";
import z from "zod";
import { applyModuleEdit } from "./edit-utils.js";

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
    await updateWorkspaceSpec({
      ...spec,
      boards: {
        ...spec.boards,
        [boardId]: {
          ...board,
          module: {
            ...board.module,
            versionId,
          },
        },
      },
    });
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

  // ── edit_board_module ──────────────────────────────────────────────────────

  const editBoardModuleArgs = z.object({
    boardId: z
      .string()
      .describe("The ID of the board whose module code to edit"),
    oldString: z
      .string()
      .describe("The exact or approximate block of text to replace"),
    newString: z
      .string()
      .describe("The new block of text to insert in place of oldString"),
    allowMultiple: z
      .boolean()
      .optional()
      .describe(
        "Whether to replace all occurrences. Defaults to false (only replace if exactly one match is found)",
      ),
    instruction: z
      .string()
      .optional()
      .describe(
        "The developer intent behind this edit, to help guide self-correction if matching fails",
      ),
  });

  const editBoardModuleTool: AgentTool<typeof editBoardModuleArgs> = {
    name: "edit_board_module",
    description:
      "Perform a targeted search-and-replace edit on the board module code. " +
      "Under the hood, it will attempt exact, flexible, regex, and fuzzy matching, " +
      "as well as LLM-assisted correction if the matching fails.",
    args: editBoardModuleArgs,
    run: async ({ args, environment, modelId, abortController }) => {
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
              text: `Error: Module "${ref.moduleId}" for board "${args.boardId}" has no versions to edit.`,
            },
          ],
        };
      }

      const currentContent = await ubento.sdk.module.readModuleVersionFile(
        ref.moduleId,
        vId,
        "index.tsx",
      );

      if (currentContent === null) {
        return {
          content: [
            {
              type: "text",
              text: `Error: Could not read content of file "index.tsx" for module "${ref.moduleId}".`,
            },
          ],
        };
      }

      const model = environment.getModel(modelId);

      const editResult = await applyModuleEdit(
        currentContent,
        {
          old_string: args.oldString,
          new_string: args.newString,
          allow_multiple: args.allowMultiple,
          instruction: args.instruction,
        },
        model,
        abortController.signal,
      );

      if (!editResult.success) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${editResult.error || "Failed to match and replace the code block."}`,
            },
          ],
          isError: true,
        };
      }

      const result = await ubento.sdk.module.saveModuleVersion(ref.moduleId, {
        content: editResult.newContent,
      });
      await updateBoardModule(args.boardId, result.latest_version_id);

      return {
        content: [
          {
            type: "text",
            text: `Successfully edited module for board "${args.boardId}" using strategy "${editResult.strategy}". New version ID: "${result.latest_version_id}".`,
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
      editBoardModule: editBoardModuleTool,
    },
  });
};
