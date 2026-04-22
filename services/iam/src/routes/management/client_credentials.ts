import { ubentoApi } from "@ubento/primitives";
import {
  chain,
  dataResponse,
  enforce,
  NotFoundError,
  setNextLink,
  validate,
} from "@ubento/service-toolkit";
import { Router } from "express";
import z from "zod";
import {
  createClientCredential,
  listClientCredentials,
  revokeClientCredential,
} from "../../entities/management/client/credentials.js";

const clientCredentialsRouter: Router = Router({ mergeParams: true });

// Create Credential
clientCredentialsRouter.post(
  "/",
  chain(
    validate({
      body: z.object({
        client_id: z.string(),
        label: z.string().optional(),
      }),
    }),
    enforce(ubentoApi.permissions.identity.clientCredential.create),
    async (req, res) => {
      const cred = await createClientCredential({
        clientId: req.body.client_id,
        label: req.body.label,
      });
      res.status(201).json(dataResponse(cred));
    },
  ),
);

// List Credentials
clientCredentialsRouter.get(
  "/",
  chain(
    validate({
      query: z.object({
        client_id: z.string().optional(),
        limit: z.coerce.number().optional(),
        cursor: z.string().optional(),
      }),
    }),
    enforce(ubentoApi.permissions.identity.clientCredential.list),
    async (req, res) => {
      const clientId =
        (req.params as any).client_id || (req.query.client_id as string);
      if (!clientId) {
        throw new NotFoundError("Missing client_id");
      }
      const { items, nextCursor } = await listClientCredentials({
        client_id: clientId,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        cursor: req.query.cursor as string | undefined,
      });
      setNextLink(req, res, nextCursor);
      res.json(dataResponse(items));
    },
  ),
);

// Revoke Credential
clientCredentialsRouter.delete(
  "/:id",
  chain(
    validate({
      params: z.object({
        id: z.string(),
      }),
    }),
    enforce(ubentoApi.permissions.identity.clientCredential.delete),
    async (req, res) => {
      await revokeClientCredential(req.params.id);
      res.json(dataResponse({ success: true }));
    },
  ),
);

export default clientCredentialsRouter;
