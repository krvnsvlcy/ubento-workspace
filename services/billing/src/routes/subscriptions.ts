import {
  chain,
  parseCursorQuery,
  parseStringQuery,
  setNextLink,
  toSerializable,
  validate,
} from "@ubento/service-toolkit";
import { InvoiceStatus, SubscriptionStatus } from "@ubento/database/billing";
import { Router } from "express";
import { z } from "zod";
import {
  cancelSubscription,
  getInvoice,
  getSubscription,
  listInvoices,
  listSubscriptions,
  resumeSubscription,
  updateSubscription,
} from "../routines/subscriptions.js";

const router = Router();

// List invoices
router.get("/invoices", async (req, res, next) => {
  try {
    const { items, nextCursor } = await listInvoices({
      ...parseCursorQuery(req),
      organization_id: parseStringQuery(req, "organization_id"),
      status: parseStringQuery(req, "status") as InvoiceStatus | undefined,
      created_after: req.query.created_after
        ? new Date(req.query.created_after as string)
        : undefined,
      created_before: req.query.created_before
        ? new Date(req.query.created_before as string)
        : undefined,
    });
    setNextLink(req, res, nextCursor);
    res.json(toSerializable(items));
  } catch (e) {
    next(e);
  }
});

// Get invoice by ID
router.get("/invoices/:id", async (req, res) => {
  const invoice = await getInvoice(req.params.id);
  if (!invoice) {
    res.status(404).json({ message: "Invoice not found" });
    return;
  }

  res.json(toSerializable(invoice));
});

// List subscriptions for a organization
router.get("/", async (req, res, next) => {
  try {
    const { items, nextCursor } = await listSubscriptions({
      ...parseCursorQuery(req),
      organization_id: parseStringQuery(req, "organization_id"),
      product_code: parseStringQuery(req, "product_code"),
      offer_code: parseStringQuery(req, "offer_code"),
      status: parseStringQuery(req, "status") as SubscriptionStatus | undefined,
    });
    setNextLink(req, res, nextCursor);
    res.json(toSerializable(items));
  } catch (e) {
    next(e);
  }
});

// Get a subscription by ID
router.get("/:id", async (req, res) => {
  const subscription = await getSubscription(req.params.id);
  if (!subscription) {
    res.status(404).json({ message: "Subscription not found" });
    return;
  }

  res.json(toSerializable(subscription));
});

// Cancel a subscription
router.post(
  "/:id/cancel",
  chain(
    validate({
      params: z.object({
        id: z.string(),
      }),
    }),
    async (req, res, next) => {
      try {
        const subscription = await cancelSubscription(req.params.id);
        res.json(toSerializable(subscription));
      } catch (e) {
        next(e);
      }
    }
  )
);

router.post(
  "/:id/resume",
  chain(
    validate({
      params: z.object({
        id: z.string(),
      }),
    }),
    async (req, res, next) => {
      try {
        const subscription = await resumeSubscription(req.params.id);
        res.json(toSerializable(subscription));
      } catch (e) {
        next(e);
      }
    }
  )
);

// Update a subscription
router.patch(
  "/:id",
  chain(
    validate({
      params: z.object({
        id: z.string(),
      }),
      body: z.object({
        quantity: z.number().int().positive().optional(),
      }),
    }),
    async (req, res, next) => {
      try {
        const subscription = await updateSubscription(req.params.id, req.body);
        res.json(toSerializable(subscription));
      } catch (e) {
        next(e);
      }
    }
  )
);

export default router;
