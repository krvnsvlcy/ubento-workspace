import { createClientFactory } from "~/lib/client.js";
import { components, paths } from "./types.js";

export const createIntelligenceServiceClient = createClientFactory<paths>();
export type Message = components["schemas"]["Message"];
export type Thread = components["schemas"]["Thread"];
export type File = components["schemas"]["File"];
export type Request = components["schemas"]["Request"];
export type MessageStatus = components["schemas"]["MessageStatus"];
export type Error = components["schemas"]["Error"];