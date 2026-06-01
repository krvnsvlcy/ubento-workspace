import { ModuleCollectionScope } from "@ubento/services.database/module";
import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/services.primitives";
import { prismaListWithCursor } from "@ubento/services.toolkit";
import prisma from "../lib/prisma.js";
import { resolveImageUrl } from "../lib/storage.js";

type WithCoverHash<T> = T & { cover_hash?: string | null };

export function serializeCollection<T extends WithCoverHash<object>>(
  collection: T,
): Omit<T, "cover_hash"> & { cover_url: string | null } {
  const { cover_hash, ...rest } = collection as any;
  return {
    ...rest,
    cover_url: cover_hash ? resolveImageUrl(cover_hash) : null,
  };
}

export async function getModuleCollection(id: string) {
  const collection = await prisma.moduleCollection.findUnique({
    where: { id },
  });
  if (collection?.deleted_at) return null;
  return collection ? serializeCollection(collection) : null;
}

export async function createModuleCollection(data: {
  team_id: string;
  name: string;
  summary?: string;
  scope?: ModuleCollectionScope;
  module_ids?: string[];
}) {
  const collectionId = makeEntityId({
    code: ubentoEntities.moduleCollection.code,
    bareId: generateBareId(),
  });

  const collection = await prisma.moduleCollection.create({
    data: {
      id: collectionId,
      team_id: data.team_id,
      name: data.name,
      summary: data.summary || null,
      scope: data.scope || ModuleCollectionScope.private,
      module_ids: data.module_ids || [],
    },
  });

  return serializeCollection(collection);
}

export async function updateModuleCollection(
  id: string,
  data: Partial<{
    name: string;
    summary: string | null;
    scope: ModuleCollectionScope;
    module_ids: string[];
  }>,
) {
  const collection = await prisma.moduleCollection.update({
    where: { id },
    data,
  });

  return serializeCollection(collection);
}

export async function updateModuleCollectionCover(id: string, coverHash: string) {
  const collection = await prisma.moduleCollection.update({
    where: { id },
    data: { cover_hash: coverHash },
  });
  return serializeCollection(collection);
}

export async function deleteModuleCollection(id: string) {
  return await prisma.moduleCollection.update({
    where: { id },
    data: {
      deleted_at: new Date(),
    },
  });
}

export async function listModuleCollections(filters: {
  team_id?: string;
  scope?: ModuleCollectionScope;
  limit?: number;
  cursor?: string;
}) {
  const page = await prismaListWithCursor(prisma.moduleCollection, {
    limit: filters.limit,
    cursor: filters.cursor,
    where: {
      deleted_at: {
        isSet: false,
      },
      ...(filters.team_id && { team_id: filters.team_id }),
      ...(filters.scope && { scope: filters.scope }),
    },
    orderBy: { created_at: "desc" },
    resolveCursor: (i) => ({ id: i.id }),
  });

  return {
    ...page,
    data: page.data.map(serializeCollection),
  };
}
