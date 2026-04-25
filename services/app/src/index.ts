import { createService } from "@ubento/service-toolkit";
import { env } from "./env.js";
import appInvitesRouter from "./routes/app-invites.js";
import appMembershipsRouter from "./routes/app-memberships.js";
import appsRouter from "./routes/apps.js";
import pagesRouter from "./routes/pages.js";
import { spec } from "./spec.js";

export const service = createService({
  name: "app-service",
  port: env.PORT,
  spec,
  auth: {
    authorizationDatabaseUri: env.DATABASE_URL,
  },
});

service.app.use("/apps", appsRouter);
service.app.use("/pages", pagesRouter);
service.app.use("/app-memberships", appMembershipsRouter);
service.app.use("/app-invites", appInvitesRouter);

service.start();
