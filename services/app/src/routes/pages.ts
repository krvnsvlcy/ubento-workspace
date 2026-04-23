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
import { getApp } from "../entities/app/app.js";
import {
  createPage,
  deletePage,
  getPage,
  listPages,
  updatePage,
} from "../entities/page/page.js";

const pagesRouter: Router = Router();

// List Pages
pagesRouter.get(
  "/",
  chain(
    validate({
      query: z.object({
        app_id: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.page.list],
      resource: async (req) => {
        const app_id = req.query.app_id as string;
        const app = await getApp(app_id);
        if (!app) throw new NotFoundError("App not found");
        return ubentoAuth.scopes.appOrHigher({
          team_id: app.team_id,
          app_id: app.id,
        });
      },
    }),
    async (req, res) => {
      const pages = await listPages(req.query.app_id as string);
      res.json(dataResponse(pages));
    },
  ),
);

// Get Page
pagesRouter.get(
  "/:page_id",
  chain(
    validate({
      params: z.object({
        page_id: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.page.read],
      resource: async (req) => {
        const page_id = req.params.page_id as string;
        const page = await getPage(page_id);
        if (!page) throw new NotFoundError("Page not found");
        const app = await getApp(page.app_id);
        if (!app) throw new NotFoundError("App not found");
        return ubentoAuth.scopes.appOrHigher({
          team_id: app.team_id,
          app_id: app.id,
        });
      },
    }),
    async (req, res) => {
      const page = await getPage(req.params.page_id);
      if (!page) {
        throw new NotFoundError("Page not found");
      }
      res.json(dataResponse(page));
    },
  ),
);

// Create Page
pagesRouter.post(
  "/",
  chain(
    validate({
      body: z.object({
        app_id: z.string(),
        name: z.string(),
        path: z.string(),
        metadata: z.any().optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.page.create],
      resource: async (req) => {
        const app = await getApp(req.body.app_id);
        if (!app) throw new NotFoundError("App not found");
        return ubentoAuth.scopes.appOrHigher({
          team_id: app.team_id,
          app_id: app.id,
        });
      },
    }),
    async (req, res) => {
      const page = await createPage(req.body);
      res.json(dataResponse(page));
    },
  ),
);

// Update Page
pagesRouter.patch(
  "/:page_id",
  chain(
    validate({
      params: z.object({
        page_id: z.string(),
      }),
      body: z.object({
        name: z.string().optional(),
        path: z.string().optional(),
        metadata: z.any().optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.page.update],
      resource: async (req) => {
        const page_id = req.params.page_id as string;
        const page = await getPage(page_id);
        if (!page) throw new NotFoundError("Page not found");
        const app = await getApp(page.app_id);
        if (!app) throw new NotFoundError("App not found");
        return ubentoAuth.scopes.appOrHigher({
          team_id: app.team_id,
          app_id: app.id,
        });
      },
    }),
    async (req, res) => {
      const page = await updatePage(req.params.page_id, req.body);
      res.json(dataResponse(page));
    },
  ),
);

// Delete Page
pagesRouter.delete(
  "/:page_id",
  chain(
    validate({
      params: z.object({
        page_id: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.page.delete],
      resource: async (req) => {
        const page_id = req.params.page_id as string;
        const page = await getPage(page_id);
        if (!page) throw new NotFoundError("Page not found");
        const app = await getApp(page.app_id);
        if (!app) throw new NotFoundError("App not found");
        return ubentoAuth.scopes.appOrHigher({
          team_id: app.team_id,
          app_id: app.id,
        });
      },
    }),
    async (req, res) => {
      await deletePage(req.params.page_id);
      res.json(dataResponse({ success: true }));
    },
  ),
);

export default pagesRouter;
