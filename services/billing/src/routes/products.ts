import {
  parseCursorQuery,
  setNextLink,
  toSerializable,
} from "@ubento/service-toolkit";
import { Router } from "express";
import {
  getProduct,
  getProductByCode,
  listProducts,
} from "../routines/catalog.js";

const router = Router();

// List products
router.get("/", async (req, res, next) => {
  try {
    const { items, nextCursor } = await listProducts({
      ...parseCursorQuery(req),
    });
    setNextLink(req, res, nextCursor);
    res.json(toSerializable(items));
  } catch (e) {
    next(e);
  }
});

// Get product by ID
router.get("/:id", async (req, res) => {
  const product = await getProduct(req.params.id);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  res.json(toSerializable(product));
});

// Get product by code
router.get("/by-code/:code", async (req, res) => {
  const product = await getProductByCode(req.params.code);
  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  res.json(toSerializable(product));
});

export default router;
