import { UbentoSDK } from "@ubento/sdk";
import { createStore } from "zustand/vanilla";
import { AttachmentType } from "../agent/attachments.js";
import { AgentContext, AgentContextStats } from "../agent/context.js";
import { AgentEnvironment } from "../agent/environment.js";
import { IntelligenceMessageData } from "../agent/message/message.js";
import { ResourceType } from "../agent/resource.js";
import { createAgentThread } from "../agent/thread.js";
import { ToolSet } from "../agent/tool_set/tool_set.js";
import { LanguageModel } from "../utils/models.js";

export function createUbentoAgentEnvironment({
  ubentoApi,
  workspaceId,
}: {
  ubentoApi: UbentoSDK;
  workspaceId: string;
}): AgentEnvironment {
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
      // Shim for now
      return "";
    },

    get toolSets() {
      return store.getState().toolSets;
    },
    get resourceTypes() {
      return store.getState().resourceTypes;
    },
    get attachmentTypes() {
      return store.getState().attachmentTypes;
    },

    addToolSet: (toolSet) => {
      store.setState((s) => ({
        toolSets: { ...s.toolSets, [toolSet.name]: toolSet },
      }));
    },
    removeToolSet: (name) => {
      store.setState((s) => {
        const { [name]: _, ...rest } = s.toolSets;
        return { toolSets: rest };
      });
    },
    addResourceType: (resourceType) => {
      store.setState((s) => ({
        resourceTypes: {
          ...s.resourceTypes,
          [resourceType.type]: resourceType,
        },
      }));
    },
    removeResourceType: (type) => {
      store.setState((s) => {
        const { [type]: _, ...rest } = s.resourceTypes;
        return { resourceTypes: rest };
      });
    },
    addAttachmentType: (attachmentType) => {
      store.setState((s) => ({
        attachmentTypes: {
          ...s.attachmentTypes,
          [attachmentType.type]: attachmentType,
        },
      }));
    },
    removeAttachmentType: (type) => {
      store.setState((s) => {
        const { [type]: _, ...rest } = s.attachmentTypes;
        return { attachmentTypes: rest };
      });
    },
    createThread: async ({ title, agent }) => {
      let messages: IntelligenceMessageData[] = [];
      let context: AgentContext = { resources: [] };

      const threadA = await ubentoApi.intelligence.createThread({
        workspace_id: workspaceId,
        title,
      });

      return createAgentThread({
        id: crypto.randomUUID(),
        agent,
        getContext: async () => context,
        setContext: async (newContext) => {
          context = newContext;
        },
        getContextStats: async (
          modelId: string,
        ): Promise<AgentContextStats> => {
          return {
            usage: 0,
            budget: 100000,
            window: 128000,
            breakdown: { instructions: 0, prompt: 0 },
          };
        },
        summarizeContext: async (model: LanguageModel) => {},
        save: async () => {},
        pushUserMessage: async (message) => {
          messages.push(message);
        },
        startAgentMessage: async (execution) => {
          // This would normally return a controller for an assistant message
          return {} as any;
        },
        listMessages: async () => messages,
        generateTitle: async () => {},
      });
    },
  };

  return env;
}
