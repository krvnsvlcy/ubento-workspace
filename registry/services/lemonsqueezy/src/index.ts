import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";
import * as ls from "@lemonsqueezy/lemonsqueezy.js";
import { createResourceProxy, UbentoResource } from "./proxy.js";

export * from "./proxy.js";

export type LemonSqueezyService = {
  stores: UbentoResource<any>;
  customers: UbentoResource<any>;
  products: UbentoResource<any>;
  variants: UbentoResource<any>;
  prices: UbentoResource<any>;
  checkouts: UbentoResource<any>;
  orders: UbentoResource<any>;
  orderItems: UbentoResource<any>;
  subscriptions: UbentoResource<any>;
  subscriptionItems: UbentoResource<any>;
  subscriptionInvoices: UbentoResource<any>;
  licenseKeys: UbentoResource<any>;
  licenseKeyInstances: UbentoResource<any>;
  discounts: UbentoResource<any>;
  discountRedemptions: UbentoResource<any>;
  files: UbentoResource<any>;
  webhooks: UbentoResource<any>;
};

export default function ({ ubento, apiKey }: any) {
  lemonSqueezySetup({ apiKey });

  return {
    stores: createResourceProxy("lemonsqueezy", ls, "listStores"),
    customers: createResourceProxy("lemonsqueezy", ls, "listCustomers"),
    products: createResourceProxy("lemonsqueezy", ls, "listProducts"),
    variants: createResourceProxy("lemonsqueezy", ls, "listVariants"),
    prices: createResourceProxy("lemonsqueezy", ls, "listPrices"),
    checkouts: createResourceProxy("lemonsqueezy", ls, "listCheckouts"),
    orders: createResourceProxy("lemonsqueezy", ls, "listOrders"),
    orderItems: createResourceProxy("lemonsqueezy", ls, "listOrderItems"),
    subscriptions: createResourceProxy("lemonsqueezy", ls, "listSubscriptions"),
    subscriptionItems: createResourceProxy("lemonsqueezy", ls, "listSubscriptionItems"),
    subscriptionInvoices: createResourceProxy("lemonsqueezy", ls, "listSubscriptionInvoices"),
    licenseKeys: createResourceProxy("lemonsqueezy", ls, "listLicenseKeys"),
    licenseKeyInstances: createResourceProxy("lemonsqueezy", ls, "listLicenseKeyInstances"),
    discounts: createResourceProxy("lemonsqueezy", ls, "listDiscounts"),
    discountRedemptions: createResourceProxy("lemonsqueezy", ls, "listDiscountRedemptions"),
    files: createResourceProxy("lemonsqueezy", ls, "listFiles"),
    webhooks: createResourceProxy("lemonsqueezy", ls, "listWebhooks"),
  };
}
