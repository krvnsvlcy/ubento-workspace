import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/services.primitives";
import { prismaListWithCursor } from "@ubento/services.toolkit";
import prisma from "../lib/prisma.js";

/**
 * Computes the unique composite key from scopes and setting name.
 * e.g., "{sorted(scope_o,...,scope_n).join('|')}|theme"
 */
export function computeUniqueKey(scopes: string[], key: string): string {
  const sortedScopes = [...scopes].sort();
  return `${sortedScopes.join("|")}|${key}`;
}

export async function getSetting(id: string) {
  return await prisma.setting.findUnique({
    where: { id },
  });
}

export async function getSettingByKey(compositeKey: string) {
  return await prisma.setting.findUnique({
    where: { key: compositeKey },
  });
}

export async function upsertSetting(key: string, scopes: string[], data: any) {
  const compositeKey = computeUniqueKey(scopes, key);

  const existing = await prisma.setting.findUnique({
    where: { key: compositeKey },
  });

  if (existing) {
    return await prisma.setting.update({
      where: { id: existing.id },
      data: {
        scopes,
        data,
      },
    });
  }

  const id = makeEntityId({
    code: ubentoEntities.setting.code,
    bareId: generateBareId(),
  });

  return await prisma.setting.create({
    data: {
      id,
      key: compositeKey,
      scopes,
      data,
    },
  });
}

export async function updateSetting(
  id: string,
  data: {
    scopes?: string[];
    data?: any;
  },
) {
  // If updating scopes, we might need to recalculate the composite key.
  // However, updating key usually happens during a full upsert, but we'll support PATCH by id.
  const existing = await prisma.setting.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("Setting not found");
  }

  const newScopes = data.scopes ?? existing.scopes;
  // Extract original key from composite key (split by last '|' index or keep tracker)
  const parts = existing.key.split("|");
  const originalKey = parts[parts.length - 1];
  const newCompositeKey = computeUniqueKey(newScopes, originalKey);

  return await prisma.setting.update({
    where: { id },
    data: {
      key: newCompositeKey,
      scopes: newScopes,
      data: data.data !== undefined ? data.data : existing.data,
    },
  });
}

export async function deleteSetting(id: string) {
  return await prisma.setting.delete({
    where: { id },
  });
}

export async function listSettings(filters: {
  scopes?: string[];
  limit?: number;
  cursor?: string;
}) {
  const where: any = {};
  if (filters.scopes && filters.scopes.length > 0) {
    where.scopes = {
      hasSome: filters.scopes,
    };
  }

  return await prismaListWithCursor(prisma.setting, {
    limit: filters.limit,
    cursor: filters.cursor,
    where,
    orderBy: { created_at: "desc" },
    resolveCursor: (i) => ({ id: i.id }),
  });
}
