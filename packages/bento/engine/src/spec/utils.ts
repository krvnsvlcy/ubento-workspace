import z from "zod";

export function edgesSpec<S extends z.ZodTypeAny>(schema: S) {
  return z.object({
    top: schema,
    left: schema,
    right: schema,
    bottom: schema,
  });
}

export const lengthSchema = z.object({
  value: z.number(),
  unit: z.enum(["px", "%", "fr"]),
});
export type LengthSpec = z.infer<typeof lengthSchema>;
