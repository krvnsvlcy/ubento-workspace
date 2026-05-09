import { z } from "zod";

// The auth types must match the discriminators from your ConnectionProviderAuthConfig
const authMethodEnum = z.enum(["basic", "api_key", "oauth2"]);

export const connectionSpecSchema = z.object({
  provider: z.string().describe("The ID of the ConnectionProvider"),
  allowedAuthMethods: z
    .array(authMethodEnum)
    .optional()
    .describe(
      "If omitted, all auth methods supported by the Provider are allowed.",
    ),
});

export type ConnectionSpec = z.infer<typeof connectionSpecSchema>;
