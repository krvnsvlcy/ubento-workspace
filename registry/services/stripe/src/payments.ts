import Stripe from "stripe";
import { createResourceProxy } from "./proxy.js";

export function createStripePaymentsService(stripe: Stripe) {
  return {
    paymentIntents: createResourceProxy<Stripe.PaymentIntentsResource>(stripe, "paymentIntents"),
    paymentMethods: createResourceProxy<Stripe.PaymentMethodsResource>(stripe, "paymentMethods"),
    paymentLinks: createResourceProxy<Stripe.PaymentLinksResource>(stripe, "paymentLinks"),
    charges: createResourceProxy<Stripe.ChargesResource>(stripe, "charges"),
    refunds: createResourceProxy<Stripe.RefundsResource>(stripe, "refunds"),
    setupIntents: createResourceProxy<Stripe.SetupIntentsResource>(stripe, "setupIntents"),
    setupAttempts: createResourceProxy<Stripe.SetupAttemptsResource>(stripe, "setupAttempts"),
    disputes: createResourceProxy<Stripe.DisputesResource>(stripe, "disputes"),
    payouts: createResourceProxy<Stripe.PayoutsResource>(stripe, "payouts"),
  };
}
