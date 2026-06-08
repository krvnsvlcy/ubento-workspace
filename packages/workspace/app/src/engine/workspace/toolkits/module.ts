import { UbentoService } from "@/services/ubento/ubento.js";
import { WorkspaceSpec } from "@ubento/bento.runtime";
import { AgentTool, createLocalToolkit } from "@ubento/workspace.agent";
import z from "zod";
import { applyModuleEdit } from "./edit-utils.js";

export const createModuleToolkit = ({
  ubento,
  getWorkspaceSpec,
  updateWorkspaceSpec,
  withCopilotChanges,
}: {
  ubento: UbentoService;
  getWorkspaceSpec: () => WorkspaceSpec | undefined;
  updateWorkspaceSpec: (workspaceSpec: WorkspaceSpec) => Promise<void>;
  withCopilotChanges?: <T>(
    run: () => Promise<T> | T,
    getPaths: (result: T) => string[],
  ) => Promise<T>;
}) => {
  async function updateWorkspaceModule(moduleId: string, versionId: string) {
    const spec = getWorkspaceSpec();
    if (!spec) return;

    // Create copies of boards and modules to update
    const updatedBoards = { ...spec.boards };
    let boardUpdated = false;
    for (const [boardId, board] of Object.entries(spec.boards || {})) {
      if (board?.module?.id === moduleId) {
        updatedBoards[boardId] = {
          ...board,
          module: {
            ...board.module,
            versionId,
          },
        };
        boardUpdated = true;
      }
    }

    const updatedModules = { ...spec.modules };
    let moduleUpdated = false;
    if (spec.modules?.[moduleId]) {
      updatedModules[moduleId] = {
        ...spec.modules[moduleId],
        versionId,
      };
      moduleUpdated = true;
    }

    if (boardUpdated || moduleUpdated) {
      await updateWorkspaceSpec({
        ...spec,
        boards: updatedBoards,
        modules: updatedModules,
      });
    }
  }

  // ── read_module ────────────────────────────────────────────────────────────

  const readModuleArgs = z.object({
    moduleId: z.string().describe("The ID of the module to read"),
    versionId: z.string().describe("The version ID of the module to read"),
  });
  const readModuleTool: AgentTool<typeof readModuleArgs> = {
    name: "read_module",
    description:
      "Read the source code of a workspace module for a specific version.",
    args: readModuleArgs,
    run: async ({ args }) => {
      const code = await ubento.sdk.module.readModuleVersionFile(
        args.moduleId,
        args.versionId,
        "index.tsx",
      );
      return {
        content: [{ type: "text", text: code ?? "" }],
      };
    },
  };

  // ── write_module ───────────────────────────────────────────────────────────

  const writeModuleArgs = z.object({
    moduleId: z.string().describe("The ID of the module to write"),
    content: z
      .string()
      .describe("The full new content of the module file (index.tsx)"),
    versionId: z
      .string()
      .describe(
        "The current/base version ID of the module that is being updated",
      ),
  });

  const writeModuleTool: AgentTool<typeof writeModuleArgs> = {
    name: "write_module",
    description: "Save a new version of the workspace module.",
    args: writeModuleArgs,
    run: async ({ args }) => {
      const saveAndUpdate = async () => {
        const res = await ubento.sdk.module.saveModuleVersion(args.moduleId, {
          content: args.content,
        });
        await updateWorkspaceModule(args.moduleId, res.latest_version_id);
        return res;
      };

      const getAffectedPaths = () => {
        const spec = getWorkspaceSpec();
        const paths: string[] = [`modules.${args.moduleId}`];
        if (spec) {
          for (const [boardId, board] of Object.entries(spec.boards || {})) {
            if (board?.module?.id === args.moduleId) {
              paths.push(`boards.${boardId}`);
            }
          }
        }
        return paths;
      };

      const result = withCopilotChanges
        ? await withCopilotChanges(saveAndUpdate, getAffectedPaths)
        : await saveAndUpdate();

      return {
        content: [
          {
            type: "text",
            text: `Successfully saved module "${args.moduleId}". New version ID: "${result.latest_version_id}".`,
          },
        ],
        structuredContent: {
          moduleId: args.moduleId,
          versionId: result.latest_version_id,
        },
      };
    },
  };

  // ── edit_module ────────────────────────────────────────────────────────────

  const editModuleArgs = z.object({
    moduleId: z.string().describe("The ID of the module to edit"),
    oldString: z
      .string()
      .describe("The exact or approximate block of text to replace"),
    newString: z
      .string()
      .describe("The new block of text to insert in place of oldString"),
    versionId: z.string().describe("The version ID of the module to edit"),
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

  const editModuleTool: AgentTool<typeof editModuleArgs> = {
    name: "edit_module",
    description:
      "Perform a targeted search-and-replace edit on the workspace module code. " +
      "Under the hood, it will attempt exact, flexible, regex, and fuzzy matching, " +
      "as well as LLM-assisted correction if the matching fails.",
    args: editModuleArgs,
    run: async ({ args, environment, modelId, abortController }) => {
      const currentContent = await ubento.sdk.module.readModuleVersionFile(
        args.moduleId,
        args.versionId,
        "index.tsx",
      );

      if (currentContent === null) {
        return {
          content: [
            {
              type: "text",
              text: `Error: Could not read content of file "index.tsx" for module "${args.moduleId}" at version "${args.versionId}".`,
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
          allow_quality_check: true, // Internal setting or default
          allow_multiple: args.allowMultiple,
          instruction: args.instruction,
        } as any,
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

      const saveAndUpdate = async () => {
        const res = await ubento.sdk.module.saveModuleVersion(args.moduleId, {
          content: editResult.newContent,
        });
        await updateWorkspaceModule(args.moduleId, res.latest_version_id);
        return res;
      };

      const getAffectedPaths = () => {
        const spec = getWorkspaceSpec();
        const paths: string[] = [`modules.${args.moduleId}`];
        if (spec) {
          for (const [boardId, board] of Object.entries(spec.boards || {})) {
            if (board?.module?.id === args.moduleId) {
              paths.push(`boards.${boardId}`);
            }
          }
        }
        return paths;
      };

      const result = withCopilotChanges
        ? await withCopilotChanges(saveAndUpdate, getAffectedPaths)
        : await saveAndUpdate();

      return {
        content: [
          {
            type: "text",
            text: `Successfully edited module "${args.moduleId}" using strategy "${editResult.strategy}". New version ID: "${result.latest_version_id}".`,
          },
        ],
        structuredContent: {
          moduleId: args.moduleId,
          versionId: result.latest_version_id,
        },
      };
    },
  };

  return createLocalToolkit({
    name: "module",
    description: "Tools for reading and writing module code",
    tools: {
      readModule: readModuleTool,
      writeModule: writeModuleTool,
      editModule: editModuleTool,
    },
  });
};
