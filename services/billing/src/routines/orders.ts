import type { Order, OrderStatus } from "@ubento/services.database/billing";
import { prismaListWithCursor } from "@ubento/services.toolkit";
import prisma from "../lib/prisma.js";

// ==================== Orders ====================

export async function getOrder(id: string): Promise<Order | null> {
  const order = await prisma.order.findUnique({
    where: { id },
  });
  return order;
}

export async function getOrderByProvider(
  provider: "LEMON_SQUEEZY",
  provider_id: string,
): Promise<Order | null> {
  const order = await prisma.order.findUnique({
    where: {
      provider_provider_id: {
        provider,
        provider_id,
      },
    },
  });
  return order;
}

export async function listOrders(filters?: {
  team_id?: string;
  status?: OrderStatus;
  created_after?: Date;
  created_before?: Date;
  limit?: number;
  cursor?: string;
}) {
  return prismaListWithCursor(prisma.order, {
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
