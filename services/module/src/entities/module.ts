import {
  generateBareId,
  generateSlug,
  makeEntityId,
  slugify,
  ubentoEntities,
} from "@ubento/primitives";
import { customAlphabet } from "nanoid";
import { persistModule } from "../lib/gcs.js";
import prisma from "../lib/prisma.js";
import { transpileTsx } from "../lib/transpiler.js";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  6,
);

export async function getModule(id: string) {
  return await prisma.module.findUnique({
    where: { id },
  });
}

export async function getModuleBySlug(slug: string) {
  return await prisma.module.findUnique({
    where: { slug },
  });
}

export async function createModule(data: {
  name: string;
  slug?: string;
  team_id: string;
  source: string;
}) {
  const moduleId = makeEntityId({
    code: ubentoEntities.module.code,
    bareId: generateBareId(),
  });
  let slug = data.slug ? slugify(data.slug) : generateSlug(data.name);

  const version = await createNewModuleVersion({
    moduleId,
    source: data.source,
  });

  // Ensure slug uniqueness
  let attempts = 0;
  while (attempts < 10) {
    const existing = await prisma.module.findUnique({
      where: { slug },
    });
    if (!existing) break;
    slug = `${slug}-${nanoid(6)}`;
    attempts++;
  }

  // 3. Create module with latest_version_id
  const module = await prisma.module.create({
    data: {
      id: moduleId,
      name: data.name,
      slug,
      team_id: data.team_id,
      latest_version_id: version.id,
    },
  });

  return module;
}

export async function updateModule(
  id: string,
  data: Partial<{
    name: string;
    slug: string;
  }>,
) {
  if (data.slug) {
    data.slug = slugify(data.slug);
  }

  const module = await prisma.module.update({
    where: { id },
    data,
  });

  return module;
}

export async function createNewModuleVersion({
  moduleId,
  source,
}: {
  moduleId: string;
  source: string;
}) {
  const code = await transpileTsx(source);
  const versionId = makeEntityId({
    code: ubentoEntities.moduleVersion.code,
    bareId: generateBareId(),
  });

  await persistModule({
    moduleId,
    versionId,
    tsx: source,
    js: code,
  });

  const version = await prisma.moduleVersion.create({
    data: {
      id: versionId,
      module_id: moduleId,
    },
  });

  const module = await prisma.module.findUnique({ where: { id: moduleId } });
  if (module) {
    await prisma.module.update({
      where: { id: moduleId },
      data: { latest_version_id: version.id },
    });
  }

  return version;
}

export async function deleteModule(id: string) {
  return await prisma.module.update({
    where: { id },
    data: {
      deleted_at: new Date(),
    },
  });
}

export async function listModules(filter: { team_id?: string }) {
  return await prisma.module.findMany({
    where: {
      team_id: filter.team_id,
      deleted_at: {
        isSet: false,
      },
    },
  });
}

export async function getModuleVersions(moduleId: string) {
  return await prisma.moduleVersion.findMany({
    where: { module_id: moduleId },
    orderBy: { created_at: "desc" },
  });
}

export async function getModuleVersion(id: string) {
  return await prisma.moduleVersion.findUnique({
    where: { id },
  });
}
