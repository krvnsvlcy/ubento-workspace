import { chain, validate } from "@ubento/services.toolkit";
import { Router } from "express";
import z from "zod";
import { readWebpage } from "../entities/tools.js";

const toolsRouter: Router = Router();

toolsRouter.post(
  "/read-webpage",
  chain(
    validate({
      body: z.object({
        url: z.string().url(),
        format: z.enum(["markdown", "raw", "json"]).optional(),
      }),
    }),
    async (req, res) => {
      const { url, format } = req.body;
      try {
        const result = await readWebpage({ url, format });
        res.json(result);
      } catch (error: any) {
        res.status(400).json({
          message: error.message || "Failed to read webpage",
          code: "READ_WEBPAGE_ERROR",
        });
      }
    },
  ),
);

export default toolsRouter;
