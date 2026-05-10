import { createClientFactory } from "~/lib/client.js";
import { components, paths } from "./types.js";

export const createVertexServiceClient = createClientFactory<paths>();
export type ConnectionProvider = components["schemas"]["ConnectionProvider"];
export type Connection = components["schemas"]["Connection"];
export type OAuthConnectionState = components["schemas"]["OAuthConnectionState"];
export type EncryptedData = components["schemas"]["EncryptedData"];
export type Service = components["schemas"]["Service"];
export type ServiceChannel = components["schemas"]["ServiceChannel"];
export type OAuthClient = components["schemas"]["OAuthClient"];