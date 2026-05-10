import { ubentoAuth } from "@ubento/services.primitives";
import {
  AuthorizationError,
  chain,
  enforce,
  validate,
  ValidationError,
} from "@ubento/services.toolkit";
import { Router } from "express";
import z from "zod";
import {
  invokeService,
  ServiceSpec,
} from "../../../../packages/foundations/build/index.js";
import { getTeamConnectionWithAuth } from "../entities/connection.js";
import { getServiceSpec } from "../entities/service.js";

const invokeRouter: Router = Router();

function createInvokeRoute(operationType: "query" | "action") {
  return chain(
    validate({
      params: z.object({
        team_id: z.string(),
      }),
      body: z.object({
        service: z.string(),
        channel: z.string().optional(),
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
      const { service, channel, args } = req.body as {
        service: string;
        channel?: string;
        args?: Record<string, unknown>;
      };
      const operationName = req.body[operationType] as string;

      const manifest: ServiceSpec = await getServiceSpec(service, channel);

      const operation =
        operationType === "query"
          ? manifest.queries?.[operationName]
          : manifest.actions?.[operationName];

      if (!operation)
        throw new ValidationError(
          `Unsupported ${operationType}: ${operationName}`,
        );

      const connection = await getTeamConnectionWithAuth(
        team_id,
        manifest.connection,
      );
      if (!connection)
        throw new AuthorizationError(
          `No valid connection found for ${service}`,
        );

      const result = await invokeService({
        operation,
        connection: {
          provider: connection.provider.config,
          auth: connection.auth,
        },
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

      res.status(200).json({ data: result.data });
    },
  );
}

invokeRouter.post("/:team_id/query", createInvokeRoute("query"));
invokeRouter.post("/:team_id/action", createInvokeRoute("action"));

export default invokeRouter;
