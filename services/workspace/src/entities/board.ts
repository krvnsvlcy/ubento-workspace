import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/primitives";
import { prismaListWithCursor } from "@ubento/service-toolkit";
import prisma from "../lib/prisma.js";

export async function getBoard(id: string) {
  return await prisma.board.findUnique({
    where: { id },
  });
}

export async function createBoard(data: {
  workspace_id: string;
  parent_id?: string;
  name: string;
  data: any;
}) {
  const id = makeEntityId({
    code: ubentoEntities.board.code,
    bareId: generateBareId(),
  });

  return await prisma.board.create({
    data: {
      id,
      ...data,
    },
  });
}

export async function updateBoard(
  id: string,
  data: Partial<{
    name: string;
    parent_id: string | null;
    data: any;
  }>,
) {
  return await prisma.board.update({
    where: { id },
    data,
  });
}

export async function deleteBoard(id: string) {
  return await prisma.board.update({
    where: { id },
    data: {
      deleted_at: new Date(),
    },
  });
}

export async function listBoards(filters: {
  workspace_id: string;
  parent_id?: string | null;
  limit?: number;
  cursor?: string;
}) {
  return await prismaListWithCursor(prisma.board, {
    where: {
      workspace_id: filters.workspace_id,
      parent_id: filters.parent_id,
      deleted_at: {
        isSet: false,
      },
    },
    limit: filters.limit,
    cursor: filters.cursor,
    orderBy: { created_at: "desc" },
    resolveCursor: (i) => ({ id: i.id }),
  });
}
