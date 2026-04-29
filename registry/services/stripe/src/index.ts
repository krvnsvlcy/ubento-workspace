import Stripe from "stripe";
import { createStripeCoreService } from "./core.js";
import { createStripePaymentsService } from "./payments.js";
import { createStripeBillingService } from "./billing.js";
import { createResourceProxy } from "./proxy.js";

export * from "./proxy.js";
export * from "./core.js";
export * from "./payments.js";
export * from "./billing.js";

/**
 * Default export as the service factory
 */
export default function ({ ubento, apiKey, ...args }: any) {
  const stripe = new Stripe(apiKey, {
    apiVersion: "2024-11-20.acacia" as any,
    ...args,
  });

  return {
    // Top-level topologies
    core: createStripeCoreService(stripe),
    payments: createStripePaymentsService(stripe),
    billing: createStripeBillingService(stripe),

    // Advanced topologies could be added here
    checkout: {
      sessions: createResourceProxy<Stripe.Checkout.SessionsResource>(stripe.checkout, "sessions"),
    },
    terminal: {
      locations: createResourceProxy<Stripe.Terminal.LocationsResource>(stripe.terminal, "locations"),
      readers: createResourceProxy<Stripe.Terminal.ReadersResource>(stripe.terminal, "readers"),
    },
    // Allows raw access to the underlying SDK if necessary
    client: stripe,
  };
}
