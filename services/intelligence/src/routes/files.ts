import {
  chain,
  makeCursorPageResponse,
  toSerializable,
  validate,
} from "@ubento/service-toolkit";
import { Router } from "express";
import multer from "multer";
import z from "zod";
import {
  createFile,
  getFile,
  getFileUrl,
  listFiles,
} from "../entities/files.js";

const upload = multer();

const fileRouter: Router = Router();

fileRouter.get(
  "/",
  chain(
    validate({
      query: z.object({
        workspace_id: z.string(),
        limit: z.coerce.number().optional(),
        cursor: z.string().optional(),
      }),
    }),
    async (req, res) => {
      const result = await listFiles({
        workspace_id: req.query.workspace_id as string,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        cursor: req.query.cursor as string | undefined,
      });
      res.json(toSerializable(makeCursorPageResponse(result)));
    },
  ),
);

fileRouter.post(
  "/",
  upload.single("file"),
  chain(
    validate({
      body: z.object({
        workspace_id: z.string(),
      }),
    }),
    async (req: any, res) => {
      if (!req.file) {
        res.status(400).send("No file uploaded");
        return;
      }

      const { workspace_id } = req.body;
      const file = await createFile({
        workspace_id,
        name: req.file.originalname,
        type: req.file.mimetype,
        buffer: req.file.buffer,
      });

      res.status(201).json(toSerializable(file));
    }
  )
);

fileRouter.get(
  "/:file_id",
  chain(
    validate({
      params: z.object({
        file_id: z.string(),
      }),
    }),
    async (req, res) => {
      const { file_id } = req.params;
      const file = await getFile(file_id);

      if (!file) {
        res.status(404).send("File not found");
        return;
      }

      res.json(toSerializable(file));
    }
  )
);

fileRouter.get(
  "/:file_id/url",
  chain(
    validate({
      params: z.object({
        file_id: z.string(),
      }),
    }),
    async (req, res) => {
      const { file_id } = req.params;
      try {
        const url = await getFileUrl(file_id);
        res.json({ url });
      } catch (e: any) {
        if (e.message === "File not found in database") {
          res.status(404).send("File not found");
        } else {
          res.status(500).send(e.message);
        }
      }
    }
  )
);

export default fileRouter;
