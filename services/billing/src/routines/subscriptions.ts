import {
  cancelSubscription as lsCancelSubscription,
  updateSubscription as lsUpdateSubscription,
  updateSubscriptionItem as lsUpdateSubscriptionItem,
} from "@lemonsqueezy/lemonsqueezy.js";
import {
  InvoiceStatus,
  Provider,
  Subscription,
  SubscriptionInvoice,
  SubscriptionStatus,
} from "@ubento/services.database/billing";
import { prismaListWithCursor } from "@ubento/services.toolkit";
import { eventPublisher } from "../event.js";
import prisma from "../lib/prisma.js";

type LsSubscriptionStatus =
  | "on_trial"
  | "active"
  | "paused"
  | "pause"
  | "past_due"
  | "unpaid"
  | "cancelled"
  | "expired"
  | "cancelled";
function lsSubscriptionStatusToSubscriptionStatus(
  status: LsSubscriptionStatus,
): SubscriptionStatus {
  switch (status) {
    case "on_trial":
      return "ON_TRIAL";
    case "active":
      return "ACTIVE";
    case "past_due":
      return "PAST_DUE";
    case "cancelled":
      return "CANCELLED";
    case "expired":
      return "EXPIRED";
    case "paused":
      return "PAUSED";
    case "unpaid":
      return "UNPAID";
    case "expired":
      return "EXPIRED";
    default:
      throw new Error("Unsupported subscription status");
  }
}

export async function getActiveSubscription(
  team_id: string,
  product_code: string,
): Promise<Subscription | null> {
  const subscription = await prisma.subscription.findFirst({
    where: {
      product_code,
      team_id,
      OR: [
        {
          status: {
            in: [
              "ACTIVE" as SubscriptionStatus,
              "ON_TRIAL" as SubscriptionStatus,
              "PAST_DUE" as SubscriptionStatus,
            ],
          },
        },
        {
          status: "CANCELLED" as SubscriptionStatus,
          ends_at: {
            gt: new Date(),
          },
        },
      ],
    },
  });

  return subscription;
}

export async function getSubscription(
  id: string,
): Promise<Subscription | null> {
  const subscription = await prisma.subscription.findUnique({
    where: { id },
  });
  return subscription;
}

export async function getSubscriptionByProvider(
  provider: Provider,
  provider_id: string,
): Promise<Subscription | null> {
  const subscription = await prisma.subscription.findUnique({
    where: {
      provider_provider_id: {
        provider,
        provider_id,
      },
    },
  });
  return subscription;
}

export async function listSubscriptions(filters?: {
  team_id?: string;
  product_code?: string;
  offer_code?: string;
  status?: SubscriptionStatus;
  limit?: number;
  cursor?: string;
}) {
  return prismaListWithCursor(prisma.subscription, {
    limit: filters?.limit,
    cursor: filters?.cursor,
    orderBy: [{ created_at: "desc" }, { id: "desc" }],
    where: {
      ...(filters?.team_id && {
        team_id: filters.team_id,
      }),
      ...(filters?.offer_code && { offer_code: filters.offer_code }),
      ...(filters?.status && { status: filters.status }),
      ...(filters?.product_code && { product_code: filters.product_code }),
    },
    resolveCursor: (d) => ({ id: d.id }),
  });
}

async function cancelProviderSubscription(
  provider: Provider,
  provider_id: string,
): Promise<{
  ends_at: Date | null;
  data: any;
}> {
  if (provider === Provider.LEMON_SQUEEZY) {
    const lsResponse = await lsCancelSubscription(provider_id);

    if (lsResponse.error) {
      throw new Error(
        `Failed to cancel subscription: ${lsResponse.error.message}`,
      );
    }

    return {
      ends_at: lsResponse.data?.data.attributes.ends_at
        ? new Date(lsResponse.data?.data.attributes.ends_at)
        : null,
      data: lsResponse.data?.data.attributes,
    };
  } else {
    throw new Error("Unsupported provider");
  }
}

export async function cancelSubscription(id: string): Promise<Subscription> {
  const subscription = await getSubscription(id);

  if (!subscription) {
    throw new Error("Subscription not found");
  }

  const { ends_at, data } = await cancelProviderSubscription(
    subscription.provider,
    subscription.provider_id,
  );

  // Update local database
  const updated = await prisma.subscription.update({
    where: { id },
    data: {
      status: "CANCELLED",
      ends_at,
      data,
    },
  });

  eventPublisher.publishEntity("updated", updated);
  return updated;
}

async function resumeProviderSubscription(
  provider: Provider,
  provider_id: string,
): Promise<{
  ends_at: Date | null;
  data: any;
  status: SubscriptionStatus;
}> {
  if (provider === Provider.LEMON_SQUEEZY) {
    const lsResponse = await lsUpdateSubscription(provider_id, {
      cancelled: false,
    });

    if (lsResponse.error) {
      throw new Error(
        `Failed to resume subscription: ${lsResponse.error.message}`,
      );
    }

    return {
      ends_at: lsResponse.data?.data.attributes.ends_at
        ? new Date(lsResponse.data?.data.attributes.ends_at)
        : null,
      data: lsResponse.data?.data.attributes,
      status: lsSubscriptionStatusToSubscriptionStatus(
        lsResponse.data?.data.attributes.status,
      ),
    };
  } else {
    throw new Error("Unsupported provider");
  }
}

export async function resumeSubscription(id: string): Promise<Subscription> {
  const subscription = await getSubscription(id);

  if (!subscription) {
    throw new Error("Subscription not found");
  }

  const { ends_at, status, data } = await resumeProviderSubscription(
    subscription.provider,
    subscription.provider_id,
  );

  // Update local database
  const updated = await prisma.subscription.update({
    where: { id },
    data: {
      status,
      ends_at,
      data,
    },
  });

  eventPublisher.publishEntity("updated", updated);
  return updated;
}

async function updateProviderSubscription(
  provider: Provider,
  subscriptionData: any,
  updates: { quantity?: number },
): Promise<any> {
  if (provider === Provider.LEMON_SQUEEZY) {
    const subscriptionItemId =
      subscriptionData.attributes?.first_subscription_item?.id;

    if (!subscriptionItemId) {
      throw new Error("Subscription item not found");
    }

    if (updates.quantity !== undefined) {
      const lsResponse = await lsUpdateSubscriptionItem(subscriptionItemId, {
        quantity: updates.quantity,
        invoiceImmediately: true,
      });

      if (lsResponse.error) {
        throw new Error(
          `Failed to update subscription item: ${lsResponse.error.message}`,
        );
      }

      // We don't really need to return the lsResponse.data here since we rely on webhooks,
      // but returning true signifies success.
      return true;
    }
  } else {
    throw new Error("Unsupported provider");
  }
}

export async function updateSubscription(
  id: string,
  updates: { quantity?: number },
): Promise<Subscription> {
  const subscription = await getSubscription(id);

  if (!subscription) {
    throw new Error("Subscription not found");
  }

  await updateProviderSubscription(
    subscription.provider,
    subscription.data,
    updates,
  );

  // We can optimistically update local quantity.
  // The webhook will eventually sync the exact state as well.
  const updateData: any = {};
  if (updates.quantity !== undefined) {
    updateData.quantity = updates.quantity;
  }

  // Update local database
  const updated = await prisma.subscription.update({
    where: { id },
    data: updateData,
  });

  eventPublisher.publishEntity("updated", updated);
  return updated;
}

// ==================== Invoices ====================

export async function getInvoice(
  id: string,
): Promise<SubscriptionInvoice | null> {
  const invoice = await prisma.subscriptionInvoice.findUnique({
    where: { id },
  });
  return invoice;
}

export async function getInvoiceByProvider(
  provider: Provider,
  provider_id: string,
): Promise<SubscriptionInvoice | null> {
  const invoice = await prisma.subscriptionInvoice.findUnique({
    where: {
      provider_provider_id: {
        provider,
        provider_id,
      },
    },
  });
  return invoice;
}

export async function listInvoices(filters?: {
  team_id?: string;
  status?: InvoiceStatus;
  created_after?: Date;
  created_before?: Date;
  limit?: number;
  cursor?: string;
}) {
  return prismaListWithCursor(prisma.subscriptionInvoice, {
    limit: filters?.limit,
    cursor: filters?.cursor,
    orderBy: [{ created_at: "desc" }, { id: "desc" }],
    where: {
      ...(filters?.team_id && {
        team_id: filters.team_id,
      }),
      ...(filters?.status && { status: filters.status }),
      ...(filters?.created_after && {
        created_at: { gte: filters.created_after },
      }),
      ...(filters?.created_before && {
        created_at: { lte: filters.created_before },
      }),
    },
    resolveCursor: (d) => ({ id: d.id }),
  });
}
