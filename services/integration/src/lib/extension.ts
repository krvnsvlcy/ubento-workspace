import * as semver from "semver";
import { z } from "zod";

export const mpcServerContributionSchema = z.object({
  type: z.literal("mcp-server"),
  name: z.string().min(1).max(100),
  url: z.url().optional(),
  connectionProviderId: z.string().optional(),
});

export const scriptContributionSchema = z.object({
  type: z.literal("script"),
  role: z.enum(["workspace-setup", "setup-prepare"]),
  source: z.string().optional(), // path to the script in the extension bundle
});

export const extensionContributionSchema = z.discriminatedUnion("type", [
  mpcServerContributionSchema,
  scriptContributionSchema,
]);

export const extensionManifestSchema = z.object({
  name: z.string().min(1).max(100),
  version: z
    .string()
    .min(1)
    .max(100)
    .transform((v, ctx) => {
      const valid = semver.valid(v);
      if (!valid) {
        ctx.addIssue({
          code: "custom",
          message: "Invalid semver version",
        });
        return z.NEVER;
      }
      return valid;
    }),
  author: z
    .object({
      name: z.string().min(1).max(100),
      url: z.url().optional(),
    })
    .optional(),

  contributions: z.array(extensionContributionSchema).optional(),
  keywords: z.array(z.string().max(50)).max(10).optional(),
});

export type ExtensionManifest = z.infer<typeof extensionManifestSchema>;
export type ExtensionContribution = z.infer<typeof extensionContributionSchema>;
