import {
  generateBareId,
  generateSlug,
  makeEntityId,
  slugify,
  ubentoEntities,
} from "@ubento/primitives";
import { prismaListWithCursor } from "@ubento/service-toolkit";
import crypto from "crypto";
import { customAlphabet } from "nanoid";
import { publishFilesToUserContent, readFromCAS, storeInCAS } from "../lib/gcs.js";
import prisma from "../lib/prisma.js";
import { transpileTsx } from "../lib/transpiler.js";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  6,
);

export enum ModuleScope {
  TEAM = "team",
  PUBLIC = "public",
}

function hashContent(content: string | Buffer): string {
  return crypto.createHash("sha256").update(content).digest("hex");
}

function getContentType(filename: string): string {
  if (filename.endsWith('.js')) return 'application/javascript';
  if (filename.endsWith('.map')) return 'application/json';
  if (filename.endsWith('.d.ts')) return 'application/typescript';
  if (filename.endsWith('.ts')) return 'application/typescript';
  if (filename.endsWith('.tsx')) return 'application/typescript';
  if (filename.endsWith('.json')) return 'application/json';
  if (filename.endsWith('.css')) return 'text/css';
  return 'text/plain';
}

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
  author_id: string;
  scope: ModuleScope;
}) {
  const moduleId = makeEntityId({
    code: ubentoEntities.module.code,
    bareId: generateBareId(),
  });
  let slug = data.slug ? slugify(data.slug) : generateSlug(data.name);

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

  // Create module with empty files initially
  const module = await prisma.module.create({
    data: {
      id: moduleId,
      name: data.name,
      slug,
      team_id: data.team_id,
      scope: data.scope,
      files: {},
    },
  });

  // Store initial source file
  await updateModuleFile({
    moduleId,
    filename: "index.tsx",
    content: data.source,
    authorId: data.author_id,
    autoTranspile: true,
  });

  return await getModule(moduleId);
}

export async function updateModuleFile({
  moduleId,
  filename,
  content,
  authorId,
  autoTranspile = false,
}: {
  moduleId: string;
  filename: string;
  content: string;
  authorId: string;
  autoTranspile?: boolean;
}) {
  const hash = hashContent(content);

  await storeInCAS({
    moduleId,
    hash,
    content,
    contentType: getContentType(filename),
  });

  const revisionId = makeEntityId({
    code: "module_file_revision",
    bareId: generateBareId(),
  });

  await prisma.moduleFileRevision.create({
    data: {
      id: revisionId,
      module_id: moduleId,
      filename,
      hash,
      author_id: authorId,
    },
  });

  const fileUpdates: Record<string, string> = { [filename]: hash };

  if (autoTranspile && filename.endsWith(".tsx")) {
    const { js, map, dts } = await transpileTsx(content, filename);

    const jsFilename = filename.replace(/\.tsx$/, ".js");
    const mapFilename = filename.replace(/\.tsx$/, ".js.map");
    const dtsFilename = filename.replace(/\.tsx$/, ".d.ts");

    const jsHash = hashContent(js);
    await storeInCAS({ moduleId, hash: jsHash, content: js, contentType: "application/javascript" });
    fileUpdates[jsFilename] = jsHash;
    await prisma.moduleFileRevision.create({
      data: {
        id: makeEntityId({ code: "module_file_revision", bareId: generateBareId() }),
        module_id: moduleId,
        filename: jsFilename,
        hash: jsHash,
        author_id: authorId,
      },
    });

    const mapHash = hashContent(map);
    await storeInCAS({ moduleId, hash: mapHash, content: map, contentType: "application/json" });
    fileUpdates[mapFilename] = mapHash;
    await prisma.moduleFileRevision.create({
      data: {
        id: makeEntityId({ code: "module_file_revision", bareId: generateBareId() }),
        module_id: moduleId,
        filename: mapFilename,
        hash: mapHash,
        author_id: authorId,
      },
    });

    if (dts) {
      const dtsHash = hashContent(dts);
      await storeInCAS({ moduleId, hash: dtsHash, content: dts, contentType: "application/typescript" });
      fileUpdates[dtsFilename] = dtsHash;
      await prisma.moduleFileRevision.create({
        data: {
          id: makeEntityId({ code: "module_file_revision", bareId: generateBareId() }),
          module_id: moduleId,
          filename: dtsFilename,
          hash: dtsHash,
          author_id: authorId,
        },
      });
    }
  }

  const module = await getModule(moduleId);
  if (module) {
    const currentFiles = (module.files as Record<string, string>) || {};
    await prisma.module.update({
      where: { id: moduleId },
      data: {
        files: {
          ...currentFiles,
          ...fileUpdates,
        },
      },
    });
  }

  return fileUpdates;
}

export async function publishModuleVersion(moduleId: string) {
  const module = await getModule(moduleId);
  if (!module) throw new Error("Module not found");

  const versionId = makeEntityId({
    code: ubentoEntities.moduleVersion.code,
    bareId: generateBareId(),
  });

  const files = (module.files as Record<string, string>) || {};

  await publishFilesToUserContent({ moduleId, versionId, files });

  const version = await prisma.moduleVersion.create({
    data: {
      id: versionId,
      module_id: moduleId,
      files,
    },
  });

  await prisma.module.update({
    where: { id: moduleId },
    data: { latest_version_id: versionId },
  });

  return version;
}

export async function restoreModuleFile(
  moduleId: string,
  filename: string,
  hash: string,
  authorId: string
) {
  // To restore, we just add this existing hash to the module's file map 
  // and possibly create a new revision record to mark who restored it.
  const revisionId = makeEntityId({
    code: "module_file_revision",
    bareId: generateBareId(),
  });

  await prisma.moduleFileRevision.create({
    data: {
      id: revisionId,
      module_id: moduleId,
      filename,
      hash,
      author_id: authorId,
    },
  });

  const module = await getModule(moduleId);
  if (module) {
    const currentFiles = (module.files as Record<string, string>) || {};
    await prisma.module.update({
      where: { id: moduleId },
      data: {
        files: {
          ...currentFiles,
          [filename]: hash,
        },
      },
    });
  }
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

export async function deleteModule(id: string) {
  return await prisma.module.update({
    where: { id },
    data: {
      deleted_at: new Date(),
    },
  });
}

export async function listModules(filters: {
  team_id?: string;
  limit?: number;
  cursor?: string;
}) {
  return await prismaListWithCursor(prisma.module, {
    limit: filters.limit,
    cursor: filters.cursor,
    where: {
      team_id: filters.team_id,
      deleted_at: {
        isSet: false,
      },
    },
    orderBy: { created_at: "desc" },
    resolveCursor: (i) => ({ id: i.id }),
  });
}

export async function getModuleVersions(filters: {
  module_id: string;
  limit?: number;
  cursor?: string;
}) {
  return await prismaListWithCursor(prisma.moduleVersion, {
    limit: filters.limit,
    cursor: filters.cursor,
    where: { module_id: filters.module_id },
    orderBy: { created_at: "desc" },
    resolveCursor: (v) => ({ id: v.id }),
  });
}

export async function getModuleVersion(id: string) {
  return await prisma.moduleVersion.findUnique({
    where: { id },
  });
}

export async function getModuleFile(moduleId: string, hash: string) {
  return await readFromCAS({ moduleId, hash });
}

export async function getModuleFileHistory(filters: {
  module_id: string;
  filename: string;
  limit?: number;
  cursor?: string;
}) {
  return await prismaListWithCursor(prisma.moduleFileRevision, {
    limit: filters.limit,
    cursor: filters.cursor,
    where: { module_id: filters.module_id, filename: filters.filename },
    orderBy: { created_at: "desc" },
    resolveCursor: (r) => ({ id: r.id }),
  });
}

export async function getModuleVersionFile({
  moduleId,
  versionId,
  filename,
}: {
  moduleId: string;
  versionId: string;
  filename: string;
}) {
  const version = await getModuleVersion(versionId);
  if (!version || version.module_id !== moduleId) return null;

  const files = version.files as Record<string, string>;
  const hash = files[filename];
  if (!hash) return null;

  return await getModuleFile(moduleId, hash);
}
