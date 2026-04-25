import { createClientFactory } from "~/lib/client.js";
import { components, paths } from "./types.js";

export const createAppServiceClient = createClientFactory<paths>();
export type App = components["schemas"]["App"];
export type Page = components["schemas"]["Page"];
export type AppMembership = components["schemas"]["AppMembership"];
export type AppInvite = components["schemas"]["AppInvite"];
export type Error = components["schemas"]["Error"];