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
import { z } from "zod";
import {
  createConnectionProvider,
  deleteConnectionProvider,
  getConnectionProvider,
  listConnectionProviders,
  updateConnectionProvider,
} from "../entities/connection_provider.js";

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
  "/by-name/:name",
  chain(
    validate({
      params: z.object({
        name: z.string(),
      }),
    }),
    async (req: Request, res: Response) => {
      const result = await listConnectionProviders({
        name: req.params.name as string,
        limit: 1,
      });
      const provider = result.data[0];
      if (!provider) {
        throw new NotFoundError(
          `connection_provider with name ${req.params.name}`,
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
        cursor: z.string().optional(),
        limit: z.coerce.number().optional(),
      }),
    }),
    async (req: Request, res: Response) => {
      const result = await listConnectionProviders({
        ...parseCursorQuery(req),
        name: parseStringQuery(req, "name"),
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
        code: z.string().min(1),
        type: z.string().min(1),
        name: z.string().min(1),
        description: z.string().optional(),
        config: connectionProviderConfigSchema.optional(),
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
        code: z.string().optional(),
        type: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        config: connectionProviderConfigSchema.optional(),
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

export default router;
