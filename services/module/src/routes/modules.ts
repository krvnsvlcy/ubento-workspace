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
  createModule,
  createNewModuleVersion,
  deleteModule,
  getModule,
  getModuleBySlug,
  getModuleVersion,
  getModuleVersionCode,
  getModuleVersions,
  listModules,
  ModuleScope,
  updateModule,
} from "../entities/module.js";

const modulesRouter: Router = Router();

// Get Module by Slug
modulesRouter.get(
  "/slug/:slug",
  chain(
    validate({
      params: z.object({
        slug: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.module.read],
      resource: async (req) => {
        const module = await getModuleBySlug(req.params.slug as string);
        if (!module) throw new NotFoundError("Module not found");

        if (module.scope === ModuleScope.TEAM) {
          return ubentoAuth.scopes.team({
            team_id: module.team_id,
          });
        } else {
          return ubentoAuth.scopes.root;
        }
      },
    }),
    async (req, res) => {
      const module = await getModuleBySlug(req.params.slug as string);
      res.json(dataResponse(module));
    },
  ),
);

// List Modules
modulesRouter.get(
  "/",
  chain(
    validate({
      query: z.object({
        team_id: z.string().optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.module.list],
      resource: (req) =>
        ubentoAuth.scopes.teamOrHigher({
          team_id: req.query.team_id as string | undefined,
        }),
    }),
    async (req, res) => {
      const modules = await listModules({
        team_id: req.query.team_id as string | undefined,
      });
      res.json(dataResponse(modules));
    },
  ),
);

// Get Module
modulesRouter.get(
  "/:module_id",
  chain(
    validate({
      params: z.object({
        module_id: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.module.read],
      resource: async (req) => {
        const module = await getModule(req.params.module_id as string);
        if (!module) throw new NotFoundError("Module not found");

        if (module.scope === ModuleScope.TEAM) {
          return ubentoAuth.scopes.team({
            team_id: module.team_id,
          });
        } else {
          return ubentoAuth.scopes.root;
        }
      },
    }),
    async (req, res) => {
      const module = await getModule(req.params.module_id);
      res.json(dataResponse(module));
    },
  ),
);

// Get Module Versions
modulesRouter.get(
  "/:module_id/versions",
  chain(
    validate({
      params: z.object({
        module_id: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.module.read],
      resource: async (req) => {
        const module = await getModule(req.params.module_id as string);
        if (!module) throw new NotFoundError("Module not found");

        if (module.scope === ModuleScope.TEAM) {
          return ubentoAuth.scopes.team({
            team_id: module.team_id,
          });
        } else {
          return ubentoAuth.scopes.root;
        }
      },
    }),
    async (req, res) => {
      const versions = await getModuleVersions(req.params.module_id);
      res.json(dataResponse(versions));
    },
  ),
);

// Get Module Version
modulesRouter.get(
  "/:module_id/versions/:version_id",
  chain(
    validate({
      params: z.object({
        module_id: z.string(),
        version_id: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.module.read],
      resource: async (req) => {
        const module = await getModule(req.params.module_id as string);
        if (!module) throw new NotFoundError("Module not found");

        if (module.scope === ModuleScope.TEAM) {
          return ubentoAuth.scopes.team({
            team_id: module.team_id,
          });
        } else {
          return ubentoAuth.scopes.root;
        }
      },
    }),
    async (req, res) => {
      const version = await getModuleVersion(req.params.version_id as string);
      if (!version || version.module_id !== req.params.module_id) {
        throw new NotFoundError("Version not found");
      }
      res.json(dataResponse(version));
    },
  ),
);

// Get Module Version Source
modulesRouter.get(
  "/:module_id/versions/:version_id/source",
  chain(
    validate({
      params: z.object({
        module_id: z.string(),
        version_id: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.module.source.read],
      resource: async (req) => {
        const module = await getModule(req.params.module_id as string);
        if (!module) throw new NotFoundError("Module not found");

        if (module.scope === ModuleScope.TEAM) {
          return ubentoAuth.scopes.team({
            team_id: module.team_id,
          });
        } else {
          return ubentoAuth.scopes.root;
        }
      },
    }),
    async (req, res) => {
      const code = await getModuleVersionCode({
        moduleId: req.params.module_id,
        versionId: req.params.version_id,
        type: "tsx",
      });
      if (code === null) throw new NotFoundError("Version not found");
      res.json(dataResponse({ source: code }));
    },
  ),
);

// Get Module Version Artifact
modulesRouter.get(
  "/:module_id/versions/:version_id/artifact",
  chain(
    validate({
      params: z.object({
        module_id: z.string(),
        version_id: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.module.read],
      resource: async (req) => {
        const module = await getModule(req.params.module_id as string);
        if (!module) throw new NotFoundError("Module not found");

        if (module.scope === ModuleScope.TEAM) {
          return ubentoAuth.scopes.team({
            team_id: module.team_id,
          });
        } else {
          return ubentoAuth.scopes.root;
        }
      },
    }),
    async (req, res) => {
      const code = await getModuleVersionCode({
        moduleId: req.params.module_id,
        versionId: req.params.version_id,
        type: "js",
      });
      if (code === null) throw new NotFoundError("Version not found");
      res.json(dataResponse({ artifact: code }));
    },
  ),
);

// Publish Module Version
modulesRouter.post(
  "/:module_id/versions",
  chain(
    validate({
      params: z.object({
        module_id: z.string(),
      }),
      body: z.object({
        source: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.module.update],
      resource: async (req) => {
        const module = await getModule(req.params.module_id as string);
        if (!module) throw new NotFoundError("Module not found");

        if (module.scope === ModuleScope.TEAM) {
          return ubentoAuth.scopes.team({
            team_id: module.team_id,
          });
        } else {
          return ubentoAuth.scopes.root;
        }
      },
    }),
    async (req, res) => {
      const version = await createNewModuleVersion({
        moduleId: req.params.module_id,
        source: req.body.source,
      });
      res.json(dataResponse(version));
    },
  ),
);

// Create Module
modulesRouter.post(
  "/",
  chain(
    validate({
      body: z.object({
        name: z.string(),
        slug: z.string().optional(),
        team_id: z.string(),
        source: z.string(),
        scope: z.enum([ModuleScope.TEAM, ModuleScope.PUBLIC]),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.module.create],
      resource: (req) =>
        ubentoAuth.scopes.teamOrHigher({
          team_id: req.body.team_id as string,
        }),
    }),
    async (req, res) => {
      const module = await createModule(req.body);
      res.json(dataResponse(module));
    },
  ),
);

// Update Module
modulesRouter.patch(
  "/:module_id",
  chain(
    validate({
      params: z.object({
        module_id: z.string(),
      }),
      body: z.object({
        name: z.string().optional(),
        slug: z.string().optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.module.update],
      resource: async (req) => {
        const module = await getModule(req.params.module_id as string);
        if (!module) throw new NotFoundError("Module not found");

        if (module.scope === ModuleScope.TEAM) {
          return ubentoAuth.scopes.team({
            team_id: module.team_id,
          });
        } else {
          return ubentoAuth.scopes.root;
        }
      },
    }),
    async (req, res) => {
      const module = await updateModule(req.params.module_id, req.body);
      res.json(dataResponse(module));
    },
  ),
);

// Delete Module
modulesRouter.delete(
  "/:module_id",
  chain(
    validate({
      params: z.object({
        module_id: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.module.delete],
      resource: async (req) => {
        const module = await getModule(req.params.module_id as string);
        if (!module) throw new NotFoundError("Module not found");

        if (module.scope === ModuleScope.TEAM) {
          return ubentoAuth.scopes.team({
            team_id: module.team_id,
          });
        } else {
          return ubentoAuth.scopes.root;
        }
      },
    }),
    async (req, res) => {
      await deleteModule(req.params.module_id);
      res.json(dataResponse({ success: true }));
    },
  ),
);

export default modulesRouter;
