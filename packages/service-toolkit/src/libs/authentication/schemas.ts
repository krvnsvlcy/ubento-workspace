import { z } from "zod";

/**
 * Internal authorization shape (what the app sees)
 */
export type AuthorizationPayload = {
  subject: string;
  scope: string[];
  access: "global" | "granular";
};

declare global {
  namespace Express {
    interface Request {
      auth: AuthorizationPayload;
    }
  }
}

/**
 * Zod JWT payload schemas for validation (issuer-specific)
 */
export const jwtPayload = z.object({
  iss: z.string(),
  sub: z.string(),
  aud: z.union([z.string(), z.array(z.string())]),
  iat: z.number().optional(),
  exp: z.number().optional(),
  scope: z.array(z.string()).default([]),
  access: z.enum(["global", "granular"]).default("granular"),
});

export function audMatches(aud: string | string[], expected: string): boolean {
  if (typeof aud === "string") return aud === expected;
  if (Array.isArray(aud)) return aud.includes(expected);
  return false;
}
export function scopeToArray(scope: string | string[]): string[] {
  if (typeof scope === "string") return scope.split(" ");
  return scope;
}
