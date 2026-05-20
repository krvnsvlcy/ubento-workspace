import { auth, createService } from "@ubento/services.toolkit";
import { env } from "./env.js";
import authRouter from "./routes/auth.js";
import connectionRouter from "./routes/connection.js";
import connectionProviderRouter from "./routes/connection_provider.js";
import invokeRouter from "./routes/invoke.js";
import oauthClientRouter from "./routes/oauth_client.js";
import serviceRouter from "./routes/service.js";
import serviceChannelRouter from "./routes/service_channel.js";
import { spec } from "./spec.js";

const service = createService({
  name: "vertex-service",
  port: env.PORT,
  spec,
  auth: false,
  bodyParser: {
    limit: "10mb",
  },
});

service.app.use(authRouter);

service.app.use(
  auth({
    authorizationDatabaseUri: env.DATABASE_URL,
  }),
);
service.app.use("/vertex/connection-providers", connectionProviderRouter);
service.app.use("/vertex/connections", connectionRouter);
service.app.use("/vertex/services", serviceRouter);
service.app.use("/vertex/service-channels", serviceChannelRouter);
service.app.use("/vertex/oauth-clients", oauthClientRouter);
service.app.use("/vertex", invokeRouter);

service.start();
