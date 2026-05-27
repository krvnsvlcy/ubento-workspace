import { Agent } from "@/agent/agent.js";
import {
  AgentActionData,
  AgentError,
  AgentMessageData,
  UserMessageData,
} from "@/message/types";
import { indent, renderYaml } from "@/utils/format";
import { llmContentToText } from "@/utils/llm";
import { MessageItem } from "@/utils/ui";
import { MessagePart } from "./types.js";

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

  return [...parts, { type: "text", text: "\n\n" }];
}
function formatAction(action: AgentActionData, options?: { compressOutputs?: boolean }): string {
  let outputText = llmContentToText(action.output);
  if (options?.compressOutputs && outputText.length > 500) {
    const originalLength = outputText.length;
    outputText = `[Output truncated - ${originalLength} characters. Preview: ${outputText.slice(0, 200)}... (truncated)]`;
  }
  return [
    `**Action: ${action.tool}**`,
    `  - status: ${action.status}`,
    `  - input:\n${indent(renderYaml(action.input), 4)}`,
    `  - output:\n${indent(outputText, 4)}`,
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
  options?: { isLast?: boolean; compressOutputs?: boolean },
): string {
  let actionsText = "";
  if (message.actions?.length) {
    const lastIndex = message.actions.length - 1;
    const failedTools: string[] = [];

    const formattedEvents = message.actions.map((action, index) => {
      if (action.status === "failed") {
        failedTools.push(action.tool);
      }

      if (action.error) {
        const errText = formatError(action.error);
        const isLastEvent = index === lastIndex;

        if (isLastEvent && options?.isLast && failedTools.length === 0) {
          return [
            "### Error",
            "The following error occurred in the last iteration, fix it before proceeding.",
            errText,
          ].join("\n\n");
        }

        return errText;
      }

      return formatAction(action, { compressOutputs: options?.compressOutputs });
    });

    actionsText = formattedEvents
      .filter(Boolean)
      .map((text) => {
        const indented = indent(text!, 2);
        return `- ${indented.slice(2)}`;
      })
      .join("\n")
      .trim();

    if (options?.isLast && failedTools.length > 0) {
      const uniqueTools = Array.from(new Set(failedTools));
      const toolsString = uniqueTools.map((t) => `\\\`${t}\\\``).join(", ");

      actionsText += [
        "",
        "**Attention Required**",
        `The following actions failed in your last turn: ${toolsString}. Please fix them before you continue.`,
      ].join("\n");
    }
  } else {
    actionsText = "No action taken.";
  }

  let errorText = "";
  if (message.error) {
    errorText = formatError(message.error);
  }

  const parts: string[] = [];
  if (actionsText) parts.push(actionsText);
  if (errorText) parts.push(errorText);

  return parts.join("\n\n") + "\n\n";
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
