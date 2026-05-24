import z from "zod";

// ==========================================
// EAGER DIRECTIVES (Evaluated during render)
// ==========================================

// Fetches a value from the current context
export const useDirectiveSchema = z.object({
  $use: z.string(),
});
export type UseDirective = z.infer<typeof useDirectiveSchema>;

// Computes an inline javascript expression synchronously
export const evalDirectiveSchema = z.object({
  $eval: z.string(),
});
export type EvalDirective = z.infer<typeof evalDirectiveSchema>;

// Eagerly executes a context function to transform or derive data
export const applyDirectiveSchema = z.object({
  $apply: z.object({
    fn: z.string(),
    // args is typed as any to allow recursive directives like $use inside arguments
    args: z.record(z.string(), z.any()).optional(),
  }),
});
export type ApplyDirective = z.infer<typeof applyDirectiveSchema>;

export const eagerDirectiveSchema = z.union([
  useDirectiveSchema,
  evalDirectiveSchema,
  applyDirectiveSchema,
]);
export type EagerDirective = z.infer<typeof eagerDirectiveSchema>;

// ==========================================
// LAZY DIRECTIVES (Executed by event handlers)
// ==========================================

// Returns an async function that calls a specific context function (RPC/Dispatcher)
export const callDirectiveSchema = z.object({
  $call: z.object({
    fn: z.string(),
    args: z.record(z.string(), z.any()).optional(),
  }),
});
export type CallDirective = z.infer<typeof callDirectiveSchema>;

// Returns an async function that runs an arbitrary block of side-effect code
export const runDirectiveSchema = z.object({
  $run: z.string(),
});
export type RunDirective = z.infer<typeof runDirectiveSchema>;
