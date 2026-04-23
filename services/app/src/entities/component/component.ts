import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/primitives";
import prisma from "../../lib/prisma.js";

export async function getComponent(id: string) {
  return await prisma.component.findUnique({
    where: { id },
  });
}

export async function createComponent(data: {
  app_id: string;
  name: string;
  type: string;
  props?: any;
  metadata?: any;
}) {
  const id = makeEntityId({
    code: ubentoEntities.component.code,
    bareId: generateBareId(),
  });

  return await prisma.component.create({
    data: {
      id,
      ...data,
    },
  });
}

export async function updateComponent(
  id: string,
  data: Partial<{
    name: string;
    type: string;
    props: any;
    metadata: any;
  }>,
) {
  return await prisma.component.update({
    where: { id },
    data,
  });
}

export async function deleteComponent(id: string) {
  return await prisma.component.update({
    where: { id },
    data: {
      deleted_at: new Date(),
    },
  });
}

export async function listComponents(app_id: string) {
  return await prisma.component.findMany({
    where: {
      app_id,
      deleted_at: null,
    },
  });
}
