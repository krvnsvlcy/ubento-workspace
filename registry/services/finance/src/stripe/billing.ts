import Stripe from "stripe";
import { createResourceProxy } from "@ubento/registry-proxy";

export function createStripeBillingService(stripe: Stripe) {
  return {
    subscriptions: createResourceProxy("stripe", stripe, "subscriptions"),
    subscriptionItems: createResourceProxy("stripe", stripe, "subscriptionItems"),
    subscriptionSchedules: createResourceProxy("stripe", stripe, "subscriptionSchedules"),
    invoices: createResourceProxy("stripe", stripe, "invoices"),
    invoiceItems: createResourceProxy("stripe", stripe, "invoiceItems"),
    plans: createResourceProxy("stripe", stripe, "plans"),
    coupons: createResourceProxy("stripe", stripe, "coupons"),
    creditNotes: createResourceProxy("stripe", stripe, "creditNotes"),
    quotes: createResourceProxy("stripe", stripe, "quotes"),
    ephemeralKeys: createResourceProxy("stripe", stripe, "ephemeralKeys"),
    // Some namespaces like billingPortal are separate objects in Stripe
    portal: {
      sessions: createResourceProxy<Stripe.BillingPortal.SessionsResource>("stripe", stripe.billingPortal, "sessions"),
      configurations: createResourceProxy<Stripe.BillingPortal.ConfigurationsResource>("stripe", stripe.billingPortal, "configurations"),
    }
  };
}
