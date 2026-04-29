import {
  chain,
  makeCursorPageResponse,
  parseCursorQuery,
  parseStringQuery,
  toSerializable,
  validate,
} from "@ubento/service-toolkit";
import { Router } from "express";
import { z } from "zod";
import {
  commitUsageHold,
  getUsageCounter,
  getUsageCounterByCode,
  getUsageHold,
  incrementOrganizationUsage,
  listUsageCounters,
  listUsageEvents,
  releaseUsageHold,
  reserveUsage,
} from "../routines/usage.js";

const router = Router();

// List usage counters
router.get("/counters", async (req, res, next) => {
  try {
    const organization_id = parseStringQuery(req, "organization_id");
    if (!organization_id) {
      res.status(400).json({ message: "organization_id is required" });
      return;
    }

    const result = await listUsageCounters({
      ...parseCursorQuery(req),
      organization_id,
      code: parseStringQuery(req, "code"),
      group: parseStringQuery(req, "group"),
    });
    res.json(toSerializable(makeCursorPageResponse(result)));
  } catch (e) {
    next(e);
  }
});

// Get usage counter by ID
router.get("/counters/by-code", async (req, res) => {
  const organization_id = parseStringQuery(req, "organization_id");
  const code = parseStringQuery(req, "code");
  const group = parseStringQuery(req, "group");
  if (!organization_id || !code) {
    res.status(400).json({ message: "organization_id and code are required" });
    return;
  }
  const counter = await getUsageCounterByCode(organization_id, code, group);
  if (!counter) {
    res.status(404).json({ message: "Usage counter not found" });
    return;
  }

  res.json(toSerializable(counter));
});

// Get usage counter by ID
router.get("/counters/:id", async (req, res) => {
  const counter = await getUsageCounter(req.params.id);
  if (!counter) {
    res.status(404).json({ message: "Usage counter not found" });
    return;
  }

  res.json(toSerializable(counter));
});

// Increment usage
router.post(
  "/increment",
  chain(
    validate({
      body: z.object({
        organization_id: z.string(),
        code: z.string(),
        amount: z.number().int().min(1),
        group: z.string().optional(),
      }),
    }),
    async (req, res, next) => {
      try {
        const counter = await incrementOrganizationUsage({
          organization_id: req.body.organization_id,
          feature_code: req.body.code,
          amount: req.body.amount,
        });
        res.json(toSerializable(counter));
      } catch (e) {
        next(e);
      }
    },
  ),
);

// List usage events
router.get("/events", async (req, res, next) => {
  try {
    const result = await listUsageEvents({
      ...parseCursorQuery(req),
      organization_id: parseStringQuery(req, "organization_id"),
      counter_code: parseStringQuery(req, "counter_code"),
      counter_group: parseStringQuery(req, "counter_group"),
      ref: parseStringQuery(req, "ref"),
      created_after: req.query.created_after
        ? new Date(req.query.created_after as string)
        : undefined,
      created_before: req.query.created_before
        ? new Date(req.query.created_before as string)
        : undefined,
    });
    res.json(toSerializable(makeCursorPageResponse(result)));
  } catch (e) {
    next(e);
  }
});

// Get usage hold by ID
router.get("/holds/:id", async (req, res) => {
  const hold = await getUsageHold(req.params.id);
  if (!hold) {
    res.status(404).json({ message: "Usage hold not found" });
    return;
  }

  res.json(toSerializable(hold));
});

// Reserve usage (create hold)
router.post(
  "/holds",
  chain(
    validate({
      body: z.object({
        organization_id: z.string(),
        code: z.string(),
        group: z.string().optional(),
        amount: z.number().int().min(1),
        note: z.string(),
        duration: z.number().int().min(60000), // minimum 1 minute
        ref: z.string(),
        data: z.unknown().optional(),
      }),
    }),
    async (req, res, next) => {
      try {
        const hold = await reserveUsage({
          organization_id: req.body.organization_id,
          feature_code: req.body.code,
          amount: req.body.amount,
          note: req.body.note,
          duration: req.body.duration,
          ref: req.body.ref,
          data: req.body.data,
        });
        res.status(201).json(toSerializable(hold));
      } catch (e) {
        next(e);
      }
    },
  ),
);

// Commit usage hold
router.post(
  "/holds/commit",
  chain(
    validate({
      body: z.object({
        ref: z.string(),
        organization_id: z.string(),
      }),
    }),
    async (req, res, next) => {
      try {
        const result = await commitUsageHold({
          ref: req.body.ref,
          organization_id: req.body.organization_id,
        });
        res.json(toSerializable(result));
      } catch (e) {
        next(e);
      }
    },
  ),
);

// Release usage hold
router.post(
  "/holds/release",
  chain(
    validate({
      body: z.object({
        ref: z.string(),
        organization_id: z.string(),
      }),
    }),
    async (req, res, next) => {
      try {
        const hold = await releaseUsageHold({
          ref: req.body.ref,
          organization_id: req.body.organization_id,
        });
        res.json(toSerializable(hold));
      } catch (e) {
        next(e);
      }
    },
  ),
);

export default router;
