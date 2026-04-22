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
  getSession,
  listSessions,
  revokeSession,
} from "../../entities/auth/session.js";

const sessionsRouter: Router = Router();

// List Sessions
sessionsRouter.get(
  "/",
  chain(
    validate({
      query: z.object({
        user_id: z.string().optional(),
        limit: z.coerce.number().optional(),
        cursor: z.string().optional(),
      }),
    }),
    enforce(ubentoApi.permissions.identity.session.list),
    async (req, res) => {
      const { items, nextCursor } = await listSessions({
        user_id: req.query.user_id as string | undefined,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        cursor: req.query.cursor as string | undefined,
      });
      setNextLink(req, res, nextCursor);
      res.json(dataResponse(items));
    },
  ),
);

// Get Session
sessionsRouter.get(
  "/:id",
  chain(
    validate({
      params: z.object({
        id: z.string(),
      }),
    }),
    enforce(ubentoApi.permissions.identity.session.read),
    async (req, res) => {
      const session = await getSession(req.params.id);
      if (!session) {
        throw new NotFoundError("Session not found");
      }
      res.json(dataResponse(session));
    },
  ),
);

// Revoke Session
sessionsRouter.post(
  "/:id/revoke",
  chain(
    validate({
      params: z.object({
        id: z.string(),
      }),
    }),
    enforce(ubentoApi.permissions.identity.session.revoke),
    async (req, res) => {
      const session = await revokeSession(req.params.id);
      res.json(dataResponse(session));
    },
  ),
);

export default sessionsRouter;
