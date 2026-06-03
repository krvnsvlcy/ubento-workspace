import {
  invokeMongoService,
  MongodbServiceSpecV1,
  mongodbConnectionCredentialsSchema,
} from "@ubento/vertex.core";
import prisma from "../../lib/prisma.js";
import { cryptoUtils } from "../../lib/crypto.js";
import { vertexResult, VertexResult } from "./invoke.js";

export async function handleMongodbInvocation({
  team_id,
  spec,
  operationName,
  args,
  logger,
}: {
  team_id: string;
  spec: MongodbServiceSpecV1;
  operationName: string;
  args: Record<string, unknown>;
  logger: any;
}): Promise<VertexResult> {
  let connection: any = null;
  let parsedAuthData: any = undefined;

  if (spec.connectionId) {
    connection = await prisma.connection.findUnique({
      where: {
        id: spec.connectionId,
      },
    });

    if (!connection) {
      logger.warn(
        `[Vertex] No active connection found for service ${spec.name}`,
        {
          event: "vertex.connection.missing",
          team_id,
          service_name: spec.name,
        } as any,
      );
      return vertexResult({
        error: {
          code: "INVALID_CREDENTIALS",
          message: `No valid connection found for service ${spec.name}`,
        },
      });
    }

    if (connection.credentials) {
      const decryptedString = await cryptoUtils.decrypt({
        iv: connection.credentials.iv,
        authTag: connection.credentials.auth_tag,
        cipherText: connection.credentials.cipher_text,
      });

      parsedAuthData = mongodbConnectionCredentialsSchema.parse(
        JSON.parse(decryptedString),
      );
    }
  }

  logger.info(
    `[Vertex] Resolving MongoDB invocation: operation=${operationName}`,
    { event: "vertex.invocation.trigger", team_id, operationName } as any,
  );

  const result = await invokeMongoService({
    operation: operationName as any,
    connection: {
      data: connection ? (connection.data as any) : undefined,
      credentials: parsedAuthData,
    },
    args: args ?? {},
  });

  logger.info(
    `[Vertex] MongoDB Invocation ${operationName} response: ${
      result.error ? result.error.code : "SUCCESS"
    }`,
    {
      event: "vertex.invocation.result",
    },
  );

  if (result.error) {
    console.error(JSON.stringify(result.error, null, 2));
    logger.error(
      `[Vertex] MongoDB Invocation error: code=${result.error.code}, message=${result.error.message}`,
      {
        event: "error",
        code: result.error.code,
        context: { team_id, error: result.error.message },
      } as any,
    );
    return vertexResult({
      error: {
        code:
          result.error.code === "INVALID_OPERATION" ||
          result.error.code === "INVALID_ARGUMENTS"
            ? "INVALID_REQUEST_ERROR"
            : "INTERNAL_ERROR",
        message: result.error.message,
        details: result.error.details,
      },
    });
  }

  return vertexResult({
    data: result.data,
  });
}
