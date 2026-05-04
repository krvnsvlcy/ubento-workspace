import {
  createCustomer,
  Customer,
  getAuthenticatedUser,
  getCustomer,
  getStore,
  listCustomers,
  ListCustomersParams,
  listStores,
  ListStoresParams,
  NewCustomer,
  Store,
  UpdateCustomer,
  updateCustomer,
  User,
} from "@lemonsqueezy/lemonsqueezy.js";
import {
  createStore,
  FetchOptions,
  useMutation,
  useQuery,
  useStoreEntities,
  useStoreEntity,
} from "@ubento/fabric";

export function createLemonSqueezyService() {
  type Page = {
    number?: number;
    size?: number;
  };
  type StoreParams = Omit<ListStoresParams, "page">;
  type CustomerParams = Omit<ListCustomersParams, "page">;

  const storesStore = createStore<Store["data"], StoreParams, Page>({
    namespace: "store",
    getKey: (store) => store.id,
    fetchOne: async (id) => {
      const response = await getStore(id);
      if (response.error) throw response.error;
      if (!response.data) throw new Error("No store found");
      return response.data.data;
    },
    fetchMany: async ({ params, page }) => {
      const response = await listStores({ ...params, page });
      if (response.error) throw response.error;
      if (!response.data) throw new Error("No stores found");
      return {
        data: response.data.data,
      };
    },
  });

  const customersStore = createStore<Customer["data"], CustomerParams, Page>({
    namespace: "customer",
    getKey: (customer) => customer.id,
    fetchOne: async (id) => {
      const response = await getCustomer(id);
      if (response.error) throw response.error;
      if (!response.data) throw new Error("No customer found");
      return response.data.data;
    },
    fetchMany: async ({ params, page }) => {
      const response = await listCustomers({ ...params, page });
      if (response.error) throw response.error;
      if (!response.data) throw new Error("No customers found");
      return {
        data: response.data.data,
      };
    },
  });

  const queries = {
    useAuthenticatedUser: () => {
      return useQuery({
        queryKey: ["authenicated-user"],
        queryFn: async function (): Promise<User> {
          const response = await getAuthenticatedUser();
          if (response.error) {
            throw response.error;
          }
          if (!response.data) {
            throw new Error("No user found");
          }
          return response.data;
        },
      });
    },
  };

  return {
    ...queries,
    useStore: (id: string, options?: FetchOptions) => {
      return useStoreEntity(storesStore, id, options);
    },
    useStores: (params?: StoreParams, options?: FetchOptions) => {
      return useStoreEntities(storesStore, params, options);
    },
    useCustomer: (id: string, options?: FetchOptions) => {
      return useStoreEntity(customersStore, id, options);
    },
    useCustomers: (params?: CustomerParams, options?: FetchOptions) => {
      return useStoreEntities(customersStore, params, options);
    },
    createCustomer: () => {
      return useMutation({
        mutationFn: async ({
          storeId,
          data,
        }: {
          storeId: string;
          data: NewCustomer;
        }) => {
          const response = await createCustomer(storeId, data);
          if (response.error) throw response.error;
          if (!response.data) throw new Error("No customer found");
          return response.data.data;
        },
        onSuccess: (data) => {
          customersStore.push(data);
        },
      });
    },
    updateCustomer: () => {
      return useMutation({
        mutationFn: async ({
          customerId,
          data,
        }: {
          customerId: string;
          data: UpdateCustomer;
        }) => {
          const response = await updateCustomer(customerId, data);
          if (response.error) throw response.error;
          if (!response.data) throw new Error("No customer found");
          return response.data.data;
        },
        onSuccess: (data) => {
          customersStore.push(data);
        },
      });
    },
  };
}
