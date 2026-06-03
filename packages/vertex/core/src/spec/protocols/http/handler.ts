import { z } from "zod";

// Connection

export const httpConnectionSpecSchema = z.object({
  provider: z.string().describe("The name of the connection provider"),
  baseUrl: z.url().describe("The base URL of the connection"),
  auth: z
    .array(z.enum(["basic", "api_key", "oauth2"]))
    .optional()
    .describe(
      "If omitted, all auth methods supported by the provider are allowed.",
    ),
  headers: z.record(z.string(), z.string()).optional(),
});
export type HttpConnectionSpec = z.infer<typeof httpConnectionSpecSchema>;

// Handler

export const httpBodyTypeSchema = z.enum(["json", "text", "bytes", "form"]);
export type HttpBodyType = z.infer<typeof httpBodyTypeSchema>;

export const httpBodySchema = z.object({
  type: httpBodyTypeSchema,
  data: z.unknown().optional(),
});
export type HttpBody = z.infer<typeof httpBodySchema>;

export const httpRequestSchema = z.object({
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
  baseUrl: z.url().describe("The base url of the service").optional(),
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

export const httpHandlerSchema = z.object({
  request: httpRequestSchema,
  response: httpBodySchema.default({
    type: "json",
  }),
});
export type HttpHandlerInput = z.input<typeof httpHandlerSchema>;
export type HttpHandler = z.output<typeof httpHandlerSchema>;
