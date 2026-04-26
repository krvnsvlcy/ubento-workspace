import {
  generateBareId,
  generateSlug,
  makeEntityId,
  slugify,
  ubentoEntities,
} from "@ubento/primitives";
import prisma from "../../lib/prisma.js";

export async function getWorkspace(id: string) {
  return await prisma.workspace.findUnique({
    where: { id },
  });
}

export async function getWorkspaceBySlug(slug: string) {
  return await prisma.workspace.findUnique({
    where: { slug },
  });
}

export async function createWorkspace(data: {
  name: string;
  description?: string;
  team_id: string;
  data: any;
  slug?: string;
}) {
  const id = makeEntityId({
    code: ubentoEntities.workspace.code,
    bareId: generateBareId(),
  });

  let slug = data.slug ? slugify(data.slug) : generateSlug(data.name);

  // Ensure slug uniqueness
  let attempts = 0;
  while (attempts < 10) {
    const existing = await prisma.workspace.findUnique({
      where: { slug },
    });
    if (!existing) break;
    slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
    attempts++;
  }

  return await prisma.workspace.create({
    data: {
      id,
      ...data,
      slug,
    },
  });
}

export async function updateWorkspace(
  id: string,
  data: Partial<{
    name: string;
    description: string;
    data: any;
    slug: string;
  }>,
) {
  if (data.slug) {
    data.slug = slugify(data.slug);
    if (data.slug!.length < 3) {
      throw new Error("Slug must be at least 3 characters");
    }
  }

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

export async function listWorkspaces(filter: { team_id?: string }) {
  return await prisma.workspace.findMany({
    where: {
      team_id: filter.team_id,
      deleted_at: {
        isSet: false,
      },
    },
  });
}
