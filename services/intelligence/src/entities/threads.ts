import { Prisma, Thread } from "@ubento/services.database/intelligence";
import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/services.primitives";
import {
  NotFoundError,
  prismaListWithCursor,
  ValidationError,
} from "@ubento/services.toolkit";
import { generateText, Output } from "ai";
import z from "zod";
import { eventPublisher } from "../event.js";
import { bento } from "../libs/bento.js";
import prisma from "../prisma.js";

export enum ThreadStatus {
  IDLE = "idle",
  PAUSED = "paused",
  ACTIVE = "active",
}

export async function listThreads({
  workspace_id,
  members,
  limit,
  cursor,
  sort,
}: {
  workspace_id?: string;
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
  workspace_id,
  title,
}: {
  workspace_id: string;
  title?: string;
}): Promise<Thread> {
  const workspace = await bento.workspace.getWorkspace(workspace_id);
  if (!workspace) {
    throw new NotFoundError(`workspace (${workspace_id})`);
  }

  const newThread = await prisma.thread.create({
    data: {
      id: makeEntityId({
        code: ubentoEntities.intelligenceThread.code,
        bareId: generateBareId(),
      }),
      workspace_id: workspace.id,
      organization_id: workspace.team_id,
      title,
      status: ThreadStatus.IDLE,
    },
  });

  eventPublisher.publishEntity("created", newThread);
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

  eventPublisher.publishEntity("updated", updatedThread);
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

export async function activateThread(thread_id: string): Promise<Thread> {
  let updatedThread: Thread;
  try {
    updatedThread = await prisma.thread.update({
      where: {
        id: thread_id,
        status: {
          in: [ThreadStatus.IDLE, ThreadStatus.PAUSED],
        },
      },
      data: {
        status: ThreadStatus.ACTIVE,
      },
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      throw new ValidationError(
        `Thread with ID ${thread_id} is not in IDLE or PAUSED status or does not exist.`,
      );
    } else {
      throw err; // Re-throw other errors
    }
  }

  eventPublisher.publishEntity("updated", updatedThread);
  return updatedThread;
}

export async function pauseThread(thread_id: string): Promise<Thread> {
  return prisma.$transaction(async (tx: any) => {
    const thread = await tx.thread.findUnique({
      where: { id: thread_id },
    });
    if (!thread) {
      throw new NotFoundError(`Thread with ID ${thread_id} not found.`);
    }

    if (
      thread.status === ThreadStatus.PAUSED ||
      thread.status === ThreadStatus.IDLE
    ) {
      return thread;
    } else {
      const thread = await tx.thread.update({
        where: { id: thread_id },
        data: { status: ThreadStatus.PAUSED },
      });

      eventPublisher.publishEntity("updated", thread);
      return thread;
    }
  });
}

export async function deactivateThread(thread_id: string): Promise<Thread> {
  let updatedThread: Thread;
  try {
    updatedThread = await prisma.thread.update({
      where: { id: thread_id },
      data: {
        status: ThreadStatus.IDLE,
      },
    });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      throw new NotFoundError(`Thread with ID ${thread_id} does not exist.`);
    } else {
      throw err; // Re-throw other errors
    }
  }

  eventPublisher.publishEntity("updated", updatedThread);
  return updatedThread;
}

export async function deleteThread(thread_id: string): Promise<Thread> {
  const deletedThread = await prisma.thread.delete({
    where: { id: thread_id },
  });

  eventPublisher.publishEntity("deleted", deletedThread);
  return deletedThread;
}
