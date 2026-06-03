import z from "zod";
import { httpHandlerSchema } from "../../spec";

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
export type BasicStrategySchema = z.infer<typeof basicAuthStrategySchema>;

export const apiKeyStrategySchema = z.object({
  location: z.enum(["header", "query"]),
  name: z.string(), // e.g., "Authorization" or "api_key"
  template: z.string().optional(), // e.g., "Bearer {{key}}"
  verification: verificationSchema.optional(),
});
export type APIKeyStrategySchema = z.infer<typeof apiKeyStrategySchema>;

export const oauth2StrategySchema = z.object({
  defaultScopes: z.array(z.string()).optional(),
  disablePkce: z.boolean().optional(),
  baseUrl: z.string(),
  authorize: httpHandlerSchema,
  token: httpHandlerSchema,
  refresh: httpHandlerSchema.optional(),
  identity: httpHandlerSchema.optional(), // Used strictly to fetch the user's profile/ID post-auth
  revoke: httpHandlerSchema.optional(),
});
export type OAuthStrategySchema = z.infer<typeof oauth2StrategySchema>;

// --- 3. The Provider Configuration ---

export const httpConnectionProviderConfigSchema = z.object({
  type: z.literal("http"),
  handle: z.string(), // unique identifier for the provider (e.g., "salesforce")
  name: z.string(), // display name of the provider (e.g., "Salesforce")
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
