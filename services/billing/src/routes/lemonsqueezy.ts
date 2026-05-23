import {
  InvoiceStatus,
  OrderStatus,
  Provider,
  ProviderEntity,
  ResourceType,
  SubscriptionStatus,
  WebhookEventAttemptStatus,
  WebhookEventStatus,
} from "@ubento/services.database/billing";
import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/services.primitives";
import express, { Request, Response } from "express";
import crypto from "node:crypto";
import { z } from "zod";
import { env } from "../env.js";
import prisma from "../lib/prisma.js";
import { logger } from "../logger.js";

/* =====================================================================================
   Lemon Squeezy Webhook Module (tight + production-safe)
   - Signature verification
   - Event persistence + idempotent processing (lock w/ TTL)
   - Orders, Subscriptions, SubscriptionInvoices
   - ProviderLink mapping: LS ids -> Ubento resource codes
   ===================================================================================== */

const LOCK_TTL_MS = 5 * 60_000; // 5 minutes

const customDataSchema = z.object({
  team_id: z.string(),
});
export type CustomData = z.infer<typeof customDataSchema>;

/* =======================
   Lemon Squeezy payload types (minimal, stable)
   ======================= */

type LSEventName =
  | "order_created"
  | "order_refunded"
  | "subscription_created"
  | "subscription_updated"
  | "subscription_cancelled"
  | "subscription_resumed"
  | "subscription_expired"
  | "subscription_paused"
  | "subscription_unpaused"
  | "subscription_plan_changed"
  | "subscription_payment_success"
  | "subscription_payment_failed"
  | "subscription_payment_recovered"
  | "subscription_payment_refunded";

type LSCommonMeta = {
  test_mode: boolean;
  webhook_id: string;
  event_name: LSEventName;
  custom_data?: Record<string, unknown>;
};

type LSOrderData = {
  type: "orders";
  id: string;
  attributes: {
    store_id: number;
    customer_id: number;
    user_email: string;
    user_name: string;
    identifier: string;
    order_number: number;
    status: string;
    status_formatted: string;
    refunded: boolean;
    refunded_at: string | null;
    refunded_amount: number;
    refunded_amount_usd: number;
    refunded_amount_formatted: string;
    subtotal: number;
    subtotal_usd: number;
    subtotal_formatted: string;
    discount_total: number;
    discount_total_usd: number;
    discount_total_formatted: string;
    tax: number;
    tax_usd: number;
    tax_formatted: string;
    tax_name: string;
    tax_rate: number;
    tax_inclusive: boolean;
    setup_fee: number;
    setup_fee_usd: number;
    setup_fee_formatted: string;
    total: number;
    total_usd: number;
    total_formatted: string;
    currency: string;
    currency_rate: string;
    first_order_item?: {
      id: number;
      order_id: number;
      product_id: number;
      variant_id: number;
      product_name: string;
      variant_name: string;
      price_id: number;
      price: number;
      quantity: number;
      created_at: string;
      updated_at: string;
      test_mode: boolean;
    };
    urls?: { receipt?: string };
    created_at: string;
    updated_at: string;
    test_mode: boolean;
  };
};

type LSSubData = {
  type: "subscriptions";
  id: string;
  attributes: {
    store_id: number;
    customer_id: number;
    order_id: number;
    product_id: number;
    variant_id: number;
    user_email: string;
    user_name: string;
    status: string;
    status_formatted: string;
    pause: null | { mode: string; resumes_at: string | null };
    cancelled: boolean;
    trial_ends_at: string | null;
    billing_anchor: number;
    urls: {
      update_payment_method?: string;
      customer_portal?: string;
      customer_portal_update_subscription?: string;
    };
    renews_at: string | null;
    ends_at: string | null;
    created_at: string;
    updated_at: string;
    test_mode: boolean;
    card_brand: string;
    card_last_four: string;
    payment_processor: string;
    product_name: string;
    variant_name: string;
    order_item_id: number;
    first_subscription_item?: {
      id: number;
      price_id: number;
      quantity: number;
      created_at: string;
      updated_at: string;
      is_usage_based: boolean;
      subscription_id: number;
    };
  };
};

type LSSubInvoiceData = {
  type: "subscription-invoices";
  id: string;
  attributes: {
    subscription_id: number;
    store_id: number;
    customer_id: number;
    user_email: string;
    user_name: string;
    billing_reason: string;
    card_brand: string;
    card_last_four: string;
    status: string;
    status_formatted: string;
    refunded: boolean;
    refunded_at: string | null;
    refunded_amount: number;
    refunded_amount_usd: number;
    refunded_amount_formatted: string;
    subtotal: number;
    subtotal_usd: number;
    subtotal_formatted: string;
    discount_total: number;
    discount_total_usd: number;
    discount_total_formatted: string;
    tax: number;
    tax_usd: number;
    tax_formatted: string;
    tax_inclusive: boolean;
    total: number;
    total_usd: number;
    total_formatted: string;
    currency: string;
    currency_rate: string;
    urls?: { invoice_url?: string };
    created_at: string;
    updated_at: string;
    test_mode: boolean;
  };
};

type LSPayload =
  | { meta: LSCommonMeta; data: LSOrderData }
  | { meta: LSCommonMeta; data: LSSubData }
  | { meta: LSCommonMeta; data: LSSubInvoiceData };

/* =======================
   Small utilities
   ======================= */

function must<T>(v: T | null | undefined, msg: string): T {
  if (v === null || v === undefined) throw new Error(msg);
  return v;
}

function parseIsoDate(
  s: string | null | undefined,
  field: string,
): Date | null {
  if (!s) return null;
  const d = new Date(s);
  if (Number.isNaN(d.getTime()))
    throw new Error(`Invalid date for ${field}: ${s}`);
  return d;
}

async function getLink(args: {
  provider: Provider;
  provider_entity: ProviderEntity;
  provider_id: string | number;
  resource_type: ResourceType;
  err: string;
}) {
  const link = await prisma.providerLink.findUnique({
    where: {
      provider_provider_entity_provider_id_resource_type: {
        provider: args.provider,
        provider_entity: args.provider_entity,
        provider_id: String(args.provider_id),
        resource_type: args.resource_type,
      },
    },
  });
  return must(link, args.err);
}

/* =======================
   Status mappers (strict)
   ======================= */

function mapOrderStatus(s: string): OrderStatus | undefined {
  switch (s.toLowerCase()) {
    case "paid":
      return "PAID";
    case "refunded":
      return "REFUNDED";
    case "partial_refund":
      return "PARTIAL_REFUND";
    case "failed":
      return "FAILED";
    case "fraudulent":
      return "FRAUDULENT";
    case "pending":
      return "PENDING";
  }
}
function mapOrderStatusStrict(s: string): OrderStatus {
  return must(mapOrderStatus(s), `Unknown order status: ${s}`);
}

function mapSubStatus(s: string): SubscriptionStatus | undefined {
  switch (s.toLowerCase()) {
    case "active":
      return SubscriptionStatus.ACTIVE;
    case "on_trial":
      return SubscriptionStatus.ON_TRIAL;
    case "paused":
      return SubscriptionStatus.PAUSED;
    case "past_due":
      return SubscriptionStatus.PAST_DUE;
    case "unpaid":
      return SubscriptionStatus.UNPAID;
    case "cancelled":
      return SubscriptionStatus.CANCELLED;
    case "expired":
      return SubscriptionStatus.EXPIRED;
  }
}
function mapSubStatusStrict(s: string): SubscriptionStatus {
  return must(mapSubStatus(s), `Unknown subscription status: ${s}`);
}

function mapInvoiceStatus(s: string): InvoiceStatus | undefined {
  switch (s.toLowerCase()) {
    case "paid":
      return InvoiceStatus.PAID;
    case "open":
      return InvoiceStatus.OPEN;
    case "void":
      return InvoiceStatus.VOID;
    case "uncollectible":
      return InvoiceStatus.UNCOLLECTIBLE;
    case "draft":
      return InvoiceStatus.DRAFT;
  }
}
function mapInvoiceStatusStrict(s: string): InvoiceStatus {
  return must(mapInvoiceStatus(s), `Unknown invoice status: ${s}`);
}

/* =======================
   Orders
   ======================= */

async function upsertOrder(payload: Extract<LSPayload, { data: LSOrderData }>) {
  const { data, meta } = payload;
  const a = data.attributes;

  // Orders require team_id (intent) - should be present from checkout custom_data
  const customData = customDataSchema.parse(meta.custom_data);
  const teamId = customData.team_id;

  const item = must(
    a.first_order_item,
    "First order item not found in order data",
  );

  const offerLink = await getLink({
    provider: Provider.LEMON_SQUEEZY,
    provider_entity: ProviderEntity.PRODUCT_VARIANT,
    provider_id: item.variant_id,
    resource_type: ResourceType.OFFER,
    err: `Unknown LS variant_id (offer): ${item.variant_id}`,
  });

  const productLink = await getLink({
    provider: Provider.LEMON_SQUEEZY,
    provider_entity: ProviderEntity.PRODUCT,
    provider_id: item.product_id,
    resource_type: ResourceType.PRODUCT,
    err: `Unknown LS product_id (product): ${item.product_id}`,
  });

  const providerUpdatedAt =
    must(
      parseIsoDate(a.updated_at, "order.updated_at"),
      "Missing order.updated_at",
    ) ?? new Date();

  const newId = makeEntityId({
    code: ubentoEntities.billingOrder.code,
    bareId: generateBareId(),
  });

  // Prefer idempotent upsert for both created/refunded.
  await prisma.order.upsert({
    where: {
      provider_provider_id: {
        provider: Provider.LEMON_SQUEEZY,
        provider_id: data.id,
      },
    },
    create: {
      id: newId,
      team_id: teamId,
      provider: Provider.LEMON_SQUEEZY,
      provider_id: data.id,

      product_code: productLink.resource_code,
      offer_code: offerLink.resource_code,
      quantity: item.quantity ?? 1,

      status: mapOrderStatusStrict(a.status),
      link_updated_at: providerUpdatedAt,

      data: payload.data as any,
    },
    update: {
      // Gate older events (requires link_updated_at column in Order)
      // If you don't have link_updated_at on Order, remove the gate and rely on provider's eventual consistency.
      product_code: productLink.resource_code,
      offer_code: offerLink.resource_code,
      quantity: item.quantity ?? 1,
      status: mapOrderStatusStrict(a.status),
      link_updated_at: providerUpdatedAt,
      data: payload.data as any,
    },
  });
}

/* =======================
   Subscription invoices
   ======================= */

async function upsertSubscriptionInvoice(
  payload: Extract<LSPayload, { data: LSSubInvoiceData }>,
  subscription: { id: string; team_id: string },
) {
  const { data } = payload;
  const a = data.attributes;

  const newId = makeEntityId({
    code: ubentoEntities.billingSubscriptionInvoice.code,
    bareId: generateBareId(),
  });

  await prisma.subscriptionInvoice.upsert({
    where: {
      provider_provider_id: {
        provider: Provider.LEMON_SQUEEZY,
        provider_id: data.id,
      },
    },
    create: {
      id: newId,
      team_id: subscription.team_id,
      subscription_id: subscription.id,

      provider: Provider.LEMON_SQUEEZY,
      provider_id: data.id,

      status: mapInvoiceStatusStrict(a.status),
      subtotal: a.subtotal,
      tax: a.tax,
      total: a.total,
      currency: a.currency,

      issued_at: must(
        parseIsoDate(a.created_at, "invoice.created_at"),
        "Missing invoice.created_at",
      )!,
      hosted_url: a.urls?.invoice_url ?? null,

      data: payload.data as any,
    },
    update: {
      status: mapInvoiceStatusStrict(a.status),
      subtotal: a.subtotal,
      tax: a.tax,
      total: a.total,
      currency: a.currency,
      hosted_url: a.urls?.invoice_url ?? null,
      data: payload.data as any,
    },
  });
}

async function handleInvoiceEvent(
  payload: Extract<LSPayload, { data: LSSubInvoiceData }>,
) {
  const { meta, data } = payload;
  const a = data.attributes;

  const subscriptionProviderId = String(a.subscription_id);

  const subscription = await prisma.subscription.findUnique({
    where: {
      provider_provider_id: {
        provider: Provider.LEMON_SQUEEZY,
        provider_id: subscriptionProviderId,
      },
    },
  });
  if (!subscription) {
    throw new Error(
      `Subscription not found for invoice: ${subscriptionProviderId}`,
    );
  }

  // Minimal subscription status alignment with payment outcomes
  if (
    meta.event_name === "subscription_payment_success" ||
    meta.event_name === "subscription_payment_recovered"
  ) {
    await prisma.subscription.updateMany({
      where: {
        provider: Provider.LEMON_SQUEEZY,
        provider_id: subscriptionProviderId,
      },
      data: { status: SubscriptionStatus.ACTIVE },
    });
  } else if (meta.event_name === "subscription_payment_failed") {
    await prisma.subscription.updateMany({
      where: {
        provider: Provider.LEMON_SQUEEZY,
        provider_id: subscriptionProviderId,
      },
      data: { status: SubscriptionStatus.PAST_DUE },
    });
  }

  await upsertSubscriptionInvoice(payload, subscription);
}

/* =======================
   Subscriptions
   ======================= */

async function getSubscriptionUpdateData(
  payload: Extract<LSPayload, { data: LSSubData }>,
) {
  const a = payload.data.attributes;
  const item = must(
    a.first_subscription_item,
    "First subscription item not found in subscription data",
  );

  const offerLink = await getLink({
    provider: Provider.LEMON_SQUEEZY,
    provider_entity: ProviderEntity.PRODUCT_VARIANT,
    provider_id: a.variant_id,
    resource_type: ResourceType.OFFER,
    err: `Unknown LS variant_id (offer): ${a.variant_id}`,
  });

  const productLink = await getLink({
    provider: Provider.LEMON_SQUEEZY,
    provider_entity: ProviderEntity.PRODUCT,
    provider_id: a.product_id,
    resource_type: ResourceType.PRODUCT,
    err: `Unknown LS product_id (product): ${a.product_id}`,
  });

  return {
    offer_code: offerLink.resource_code,
    product_code: productLink.resource_code,
    quantity: item.quantity,
    status: mapSubStatusStrict(a.status),
    data: payload.data as any,
    ends_at: parseIsoDate(a.ends_at, "subscription.ends_at") ?? null,
    link_updated_at: must(
      parseIsoDate(a.updated_at, "subscription.updated_at"),
      "Missing subscription.updated_at",
    )!,
  };
}

async function upsertSubscription(
  payload: Extract<LSPayload, { data: LSSubData }>,
) {
  // subscription_created must contain team_id
  const customData = customDataSchema.parse(payload.meta.custom_data);
  const teamId = customData.team_id;

  const updateData = await getSubscriptionUpdateData(payload);

  const newId = makeEntityId({
    code: ubentoEntities.billingSubscription.code,
    bareId: generateBareId(),
  });

  const sub = await prisma.subscription.upsert({
    where: {
      provider_provider_id: {
        provider: Provider.LEMON_SQUEEZY,
        provider_id: payload.data.id,
      },
    },
    create: {
      id: newId,
      team_id: teamId,
      provider: Provider.LEMON_SQUEEZY,
      provider_id: payload.data.id,
      ...updateData,
    },
    update: {},
  });

  // If it already existed, apply only if newer than stored
  if (sub.id !== newId) {
    await prisma.subscription.updateMany({
      where: {
        id: sub.id,
        OR: [
          { link_updated_at: null },
          { link_updated_at: { lt: updateData.link_updated_at } },
        ],
      },
      data: updateData,
    });
  }
}

async function updateSubscription(
  payload: Extract<LSPayload, { data: LSSubData }>,
) {
  const updateData = await getSubscriptionUpdateData(payload);

  // update() cannot include OR gating; use updateMany
  const result = await prisma.subscription.updateMany({
    where: {
      provider: Provider.LEMON_SQUEEZY,
      provider_id: payload.data.id,
      OR: [
        { link_updated_at: null },
        { link_updated_at: { lt: updateData.link_updated_at } },
      ],
    },
    data: updateData,
  });

  if (result.count === 0) {
    // Either missing subscription or stale update; prefer error so webhook event becomes ERRORED and retried.
    throw new Error(
      `Subscription ${payload.data.id} not found or stale update`,
    );
  }
}

/* =======================
   Dispatcher (persist + lock + process)
   ======================= */

async function handleLemonEvent(payload: LSPayload) {
  const webhookEventId = makeEntityId({
    code: ubentoEntities.billingWebhookEvent.code,
    bareId: generateBareId(),
  });

  const webhook = await prisma.webhookEvent.upsert({
    where: {
      provider_provider_id: {
        provider: Provider.LEMON_SQUEEZY,
        provider_id: payload.meta.webhook_id,
      },
    },
    update: {},
    create: {
      id: webhookEventId,
      event: payload.meta.event_name,
      provider: Provider.LEMON_SQUEEZY,
      provider_id: payload.meta.webhook_id,
      payload: payload as any,
    },
  });

  const attemptId = crypto.randomUUID();

  // Atomic claim (idempotent lock w/ TTL)
  const claim = await prisma.webhookEvent.updateMany({
    where: {
      id: webhook.id,
      OR: [
        {
          status: {
            in: [WebhookEventStatus.RECEIVED, WebhookEventStatus.ERRORED],
          },
        },
        {
          status: WebhookEventStatus.PROCESSING,
          lock_expires_at: { lte: new Date() },
        },
      ],
    },
    data: {
      status: WebhookEventStatus.PROCESSING,
      lock_expires_at: new Date(Date.now() + LOCK_TTL_MS),
      attempts: {
        push: {
          id: attemptId,
          at: new Date(),
          status: WebhookEventAttemptStatus.STARTED,
        },
      },
    },
  });

  if (claim.count === 0) return;

  try {
    const type = payload.data.type;

    switch (payload.meta.event_name) {
      case "order_created":
      case "order_refunded":
        if (type === "orders") {
          await upsertOrder(
            payload as Extract<LSPayload, { data: LSOrderData }>,
          );
        }
        break;

      case "subscription_created":
        if (type === "subscriptions") {
          await upsertSubscription(
            payload as Extract<LSPayload, { data: LSSubData }>,
          );
        }
        break;

      case "subscription_updated":
      case "subscription_cancelled":
      case "subscription_resumed":
      case "subscription_expired":
      case "subscription_paused":
      case "subscription_unpaused":
      case "subscription_plan_changed":
        if (type === "subscriptions") {
          await updateSubscription(
            payload as Extract<LSPayload, { data: LSSubData }>,
          );
        }
        break;

      case "subscription_payment_success":
      case "subscription_payment_failed":
      case "subscription_payment_recovered":
      case "subscription_payment_refunded":
        if (type === "subscription-invoices") {
          await handleInvoiceEvent(
            payload as Extract<LSPayload, { data: LSSubInvoiceData }>,
          );
        }
        break;

      default:
        break;
    }

    await prisma.webhookEvent.update({
      where: { id: webhook.id },
      data: {
        status: WebhookEventStatus.PROCESSED,
        attempts: {
          updateMany: {
            where: { id: attemptId },
            data: { status: WebhookEventAttemptStatus.SUCCEEDED },
          },
        },
      },
    });
  } catch (e) {
    await prisma.webhookEvent.update({
      where: { id: webhook.id },
      data: {
        status: WebhookEventStatus.ERRORED,
        attempts: {
          updateMany: {
            where: { id: attemptId },
            data: {
              status: WebhookEventAttemptStatus.FAILED,
              error: String(e),
            },
          },
        },
      },
    });
    throw e;
  }
}

/* =======================
   Router factory
   ======================= */

export const lemonsqueezyWebhookRouter: express.Router = express.Router();

const secret = env.LEMONSQUEEZY_WEBHOOK_SECRET;

if (!secret) {
  logger.warn("[lemon-webhook] Missing webhook secret", {
    event: "warning",
  });
}

lemonsqueezyWebhookRouter.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    try {
      if (!secret) return res.status(500).send("misconfigured");

      const signature = req.header("X-Signature") || "";
      const digest = crypto
        .createHmac("sha256", String(secret))
        .update(req.body) // raw buffer
        .digest("hex");

      if (
        signature.length !== digest.length ||
        !crypto.timingSafeEqual(
          Buffer.from(signature) as any,
          Buffer.from(digest) as any,
        )
      ) {
        return res.status(400).send("invalid signature");
      }

      const payload = JSON.parse(req.body.toString("utf8")) as LSPayload;
      await handleLemonEvent(payload);
      return res.status(200).send("ok");
    } catch (err) {
      logger.error("[lemon-webhook] Error handling event", {
        event: "error",
        context: { error: String(err) },
      });
      return res.status(500).send("error");
    }
  },
);
