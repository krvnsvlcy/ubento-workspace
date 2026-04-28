import { EditorWorkspaceManager } from "@elllphnt/elll-editor-extension";
import { Elll } from "@elllphnt/elll-engine";
import { ResourceType } from "~/lib/agents/resource.js";

export const directoryResource = {
  type: "directory",
  data: (data: { path: string }) => data,
  instance: (elll: Elll): ResourceType<{ path: string }> => {
    return {
      type: directoryResource.type,
      getMessageItem: async (data) => {
        const workspace = EditorWorkspaceManager.instance(elll);
        const worker = workspace.worker;
        if (!worker) {
          throw new Error("No worker available");
        }
        const entries = await worker.readDir(data.path);
        return {
          type: "data",
          label: `Directory: ${data.path}`,
          data: entries,
        };
      },
    };
  },
};
