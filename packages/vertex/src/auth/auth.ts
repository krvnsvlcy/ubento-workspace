import z from "zod";

export const basicAuthSchema = z.object({
  type: z.literal("basic"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const oauth2AuthSchema = z.object({
  type: z.literal("oauth2"),
  access_token: z.string(),
  refresh_token: z.string().optional(),
  expires_in: z.number().optional(),
  token_type: z.string().optional(),
  scope: z.string().optional(),
  _raw: z.any().optional(),
});

export const apiKeyAuthSchema = z.object({
  type: z.literal("api_key"),
  token: z.string().min(1, "Token is required"),
});

export const connectionAuthSchema = z.discriminatedUnion("type", [
  basicAuthSchema,
  oauth2AuthSchema,
  apiKeyAuthSchema,
]);
export type ConnectionAuth = z.infer<typeof connectionAuthSchema>;
