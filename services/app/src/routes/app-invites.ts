import { ubentoAuth } from "@ubento/primitives";
import {
  chain,
  dataResponse,
  enforce,
  setNextLink,
  validate,
} from "@ubento/service-toolkit";
import { Router } from "express";
import z from "zod";
import { getApp } from "../entities/app/app.js";
import {
  acceptAppInvite,
  createAppInvite,
  listAppInvites,
} from "../entities/app/invites.js";

const appInvitesRouter: Router = Router();

appInvitesRouter.get(
  "/:app_id",
  chain(
    validate({
      params: z.object({
        app_id: z.string(),
      }),
      query: z.object({
        limit: z.coerce.number().optional(),
        cursor: z.string().optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.roleAssignment.list],
      resource: async (req) => {
        const app_id = req.params.app_id as string;
        const app = await getApp(app_id);
        if (!app) return ubentoAuth.scopes.root;
        return ubentoAuth.scopes.appOrHigher({
          team_id: app.team_id,
          app_id: app.id,
        });
      },
    }),
    async (req, res) => {
      const app_id = req.params.app_id as string;
      const result = await listAppInvites({
        app_id,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        cursor: req.query.cursor as string | undefined,
      });
      setNextLink(req, res, result.nextCursor);
      res.json(dataResponse(result.items));
    },
  ),
);

appInvitesRouter.post(
  "/:app_id",
  chain(
    validate({
      params: z.object({
        app_id: z.string(),
      }),
      body: z.object({
        email: z.string().email(),
        role: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.roleAssignment.read],
      resource: async (req) => {
        const app_id = req.params.app_id as string;
        const app = await getApp(app_id);
        if (!app) return ubentoAuth.scopes.root;
        return ubentoAuth.scopes.appOrHigher({
          team_id: app.team_id,
          app_id: app.id,
        });
      },
    }),
    async (req, res) => {
      const app_id = req.params.app_id as string;
      const invitedBy = (req as any).auth?.subject || "system";
      const result = await createAppInvite({
        app_id,
        email: req.body.email,
        role: req.body.role,
        invited_by: invitedBy,
      });
      res.status(201).json(dataResponse(result));
    },
  ),
);

appInvitesRouter.post(
  "/:id/accept",
  chain(
    validate({
      params: z.object({
        id: z.string(),
      }),
      body: z.object({
        token: z.string(),
      }),
    }),
    async (req, res) => {
      const acceptedBy = (req as any).auth?.subject;
      if (!acceptedBy) return res.status(401).send("Not authenticated");

      const result = await acceptAppInvite({
        id: req.params.id as string,
        token: req.body.token,
        accepted_by: acceptedBy,
      });
      res.json(dataResponse(result));
    },
  ),
);

export default appInvitesRouter;
