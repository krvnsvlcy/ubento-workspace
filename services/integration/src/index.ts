import { createService } from "@ubento/services.toolkit";
import express from "express";
import { env } from "./env.js";
import authRouter from "./routes/auth.js";
import connectionRouter from "./routes/connection.js";
import connectionProviderRouter from "./routes/connection_provider.js";
import { proxyRouter } from "./routes/proxy.js";
import { spec } from "./spec.js";

const service = createService({
  name: "integration-service",
  port: env.PORT,
  spec,
  auth: false,
  bodyParser: false,
});

service.app.use(proxyRouter);

service.app.use(express.json());
service.app.use(authRouter);
service.app.use("/integration/connection-providers", connectionProviderRouter);
service.app.use("/integration/connections", connectionRouter);

service.start();
