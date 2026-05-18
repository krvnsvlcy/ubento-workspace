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
  createService,
  deleteService,
  getService,
  listServices,
  updateService,
} from "../entities/service.js";
import {
  createServiceChannel,
  listServiceChannels,
} from "../entities/service_channel.js";

const router: Router = Router();

router.get(
  "/",
  chain(
    validate({
      query: z.object({
        team_id: z.string().optional(),
        scope: z.string().optional(),
        name: z.string().optional(),
        cursor: z.string().optional(),
        limit: z.coerce.number().optional(),
      }),
    }),
    async (req: Request, res: Response) => {
      const result = await listServices({
        ...parseCursorQuery(req),
        team_id: parseStringQuery(req, "team_id"),
        scope: parseStringQuery(req, "scope"),
        name: parseStringQuery(req, "name"),
      });
      res.json(result);
    },
  ),
);

router.get(
  "/:service_id",
  chain(
    validate({
      params: z.object({
        service_id: z.string(),
      }),
    }),
    async (req: Request, res: Response) => {
      const service = await getService(req.params.service_id as string);
      if (!service) {
        throw new NotFoundError(`service ${req.params.service_id}`);
      }
      res.json(toSerializable(service));
    },
  ),
);

router.post(
  "/",
  chain(
    validate({
      body: z.object({
        scope: z.string().optional(),
        team_id: z.string().min(1),
        name: z.string().min(1),
        display_name: z.string().min(1),
        description: z.string().optional(),
        config: z.unknown().optional(),
      }),
    }),
    async (req: Request, res: Response) => {
      const service = await createService({
        scope: req.body.scope,
        team_id: req.body.team_id,
        name: req.body.name,
        display_name: req.body.display_name,
        description: req.body.description,
      });
      res.json(toSerializable(service));
    },
  ),
);

router.patch(
  "/:service_id",
  chain(
    validate({
      params: z.object({
        service_id: z.string(),
      }),
      body: z.object({
        name: z.string().optional(),
        display_name: z.string().optional(),
        description: z.string().optional().nullable(),
        config: z.unknown().optional().nullable(),
      }),
    }),
    async (req: Request, res: Response) => {
      const service = await updateService(
        req.params.service_id as string,
        req.body,
      );
      res.json(toSerializable(service));
    },
  ),
);

router.delete(
  "/:service_id",
  chain(
    validate({
      params: z.object({
        service_id: z.string(),
      }),
    }),
    async (req: Request, res: Response) => {
      await deleteService(req.params.service_id as string);
      res.json({ id: req.params.service_id });
    },
  ),
);

router.get(
  "/:service_id/channels",
  chain(
    validate({
      params: z.object({
        service_id: z.string(),
      }),
      query: z.object({
        cursor: z.string().optional(),
        limit: z.coerce.number().optional(),
      }),
    }),
    async (req: Request, res: Response) => {
      const result = await listServiceChannels({
        ...parseCursorQuery(req),
        service_id: req.params.service_id as string,
      });
      res.json(result);
    },
  ),
);

router.post(
  "/:service_id/channels",
  chain(
    validate({
      params: z.object({
        service_id: z.string(),
      }),
      body: z.object({
        team_id: z.string().min(1),
        name: z.string().min(1),
      }),
    }),
    async (req: Request, res: Response) => {
      const channel = await createServiceChannel({
        ...req.body,
        service_id: req.params.service_id as string,
      });
      res.json(toSerializable(channel));
    },
  ),
);

export default router;
