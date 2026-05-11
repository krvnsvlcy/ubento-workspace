import z from "zod";
import { httpHandlerSchema } from "../spec/spec";

// 1. The Strategy Definitions (No User Credentials)
export const basicAuthStrategySchema = z.object({
  // Empty for now, acts as a flag that Basic Auth is supported.
  // Vertex will inject the username/password from the Connection.
});

export const apiKeyStrategySchema = z.object({
  location: z.enum(["header", "query"]),
  name: z.string(), // e.g., "Authorization" or "api_key"
  template: z.string().optional(), // e.g., "Bearer {{key}}"
});

export const oauth2StrategySchema = z.object({
  type: z.literal("oauth2"),
  authorize: httpHandlerSchema,
  token: httpHandlerSchema,
  refresh: httpHandlerSchema.optional(),
  identity: httpHandlerSchema.optional(),
  revoke: httpHandlerSchema.optional(),
});

// 2. The Record-Based Config
export const httpConnectionProviderConfigSchema = z.object({
  type: z.literal("http"),
  headers: z.record(z.string(), z.string()).optional(),
  auth: z
    .object({
      basic: basicAuthStrategySchema.optional(),
      apiKey: apiKeyStrategySchema.optional(),
      oauth2: oauth2StrategySchema.optional(),
    })
    // Ensure at least one strategy is defined so a provider isn't entirely broken
    .refine(
      (strategies) =>
        Object.values(strategies).some((strategy) => strategy !== undefined),
      {
        message: "A provider must define at least one authentication strategy",
      },
    ),
});
export type HttpConnectionProviderConfig = z.infer<
  typeof httpConnectionProviderConfigSchema
>;

// Credentials

export const basicConnectionCredentialsSchema = z.object({
  type: z.literal("basic"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const oauth2ConnectionCredentialsSchema = z.object({
  type: z.literal("oauth2"),
  refreshToken: z.string(),
  accessToken: z.string(),
  expiresIn: z.number(),
  tokenType: z.string(),
  scope: z.string(),
});

export const apiKeyConnectionCredentialsSchema = z.object({
  type: z.literal("api_key"),
  token: z.string().min(1, "Token is required"),
});

export const httpConnectionCredentialsSchema = z.discriminatedUnion("type", [
  basicConnectionCredentialsSchema,
  oauth2ConnectionCredentialsSchema,
  apiKeyConnectionCredentialsSchema,
]);
export type HttpConnectionCredentials = z.infer<
  typeof httpConnectionCredentialsSchema
>;
