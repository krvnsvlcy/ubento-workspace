import { chain, toSerializable, validate } from "@ubento/services.toolkit";
import { Router } from "express";
import { z } from "zod";
import { resolveEntitlementGrantTable } from "../routines/entitlements/entitlements.js";
import {
  evaluateFeatureAccess,
  resolveFeatureQuota,
} from "../routines/entitlements/resolve.js";

const router = Router();

// Get entitlement grants for organization
router.get(
  "/",
  chain(
    validate({
      query: z.object({
        organization_id: z.string(),
      }),
    }),
    async (req, res, next) => {
      try {
        const grants = await resolveEntitlementGrantTable(
          req.query.organization_id,
        );
        res.json(toSerializable(grants));
      } catch (e) {
        next(e);
      }
    },
  ),
);

// Check feature access
router.get(
  "/access",
  chain(
    validate({
      query: z.object({
        organization_id: z.string(),
        features: z.string(),
      }),
    }),
    async (req, res, next) => {
      const entitlements = await resolveEntitlementGrantTable(
        req.query.organization_id,
      );
      const access = Object.fromEntries(
        req.query.features.split(",").map((feature_code) => [
          feature_code,
          evaluateFeatureAccess({
            entitlements,
            feature_code,
          }),
        ]),
      );
      res.json(access);
    },
  ),
);

// Get usage quota for counter
router.get(
  "/quota",
  chain(
    validate({
      query: z.object({
        organization_id: z.string(),
        features: z.string(),
      }),
    }),
    async (req, res, next) => {
      const entitlements = await resolveEntitlementGrantTable(
        req.query.organization_id,
      );
      const quota = Object.fromEntries(
        req.query.features.split(",").map((feature_code) => [
          feature_code,
          resolveFeatureQuota({
            entitlements,
            feature_code,
          }),
        ]),
      );
      res.json(quota);
    },
  ),
);

export default router;
