import { Request } from "express";
import { z, ZodType } from "zod";
import { SafeMiddleware } from "./chain.js";

type ValidationConfig = {
  body?: ZodType;
  query?: ZodType;
  params?: ZodType;
};

type ValidatedRequest<T extends ValidationConfig> = Request<
  T["params"] extends ZodType ? z.infer<T["params"]> : any,
  any,
  T["body"] extends ZodType ? z.infer<T["body"]> : any,
  T["query"] extends ZodType ? z.infer<T["query"]> : any
>;

export function validate<I extends Request, T extends ValidationConfig>(
  schemas: T,
): SafeMiddleware<I, ValidatedRequest<T>> {
  return (req, res, next) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }
      if (schemas.query) {
        schemas.query.parse(req.query);
      }
      if (schemas.params) {
        schemas.params.parse(req.params);
      }
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Send a 400 Bad Request with validation details
        res.status(400).json({
          status: "error",
          message: "Validation failed",
          errors: error.issues,
        });
      } else {
        next(error);
      }
    }
  };
}
