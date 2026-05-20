import { z } from "zod";
import {
  httpConnectionCredentialsSchema,
  httpConnectionProviderConfigSchema,
} from "./http";

export const connectionProviderConfigSchema = z.discriminatedUnion("type", [
  httpConnectionProviderConfigSchema,
]);
export type ConnectionProviderConfig_r = z.input<
  typeof connectionProviderConfigSchema
>;
export type ConnectionProviderConfig = z.output<
  typeof connectionProviderConfigSchema
>;

export const connectionCredentialsSchema = z.union([
  httpConnectionCredentialsSchema,
]);
export type ConnectionCredentials_r = z.input<
  typeof connectionCredentialsSchema
>;
export type ConnectionCredentials = z.output<
  typeof connectionCredentialsSchema
>;
