import { createService } from "@ubento/services.toolkit";
import { json, urlencoded } from "express";
import { env } from "./env.js";
import modulesRouter from "./routes/modules.js";
import uploadRouter from "./routes/upload.js";
import { spec } from "./spec.js";

export const service = createService({
  name: "module-service",
  port: env.PORT,
  spec,
  auth: process.env.BYPASS_AUTH
    ? false
    : {
        authorizationDatabaseUri: env.DATABASE_URL,
      },
  bodyParser: false,
});

service.app.use("/modules/upload", uploadRouter);

service.app.use(json());
service.app.use(urlencoded({ extended: true }));
service.app.use("/modules", modulesRouter);

service.start();
