import { chain, toSerializable, validate } from "@ubento/service-toolkit";
import { Router } from "express";
import z from "zod";
import {
  deleteMessage,
  deleteMultipleMessages,
  getMessage,
  updateMessage,
} from "../entities/messages.js";

const messageRouter: Router = Router();

// Get a specific message
messageRouter.get(
  "/:message_id",
  chain(
    validate({
      params: z.object({
        message_id: z.string(),
      }),
    }),
    async (req, res) => {
      const { message_id } = req.params;
      const message = await getMessage(message_id);

      if (!message) {
        res.status(404).json({ error: "Message not found" });
        return;
      }

      res.json(toSerializable(message));
    }
  )
);

// Update a specific message
messageRouter.patch(
  "/:message_id",
  chain(
    validate({
      params: z.object({
        message_id: z.string(),
      }),
      body: z.object({
        data: z.record(z.string(), z.any()).optional(),
        error: z.string().optional(),
      }),
    }),
    async (req, res) => {
      const { message_id } = req.params;
      const { data, error } = req.body;

      const updatedMessage = await updateMessage(message_id, {
        data,
        error,
      });

      res.json(toSerializable(updatedMessage));
    }
  )
);

// Delete a specific message
messageRouter.delete(
  "/:message_id",
  chain(
    validate({
      params: z.object({
        message_id: z.string(),
      }),
    }),
    async (req, res) => {
      const { message_id } = req.params;
      await deleteMessage(message_id);
      res.status(204).send();
    }
  )
);

// Delete multiple messages
messageRouter.delete(
  "/",
  chain(
    validate({
      body: z.object({
        message_ids: z.array(z.string()),
      }),
    }),
    async (req, res) => {
      const { message_ids } = req.body;
      const deletedCount = await deleteMultipleMessages(message_ids);
      res.json({ deleted_count: deletedCount });
    }
  )
);

export default messageRouter;
