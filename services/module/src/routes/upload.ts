import { ubentoAuth } from "@ubento/services.primitives";
import { chain, dataResponse, enforce } from "@ubento/services.toolkit";
import crypto from "crypto";
import { Router } from "express";
import fs from "fs";
import os from "os";
import path from "path";
import { pipeline } from "stream/promises";
import { storeInCAS } from "../lib/storage.js";

const uploadRouter: Router = Router();

/**
 * POST /modules/upload
 * Streams a raw file to temp storage, calculates the CAS hash,
 * and moves it to permanent CAS storage.
 */
uploadRouter.post(
  "/",
  // 1. Remove express.raw() entirely. We want to read the raw stream directly.
  chain(
    enforce({
      permissions: [ubentoAuth.actions.module.create],
      scope: () => ubentoAuth.scopes.public,
    }),
    async (req, res) => {
      const contentType =
        (req.headers["content-type"] as string) || "application/octet-stream";

      // 2. Create a secure temporary file path
      const tempId = crypto.randomBytes(16).toString("hex");
      const tempFilePath = path.join(
        os.tmpdir(),
        `module-upload-${tempId}.tmp`,
      );

      const hashAlgo = crypto.createHash("sha256");
      const fileWriteStream = fs.createWriteStream(tempFilePath);

      // 3. Listen to the data chunks to calculate the hash on the fly
      req.on("data", (chunk) => {
        hashAlgo.update(chunk);
      });

      try {
        // 4. Pipe the incoming request stream directly to the local disk
        await pipeline(req, fileWriteStream);
      } catch (error) {
        // Clean up the temp file if the upload aborts/fails mid-stream
        if (fs.existsSync(tempFilePath)) {
          await fs.promises.unlink(tempFilePath);
        }
        throw new Error("File upload stream failed.");
      }

      // 5. The stream is finished, so we now have the final CAS hash
      const finalHash = `sha256:${hashAlgo.digest("hex")}`;

      try {
        // 6. Pass the file PATH (not a Buffer) to your CAS storage logic
        await storeInCAS({
          hash: finalHash,
          filePath: tempFilePath,
          contentType,
        });
      } finally {
        // 7. Clean up the local temp file after uploading to your CAS (S3, GCS, etc.)
        if (fs.existsSync(tempFilePath)) {
          await fs.promises.unlink(tempFilePath);
        }
      }

      res.json(dataResponse({ hash: finalHash }));
    },
  ),
);

export default uploadRouter;
