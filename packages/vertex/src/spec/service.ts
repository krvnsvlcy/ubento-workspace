import { z } from "zod";
import { actionManifestSchema } from "./action";
import { entityManifestSchema } from "./entity";
import { querySpecSchema } from "./query";
import { schemaSchema } from "./schema";

// The auth types must match the discriminators from your ConnectionProviderAuthConfig
const authMethodEnum = z.enum(["basic", "api_key", "oauth2"]);

export const serviceSpecSchema = z.object({
  name: z.string(),
  specVersion: z.string(),
  description: z.string().optional(),

  // The upgraded connection object
  connection: z.object({
    provider: z.string().describe("The ID of the ConnectionProvider"),
    allowedAuthMethods: z
      .array(authMethodEnum)
      .optional()
      .describe(
        "If omitted, all auth methods supported by the Provider are allowed.",
      ),
  }),

  schemas: z.record(z.string(), schemaSchema).optional(),
  entities: z.record(z.string(), entityManifestSchema).optional(),
  queries: z.record(z.string(), querySpecSchema).optional(),
  actions: z.record(z.string(), actionManifestSchema).optional(),
});

export type ServiceSpec = z.infer<typeof serviceSpecSchema>;
