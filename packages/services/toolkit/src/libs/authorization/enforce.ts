import { Request } from "express";
import { SafeMiddleware } from "../../utils/chain.js";
import { Authorizer } from "./authorizer.js";

declare global {
  namespace Express {
    interface Request {
      authorizer?: Authorizer;
    }
  }
}

export function withAuthorizer({
  authorizer,
}: {
  authorizer: Authorizer;
}): SafeMiddleware<Request, Request> {
  return async (req, res, next) => {
    req.authorizer = authorizer;
    next();
  };
}

function matchPattern(pattern: string, value: string): boolean {
  if (pattern === "*") return true;
  if (pattern.endsWith("*")) return value.startsWith(pattern.slice(0, -1));
  return pattern === value;
}

export function enforce<T extends Request>(
  ...permissions: string[]
): SafeMiddleware<T, T>;
export function enforce<T extends Request>({
  permissions,
  scope,
}: {
  permissions: string[];
  scope: (req: Request) => Promise<string | undefined> | string | undefined;
}): SafeMiddleware<T, T>;
export function enforce<T extends Request>(
  ...args:
    | string[]
    | [
        {
          permissions: string[];
          scope: (
            req: Request,
          ) => Promise<string | undefined> | string | undefined;
        },
      ]
): SafeMiddleware<T, T> {
  let permissions: string[];
  let getScope:
    | ((req: Request) => Promise<string | undefined> | string | undefined)
    | undefined;

  if (typeof args[0] === "string") {
    permissions = args as string[];
  } else {
    permissions = args[0].permissions;
    getScope = args[0].scope;
  }

  return async (req, res, next) => {
    const auth = req.auth;
    if (!auth) return res.status(401).send("Not authenticated");

    for (const permission of permissions) {
      if (!auth.scope.some((p) => matchPattern(p, permission))) {
        return res.status(403).send(`Forbidden: ${permission}`);
      }
    }

    const scope = getScope ? await getScope(req) : undefined;
    if (scope && !auth.scope.includes("*")) {
      const authorizer = req.authorizer;
      if (!authorizer) {
        req.context.logger.error("No authorizer found in enforce middleware", {
          event: "error",
        });
        return res.status(500).send("Internal Server Error");
      }
      const can = await Promise.all(
        permissions.map((permission) =>
          authorizer.can(auth.subject, scope, permission),
        ),
      );
      if (!can.every((c) => c))
        return res.status(403).json({
          message: "Forbidden",
          subject: auth.subject,
          scope,
          permissions,
        });
    }
    next();
  };
}
