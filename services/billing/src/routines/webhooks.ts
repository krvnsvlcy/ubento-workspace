import type { Provider, WebhookEvent } from "@ubento/services.database/billing";
import { prismaListWithCursor } from "@ubento/services.toolkit";
import prisma from "../lib/prisma.js";

export async function getWebhookEvent(
  id: string,
): Promise<WebhookEvent | null> {
  const webhookEvent = await prisma.webhookEvent.findUnique({
    where: { id },
  });

  return webhookEvent;
}

export async function getWebhookEventByProvider(
  provider: Provider,
  provider_id: string,
): Promise<WebhookEvent | null> {
  const webhookEvent = await prisma.webhookEvent.findUnique({
    where: {
      provider_provider_id: {
        provider,
        provider_id,
      },
    },
  });

  return webhookEvent;
}

export async function listWebhookEvents(filters?: {
  provider?: Provider;
  processed?: boolean;
  created_after?: Date;
  created_before?: Date;
  limit?: number;
  cursor?: string;
}) {
  return prismaListWithCursor(prisma.webhookEvent, {
    limit: filters?.limit,
    cursor: filters?.cursor,
    orderBy: [{ created_at: "desc" }, { id: "desc" }],
    where: {
      ...(filters?.provider && { provider: filters.provider }),
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
