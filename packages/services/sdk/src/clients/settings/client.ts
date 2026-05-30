import { createClientFactory } from "~/lib/client.js";
import { components, paths } from "./types.js";

export const createSettingsServiceClient = createClientFactory<paths>();
export type Setting = components["schemas"]["Setting"];
export type Error = components["schemas"]["Error"];