import {
  Checkout,
  createBillingServiceClient,
  Offer,
  Product,
  Subscription,
  UsageCounter,
  UsageHold,
} from "~/clients/billing/client.js";
import { extractResponseData } from "~/lib/client.js";
import { TokenManager } from "~/lib/token_manager.js";

export class BillingService {
  billingClient: ReturnType<typeof createBillingServiceClient>;

  constructor({
    baseUrl,
    tokenManager,
  }: {
    baseUrl?: string;
    tokenManager: TokenManager;
  }) {
    this.billingClient = createBillingServiceClient({
      baseUrl,
      tokenManager,
      headers: {
        "x-ubento-service": "billing",
      },
    });
  }

  // ===== Catalog =====

  async listProducts(options: { limit?: number; cursor?: string } = {}) {
    const result = await this.billingClient.get("/billing/products", {
      params: { query: options },
    });
    return extractResponseData(result, true);
  }

  async getProduct(id: string): Promise<Product> {
    const result = await this.billingClient.get("/billing/products/{id}", {
      params: { path: { id } },
    });
    return extractResponseData(result, true);
  }

  async getProductByCode(code: string): Promise<Product> {
    const result = await this.billingClient.get(
      "/billing/products/by-code/{code}",
      {
        params: { path: { code } },
      },
    );
    return extractResponseData(result, true);
  }

  async listOffers(
    options: {
      limit?: number;
      cursor?: string;
      active?: boolean;
      code?: string;
    } = {},
  ) {
    const result = await this.billingClient.get("/billing/offers", {
      params: { query: options },
    });
    return extractResponseData(result, true);
  }

  async createOffer(data: any): Promise<Offer> {
    const result = await this.billingClient.post("/billing/offers", {
      body: data,
    });
    return extractResponseData(result, true);
  }

  async getOffer(id: string): Promise<Offer> {
    const result = await this.billingClient.get("/billing/offers/{id}", {
      params: { path: { id } },
    });
    return extractResponseData(result, true);
  }

  async updateOffer(id: string, data: any): Promise<Offer> {
    const result = await this.billingClient.patch("/billing/offers/{id}", {
      params: { path: { id } },
      body: data,
    });
    return extractResponseData(result, true);
  }

  // ===== Subscriptions =====

  async listSubscriptions(
    options: {
      team_id?: string;
      product_code?: string;
      offer_code?: string;
      status?: "ACTIVE" | "CANCELLED" | "EXPIRED" | "PAUSED" | "PENDING";
      limit?: number;
      cursor?: string;
    } = {},
  ) {
    const result = await this.billingClient.get("/billing/subscriptions", {
      params: { query: options },
    });
    return extractResponseData(result, true);
  }

  async getSubscription(id: string): Promise<Subscription> {
    const result = await this.billingClient.get("/billing/subscriptions/{id}", {
      params: { path: { id } },
    });
    return extractResponseData(result, true);
  }

  async cancelSubscription(id: string): Promise<Subscription> {
    const result = await this.billingClient.post(
      "/billing/subscriptions/{id}/cancel",
      {
        params: { path: { id } },
      },
    );
    return extractResponseData(result, true);
  }

  // ===== Invoices =====

  async listInvoices(
    options: {
      team_id?: string;
      status?: "PAID" | "PENDING" | "REFUNDED" | "VOID";
      limit?: number;
      cursor?: string;
    } = {},
  ) {
    const result = await this.billingClient.get(
      "/billing/subscriptions/invoices",
      {
        params: { query: options },
      },
    );
    return extractResponseData(result, true);
  }

  // ===== Usage =====

  async listUsageCounters(options: {
    team_id: string;
    code?: string;
    group?: string;
    limit?: number;
    cursor?: string;
  }) {
    const result = await this.billingClient.get("/billing/usage/counters", {
      params: { query: options },
    });
    return extractResponseData(result, true);
  }

  async getUsageCounter(id: string): Promise<UsageCounter> {
    const result = await this.billingClient.get(
      "/billing/usage/counters/{id}",
      {
        params: { path: { id } },
      },
    );
    return extractResponseData(result, true);
  }

  async reportUsage(data: {
    team_id: string;
    code: string;
    value: number;
    group?: string;
  }) {
    const result = await this.billingClient.post("/billing/usage/increment", {
      body: {
        team_id: data.team_id,
        code: data.code,
        amount: data.value,
        group: data.group,
      },
    });
    return extractResponseData(result, true);
  }

  // ===== Usage Holds =====

  /**
   * Reserves usage for a feature for a specific organization
   * @param data - The usage data to reserve
   * @returns The reserved usage hold or undefined if the request was rate limited
   */
  async reserveUsage(data: {
    team_id: string;
    feature_code: string;
    group?: string;
    amount: number;
    note: string;
    duration: number;
    ref: string;
    metadata?: Record<string, any>;
  }): Promise<
    | { data: UsageHold; error: undefined }
    | { data: undefined; error: "USAGE_LIMIT_EXCEEDED" }
  > {
    const result = await this.billingClient.post("/billing/usage/holds", {
      body: {
        team_id: data.team_id,
        code: data.feature_code,
        group: data.group,
        amount: data.amount,
        note: data.note,
        duration: data.duration,
        ref: data.ref,
        data: data.metadata as any,
      } as any,
    });
    if (result.response.status === 402) {
      return { data: undefined, error: "USAGE_LIMIT_EXCEEDED" };
    }
    return { data: extractResponseData(result, true), error: undefined };
  }

  async commitUsageHold(data: {
    ref: string;
    team_id: string;
  }): Promise<Record<string, never>> {
    const result = await this.billingClient.post(
      "/billing/usage/holds/commit",
      {
        body: {
          ref: data.ref,
          team_id: data.team_id,
        },
      },
    );
    return extractResponseData(result, true);
  }

  async releaseUsageHold(data: {
    ref: string;
    team_id: string;
  }): Promise<UsageHold> {
    const result = await this.billingClient.post(
      "/billing/usage/holds/release",
      {
        body: {
          ref: data.ref,
          team_id: data.team_id,
        },
      },
    );
    return extractResponseData(result, true);
  }

  // ===== Entitlements =====

  async getEntitlements(team_id: string) {
    const result = await this.billingClient.get("/billing/entitlements", {
      params: { query: { team_id } },
    });
    return extractResponseData(result, true);
  }

  // ===== Checkout =====

  async createCheckout(data: {
    team_id: string;
    product_code: string;
    offer_code: string;
    quantity?: number;
    redirect_url: string;
    duration?: number;
    metadata?: Record<string, any>;
  }): Promise<Checkout> {
    const result = await this.billingClient.post("/billing/checkout", {
      body: {
        team_id: data.team_id,
        product_code: data.product_code,
        offer_code: data.offer_code,
        quantity: data.quantity ?? 1,
        redirect_url: data.redirect_url,
        duration: data.duration,
        data: data.metadata as any,
      },
    });
    return extractResponseData(result, true);
  }
}
