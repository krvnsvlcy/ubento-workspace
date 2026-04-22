import { ClientStatus, Prisma } from "@prisma/client";
import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/primitives";
import { prismaListWithCursor } from "@ubento/service-toolkit";
import prisma from "../../../lib/prisma.js";

export async function listClients(filters?: {
  status?: ClientStatus;
  name?: string;
  created_after?: Date;
  created_before?: Date;
  limit?: number;
  cursor?: string;
}) {
  return prismaListWithCursor(prisma.client, {
    limit: filters?.limit,
    cursor: filters?.cursor,
    orderBy: [{ created_at: "desc" }, { id: "desc" }],
    where: {
      ...(filters?.name && { name: { contains: filters.name } }),
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
export async function createClient({
  name,
  description,
}: {
  name: string;
  description?: string;
}) {
  const id = makeEntityId({
    code: ubentoEntities.client.code,
    bareId: generateBareId(),
  });
  return await prisma.client.create({
    data: {
      id,
      name,
      description,
      status: ClientStatus.ACTIVE,
    },
  });
}
export async function getClient(id: string) {
  return await prisma.client.findUnique({
    where: { id },
  });
}
export async function updateClient(
  id: string,
  data: {
    name?: string;
    description?: string;
    allowed_audiences?: string[];
    allowed_scopes?: string[];
    status?: ClientStatus;
    metadata?: any;
    redirect_uris?: string[];
  },
) {
  return await prisma.client.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      allowed_audiences: data.allowed_audiences,
      allowed_scopes: data.allowed_scopes,
      status: data.status,
      metadata: data.metadata,
      redirect_uris: data.redirect_uris,
    },
  });
}
export async function deleteClient(id: string) {
  try {
    await prisma.client.delete({
      where: { id },
    });
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2025"
    ) {
      return;
    }
    throw e;
  }
}
