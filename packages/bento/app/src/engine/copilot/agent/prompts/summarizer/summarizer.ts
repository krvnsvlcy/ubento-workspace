import { generateText } from "ai";
import {
  AgentMessageData,
  UserMessageData,
} from "@/engine/copilot/agent/message/message.js";
import { LanguageModel } from "@/engine/copilot/utils/models.js";
import { Agent } from "../../agent.js";
import { AgentContext, AgentHistorySummaryEntry } from "../../context.js";
import {
  formatAgentMessage,
  formatUserMessage,
} from "../manager/prompt/prompt.js";

export async function summarize({
  context,
  agent,
  model,
  maxLength = 1000,
}: {
  context: AgentContext;
  agent: Agent;
  model: LanguageModel;
  maxLength?: number;
}): Promise<AgentContext> {
  const history = context.history || [];
  if (history.length <= 1) return context;

  // Find FUM (first user message)
  const fumIndex = history.findIndex(
    (e: any) => e.type === "message" && e.role === "user",
  );
  if (fumIndex === -1) return context;

  const fum = history[fumIndex];
  const toSummarize = history.filter((_: any, i: number) => i !== fumIndex);
  if (toSummarize.length === 0) return context;

  // Format the entries to summarize
  const parts: string[] = [];
  const summarizedMessageIds: string[] = [];

  for (const entry of toSummarize) {
    if (entry.type === "summary") {
      parts.push(`[Previous Summary]: ${entry.data}`);
      summarizedMessageIds.push(...entry.messageIds);
    } else {
      summarizedMessageIds.push(entry.messageId);
      const role = (entry as any).role || "agent";
      parts.push(`[${role.toUpperCase()}]:`);
      if (role === "user") {
        const userParts = await formatUserMessage(
          entry.data as UserMessageData,
          agent,
        );
        for (const p of userParts) {
          if (p.type === "text") parts.push(p.text);
        }
      } else {
        parts.push(formatAgentMessage(entry.data as AgentMessageData));
      }
    }
    parts.push("\n");
  }

  const content = parts.join("\n");

  const userMessageParts = await formatUserMessage(
    fum.data as UserMessageData,
    agent,
  );
  const userMessageText = userMessageParts
    .filter((p) => p.type === "text")
    .map((p) => p.text)
    .join("\n");

  const prompt = `Summarize the following conversation history between a user and an AI assistant. 
The summary should be concise and capture the key interactions and outcomes.
Maximum length: ${maxLength} characters.

USER MESSAGE:
${userMessageText}

CONVERSATION:
${content}

SUMMARY:`;

  const { text } = await generateText({
    model,
    messages: [{ role: "user", content: prompt }],
  });

  const summaryEntry: AgentHistorySummaryEntry = {
    type: "summary",
    messageIds: summarizedMessageIds,
    data: text.trim(),
  };

  return {
    history: [fum, summaryEntry],
  };
}
