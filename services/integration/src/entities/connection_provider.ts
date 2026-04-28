import {
  ubentoEntities,
  generateBareId,
  makeEntityId,
} from "@ubento/primitives";
import { prismaListWithCursor } from "@ubento/service-toolkit";
import { Prisma } from "@ubento/database/integration";
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
  authorizationUrl: z.string(),
  clientId: z.string(),
  clientSecret: z.string(),
  scopes: z.array(z.string()),
  tokenUrl: z.string(),
  tokenResponseMapping: z
    .object({
      accessToken: z.string().default("access_token"),
      refreshToken: z.string().default("refresh_token"),
      expiresIn: z.string().default("expires_in"),
      tokenType: z.string().default("token_type"),
      scope: z.string().default("scope"),
    })
    .default({
      accessToken: "access_token",
      refreshToken: "refresh_token",
      expiresIn: "expires_in",
      tokenType: "token_type",
      scope: "scope",
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
  organization_id,
  name,
  cursor,
  limit,
}: {
  organization_id?: string;
  name?: string;
  cursor?: string;
  limit?: number;
} = {}) {
  return prismaListWithCursor(prisma.connectionProvider, {
    limit,
    cursor,
    orderBy: [{ id: "asc" }],
    where: {
      // Keep organization_id scoped if provided
      ...(organization_id && { organization_id }),

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
  organization_id,
  name,
  display_name,
  description,
  config,
}: {
  organization_id: string;
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
      organization_id,
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
