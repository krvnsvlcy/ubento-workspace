import { Prisma } from "@ubento/services.database/vertex";
import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/services.primitives";
import { prismaListWithCursor } from "@ubento/services.toolkit";
import prisma from "../lib/prisma.js";

export async function listConnectionProviders({
  name,
  cursor,
  limit,
  provider,
}: {
  name?: string;
  cursor?: string;
  limit?: number;
  provider?: string;
} = {}) {
  return prismaListWithCursor(prisma.connectionProvider, {
    limit,
    cursor,
    orderBy: [{ id: "asc" }],
    where: {
      ...(name && {
        name: { contains: name, mode: "insensitive" },
      }),
      ...(provider && {
        provider: {
          code: provider,
        },
      }),
    },
    resolveCursor: (p) => ({ id: p.id }),
  });
}
export async function getConnectionProvider(id: string) {
  return prisma.connectionProvider.findUnique({ where: { id } });
}

export async function createConnectionProvider({
  code,
  type,
  name,
  description,
  config,
}: {
  code: string;
  type: string;
  name: string;
  description?: string | null;
  config?: Prisma.InputJsonValue | null;
}) {
  return prisma.connectionProvider.create({
    data: {
      id: makeEntityId({
        code: ubentoEntities.connectionProvider.code,
        bareId: generateBareId(),
      }),
      code,
      type,
      name,
      description,
      config,
    },
  });
}

export async function updateConnectionProvider(
  id: string,
  data: {
    name?: string;
    description?: string | null;
    config?: Prisma.InputJsonValue | null;
  },
) {
  console.log(data);
  return prisma.connectionProvider.update({ where: { id }, data });
}

export async function deleteConnectionProvider(id: string) {
  return prisma.connectionProvider.delete({ where: { id } });
}
