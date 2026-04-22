import { createClientFactory } from "~/lib/client.js";
import { components, paths } from "./types.js";

export const createIamServiceClient = createClientFactory<paths>();
export type Organization = components["schemas"]["Organization"];
export type User = components["schemas"]["User"];
export type Session = components["schemas"]["Session"];
export type Client = components["schemas"]["Client"];
export type ClientCredential = components["schemas"]["ClientCredential"];
export type InviteStatus = components["schemas"]["InviteStatus"];
export type OrganizationInvite = components["schemas"]["OrganizationInvite"];
export type ResolvedInvitePublic = components["schemas"]["ResolvedInvitePublic"];
export type Message = components["schemas"]["Message"];
export type Error = components["schemas"]["Error"];