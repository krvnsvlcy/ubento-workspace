import { ubentoAuth } from "@ubento/services.primitives";
import { chain, enforce, validate } from "@ubento/services.toolkit";
import { invokeHttpService, ServiceSpecV1 } from "@ubento/vertex.core";
import { Router } from "express";
import z from "zod";
import { getTeamConnectionWithAuth } from "../entities/connection.js";
import { getServiceSpec } from "../entities/service_channel.js";
import { vertexUsageProxy } from "../libs/bento.js";

export interface VertexError {
  code:
    | "INVALID_REQUEST_ERROR"
    | "USAGE_LIMIT_EXCEEDED"
    | "UPSTREAM_ERROR"
    | "INVALID_CREDENTIALS"
    | "INTERNAL_ERROR";
  message?: string;
  details?: unknown;
}

export interface VertexResult<T = unknown> {
  data?: T;
  error?: VertexError;
}

export function vertexResult<T>(result: VertexResult<T>): VertexResult<T> {
  return result;
}

// --- Router ---

const invokeRouter: Router = Router();

function createInvokeRoute(operationType: "query" | "action") {
  return chain(
    validate({
      params: z.object({
        team_id: z.string(),
      }),
      body: z.object({
        service_channel_id: z.string(),
        [operationType]: z.string(),
        args: z.record(z.string(), z.unknown()).optional(),
      }),
    }),
    enforce({
      permissions: [
        operationType === "query"
          ? ubentoAuth.actions.vertex.query
          : ubentoAuth.actions.vertex.mutate,
      ],
      scope: ({ params }) =>
        ubentoAuth.scopes.team({ team_id: params.team_id as string }),
    }),
    async (req, res) => {
      console.log("step 1");
      const { team_id } = req.params;
      const { service_channel_id, args } = req.body as {
        service_channel_id: string;
        args?: Record<string, unknown>;
      };
      const operationName = req.body[operationType] as string;

      const spec: ServiceSpecV1 = await getServiceSpec(service_channel_id);
      console.log("step 2");
      let reservationKey: string;
      try {
        reservationKey = await vertexUsageProxy.reserve(team_id, 1);
      } catch (err: any) {
        const errMsg = err?.message || "";
        if (
          errMsg.includes("USAGE_LIMIT_EXCEEDED") ||
          errMsg.includes("Quota exceeded")
        ) {
          return res.status(200).json(
            vertexResult({
              error: {
                code: "USAGE_LIMIT_EXCEEDED",
                message: `Vertex usage exceeded. Please check your plan and upgrade if needed.`,
              },
            }),
          );
        }
        console.error(err);
        return res.status(200).json(
          vertexResult({
            error: {
              code: "INTERNAL_ERROR",
              message: `Failed to secure quota: ${err?.message || "unknown error"}`,
            },
          }),
        );
      }

      console.log("step 3");
      const operation =
        operationType === "query"
          ? spec.queries?.[operationName]
          : spec.actions?.[operationName];

      if (!operation) {
        return res.status(200).json(
          vertexResult({
            error: {
              code: "INVALID_REQUEST_ERROR",
              message: `Unsupported ${operationType}: ${operationName}`,
            },
          }),
        );
      }
      console.log("step 4");
      const connectionSpec = spec.connection;

      let connection;
      if (connectionSpec) {
        connection = await getTeamConnectionWithAuth(team_id, connectionSpec);
        if (!connection) {
          return res.status(200).json(
            vertexResult({
              error: {
                code: "INVALID_CREDENTIALS",
                message: `No valid connection found for service ${spec.name}`,
              },
            }),
          );
        }
      }
      console.log("step 5");
      const result = await invokeHttpService({
        handler: operation.handler,
        connection:
          connection && connectionSpec
            ? {
                spec: connectionSpec,
                provider: connection.provider.config as any,
                credentials: connection.auth as any,
              }
            : undefined,
        args: args ?? {},
      });
      console.log("step 6");
      if (result.error) {
        vertexUsageProxy.release(reservationKey).catch(console.error);

        switch (result.error.code) {
          case "INVALID_REQUEST_ERROR":
          case "UNSUPPORTED_HANDLER_TYPE":
            return res.status(200).json(
              vertexResult({
                error: {
                  code: "INVALID_REQUEST_ERROR",
                  message: result.error.message,
                  details: result.error.details,
                },
              }),
            );
          case "UPSTREAM_ERROR":
            // 2. Use 502 for upstream failures and include details if available
            return res.status(200).json(
              vertexResult({
                error: {
                  code: "UPSTREAM_ERROR",
                  message: result.error.message,
                  details: result.error.details, // Don't swallow upstream debug info
                },
              }),
            );
          default:
            // 3. Catch-all prevents the request from hanging
            return res.status(200).json(
              vertexResult({
                error: {
                  code: "UPSTREAM_ERROR",
                  message: "An unknown internal error occurred.",
                },
              }),
            );
        }
      }
      vertexUsageProxy.commit(reservationKey, 1).catch(console.error);
      console.log("step 7");
      res.status(200).json(
        vertexResult({
          data: result.data,
        }),
      );
    },
  );
}

invokeRouter.post("/:team_id/query", createInvokeRoute("query"));
invokeRouter.post("/:team_id/action", createInvokeRoute("action"));

export default invokeRouter;
