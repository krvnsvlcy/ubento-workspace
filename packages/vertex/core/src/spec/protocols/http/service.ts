import { z } from "zod";
import { operationSpecSchema } from "../../operation";
import { schemaSchema } from "../../schema";
import { httpConnectionSpecSchema, httpHandlerSchema } from "./handler";

export const httpServiceSpecV1Schema = z.object({
  // System
  spec: z.literal(1),
  // Metadata
  type: z.literal("http"),
  name: z.string(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  // Connection
  connection: httpConnectionSpecSchema.optional(),
  // Types
  schemas: z.record(z.string(), schemaSchema).optional(),
  // Operations
  queries: z
    .record(z.string(), operationSpecSchema({ handler: httpHandlerSchema }))
    .optional(),
  actions: z
    .record(z.string(), operationSpecSchema({ handler: httpHandlerSchema }))
    .optional(),
});
export type HttpServiceSpecV1 = z.infer<typeof httpServiceSpecV1Schema>;
