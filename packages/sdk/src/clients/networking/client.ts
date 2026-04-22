import { createClientFactory } from "~/lib/client.js";
import { components, paths } from "./types.js";

export const createNetworkingServiceClient = createClientFactory<paths>();
export type Certificate = components["schemas"]["Certificate"];
export type Domain = components["schemas"]["Domain"];
export type Pointer = components["schemas"]["Pointer"];
export type DnsAnswer = components["schemas"]["DnsAnswer"];
export type DomainRecordSet = components["schemas"]["DomainRecordSet"];
export type DomainStates = components["schemas"]["DomainStates"];