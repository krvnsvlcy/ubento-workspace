import { Prisma } from "@ubento/services.database/vertex";
import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/services.primitives";
import { prismaListWithCursor } from "@ubento/services.toolkit";
import { httpOperationHandlerSchema } from "@ubento/vertex.core";
import { z } from "zod";
import prisma from "../lib/prisma.js";

export const basicAuthConfigSchema = z.object({
  type: z.literal("basic"),
  username: z.string(),
  password: z.string(),
});

export type BasicAuthConfig = z.infer<typeof basicAuthConfigSchema>;

export const oauth2ConfigSchema = z.object({
  type: z.literal("oauth2"),
  handlers: z.object({
    authorize: httpOperationHandlerSchema,
    token: httpOperationHandlerSchema,
  }),
});

export type OAuth2Config = z.infer<typeof oauth2ConfigSchema>;

export const apiKeyConfigSchema = z.object({
  type: z.literal("token"),
  header: z.string(),
  template: z.string().optional(), // Bearer $API_KEY
});

export type ApiKeyConfig = z.infer<typeof apiKeyConfigSchema>;

export const connectionProviderAuthConfigSchema = z.discriminatedUnion("type", [
  basicAuthConfigSchema,
  oauth2ConfigSchema,
  apiKeyConfigSchema,
]);

export type ConnectionProviderAuthConfig = z.infer<
  typeof connectionProviderAuthConfigSchema
>;

export const corsConfigSchema = z.object({
  allowedOrigins: z.array(z.string()).optional(),
  allowedMethods: z.array(z.string()).optional(), // e.g., ['GET', 'POST', 'OPTIONS']
  allowedHeaders: z.array(z.string()).optional(),
  exposedHeaders: z.array(z.string()).optional(),
  credentials: z.boolean().optional(),
  maxAge: z.number().optional(),
});

export const connectionProviderConfigSchema = z.object({
  headers: z.record(z.string(), z.string()).optional(),
  authStrategies: z.array(connectionProviderAuthConfigSchema).optional(),
  allowedOrigins: z.array(z.string()).optional(),
  allowedHeaders: z.array(z.string()).optional(),
  cors: corsConfigSchema.optional(),
});
export type ConnectionProviderConfig = z.infer<
  typeof connectionProviderConfigSchema
>;

export async function listConnectionProviders({
  team_id,
  name,
  cursor,
  limit,
}: {
  team_id?: string;
  name?: string;
  cursor?: string;
  limit?: number;
} = {}) {
  return prismaListWithCursor(prisma.connectionProvider, {
    limit,
    cursor,
    orderBy: [{ id: "asc" }],
    where: {
      // Keep team_id scoped if provided
      ...(team_id && { team_id }),

      // Correct Substring check for MongoDB in Prisma
      ...(name && {
        OR: [
          { name: { contains: name, mode: "insensitive" } },
          { display_name: { contains: name, mode: "insensitive" } },
        ],
      }),
    },
    resolveCursor: (p) => ({ id: p.id }),
  });
}
export async function getConnectionProvider(id: string) {
  return prisma.connectionProvider.findUnique({ where: { id } });
}

export async function createConnectionProvider({
  team_id,
  name,
  display_name,
  description,
  config,
}: {
  team_id: string;
  name: string;
  display_name: string;
  description?: string | null;
  config?: Prisma.InputJsonValue | null;
}) {
  return prisma.connectionProvider.create({
    data: {
      id: makeEntityId({
        code: ubentoEntities.connectionProvider.code,
        bareId: generateBareId(),
      }),
      team_id,
      name,
      display_name,
      description,
      config,
    },
  });
}

export async function updateConnectionProvider(
  id: string,
  data: {
    name: string;
    display_name: string;
    description?: string | null;
    config?: Prisma.InputJsonValue | null;
  },
) {
  return prisma.connectionProvider.update({ where: { id }, data });
}

export async function deleteConnectionProvider(id: string) {
  return prisma.connectionProvider.delete({ where: { id } });
}
