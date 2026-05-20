import { generateBareId, makeEntityId } from "@ubento/services.primitives";
import { prismaListWithCursor } from "@ubento/services.toolkit";
import prisma from "../lib/prisma.js";

export async function listServices({
  team_id,
  scope,
  name,
  cursor,
  limit,
}: {
  team_id?: string;
  scope?: string;
  name?: string;
  cursor?: string;
  limit?: number;
} = {}) {
  return prismaListWithCursor(prisma.service, {
    limit,
    cursor,
    orderBy: [{ id: "asc" }],
    where: {
      deleted_at: {
        isSet: false,
      },
      ...(team_id && { team_id }),
      ...(scope && { scope }),
      ...(name && {
        OR: [
          { name: { contains: name, mode: "insensitive" } },
          { display_name: { contains: name, mode: "insensitive" } },
        ],
      }),
    },
    resolveCursor: (p) => ({ id: p.id }),
  });
}

export async function getService(id: string) {
  const service = await prisma.service.findUnique({ where: { id } });
  if (service?.deleted_at) return null;
  return service;
}

export async function createService({
  team_id,
  scope = "__public__",
  name,
  display_name,
  description,
}: {
  team_id: string;
  scope?: string;
  name: string;
  display_name: string;
  description?: string | null;
}) {
  console.log({
    scope,
    name,
  });
  return prisma.service.create({
    data: {
      id: makeEntityId({
        code: "srv",
        bareId: generateBareId(),
      }),
      team_id,
      scope: scope === "team" ? team_id : "__public__",
      name: name.toLowerCase(),
      display_name,
      description,
    },
  });
}

export async function updateService(
  id: string,
  data: {
    name?: string;
    display_name?: string;
    description?: string | null;
  },
) {
  return prisma.service.update({
    where: { id },
    data: {
      ...data,
      ...(data.name !== undefined && { name: data.name.toLowerCase() }),
    },
  });
}

export async function deleteService(id: string) {
  return prisma.service.update({
    where: { id },
    data: { deleted_at: new Date() },
  });
}
