import { createClientFactory } from "~/lib/client.js";
import { components, paths } from "./types.js";

export const createWorkspaceServiceClient = createClientFactory<paths>();
export type Workspace = components["schemas"]["Workspace"];
export type Board = components["schemas"]["Board"];
export type WorkspaceMembership = components["schemas"]["WorkspaceMembership"];
export type WorkspaceInvite = components["schemas"]["WorkspaceInvite"];
export type Error = components["schemas"]["Error"];