import { Router, type RequestHandler } from "express";
import { expressjwt, UnauthorizedError } from "express-jwt";
import { JwksClient } from "jwks-rsa";
import { AuthOptions } from "../../service.js";
import { mongoDbUrlWithDatabase } from "../../utils/prisma.js";
import { Authorizer } from "../authorization/authorizer.js";
import { withAuthorizer } from "../authorization/enforce.js";
import { defaultTrustedIssuers, TrustedIssuer } from "./issuer.js";
import { audMatches, AuthorizationPayload, jwtPayload } from "./schemas.js";

const DEFAULT_AUDIENCE = "https://api.ubento.dev";

export function createAuthenticationMiddleware({
  audience = DEFAULT_AUDIENCE,
  issuers,
}: {
  audience?: string;
  issuers?: TrustedIssuer[];
}): Router {
  const allIssuers = [...defaultTrustedIssuers, ...(issuers ?? [])];
  const clients = new Map<string, JwksClient>();
  const issuerConfig = new Map<string, TrustedIssuer>();

  for (const i of allIssuers) {
    issuerConfig.set(i.issuer, i);
    clients.set(
      i.issuer,
      new JwksClient({
        jwksUri: i.jwksUri,
        cache: true,
        cacheMaxEntries: 10,
        cacheMaxAge: 10 * 60 * 1000,
        rateLimit: true,
        jwksRequestsPerMinute: 30,
      }),
    );
  }

  const router = Router();

  router.use(
    expressjwt({
      requestProperty: "jwt_raw",
      // We enforce per-issuer algorithms below; keep this as a safe base.
      algorithms: ["RS256"],
      secret: async (_req, token) => {
        if (!token) {
          throw new UnauthorizedError(
            "credentials_required",
            new Error("Token is missing."),
          );
        }

        const iss = (token.payload as any)?.iss;
        if (!iss || typeof iss !== "string") {
          throw new UnauthorizedError(
            "invalid_token",
            new Error("Token is missing iss."),
          );
        }

        const cfg = issuerConfig.get(iss);
        const client = clients.get(iss);
        if (!cfg || !client) {
          throw new UnauthorizedError(
            "invalid_token",
            new Error(`Untrusted issuer: ${iss}`),
          );
        }

        const kid = token.header?.kid;
        if (!kid) {
          throw new UnauthorizedError(
            "invalid_token",
            new Error("Token is missing kid."),
          );
        }

        const alg = token.header?.alg;
        const allowed = cfg.algorithms ?? ["RS256"];
        if (!alg || !allowed.includes(alg as any)) {
          throw new UnauthorizedError(
            "invalid_token",
            new Error(
              `Invalid alg for issuer ${iss}. Got ${String(
                alg,
              )}, allowed: ${allowed.join(", ")}`,
            ),
          );
        }

        const key = await client.getSigningKey(kid);
        if (!key) {
          throw new UnauthorizedError(
            "invalid_token",
            new Error("Key not found."),
          );
        }

        return key.getPublicKey();
      },
    }) as any,

    // Transform verified payload into internal Authorization
    ((req: any, _res: any, next: any) => {
      try {
        const payload = jwtPayload.parse(req.jwt_raw);
        if (!audMatches(payload.aud, audience)) {
          throw new UnauthorizedError(
            "invalid_token",
            new Error("Token audience mismatch."),
          );
        }

        req.auth = {
          subject: payload.sub,
          scope: payload.scope,
          access: payload.access,
        } satisfies AuthorizationPayload;

        next();
      } catch (err: any) {
        next(
          err instanceof UnauthorizedError
            ? err
            : new UnauthorizedError(
                "invalid_token",
                new Error("Token payload invalid."),
              ),
        );
      }
    }) as RequestHandler,

    // Standard error handler
    ((err: any, _req: any, res: any, next: any) => {
      if (err instanceof UnauthorizedError) {
        res.status(err.status).send(err.message);
      } else {
        next(err);
      }
    }) as RequestHandler,
  );

  return router;
}

export function auth(options: AuthOptions): Router {
  const router = Router();

  router.use(
    createAuthenticationMiddleware({
      audience: options.audience,
      issuers: options.issuers,
    }),
  );

  if (options.authorizationDatabaseUri) {
    router.use(
      withAuthorizer({
        authorizer: new Authorizer(
          mongoDbUrlWithDatabase(
            options.authorizationDatabaseUri,
            "authorization",
          ),
        ),
      }),
    );
  }

  return router;
}
