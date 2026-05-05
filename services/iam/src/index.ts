import { auth, createService } from "@ubento/services.toolkit";
import cookieParser from "cookie-parser";
import { env } from "./env.js";
import authRouter from "./routes/auth.js";
import clientCredentialsRouter from "./routes/management/client_credentials.js";
import clientsRouter from "./routes/management/clients.js";
import invitesRouter from "./routes/management/team_invites.js";
import teamsRouter from "./routes/management/teams.js";

import sessionsRouter from "./routes/management/sessions.js";
import usersRouter from "./routes/management/users.js";
import { spec } from "./spec.js";

export const service = createService({
  name: "iam-service",
  port: env.PORT,
  spec,
  auth: false,
});

service.app.use("/", cookieParser(), authRouter);

service.app.use(auth({}));

service.app.use("/users", usersRouter);
service.app.use("/teams", teamsRouter);
service.app.use("/team-invites", invitesRouter);
service.app.use("/clients", clientsRouter);
service.app.use("/client-credentials", clientCredentialsRouter);

service.app.use("/sessions", sessionsRouter);

service.start();
