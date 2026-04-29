import {
  ubentoEntities,
  generateBareId,
  makeEntityId,
} from "@ubento/primitives";
import { prismaListWithCursor } from "@ubento/service-toolkit";
import type {
  Offer,
  Product,
  Provider,
  ProviderEntity,
  ProviderLink,
  ResourceType,
} from "@ubento/database/billing";
import { eventPublisher } from "../event.js";
import prisma from "../lib/prisma.js";
import { Entitlement } from "./entitlements/entitlements.js";

// ==================== Products ====================

export async function createProduct(data: {
  code: string;
  name: string;
  description?: string;
  default_offer_code?: string;
}): Promise<Product> {
  const product = await prisma.product.create({
    data: {
      id: makeEntityId({
        code: ubentoEntities.billingProduct.code,
        bareId: generateBareId(),
      }),
      code: data.code,
      name: data.name,
      description: data.description,
      default_offer_code: data.default_offer_code,
    },
  });

  eventPublisher.publishEntity("created", product);
  return product;
}

export async function updateProduct(
  id: string,
  data: {
    name?: string;
    description?: string;
    default_offer_code?: string;
  },
): Promise<Product> {
  const product = await prisma.product.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.default_offer_code !== undefined && {
        default_offer_code: data.default_offer_code,
      }),
    },
  });

  eventPublisher.publishEntity("updated", product);
  return product;
}

export async function getProduct(id: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  return product;
}

export async function getProductByCode(code: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: { code },
  });

  return product;
}

export async function listProducts(options?: {
  limit?: number;
  cursor?: string;
}) {
  return prismaListWithCursor(prisma.product, {
    limit: options?.limit,
    cursor: options?.cursor,
    orderBy: [{ created_at: "desc" }, { id: "desc" }],
    where: {},
    resolveCursor: (d) => ({ id: d.id }),
  });
}

// ==================== Offers ====================
export type EnrichedOffer = Offer & {
  entitlements: Entitlement[];
};

export async function createOffer(data: {
  code: string;
  product_code: string;
  name: string;
  description?: string;
  entitlements?: Entitlement[];
  metadata?: any;
  active?: boolean;
}): Promise<Offer> {
  const offer = await prisma.offer.create({
    data: {
      id: makeEntityId({
        code: ubentoEntities.billingOffer.code,
        bareId: generateBareId(),
      }),
      code: data.code,
      product_code: data.product_code,
      name: data.name,
      description: data.description,
      entitlements: (data.entitlements || []) as any,
      metadata: data.metadata,
      active: data.active ?? true,
    },
  });

  eventPublisher.publishEntity("created", offer);
  return offer;
}

export async function updateOffer(
  id: string,
  data: {
    name?: string;
    description?: string;
    entitlements?: Entitlement[];
    product_code?: string;
    metadata?: any;
    active?: boolean;
  },
): Promise<Offer> {
  const offer = await prisma.offer.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.entitlements !== undefined && {
        entitlements: data.entitlements as any,
      }),
      ...(data.metadata !== undefined && { metadata: data.metadata }),
      ...(data.active !== undefined && { active: data.active }),
      ...(data.product_code !== undefined && {
        product_code: data.product_code,
      }),
    },
  });

  eventPublisher.publishEntity("updated", offer);
  return offer;
}

export async function activateOffer(id: string): Promise<Offer> {
  const offer = await prisma.offer.update({
    where: { id },
    data: { active: true },
  });

  eventPublisher.publishEntity("updated", offer);
  return offer;
}

export async function deactivateOffer(id: string): Promise<Offer> {
  const offer = await prisma.offer.update({
    where: { id },
    data: { active: false },
  });

  eventPublisher.publishEntity("updated", offer);
  return offer;
}

export async function getOffer(id: string): Promise<Offer | null> {
  const offer = await prisma.offer.findUnique({
    where: { id },
  });

  return offer;
}

export async function getOfferByCode(code: string): Promise<Offer | null> {
  const offer = await prisma.offer.findUnique({
    where: { code },
  });

  return offer;
}

export async function listOffers(filters?: {
  active?: boolean;
  code?: string;
  limit?: number;
  cursor?: string;
}) {
  return prismaListWithCursor(prisma.offer, {
    limit: filters?.limit,
    cursor: filters?.cursor,
    orderBy: [{ created_at: "desc" }, { id: "desc" }],
    where: {
      ...(filters?.active !== undefined && { active: filters.active }),
      ...(filters?.code && { code: filters.code }),
    },
    resolveCursor: (d) => ({ id: d.id }),
  });
}

// ==================== Provider Links ====================

export async function createProviderLink(data: {
  provider: Provider;
  provider_entity: ProviderEntity;
  provider_id: string;
  resource_type: ResourceType;
  resource_code: string;
  status?: "ACTIVE" | "INACTIVE";
  priority?: number;
}): Promise<ProviderLink> {
  const link = await prisma.providerLink.create({
    data: {
      id: makeEntityId({
        code: ubentoEntities.billingProviderLink.code,
        bareId: generateBareId(),
      }),
      provider: data.provider,
      provider_entity: data.provider_entity,
      provider_id: data.provider_id,
      resource_type: data.resource_type,
      resource_code: data.resource_code,
      status: data.status ?? "ACTIVE",
      priority: data.priority ?? 0,
    },
  });

  eventPublisher.publishEntity("created", link);
  return link;
}

export async function upsertProviderLink(data: {
  provider: Provider;
  provider_entity: ProviderEntity;
  provider_id: string;
  resource_type: ResourceType;
  resource_code: string;
  status?: "ACTIVE" | "INACTIVE";
  priority?: number;
}): Promise<ProviderLink> {
  const newId = makeEntityId({
    code: ubentoEntities.billingProviderLink.code,
    bareId: generateBareId(),
  });

  const link = await prisma.providerLink.upsert({
    where: {
      provider_provider_entity_provider_id_resource_type: {
        provider: data.provider,
        provider_entity: data.provider_entity,
        provider_id: data.provider_id,
        resource_type: data.resource_type,
      },
    },
    create: {
      id: newId,
      provider: data.provider,
      provider_entity: data.provider_entity,
      provider_id: data.provider_id,
      resource_type: data.resource_type,
      resource_code: data.resource_code,
      status: data.status ?? "ACTIVE",
      priority: data.priority ?? 0,
    },
    update: {
      resource_code: data.resource_code,
      ...(data.status !== undefined && { status: data.status }),
      ...(data.priority !== undefined && { priority: data.priority }),
    },
  });

  // Only publish if it was created
  if (link.id === newId) {
    eventPublisher.publishEntity("created", link);
  } else {
    eventPublisher.publishEntity("updated", link);
  }

  return link;
}

export async function updateProviderLink(
  id: string,
  data: {
    status?: "ACTIVE" | "INACTIVE";
    priority?: number;
  },
): Promise<ProviderLink> {
  const link = await prisma.providerLink.update({
    where: { id },
    data: {
      ...(data.status !== undefined && { status: data.status }),
      ...(data.priority !== undefined && { priority: data.priority }),
    },
  });

  eventPublisher.publishEntity("updated", link);
  return link;
}

export async function getProviderLink(
  id: string,
): Promise<ProviderLink | null> {
  const link = await prisma.providerLink.findUnique({
    where: { id },
  });

  return link;
}

export async function listProviderLinks(filters?: {
  resource_type?: ResourceType;
  resource_code?: string;
  provider?: Provider;
  limit?: number;
  cursor?: string;
}) {
  return prismaListWithCursor(prisma.providerLink, {
    limit: filters?.limit,
    cursor: filters?.cursor,
    orderBy: [{ created_at: "desc" }, { id: "desc" }],
    where: {
      ...(filters?.resource_type && { resource_type: filters.resource_type }),
      ...(filters?.resource_code && { resource_code: filters.resource_code }),
      ...(filters?.provider && { provider: filters.provider }),
    },
    resolveCursor: (d) => ({ id: d.id }),
  });
}
