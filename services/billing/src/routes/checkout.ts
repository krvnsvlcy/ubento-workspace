import {
  chain,
  makeCursorPageResponse,
  parseCursorQuery,
  parseStringQuery,
  toSerializable,
  validate,
} from "@ubento/services.toolkit";
import { Router } from "express";
import { z } from "zod";
import {
  createCheckout,
  getCheckout,
  listCheckouts,
} from "../routines/checkout.js";

const router: Router = Router();

// List checkouts
router.get("/", async (req, res, next) => {
  try {
    const result = await listCheckouts({
      ...parseCursorQuery(req),
      team_id: parseStringQuery(req, "team_id"),
      product_code: parseStringQuery(req, "product_code"),
      offer_code: parseStringQuery(req, "offer_code"),
    });
    res.json(toSerializable(makeCursorPageResponse(result)));
  } catch (e) {
    next(e);
  }
});

// Create a new checkout session
router.post(
  "/",
  chain(
    validate({
      body: z.object({
        team_id: z.string(),
        product_code: z.string(),
        offer_code: z.string(),
        quantity: z.number().int().min(1),
        redirect_url: z.string().url(),
        duration: z.number().int().optional(),
        data: z.record(z.string(), z.unknown()).optional(),
      }),
    }),
    async (req, res) => {
      const checkout = await createCheckout({
        team_id: req.body.team_id,
        product_code: req.body.product_code,
        offer_code: req.body.offer_code,
        quantity: req.body.quantity,
        redirect_url: req.body.redirect_url,
        duration: req.body.duration,
        data: req.body.data,
      });

      res.status(201).json(toSerializable(checkout));
    },
  ),
);

// Get checkout by ID
router.get("/:id", async (req, res) => {
  const checkout = await getCheckout(req.params.id);
  if (!checkout) {
    res.status(404).json({ message: "Checkout not found" });
    return;
  }

  res.json(toSerializable(checkout));
});

export default router;
