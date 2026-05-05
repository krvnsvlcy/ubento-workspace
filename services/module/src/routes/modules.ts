import { ModuleScope } from "@ubento/services.database/module";
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
  createModule,
  deleteModule,
  getModule,
  listModules,
  publishModule,
  searchModules,
  writeModule,
} from "../entities/module.js";
import {
  getModuleVersion,
  listModuleVersions,
  readModuleVersionFile,
} from "../entities/version.js";

const modulesRouter: Router = Router();

/**
 * GET /modules
 * Lists modules with cursor pagination.
 */
modulesRouter.get(
  "/",
  chain(
    validate({
      query: z.object({
        team_id: z.string().optional(),
        limit: z.coerce.number().optional(),
        cursor: z.string().optional(),
        type: z.string().optional(),
        scope: z.nativeEnum(ModuleScope).optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.module.list],
      scope: (req) => {
        return req.query.team_id
          ? ubentoAuth.scopes.team({ team_id: req.query.team_id as string })
          : ubentoAuth.scopes.public;
      },
    }),
    async (req, res) => {
      const result = await listModules(req.query as any);
      res.json(makeCursorPageResponse(result));
    },
  ),
);

/**
 * GET /modules/search
 * High-performance marketplace search via MongoDB Atlas.
 */
modulesRouter.get(
  "/search",
  chain(
    validate({
      query: z.object({
        query: z.string().optional(),
        types: z.array(z.string()).optional(),
        scope: z.nativeEnum(ModuleScope).optional(),
        page: z.coerce.number().optional(),
        limit: z.coerce.number().optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.module.list],
      scope: () => ubentoAuth.scopes.public,
    }),
    async (req, res) => {
      const results = await searchModules(req.query as any);
      res.json(dataResponse(results));
    },
  ),
);

/**
 * GET /modules/:module_id
 * Fetches the base module metadata and pointers.
 */
modulesRouter.get(
  "/:module_id",
  chain(
    validate({ params: z.object({ module_id: z.string() }) }),
    enforce({
      permissions: [ubentoAuth.actions.module.read],
      scope: async (req) => {
        const module = await getModule(req.params.module_id as string);
        if (!module) throw new NotFoundError("Module not found");
        return module.scope === ModuleScope.private
          ? ubentoAuth.scopes.team({ team_id: module.team_id })
          : ubentoAuth.scopes.public;
      },
    }),
    async (req, res) => {
      const module = await getModule(req.params.module_id);
      res.json(dataResponse(module));
    },
  ),
);

/**
 * POST /modules/:module_id/versions
 * The primary "Save" mechanism. Creates a new private draft version.
 */
modulesRouter.post(
  "/:module_id/versions",
  chain(
    validate({
      params: z.object({ module_id: z.string() }),
      body: z.object({ content: z.string() }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.module.update],
      scope: async (req) => {
        const module = await getModule(req.params.module_id as string);
        if (!module) throw new NotFoundError("Module not found");
        return ubentoAuth.scopes.team({ team_id: module.team_id });
      },
    }),
    async (req, res) => {
      const updatedModule = await writeModule({
        moduleId: req.params.module_id,
        authorId: req.auth!.subject,
        source: req.body.content,
      });
      res.json(dataResponse(updatedModule));
    },
  ),
);

/**
 * POST /modules/:module_id/publish
 * Promotes the current draft to the public-facing version.
 */
modulesRouter.post(
  "/:module_id/publish",
  chain(
    validate({ params: z.object({ module_id: z.string() }) }),
    enforce({
      permissions: [ubentoAuth.actions.module.update],
      scope: async (req) => {
        const module = await getModule(req.params.module_id as string);
        if (!module) throw new NotFoundError("Module not found");
        return ubentoAuth.scopes.team({ team_id: module.team_id });
      },
    }),
    async (req, res) => {
      const publishedModule = await publishModule({
        moduleId: req.params.module_id,
        authorId: req.auth!.subject,
      });
      res.json(dataResponse(publishedModule));
    },
  ),
);

/**
 * GET /modules/:module_id/versions
 * Fetches the history of versions for this module.
 */
modulesRouter.get(
  "/:module_id/versions",
  chain(
    validate({
      params: z.object({ module_id: z.string() }),
      query: z.object({
        limit: z.coerce.number().optional(),
        cursor: z.string().optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.module.read],
      scope: async (req) => {
        const module = await getModule(req.params.module_id as string);
        if (!module) throw new NotFoundError("Module not found");
        return module.scope === ModuleScope.private
          ? ubentoAuth.scopes.team({ team_id: module.team_id })
          : ubentoAuth.scopes.public;
      },
    }),
    async (req, res) => {
      const result = await listModuleVersions({
        module_id: req.params.module_id as string,
        ...req.query,
      });
      res.json(makeCursorPageResponse(result));
    },
  ),
);

/**
 * POST /modules
 * Bootstraps a new module and its initial version.
 */
modulesRouter.post(
  "/",
  chain(
    validate({
      body: z.object({
        name: z.string(),
        team_id: z.string(),
        source: z.string(),
        scope: z.nativeEnum(ModuleScope),
        type: z.string(),
        summary: z.string().optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.module.create],
      scope: (req) => ubentoAuth.scopes.team({ team_id: req.body.team_id }),
    }),
    async (req, res) => {
      const module = await createModule({
        ...req.body,
        author_id: req.auth!.subject,
      });
      res.json(dataResponse(module));
    },
  ),
);

/**
 * DELETE /modules/:module_id
 * Soft-deletes a module.
 */
modulesRouter.delete(
  "/:module_id",
  chain(
    validate({ params: z.object({ module_id: z.string() }) }),
    enforce({
      permissions: [ubentoAuth.actions.module.delete],
      scope: async (req) => {
        const module = await getModule(req.params.module_id as string);
        if (!module) throw new NotFoundError("Module not found");
        return ubentoAuth.scopes.team({ team_id: module.team_id });
      },
    }),
    async (req, res) => {
      await deleteModule(req.params.module_id);
      res.json(dataResponse({ success: true }));
    },
  ),
);

/**
 * GET /modules/:module_id/versions/:version_id
 * Fetches details for a specific module version.
 */
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
      scope: async (req) => {
        const module = await getModule(req.params.module_id as string);
        if (!module) throw new NotFoundError("Module not found");
        return module.scope === ModuleScope.private
          ? ubentoAuth.scopes.team({ team_id: module.team_id })
          : ubentoAuth.scopes.public;
      },
    }),
    async (req, res) => {
      const version = await getModuleVersion(req.params.version_id);
      if (!version || version.module_id !== req.params.module_id) {
        throw new NotFoundError("Version not found");
      }
      res.json(dataResponse(version));
    },
  ),
);

/**
 * GET /modules/:module_id/versions/:version_id/:filename
 * Reads a specific file from a module version.
 */
modulesRouter.get(
  "/:module_id/versions/:version_id/:filename",
  chain(
    validate({
      params: z.object({
        module_id: z.string(),
        version_id: z.string(),
        filename: z.string(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.module.read],
      scope: async (req) => {
        const module = await getModule(req.params.module_id as string);
        if (!module) throw new NotFoundError("Module not found");
        return module.scope === ModuleScope.private
          ? ubentoAuth.scopes.team({ team_id: module.team_id })
          : ubentoAuth.scopes.public;
      },
    }),
    async (req, res) => {
      const content = await readModuleVersionFile({
        versionId: req.params.version_id,
        filename: req.params.filename,
      });

      if (content === null) {
        throw new NotFoundError("File not found");
      }

      res.json(dataResponse({ content }));
    },
  ),
);

export default modulesRouter;
