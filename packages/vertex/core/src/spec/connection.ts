import { z } from "zod";

// The auth types must match the discriminators from your ConnectionProviderAuthConfig
const authMethodEnum = z.enum(["basic", "api_key", "oauth2"]);

export const httpConnectionSpecSchema = z.object({
  type: z.literal("http"),
  provider: z.string().describe("The name of the connection provider"),
  baseUrl: z.url().describe("The base URL of the connection"),
  auth: z
    .array(authMethodEnum)
    .optional()
    .describe(
      "If omitted, all auth methods supported by the provider are allowed.",
    ),
  headers: z.record(z.string(), z.string()).optional(),
});
export type HTTPConnectionSpec = z.infer<typeof httpConnectionSpecSchema>;

export const connectionSpecSchema = z.discriminatedUnion("type", [
  httpConnectionSpecSchema,
]);
export type ConnectionSpec = z.infer<typeof connectionSpecSchema>;
