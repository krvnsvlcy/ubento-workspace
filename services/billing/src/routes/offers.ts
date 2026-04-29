import {
  chain,
  parseCursorQuery,
  parseStringQuery,
  setNextLink,
  toSerializable,
  validate,
} from "@ubento/service-toolkit";
import { Router } from "express";
import { z } from "zod";
import {
  activateOffer,
  createOffer,
  deactivateOffer,
  getOffer,
  getOfferByCode,
  listOffers,
  updateOffer,
} from "../routines/catalog.js";

const router = Router();

// List offers
router.get("/", async (req, res, next) => {
  try {
    const { items, nextCursor } = await listOffers({
      ...parseCursorQuery(req),
      active:
        req.query.active === "true"
          ? true
          : req.query.active === "false"
            ? false
            : undefined,
      code: parseStringQuery(req, "code"),
    });
    setNextLink(req, res, nextCursor);
    res.json(toSerializable(items));
  } catch (e) {
    next(e);
  }
});

// Create offer
router.post(
  "/",
  chain(
    validate({
      body: z.object({
        code: z.string(),
        name: z.string(),
        description: z.string().optional(),
        entitlements: z
          .array(z.object({ feature_code: z.string(), value: z.any() }))
          .optional(),
        metadata: z.unknown().optional(),
        active: z.boolean().optional(),
        product_code: z.string(),
      }),
    }),
    async (req, res, next) => {
      try {
        const offer = await createOffer({
          code: req.body.code,
          name: req.body.name,
          description: req.body.description,
          entitlements: req.body.entitlements,
          metadata: req.body.metadata,
          active: req.body.active,
          product_code: req.body.product_code,
        });

        res.status(201).json(toSerializable(offer));
      } catch (e) {
        next(e);
      }
    },
  ),
);

// Get offer by ID
router.get("/:id", async (req, res) => {
  const offer = await getOffer(req.params.id);
  if (!offer) {
    res.status(404).json({ message: "Offer not found" });
    return;
  }

  res.json(toSerializable(offer));
});

// Get offer by code
router.get("/by-code/:code", async (req, res) => {
  const offer = await getOfferByCode(req.params.code);
  if (!offer) {
    res.status(404).json({ message: "Offer not found" });
    return;
  }

  res.json(toSerializable(offer));
});

// Update offer
router.patch(
  "/:id",
  chain(
    validate({
      params: z.object({
        id: z.string(),
      }),
      body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        entitlements: z
          .array(z.object({ feature_code: z.string(), value: z.any() }))
          .optional(),
        metadata: z.unknown().optional(),
        active: z.boolean().optional(),
      }),
    }),
    async (req, res, next) => {
      try {
        const offer = await updateOffer(req.params.id, {
          name: req.body.name,
          description: req.body.description,
          entitlements: req.body.entitlements,
          metadata: req.body.metadata,
          active: req.body.active,
        });
        res.json(toSerializable(offer));
      } catch (e) {
        next(e);
      }
    },
  ),
);

// Activate offer
router.post(
  "/:id/activate",
  chain(
    validate({
      params: z.object({
        id: z.string(),
      }),
    }),
    async (req, res, next) => {
      try {
        const offer = await activateOffer(req.params.id);
        res.json(toSerializable(offer));
      } catch (e) {
        next(e);
      }
    },
  ),
);

// Deactivate offer
router.post(
  "/:id/deactivate",
  chain(
    validate({
      params: z.object({
        id: z.string(),
      }),
    }),
    async (req, res, next) => {
      try {
        const offer = await deactivateOffer(req.params.id);
        res.json(toSerializable(offer));
      } catch (e) {
        next(e);
      }
    },
  ),
);

export default router;
