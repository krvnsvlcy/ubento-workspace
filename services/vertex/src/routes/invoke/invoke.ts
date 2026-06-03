import { ubentoAuth } from "@ubento/services.primitives";
import {
  chain,
  enforce,
  getRequestLogger,
  validate,
} from "@ubento/services.toolkit";
import { ServiceSpecV1 } from "@ubento/vertex.core";
import { Router } from "express";
import z from "zod";
import { getServiceSpec } from "../../entities/service_channel.js";
import { vertexUsageProxy } from "../../libs/bento.js";
import { handleHttpInvocation } from "./http.js";
import { handleMongodbInvocation } from "./mongodb.js";

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

invokeRouter.post(
  "/:team_id",
  chain(
    validate({
      params: z.object({
        team_id: z.string(),
      }),
      body: z.object({
        service_channel_id: z.string(),
        operation: z.string(),
        args: z.record(z.string(), z.unknown()).optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.vertex.invoke],
      scope: ({ params }) =>
        ubentoAuth.scopes.team({ team_id: params.team_id as string }),
    }),
    async (req, res) => {
      const logger = getRequestLogger(req);
      const { team_id } = req.params;
      const { service_channel_id, operation, args } = req.body as {
        service_channel_id: string;
        operation: string;
        args?: Record<string, unknown>;
      };

      logger.info(
        `[Vertex] Starting invocation: channel=${service_channel_id}, operation=${operation}`,
        {
          event: "vertex.invocation.start",
          team_id,
          service_channel_id,
          operationName: operation,
        } as any,
      );

      const spec: ServiceSpecV1 = await getServiceSpec(service_channel_id);
      logger.info(`[Vertex] Retrieved service spec: name=${spec.name}`, {
        event: "vertex.spec.retrieved",
        team_id,
        service_name: spec.name,
      } as any);

      let reservationKey: string;
      try {
        reservationKey = await vertexUsageProxy.reserve(team_id, 1);
        logger.info(
          `[Vertex] Secured quota reservation: key=${reservationKey}`,
          { event: "vertex.quota.reserved", team_id, reservationKey } as any,
        );
      } catch (err: any) {
        const errMsg = err?.message || "";
        logger.error(`[Vertex] Quota reservation failed: ${errMsg}`, {
          event: "error",
          context: { team_id, error: errMsg },
        } as any);
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

      try {
        let result: VertexResult;

        if (spec.type === "http") {
          result = await handleHttpInvocation({
            team_id,
            spec,
            operationName: operation,
            args: args ?? {},
            logger,
          });
        } else if (spec.type === "mongodb") {
          result = await handleMongodbInvocation({
            team_id,
            spec,
            operationName: operation,
            args: args ?? {},
            logger,
          });
        } else {
          // Spec type not matching anything
          result = vertexResult({
            error: {
              code: "INVALID_REQUEST_ERROR",
              message: `Unsupported spec type: ${(spec as any).type}`,
            },
          });
        }

        if (result.error) {
          vertexUsageProxy.release(reservationKey).catch(console.error);
          return res.status(200).json(result);
        }

        vertexUsageProxy.commit(reservationKey, 1).catch(console.error);
        logger.info(`[Vertex] Invocation succeeded: operation=${operation}`, {
          event: "vertex.invocation.success",
          team_id,
          operationName: operation,
        } as any);

        return res.status(200).json(result);
      } catch (err: any) {
        vertexUsageProxy.release(reservationKey).catch(console.error);
        logger.error(`[Vertex] Invocation internal failure: ${err?.message}`, {
          event: "error",
          context: { team_id, error: err?.message || "unknown error" },
        } as any);
        return res.status(200).json(
          vertexResult({
            error: {
              code: "INTERNAL_ERROR",
              message: err?.message || "An unknown internal error occurred.",
            },
          }),
        );
      }
    },
  ),
);

export default invokeRouter;
