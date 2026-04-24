import {
  generateBareId,
  generateSlug,
  makeEntityId,
  slugify,
  ubentoEntities,
} from "@ubento/primitives";
import prisma from "../../lib/prisma.js";

export async function getApp(id: string) {
  return await prisma.app.findUnique({
    where: { id },
  });
}

export async function getAppBySlug(slug: string) {
  return await prisma.app.findUnique({
    where: { slug },
  });
}

export async function createApp(data: {
  name: string;
  description?: string;
  team_id: string;
  metadata?: any;
  slug?: string;
}) {
  const id = makeEntityId({
    code: ubentoEntities.app.code,
    bareId: generateBareId(),
  });

  let slug = data.slug ? slugify(data.slug) : generateSlug(data.name);

  // Ensure slug uniqueness
  let attempts = 0;
  while (attempts < 10) {
    const existing = await prisma.app.findUnique({
      where: { slug },
    });
    if (!existing) break;
    slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
    attempts++;
  }

  return await prisma.app.create({
    data: {
      id,
      ...data,
      slug,
    },
  });
}

export async function updateApp(
  id: string,
  data: Partial<{
    name: string;
    description: string;
    metadata: any;
    slug: string;
  }>,
) {
  if (data.slug) {
    data.slug = slugify(data.slug);
    if (data.slug!.length < 3) {
      throw new Error("Slug must be at least 3 characters");
    }
  }

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
      deleted_at: {
        isSet: false,
      },
    },
  });
}
