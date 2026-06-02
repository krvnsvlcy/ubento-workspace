import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/services.primitives";
import { prismaListWithCursor } from "@ubento/services.toolkit";
import prisma from "../../lib/prisma.js";

export async function getWorkspace(id: string) {
  return await prisma.workspace.findUnique({
    where: { id },
  });
}

export async function createWorkspace(data: {
  title: string;
  team_id: string;
  metadata: any;
  data: any;
}) {
  const id = makeEntityId({
    code: ubentoEntities.workspace.code,
    bareId: generateBareId(),
  });

  return await prisma.workspace.create({
    data: {
      id,
      ...data,
    },
  });
}

export async function updateWorkspace(
  id: string,
  data: Partial<{
    title: string;
    metadata: any;
    data: any;
  }>,
) {
  return await prisma.workspace.update({
    where: { id },
    data,
  });
}

export async function deleteWorkspace(id: string) {
  return await prisma.workspace.update({
    where: { id },
    data: {
      deleted_at: new Date(),
    },
  });
}

export async function listWorkspaces(filters: {
  team_id?: string;
  limit?: number;
  cursor?: string;
}) {
  return await prismaListWithCursor(prisma.workspace, {
    limit: filters.limit,
    cursor: filters.cursor,
    where: {
      team_id: filters.team_id,
      deleted_at: {
        isSet: false,
      },
    },
    orderBy: { created_at: "desc" },
    resolveCursor: (i) => ({ id: i.id }),
  });
}
