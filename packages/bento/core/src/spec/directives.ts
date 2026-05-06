import z from "zod";

// consume a value in the current context
export const paramDirectiveSchema = z.object({
  $use: z.string(),
});
export type ParamDirective = z.infer<typeof paramDirectiveSchema>;
