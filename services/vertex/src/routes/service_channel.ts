import {
  chain,
  NotFoundError,
  toSerializable,
  validate,
} from "@ubento/services.toolkit";
import { Request, Response, Router } from "express";
import { z } from "zod";
import {
  deleteServiceChannel,
  getServiceChannel,
  getServiceChannelSpec,
  updateServiceChannel,
  uploadServiceChannelSpec,
} from "../entities/service_channel.js";

const router: Router = Router();

router.get(
  "/:service_channel_id",
  chain(
    validate({
      params: z.object({
        service_channel_id: z.string(),
      }),
    }),
    async (req: Request, res: Response) => {
      const channel = await getServiceChannel(
        req.params.service_channel_id as string,
      );
      if (!channel) {
        throw new NotFoundError(
          `service_channel ${req.params.service_channel_id}`,
        );
      }
      res.json(toSerializable(channel));
    },
  ),
);

router.patch(
  "/:service_channel_id",
  chain(
    validate({
      params: z.object({
        service_channel_id: z.string(),
      }),
      body: z.object({
        name: z.string().min(1),
      }),
    }),
    async (req: Request, res: Response) => {
      const channel = await updateServiceChannel(
        req.params.service_channel_id as string,
        req.body,
      );
      res.json(toSerializable(channel));
    },
  ),
);

router.delete(
  "/:service_channel_id",
  chain(
    validate({
      params: z.object({
        service_channel_id: z.string(),
      }),
    }),
    async (req: Request, res: Response) => {
      await deleteServiceChannel(req.params.service_channel_id as string);
      res.json({ id: req.params.service_channel_id });
    },
  ),
);

router.post(
  "/:service_channel_id/spec",
  chain(
    validate({
      params: z.object({
        service_channel_id: z.string(),
      }),
      body: z.record(z.string(), z.unknown()),
    }),
    async (req: Request, res: Response) => {
      await uploadServiceChannelSpec(
        req.params.service_channel_id as string,
        req.body as any,
      );
      res.status(200).json({ success: true });
    },
  ),
);

router.get(
  "/:service_channel_id/spec",
  chain(
    validate({
      params: z.object({
        service_channel_id: z.string(),
      }),
    }),
    async (req: Request, res: Response) => {
      const spec = await getServiceChannelSpec(
        req.params.service_channel_id as string,
      );
      res.json(spec);
    },
  ),
);

export default router;
