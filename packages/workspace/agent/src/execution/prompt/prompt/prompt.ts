import { Agent } from "@/agent/agent.js";
import {
  AgentContextData,
  AgentContextResource,
  AgentHistoryEntry,
} from "@/context/types";
import { AgentEnvironment } from "@/environment/environment";
import { AgentMessageData, UserMessageData } from "@/message/types";
import { indent, renderYaml } from "@/utils/format.js";
import { formatAgentMessage, formatUserMessage } from "./format.js";
import { MessagePart } from "./types.js";

export * from "./format.js";
export * from "./types.js";

function splitHistory(history: AgentHistoryEntry[]) {
  const historyCopy = [...history];
  let lastUserMessage: UserMessageData | undefined;
  const currentProgress: AgentHistoryEntry[] = [];

  while (historyCopy.length > 0) {
    const entry = historyCopy.pop();
    if (!entry) {
      break;
    }
    if (entry.type === "message" && (entry as any).data?.role === "user") {
      lastUserMessage = entry.data as UserMessageData;
      break;
    }
    currentProgress.unshift(entry);
  }

  return {
    historyBefore: historyCopy,
    lastUserMessage,
    currentProgress,
  };
}

async function buildHistorySection(
  history: AgentHistoryEntry[],
  agent: Agent,
): Promise<MessagePart[]> {
  const parts: MessagePart[] = [];
  if (history.length === 0) return parts;

  parts.push({ type: "text", text: "# History\n" });
  parts.push({
    type: "text",
    text: "Your conversation so far with the user\n\n",
  });

  for (const entry of history) {
    if (entry.type === "summary") {
      const summaryText =
        (entry.content as any[])
          ?.filter((c) => c.type === "text")
          .map((c) => c.text)
          .join("\n") || "";
      parts.push({
        type: "text",
        text: `**summary**\n${summaryText}`,
      });
    } else {
      const role = (entry as any).data?.role || "user";
      parts.push({ type: "text", text: `**${role}**\n` });
      if (role === "user") {
        const userParts = await formatUserMessage(
          entry.data as unknown as UserMessageData,
          agent,
        );
        parts.push(...userParts);
      } else {
        const agentText = formatAgentMessage(
          (entry as any).data as unknown as AgentMessageData,
          { compressOutputs: true },
        );
        parts.push({ type: "text", text: agentText });
      }
    }
  }

  return parts;
}

async function buildLastUserMessageSection(
  message: UserMessageData,
  agent: Agent,
): Promise<MessagePart[]> {
  const parts: MessagePart[] = [];
  parts.push({ type: "text", text: "\n\n**Last User Message**\n" });
  const userParts = await formatUserMessage(message, agent);
  parts.push(...userParts);
  return parts;
}

async function buildCurrentProgressSection(
  progress: AgentHistoryEntry[],
  agent: Agent,
): Promise<MessagePart[]> {
  const parts: MessagePart[] = [];
  if (progress.length === 0) return parts;

  parts.push({ type: "text", text: "\n\n**Your Current Progress**\n" });

  for (let i = 0; i < progress.length; i++) {
    const entry = progress[i];
    const isLastEntry = i === progress.length - 1;
    const entryType = (entry as any).type || "message";

    if (entryType === "summary") {
      const summaryText =
        ((entry as any).content as any[])
          ?.filter((c) => c.type === "text")
          .map((c) => c.text)
          .join("\n") || "";
      parts.push({
        type: "text",
        text: `\n\n**summary**\n\n${summaryText}\n\n`,
      });
      continue;
    }

    const role = (entry as any).data?.role || "user";
    parts.push({ type: "text", text: `\n\n**${role}**\n\n` });
    if (role === "user") {
      const userParts = await formatUserMessage(
        (entry as any).data as unknown as UserMessageData,
        agent,
      );
      parts.push(...userParts);
    } else {
      const agentText = formatAgentMessage(
        (entry as any).data as unknown as AgentMessageData,
        { isLast: isLastEntry, compressOutputs: !isLastEntry },
      );
      parts.push({ type: "text", text: agentText });
    }
  }

  return parts;
}

async function buildResourcesSection(
  resources: AgentContextResource[],
  environment: AgentEnvironment,
): Promise<MessagePart[]> {
  const parts: MessagePart[] = [];
  if (!resources || resources.length === 0) return parts;

  parts.push({ type: "text", text: "\n\n# Context Resources\n" });

  for (const resource of resources) {
    const resourceType = environment.getResourceType(resource.type);
    const resolveData =
      (await resourceType?.resolveData?.({
        key: resource.key,
        data: resource.data,
        environment,
      })) || resource.data;
    parts.push({
      type: "text",
      text: `\n- **${resource.label}**\n${indent(renderYaml(resolveData), 4)}\n`,
    });
  }

  return parts;
}

function consolidateMessageParts(parts: MessagePart[]): MessagePart[] {
  const consolidated: MessagePart[] = [];
  let lastPart: MessagePart | undefined;
  for (const part of parts) {
    if (part.type === "text" && lastPart?.type === "text") {
      lastPart.text += part.text;
    } else {
      const newPart = { ...part };
      consolidated.push(newPart);
      lastPart = newPart;
    }
  }
  return consolidated;
}

export const buildAgentOrchestratorPrompt = async ({
  context,
  environment,
  agent,
}: {
  context: AgentContextData;
  environment: AgentEnvironment;
  agent: Agent;
}): Promise<MessagePart[]> => {
  const { historyBefore, lastUserMessage, currentProgress } = splitHistory(
    context.history || [],
  );

  const parts: MessagePart[] = [];

  parts.push(...(await buildHistorySection(historyBefore, agent)));

  if (lastUserMessage) {
    parts.push(...(await buildLastUserMessageSection(lastUserMessage, agent)));
  }

  parts.push(...(await buildCurrentProgressSection(currentProgress, agent)));

  parts.push(
    ...(await buildResourcesSection(context.resources || [], environment)),
  );

  return consolidateMessageParts(parts);
};
