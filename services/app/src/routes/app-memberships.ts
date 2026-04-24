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
  addMemberToApp,
  getAppMembership,
  listAppMemberships,
  removeMemberFromApp,
} from "../entities/app/memberships.js";

const appMembershipsRouter: Router = Router();

// List App Memberships
appMembershipsRouter.get(
  "/",
  chain(
    validate({
      query: z.object({
        app_id: z.string().optional(),
        user_id: z.string().optional(),
        limit: z.coerce.number().optional(),
        cursor: z.string().optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.roleAssignment.list],
      resource: async (req) => {
        if (req.query.app_id) {
          const app = await getApp(req.query.app_id as string);
          if (app) {
            return ubentoAuth.scopes.appOrHigher({
              team_id: app.team_id,
              app_id: app.id,
            });
          }
        }
        return ubentoAuth.scopes.root;
      },
    }),
    async (req, res) => {
      const result = await listAppMemberships({
        app_id: req.query.app_id as string | undefined,
        user_id: req.query.user_id as string | undefined,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        cursor: req.query.cursor as string | undefined,
      });
      setNextLink(req, res, result.nextCursor);
      res.json(dataResponse(result.items));
    },
  ),
);

// Create App Membership
appMembershipsRouter.post(
  "/",
  chain(
    validate({
      body: z.object({
        app_id: z.string(),
        user_id: z.string(),
        role: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.roleAssignment.create],
      resource: async (req) => {
        const app = await getApp(req.body.app_id);
        if (!app) return ubentoAuth.scopes.root;
        return ubentoAuth.scopes.appOrHigher({
          team_id: app.team_id,
          app_id: app.id,
        });
      },
    }),
    async (req, res) => {
      const membership = await addMemberToApp({
        app_id: req.body.app_id,
        user_id: req.body.user_id,
        role: req.body.role,
      });
      res.status(201).json(dataResponse(membership));
    },
  ),
);

// Delete App Membership
appMembershipsRouter.delete(
  "/:id",
  chain(
    validate({
      params: z.object({
        id: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.roleAssignment.delete],
      resource: async (req) => {
        const membership = await getAppMembership(req.params.id);
        if (!membership) return ubentoAuth.scopes.root;
        const app = await getApp(membership.app_id);
        if (!app) return ubentoAuth.scopes.root;
        return ubentoAuth.scopes.appOrHigher({
          team_id: app.team_id,
          app_id: app.id,
        });
      },
    }),
    async (req, res) => {
      await removeMemberFromApp(req.params.id);
      res.json(dataResponse({ success: true }));
    },
  ),
);

export default appMembershipsRouter;
