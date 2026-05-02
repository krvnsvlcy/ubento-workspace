import {
  createStore,
  useMutation,
  useStoreEntities,
  useStoreEntity,
  UseStoreOptions,
} from "@ubento/fabric";
import { ubentoEntities } from "@ubento/primitives";
import { integrationClient, UbentoSDK } from "@ubento/sdk";
import { UbentoApiPage, ubentoToFabricPagedResponse } from "../libs/pagination";

export function createUbentoIntegrationService({
  ubentoSdk,
}: {
  ubentoSdk: UbentoSDK;
}) {
  // --- Stores ---

  const connectionProviderStore = createStore<
    integrationClient.ConnectionProvider,
    { organization_id?: string; name?: string },
    UbentoApiPage
  >({
    namespace: ubentoEntities.connectionProvider.name,
    getKey: (cp) => cp.id,
    fetchOne: async (key) => {
      return await ubentoSdk.integration.getConnectionProvider(key);
    },
    fetchMany: async ({ page, params }) => {
      return ubentoToFabricPagedResponse(
        await ubentoSdk.integration.listConnectionProviders({
          cursor: page?.cursor,
          limit: page?.limit,
          organization_id: params?.organization_id,
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
    integrationClient.Connection,
    { organization_id?: string },
    UbentoApiPage
  >({
    namespace: ubentoEntities.connection.name,
    getKey: (c) => c.id,
    fetchOne: async (key) => {
      return await ubentoSdk.integration.getConnection(key);
    },
    fetchMany: async ({ page, params }) => {
      return ubentoToFabricPagedResponse(
        await ubentoSdk.integration.listConnections({
          cursor: page?.cursor,
          limit: page?.limit,
          organization_id: params?.organization_id,
        }),
      );
    },
    project: (entities, params) => {
      return [...entities].filter((c) => {
        if (
          params?.organization_id &&
          c.organization_id !== params.organization_id
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
      params?: { organization_id?: string; name?: string },
      options?: UseStoreOptions,
    ) => {
      return useStoreEntities(connectionProviderStore, params, options);
    },

    // Connections
    useConnection: (connectionId: string, options?: UseStoreOptions) => {
      return useStoreEntity(connectionStore, connectionId, options);
    },
    useConnections: (
      params?: { organization_id?: string },
      options?: UseStoreOptions,
    ) => {
      return useStoreEntities(connectionStore, params, options);
    },
    useCreateConnection: () => {
      return useMutation({
        mutationFn: async (data: {
          organization_id: string;
          provider_id: string;
          auth?: Record<string, any>;
        }) => {
          return await ubentoSdk.integration.createConnection(data);
        },
        onSuccess: (connection) => {
          connectionStore.push(connection);
        },
      });
    },
    useDeleteConnection: () => {
      return useMutation({
        mutationFn: async (connectionId: string) => {
          return await ubentoSdk.integration.deleteConnection(connectionId);
        },
        onSuccess: (_, connectionId) => {
          connectionStore.remove(connectionId);
        },
      });
    },
  };

  // --- Imperatives ---

  const imperatives = {
    getConnectionProvider: async (id: string) => {
      const cp = await ubentoSdk.integration.getConnectionProvider(id);
      connectionProviderStore.push(cp);
      return cp;
    },
    getConnectionProviders: async (params: any = {}) => {
      const res = await ubentoSdk.integration.listConnectionProviders(params);
      connectionProviderStore.pushMany(res.data);
      return res;
    },
    getConnection: async (id: string) => {
      const c = await ubentoSdk.integration.getConnection(id);
      connectionStore.push(c);
      return c;
    },
    getConnections: async (params: any = {}) => {
      const res = await ubentoSdk.integration.listConnections(params);
      connectionStore.pushMany(res.data);
      return res;
    },
    createConnection: async (data: any) => {
      const c = await ubentoSdk.integration.createConnection(data);
      connectionStore.push(c);
      return c;
    },
    deleteConnection: async (id: string) => {
      const res = await ubentoSdk.integration.deleteConnection(id);
      connectionStore.remove(id);
      return res;
    },
  };

  return {
    ...hooks,
    ...imperatives,
  };
}
