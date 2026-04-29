import {
  parseCursorQuery,
  parseStringQuery,
  setNextLink,
  toSerializable,
} from "@ubento/service-toolkit";
import { OrderStatus } from "@ubento/database/billing";
import { Router } from "express";
import { getOrder, listOrders } from "../routines/orders.js";

const router = Router();

// List orders for a organization
router.get("/", async (req, res, next) => {
  try {
    const { items, nextCursor } = await listOrders({
      ...parseCursorQuery(req),
      organization_id: parseStringQuery(req, "organization_id"),
      status: parseStringQuery(req, "status") as OrderStatus | undefined,
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

// Get order by ID
router.get("/:id", async (req, res) => {
  const order = await getOrder(req.params.id);
  if (!order) {
    res.status(404).json({ message: "Order not found" });
    return;
  }

  res.json(toSerializable(order));
});

export default router;
