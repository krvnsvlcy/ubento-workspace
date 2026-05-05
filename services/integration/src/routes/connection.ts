import {
  chain,
  makeCursorPageResponse,
  NotFoundError,
  parseCursorQuery,
  parseStringQuery,
  toSerializable,
  validate,
} from "@ubento/services.toolkit";
import { Request, Response, Router } from "express";
import { z } from "zod";
import {
  createConnection,
  deleteConnection,
  getConnection,
  listConnections,
  updateConnectionAuth,
} from "../entities/connection.js";

const router: Router = Router();

router.get(
  "/:connection_id",
  chain(
    validate({
      params: z.object({
        connection_id: z.string(),
      }),
    }),
    async (req: Request, res: Response) => {
      const connection = await getConnection(
        req.params.connection_id as string,
      );
      if (!connection) {
        throw new NotFoundError(`connection ${req.params.connection_id}`);
      }
      res.json(toSerializable(connection));
    },
  ),
);

router.get(
  "/",
  chain(
    validate({
      query: z.object({
        organization_id: z.string().optional(),
        cursor: z.string().optional(),
        limit: z.coerce.number().optional(),
      }),
    }),
    async (req: Request, res: Response) => {
      const result = await listConnections({
        ...parseCursorQuery(req),
        organization_id: parseStringQuery(req, "organization_id"),
      });
      res.json(toSerializable(makeCursorPageResponse(result)));
    },
  ),
);

router.post(
  "/",
  chain(
    validate({
      body: z.object({
        organization_id: z.string().min(1),
        provider_id: z.string().min(1),
        auth: z.unknown().optional(),
      }),
    }),
    async (req: Request, res: Response) => {
      const connection = await createConnection(req.body);
      res.json(toSerializable(connection));
    },
  ),
);

router.post(
  "/:connection_id/auth",
  chain(
    validate({
      params: z.object({
        connection_id: z.string(),
      }),
      body: z.unknown(),
    }),
    async (req: Request, res: Response) => {
      const connection = await updateConnectionAuth(
        req.params.connection_id as string,
        req.body,
      );
      res.json(toSerializable(connection));
    },
  ),
);

router.delete(
  "/:connection_id",
  chain(
    validate({
      params: z.object({
        connection_id: z.string(),
      }),
    }),
    async (req: Request, res: Response) => {
      await deleteConnection(req.params.connection_id as string);
      res.json({ id: req.params.connection_id });
    },
  ),
);

export default router;
