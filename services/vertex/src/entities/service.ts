import { generateBareId, makeEntityId } from "@ubento/services.primitives";
import { prismaListWithCursor } from "@ubento/services.toolkit";
import prisma from "../lib/prisma.js";
import { resolveImageUrl, uploadImage } from "../lib/storage.js";

// ---------------------------------------------------------------------------
// Serialization — replaces image_hash with image_url
// ---------------------------------------------------------------------------

type WithImageHash<T> = T & { image_hash?: string | null };

export function serializeService<T extends WithImageHash<object>>(
  service: T,
): Omit<T, "image_hash"> & { image_url: string | null } {
  const { image_hash, ...rest } = service as any;
  return {
    ...rest,
    image_url: image_hash ? resolveImageUrl(image_hash) : null,
  };
}

// ---------------------------------------------------------------------------
// List
// ---------------------------------------------------------------------------

export async function listServices({
  team_id,
  scope,
  handle,
  name,
  cursor,
  limit,
  tags,
}: {
  team_id?: string;
  scope?: string;
  handle?: string;
  name?: string;
  cursor?: string;
  limit?: number;
  tags?: string[];
} = {}) {
  const page = await prismaListWithCursor(prisma.service, {
    limit,
    cursor,
    orderBy: [{ id: "asc" }],
    where: {
      deleted_at: {
        isSet: false,
      },
      ...(team_id && { team_id }),
      ...(scope && { scope }),
      ...(handle && { handle: { contains: handle, mode: "insensitive" } }),
      ...(name && { name: { contains: name, mode: "insensitive" } }),
      ...(tags &&
        tags.length > 0 && {
          tags: { hasSome: tags },
        }),
    },
    resolveCursor: (p) => ({ id: p.id }),
  });
  return {
    ...page,
    data: page.data.map(serializeService),
  };
}

// ---------------------------------------------------------------------------
// Get
// ---------------------------------------------------------------------------

export async function getService(id: string) {
  const s = await prisma.service.findUnique({ where: { id } });
  if (s?.deleted_at) return null;
  return s ? serializeService(s) : null;
}

// ---------------------------------------------------------------------------
// Create
// ---------------------------------------------------------------------------

export async function createService({
  team_id,
  scope,
  handle,
  name,
  description,
  tags,
}: {
  team_id: string;
  scope: "public" | "private";
  handle: string;
  name: string;
  description?: string | null;
  tags?: string[];
}) {
  console.log({ scope, handle });
  const s = await prisma.service.create({
    data: {
      id: makeEntityId({
        code: "srv",
        bareId: generateBareId(),
      }),
      team_id,
      scope: scope === "public" ? "public" : team_id,
      handle: handle.toLowerCase(),
      name,
      description,
      ...(tags !== undefined && { tags }),
    },
  });
  return serializeService(s);
}

// ---------------------------------------------------------------------------
// Update
// ---------------------------------------------------------------------------

export async function updateService(
  id: string,
  data: {
    handle?: string;
    name?: string;
    description?: string | null;
    tags?: string[];
  },
) {
  const s = await prisma.service.update({
    where: { id },
    data: {
      ...data,
      ...(data.handle !== undefined && { handle: data.handle.toLowerCase() }),
    },
  });
  return serializeService(s);
}

// ---------------------------------------------------------------------------
// Upload image
// ---------------------------------------------------------------------------

export async function uploadServiceImage(
  id: string,
  buffer: Buffer,
  contentType: string,
) {
  const hash = await uploadImage(buffer, contentType);
  const s = await prisma.service.update({
    where: { id },
    data: { image_hash: hash },
  });
  return serializeService(s);
}

// ---------------------------------------------------------------------------
// Delete
// ---------------------------------------------------------------------------

export async function deleteService(id: string) {
  return prisma.service.update({
    where: { id },
    data: { deleted_at: new Date() },
  });
}
