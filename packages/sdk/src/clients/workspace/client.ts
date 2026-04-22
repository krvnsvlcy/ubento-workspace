import { createClientFactory } from "~/lib/client.js";
import { components, paths } from "./types.js";

export const createWorkspaceServiceClient = createClientFactory<paths>();
export type Workspace = components["schemas"]["Workspace"];
export type CreateWorkspaceRequest = components["schemas"]["CreateWorkspaceRequest"];
export type UpdateWorkspaceRequest = components["schemas"]["UpdateWorkspaceRequest"];
export type File = components["schemas"]["File"];
export type CreateFileRequest = components["schemas"]["CreateFileRequest"];
export type UpdateFileRequest = components["schemas"]["UpdateFileRequest"];
export type FileContent = components["schemas"]["FileContent"];