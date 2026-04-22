import { createClientFactory } from "~/lib/client.js";
import { components, paths } from "./types.js";

export const createIdentityServiceClient = createClientFactory<paths>();
export type Organization = components["schemas"]["Organization"];
export type OrganizationMembership =
  components["schemas"]["OrganizationMembership"];
export type OrganizationInvite = components["schemas"]["OrganizationInvite"];
export type User = components["schemas"]["User"];
export type InviteStatus = components["schemas"]["InviteStatus"];
export type ResolvedInvitePublic =
  components["schemas"]["ResolvedInvitePublic"];
export type Message = components["schemas"]["Message"];
export type Error = components["schemas"]["Error"];
