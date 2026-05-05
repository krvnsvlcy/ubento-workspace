import { createService } from "@ubento/services.toolkit";
import { env } from "./env.js";
import boardsRouter from "./routes/boards.js";
import workspaceInvitesRouter from "./routes/workspace-invites.js";
import workspaceMembershipsRouter from "./routes/workspace-memberships.js";
import workspacesRouter from "./routes/workspaces.js";
import { spec } from "./spec.js";

export const service = createService({
  name: "workspace-service",
  port: env.PORT,
  spec,
  auth: {
    authorizationDatabaseUri: env.DATABASE_URL,
  },
});

service.app.use("/workspaces", workspacesRouter);
service.app.use("/boards", boardsRouter);
service.app.use("/workspace-memberships", workspaceMembershipsRouter);
service.app.use("/workspace-invites", workspaceInvitesRouter);

service.start();
