import { ubentoAuth } from "@ubento/primitives";
import {
  chain,
  dataResponse,
  enforce,
  NotFoundError,
  validate,
} from "@ubento/service-toolkit";
import { Router } from "express";
import z from "zod";
import {
  createApp,
  deleteApp,
  getApp,
  getAppBySlug,
  listApps,
  updateApp,
} from "../entities/app/app.js";

const appsRouter: Router = Router();

// Get App by Slug
appsRouter.get(
  "/slug/:slug",
  chain(
    validate({
      params: z.object({
        slug: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.app.read],
      resource: async (req) => {
        const app = await getAppBySlug(req.params.slug as string);
        if (!app) throw new NotFoundError("App not found");

        // Cache the app on the request to avoid a double DB query
        (req as any).resolvedApp = app;
        return ubentoAuth.scopes.appOrHigher({
          team_id: app.team_id,
          app_id: app.id,
        });
      },
    }),
    async (req, res) => {
      // Use the cached app
      const app = (req as any).resolvedApp;
      res.json(dataResponse(app));
    },
  ),
);

// List Apps (Correct: Checking Team level because we are listing within a team)
appsRouter.get(
  "/",
  chain(
    validate({
      query: z.object({
        team_id: z.string().optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.app.list],
      resource: (req) =>
        ubentoAuth.scopes.teamOrHigher({
          team_id: req.query.team_id as string | undefined,
        }),
    }),
    async (req, res) => {
      const apps = await listApps({
        team_id: req.query.team_id as string | undefined,
      });
      res.json(dataResponse(apps));
    },
  ),
);

// Get App
appsRouter.get(
  "/:app_id",
  chain(
    validate({
      params: z.object({
        app_id: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.app.read],
      resource: async (req) => {
        const app = await getApp(req.params.app_id as string);
        if (!app) throw new NotFoundError("App not found");

        // Cache the app on the request to avoid a double DB query
        (req as any).resolvedApp = app;
        return ubentoAuth.scopes.appOrHigher({
          team_id: app.team_id,
          app_id: app.id,
        });
      },
    }),
    async (req, res) => {
      // Use the cached app
      const app = (req as any).resolvedApp;
      res.json(dataResponse(app));
    },
  ),
);

// Create App (Correct: Checking Team level because the app doesn't exist yet)
appsRouter.post(
  "/",
  chain(
    validate({
      body: z.object({
        name: z.string(),
        slug: z.string().optional(),
        description: z.string().optional(),
        team_id: z.string(),
        metadata: z.any().optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.app.create],
      resource: (req) =>
        ubentoAuth.scopes.teamOrHigher({
          team_id: req.body.team_id as string,
        }),
    }),
    async (req, res) => {
      const app = await createApp(req.body);
      res.json(dataResponse(app));
    },
  ),
);

// Update App
appsRouter.patch(
  "/:app_id",
  chain(
    validate({
      params: z.object({
        app_id: z.string(),
      }),
      body: z.object({
        name: z.string().optional(),
        slug: z.string().optional(),
        description: z.string().optional(),
        metadata: z.any().optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.app.update],
      resource: async (req) => {
        const app = await getApp(req.params.app_id as string);
        if (!app) throw new NotFoundError("App not found");

        return ubentoAuth.scopes.appOrHigher({
          team_id: app.team_id,
          app_id: app.id,
        });
      },
    }),
    async (req, res) => {
      const app = await updateApp(req.params.app_id, req.body);
      res.json(dataResponse(app));
    },
  ),
);

// Delete App
appsRouter.delete(
  "/:app_id",
  chain(
    validate({
      params: z.object({
        app_id: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.app.delete],
      resource: async (req) => {
        const app = await getApp(req.params.app_id as string);
        if (!app) throw new NotFoundError("App not found");

        return ubentoAuth.scopes.appOrHigher({
          team_id: app.team_id,
          app_id: app.id,
        });
      },
    }),
    async (req, res) => {
      await deleteApp(req.params.app_id);
      res.json(dataResponse({ success: true }));
    },
  ),
);

export default appsRouter;
