import {
  createStore,
  FetchOptions,
  useStoreEntities,
  useStoreEntity,
} from "@ubento/fabric";

export function createWiseService({ apiKey }: { apiKey: string }) {
  // TODO: Initialize Wise client when SDK is added
  const client = {
    profiles: {
      retrieve: async (id: string) => ({ id, type: "personal" }),
      list: async () => ({ data: [] }),
    },
    accounts: {
      retrieve: async (id: string) => ({ id, currency: "USD" }),
      list: async () => ({ data: [] }),
    },
  };

  const profilesStore = createStore<any, any>({
    namespace: "profile",
    getKey: (profile) => profile.id,
    fetchOne: async (id) => {
      return await client.profiles.retrieve(id);
    },
    fetchMany: async () => {
      const response = await client.profiles.list();
      return {
        data: response.data,
      };
    },
  });

  const accountsStore = createStore<any, any>({
    namespace: "account",
    getKey: (account) => account.id,
    fetchOne: async (id) => {
      return await client.accounts.retrieve(id);
    },
    fetchMany: async () => {
      const response = await client.accounts.list();
      return {
        data: response.data,
      };
    },
  });

  return {
    useProfile: (id: string, options?: FetchOptions) => {
      return useStoreEntity(profilesStore, id, options);
    },
    useProfiles: (params?: any, options?: FetchOptions) => {
      return useStoreEntities(profilesStore, params, options);
    },
    useAccount: (id: string, options?: FetchOptions) => {
      return useStoreEntity(accountsStore, id, options);
    },
    useAccounts: (params?: any, options?: FetchOptions) => {
      return useStoreEntities(accountsStore, params, options);
    },
  };
}

export default createWiseService;
