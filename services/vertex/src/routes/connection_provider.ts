import {
  chain,
  NotFoundError,
  parseCursorQuery,
  parseStringQuery,
  toSerializable,
  validate,
} from "@ubento/services.toolkit";
import { connectionProviderConfigSchema } from "@ubento/vertex.core";
import { Request, Response, Router } from "express";
import multer from "multer";
import { z } from "zod";
import {
  createConnectionProvider,
  deleteConnectionProvider,
  getConnectionProvider,
  getConnectionProviderByHandle,
  listConnectionProviders,
  updateConnectionProvider,
  uploadConnectionProviderImage,
} from "../entities/connection_provider.js";

const upload = multer({ storage: multer.memoryStorage() });

const router: Router = Router();

router.get(
  "/:provider_id",
  chain(
    validate({
      params: z.object({
        provider_id: z.string(),
      }),
    }),
    async (req: Request, res: Response) => {
      const provider = await getConnectionProvider(
        req.params.provider_id as string,
      );
      if (!provider) {
        throw new NotFoundError(
          `connection_provider ${req.params.provider_id}`,
        );
      }
      res.json(toSerializable(provider));
    },
  ),
);

router.get(
  "/by-handle/:handle",
  chain(
    validate({
      params: z.object({
        handle: z.string(),
      }),
    }),
    async (req: Request, res: Response) => {
      const provider = await getConnectionProviderByHandle(
        req.params.handle as string,
      );
      if (!provider) {
        throw new NotFoundError(
          `connection_provider with handle ${req.params.handle}`,
        );
      }
      res.json(toSerializable(provider));
    },
  ),
);

router.get(
  "/",
  chain(
    validate({
      query: z.object({
        team_id: z.string().optional(),
        name: z.string().optional(),
        handle: z.string().optional(),
        cursor: z.string().optional(),
        limit: z.coerce.number().optional(),
        tags: z
          .union([z.array(z.string()), z.string()])
          .optional()
          .transform((v) =>
            v === undefined ? undefined : Array.isArray(v) ? v : [v],
          ),
      }),
    }),
    async (req: Request, res: Response) => {
      const result = await listConnectionProviders({
        ...parseCursorQuery(req),
        team_id: parseStringQuery(req, "team_id"),
        name: parseStringQuery(req, "name"),
        handle: parseStringQuery(req, "handle"),
        tags: parseStringQuery(req, "tags")?.split(","),
      });
      res.json(result);
    },
  ),
);

router.post(
  "/",
  chain(
    validate({
      body: z.object({
        handle: z.string().min(1),
        type: z.string().min(1),
        name: z.string().min(1),
        description: z.string().optional(),
        config: connectionProviderConfigSchema.optional(),
        tags: z.array(z.string()).optional(),
        team_id: z.string().nullable().optional(),
      }),
    }),
    async (req: Request, res: Response) => {
      const provider = await createConnectionProvider(req.body);
      res.json(toSerializable(provider));
    },
  ),
);

router.patch(
  "/:provider_id",
  chain(
    validate({
      params: z.object({
        provider_id: z.string(),
      }),
      body: z.object({
        handle: z.string().optional(),
        type: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        config: connectionProviderConfigSchema.optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
    async (req: Request, res: Response) => {
      const provider = await updateConnectionProvider(
        req.params.provider_id as string,
        req.body,
      );
      res.json(toSerializable(provider));
    },
  ),
);

router.delete(
  "/:provider_id",
  chain(
    validate({
      params: z.object({
        provider_id: z.string(),
      }),
    }),
    async (req: Request, res: Response) => {
      await deleteConnectionProvider(req.params.provider_id as string);
      res.json({ id: req.params.provider_id });
    },
  ),
);

router.post(
  "/:provider_id/image",
  upload.single("image"),
  chain(
    validate({
      params: z.object({
        provider_id: z.string(),
      }),
    }),
    async (req: Request, res: Response) => {
      if (!req.file) {
        res.status(400).json({ error: "No image file provided" });
        return;
      }
      const provider = await uploadConnectionProviderImage(
        req.params.provider_id as string,
        req.file.buffer,
        req.file.mimetype,
      );
      res.json(toSerializable(provider));
    },
  ),
);

export default router;
