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

export const workspaceSpecSchema = z.object({
  version: z.literal(1).default(1),
  services: z.record(z.string(), serviceDataSchema).default({}),
  components: z.record(z.string(), moduleRef).default({}),
  libraries: z.record(z.string(), moduleRef).default({}),
  boards: z.record(z.string(), workspaceBoardSpecSchema).default({}),
  roots: z.array(z.string()).default([]),
});
export type WorkspaceSpec = z.infer<typeof workspaceSpecSchema>;
