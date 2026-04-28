import { EditorWorkspaceManager } from "@elllphnt/elll-editor-extension";
import { Elll } from "@elllphnt/elll-engine";
import { ResourceType } from "~/lib/agents/resource.js";

export const fileResource = {
  type: "file",
  data: (data: { path: string }) => data,
  instance: (elll: Elll): ResourceType<{ path: string }> => {
    return {
      type: fileResource.type,
      getMessageItem: async (data) => {
        const workspace = EditorWorkspaceManager.instance(elll);
        const worker = workspace.worker;
        if (!worker) {
          throw new Error("No worker available");
        }
        const content = await worker.readFileAtPath(data.path);
        return {
          type: "data",
          label: `File: ${data.path}`,
          data: {
            content: content.text,
            diagnostics: content.diagnostics,
          },
        };
      },
    };
  },
};
