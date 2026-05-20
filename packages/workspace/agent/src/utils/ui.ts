import { z } from "zod";

export const baseMessageItemSchema = z.object({
  type: z.string(),
  label: z.string(),
});

export const imageMessageItemSchema = baseMessageItemSchema.extend({
  type: z.literal("image"),
  url: z.string(),
  mediaType: z.string(),
});

export const fileMessageItemSchema = baseMessageItemSchema.extend({
  type: z.literal("file"),
  url: z.string(),
  mediaType: z.string(),
});

export const dataMessageItemSchema = baseMessageItemSchema.extend({
  type: z.literal("data"),
  data: z.any(),
});

export const textMessageItemSchema = baseMessageItemSchema.extend({
  type: z.literal("text"),
  text: z.string(),
});

export const messageItemSchema = z.discriminatedUnion("type", [
  imageMessageItemSchema,
  fileMessageItemSchema,
  dataMessageItemSchema,
  textMessageItemSchema,
]);

export type MessageItem = z.infer<typeof messageItemSchema>;
