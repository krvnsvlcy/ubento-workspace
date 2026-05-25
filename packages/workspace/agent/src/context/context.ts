import { Agent } from "../agent/agent.js";
import {
  formatAgentMessage,
  formatUserMessage,
} from "../execution/prompt/prompt/prompt.js";
import {
  AgentMessageData,
  MessageData,
  UserMessageData,
} from "../message/types.js";
import { LanguageModel } from "../utils/models.js";
import { ResourceType } from "./resource.js";
import { AgentContextStats } from "./stats.js";
import {
  AgentContextData,
  AgentContextResource,
  AgentHistoryMessageEntry,
  AgentHistorySummaryEntry,
} from "./types.js";

export function createAgentContext({
  data,
  save,
}: {
  data?: Partial<AgentContextData>;
  save?: (data: AgentContextData) => Promise<void>;
}) {
  const historyEntries: Array<AgentHistorySummaryEntry | string> = [];
  const messages = new Map<string, AgentHistoryMessageEntry>();

  for (const entry of data?.history || []) {
    if (entry.type === "message") {
      messages.set(entry.id, entry);
      historyEntries.push(entry.id);
    } else {
      historyEntries.push(entry);
    }
  }

  const resources = new Map<string, AgentContextResource>(
    (data?.resources || []).map((r) => [r.key, r]),
  );
  let response = data?.response;

  function getData(): AgentContextData {
    return {
      history: historyEntries.map((e) => {
        if (typeof e === "string") {
          const entry = messages.get(e);
          if (!entry) {
            throw new Error(`No history entry found for id ${e}`);
          }
          return entry;
        }
        return e;
      }),
      resources: Array.from(resources.values()),
      response,
    };
  }

  return {
    getData,
    getResponse() {
      return response;
    },
    async setResponse(value: string) {
      response = value;
      await save?.(getData());
    },
    async writeMessage(id: string, message: MessageData) {
      if (messages.has(id)) {
        messages.get(id)!.data = message;
      } else {
        const entry: AgentHistoryMessageEntry = {
          type: "message",
          id,
          data: message,
        };
        historyEntries.push(id);
        messages.set(id, entry);
      }
      await save?.(getData());
    },

    async addResource<T extends ResourceType<any, any>>(
      resource: AgentContextResource<
        T["type"],
        Parameters<T["resolveData"]>[0]["data"]
      >,
    ) {
      resources.set(resource.key, resource);
      await save?.(getData());
    },
    async removeResource(key: string) {
      resources.delete(key);
      await save?.(getData());
    },

    getResource(key: string) {
      return resources.get(key);
    },
    listResources(): AgentContextResource[] {
      return Array.from(resources.values());
    },

    getStats: (): AgentContextStats => {
      return {
        window: historyEntries.length,
        budget: data?.budget || 0,
        usage: historyEntries.length,
        breakdown: {
          messages: messages.size,
          summaries: historyEntries.filter((e) => typeof e !== "string").length,
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
      const history = getData().history || [];
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

      const { text } = await model.generateText({
        messages: [{ role: "user", content: prompt }],
      });

      const summaryEntry: AgentHistorySummaryEntry = {
        type: "summary",
        messageIds: summarizedMessageIds,
        content: [{ type: "text", text: text.trim() }],
      };

      // Reset history entries and messages
      historyEntries.length = 0;
      messages.clear();

      // Restore FUM and Summary
      messages.set(fum.id, fum);
      historyEntries.push(fum.id, summaryEntry);

      await save?.(getData());
    },
  };
}
