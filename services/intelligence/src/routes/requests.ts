import { chain, validate } from "@ubento/services.toolkit";
import { Router } from "express";
import z from "zod";
import { listRequests } from "../entities/requests.js";

const requestRouter: Router = Router();

requestRouter.get(
  "/",
  chain(
    validate({
      query: z.object({
        team_id: z.string().optional(),
        cursor: z.string().optional(),
        limit: z.coerce.number().optional(),
      }),
    }),
    async (req, res) => {
      const result = await listRequests({
        team_id: req.query.team_id,
        cursor: req.query.cursor,
        limit: req.query.limit,
      });
      res.json(result);
    },
  ),
);

export default requestRouter;
