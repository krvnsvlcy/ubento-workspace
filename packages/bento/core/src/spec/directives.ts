import z from "zod";

// consume a value in the current context
export const useDirectiveSchema = z.object({
  $use: z.string(),
});
export type UseDirective = z.infer<typeof useDirectiveSchema>;
