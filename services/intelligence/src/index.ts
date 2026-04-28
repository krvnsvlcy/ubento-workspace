import { createService } from "@ubento/service-toolkit";
import express from "express";
import { env } from "./env.js";
import fileRouter from "./routes/files.js";
import { gatewayRouter } from "./routes/gateway.js";
import messageRouter from "./routes/messages.js";
import { modelRouter } from "./routes/models.js";
import queryRouter from "./routes/query.js";
import threadRouter from "./routes/threads.js";
import toolsRouter from "./routes/tools.js";
import { spec } from "./spec/spec.js";

const service = createService({
  name: "intelligence-service",
  port: env.PORT,
  auth: false,
  spec,
  bodyParser: false,
});
service.app.use("/intelligence/models", modelRouter);
service.app.use("/intelligence/gateway", gatewayRouter);

service.app.use(express.json({ limit: "10mb" }));
service.app.use(express.urlencoded({ extended: true, limit: "10mb" }));
service.app.use("/intelligence/threads", threadRouter);
service.app.use("/intelligence/files", fileRouter);
service.app.use("/intelligence/query", queryRouter);
service.app.use("/intelligence/messages", messageRouter);
service.app.use("/intelligence/tools", toolsRouter);

service.start();
