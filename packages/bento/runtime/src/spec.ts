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
  services: z.record(z.string(), serviceDataSchema).optional(),
  boards: z.record(z.string(), workspaceBoardSpecSchema).optional(),
  roots: z.array(z.string()).optional(),
});
export type WorkspaceSpec = z.infer<typeof workspaceSpecSchema>;
