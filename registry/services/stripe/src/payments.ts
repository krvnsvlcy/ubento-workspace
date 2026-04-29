import Stripe from "stripe";
import { createResourceProxy } from "@ubento/registry-proxy";

export function createStripePaymentsService(stripe: Stripe) {
  return {
    paymentIntents: createResourceProxy("stripe", stripe, "paymentIntents"),
    paymentMethods: createResourceProxy("stripe", stripe, "paymentMethods"),
    paymentLinks: createResourceProxy("stripe", stripe, "paymentLinks"),
    charges: createResourceProxy("stripe", stripe, "charges"),
    refunds: createResourceProxy("stripe", stripe, "refunds"),
    setupIntents: createResourceProxy("stripe", stripe, "setupIntents"),
    setupAttempts: createResourceProxy("stripe", stripe, "setupAttempts"),
    disputes: createResourceProxy("stripe", stripe, "disputes"),
    payouts: createResourceProxy("stripe", stripe, "payouts"),
  };
}
