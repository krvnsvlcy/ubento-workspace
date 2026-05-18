import z from "zod";
import { httpHandlerSchema } from "../spec/spec";

// --- 1. Utilities & UI Metadata ---

// Prompts the user for necessary inputs before the auth flow (e.g., entering a subdomain)
export const connectionCustomFieldSchema = z.object({
  type: z.enum(["string", "number", "boolean"]),
  title: z.string(),
  description: z.string().optional(),
  example: z.string().optional(),
  format: z.string().optional(),
  pattern: z.string().optional(), // Regex validation for the frontend
});
// A lightweight verification ping to ensure credentials are valid upon creation
export const verificationSchema = z.object({
  method: z.enum(["GET", "POST"]).default("GET"),
  endpoint: z.string(),
  headers: z.record(z.string(), z.string()).optional(),
});

// --- 2. The Authentication Strategies ---

export const basicAuthStrategySchema = z.object({
  verification: verificationSchema.optional(),
});

export const apiKeyStrategySchema = z.object({
  location: z.enum(["header", "query"]),
  name: z.string(), // e.g., "Authorization" or "api_key"
  template: z.string().optional(), // e.g., "Bearer {{key}}"
  verification: verificationSchema.optional(),
});

export const oauth2StrategySchema = z.object({
  type: z.literal("oauth2"),
  defaultScopes: z.array(z.string()).optional(),
  disablePkce: z.boolean().optional(),
  authorize: httpHandlerSchema,
  token: httpHandlerSchema,
  refresh: httpHandlerSchema.optional(),
  identity: httpHandlerSchema.optional(), // Used strictly to fetch the user's profile/ID post-auth
  revoke: httpHandlerSchema.optional(),
});

// --- 3. The Provider Configuration ---

export const httpConnectionProviderConfigSchema = z.object({
  type: z.literal("http"),
  code: z.string(), // unique identifier for the provider
  name: z.string(), // display name of the provider
  baseUrl: z.string().optional(),

  // Dynamic UI variables collected before authentication begins
  customFields: z.record(z.string(), connectionCustomFieldSchema).optional(),

  // The Authentication Block
  auth: z
    .object({
      basic: basicAuthStrategySchema.optional(),
      apiKey: apiKeyStrategySchema.optional(),
      oauth2: oauth2StrategySchema.optional(),
    })
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

// --- 4. Stored Credentials ---

// Base schema stores the user inputs from `connectionConfig` alongside the tokens
export const baseCredentialsSchema = z.object({
  customData: z.record(z.string(), z.any()).optional(),
});

export const basicConnectionCredentialsSchema = baseCredentialsSchema.extend({
  type: z.literal("basic"),
  username: z.string().min(1, "Username is required"),
  password: z.string().optional(), // Made optional for APIs like Stripe
});

export const oauth2ConnectionCredentialsSchema = baseCredentialsSchema.extend({
  type: z.literal("oauth2"),
  refreshToken: z.string(),
  accessToken: z.string(),
  expiresIn: z.number(),
  tokenType: z.string(),
  scope: z.string(),
});

export const apiKeyConnectionCredentialsSchema = baseCredentialsSchema.extend({
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
