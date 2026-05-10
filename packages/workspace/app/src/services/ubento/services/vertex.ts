import {
  createStore,
  useMutation,
  useStoreEntities,
  useStoreEntity,
  UseStoreOptions,
} from "@ubento/fabric";
import { ubentoEntities } from "@ubento/services.primitives";
import { vertexClient, UbentoSDK } from "@ubento/services.sdk";
import { UbentoApiPage, ubentoToFabricPagedResponse } from "../libs/pagination";

export function createUbentoVertexService({
  ubentoSdk,
}: {
  ubentoSdk: UbentoSDK;
}) {
  // --- Stores ---

  const connectionProviderStore = createStore<
    vertexClient.ConnectionProvider,
    { team_id?: string; name?: string },
    UbentoApiPage
  >({
    namespace: ubentoEntities.connectionProvider.name,
    getKey: (cp) => cp.id,
    fetchOne: async (key) => {
      return await ubentoSdk.vertex.getConnectionProvider(key);
    },
    fetchMany: async ({ page, params }) => {
      return ubentoToFabricPagedResponse(
        await ubentoSdk.vertex.listConnectionProviders({
          cursor: page?.cursor,
          limit: page?.limit,
          team_id: params?.team_id,
          name: params?.name,
        }),
      );
    },
    project: (entities, params) => {
      return [...entities]
        .filter((cp) => {
          if (
            params?.name &&
            !cp.name.toLowerCase().includes(params.name.toLowerCase())
          )
            return false;
          return true;
        })
        .sort((a, b) => a.name.localeCompare(b.name));
    },
  });

  const connectionStore = createStore<
    vertexClient.Connection,
    { team_id?: string },
    UbentoApiPage
  >({
    namespace: ubentoEntities.connection.name,
    getKey: (c) => c.id,
    fetchOne: async (key) => {
      return await ubentoSdk.vertex.getConnection(key);
    },
    fetchMany: async ({ page, params }) => {
      return ubentoToFabricPagedResponse(
        await ubentoSdk.vertex.listConnections({
          cursor: page?.cursor,
          limit: page?.limit,
          team_id: params?.team_id,
        }),
      );
    },
    project: (entities, params) => {
      return [...entities].filter((c) => {
        if (
          params?.team_id &&
          c.team_id !== params.team_id
        )
          return false;
        return true;
      });
    },
  });

  const serviceStore = createStore<
    vertexClient.Service,
    { team_id?: string; name?: string },
    UbentoApiPage
  >({
    namespace: "service",
    getKey: (s) => s.id,
    fetchOne: async (key) => {
      return await ubentoSdk.vertex.getService(key);
    },
    fetchMany: async ({ page, params }) => {
      return ubentoToFabricPagedResponse(
        await ubentoSdk.vertex.listServices({
          cursor: page?.cursor,
          limit: page?.limit,
          team_id: params?.team_id,
          name: params?.name,
        }),
      );
    },
    project: (entities, params) => {
      return [...entities].filter((s) => {
        if (
          params?.name &&
          !s.name.toLowerCase().includes(params.name.toLowerCase())
        )
          return false;
        return true;
      });
    },
  });

  // --- Hooks ---

  const hooks = {
    // Connection Providers
    useConnectionProvider: (providerId: string, options?: UseStoreOptions) => {
      return useStoreEntity(connectionProviderStore, providerId, options);
    },
    useConnectionProviders: (
      params?: { team_id?: string; name?: string },
      options?: UseStoreOptions,
    ) => {
      return useStoreEntities(connectionProviderStore, params, options);
    },

    // Connections
    useConnection: (connectionId: string, options?: UseStoreOptions) => {
      return useStoreEntity(connectionStore, connectionId, options);
    },
    useConnections: (
      params?: { team_id?: string },
      options?: UseStoreOptions,
    ) => {
      return useStoreEntities(connectionStore, params, options);
    },
    useCreateConnection: () => {
      return useMutation({
        mutationFn: async (data: {
          team_id: string;
          provider_id: string;
          auth?: Record<string, any>;
        }) => {
          return await ubentoSdk.vertex.createConnection(data);
        },
        onSuccess: (connection) => {
          connectionStore.push(connection);
        },
      });
    },
    useDeleteConnection: () => {
      return useMutation({
        mutationFn: async (connectionId: string) => {
          return await ubentoSdk.vertex.deleteConnection(connectionId);
        },
        onSuccess: (_, connectionId) => {
          connectionStore.remove(connectionId);
        },
      });
    },

    // Services
    useService: (serviceId: string, options?: UseStoreOptions) => {
      return useStoreEntity(serviceStore, serviceId, options);
    },
    useServices: (
      params?: { team_id?: string; name?: string; limit?: number; cursor?: string },
      options?: UseStoreOptions,
    ) => {
      return useStoreEntities(serviceStore, params, options);
    },
  };

  // --- Imperatives ---

  const imperatives = {
    getConnectionProvider: async (id: string) => {
      const cp = await ubentoSdk.vertex.getConnectionProvider(id);
      connectionProviderStore.push(cp);
      return cp;
    },
    getConnectionProviders: async (params: any = {}) => {
      const res = await ubentoSdk.vertex.listConnectionProviders(params);
      connectionProviderStore.pushMany(res.data);
      return res;
    },
    getConnection: async (id: string) => {
      const c = await ubentoSdk.vertex.getConnection(id);
      connectionStore.push(c);
      return c;
    },
    getConnections: async (params: any = {}) => {
      const res = await ubentoSdk.vertex.listConnections(params);
      connectionStore.pushMany(res.data);
      return res;
    },
    createConnection: async (data: any) => {
      const c = await ubentoSdk.vertex.createConnection(data);
      connectionStore.push(c);
      return c;
    },
    deleteConnection: async (id: string) => {
      const res = await ubentoSdk.vertex.deleteConnection(id);
      connectionStore.remove(id);
      return res;
    },
    getService: async (id: string) => {
      const s = await ubentoSdk.vertex.getService(id);
      serviceStore.push(s);
      return s;
    },
    getServices: async (params: any = {}) => {
      const res = await ubentoSdk.vertex.listServices(params);
      serviceStore.pushMany(res.data);
      return res;
    },
  };

  return {
    ...hooks,
    ...imperatives,
  };
}
