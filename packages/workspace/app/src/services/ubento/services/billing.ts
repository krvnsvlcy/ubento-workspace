import {
  createStore,
  useMutation,
  useStoreEntities,
  useStoreEntity,
  UseStoreOptions,
} from "@ubento/fabric";
import { ubentoEntities } from "@ubento/services.primitives";
import { billingClient, UbentoSDK } from "@ubento/services.sdk";
import { useEffect, useState } from "react";
import { UbentoApiPage, ubentoToFabricPagedResponse } from "../libs/pagination";

export function createUbentoBillingService({
  ubentoSdk,
}: {
  ubentoSdk: UbentoSDK;
}) {
  // --- Stores ---

  const productStore = createStore<
    billingClient.Product,
    Record<string, never>,
    UbentoApiPage
  >({
    namespace: ubentoEntities.billingProduct.name,
    getKey: (p) => p.id,
    fetchOne: async (key) => {
      return await ubentoSdk.billing.getProduct(key);
    },
    fetchMany: async ({ page }) => {
      return ubentoToFabricPagedResponse(
        await ubentoSdk.billing.listProducts({
          cursor: page?.cursor,
          limit: page?.limit,
        }),
      );
    },
    project: (entities) => {
      return [...entities].sort((a, b) => a.name.localeCompare(b.name));
    },
  });

  const offerStore = createStore<
    billingClient.Offer,
    { active?: boolean; code?: string },
    UbentoApiPage
  >({
    namespace: ubentoEntities.billingOffer.name,
    getKey: (o) => o.id,
    fetchOne: async (key) => {
      return await ubentoSdk.billing.getOffer(key);
    },
    fetchMany: async ({ page, params }) => {
      return ubentoToFabricPagedResponse(
        await ubentoSdk.billing.listOffers({
          cursor: page?.cursor,
          limit: page?.limit,
          active: params?.active,
          code: params?.code,
        }),
      );
    },
    project: (entities, params) => {
      return [...entities]
        .filter((o) => {
          if (params?.active !== undefined && o.active !== params.active)
            return false;
          if (params?.code && o.code !== params.code) return false;
          return true;
        })
        .sort((a, b) => a.name.localeCompare(b.name));
    },
  });

  const subscriptionStore = createStore<
    billingClient.Subscription,
    {
      organization_id?: string;
      product_code?: string;
      offer_code?: string;
      status?: billingClient.Subscription["status"];
    },
    UbentoApiPage
  >({
    namespace: ubentoEntities.billingSubscription.name,
    getKey: (s) => s.id,
    fetchOne: async (key) => {
      return await ubentoSdk.billing.getSubscription(key);
    },
    fetchMany: async ({ page, params }) => {
      return ubentoToFabricPagedResponse(
        await ubentoSdk.billing.listSubscriptions({
          cursor: page?.cursor,
          limit: page?.limit,
          team_id: params?.organization_id,
          product_code: params?.product_code,
          offer_code: params?.offer_code,
          status: params?.status as any,
        }),
      );
    },
    project: (entities, params) => {
      return [...entities].filter((s) => {
        if (
          params?.organization_id &&
          s.organization_id !== params.organization_id
        )
          return false;
        if (params?.product_code && s.product_code !== params.product_code)
          return false;
        if (params?.offer_code && s.offer_code !== params.offer_code)
          return false;
        if (params?.status && s.status !== params.status) return false;
        return true;
      });
    },
  });

  const invoiceStore = createStore<
    billingClient.SubscriptionInvoice,
    {
      organization_id?: string;
      status?: "PAID" | "PENDING" | "REFUNDED" | "VOID";
    },
    UbentoApiPage
  >({
    namespace: ubentoEntities.billingSubscriptionInvoice.name,
    getKey: (inv) => inv.id,
    fetchOne: async () => {
      throw new Error("Single invoice fetch is not supported");
    },
    fetchMany: async ({ page, params }) => {
      return ubentoToFabricPagedResponse(
        await ubentoSdk.billing.listInvoices({
          cursor: page?.cursor,
          limit: page?.limit,
          team_id: params?.organization_id,
          status: params?.status,
        }),
      );
    },
    project: (entities, params) => {
      return [...entities].filter((inv) => {
        if (
          params?.organization_id &&
          inv.organization_id !== params.organization_id
        )
          return false;
        if (params?.status && inv.status !== params.status) return false;
        return true;
      });
    },
  });

  const usageCounterStore = createStore<
    billingClient.UsageCounter,
    { organization_id?: string; feature_code?: string; group?: string },
    UbentoApiPage
  >({
    namespace: ubentoEntities.billingUsageCounter.name,
    getKey: (uc) => uc.id,
    fetchOne: async (id) => {
      return await ubentoSdk.billing.getUsageCounter(id);
    },
    fetchMany: async ({ page, params }) => {
      if (!params?.organization_id) {
        return { data: [] };
      }
      return ubentoToFabricPagedResponse(
        await ubentoSdk.billing.listUsageCounters({
          cursor: page?.cursor,
          limit: page?.limit,
          team_id: params.organization_id,
          code: params.feature_code,
          group: params.group,
        }),
      );
    },
    project: (entities, params) => {
      return [...entities].filter((uc) => {
        if (
          params?.organization_id &&
          uc.organization_id !== params.organization_id
        )
          return false;
        if (params?.feature_code && uc.feature_code !== params.feature_code)
          return false;
        if (params?.group && uc.group !== params.group) return false;
        return true;
      });
    },
  });

  // --- Hooks ---

  const hooks = {
    // Products
    useProduct: (productId: string, options?: UseStoreOptions) => {
      return useStoreEntity(productStore, productId, options);
    },
    useProducts: (options?: UseStoreOptions) => {
      return useStoreEntities(productStore, {}, options);
    },

    // Offers
    useOffer: (offerId: string, options?: UseStoreOptions) => {
      return useStoreEntity(offerStore, offerId, options);
    },
    useOffers: (
      params?: { active?: boolean; code?: string },
      options?: UseStoreOptions,
    ) => {
      return useStoreEntities(offerStore, params, options);
    },

    // Subscriptions
    useSubscription: (subscriptionId: string, options?: UseStoreOptions) => {
      return useStoreEntity(subscriptionStore, subscriptionId, options);
    },
    useSubscriptions: (
      params?: {
        organization_id?: string;
        product_code?: string;
        offer_code?: string;
        status?: billingClient.Subscription["status"];
      },
      options?: UseStoreOptions,
    ) => {
      return useStoreEntities(subscriptionStore, params, options);
    },
    useCancelSubscription: () => {
      return useMutation({
        mutationFn: async (subscriptionId: string) => {
          return await ubentoSdk.billing.cancelSubscription(subscriptionId);
        },
        onSuccess: (s) => {
          subscriptionStore.push(s);
        },
      });
    },

    // Invoices
    useInvoices: (
      params?: {
        organization_id?: string;
        status?: "PAID" | "PENDING" | "REFUNDED" | "VOID";
      },
      options?: UseStoreOptions,
    ) => {
      return useStoreEntities(invoiceStore, params, options);
    },

    // Checkout
    useCreateCheckout: () => {
      return useMutation({
        mutationFn: async (data: {
          organization_id: string;
          product_code: string;
          offer_code: string;
          quantity?: number;
          redirect_url: string;
          duration?: number;
          metadata?: Record<string, any>;
        }) => {
          return await ubentoSdk.billing.createCheckout({
            team_id: data.organization_id,
            product_code: data.product_code,
            offer_code: data.offer_code,
            quantity: data.quantity,
            redirect_url: data.redirect_url,
            duration: data.duration,
            metadata: data.metadata,
          });
        },
      });
    },

    // Entitlements
    useEntitlements: (organization_id: string) => {
      const [loading, setLoading] = useState(false);
      const [data, setData] = useState<any>(null);

      useEffect(() => {
        if (!organization_id) return;

        const load = async () => {
          setLoading(true);
          try {
            const res =
              await ubentoSdk.billing.getEntitlements(organization_id);
            setData(res);
          } finally {
            setLoading(false);
          }
        };

        load();
      }, [organization_id]);

      return { data, loading };
    },

    // Usage
    useUsageCounter: (id: string, options?: UseStoreOptions) => {
      return useStoreEntity(usageCounterStore, id, options);
    },
    useUsageCounters: (
      params: {
        team_id: string;
        code?: string;
        group?: string;
      },
      options?: UseStoreOptions,
    ) => {
      return useStoreEntities(usageCounterStore, params, options);
    },
    useReportUsage: () => {
      return useMutation({
        mutationFn: async (data: {
          organization_id: string;
          code: string;
          value: number;
          group?: string;
        }) => {
          return await ubentoSdk.billing.reportUsage({
            team_id: data.organization_id,
            code: data.code,
            value: data.value,
            group: data.group,
          });
        },
      });
    },
  };

  // --- Imperatives ---

  const imperatives = {
    getProduct: async (id: string) => {
      const p = await ubentoSdk.billing.getProduct(id);
      productStore.push(p);
      return p;
    },
    getProducts: async (params: { limit?: number; cursor?: string } = {}) => {
      const res = await ubentoSdk.billing.listProducts(params);
      productStore.pushMany(res.data);
      return res;
    },
    getOffer: async (id: string) => {
      const o = await ubentoSdk.billing.getOffer(id);
      offerStore.push(o);
      return o;
    },
    getOffers: async (params: any = {}) => {
      const res = await ubentoSdk.billing.listOffers(params);
      offerStore.pushMany(res.data);
      return res;
    },
    getSubscription: async (id: string) => {
      const s = await ubentoSdk.billing.getSubscription(id);
      subscriptionStore.push(s);
      return s;
    },
    getSubscriptions: async (params: any = {}) => {
      const res = await ubentoSdk.billing.listSubscriptions(params);
      subscriptionStore.pushMany(res.data);
      return res;
    },
    cancelSubscription: async (id: string) => {
      const s = await ubentoSdk.billing.cancelSubscription(id);
      subscriptionStore.push(s);
      return s;
    },
    getInvoices: async (params: any = {}) => {
      const res = await ubentoSdk.billing.listInvoices(params);
      invoiceStore.pushMany(res.data);
      return res;
    },
    createCheckout: async (data: any) => {
      return await ubentoSdk.billing.createCheckout(data);
    },
    reportUsage: async (data: any) => {
      return await ubentoSdk.billing.reportUsage(data);
    },
    getUsageCounters: async (params: {
      organization_id: string;
      code?: string;
      group?: string;
      limit?: number;
      cursor?: string;
    }) => {
      const res = await ubentoSdk.billing.listUsageCounters({
        team_id: params.organization_id,
        code: params.code,
        group: params.group,
        limit: params.limit,
        cursor: params.cursor,
      });
      usageCounterStore.pushMany(res.data);
      return res;
    },
    getUsageCounter: async (id: string) => {
      const uc = await ubentoSdk.billing.getUsageCounter(id);
      usageCounterStore.push(uc);
      return uc;
    },
  };

  return {
    ...hooks,
    ...imperatives,
  };
}
