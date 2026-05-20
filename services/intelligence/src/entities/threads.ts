import { Thread } from "@ubento/services.database/intelligence";
import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/services.primitives";
import { NotFoundError, prismaListWithCursor } from "@ubento/services.toolkit";
import { generateText, Output } from "ai";
import z from "zod";
import { ubento } from "../libs/bento.js";
import prisma from "../prisma.js";

export enum ThreadStatus {
  IDLE = "idle",
  PAUSED = "paused",
  ACTIVE = "active",
}

export async function listThreads({
  workspace_id,
  team_id,
  members,
  limit,
  cursor,
  sort,
}: {
  workspace_id?: string;
  team_id?: string;
  members?: string[];
  limit?: number;
  cursor?: string;
  sort?: "recent" | "newest" | "id";
}) {
  const orderBy =
    sort === "id"
      ? [{ id: "asc" }]
      : sort === "newest"
        ? [{ created_at: "desc" }, { id: "desc" }]
        : /* default recent */ [{ updated_at: "desc" }, { id: "desc" }];

  return prismaListWithCursor(prisma.thread, {
    limit,
    cursor,
    orderBy,
    where: {
      ...(workspace_id && { workspace_id }),
      ...(team_id && { team_id }),
      ...(members?.length ? { members: { hasEvery: members } } : {}),
    },
    resolveCursor: (t) => ({ id: t.id }),
  });
}

export async function getThread(thread_id: string) {
  const thread = await prisma.thread.findUnique({
    where: { id: thread_id },
  });
  return thread;
}

export async function createThread({
  team_id,
  workspace_id,
  title,
}: {
  team_id?: string;
  workspace_id?: string;
  title?: string;
}): Promise<Thread> {
  if (!team_id && !workspace_id) {
    throw new Error("team_id or workspace_id is required");
  }

  let resolvedTeamId = team_id;
  if (!resolvedTeamId && workspace_id) {
    const workspace = await ubento.workspace.getWorkspace(workspace_id);
    resolvedTeamId = workspace.team_id;
  }

  const newThread = await prisma.thread.create({
    data: {
      id: makeEntityId({
        code: ubentoEntities.intelligenceThread.code,
        bareId: generateBareId(),
      }),
      workspace_id: workspace_id ?? null,
      team_id: resolvedTeamId!,
      title,
    },
  });

  return newThread;
}

export async function updateThread(
  thread_id: string,
  updates: {
    title?: string;
    metadata?: Record<string, any>;
    context?: any;
    last_message_at?: Date;
  },
): Promise<Thread> {
  const updatedThread = await prisma.thread.update({
    where: { id: thread_id },
    data: updates,
  });

  return updatedThread;
}

export async function generateTitleFromContext(context: any): Promise<string> {
  const prompt = [
    "The following is a conversation between an AI assistant and a user in a Visual IDE.",
    "Generate a title for the following context.",
    "Context: ",
    JSON.stringify(context),
  ].join("\n");

  const { output } = await generateText({
    model: "google/gemini-3-flash",
    output: Output.object({
      schema: z.object({
        title: z.string(),
      }),
    }),
    prompt,
  });

  return output.title;
}

export async function generateThreadTitle(thread_id: string): Promise<Thread> {
  const thread = await getThread(thread_id);
  if (!thread) {
    throw new NotFoundError(`Thread with ID ${thread_id} not found.`);
  }

  const context = thread.context;
  const title = await generateTitleFromContext(context);
  return updateThread(thread_id, { title });
}

export async function deleteThread(thread_id: string): Promise<Thread> {
  const deletedThread = await prisma.thread.delete({
    where: { id: thread_id },
  });

  return deletedThread;
}
