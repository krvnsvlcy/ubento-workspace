import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/primitives";
import prisma from "../lib/prisma.js";

export async function getBoard(id: string) {
  return await prisma.board.findUnique({
    where: { id },
  });
}

export async function createBoard(data: {
  workspace_id: string;
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

export async function listBoards(workspace_id: string) {
  return await prisma.board.findMany({
    where: {
      workspace_id,
    },
  });
}
