import { z } from "zod";
import { llmContentSchema } from "../utils/llm.js";

// ==========================================
// Error
// ==========================================

export const agentErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  data: z.record(z.string(), z.any()).optional(),
});

export type AgentError = z.infer<typeof agentErrorSchema>;

// ==========================================
// Action
// ==========================================

export const agentActionStatusSchema = z.enum([
  "pending",
  "running",
  "completed",
  "failed",
  "aborted",
]);
export type AgentActionStatus = z.infer<typeof agentActionStatusSchema>;

export const agentActionDataSchema = z.object({
  id: z.string(),
  tool: z.string(),
  status: agentActionStatusSchema,
  input: z.record(z.string(), z.any()).optional(),
  output: llmContentSchema.optional(),
  structuredOutput: z.record(z.string(), z.any()).optional(),
  error: agentErrorSchema.optional(),
});

export type AgentActionData<
  I extends Record<string, any> = Record<string, any>,
  O extends Record<string, any> = Record<string, any>,
> = Omit<
  z.infer<typeof agentActionDataSchema>,
  "input" | "structured_output"
> & {
  input?: I;
  structuredOutput?: O;
};

// ==========================================
// Agent
// ==========================================

export const agentMessageDataSchema = z.object({
  role: z.literal("agent"),
  modelId: z.string(), // the model used to generate this message
  reasoning: llmContentSchema.optional(),
  actions: z.array(agentActionDataSchema),
  status: z.enum(["in-progress", "completed", "errored", "aborted"]),
  error: agentErrorSchema.optional(),
});

export type AgentMessageData = z.infer<typeof agentMessageDataSchema>;

// ==========================================
// User
// ==========================================

export const userMessageAttachmentSchema = z.object({
  type: z.string(),
  data: z.any(),
});
export type UserMessageAttachment<T extends string = string, D = unknown> = {
  type: T;
  data: D;
};

export const userMessageDataSchema = z.object({
  role: z.literal("user"),
  modelId: z.string(), // the model to use to generate the response
  text: z.string(),
  attachments: z.array(userMessageAttachmentSchema).optional(),
});

export type UserMessageData = z.infer<typeof userMessageDataSchema>;

// ==========================================
// Union
// ==========================================

export const messageDataSchema = z.discriminatedUnion("role", [
  userMessageDataSchema,
  agentMessageDataSchema,
]);

export type MessageData = z.infer<typeof messageDataSchema>;
