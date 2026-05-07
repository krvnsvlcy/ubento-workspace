import { MessageData } from "../message/types.js";
import { AgentContextStats } from "./stats.js";
import {
  AgentContext,
  AgentContextResource,
  AgentHistoryEntry,
  AgentHistoryMessageEntry,
  AgentHistorySummaryEntry,
} from "./types.js";

export function createAgentContext({
  data,
}: { data?: Partial<AgentContext> } = {}) {
  const history: AgentHistoryEntry[] = data?.history ?? [];
  const resources = new Map<string, AgentContextResource>(
    data?.resources?.map((r) => [r.key, r]) ?? [],
  );

  return {
    pushMessage(message: MessageData) {
      const entry: AgentHistoryMessageEntry = {
        type: "message",
        id: crypto.randomUUID(),
        data: message,
      };
      history.push(entry);
      return entry.id;
    },

    getHistory(): ReadonlyArray<AgentHistoryEntry> {
      return history;
    },

    summarizeHistory({
      content,
      messageIds,
    }: {
      content: AgentHistorySummaryEntry["content"];
      messageIds?: string[];
    }) {
      const ids =
        messageIds ??
        history
          .filter((e): e is AgentHistoryMessageEntry => e.type === "message")
          .map((e) => e.id);

      const entry: AgentHistorySummaryEntry = {
        type: "summary",
        messageIds: ids,
        content,
      };
      history.push(entry);
      return entry;
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

    summarize: async () => {},
  };
}
