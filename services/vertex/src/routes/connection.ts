import {
  chain,
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
  updateConnection,
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
        team_id: z.string().optional(),
        tags: z.string().optional(),
        cursor: z.string().optional(),
        limit: z.coerce.number().optional(),
      }),
    }),
    async (req: Request, res: Response) => {
      const result = await listConnections({
        ...parseCursorQuery(req),
        team_id: parseStringQuery(req, "team_id"),
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
        name: z.string().min(1),
        team_id: z.string().min(1),
        provider_id: z.string().min(1),
        credentials: z.unknown().optional(),
        description: z.string().optional(),
      }),
    }),
    async (req: Request, res: Response) => {
      console.log("creating connection", req.body);
      const connection = await createConnection(req.body);
      console.log("created connection", connection);
      res.json(toSerializable(connection));
    },
  ),
);

router.patch(
  "/:connection_id",
  chain(
    validate({
      params: z.object({
        connection_id: z.string(),
      }),
      body: z.object({
        credentials: z.unknown().optional(),
        data: z.object({}).optional(),
        name: z.string().optional(),
      }),
    }),
    async (req: Request, res: Response) => {
      const { credentials, name, data } = req.body as {
        credentials?: unknown;
        name?: string;
        data?: object;
      };

      const connection = await updateConnection(
        req.params.connection_id as string,
        {
          credentials,
          name,
          data,
        },
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
