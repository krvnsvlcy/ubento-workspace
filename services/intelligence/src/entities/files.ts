import {
  ubentoEntities,
  generateBareId,
  makeEntityId,
} from "@ubento/primitives";
import { File } from "@ubento/database/intelligence";
import sharp from "sharp";
import { intelligenceBucket, storagePaths } from "../lib/storage.js";
import prisma from "../prisma.js";

const SIGNED_URL_EXPIRATION_MS = 1000 * 60 * 15; // 15 minutes

export async function listFiles(workspace_id: string): Promise<File[]> {
  return prisma.file.findMany({
    where: { workspace_id },
    orderBy: { created_at: "asc" },
  });
}

export async function getFile(file_id: string): Promise<File | null> {
  return prisma.file.findUnique({
    where: { id: file_id },
  });
}

export async function createFile(data: {
  workspace_id: string;
  name: string;
  type: string;
  buffer: Buffer;
}): Promise<File> {
  let fileBuffer = data.buffer;
  let fileType = data.type;
  let fileName = data.name;

  if (fileType.startsWith("image/")) {
    fileBuffer = await sharp(data.buffer)
      .resize(2048, 2048, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();
    fileType = "image/webp";
    fileName = fileName.replace(/\.[^/.]+$/, "") + ".webp";
  }

  const file_id = makeEntityId({
    code: ubentoEntities.intelligenceFile.code,
    bareId: generateBareId(),
  });

  const storagePath = storagePaths.file({
    workspace_id: data.workspace_id,
    file_id,
  });
  const file = intelligenceBucket.file(storagePath);

  await file.save(fileBuffer, {
    metadata: {
      contentType: fileType,
    },
  });

  return prisma.file.create({
    data: {
      id: file_id,
      workspace_id: data.workspace_id,
      name: fileName,
      type: fileType,
      size: fileBuffer.length,
    },
  });
}

export async function getFileUrl(file_id: string): Promise<string> {
  const file = await getFile(file_id);
  if (!file) {
    throw new Error("File not found in database");
  }

  const storagePath = storagePaths.file({
    workspace_id: file.workspace_id,
    file_id,
  });
  const storageFile = intelligenceBucket.file(storagePath);

  const [url] = await storageFile.getSignedUrl({
    version: "v4",
    action: "read",
    expires: Date.now() + SIGNED_URL_EXPIRATION_MS,
  });

  return url;
}
