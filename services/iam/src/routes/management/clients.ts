import { ubentoAuth } from "@ubento/services.primitives";
import {
  chain,
  dataResponse,
  enforce,
  makeCursorPageResponse,
  NotFoundError,
  validate,
} from "@ubento/services.toolkit";
import { Router } from "express";
import z from "zod";
import {
  createClient,
  deleteClient,
  getClient,
  listClients,
} from "../../entities/management/client/client.js";

const clientsRouter: Router = Router();

// List Clients
clientsRouter.get(
  "/",
  chain(enforce(ubentoAuth.actions.client.list), async (req, res) => {
    const result = await listClients({
      limit: req.query.limit ? Number(req.query.limit) : undefined,
      cursor: req.query.cursor as string | undefined,
    });
    res.json(makeCursorPageResponse(result));
  }),
);

// Create Client
clientsRouter.post(
  "/",
  chain(
    validate({
      body: z.object({
        name: z.string(),
        description: z.string().optional(),
      }),
    }),
    enforce(ubentoAuth.actions.client.create),
    async (req, res) => {
      const client = await createClient({
        name: req.body.name,
        description: req.body.description,
      });
      res.status(201).json(dataResponse(client));
    },
  ),
);

// Get Client
clientsRouter.get(
  "/:id",
  chain(
    validate({
      params: z.object({
        id: z.string(),
      }),
    }),
    enforce(ubentoAuth.actions.client.read),
    async (req, res) => {
      const client = await getClient(req.params.id);
      if (!client) throw new NotFoundError("Client not found");
      res.json(dataResponse(client));
    },
  ),
);

// Delete Client
clientsRouter.delete(
  "/:id",
  chain(
    validate({
      params: z.object({
        id: z.string(),
      }),
    }),
    enforce(ubentoAuth.actions.client.delete),
    async (req, res) => {
      await deleteClient(req.params.id);
      res.json(dataResponse({ success: true }));
    },
  ),
);

export default clientsRouter;
