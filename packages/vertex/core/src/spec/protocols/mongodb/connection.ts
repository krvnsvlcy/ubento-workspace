import { z } from "zod";

// Data

export const mongodbConnectionDataSchema = z.object({
  // 1. SRV Support (Crucial for Atlas)
  isSrv: z
    .boolean()
    .default(false)
    .describe("Set to true if using a mongodb+srv:// connection"),

  // 2. Flexible Host
  host: z
    .string()
    .min(1, "Host is required")
    .describe("The host address, or the SRV address if isSrv is true"),

  // 3. Optional Port (SRV records don't use explicit ports)
  port: z
    .number()
    .optional()
    .describe("MongoDB port. Omit if using an SRV record"),

  // 4. Operational Context
  defaultDatabase: z
    .string()
    .optional()
    .describe("The primary database to query (distinct from authSource)"),

  // 5. Topology & Security
  tls: z
    .boolean()
    .default(false)
    .describe("Required for Atlas and most managed clusters"),
  replicaSet: z
    .string()
    .optional()
    .describe(
      "Required if connecting to a standard replica set without an SRV record",
    ),

  // 6. Escape Hatch
  options: z
    .record(z.string(), z.unknown())
    .optional()
    .describe("Additional URL parameters (e.g., readPreference, retryWrites)"),
});
export type MongodbConnectionData = z.infer<typeof mongodbConnectionDataSchema>;

// Credentials

export const scramConnectionCredentialsSchema = z.object({
  type: z.literal("scram"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  authSource: z
    .string()
    .default("admin")
    .describe("The database used to authenticate the user"),
});

export const x509ConnectionCredentialsSchema = z.object({
  type: z.literal("x509"),
  clientCertificate: z
    .string()
    .min(1, "Client certificate (PEM format) is required"),
  clientKey: z
    .string()
    .optional()
    .describe("Private key, if not included in the certificate PEM"),
  certificatePassword: z.string().optional(),
});

export const awsConnectionCredentialsSchema = z.object({
  type: z.literal("aws"),
  accessKeyId: z.string().min(1, "AWS Access Key ID is required"),
  secretAccessKey: z.string().min(1, "AWS Secret Access Key is required"),
  sessionToken: z.string().optional(),
});

export const noneConnectionCredentialsSchema = z.object({
  type: z.literal("none"),
});

export const mongodbConnectionCredentialsSchema = z.discriminatedUnion("type", [
  scramConnectionCredentialsSchema,
  x509ConnectionCredentialsSchema,
  awsConnectionCredentialsSchema,
  noneConnectionCredentialsSchema,
]);

export type MongodbConnectionCredentials = z.infer<
  typeof mongodbConnectionCredentialsSchema
>;
