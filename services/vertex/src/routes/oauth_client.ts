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
  createOAuthClient,
  deleteOAuthClient,
  getDefaultOAuthClient,
  getOAuthClient,
  listOAuthClients,
  oauthClientCredentialsSchema,
  updateOAuthClient,
} from "../entities/oauth_client.js";

const router: Router = Router();

router.get(
  "/default/:provider_id",
  chain(
    validate({
      params: z.object({
        provider_id: z.string(),
      }),
    }),
    async (req: Request, res: Response) => {
      const client = await getDefaultOAuthClient(req.params.provider_id as string);
      if (!client) {
        throw new NotFoundError(
          `Default OAuth Client for provider ${req.params.provider_id}`,
        );
      }
      res.json(toSerializable(client));
    },
  ),
);

router.get(
  "/:oauth_client_id",
  chain(
    validate({
      params: z.object({
        oauth_client_id: z.string(),
      }),
    }),
    async (req: Request, res: Response) => {
      const client = await getOAuthClient(req.params.oauth_client_id as string);
      if (!client) {
        throw new NotFoundError(
          `oauth_client ${req.params.oauth_client_id}`,
        );
      }
      res.json(toSerializable(client));
    },
  ),
);

router.get(
  "/",
  chain(
    validate({
      query: z.object({
        team_id: z.string().optional(),
        provider_id: z.string().optional(),
        cursor: z.string().optional(),
        limit: z.coerce.number().optional(),
      }),
    }),
    async (req: Request, res: Response) => {
      const result = await listOAuthClients({
        ...parseCursorQuery(req),
        team_id: parseStringQuery(req, "team_id"),
        provider_id: parseStringQuery(req, "provider_id"),
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
        team_id: z.string().min(1).optional(),
        provider_id: z.string().min(1),
        name: z.string().min(1),
        credentials: oauthClientCredentialsSchema,
      }),
    }),
    async (req: Request, res: Response) => {
      const client = await createOAuthClient(req.body);
      res.json(toSerializable(client));
    },
  ),
);

router.patch(
  "/:oauth_client_id",
  chain(
    validate({
      params: z.object({
        oauth_client_id: z.string(),
      }),
      body: z.object({
        name: z.string().optional(),
        credentials: oauthClientCredentialsSchema.optional(),
      }),
    }),
    async (req: Request, res: Response) => {
      const client = await updateOAuthClient(
        req.params.oauth_client_id as string,
        req.body,
      );
      res.json(toSerializable(client));
    },
  ),
);

router.delete(
  "/:oauth_client_id",
  chain(
    validate({
      params: z.object({
        oauth_client_id: z.string(),
      }),
    }),
    async (req: Request, res: Response) => {
      await deleteOAuthClient(req.params.oauth_client_id as string);
      res.json({ id: req.params.oauth_client_id });
    },
  ),
);

export default router;
