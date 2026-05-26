import { auth, createService } from "@ubento/services.toolkit";
import { json, urlencoded } from "express";
import { env } from "./env.js";
import modulesRouter from "./routes/modules.js";
import registryRouter, { registryFilesRouter } from "./routes/registry.js";
import uploadRouter from "./routes/upload.js";
import { spec } from "./spec.js";

export const service = createService({
  name: "module-service",
  port: env.PORT,
  spec,
  auth: false,
  bodyParser: false,
});

service.app.use("/modules/registry/files", registryFilesRouter);

service.app.use(auth({ authorizationDatabaseUri: env.DATABASE_URL }));
service.app.use("/modules/upload", uploadRouter);

service.app.use(json());
service.app.use(urlencoded({ extended: true }));
service.app.use("/modules/registry", registryRouter);
service.app.use("/modules", modulesRouter);

service.start();

