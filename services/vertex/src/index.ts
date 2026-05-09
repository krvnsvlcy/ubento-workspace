import { auth, createService } from "@ubento/services.toolkit";
import { env } from "./env.js";
import authRouter from "./routes/auth.js";
import connectionRouter from "./routes/connection.js";
import connectionProviderRouter from "./routes/connection_provider.js";
import invokeRouter from "./routes/invoke.js";
import { spec } from "./spec.js";

const service = createService({
  name: "vertex-service",
  port: env.PORT,
  spec,
  auth: false,
});

service.app.use(authRouter);

service.app.use(
  auth({
    authorizationDatabaseUri: env.DATABASE_URL,
  }),
);
service.app.use("/vertex/connection-providers", connectionProviderRouter);
service.app.use("/vertex/connections", connectionRouter);
service.app.use("/vertex", invokeRouter);

service.start();
