import { ModuleCollectionScope } from "@ubento/services.database/module";
import { ubentoAuth } from "@ubento/services.primitives";
import {
  chain,
  dataResponse,
  enforce,
  NotFoundError,
  parseNumberQuery,
  validate,
} from "@ubento/services.toolkit";
import { Request, Response, Router } from "express";
import multer from "multer";
import z from "zod";
import {
  createModuleCollection,
  deleteModuleCollection,
  getModuleCollection,
  listModuleCollections,
  updateModuleCollection,
  updateModuleCollectionCover,
} from "../entities/collection.js";
import { uploadImage } from "../lib/storage.js";

const collectionsRouter: Router = Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * GET /modules/collections
 * List module collections with pagination.
 */
collectionsRouter.get(
  "/",
  chain(
    validate({
      query: z.object({
        team_id: z.string().optional(),
        limit: z.coerce.number().optional(),
        cursor: z.string().optional(),
        scope: z.enum(ModuleCollectionScope).optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.moduleCollection.list],
      scope: (req) => {
        return req.query.team_id
          ? ubentoAuth.scopes.team({ team_id: req.query.team_id as string })
          : ubentoAuth.scopes.public;
      },
    }),
    async (req, res) => {
      const result = await listModuleCollections({
        team_id: req.query.team_id as string,
        limit: parseNumberQuery(req, "limit"),
        cursor: req.query.cursor as string,
        scope: req.query.scope as ModuleCollectionScope,
      });
      res.json(result);
    },
  ),
);

/**
 * GET /modules/collections/:collection_id
 * Get details of a module collection.
 */
collectionsRouter.get(
  "/:collection_id",
  chain(
    validate({ params: z.object({ collection_id: z.string() }) }),
    enforce({
      permissions: [ubentoAuth.actions.moduleCollection.read],
      scope: async (req) => {
        const collection = await getModuleCollection(
          req.params.collection_id as string,
        );
        if (!collection) throw new NotFoundError("Collection not found");
        return collection.scope === ModuleCollectionScope.private
          ? ubentoAuth.scopes.team({ team_id: collection.team_id })
          : ubentoAuth.scopes.public;
      },
    }),
    async (req, res) => {
      const collection = await getModuleCollection(
        req.params.collection_id as string,
      );
      res.json(dataResponse(collection));
    },
  ),
);

/**
 * POST /modules/collections
 * Create a new module collection.
 */
collectionsRouter.post(
  "/",
  chain(
    validate({
      body: z.object({
        team_id: z.string(),
        name: z.string().min(1),
        summary: z.string().optional(),
        scope: z.nativeEnum(ModuleCollectionScope).optional(),
        module_ids: z.array(z.string()).optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.moduleCollection.create],
      scope: (req) => ubentoAuth.scopes.team({ team_id: req.body.team_id }),
    }),
    async (req, res) => {
      const collection = await createModuleCollection(req.body);
      res.json(dataResponse(collection));
    },
  ),
);

/**
 * PATCH /modules/collections/:collection_id
 * Update details of a module collection.
 */
collectionsRouter.patch(
  "/:collection_id",
  chain(
    validate({
      params: z.object({ collection_id: z.string() }),
      body: z.object({
        name: z.string().min(1).optional(),
        summary: z.string().nullable().optional(),
        scope: z.nativeEnum(ModuleCollectionScope).optional(),
        module_ids: z.array(z.string()).optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.moduleCollection.update],
      scope: async (req) => {
        const collection = await getModuleCollection(
          req.params.collection_id as string,
        );
        if (!collection) throw new NotFoundError("Collection not found");
        return ubentoAuth.scopes.team({ team_id: collection.team_id });
      },
    }),
    async (req, res) => {
      const updated = await updateModuleCollection(
        req.params.collection_id as string,
        req.body,
      );
      res.json(dataResponse(updated));
    },
  ),
);

/**
 * DELETE /modules/collections/:collection_id
 * Soft delete a module collection.
 */
collectionsRouter.delete(
  "/:collection_id",
  chain(
    validate({ params: z.object({ collection_id: z.string() }) }),
    enforce({
      permissions: [ubentoAuth.actions.moduleCollection.delete],
      scope: async (req) => {
        const collection = await getModuleCollection(
          req.params.collection_id as string,
        );
        if (!collection) throw new NotFoundError("Collection not found");
        return ubentoAuth.scopes.team({ team_id: collection.team_id });
      },
    }),
    async (req, res) => {
      await deleteModuleCollection(req.params.collection_id as string);
      res.json(dataResponse({ success: true }));
    },
  ),
);

/**
 * POST /modules/collections/:collection_id/image
 * Upload cover image for a module collection.
 */
collectionsRouter.post(
  "/:collection_id/image",
  upload.single("image"),
  chain(
    validate({ params: z.object({ collection_id: z.string() }) }),
    enforce({
      permissions: [ubentoAuth.actions.moduleCollection.update],
      scope: async (req) => {
        const collection = await getModuleCollection(
          req.params.collection_id as string,
        );
        if (!collection) throw new NotFoundError("Collection not found");
        return ubentoAuth.scopes.team({ team_id: collection.team_id });
      },
    }),
    async (req: Request, res: Response) => {
      const mReq = req as any;
      if (!mReq.file) {
        res.status(400).json({ error: "No image file provided" });
        return;
      }
      const hash = await uploadImage(mReq.file.buffer, mReq.file.mimetype);
      const collection = await updateModuleCollectionCover(
        req.params.collection_id as string,
        hash,
      );
      res.json(dataResponse(collection));
    },
  ),
);

export default collectionsRouter;
