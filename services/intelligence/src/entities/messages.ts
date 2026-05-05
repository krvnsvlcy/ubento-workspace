import { Message } from "@ubento/services.database/intelligence";
import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/services.primitives";
import { prismaListWithCursor } from "@ubento/services.toolkit";
import { eventPublisher } from "../event.js";
import prisma from "../prisma.js";
import { updateThread } from "./threads.js";

export async function listMessages({
  thread_id,
  limit,
  cursor,
  sort,
}: {
  thread_id?: string;
  limit?: number;
  cursor?: string;
  sort?: "newest" | "oldest";
}) {
  const orderBy =
    sort === "oldest"
      ? [{ created_at: "asc" }, { id: "asc" }]
      : /* default newest */ [{ created_at: "desc" }, { id: "desc" }];

  return prismaListWithCursor(prisma.message, {
    limit,
    cursor,
    orderBy,
    where: { ...(thread_id && { thread_id }) },
    resolveCursor: (m) => ({ id: m.id }),
  });
}

export async function createMessage({
  threadId,
  role,
  author,
  data,
}: {
  threadId: string;
  role: "user" | "agent";
  author?: string;
  data: any;
}): Promise<Message> {
  const thread = await prisma.thread.findUnique({
    where: { id: threadId },
  });
  if (!thread) {
    throw new Error(`Thread with id ${threadId} not found`);
  }
  const message = await prisma.message.create({
    data: {
      id: makeEntityId({
        code: ubentoEntities.intelligenceMessage.code,
        bareId: generateBareId(),
      }),
      thread_id: thread.id,
      organization_id: thread.organization_id,
      workspace_id: thread.workspace_id,
      role,
      author,
      data,
    },
  });

  eventPublisher.publishEntity("created", message);
  updateThread(threadId, {
    last_message_at: new Date(),
  }).catch((e) => {
    console.error("Failed to update thread last_message_at", e);
  });

  return message;
}

export async function getMessage(messageId: string): Promise<Message | null> {
  return prisma.message.findUnique({
    where: { id: messageId },
  });
}

export async function updateMessage(
  messageId: string,
  updates: {
    data?: any;
    error?: string;
  },
): Promise<Message> {
  const message = await prisma.message.update({
    where: { id: messageId },
    data: updates,
  });

  eventPublisher.publishEntity("updated", message);
  return message;
}

export async function deleteMessage(messageId: string): Promise<Message> {
  const message = await prisma.message.delete({
    where: { id: messageId },
  });

  eventPublisher.publishEntity("deleted", message);
  return message;
}

export async function deleteMultipleMessages(
  messageIds: string[],
): Promise<number> {
  const { count } = await prisma.message.deleteMany({
    where: {
      id: {
        in: messageIds,
      },
    },
  });

  // Publish delete events for each message (we can't get the deleted messages back)
  messageIds.forEach((id) => {
    eventPublisher.publishEntity("deleted", { id } as Message);
  });

  return count;
}
