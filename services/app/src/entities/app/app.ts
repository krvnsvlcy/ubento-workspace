import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/primitives";
import prisma from "../../lib/prisma.js";

export async function getApp(id: string) {
  return await prisma.app.findUnique({
    where: { id },
  });
}

export async function createApp(data: {
  name: string;
  description?: string;
  team_id: string;
  metadata?: any;
}) {
  const id = makeEntityId({
    code: ubentoEntities.app.code,
    bareId: generateBareId(),
  });

  return await prisma.app.create({
    data: {
      id,
      ...data,
    },
  });
}

export async function updateApp(
  id: string,
  data: Partial<{
    name: string;
    description: string;
    metadata: any;
  }>,
) {
  return await prisma.app.update({
    where: { id },
    data,
  });
}

export async function deleteApp(id: string) {
  return await prisma.app.update({
    where: { id },
    data: {
      deleted_at: new Date(),
    },
  });
}

export async function listApps(filter: { team_id?: string }) {
  return await prisma.app.findMany({
    where: {
      team_id: filter.team_id,
      deleted_at: null,
    },
  });
}
