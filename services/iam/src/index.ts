import { createService } from "@ubento/service-toolkit";
import cookieParser from "cookie-parser";
import { env } from "./env.js";
import authRouter from "./routes/auth.js";
import clientCredentialsRouter from "./routes/management/client_credentials.js";
import clientsRouter from "./routes/management/clients.js";
import invitesRouter from "./routes/management/organization_invites.js";
import organizationsRouter from "./routes/management/organizations.js";

import sessionsRouter from "./routes/management/sessions.js";
import usersRouter from "./routes/management/users.js";
import { spec } from "./spec/spec.js";

export const service = createService({
  name: "iam-service",
  port: env.PORT,
  auth: false,
  spec,
});

// auth server
service.app.use("/", cookieParser(), authRouter);

// management server
// service.app.use(
//   createAuthenticationMiddleware({
//     audience: ubentoApi.audience,
//   }),
// );
service.app.use("/users", usersRouter);
service.app.use("/organizations", organizationsRouter);
service.app.use("/organization-invites", invitesRouter);
service.app.use("/clients", clientsRouter);
service.app.use("/client-credentials", clientCredentialsRouter);

service.app.use("/sessions", sessionsRouter);

service.start();
