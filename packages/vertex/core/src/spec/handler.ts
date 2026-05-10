import z from "zod";

export const resolvableValueSchema = z.object({
  $resolve: z.string(), // eg: args.userId
});

export const httpBodyTypeSchema = z.enum(["json", "text", "bytes", "form"]);
export type HttpBodyType = z.infer<typeof httpBodyTypeSchema>;

export const httpBodySchema = z.object({
  type: httpBodyTypeSchema,
  data: z.unknown(),
});
export type HttpBody = z.infer<typeof httpBodySchema>;

export const httpRequestSchema = z.object({
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
  baseUrl: z.url().describe("The base url of the service"),
  path: z.string().describe("The path to make the request to"),
  params: z
    .record(z.string(), z.unknown())
    .describe("Values for variables in the path")
    .optional(),
  headers: z
    .record(z.string(), z.unknown())
    .describe("Headers to send with the request")
    .optional(),
  query: z
    .record(z.string(), z.unknown())
    .describe("Query parameters to send with the request")
    .optional(),
  body: httpBodySchema.optional(),
});

export const httpOperationHandlerSchema = z.object({
  type: z.literal("http"),
  request: httpRequestSchema,
  response: httpBodySchema.optional(),
});

export const operationHandlerSchema = z.discriminatedUnion("type", [
  httpOperationHandlerSchema,
]);

export type OperationHandler = z.infer<typeof operationHandlerSchema>;
