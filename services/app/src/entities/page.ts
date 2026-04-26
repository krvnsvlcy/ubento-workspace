import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/primitives";
import prisma from "../lib/prisma.js";

export async function getPage(id: string) {
  return await prisma.page.findUnique({
    where: { id },
  });
}

export async function createPage(data: {
  app_id: string;
  name: string;
  data: any;
}) {
  const id = makeEntityId({
    code: ubentoEntities.page.code,
    bareId: generateBareId(),
  });

  return await prisma.page.create({
    data: {
      id,
      ...data,
    },
  });
}

export async function updatePage(
  id: string,
  data: Partial<{
    name: string;
    data: any;
  }>,
) {
  return await prisma.page.update({
    where: { id },
    data,
  });
}

export async function deletePage(id: string) {
  return await prisma.page.update({
    where: { id },
    data: {
      deleted_at: new Date(),
    },
  });
}

export async function listPages(app_id: string) {
  return await prisma.page.findMany({
    where: {
      app_id,
    },
  });
}
