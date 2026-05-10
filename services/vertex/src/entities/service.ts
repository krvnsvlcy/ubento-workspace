import { Prisma } from "@ubento/services.database/vertex";
import { generateBareId, makeEntityId } from "@ubento/services.primitives";
import { NotFoundError, prismaListWithCursor } from "@ubento/services.toolkit";
import { ServiceSpecV1 } from "@ubento/vertex.core";
import prisma from "../lib/prisma.js";
import { serviceBucket, storagePaths } from "../lib/storage.js";

export async function getServiceSpec(
  serviceName: string,
  channelName?: string,
): Promise<ServiceSpecV1> {
  const service = await prisma.service.findUnique({
    where: { scope_name: { scope: "__public__", name: serviceName } },
  });
  if (!service) throw new NotFoundError(`service ${serviceName}`);

  let channel;
  if (channelName) {
    channel = await prisma.serviceChannel.findUnique({
      where: {
        service_id_name: { service_id: service.id, name: channelName },
      },
    });
  } else {
    channel = await prisma.serviceChannel.findFirst({
      where: { service_id: service.id },
      orderBy: { created_at: "desc" },
    });
  }
  if (!channel)
    throw new NotFoundError(
      `channel ${channelName || "latest"} for service ${serviceName}`,
    );

  const filePath = storagePaths.serviceSpecFile({
    scope: service.scope,
    service: serviceName,
    channel: channel.name,
  });

  const [content] = await serviceBucket.file(filePath).download();
  return JSON.parse(content.toString("utf-8")) as ServiceSpecV1;
}

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
      deleted_at: null,
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
  config,
}: {
  team_id: string;
  scope?: string;
  name: string;
  display_name: string;
  description?: string | null;
  config?: unknown;
}) {
  return prisma.service.create({
    data: {
      id: makeEntityId({
        code: "srv",
        bareId: generateBareId(),
      }),
      team_id,
      scope,
      name,
      display_name,
      description,
      config: config as Prisma.InputJsonValue | undefined,
    },
  });
}

export async function updateService(
  id: string,
  data: {
    name?: string;
    display_name?: string;
    description?: string | null;
    config?: unknown;
  },
) {
  return prisma.service.update({
    where: { id },
    data: {
      ...data,
      config:
        data.config !== undefined
          ? (data.config as Prisma.InputJsonValue)
          : undefined,
    },
  });
}

export async function deleteService(id: string) {
  return prisma.service.update({
    where: { id },
    data: { deleted_at: new Date() },
  });
}
