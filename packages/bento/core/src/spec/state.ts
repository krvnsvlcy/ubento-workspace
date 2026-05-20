import { z } from "zod";

export const stateSpecSchema = z.record(z.string(), z.unknown());

export type StateSpec = z.infer<typeof stateSpecSchema>;
