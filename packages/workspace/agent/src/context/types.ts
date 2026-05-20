import { llmContentSchema } from "@/utils/llm.js";
import { z } from "zod";
import { messageDataSchema } from "../message/types.js";

// ==========================================
// History
// ==========================================

export const agentHistoryMessageEntrySchema = z.object({
  type: z.literal("message"),
  id: z.string(),
  data: messageDataSchema,
});
export type AgentHistoryMessageEntry = z.infer<
  typeof agentHistoryMessageEntrySchema
>;

export const agentHistorySummaryEntrySchema = z.object({
  type: z.literal("summary"),
  messageIds: z.array(z.string()),
  content: llmContentSchema,
});
export type AgentHistorySummaryEntry = z.infer<
  typeof agentHistorySummaryEntrySchema
>;

export const agentHistoryEntrySchema = z.discriminatedUnion("type", [
  agentHistoryMessageEntrySchema,
  agentHistorySummaryEntrySchema,
]);
export type AgentHistoryEntry = z.infer<typeof agentHistoryEntrySchema>;

// ==========================================
// Resource
// ==========================================

export const agentContextResourceSchema = z.object({
  key: z.string(),
  type: z.string(),
  label: z.string(),
  data: z.any(),
});
export type AgentContextResource = z.infer<typeof agentContextResourceSchema>;

// ==========================================
// Context
// ==========================================

export const agentContextDataSchema = z.object({
  history: z.array(agentHistoryEntrySchema).optional(),
  resources: z.array(agentContextResourceSchema).optional(),
  response: z.string().optional(),
  budget: z.number().optional(),
});
export type AgentContextData = z.infer<typeof agentContextDataSchema>;
