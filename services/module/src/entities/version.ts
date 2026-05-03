import { ModuleVersionScope } from "@ubento/database/module";
import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/primitives";
import { prismaListWithCursor } from "@ubento/service-toolkit";
import { buildModule } from "../lib/builder/builder.js";
import prisma from "../lib/prisma.js";
import { persistModuleArtifact, readFromCAS } from "../lib/storage.js";

export async function createModuleVersion({
  moduleId,
  source,
  type,
  authorId,
  scope,
}: {
  moduleId: string;
  source: string;
  type: string;
  authorId: string;
  scope: ModuleVersionScope;
}) {
  const versionId = makeEntityId({
    code: ubentoEntities.moduleVersion.code,
    bareId: generateBareId(),
  });

  const artifact = await buildModule({ source, type });
  await persistModuleArtifact(artifact);

  const version = await prisma.moduleVersion.create({
    data: {
      id: versionId,
      module_id: moduleId,
      files: artifact.files,
      author_id: authorId,
      scope: scope,
    },
  });

  return version;
}

export async function listModuleVersions(filters: {
  module_id: string;
  author_id?: string;
  scope?: ModuleVersionScope;
  limit?: number;
  cursor?: string;
}) {
  return await prismaListWithCursor(prisma.moduleVersion, {
    limit: filters.limit,
    cursor: filters.cursor,
    where: {
      module_id: filters.module_id,
      author_id: filters.author_id,
      scope: filters.scope,
    },
    orderBy: { created_at: "desc" },
    resolveCursor: (v) => ({ id: v.id }),
  });
}

export async function getModuleVersion(id: string) {
  return await prisma.moduleVersion.findUnique({
    where: { id },
  });
}

export async function readModuleVersionFile({
  versionId,
  filename,
}: {
  versionId: string;
  filename: string;
}) {
  const version = await getModuleVersion(versionId);
  if (!version) return null;

  const files = version.files as Record<string, string>;
  const hash = files[filename];
  if (!hash) return null;

  return await readFromCAS({ hash });
}
