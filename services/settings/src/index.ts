import { createService } from "@ubento/services.toolkit";
import { env } from "./env.js";
import settingsRouter from "./routes/settings.js";
import { spec } from "./spec.js";

export const service = createService({
  name: "settings-service",
  port: env.PORT,
  spec,
  auth: {
    authorizationDatabaseUri: env.DATABASE_URL,
  },
});

service.app.use("/settings", settingsRouter);

service.start();
