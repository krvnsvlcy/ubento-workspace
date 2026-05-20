import { intelligenceClient } from "@ubento/services.sdk";
import {
  AgentMessageData,
  messageDataSchema,
  UserMessageData,
} from "@ubento/workspace.agent";
import { useMemo } from "react";
import { AgentMessage } from "./agent/agent_message";
import { UserMessage } from "./user/user_message";

export function CopilotMessage({
  message,
}: {
  message: intelligenceClient.Message;
}) {
  const role = message.role;
  const parsed = useMemo(
    () => messageDataSchema.safeParse(message.data),
    [message.data],
  );

  if (!parsed.success) {
    console.warn("Failed to parse message data", parsed.error, message.data);
    return null;
  }

  const data = parsed.data;

  if (role === "user") {
    return <UserMessage data={data as UserMessageData} />;
  }

  return <AgentMessage data={data as AgentMessageData} />;
}
