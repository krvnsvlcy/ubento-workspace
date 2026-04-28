import {
  editorKeys,
  EditorWorkspaceManager,
} from "@elllphnt/elll-editor-extension";
import { Elll } from "@elllphnt/elll-engine";
import { createStore } from "zustand/vanilla";
import { pairwiseOrEmpty } from "../../../../../_to_sort/utils/build/index.js";
import { AgentEnvironment } from "../agent/environment.js";
import { McpToolSet } from "../agent/tool_set/mcp/mcp.js";
import { ToolSet } from "../agent/tool_set/tool_set.js";
import { ResourceType } from "../agent/resource.js";
import { AttachmentType } from "../agent/attachments.js";

export function createElllAgentEnvironment({ elll }: { elll: Elll }): AgentEnvironment {
  const store = createStore<{
    toolSets: Record<string, ToolSet>;
    resourceTypes: Record<string, ResourceType>;
    attachmentTypes: Record<string, AttachmentType<any, any>>;
  }>()(() => ({
    toolSets: {},
    resourceTypes: {},
    attachmentTypes: {},
  }));

  const env: AgentEnvironment = {
    readWebpage: async (url, options) => {
      const response = await elll.backend.elllSdk.intelligence.readWebPage(
        url,
        options,
      );
      return response.content;
    },

    get toolSets() { return store.getState().toolSets; },
    get resourceTypes() { return store.getState().resourceTypes; },
    get attachmentTypes() { return store.getState().attachmentTypes; },

    addToolSet: (toolSet) => {
      store.setState((s) => ({ toolSets: { ...s.toolSets, [toolSet.name]: toolSet } }));
    },
    removeToolSet: (name) => {
      store.setState((s) => {
        const { [name]: _, ...rest } = s.toolSets;
        return { toolSets: rest };
      });
    },
    addResourceType: (resourceType) => {
      store.setState((s) => ({ resourceTypes: { ...s.resourceTypes, [resourceType.type]: resourceType } }));
    },
    removeResourceType: (type) => {
      store.setState((s) => {
        const { [type]: _, ...rest } = s.resourceTypes;
        return { resourceTypes: rest };
      });
    },
    addAttachmentType: (attachmentType) => {
      store.setState((s) => ({ attachmentTypes: { ...s.attachmentTypes, [attachmentType.type]: attachmentType } }));
    },
    removeAttachmentType: (type) => {
      store.setState((s) => {
        const { [type]: _, ...rest } = s.attachmentTypes;
        return { attachmentTypes: rest };
      });
    },
  };

  const mcpServersSubscription = elll
    .module<EditorWorkspaceManager>(editorKeys.modules.workspaceManager)
    .extensionManager.allMpcServers$.pipe(pairwiseOrEmpty())
    .subscribe(([prev, curr]) => {
      const organization = elll.organization;
      if (!organization) return;

      const toRemove = new Set(prev?.map((s) => s.name));

      for (const server of curr) {
        toRemove.delete(server.name);
        if (!env.toolSets[server.name]) {
          if (server.connectionProviderId) {
            const pUrl = elll.backend.elllSdk.integration.getProxyUrl({
              providerId: server.connectionProviderId,
              organizationId: organization.id,
              targetUrl: server.url,
            });
            env.addToolSet(
              new McpToolSet({
                elll: elll,
                name: server.name,
                url: pUrl.proxyUrl,
                headers: {
                  "x-target-url": pUrl.xTargetUrl,
                },
              }),
            );
          } else {
            env.addToolSet(
              new McpToolSet({
                elll: elll,
                name: server.name,
                url: server.url,
              }),
            );
          }
        }
      }

      for (const name of toRemove) {
        env.removeToolSet(name);
      }
    });

  return env;
}
