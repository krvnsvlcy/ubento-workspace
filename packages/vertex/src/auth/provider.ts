import { z } from "zod";

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
  authorizationUrl: z.string(),
  tokenUrl: z.string(),
  clientId: z.string(), // Exists here if Ubento owns the central OAuth App
  clientSecret: z.string(), // Exists here if Ubento owns the central OAuth App
  scopes: z.array(z.string()),
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

// 2. The Record-Based Config
export const connectionProviderConfigSchema = z.object({
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
export type ConnectionProviderConfig = z.infer<
  typeof connectionProviderConfigSchema
>;
