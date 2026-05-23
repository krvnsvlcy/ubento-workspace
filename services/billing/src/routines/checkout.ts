import { createCheckout as lsCreateCheckout } from "@lemonsqueezy/lemonsqueezy.js";
import {
  Checkout,
  Provider,
  ProviderEntity,
  ProviderLinkStatus,
  ResourceType,
} from "@ubento/services.database/billing";
import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/services.primitives";
import { NotFoundError, prismaListWithCursor } from "@ubento/services.toolkit";
import { env } from "../env.js";
import { eventPublisher } from "../event.js";
import prisma from "../lib/prisma.js";

async function createLSCheckout({
  team_id,
  offer_code,
  redirect_url,
  quantity,
  data,
  duration = 3600,
}: {
  team_id: string;
  offer_code: string;
  redirect_url: string;
  quantity: number;
  duration?: number;
  data?: { email?: string; name?: string };
}) {
  const offerLink = await prisma.providerLink.findFirst({
    where: {
      resource_type: ResourceType.OFFER,
      resource_code: offer_code,
      provider: Provider.LEMON_SQUEEZY,
      provider_entity: ProviderEntity.PRODUCT_VARIANT,
      status: ProviderLinkStatus.ACTIVE,
    },
    orderBy: { priority: "desc" },
  });

  if (!offerLink) throw new NotFoundError("Offer link not found");

  const expiresAt = new Date(
    Date.now() + Math.min(Math.max(duration, 60), 86400) * 1000,
  ).toISOString();

  const storeId = env.LEMONSQUEEZY_STORE_ID.startsWith("n-")
    ? env.LEMONSQUEEZY_STORE_ID.slice(2)
    : env.LEMONSQUEEZY_STORE_ID;
  console.log("storeId", storeId);
  console.log("offerLink.provider_id", offerLink.provider_id);
  const response = await lsCreateCheckout(storeId, offerLink.provider_id, {
    productOptions: { redirectUrl: redirect_url },
    checkoutData: {
      email: data?.email,
      name: data?.name,
      variantQuantities: [
        { variantId: Number(offerLink.provider_id), quantity },
      ],
      custom: { team_id, offer_code },
    },
    expiresAt,
  });

  if (response.error) throw new Error(response.error.message);

  return {
    id: response.data.data.id,
    url: response.data.data.attributes.url,
    data: response.data.data.attributes,
  };
}

export async function createCheckout(input: {
  team_id: string;
  product_code: string;
  offer_code: string;
  quantity: number;
  redirect_url: string;
  duration?: number;
  provider?: Provider; // optional; inferred here
  data?: { email?: string; name?: string };
}): Promise<Checkout> {
  const providerCheckoutData = await createLSCheckout({
    team_id: input.team_id,
    offer_code: input.offer_code,
    redirect_url: input.redirect_url,
    quantity: input.quantity,
    duration: input.duration,
    data: input.data,
  });

  const checkout = await prisma.checkout.create({
    data: {
      id: makeEntityId({
        code: ubentoEntities.billingCheckout.code,
        bareId: generateBareId(),
      }),
      team_id: input.team_id,
      product_code: input.product_code,
      offer_code: input.offer_code,
      quantity: input.quantity,
      url: providerCheckoutData.url,
      provider: Provider.LEMON_SQUEEZY,
      provider_id: providerCheckoutData.id,
      data: providerCheckoutData.data as any,
    },
  });

  eventPublisher.publishEntity("created", checkout);
  return checkout;
}

export async function getCheckout(id: string): Promise<Checkout | null> {
  const checkout = await prisma.checkout.findUnique({
    where: { id },
  });
  return checkout;
}

export async function getCheckoutByProvider(
  provider: Provider,
  provider_id: string,
): Promise<Checkout | null> {
  const checkout = await prisma.checkout.findUnique({
    where: {
      provider_provider_id: {
        provider,
        provider_id,
      },
    },
  });
  return checkout;
}

export async function listCheckouts(filters?: {
  team_id?: string;
  product_code?: string;
  offer_code?: string;
  limit?: number;
  cursor?: string;
}) {
  return prismaListWithCursor(prisma.checkout, {
    limit: filters?.limit,
    cursor: filters?.cursor,
    orderBy: [{ created_at: "desc" }, { id: "desc" }],
    where: {
      ...(filters?.team_id && {
        team_id: filters.team_id,
      }),
      ...(filters?.product_code && { product_code: filters.product_code }),
      ...(filters?.offer_code && { offer_code: filters.offer_code }),
    },
    resolveCursor: (d) => ({ id: d.id }),
  });
}

export async function updateCheckout(
  id: string,
  data: {
    data?: any;
  },
): Promise<Checkout> {
  const checkout = await prisma.checkout.update({
    where: { id },
    data: {
      ...(data.data !== undefined && { data: data.data }),
    },
  });

  eventPublisher.publishEntity("updated", checkout);
  return checkout;
}

export async function deleteCheckout(id: string): Promise<Checkout> {
  const checkout = await prisma.checkout.delete({
    where: { id },
  });

  eventPublisher.publishEntity("deleted", checkout);
  return checkout;
}
