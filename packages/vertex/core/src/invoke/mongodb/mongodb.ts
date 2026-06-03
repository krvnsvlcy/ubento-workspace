import { MongoClient, MongoClientOptions } from "mongodb";
import {
  MongodbConnectionCredentials,
  MongodbConnectionData,
} from "../../spec/protocols/mongodb/connection";
import {
  MongoOperation,
  runMongoOperation,
  RunMongoOperationResult,
} from "./run";

export async function invokeMongoService<T>({
  operation,
  connection,
  args,
}: {
  operation: MongoOperation;
  connection?: {
    data: MongodbConnectionData;
    credentials: MongodbConnectionCredentials;
  };
  args: Record<string, unknown>; // Contains collection, filter, document, etc.
}): Promise<RunMongoOperationResult<T>> {
  // 1. Guard against missing infrastructure connections
  if (!connection) {
    return {
      data: null,
      error: {
        code: "INVALID_ARGUMENTS",
        message:
          "MongoDB connection data and credentials are required to invoke this service.",
      },
    };
  }

  const { data, credentials } = connection;
  const clientOptions: MongoClientOptions = {};
  let authPrefix = "";

  // 2. Map structural credential variants to native driver option configurations
  switch (credentials.type) {
    case "scram":
      const username = encodeURIComponent(credentials.username);
      const password = encodeURIComponent(credentials.password);
      authPrefix = `${username}:${password}@`;

      if (credentials.authSource) {
        clientOptions.authSource = credentials.authSource;
      }
      break;

    case "x509":
      clientOptions.tls = true;
      clientOptions.tlsCertificateKeyFile = credentials.clientCertificate;
      if (credentials.certificatePassword) {
        clientOptions.tlsCertificateKeyFilePassword =
          credentials.certificatePassword;
      }
      break;

    case "aws":
      clientOptions.authMechanism = "MONGODB-AWS";
      clientOptions.auth = {
        username: credentials.accessKeyId,
        password: credentials.secretAccessKey,
      };
      if (credentials.sessionToken) {
        clientOptions.authMechanismProperties = {
          AWS_SESSION_TOKEN: credentials.sessionToken,
        };
      }
      break;

    case "none":
      break;
  }

  // 3. Construct connection string string format
  const protocol = data.isSrv ? "mongodb+srv://" : "mongodb://";
  const hostPart = data.isSrv
    ? data.host
    : `${data.host}:${data.port || 27017}`;
  const uri = `${protocol}${authPrefix}${hostPart}`;

  // 4. Merge operational topology settings & escape-hatch parameters
  if (data.tls) clientOptions.tls = true;
  if (data.replicaSet) clientOptions.replicaSet = data.replicaSet;
  if (data.options) {
    Object.assign(clientOptions, data.options);
  }

  // 5. Establish ephemeral network connection pool
  let client: MongoClient;
  try {
    client = new MongoClient(uri, clientOptions);
    await client.connect();
  } catch (error: any) {
    return {
      data: null,
      error: {
        code: "INTERNAL_ERROR",
        message: `Failed to establish connection to MongoDB infrastructure: ${error?.message || "Unknown Error"}`,
        details: error,
      },
    };
  }

  try {
    // 6. Enrich concrete args with default runtime database fallback if omitted by caller
    const enrichedArgs = {
      ...args,
      database: args.database || data.defaultDatabase,
    };

    // 7. Route and execute through the strategy registry
    return await runMongoOperation<T>({
      client,
      operation,
      args: enrichedArgs,
    });
  } catch (error: any) {
    return {
      data: null,
      error: {
        code: "INTERNAL_ERROR",
        message:
          error?.message ||
          "An unhandled error occurred during driver execution runtime.",
        details: error,
      },
    };
  } finally {
    // 8. Safely release network socket handles back to the OS
    await client.close();
  }
}
