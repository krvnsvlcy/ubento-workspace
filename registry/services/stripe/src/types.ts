import { z } from "zod";

export const StripeCustomerSchema = z.object({
  id: z.string(),
  email: z.string().email().nullable(),
  name: z.string().nullable(),
  metadata: z.record(z.string()).optional(),
  created: z.number(),
});

export const StripeSubscriptionSchema = z.object({
  id: z.string(),
  customer_id: z.string(),
  status: z.string(),
  current_period_end: z.number(),
  plan_id: z.string().optional(),
  amount: z.number().optional(),
  currency: z.string().optional(),
});

export const StripePaymentSchema = z.object({
  id: z.string(),
  amount: z.number(),
  currency: z.string(),
  status: z.string(),
  customer_id: z.string().nullable(),
  created: z.number(),
});

export type StripeCustomer = z.infer<typeof StripeCustomerSchema>;
export type StripeSubscription = z.infer<typeof StripeSubscriptionSchema>;
export type StripePayment = z.infer<typeof StripePaymentSchema>;
