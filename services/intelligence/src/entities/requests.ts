import { prismaListWithCursor } from "@ubento/services.toolkit";
import prisma from "../prisma.js";

export async function listRequests({
  team_id,
  limit,
  cursor,
}: {
  team_id?: string;
  limit?: number;
  cursor?: string;
}) {
  const orderBy = [{ created_at: "desc" as const }, { id: "desc" as const }];

  return prismaListWithCursor(prisma.request, {
    limit,
    cursor,
    orderBy,
    where: {
      ...(team_id && { team_id }),
    },
    resolveCursor: (r) => ({ id: r.id }),
  });
}
