import Stripe from "stripe";
import { createResourceProxy } from "./proxy.js";

export function createStripeBillingService(stripe: Stripe) {
  return {
    subscriptions: createResourceProxy<Stripe.SubscriptionsResource>(stripe, "subscriptions"),
    subscriptionItems: createResourceProxy<Stripe.SubscriptionItemsResource>(stripe, "subscriptionItems"),
    subscriptionSchedules: createResourceProxy<Stripe.SubscriptionSchedulesResource>(stripe, "subscriptionSchedules"),
    invoices: createResourceProxy<Stripe.InvoicesResource>(stripe, "invoices"),
    invoiceItems: createResourceProxy<Stripe.InvoiceItemsResource>(stripe, "invoiceItems"),
    plans: createResourceProxy<Stripe.PlansResource>(stripe, "plans"),
    coupons: createResourceProxy<Stripe.CouponsResource>(stripe, "coupons"),
    creditNotes: createResourceProxy<Stripe.CreditNotesResource>(stripe, "creditNotes"),
    quotes: createResourceProxy<Stripe.QuotesResource>(stripe, "quotes"),
    ephemeralKeys: createResourceProxy<Stripe.EphemeralKeysResource>(stripe, "ephemeralKeys"),
    // Some namespaces like billingPortal are separate objects in Stripe
    portal: {
      sessions: createResourceProxy<Stripe.BillingPortal.SessionsResource>(stripe.billingPortal, "sessions"),
      configurations: createResourceProxy<Stripe.BillingPortal.ConfigurationsResource>(stripe.billingPortal, "configurations"),
    }
  };
}
