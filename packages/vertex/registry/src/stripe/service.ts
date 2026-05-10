import Stripe from "stripe";
import {
  createStore,
  FetchOptions,
  useMutation,
  useStoreEntities,
  useStoreEntity,
} from "@ubento/fabric";

export function createStripeService({ apiKey, ...args }: { apiKey: string }) {
  const stripe = new Stripe(apiKey, {
    apiVersion: "2024-11-20.acacia" as any,
    ...args,
  });

  const customersStore = createStore<Stripe.Customer, Stripe.CustomerListParams>({
    namespace: "customer",
    getKey: (customer) => customer.id,
    fetchOne: async (id) => {
      return (await stripe.customers.retrieve(id)) as Stripe.Customer;
    },
    fetchMany: async ({ params }) => {
      const response = await stripe.customers.list(params);
      return {
        data: response.data,
      };
    },
  });

  const subscriptionsStore = createStore<
    Stripe.Subscription,
    Stripe.SubscriptionListParams
  >({
    namespace: "subscription",
    getKey: (subscription) => subscription.id,
    fetchOne: async (id) => {
      return await stripe.subscriptions.retrieve(id);
    },
    fetchMany: async ({ params }) => {
      const response = await stripe.subscriptions.list(params);
      return {
        data: response.data,
      };
    },
  });

  const invoicesStore = createStore<Stripe.Invoice, Stripe.InvoiceListParams>({
    namespace: "invoice",
    getKey: (invoice) => invoice.id,
    fetchOne: async (id) => {
      return await stripe.invoices.retrieve(id);
    },
    fetchMany: async ({ params }) => {
      const response = await stripe.invoices.list(params);
      return {
        data: response.data,
      };
    },
  });

  const paymentIntentsStore = createStore<
    Stripe.PaymentIntent,
    Stripe.PaymentIntentListParams
  >({
    namespace: "paymentIntent",
    getKey: (pi) => pi.id,
    fetchOne: async (id) => {
      return await stripe.paymentIntents.retrieve(id);
    },
    fetchMany: async ({ params }) => {
      const response = await stripe.paymentIntents.list(params);
      return {
        data: response.data,
      };
    },
  });

  return {
    useCustomer: (id: string, options?: FetchOptions) => {
      return useStoreEntity(customersStore, id, options);
    },
    useCustomers: (params?: Stripe.CustomerListParams, options?: FetchOptions) => {
      return useStoreEntities(customersStore, params, options);
    },
    useSubscription: (id: string, options?: FetchOptions) => {
      return useStoreEntity(subscriptionsStore, id, options);
    },
    useSubscriptions: (
      params?: Stripe.SubscriptionListParams,
      options?: FetchOptions
    ) => {
      return useStoreEntities(subscriptionsStore, params, options);
    },
    useInvoice: (id: string, options?: FetchOptions) => {
      return useStoreEntity(invoicesStore, id, options);
    },
    useInvoices: (params?: Stripe.InvoiceListParams, options?: FetchOptions) => {
      return useStoreEntities(invoicesStore, params, options);
    },
    usePaymentIntent: (id: string, options?: FetchOptions) => {
      return useStoreEntity(paymentIntentsStore, id, options);
    },
    usePaymentIntents: (
      params?: Stripe.PaymentIntentListParams,
      options?: FetchOptions
    ) => {
      return useStoreEntities(paymentIntentsStore, params, options);
    },
    createCustomer: () => {
      return useMutation({
        mutationFn: async (data: Stripe.CustomerCreateParams) => {
          return await stripe.customers.create(data);
        },
        onSuccess: (data) => {
          customersStore.push(data);
        },
      });
    },
    createSubscription: () => {
      return useMutation({
        mutationFn: async (data: Stripe.SubscriptionCreateParams) => {
          return await stripe.subscriptions.create(data);
        },
        onSuccess: (data) => {
          subscriptionsStore.push(data);
        },
      });
    },
  };
}

export default createStripeService;
