import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/services.primitives";
import { prismaListWithCursor } from "@ubento/services.toolkit";
import prisma from "../lib/prisma.js";

export async function getBoard(id: string) {
  return await prisma.board.findUnique({
    where: { id, deleted_at: { isSet: false } },
  });
}

export async function createBoard(data: {
  workspace_id: string;
  parent_id?: string;
  name: string;
  data: any;
  index: string;
}) {
  const id = makeEntityId({
    code: ubentoEntities.board.code,
    bareId: generateBareId(),
  });

  return await prisma.board.create({
    data: {
      ...data,
      id,
    },
  });
}

export async function updateBoard(
  id: string,
  data: Partial<{
    name: string;
    parent_id: string | null;
    data: any;
    index: string;
  }>,
) {
  return await prisma.board.update({
    where: { id, deleted_at: { isSet: false } },
    data,
  });
}

export async function deleteBoard(id: string) {
  return await prisma.board.update({
    where: { id, deleted_at: { isSet: false } },
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
    orderBy: { index: "asc" },
    resolveCursor: (i) => ({ id: i.id }),
  });
}
