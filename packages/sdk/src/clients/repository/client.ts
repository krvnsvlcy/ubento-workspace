import { createClientFactory } from "~/lib/client.js";
import { components, paths } from "./types.js";

export const createRepositoryServiceClient = createClientFactory<paths>();
export type Repository = components["schemas"]["Repository"];
export type Commit = components["schemas"]["Commit"];
export type Tag = components["schemas"]["Tag"];
export type Pointer = components["schemas"]["Pointer"];
export type CommitFile = components["schemas"]["CommitFile"];
export type ValidationError = components["schemas"]["ValidationError"];