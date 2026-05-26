import { ModuleScope } from "@ubento/services.database/module";
import { ubentoAuth } from "@ubento/services.primitives";
import { chain, enforce, validate } from "@ubento/services.toolkit";
import cors from "cors";
import Express, { Router, Application } from "express";
import * as jose from "jose";
import z from "zod";
import { getModule } from "../entities/module.js";
import { readModuleVersionFile } from "../entities/version.js";

const registryRouter: Router = Router();

// POST /modules/registry/token
registryRouter.post(
  "/token",
  chain(
    validate({
      body: z.object({
        teamIds: z.array(z.string()),
      }),
    }),
    enforce({
      permissions: [ubentoAuth.actions.module.read],
      scope: () => ubentoAuth.scopes.public,
    }),
    async (req, res) => {
      const { teamIds } = req.body;
      const authorizer = req.authorizer;

      // Verify read access for each team requested
      if (!req.auth!.scope.includes("*")) {
        if (!authorizer) {
          return res.status(500).send("Authorizer not configured");
        }
        for (const teamId of teamIds) {
          const scope = ubentoAuth.scopes.team({ team_id: teamId });
          const hasAccess = await authorizer.can(
            req.auth!.subject,
            scope,
            ubentoAuth.actions.module.read,
          );
          if (!hasAccess) {
            return res.status(403).json({
              message: `Forbidden: No module read access to team ${teamId}`,
            });
          }
        }
      }

      // Generate the JWT
      const secretStr =
        process.env.REGISTRY_JWT_SECRET ||
        "ubento-registry-secret-default-key-12345";
      const secret = new TextEncoder().encode(secretStr);
      const jwt = await new jose.SignJWT({ teamIds })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(secret);

      res.json({ token: jwt });
    },
  ),
);

export default registryRouter;

// Router for module registry file serving
export const registryFilesRouter: Router = Router();
registryFilesRouter.use(cors());

// Auth middleware for verifying JWT
registryFilesRouter.use(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).send("Unauthorized: Missing or invalid authorization header");
    return;
  }
  const token = authHeader.split(" ")[1];
  try {
    const secretStr =
      process.env.REGISTRY_JWT_SECRET ||
      "ubento-registry-secret-default-key-12345";
    const secret = new TextEncoder().encode(secretStr);
    const { payload } = await jose.jwtVerify(token, secret);

    (req as any).registryAuth = payload;
    next();
  } catch (error) {
    res.status(401).send("Unauthorized: Invalid token");
    return;
  }
});

// GET /modules/registry/files/:module_id/:version_id/:filename
registryFilesRouter.get(
  "/:module_id/:version_id/:filename",
  async (req, res) => {
    const { module_id, version_id, filename } = req.params;
    const teamIds = (req as any).registryAuth?.teamIds || [];

    try {
      const module = await getModule(module_id);
      if (!module) {
        res.status(404).send("Module not found");
        return;
      }

      // Check access if private
      if (module.scope === ModuleScope.private) {
        if (!teamIds.includes(module.team_id)) {
          res.status(403).send("Forbidden: No read access to this module");
          return;
        }
      }

      const content = await readModuleVersionFile({
        versionId: version_id,
        filename,
      });

      if (content === null) {
        res.status(404).send("File not found");
        return;
      }

      if (
        filename.endsWith(".js") ||
        filename.endsWith(".tsx") ||
        filename.endsWith(".ts")
      ) {
        res.setHeader("Content-Type", "application/javascript");
      } else {
        res.setHeader("Content-Type", "text/plain");
      }

      res.send(content);
    } catch (error: any) {
      res.status(500).send(error?.message || "Internal server error");
    }
  },
);

