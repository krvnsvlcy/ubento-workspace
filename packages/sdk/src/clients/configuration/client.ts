import { createClientFactory } from "~/lib/client.js";
import { components, paths } from "./types.js";

export const createConfigurationServiceClient = createClientFactory<paths>();
export type Configuration = components["schemas"]["Configuration"];