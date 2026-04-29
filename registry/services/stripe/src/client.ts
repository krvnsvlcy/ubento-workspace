import Stripe from "stripe";

export function createStripeClient({
  apiKey,
}: {
  apiKey: string;
}): UbentoStripeClient {
  const stripe = new Stripe(apiKey, {
    apiVersion: "2024-11-20.acacia" as any,
  });

  return {
    async listCustomers({ limit = 10 } = {}) {
      const customers = await stripe.customers.list({ limit });
      return customers.data.map((c) => ({
        id: c.id,
        email: c.email,
        name: c.name,
        metadata: c.metadata as Record<string, string>,
        created: c.created,
      }));
    },

    async listSubscriptions({ limit = 10 } = {}) {
      const subscriptions = await stripe.subscriptions.list({ limit });
      return subscriptions.data.map((s) => ({
        id: s.id,
        customer_id:
          typeof s.customer === "string" ? s.customer : s.customer.id,
        status: s.status,
        current_period_end: s.current_period_end,
        plan_id: s.items.data[0]?.plan.id,
        amount: s.items.data[0]?.plan.amount ?? undefined,
        currency: s.items.data[0]?.plan.currency ?? undefined,
      }));
    },

    async listPayments({ limit = 10 } = {}) {
      const charges = await stripe.charges.list({ limit });
      return charges.data.map((c) => ({
        id: c.id,
        amount: c.amount,
        currency: c.currency,
        status: c.status,
        customer_id:
          typeof c.customer === "string"
            ? c.customer
            : (c.customer?.id ?? null),
        created: c.created,
      }));
    },

    async getCustomer(id) {
      const customer = await stripe.customers.retrieve(id);
      if (customer.deleted) return null;
      return {
        id: customer.id,
        email: customer.email,
        name: customer.name,
        metadata: customer.metadata as Record<string, string>,
        created: customer.created,
      };
    },
  };
}
