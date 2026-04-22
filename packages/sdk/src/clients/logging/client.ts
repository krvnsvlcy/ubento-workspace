import { createClientFactory } from "~/lib/client.js";
import { components, paths } from "./types.js";

export const createLoggingServiceClient = createClientFactory<paths>();
export type Sink = components["schemas"]["Sink"];
export type Log = components["schemas"]["Log"];
export type SinkCreate = components["schemas"]["SinkCreate"];
export type LogCreate = components["schemas"]["LogCreate"];
export type LogBatchCreate = components["schemas"]["LogBatchCreate"];