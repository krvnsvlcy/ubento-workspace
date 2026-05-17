import { z } from "zod";
import { operationSpecSchema } from "./operation.js";
import {
  httpConnectionSpecSchema,
  httpHandlerSchema,
} from "./protocols/http.js";
import { schemaSchema } from "./schema.js";

export function serviceSpecV1SchemaFactory<
  Type extends string,
  TConnectionSpec extends z.ZodType,
  THandlerSpec extends z.ZodType,
>({
  type,
  connection,
  handler,
}: {
  type: Type;
  connection: TConnectionSpec;
  handler: THandlerSpec;
}) {
  return z.object({
    // System
    spec: z.literal(1),
    // Metadata
    type: z.literal(type),
    name: z.string(),
    description: z.string().optional(),
    // Connection
    connection: connection.optional(),
    // Types
    schemas: z.record(z.string(), schemaSchema).optional(),
    // Operations
    queries: z.record(z.string(), operationSpecSchema({ handler })).optional(),
    actions: z.record(z.string(), operationSpecSchema({ handler })).optional(),
  });
}

export const httpServiceSpecV1Schema = serviceSpecV1SchemaFactory({
  type: "http",
  connection: httpConnectionSpecSchema,
  handler: httpHandlerSchema,
});

export const serviceSpecV1Schema = z.discriminatedUnion("type", [
  httpServiceSpecV1Schema,
]);
export type ServiceSpecV1 = z.infer<typeof serviceSpecV1Schema>;
