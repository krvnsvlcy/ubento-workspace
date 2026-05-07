import { MessageData, AgentMessageData, UserMessageData } from "../message/types.js";
import { AgentContextStats } from "./stats.js";
import {
  AgentContext,
  AgentContextResource,
  AgentHistoryEntry,
  AgentHistoryMessageEntry,
  AgentHistorySummaryEntry,
} from "./types.js";
import { Agent } from "../agent/agent.js";
import { LanguageModel } from "../utils/models.js";
import { formatAgentMessage, formatUserMessage } from "../execution/prompt/prompt/prompt.js";

export function createAgentContext({
  data,
}: { data?: Partial<AgentContext> } = {}) {
  const history: AgentHistoryEntry[] = data?.history || [];
  const resources = new Map<string, AgentContextResource>(
    (data?.resources || []).map((r) => [r.key, r]),
  );
  const listeners = new Set<(history: AgentHistoryEntry[]) => void>();

  function notify() {
    listeners.forEach((l) => l([...history]));
  }

  return {
    pushMessage(message: MessageData) {
      const entry: AgentHistoryMessageEntry = {
        type: "message",
        id: crypto.randomUUID(),
        data: message,
      };
      history.push(entry);
      notify();
      return entry.id;
    },

    updateMessage(id: string, message: MessageData) {
      const entry = history.find(
        (e): e is AgentHistoryMessageEntry =>
          e.type === "message" && e.id === id,
      );
      if (entry) {
        entry.data = message;
        notify();
      }
    },

    setHistory(entries: AgentHistoryEntry[]) {
      history.length = 0;
      history.push(...entries);
      notify();
    },

    getHistory(): ReadonlyArray<AgentHistoryEntry> {
      return history;
    },

    subscribe(listener: (history: AgentHistoryEntry[]) => void) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },

    addResource(resource: AgentContextResource) {
      resources.set(resource.key, resource);
    },

    removeResource(key: string) {
      resources.delete(key);
    },

    getResource(key: string) {
      return resources.get(key);
    },

    listResources(): AgentContextResource[] {
      return Array.from(resources.values());
    },

    getData(): AgentContext {
      return {
        history: [...history],
        resources: Array.from(resources.values()),
      };
    },

    getStats: (): AgentContextStats => {
      return {
        window: history.length,
        budget: resources.size,
        usage: resources.size,
        breakdown: {
          messages: history.filter(
            (e): e is AgentHistoryMessageEntry => e.type === "message",
          ).length,
          summaries: history.filter(
            (e): e is AgentHistorySummaryEntry => e.type === "summary",
          ).length,
          resources: resources.size,
        },
      };
    },

    summarize: async ({
      agent,
      model,
      maxLength = 1000,
    }: {
      agent: Agent;
      model: LanguageModel;
      maxLength?: number;
    }) => {
      if (history.length <= 1) return;

      // Find FUM (first user message)
      const fumIndex = history.findIndex(
        (e): e is AgentHistoryMessageEntry =>
          e.type === "message" && e.data?.role === "user",
      );
      if (fumIndex === -1) return;

      const fum = history[fumIndex] as AgentHistoryMessageEntry;
      const toSummarize = history.filter((_, i) => i !== fumIndex);
      if (toSummarize.length === 0) return;

      // Format the entries to summarize
      const parts: string[] = [];
      const summarizedMessageIds: string[] = [];

      for (const entry of toSummarize) {
        if (entry.type === "summary") {
          const summaryText = entry.content
            .filter((c) => c.type === "text")
            .map((c) => c.text)
            .join("\n");
          parts.push(`[Previous Summary]: ${summaryText}`);
          summarizedMessageIds.push(...entry.messageIds);
        } else {
          summarizedMessageIds.push(entry.id);
          const role = entry.data.role;
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

      const userMessageParts = await formatUserMessage(fum.data as UserMessageData, agent);
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

      const { text } = await model.generateText({
        messages: [{ role: "user", content: prompt }],
      });

      const summaryEntry: AgentHistorySummaryEntry = {
        type: "summary",
        messageIds: summarizedMessageIds,
        content: [{ type: "text", text: text.trim() }],
      };

      // Mutate history array directly
      history.length = 0;
      history.push(fum, summaryEntry);
      notify();
    },
  };
}
