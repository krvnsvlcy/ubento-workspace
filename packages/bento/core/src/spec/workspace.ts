import { z } from "zod";
import { stateSpecSchema } from "./state.js";

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

export const workspaceSpecSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  state: stateSpecSchema.optional(),
  services: z.record(z.string(), serviceDataSchema).optional(),
});
export type WorkspaceSpec = z.infer<typeof workspaceSpecSchema>;
