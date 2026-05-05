import { createService } from "@ubento/services.toolkit";
import { env } from "./env.js";
import modulesRouter from "./routes/modules.js";
import { spec } from "./spec.js";

export const service = createService({
  name: "module-service",
  port: env.PORT,
  spec,
  auth: {
    authorizationDatabaseUri: env.DATABASE_URL,
  },
});

service.app.use("/modules", modulesRouter);

service.start();
