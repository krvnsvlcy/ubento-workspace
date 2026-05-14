import { ubentoAuth } from "@ubento/services.primitives";
import {
  AuthorizationError,
  chain,
  enforce,
  validate,
  ValidationError,
} from "@ubento/services.toolkit";
import { invokeHttpService, ServiceSpecV1 } from "@ubento/vertex.core";
import { Router } from "express";
import z from "zod";
import { getTeamConnectionWithAuth } from "../entities/connection.js";
import { getServiceSpec } from "../entities/service_channel.js";

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
      const { team_id } = req.params;
      const { service_channel_id, args } = req.body as {
        service_channel_id: string;
        args?: Record<string, unknown>;
      };
      const operationName = req.body[operationType] as string;

      const spec: ServiceSpecV1 = await getServiceSpec(service_channel_id);

      const operation =
        operationType === "query"
          ? spec.queries?.[operationName]
          : spec.actions?.[operationName];

      if (!operation)
        throw new ValidationError(
          `Unsupported ${operationType}: ${operationName}`,
        );

      const connectionSpec = spec.connection;

      let connection;
      if (connectionSpec) {
        connection = await getTeamConnectionWithAuth(team_id, connectionSpec);
        if (!connection) {
          throw new AuthorizationError(
            `No valid connection found for service ${spec.name}`,
          );
        }
      }

      const result = await invokeHttpService({
        handler: operation.handler,
        connection:
          connection && connectionSpec
            ? {
                spec: connectionSpec,
                provider: connection.provider.config,
                credentials: connection.auth as any,
              }
            : undefined,
        args: args ?? {},
      });

      if (result.error) {
        switch (result.error.code) {
          case "INVALID_REQUEST_ERROR":
            throw new ValidationError(result.error.message, {
              code: result.error.code,
              details: result.error.details,
            });
          default:
            throw new Error(result.error.message);
        }
      }

      res.status(200).json(result.data);
    },
  );
}

invokeRouter.post("/:team_id/query", createInvokeRoute("query"));
invokeRouter.post("/:team_id/action", createInvokeRoute("action"));

export default invokeRouter;
