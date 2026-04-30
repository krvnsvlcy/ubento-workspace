import {
  createStore,
  useMutation,
  useStoreEntities,
  useStoreEntity,
  UseStoreOptions,
} from "@ubento/fabric";
import { ubentoEntities } from "@ubento/primitives";
import { intelligenceClient, UbentoSDK } from "@ubento/sdk";
import { UbentoApiPage, ubentoToFabricPagedResponse } from "../libs/pagination";

export function createUbentoIntelligenceService({
  ubentoSdk,
}: {
  ubentoSdk: UbentoSDK;
}) {
  // --- Stores ---

  const threadStore = createStore<
    intelligenceClient.Thread,
    { workspace_id: string },
    UbentoApiPage
  >({
    namespace: ubentoEntities.intelligenceThread.name,
    getKey: (t) => t.id,
    fetchOne: async (key) => {
      return await ubentoSdk.intelligence.getThread(key);
    },
    fetchMany: async ({ page, params }) => {
      if (!params?.workspace_id) {
        throw new Error("workspace_id is required to list threads");
      }
      return ubentoToFabricPagedResponse(
        await ubentoSdk.intelligence.listThreads({
          workspace_id: params.workspace_id,
          cursor: page?.cursor,
          limit: page?.limit,
        }),
      );
    },
    project: (entities, params) => {
      return [...entities]
        .filter((t) => {
          if (params?.workspace_id && t.workspace_id !== params.workspace_id)
            return false;
          return true;
        })
        .sort((a, b) => b.created_at.localeCompare(a.created_at));
    },
  });

  const messageStore = createStore<
    intelligenceClient.Message,
    { thread_id: string },
    UbentoApiPage
  >({
    namespace: ubentoEntities.intelligenceMessage.name,
    getKey: (m) => m.id,
    fetchOne: async () => {
      throw new Error("Single intelligence message fetch is not supported");
    },
    fetchMany: async ({ page, params }) => {
      if (!params?.thread_id) {
        throw new Error("thread_id is required to list messages");
      }
      return ubentoToFabricPagedResponse(
        await ubentoSdk.intelligence.listMessages({
          thread_id: params.thread_id,
          cursor: page?.cursor,
          limit: page?.limit,
        }),
      );
    },
    project: (entities, params) => {
      return [...entities]
        .filter((m) => {
          if (params?.thread_id && m.thread_id !== params.thread_id)
            return false;
          return true;
        })
        .sort((a, b) => a.created_at.localeCompare(b.created_at));
    },
  });

  // --- Hooks ---

  const hooks = {
    // Threads
    useThread: (threadId: string, options?: UseStoreOptions) => {
      return useStoreEntity(threadStore, threadId, options);
    },
    useThreads: (
      params: { workspace_id: string },
      options?: UseStoreOptions,
    ) => {
      return useStoreEntities(threadStore, params, options);
    },
    useCreateThread: () => {
      return useMutation({
        mutationFn: async (data: { workspace_id: string; title?: string }) => {
          return await ubentoSdk.intelligence.createThread(data);
        },
        onSuccess: (thread) => {
          threadStore.push(thread);
        },
      });
    },

    // Messages
    useMessages: (
      params: { thread_id: string },
      options?: UseStoreOptions,
    ) => {
      return useStoreEntities(messageStore, params, options);
    },
    useCreateMessage: () => {
      return useMutation({
        mutationFn: async (data: {
          thread_id: string;
          role: "user" | "agent";
          content?: string;
          author?: string;
          messageData?: any;
        }) => {
          return await ubentoSdk.intelligence.createMessage(data);
        },
        onSuccess: (message) => {
          messageStore.push(message);
        },
      });
    },
  };

  // --- Imperatives ---

  const imperatives = {
    getThread: async (threadId: string) => {
      const thread = await ubentoSdk.intelligence.getThread(threadId);
      threadStore.push(thread);
      return thread;
    },
    getThreads: async (params: {
      workspace_id: string;
      limit?: number;
      cursor?: string;
    }) => {
      const res = await ubentoSdk.intelligence.listThreads(params);
      threadStore.pushMany(res.data);
      return res;
    },
    createThread: async (data: any) => {
      const thread = await ubentoSdk.intelligence.createThread(data);
      threadStore.push(thread);
      return thread;
    },
    getMessages: async (params: {
      thread_id: string;
      limit?: number;
      cursor?: string;
    }) => {
      const res = await ubentoSdk.intelligence.listMessages(params);
      messageStore.pushMany(res.data);
      return res;
    },
    createMessage: async (data: any) => {
      const message = await ubentoSdk.intelligence.createMessage(data);
      messageStore.push(message);
      return message;
    },
  };

  return {
    ...hooks,
    ...imperatives,
  };
}
