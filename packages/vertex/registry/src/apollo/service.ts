import {
  createStore,
  FetchOptions,
  useStoreEntities,
  useStoreEntity,
} from "@ubento/fabric";

export function createApolloService({ apiKey }: { apiKey: string }) {
  // TODO: Initialize apollo client when SDK is added
  const client = {
    items: {
      retrieve: async (id: string) => ({ id }),
      list: async () => ({ data: [] }),
    },
  };

  const itemsStore = createStore<any, any>({
    namespace: "item",
    getKey: (item) => item.id,
    fetchOne: async (id) => {
      return await client.items.retrieve(id);
    },
    fetchMany: async () => {
      const response = await client.items.list();
      return {
        data: response.data,
      };
    },
  });

  return {
    useItem: (id: string, options?: FetchOptions) => {
      return useStoreEntity(itemsStore, id, options);
    },
    useItems: (params?: any, options?: FetchOptions) => {
      return useStoreEntities(itemsStore, params, options);
    },
  };
}

export default createApolloService;
