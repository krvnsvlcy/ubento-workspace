import { z } from "zod";

// ==========================================
// LLM Content
// ==========================================

export const llmBaseContentSchema = z.object({
  annotations: z
    .object({
      audience: z.array(z.enum(["user", "assistant"])).optional(),
      priority: z.number().optional(),
      lastModified: z.string().optional(),
    })
    .optional(),
  _meta: z.record(z.string(), z.any()).optional(),
});

export const llmTextContentSchema = llmBaseContentSchema.extend({
  type: z.literal("text"),
  text: z.string(),
});

export const llmImageContentSchema = llmBaseContentSchema.extend({
  type: z.literal("image"),
  data: z.string(), // base64 encoded
  mimeType: z.string(),
});

export const llmAudioContentSchema = llmBaseContentSchema.extend({
  type: z.literal("audio"),
  data: z.string(), // base64 encoded
  mimeType: z.string(),
});

export const llmResourceContentSchema = llmBaseContentSchema.extend({
  type: z.literal("resource"),
  resource: z.union([
    z.object({
      uri: z.string(),
      text: z.string(),
      mimeType: z.string().optional(),
      _meta: z.record(z.string(), z.any()).optional(),
    }),
    z.object({
      uri: z.string(),
      blob: z.string(),
      mimeType: z.string().optional(),
      _meta: z.record(z.string(), z.any()).optional(),
    }),
  ]),
});

export const llmResourceLinkContentSchema = llmBaseContentSchema.extend({
  type: z.literal("resource_link"),
  uri: z.string(),
  name: z.string(),
  description: z.string().optional(),
  mimeType: z.string().optional(),
  title: z.string().optional(),
  icons: z
    .array(
      z.object({
        src: z.string(),
        mimeType: z.string().optional(),
        sizes: z.array(z.string()).optional(),
        theme: z.enum(["light", "dark"]).optional(),
      }),
    )
    .optional(),
});

export const llmContentBlockSchema = z.discriminatedUnion("type", [
  llmTextContentSchema,
  llmImageContentSchema,
  llmAudioContentSchema,
  llmResourceContentSchema,
  llmResourceLinkContentSchema,
]);

export const llmContentSchema = z.array(llmContentBlockSchema);

export type LLMContentBlock = z.infer<typeof llmContentBlockSchema>;
export type LLMContent = z.infer<typeof llmContentSchema>;

export function llmContentToText(content?: LLMContent): string {
  if (!content) return "";
  return content
    .map((block) => {
      if (block.type === "text") return block.text;
      if (block.type === "resource") {
        return "text" in block.resource ? block.resource.text : "";
      }
      return "";
    })
    .join("\n");
}
