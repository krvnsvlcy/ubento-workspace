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
  createComponent,
  deleteComponent,
  getComponent,
  listComponents,
  updateComponent,
} from "../entities/component/component.js";

const componentsRouter: Router = Router();

// List Components
componentsRouter.get(
  "/",
  chain(
    validate({
      query: z.object({
        app_id: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.component.list],
      resource: async (req) => {
        const app = await getApp(req.query.app_id as string);
        if (!app) throw new NotFoundError("App not found");
        return ubentoAuth.scopes.appOrHigher({
          team_id: app.team_id,
          app_id: app.id,
        });
      },
    }),
    async (req, res) => {
      const components = await listComponents(req.query.app_id as string);
      res.json(dataResponse(components));
    },
  ),
);

// Get Component
componentsRouter.get(
  "/:component_id",
  chain(
    validate({
      params: z.object({
        component_id: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.component.read],
      resource: async (req) => {
        const component_id = req.params.component_id as string;
        const component = await getComponent(component_id);
        if (!component) throw new NotFoundError("Component not found");
        const app = await getApp(component.app_id);
        if (!app) throw new NotFoundError("App not found");
        return ubentoAuth.scopes.appOrHigher({
          team_id: app.team_id,
          app_id: app.id,
        });
      },
    }),
    async (req, res) => {
      const component_id = req.params.component_id as string;
      const component = await getComponent(component_id);
      if (!component) {
        throw new NotFoundError("Component not found");
      }
      res.json(dataResponse(component));
    },
  ),
);

// Create Component
componentsRouter.post(
  "/",
  chain(
    validate({
      body: z.object({
        app_id: z.string(),
        name: z.string(),
        type: z.string(),
        props: z.any().optional(),
        metadata: z.any().optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.component.create],
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
      const component = await createComponent(req.body);
      res.json(dataResponse(component));
    },
  ),
);

// Update Component
componentsRouter.patch(
  "/:component_id",
  chain(
    validate({
      params: z.object({
        component_id: z.string(),
      }),
      body: z.object({
        name: z.string().optional(),
        type: z.string().optional(),
        props: z.any().optional(),
        metadata: z.any().optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.component.update],
      resource: async (req) => {
        const component_id = req.params.component_id as string;
        const component = await getComponent(component_id);
        if (!component) throw new NotFoundError("Component not found");
        const app = await getApp(component.app_id);
        if (!app) throw new NotFoundError("App not found");
        return ubentoAuth.scopes.appOrHigher({
          team_id: app.team_id,
          app_id: app.id,
        });
      },
    }),
    async (req, res) => {
      const component_id = req.params.component_id as string;
      const component = await updateComponent(component_id, req.body);
      res.json(dataResponse(component));
    },
  ),
);

// Delete Component
componentsRouter.delete(
  "/:component_id",
  chain(
    validate({
      params: z.object({
        component_id: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.component.delete],
      resource: async (req) => {
        const component_id = req.params.component_id as string;
        const component = await getComponent(component_id);
        if (!component) throw new NotFoundError("Component not found");
        const app = await getApp(component.app_id);
        if (!app) throw new NotFoundError("App not found");
        return ubentoAuth.scopes.appOrHigher({
          team_id: app.team_id,
          app_id: app.id,
        });
      },
    }),
    async (req, res) => {
      const component_id = req.params.component_id as string;
      await deleteComponent(component_id);
      res.json(dataResponse({ success: true }));
    },
  ),
);

export default componentsRouter;
