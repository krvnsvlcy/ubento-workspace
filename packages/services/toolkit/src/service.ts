import cors, { CorsOptions } from "cors";
import Express, { Application, NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { auth } from "./libs/authentication/authentication.js";
import { TrustedIssuer } from "./libs/authentication/issuer.js";
import { ServiceError } from "./libs/errors.js";
import {
  createServiceLogger,
  ServiceLogger,
} from "./libs/telemetry/logging.js";
import {
  decrementRequestCount,
  incrementRequestCount,
} from "./libs/telemetry/state.js";
import { errorResponse } from "./utils/response.js";
import { openApiSpec } from "./utils/spec.js";

export type AuthOptions = {
  audience?: string;
  issuers?: TrustedIssuer[];
  disabled?: boolean;
  authorizationDatabaseUri?: string;
};

export type ServiceOptions = {
  port: number;
  name: string;
  auth?: AuthOptions | boolean;
  logger?: ServiceLogger; // optional; falls back to no-op
  exposeHeaders?: string[]; // default: ["Link", "X-Request-Id"]
  cors?: CorsOptions | boolean; // new option
  spec?: any;
  bodyParser?:
    | boolean
    | {
        limit?: string;
      };
};

export type ServiceInstance = {
  app: Application;
  start: () => void;
};

export function createService(options: ServiceOptions): ServiceInstance {
  const app = Express();
  const baseLogger =
    options.logger ??
    createServiceLogger({
      serviceName: options.name,
    });

  /* ------------------ requestContext ------------------ */
  app.use((req: Request, res: Response, next: NextFunction) => {
    const requestId = req.header("x-request-id") || uuidv4();
    // Set the header so clients can read it (and we’re exposing it above).
    res.setHeader("X-Request-Id", requestId);
    req.context = {
      requestId,
      logger: baseLogger.child({ requestId }),
    };
    const message = `${req.method} ${req.originalUrl}`;
    req.context.logger.info(message, {
      event: "request.start",
      method: req.method,
      path: req.originalUrl,
    });
    next();
  });

  /* ------------------ requestLogger ------------------ */
  app.use((req: Request, res: Response, next: NextFunction) => {
    const started = Date.now();
    incrementRequestCount();
    res.on("finish", () => {
      const duration = Date.now() - started;
      const message = `${req.method} ${req.originalUrl} ${res.statusCode} ${res.statusMessage} (${duration}ms)`;
      if (res.statusCode >= 500) {
        req.context.logger.error(message, {
          event: "request.end",
          method: req.method,
          path: req.originalUrl,
          status: res.statusCode,
          duration,
        });
      } else if (res.statusCode >= 400) {
        req.context.logger.warn(message, {
          event: "request.end",
          method: req.method,
          path: req.originalUrl,
          status: res.statusCode,
          duration,
        });
      } else {
        req.context.logger.info(message, {
          event: "request.end",
          method: req.method,
          path: req.originalUrl,
          status: res.statusCode,
          duration,
        });
      }
      decrementRequestCount();
    });
    next();
  });

  // CORS: apply by default
  if (options.cors !== false) {
    app.use(cors(options.cors === true ? {} : options.cors));
  }

  /* ------------------ CORS expose headers ------------------ */
  const defaultExposed = ["Link", "X-Request-Id"];
  const exposeSet = new Set(
    (options.exposeHeaders ?? defaultExposed).map((h) => h.toLowerCase()),
  );

  /* ------------------ Meta ------------------ */

  if (options.spec) {
    app.use(openApiSpec(options.name, options.spec));
  }

  /* ------------------ Authentication ------------------ */
  if (options.auth !== false) {
    const opt: AuthOptions =
      typeof options.auth === "object" ? options.auth : {};
    app.use(auth(opt));
  } else {
    app.use((req: Request, res: Response, next: NextFunction) => {
      req.auth = {
        subject: "",
        scope: ["*"],
      };
      next();
    });
  }

  /* ------------------ Body parsing ------------------ */
  if (options.bodyParser !== false) {
    const bodyParserOptions =
      typeof options.bodyParser === "object" ? options.bodyParser : {};
    app.use(Express.json({ limit: bodyParserOptions.limit }));
    app.use(Express.urlencoded({ extended: true }));
  }

  app.use((_req: Request, res: Response, next: NextFunction) => {
    // Merge with any pre-set value from upstream middleware.
    const prior = res.getHeader("Access-Control-Expose-Headers");
    const priorList =
      typeof prior === "string"
        ? prior
            .split(",")
            .map((s) => s.trim().toLowerCase())
            .filter(Boolean)
        : Array.isArray(prior)
          ? prior.map((s) => String(s).trim().toLowerCase()).filter(Boolean)
          : [];

    for (const h of priorList) exposeSet.add(h);

    // Write back in canonical casing (browsers treat header names case-insensitively).
    const out = Array.from(exposeSet).map((h) =>
      h
        .split("-")
        .map((p) => (p ? p[0].toUpperCase() + p.slice(1) : p))
        .join("-"),
    );
    if (out.length)
      res.setHeader("Access-Control-Expose-Headers", out.join(", "));
    next();
  });

  /* ------------------ start (ensures error handler last) ------------------ */
  function start() {
    app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
      if (err instanceof ServiceError) {
        if (err.status >= 500) {
          req.context.logger.error(err.message, {
            event: "error",
            code: err.code,
            context: err.context,
          });
          res.status(err.status).send();
        } else {
          res.status(err.status).json(
            errorResponse(err.message, {
              code: err.code,
              details: err.context,
            }),
          );
        }
      } else {
        req.context.logger.error(err?.message || "Unhandled error", {
          event: "error",
          code: err?.code || "INTERNAL_ERROR",
          stack: err?.stack,
        });
        res.status(500).send();
      }
    });

    const server = app.listen(options.port, (err?: Error) => {
      if (err) {
        baseLogger.error(err.message, {
          event: "service.end",
          error: err.message,
        });
        process.exit(1);
      }
      baseLogger.info(
        `${options.name} service started on http://localhost:${options.port}`,
        {
          event: "service.start",
          port: options.port,
        },
      );
    });

    server.on("close", () =>
      baseLogger.info(
        `${options.name} service stopped on http://localhost:${options.port}`,
        {
          event: "service.end",
        },
      ),
    );
    return server;
  }

  return { app, start };
}

/* ------------------ Express typings ------------------ */
declare global {
  namespace Express {
    interface Request {
      context: {
        requestId: string;
        logger: ServiceLogger;
      };
    }
  }
}
