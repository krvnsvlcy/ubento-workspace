import { AgentContext, AgentHistoryEntry } from "@/context/types";
import { AgentEnvironment } from "@/environment/environment";
import {
  AgentActionData,
  AgentError,
  AgentMessageData,
  UserMessageData,
} from "@/message/types";
import { indent, renderYaml } from "@/utils/format";
import { llmContentToText } from "@/utils/llm";
import { MessageItem } from "@/utils/ui";
import { Agent } from "@/agent/agent.js";

export interface TextPart {
  type: "text";
  text: string;
}

export interface ImagePart {
  type: "image";
  image: string | Uint8Array | ArrayBuffer | URL;
  mediaType?: string;
}

export interface FilePart {
  type: "file";
  data: string | Uint8Array | ArrayBuffer | URL;
  mediaType?: string;
}

export type MessagePart = TextPart | ImagePart | FilePart;

export async function formatUserMessage(
  message: UserMessageData,
  agent: Agent,
): Promise<MessagePart[]> {
  const parts: MessagePart[] = [];

  if (message.text) {
    parts.push({
      type: "text",
      text: `- Message:  \n${indent(message.text, 2)}\n`,
    });
  }

  if (message.attachments && message.attachments.length > 0) {
    parts.push({ type: "text", text: "- Attachments:\n" });
    for (const attachment of message.attachments) {
      parts.push({
        type: "text",
        text: `  - ${attachment.type}:\n${indent(renderYaml(attachment.data), 4)}\n`,
      });
    }
  }

  return parts;
}
function formatAction(action: AgentActionData): string {
  return [
    `**Action: ${action.tool}**`,
    `  - status: ${action.status}`,
    `  - input:\n${indent(renderYaml(action.input), 4)}`,
    `  - output:\n${indent(llmContentToText(action.output), 4)}`,
  ].join("\n");
}
function formatError(error: AgentError): string {
  return [
    `**Error: ${error.message}**`,
    indent(error.data ? renderYaml(error.data) : "", 2),
  ].join("\n");
}

export function formatAgentMessage(
  message: AgentMessageData,
  options?: { isLast?: boolean },
): string {
  if (!message.actions?.length) {
    return "No action taken.";
  }

  const lastIndex = message.actions.length - 1;
  const failedTools: string[] = [];

  const formattedEvents = message.actions.map((action, index) => {
    // Track tools that failed during this specific turn
    if (action.status === "failed") {
      failedTools.push(action.tool);
    }

    if (action.error) {
      const errorText = formatError(action.error);
      const isLastEvent = index === lastIndex;

      // Keep standard error highlighting if it's just a generic event error
      if (isLastEvent && options?.isLast && failedTools.length === 0) {
        return [
          "### Error",
          "The following error occurred in the last iteration, fix it before proceeding.",
          errorText,
        ].join("\n\n");
      }

      return errorText;
    }

    return formatAction(action);
  });

  let outputText = formattedEvents
    .filter(Boolean)
    .map((text) => {
      const indented = indent(text!, 2);
      return `- ${indented.slice(2)}`;
    })
    .join("\n")
    .trim();

  // Append the explicit warning if this is the last message and actions failed
  if (options?.isLast && failedTools.length > 0) {
    const uniqueTools = Array.from(new Set(failedTools));
    const toolsString = uniqueTools.map((t) => `\\\`${t}\\\``).join(", ");

    outputText += [
      "",
      "**Attention Required**",
      `The following actions failed in your last turn: ${toolsString}. Please fix them before you continue.`,
    ].join("\n");
  }

  return outputText;
}

export function messagePartsToMarkdown(parts: MessagePart[]): string {
  return parts
    .map((part) => {
      if (part.type === "text") {
        return part.text;
      }

      if (part.type === "image" || part.type === "file") {
        const isImage = part.type === "image";
        const content = isImage ? part.image : part.data;
        const mimeType =
          (part as any).mimeType ||
          (isImage ? "image/png" : "application/octet-stream");

        let url: string;

        if (typeof content === "string") {
          url = content;
        } else {
          // Browser-friendly way to convert ArrayBuffer/Uint8Array to Base64
          const uint8Array = new Uint8Array(content as ArrayBuffer);
          let binary = "";
          for (let i = 0; i < uint8Array.byteLength; i++) {
            binary += String.fromCharCode(uint8Array[i]);
          }
          url = `data:${mimeType};base64,${btoa(binary)}`;
        }

        return isImage ? `![image](${url})` : `[file](${url})`;
      }

      return "";
    })
    .join("");
}

export function messageItemToMessagePart(item: MessageItem): MessagePart {
  switch (item.type) {
    case "image":
      return {
        type: "image",
        image: item.url,
        mediaType: item.mediaType,
      };
    case "file":
      return {
        type: "file",
        data: item.url,
        mediaType: item.mediaType,
      };
    case "data":
      return {
        type: "text",
        text: renderYaml(item.data),
      };
    case "text":
      return {
        type: "text",
        text: item.text,
      };
  }
}

export function indentMessagePart(part: MessagePart, n: number): MessagePart {
  switch (part.type) {
    case "text":
      return {
        type: "text",
        text: indent(part.text, n),
      };
    default:
      return part;
  }
}

export const buildAgentOrchestratorPrompt = async ({
  context,
  environment,
  agent,
}: {
  context: AgentContext;
  environment: AgentEnvironment;
  agent: Agent;
}): Promise<MessagePart[]> => {
  const history = [...(context.history || [])];
  let lastUserMessage: UserMessageData | undefined;
  const currentProgress: AgentHistoryEntry[] = [];

  while (history.length > 0) {
    const entry = history.pop();
    if (!entry) {
      break;
    }
    if (entry.type === "message" && (entry as any).data?.role === "user") {
      lastUserMessage = entry.data as UserMessageData;
      break;
    }
    currentProgress.unshift(entry);
  }

  const parts: MessagePart[] = [];

  if (history.length > 0) {
    parts.push({ type: "text", text: "# History\n" });
    parts.push({
      type: "text",
      text: "You conversation so far with the user\n\n",
    });

    for (const entry of history) {
      if (entry.type === "summary") {
        const summaryText = (entry.content as any[])?.filter(c => c.type === "text").map(c => c.text).join("\n") || "";
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
          );
          parts.push({ type: "text", text: agentText });
        }
      }
    }
  }

  if (lastUserMessage) {
    parts.push({ type: "text", text: "\n\n**Last User Message**\n" });
    const userParts = await formatUserMessage(lastUserMessage, agent);
    parts.push(...userParts);
  }

  if (currentProgress.length > 0) {
    parts.push({ type: "text", text: "\n\n**Your Current Progress**\n" });

    for (let i = 0; i < currentProgress.length; i++) {
      const entry = currentProgress[i];
      const isLastEntry = i === currentProgress.length - 1;
      const entryType = (entry as any).type || "message";

      if (entryType === "summary") {
        const summaryText = ((entry as any).content as any[])?.filter(c => c.type === "text").map(c => c.text).join("\n") || "";
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
          { isLast: isLastEntry },
        );
        parts.push({ type: "text", text: agentText });
      }
    }
  }

  if (context.resources && context.resources.length > 0) {
    parts.push({ type: "text", text: "\n\n# Context Resources\n" });

    for (const resource of context.resources) {
      parts.push({
        type: "text",
        text: `\n- **${resource.type}:${resource.key}**\n${indent(renderYaml(resource.data), 2)}\n`,
      });
    }
  }

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
};
