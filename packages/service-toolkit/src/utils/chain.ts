import { NextFunction, Request, RequestHandler, Response } from "express";

// --- 1. Core Types ---

export type SafeMiddleware<In, Out> = (
  req: In,
  res: Response,
  next: NextFunction,
) => any;

// --- 2. The Overloaded Chain Function (Limit: 5) ---

// 1 Middleware
export function chain<A>(m1: SafeMiddleware<Request, A>): RequestHandler;

// 2 Middleware
export function chain<A, B>(
  m1: SafeMiddleware<Request, A>,
  m2: SafeMiddleware<A, B>,
): RequestHandler;

// 3 Middleware
export function chain<A, B, C>(
  m1: SafeMiddleware<Request, A>,
  m2: SafeMiddleware<A, B>,
  m3: SafeMiddleware<B, C>,
): RequestHandler;

// 4 Middleware
export function chain<A, B, C, D>(
  m1: SafeMiddleware<Request, A>,
  m2: SafeMiddleware<A, B>,
  m3: SafeMiddleware<B, C>,
  m4: SafeMiddleware<C, D>,
): RequestHandler;

// 5 Middleware
export function chain<A, B, C, D, E>(
  m1: SafeMiddleware<Request, A>,
  m2: SafeMiddleware<A, B>,
  m3: SafeMiddleware<B, C>,
  m4: SafeMiddleware<C, D>,
  m5: SafeMiddleware<D, E>,
): RequestHandler;

// Implementation
export function chain(
  ...middlewares: SafeMiddleware<any, any>[]
): RequestHandler {
  return (req, res, next) => {
    const dispatch = async (i: number) => {
      const fn = middlewares[i];
      if (!fn) return next();

      try {
        await Promise.resolve(
          fn(req, res, (err?: any) => {
            if (err) return next(err);
            dispatch(i + 1);
          }),
        );
      } catch (err) {
        next(err);
      }
    };
    dispatch(0);
  };
}

// --- 3. The Helper Functions ---

export function defineMiddleware<NewProps, InputReq = Request>(
  fn: (
    req: InputReq,
    res: Response,
    next: NextFunction,
  ) => void | Promise<void>,
): SafeMiddleware<InputReq, InputReq & NewProps> {
  return fn as any;
}
