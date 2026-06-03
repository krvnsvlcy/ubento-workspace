import z from "zod";

// Data

export const httpConnectionDataSchema = z.object({
  providerId: z.string().describe("The ID of the connection provider"),
});
export type HttpConnectionData = z.infer<typeof httpConnectionDataSchema>;

// Credentials

export const baseCredentialsSchema = z.object({
  customData: z.record(z.string(), z.any()).optional(),
});

export const basicConnectionCredentialsSchema = baseCredentialsSchema.extend({
  type: z.literal("basic"),
  username: z.string().min(1, "Username is required"),
  password: z.string().optional(),
});

export const oauth2ConnectionCredentialsSchema = baseCredentialsSchema.extend({
  type: z.literal("oauth2"),
  refreshToken: z.string(),
  accessToken: z.string(),
  expiresIn: z.number(),
  tokenType: z.string(),
  scope: z.string().optional(),
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
