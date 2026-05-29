import { Prisma } from "@ubento/services.database/vertex";
import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/services.primitives";
import { prismaListWithCursor } from "@ubento/services.toolkit";
import prisma from "../lib/prisma.js";
import { resolveImageUrl, uploadImage } from "../lib/storage.js";

// ---------------------------------------------------------------------------
// Serialization — replaces image_hash with image_url in any response shape
// ---------------------------------------------------------------------------

type WithImageHash<T> = T & { image_hash?: string | null };

export function serializeConnectionProvider<T extends WithImageHash<object>>(
  provider: T,
): Omit<T, "image_hash"> & { image_url: string | null } {
  const { image_hash, ...rest } = provider as any;
  return {
    ...rest,
    image_url: image_hash ? resolveImageUrl(image_hash) : null,
  };
}

// ---------------------------------------------------------------------------
// List
// ---------------------------------------------------------------------------

export async function listConnectionProviders({
  team_id,
  name,
  cursor,
  limit,
  handle,
  tags,
}: {
  team_id?: string | null;
  name?: string;
  cursor?: string;
  limit?: number;
  handle?: string;
  tags?: string[];
} = {}) {
  const page = await prismaListWithCursor(prisma.connectionProvider, {
    limit,
    cursor,
    orderBy: [{ id: "asc" }],
    where: {
      ...(name && {
        name: { contains: name, mode: "insensitive" },
      }),
      ...(handle && {
        handle,
      }),
      team_id: !team_id ? { isSet: false } : team_id,
      ...(tags &&
        tags.length > 0 && {
          tags: { hasSome: tags },
        }),
    },
    resolveCursor: (p) => ({ id: p.id }),
  });
  return {
    ...page,
    data: page.data.map(serializeConnectionProvider),
  };
}

export async function getConnectionProvider(id: string) {
  const p = await prisma.connectionProvider.findUnique({ where: { id } });
  return p ? serializeConnectionProvider(p) : null;
}

export async function getConnectionProviderByHandle(handle: string) {
  const p = await prisma.connectionProvider.findUnique({ where: { handle } });
  return p ? serializeConnectionProvider(p) : null;
}

// ---------------------------------------------------------------------------
// Create
// ---------------------------------------------------------------------------

export async function createConnectionProvider({
  handle,
  type,
  name,
  description,
  config,
  tags,
  team_id,
}: {
  handle: string;
  type: string;
  name: string;
  description?: string | null;
  config?: Prisma.InputJsonValue | null;
  tags?: string[];
  team_id?: string | null;
}) {
  const p = await prisma.connectionProvider.create({
    data: {
      id: makeEntityId({
        code: ubentoEntities.connectionProvider.code,
        bareId: generateBareId(),
      }),
      handle,
      type,
      name,
      description,
      config,
      team_id,
      ...(tags !== undefined && { tags }),
    },
  });
  return serializeConnectionProvider(p);
}

// ---------------------------------------------------------------------------
// Update
// ---------------------------------------------------------------------------

export async function updateConnectionProvider(
  id: string,
  data: {
    handle?: string;
    type?: string;
    name?: string;
    description?: string | null;
    config?: Prisma.InputJsonValue | null;
    tags?: string[];
    team_id?: string | null;
  },
) {
  const p = await prisma.connectionProvider.update({ where: { id }, data });
  return serializeConnectionProvider(p);
}

// ---------------------------------------------------------------------------
// Upload image
// ---------------------------------------------------------------------------

export async function uploadConnectionProviderImage(
  id: string,
  buffer: Buffer,
  contentType: string,
) {
  const hash = await uploadImage(buffer, contentType);
  const p = await prisma.connectionProvider.update({
    where: { id },
    data: { image_hash: hash },
  });
  return serializeConnectionProvider(p);
}

// ---------------------------------------------------------------------------
// Delete
// ---------------------------------------------------------------------------

export async function deleteConnectionProvider(id: string) {
  return prisma.connectionProvider.delete({ where: { id } });
}
