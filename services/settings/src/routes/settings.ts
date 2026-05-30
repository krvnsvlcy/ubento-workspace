import { ubentoAuth } from "@ubento/services.primitives";
import {
  chain,
  dataResponse,
  NotFoundError,
  validate,
} from "@ubento/services.toolkit";
import { Router } from "express";
import z from "zod";
import {
  deleteSetting,
  getSetting,
  getSettingByKey,
  listSettings,
  updateSetting,
  upsertSetting,
} from "../entities/setting.js";

const settingsRouter: Router = Router();

// Get Setting by Key
settingsRouter.get(
  "/key/:key",
  chain(
    validate({
      params: z.object({
        key: z.string(),
      }),
    }),
    async (req, res) => {
      const setting = await getSettingByKey(req.params.key);
      if (!setting) throw new NotFoundError("Setting not found");

      // Verify scope permissions: user must have 'setting:read' on at least one of the setting's scopes
      let authorized = false;
      const authorizer = req.authorizer;
      if (authorizer && req.auth) {
        // If user is admin (root bypass), allow
        if (req.auth.scope.includes("*")) {
          authorized = true;
        } else {
          for (const scope of setting.scopes) {
            const can = await authorizer.can(
              req.auth.subject,
              scope,
              ubentoAuth.actions.setting.read,
            );
            if (can) {
              authorized = true;
              break;
            }
          }
        }
      }

      if (!authorized) {
        res.status(403).json({ message: "Forbidden" });
        return;
      }

      res.json(dataResponse(setting));
    },
  ),
);

// Get Setting by ID
settingsRouter.get(
  "/:id",
  chain(
    validate({
      params: z.object({
        id: z.string(),
      }),
    }),
    async (req, res) => {
      const setting = await getSetting(req.params.id);
      if (!setting) throw new NotFoundError("Setting not found");

      let authorized = false;
      const authorizer = req.authorizer;
      if (authorizer && req.auth) {
        if (req.auth.scope.includes("*")) {
          authorized = true;
        } else {
          for (const scope of setting.scopes) {
            const can = await authorizer.can(
              req.auth.subject,
              scope,
              ubentoAuth.actions.setting.read,
            );
            if (can) {
              authorized = true;
              break;
            }
          }
        }
      }

      if (!authorized) {
        res.status(403).json({ message: "Forbidden" });
        return;
      }

      res.json(dataResponse(setting));
    },
  ),
);

// List Settings
settingsRouter.get(
  "/",
  chain(
    validate({
      query: z.object({
        scopes: z.union([z.string(), z.array(z.string())]).optional(),
        limit: z.coerce.number().optional(),
        cursor: z.string().optional(),
      }),
    }),
    async (req, res) => {
      let scopesFilter: string[] | undefined;
      if (req.query.scopes) {
        scopesFilter = Array.isArray(req.query.scopes)
          ? req.query.scopes
          : [req.query.scopes];
      }

      // Verify the user is authorized to read settings for the requested scopes
      const authorizer = req.authorizer;
      if (scopesFilter && authorizer && req.auth) {
        if (!req.auth.scope.includes("*")) {
          for (const scope of scopesFilter) {
            const can = await authorizer.can(
              req.auth.subject,
              scope,
              ubentoAuth.actions.setting.read,
            );
            if (!can) {
              res.status(403).json({ message: `Forbidden: scope ${scope}` });
              return;
            }
          }
        }
      }

      const result = await listSettings({
        scopes: scopesFilter,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        cursor: req.query.cursor as string | undefined,
      });

      res.json(result);
    },
  ),
);

// Upsert Setting
settingsRouter.post(
  "/",
  chain(
    validate({
      body: z.object({
        key: z.string(),
        scopes: z.array(z.string()),
        data: z.any(),
      }),
    }),
    async (req, res) => {
      const { key, scopes, data } = req.body;

      // Verify the user is authorized to update settings for all target scopes
      const authorizer = req.authorizer;
      if (authorizer && req.auth) {
        if (!req.auth.scope.includes("*")) {
          for (const scope of scopes) {
            const can = await authorizer.can(
              req.auth.subject,
              scope,
              ubentoAuth.actions.setting.update,
            );
            if (!can) {
              res.status(403).json({ message: `Forbidden: scope ${scope}` });
              return;
            }
          }
        }
      }

      const setting = await upsertSetting(key, scopes, data);
      res.json(dataResponse(setting));
    },
  ),
);

// Update Setting by ID
settingsRouter.patch(
  "/:id",
  chain(
    validate({
      params: z.object({
        id: z.string(),
      }),
      body: z.object({
        scopes: z.array(z.string()).optional(),
        data: z.any().optional(),
      }),
    }),
    async (req, res) => {
      const setting = await getSetting(req.params.id);
      if (!setting) throw new NotFoundError("Setting not found");

      // Verify permissions on existing scopes
      const authorizer = req.authorizer;
      if (authorizer && req.auth) {
        if (!req.auth.scope.includes("*")) {
          let hasExistingAccess = false;
          for (const scope of setting.scopes) {
            const can = await authorizer.can(
              req.auth.subject,
              scope,
              ubentoAuth.actions.setting.update,
            );
            if (can) {
              hasExistingAccess = true;
              break;
            }
          }
          if (!hasExistingAccess) {
            res.status(403).json({ message: "Forbidden" });
            return;
          }

          // If new scopes are provided, verify update permissions on all of them
          if (req.body.scopes) {
            for (const scope of req.body.scopes) {
              const can = await authorizer.can(
                req.auth.subject,
                scope,
                ubentoAuth.actions.setting.update,
              );
              if (!can) {
                res.status(403).json({ message: `Forbidden: scope ${scope}` });
                return;
              }
            }
          }
        }
      }

      const updated = await updateSetting(req.params.id, req.body);
      res.json(dataResponse(updated));
    },
  ),
);

// Delete Setting
settingsRouter.delete(
  "/:id",
  chain(
    validate({
      params: z.object({
        id: z.string(),
      }),
    }),
    async (req, res) => {
      const setting = await getSetting(req.params.id);
      if (!setting) throw new NotFoundError("Setting not found");

      const authorizer = req.authorizer;
      if (authorizer && req.auth) {
        if (!req.auth.scope.includes("*")) {
          let authorized = false;
          for (const scope of setting.scopes) {
            const can = await authorizer.can(
              req.auth.subject,
              scope,
              ubentoAuth.actions.setting.delete,
            );
            if (can) {
              authorized = true;
              break;
            }
          }
          if (!authorized) {
            res.status(403).json({ message: "Forbidden" });
            return;
          }
        }
      }

      await deleteSetting(req.params.id);
      res.json(dataResponse({ success: true }));
    },
  ),
);

export default settingsRouter;
