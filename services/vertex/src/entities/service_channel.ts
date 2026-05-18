import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/services.primitives";
import { NotFoundError, prismaListWithCursor } from "@ubento/services.toolkit";
import {
  ServiceSpecV1 as ServiceSpec,
  ServiceSpecV1,
} from "@ubento/vertex.core";
import prisma from "../lib/prisma.js";
import { serviceBucket, storagePaths } from "../lib/storage.js";

export async function listServiceChannels({
  service_id,
  cursor,
  limit,
}: {
  service_id: string;
  cursor?: string;
  limit?: number;
}) {
  return prismaListWithCursor(prisma.serviceChannel, {
    limit,
    cursor,
    orderBy: [{ id: "asc" }],
    where: {
      service_id,
      deleted_at: {
        isSet: false,
      },
    },
    resolveCursor: (p) => ({ id: p.id }),
  });
}

export async function getServiceChannel(id: string) {
  const channel = await prisma.serviceChannel.findUnique({ where: { id } });
  if (channel?.deleted_at) return null;
  return channel;
}

export async function createServiceChannel({
  team_id,
  service_id,
  name,
}: {
  team_id: string;
  service_id: string;
  name: string;
}) {
  return prisma.serviceChannel.create({
    data: {
      id: makeEntityId({
        code: ubentoEntities.serviceChannel.code,
        bareId: generateBareId(),
      }),
      team_id,
      service_id,
      name,
    },
  });
}

export async function updateServiceChannel(
  id: string,
  data: {
    name?: string;
  },
) {
  return prisma.serviceChannel.update({ where: { id }, data });
}

export async function deleteServiceChannel(id: string) {
  return prisma.serviceChannel.update({
    where: { id },
    data: { deleted_at: new Date() },
  });
}

export async function getServiceChannelSpec(
  id: string,
): RunHttpHandlerErrorCode<ServiceSpec> {
  const channel = await prisma.serviceChannel.findUnique({
    where: { id, deleted_at: { isSet: false } },
  });
  if (!channel || channel.deleted_at) {
    throw new NotFoundError(`service_channel ${id}`);
  }

  const filePath = storagePaths.serviceSpecFile({
    serviceId: channel.service_id,
    channelId: channel.id,
  });

  try {
    const [content] = await serviceBucket.file(filePath).download();
    return JSON.parse(content.toString("utf-8")) as ServiceSpec;
  } catch (error: any) {
    if (error.code === 404) {
      throw new NotFoundError(`spec for service_channel ${id}`);
    }
    throw error;
  }
}

export async function uploadServiceChannelSpec(id: string, spec: ServiceSpec) {
  const channel = await prisma.serviceChannel.findUnique({
    where: { id },
  });
  if (!channel || channel.deleted_at) {
    throw new NotFoundError(`service_channel ${id}`);
  }

  const filePath = storagePaths.serviceSpecFile({
    serviceId: channel.service_id,
    channelId: channel.id,
  });

  console.log({ conn: spec.connection, filePath });

  const file = serviceBucket.file(filePath);
  await file.save(JSON.stringify(spec, null, 2), {
    contentType: "application/json",
  });
}

export async function getServiceSpec(
  channel_id: string,
): RunHttpHandlerErrorCode<ServiceSpecV1> {
  const channel = await prisma.serviceChannel.findUnique({
    where: { id: channel_id },
  });
  if (!channel) throw new Error(`channel ${channel_id} not found`);

  const filePath = storagePaths.serviceSpecFile({
    serviceId: channel.service_id,
    channelId: channel.id,
  });

  const [content] = await serviceBucket.file(filePath).download();
  return JSON.parse(content.toString("utf-8")) as ServiceSpecV1;
}
