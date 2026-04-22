import { createClientFactory } from "~/lib/client.js";
import { components, paths } from "./types.js";

export const createBillingServiceClient = createClientFactory<paths>();
export type Product = components["schemas"]["Product"];
export type Offer = components["schemas"]["Offer"];
export type ProviderLink = components["schemas"]["ProviderLink"];
export type UsageCounter = components["schemas"]["UsageCounter"];
export type UsageHold = components["schemas"]["UsageHold"];
export type UsageEvent = components["schemas"]["UsageEvent"];
export type Subscription = components["schemas"]["Subscription"];
export type SubscriptionInvoice = components["schemas"]["SubscriptionInvoice"];
export type Order = components["schemas"]["Order"];
export type Checkout = components["schemas"]["Checkout"];
export type WebhookEvent = components["schemas"]["WebhookEvent"];
export type OrderLineItem = components["schemas"]["OrderLineItem"];
export type WebhookEventAttempt = components["schemas"]["WebhookEventAttempt"];