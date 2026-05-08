import { chain, validate } from "@ubento/services.toolkit";
import { Router } from "express";
import z from "zod";
import { createMessage, listMessages } from "../entities/messages.js";
import {
  createThread,
  deleteThread,
  generateThreadTitle,
  getThread,
  listThreads,
  updateThread,
} from "../entities/threads.js";

const threadRouter: Router = Router();

threadRouter.get(
  "/",
  chain(
    validate({
      query: z.object({
        workspace_id: z.string().optional(),
        team_id: z.string().optional(),
        members: z.string().optional(),
        cursor: z.string().optional(),
        limit: z.coerce.number().optional(),
        sort: z.string().optional(),
      }),
    }),
    async (req, res) => {
      const result = await listThreads({
        cursor: req.query.cursor,
        limit: req.query.limit,
        workspace_id: req.query.workspace_id,
        team_id: req.query.team_id,
        members: req.query.members ? req.query.members.split(",") : undefined,
        sort: req.query.sort as any,
      });
      res.json(result);
    },
  ),
);

threadRouter.post(
  "/",
  chain(
    validate({
      body: z
        .object({
          title: z.string().optional(),
          team_id: z.string().optional(),
          workspace_id: z.string().optional(),
        })
        .refine((data) => data.team_id || data.workspace_id, {
          message: "team_id or workspace_id is required",
        }),
    }),
    async (req, res) => {
      const { title, workspace_id, team_id } = req.body;
      const newThread = await createThread({
        title,
        team_id,
        workspace_id,
      });
      res.status(201).json(newThread);
    },
  ),
);

threadRouter.get(
  "/:thread_id",
  chain(
    validate({
      params: z.object({
        thread_id: z.string(),
      }),
    }),
    async (req, res) => {
      const { thread_id } = req.params;
      const thread = await getThread(thread_id);
      if (!thread) {
        res.status(404).send("Thread not found");
        return;
      }
      res.json(thread);
    },
  ),
);

threadRouter.patch(
  "/:thread_id",
  chain(
    validate({
      params: z.object({
        thread_id: z.string(),
      }),
      body: z.object({
        title: z.string().optional(),
        metadata: z.record(z.string(), z.any()).optional(),
        context: z.record(z.string(), z.any()).optional(),
      }),
    }),
    async (req, res) => {
      const { thread_id } = req.params;
      const { title, metadata, context } = req.body;
      const updatedThread = await updateThread(thread_id, {
        title,
        metadata,
        context,
      });
      res.json(updatedThread);
    },
  ),
);

threadRouter.post(
  "/:thread_id/generate-title",
  chain(
    validate({
      params: z.object({
        thread_id: z.string(),
      }),
    }),
    async (req, res) => {
      const { thread_id } = req.params;
      const updatedThread = await generateThreadTitle(thread_id);
      res.json(updatedThread);
    },
  ),
);

threadRouter.delete(
  "/:thread_id",
  chain(
    validate({
      params: z.object({
        thread_id: z.string(),
      }),
    }),
    async (req, res) => {
      const { thread_id } = req.params;
      await deleteThread(thread_id);
      res.status(204).send();
    },
  ),
);

// Message

threadRouter.get(
  "/:thread_id/messages",
  chain(
    validate({
      params: z.object({
        thread_id: z.string(),
      }),
      query: z.object({
        cursor: z.string().optional(),
        limit: z.coerce.number().optional(),
        sort: z.string().optional(),
      }),
    }),
    async (req, res) => {
      const result = await listMessages({
        cursor: req.query.cursor,
        limit: req.query.limit,
        thread_id: req.params.thread_id,
        sort: req.query.sort as any,
      });
      res.json(result);
    },
  ),
);

threadRouter.post(
  "/:thread_id/messages",
  chain(
    validate({
      params: z.object({
        thread_id: z.string(),
      }),
      body: z.object({
        message: z.object({
          role: z.enum(["user", "agent"]),
          author: z.string().optional(), // Added optional author based on usage
          data: z.record(z.string(), z.any()),
        }),
      }),
    }),
    async (req, res) => {
      const { message } = req.body;
      const threadId = req.params.thread_id;

      const newMessage = await createMessage({
        threadId: threadId,
        role: message.role,
        author: message.author,
        data: message.data,
      });

      res.status(201).json(newMessage);
    },
  ),
);

export default threadRouter;
