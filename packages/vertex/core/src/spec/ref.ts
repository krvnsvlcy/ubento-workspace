import z from "zod";

export const referenceSchema = z.object({ $ref: z.string() });
