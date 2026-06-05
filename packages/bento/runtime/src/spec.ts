import { z } from "zod";

export const operationPermissionSchema = z.enum([
  "allow",
  "deny",
  "require-approval",
]);

export const serviceDataSchema = z.object({
  id: z.string(),
  channelId: z.string(),
  connectionId: z.string(),
  type: z.enum(["http", "mongodb"]),
  permissions: z
    .object({
      queries: z.record(z.string(), operationPermissionSchema).optional(),
      actions: z.record(z.string(), operationPermissionSchema).optional(),
    })
    .optional(),
});
export type ServiceData = z.infer<typeof serviceDataSchema>;

export const moduleRef = z.object({
  id: z.string(),
  versionId: z.string(),
});
export type ModuleRef = z.infer<typeof moduleRef>;

export const workspaceBoardSpecSchema = z.object({
  id: z.string(),
  title: z.string(),
  module: moduleRef,
  children: z.array(z.string()).optional(),
});
export type WorkspaceBoardSpec = z.infer<typeof workspaceBoardSpecSchema>;

export const moduleGroupSpecSchema = z.object({
  name: z.string(),
  entries: z
    .array(
      z.object({
        type: z.enum(["group", "module"]),
        id: z.string(),
      }),
    )
    .default([]),
  metadata: z.record(z.string(), z.any()).optional(),
});
export type ModuleGroupSpec = z.infer<typeof moduleGroupSpecSchema>;

export const workspaceSpecSchema = z.object({
  version: z.literal(1).default(1),
  services: z.record(z.string(), serviceDataSchema).default({}),
  modules: z.record(z.string(), moduleRef).default({}),
  moduleGroups: z.record(z.string(), moduleGroupSpecSchema).default({}),
  rootModuleGroups: z.array(z.string()).default([]),
  packages: z.record(z.string(), z.string()).default({}),
  boards: z.record(z.string(), workspaceBoardSpecSchema).default({}),
  home: z.string().optional(),
  roots: z.array(z.string()).default([]),
});
export type WorkspaceSpec = z.infer<typeof workspaceSpecSchema>;

export const accentColorSchema = z.enum([
  "auburn",
  "cinnabar",
  "cacao",
  "espresso",
  "ochre",
  "amber",
  "sage",
  "jade",
  "pine",
  "teal",
  "azure",
  "cobalt",
  "violet",
  "fig",
  "mulberry",
  "rose",
  "coral",
  "garnet",
]);
export type AccentColor = z.infer<typeof accentColorSchema>;

export const workspaceMetadataSchema = z.object({
  icon: z.string().optional(),
  accentColor: accentColorSchema.optional(),
});
export type WorkspaceMetadata = z.infer<typeof workspaceMetadataSchema>;
