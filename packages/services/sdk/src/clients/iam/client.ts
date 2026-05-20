import { createClientFactory } from "~/lib/client.js";
import { components, paths } from "./types.js";

export const createIamServiceClient = createClientFactory<paths>();
export type Team = components["schemas"]["Team"];
export type User = components["schemas"]["User"];
export type Session = components["schemas"]["Session"];
export type Client = components["schemas"]["Client"];
export type ClientCredential = components["schemas"]["ClientCredential"];
export type InviteStatus = components["schemas"]["InviteStatus"];
export type TeamInvite = components["schemas"]["TeamInvite"];
export type ResolvedInvitePublic = components["schemas"]["ResolvedInvitePublic"];
export type Message = components["schemas"]["Message"];
export type Error = components["schemas"]["Error"];