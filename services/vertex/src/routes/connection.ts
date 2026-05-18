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
  getTeamConnection,
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
  "/team/:team_id/:provider_name",
  chain(
    validate({
      params: z.object({
        team_id: z.string(),
        provider_name: z.string(),
      }),
    }),
    async (req: Request, res: Response) => {
      const connection = await getTeamConnection(
        req.params.team_id as string,
        req.params.provider_name as string,
      );
      if (!connection) {
        throw new NotFoundError(
          `connection for team ${req.params.team_id} and provider ${req.params.provider_name}`,
        );
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
        cursor: z.string().optional(),
        limit: z.coerce.number().optional(),
      }),
    }),
    async (req: Request, res: Response) => {
      const result = await listConnections({
        ...parseCursorQuery(req),
        team_id: parseStringQuery(req, "team_id"),
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
        team_id: z.string().min(1),
        provider_id: z.string().min(1),
        credentials: z.unknown().optional(),
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
      let credentials = req.body;
      let name: string | undefined;

      if (req.body && typeof req.body === "object" && "credentials" in (req.body as any)) {
        credentials = (req.body as any).credentials;
        name = (req.body as any).name;
      }

      const connection = await updateConnectionAuth(
        req.params.connection_id as string,
        credentials,
        name,
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
