import { z } from "zod";
import {
  httpConnectionCredentialsSchema,
  httpConnectionProviderConfigSchema,
} from "./http";

export const connectionProviderConfigSchema = z.discriminatedUnion("type", [
  httpConnectionProviderConfigSchema,
]);
export type ConnectionProviderConfig = z.infer<
  typeof connectionProviderConfigSchema
>;

export const connectionCredentialsSchema = z.union([
  httpConnectionCredentialsSchema,
]);
export type ConnectionCredentials = z.infer<typeof connectionCredentialsSchema>;
