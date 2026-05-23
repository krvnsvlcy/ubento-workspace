import {
  makeCursorPageResponse,
  parseCursorQuery,
  toSerializable,
} from "@ubento/services.toolkit";
import { Router } from "express";
import {
  getProduct,
  getProductByCode,
  listProducts,
} from "../routines/catalog.js";

const router: Router = Router();

// List products
router.get("/", async (req, res, next) => {
  try {
    const result = await listProducts({
      ...parseCursorQuery(req),
    });
    res.json(toSerializable(makeCursorPageResponse(result)));
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
