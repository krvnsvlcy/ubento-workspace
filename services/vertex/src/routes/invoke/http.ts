import {
  invokeHttpService,
  HttpServiceSpecV1,
  httpConnectionCredentialsSchema,
} from "@ubento/vertex.core";
import prisma from "../../lib/prisma.js";
import { cryptoUtils } from "../../lib/crypto.js";
import { vertexResult, VertexResult } from "./invoke.js";

export async function handleHttpInvocation({
  team_id,
  spec,
  operationName,
  args,
  logger,
}: {
  team_id: string;
  spec: HttpServiceSpecV1;
  operationName: string;
  args: Record<string, unknown>;
  logger: any;
}): Promise<VertexResult> {
  const operation = spec.queries?.[operationName] || spec.actions?.[operationName];

  if (!operation) {
    logger.warn(
      `[Vertex] Unsupported operation: type=http, name=${operationName}`,
      {
        event: "vertex.operation.unsupported",
        team_id,
        operationName,
      } as any,
    );
    return vertexResult({
      error: {
        code: "INVALID_REQUEST_ERROR",
        message: `Unsupported operation: ${operationName}`,
      },
    });
  }

  const connectionSpec = spec.connection;
  let connection: any = null;
  let providerRecord: any = null;
  let parsedAuthData: any = undefined;

  if (connectionSpec) {
    providerRecord = await prisma.httpConnectionProvider.findFirst({
      where: {
        OR: [
          { handle: connectionSpec.provider },
          { name: connectionSpec.provider },
        ],
      },
    });

    if (providerRecord) {
      connection = await prisma.connection.findFirst({
        where: {
          team_id,
          type: "http",
          data: {
            equals: {
              providerId: providerRecord.id,
            },
          },
        },
      });
    }

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

      parsedAuthData = httpConnectionCredentialsSchema.parse(
        JSON.parse(decryptedString),
      );
    }

    logger.info(
      `[Vertex] Resolved connection: provider=${providerRecord.name}, connection_id=${connection.id}`,
      {
        event: "vertex.connection.resolved",
        team_id,
        provider: providerRecord.name,
        connection_id: connection.id,
      } as any,
    );
  }

  logger.info(
    `[Vertex] Triggering HTTP invocation: method=${operation.handler.request.method}, path=${operation.handler.request.path}`,
    {
      event: "vertex.invocation.trigger",
      team_id,
      method: operation.handler.request.method,
      path: operation.handler.request.path,
    } as any,
  );

  const result = await invokeHttpService({
    handler: operation.handler,
    connection:
      connection && connectionSpec && providerRecord
        ? {
            spec: connectionSpec,
            provider: providerRecord.config as any,
            credentials: parsedAuthData,
          }
        : undefined,
    args: args ?? {},
  });

  logger.info(
    `[Vertex] Invocation ${operationName} response [${
      result.status || result.error?.code
    }]: ${result.url}`,
    {
      event: "vertex.invocation.result",
    },
  );

  if (result.error) {
    console.error(JSON.stringify(result.error, null, 2));
    logger.error(
      `[Vertex] Invocation error: code=${result.error.code}, message=${result.error.message}`,
      {
        event: "error",
        code: result.error.code,
        context: { team_id, error: result.error.message },
      } as any,
    );

    switch (result.error.code) {
      case "INVALID_REQUEST_ERROR":
      case "UNSUPPORTED_HANDLER_TYPE":
        return vertexResult({
          error: {
            code: "INVALID_REQUEST_ERROR",
            message: result.error.message,
            details: result.error.details,
          },
        });
      case "UPSTREAM_ERROR":
        return vertexResult({
          error: {
            code: "UPSTREAM_ERROR",
            message: result.error.message,
            details: result.error.details,
          },
        });
      default:
        return vertexResult({
          error: {
            code: "UPSTREAM_ERROR",
            message: "An unknown internal error occurred.",
          },
        });
    }
  }

  return vertexResult({
    data: result.data,
  });
}
