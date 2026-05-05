import z from "zod";

export function edgesSpec<S extends z.ZodTypeAny>(schema: S) {
  return z.object({
    top: schema,
    left: schema,
    right: schema,
    bottom: schema,
  });
}
export type EdgesSpec<S> = {
  top: S;
  left: S;
  right: S;
  bottom: S;
};

export const lengthSchema = z.object({
  value: z.number(),
  unit: z.enum(["px", "%", "fr"]),
});
export type LengthSpec = z.infer<typeof lengthSchema>;
