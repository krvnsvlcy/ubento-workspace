import { createClientFactory } from "~/lib/client.js";
import { components, paths } from "./types.js";

export const createAppServiceClient = createClientFactory<paths>();

export type App = components["schemas"]["App"];
export type Page = components["schemas"]["Page"];
export type Component = components["schemas"]["Component"];
export type Error = components["schemas"]["Error"];
