import { z } from "zod";
import { connectionSpecSchema } from "./connection.js";
import { entitySpecSchema } from "./entity.js";
import { operationSpecSchema } from "./operation.js";
import { schemaSchema } from "./schema.js";

export const serviceSpecV1Schema = z.object({
  // System
  spec: z.literal(1),
  // Metadata
  name: z.string(),
  description: z.string().optional(),
  // Connections
  connections: z.record(z.string(), connectionSpecSchema).optional(),
  // Types
  schemas: z.record(z.string(), schemaSchema).optional(),
  entities: z.record(z.string(), entitySpecSchema).optional(),
  // Operations
  queries: z.record(z.string(), operationSpecSchema).optional(),
  actions: z.record(z.string(), operationSpecSchema).optional(),
});

export type ServiceSpecV1 = z.infer<typeof serviceSpecV1Schema>;
