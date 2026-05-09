import { ubentoAuth } from "@ubento/services.primitives";
import {
  AuthorizationError,
  chain,
  enforce,
  validate,
  ValidationError,
} from "@ubento/services.toolkit";
import { invokeService, ServiceSpec } from "@ubento/vertex.core";
import { Router } from "express";
import z from "zod";
import { getTeamConnectionWithAuth } from "../entities/connection.js";
import { getServiceSpec } from "../entities/service.js";

const invokeRouter: Router = Router();

invokeRouter.post(
  "/:team_id/query",
  chain(
    validate({
      params: z.object({
        team_id: z.string(),
      }),
      body: z.object({
        service: z.string(),
        version: z.string().optional(),
        query: z.string(),
        args: z.record(z.string(), z.unknown()).optional(),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.vertex.query],
      scope: ({ params }) =>
        ubentoAuth.scopes.team({ team_id: params.team_id as string }),
    }),
    async (req, res) => {
      const { team_id } = req.params;
      const { service, version, query, args } = req.body;

      const manifest: ServiceSpec = await getServiceSpec(service, version);

      const operation = manifest.queries?.[query];
      if (!operation) throw new ValidationError(`Unsupported query: ${query}`);

      const connection = await getTeamConnectionWithAuth(
        team_id,
        manifest.connection,
      );
      if (!connection)
        throw new AuthorizationError(
          `No valid connection found for ${service}`,
        );

      const data = await invokeService({
        operation,
        connection: {
          spec: manifest.connection,
          auth: connection.auth,
        },
        args: args ?? {},
      });

      res.status(200).json({ data });
    },
  ),
);

export default invokeRouter;
