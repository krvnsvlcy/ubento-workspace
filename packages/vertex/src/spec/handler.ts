import z from "zod";

export const resolvableValueSchema = z.object({
  $resolve: z.string(), // eg: args.userId
});

export const httpRequestBodySchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("form"), data: z.unknown() }),
  z.object({ type: z.literal("json"), data: z.unknown() }),
  z.object({ type: z.literal("text"), data: z.unknown() }),
  z.object({ type: z.literal("bytes"), data: z.unknown() }),
]);

export const httpHandlerSchema = z.object({
  type: z.literal("http"),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
  origin: z.string().describe("The origin to make the request to"),
  path: z.string().describe("The path to make the request to"),
  params: z
    .record(z.string(), z.unknown())
    .describe("Values for variables in the path")
    .optional(),
  headers: z
    .record(z.string(), z.unknown())
    .describe("Headers to send with the request")
    .optional(),
  queries: z
    .record(z.string(), z.unknown())
    .describe("Query parameters to send with the request")
    .optional(),
  body: httpRequestBodySchema,
});

export const handlerSchema = z.discriminatedUnion("type", [httpHandlerSchema]);

export type Handler = z.infer<typeof handlerSchema>;
