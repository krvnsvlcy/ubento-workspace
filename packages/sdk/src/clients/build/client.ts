import { createClientFactory } from "~/lib/client.js";
import { components, paths } from "./types.js";

export const createBuildServiceClient = createClientFactory<paths>();
export type Build = components["schemas"]["Build"];
export type Pipeline = components["schemas"]["Pipeline"];
export type Task = components["schemas"]["Task"];
export type TaskVersion = components["schemas"]["TaskVersion"];
export type Variable = components["schemas"]["Variable"];