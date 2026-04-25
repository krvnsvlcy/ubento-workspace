import { createClientFactory } from "~/lib/client.js";
import { components, paths } from "./types.js";

export const createModuleServiceClient = createClientFactory<paths>();
export type Module = components["schemas"]["Module"];
export type ModuleVersion = components["schemas"]["ModuleVersion"];
export type Error = components["schemas"]["Error"];