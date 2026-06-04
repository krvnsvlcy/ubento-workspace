import {
  chain,
  NotFoundError,
  parseCursorQuery,
  parseStringQuery,
  toSerializable,
  validate,
} from "@ubento/services.toolkit";
import { mongodbConnectionCredentialsSchema } from "@ubento/vertex.core";
import { invokeMongoService } from "@ubento/vertex.invoke";
import { Request, Response, Router } from "express";
import { z } from "zod";
import {
  createConnection,
  deleteConnection,
  getConnection,
  listConnections,
  updateConnection,
} from "../entities/connection.js";
import { cryptoUtils } from "../lib/crypto.js";
import prisma from "../lib/prisma.js";

const router: Router = Router();

router.get(
  "/:connection_id",
  chain(
    validate({
      params: z.object({
        connection_id: z.string(),
      }),
    }),
    async (req: Request, res: Response) => {
      const connection = await getConnection(
        req.params.connection_id as string,
      );
      if (!connection) {
        throw new NotFoundError(`connection ${req.params.connection_id}`);
      }
      res.json(toSerializable(connection));
    },
  ),
);

router.get(
  "/",
  chain(
    validate({
      query: z.object({
        team_id: z.string().optional(),
        tags: z.string().optional(),
        cursor: z.string().optional(),
        limit: z.coerce.number().optional(),
      }),
    }),
    async (req: Request, res: Response) => {
      const result = await listConnections({
        ...parseCursorQuery(req),
        team_id: parseStringQuery(req, "team_id"),
        tags: parseStringQuery(req, "tags")?.split(","),
      });
      res.json(result);
    },
  ),
);

router.post(
  "/",
  chain(
    validate({
      body: z.object({
        name: z.string().min(1),
        team_id: z.string().min(1),
        type: z.string(),
        data: z.looseObject({}).optional(),
        credentials: z.unknown().optional(),
        description: z.string().optional(),
      }),
    }),
    async (req: Request, res: Response) => {
      console.log("creating connection", req.body);
      const { data, type, team_id, name, description, credentials } =
        req.body as {
          name: string;
          team_id: string;
          type: string;
          data: unknown;
          credentials?: unknown;
          description?: string;
        };
      const connection = await createConnection({
        type,
        data,
        team_id,
        name,
        description,
        credentials,
      });
      console.log("created connection", connection);
      res.json(toSerializable(connection));
    },
  ),
);

router.patch(
  "/:connection_id",
  chain(
    validate({
      params: z.object({
        connection_id: z.string(),
      }),
      body: z.object({
        credentials: z.unknown().optional(),
        data: z.object({}).optional(),
        name: z.string().optional(),
      }),
    }),
    async (req: Request, res: Response) => {
      const { credentials, name, data } = req.body as {
        credentials?: unknown;
        name?: string;
        data?: object;
      };

      const connection = await updateConnection(
        req.params.connection_id as string,
        {
          credentials,
          name,
          data,
        },
      );
      res.json(toSerializable(connection));
    },
  ),
);

router.delete(
  "/:connection_id",
  chain(
    validate({
      params: z.object({
        connection_id: z.string(),
      }),
    }),
    async (req: Request, res: Response) => {
      await deleteConnection(req.params.connection_id as string);
      res.json({ id: req.params.connection_id });
    },
  ),
);

router.get(
  "/:connection_id/mongodb/schema",
  chain(
    validate({
      params: z.object({
        connection_id: z.string(),
      }),
      query: z.object({
        database: z.string(),
        sampleSize: z.coerce
          .number()
          .int()
          .min(1)
          .max(5000)
          .default(100)
          .optional(),
      }),
    }),
    async (req: Request, res: Response) => {
      const database = parseStringQuery(req, "database")!;
      const connection = await prisma.connection.findUnique({
        where: {
          id: req.params.connection_id as string,
        },
      });

      if (!connection) {
        throw new NotFoundError(
          `connection ${req.params.connection_id as string}`,
        );
      }

      if (connection.type !== "mongodb") {
        res.status(400).json({
          error: "INVALID_CONNECTION_TYPE",
          message: `Connection ${req.params.connection_id} is not a MongoDB connection (type: ${connection.type})`,
        });
        return;
      }

      let parsedAuthData: any = undefined;

      if (connection.credentials) {
        const decryptedString = await cryptoUtils.decrypt({
          iv: (connection.credentials as any).iv,
          authTag: (connection.credentials as any).auth_tag,
          cipherText: (connection.credentials as any).cipher_text,
        });

        parsedAuthData = mongodbConnectionCredentialsSchema.parse(
          JSON.parse(decryptedString),
        );
      }

      const result = await invokeMongoService({
        operation: "extractDbSchema",
        connection: {
          database,
          data: (connection.data as any) || {},
          credentials: parsedAuthData,
        },
        args: {
          sampleSize: (req.query as any)?.sampleSize ?? 100,
        },
      });

      if (result.error) {
        res.status(500).json({
          error: result.error.code,
          message: result.error.message,
          details: result.error.details,
        });
        return;
      }

      res.json(result.data);
    },
  ),
);

router.get(
  "/:connection_id/mongodb/databases",
  chain(
    validate({
      params: z.object({
        connection_id: z.string(),
      }),
    }),
    async (req: Request, res: Response) => {
      const connection = await prisma.connection.findUnique({
        where: {
          id: req.params.connection_id as string,
        },
      });

      if (!connection) {
        throw new NotFoundError(
          `connection ${req.params.connection_id as string}`,
        );
      }

      if (connection.type !== "mongodb") {
        res.status(400).json({
          error: "INVALID_CONNECTION_TYPE",
          message: `Connection ${req.params.connection_id} is not a MongoDB connection (type: ${connection.type})`,
        });
        return;
      }

      let parsedAuthData: any = undefined;

      if (connection.credentials) {
        const decryptedString = await cryptoUtils.decrypt({
          iv: (connection.credentials as any).iv,
          authTag: (connection.credentials as any).auth_tag,
          cipherText: (connection.credentials as any).cipher_text,
        });

        parsedAuthData = mongodbConnectionCredentialsSchema.parse(
          JSON.parse(decryptedString),
        );
      }

      const result = await invokeMongoService({
        operation: "listDatabases",
        connection: {
          database: "admin", // Fallback database to establish connection
          data: (connection.data as any) || {},
          credentials: parsedAuthData,
        },
        args: {},
      });

      if (result.error) {
        res.status(500).json({
          error: result.error.code,
          message: result.error.message,
          details: result.error.details,
        });
        return;
      }

      res.json(result.data);
    },
  ),
);

export default router;
