import { createBillingServiceClient } from "~/clients/billing/client.js";
import { extractResponseData } from "~/lib/client.js";
import { extractCursorPage } from "~/lib/pagination.js";
import { TokenManager } from "~/lib/token_manager.js";

export class BillingService {
  private billingClient: ReturnType<typeof createBillingServiceClient>;

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
    });
  }

  // ==================== Catalog ====================

  // Products
  async listProducts(options?: { cursor?: string; limit?: number }) {
    const result = await this.billingClient.get("/billing/products", {
      params: {
        query: options,
      },
    });
    return extractCursorPage(result.response, {
      items: result.data,
      fetcher: this.billingClient.fetch,
    });
  }

  async getProduct(id: string) {
    const result = await this.billingClient.get("/billing/products/{id}", {
      params: {
        path: { id },
      },
    });
    return extractResponseData(result);
  }

  async getProductByCode(code: string) {
    const result = await this.billingClient.get(
      "/billing/products/by-code/{code}",
      {
        params: {
          path: { code },
        },
      },
    );
    return extractResponseData(result);
  }

  // Offers
  async listOffers(options?: {
    active?: boolean;
    code?: string;
    cursor?: string;
    limit?: number;
  }) {
    const result = await this.billingClient.get("/billing/offers", {
      params: {
        query: options,
      },
    });
    return extractCursorPage(result.response, {
      items: result.data,
      fetcher: this.billingClient.fetch,
    });
  }

  async getOffer(id: string) {
    const result = await this.billingClient.get("/billing/offers/{id}", {
      params: {
        path: { id },
      },
    });
    return extractResponseData(result);
  }

  async getOfferByCode(code: string) {
    const result = await this.billingClient.get(
      "/billing/offers/by-code/{code}",
      {
        params: {
          path: { code },
        },
      },
    );
    return extractResponseData(result);
  }

  async createOffer(data: {
    code: string;
    name: string;
    description?: string;
    entitlements?: { feature_code: string; value?: unknown }[];
    metadata?: unknown;
    active?: boolean;
    product_code: string;
  }) {
    const result = await this.billingClient.post("/billing/offers", {
      body: data,
    });
    return extractResponseData(result, true);
  }

  async updateOffer(
    id: string,
    data: {
      name?: string;
      description?: string;
      entitlements?: { feature_code: string; value?: unknown }[];
      metadata?: unknown;
      active?: boolean;
    },
  ) {
    const result = await this.billingClient.patch("/billing/offers/{id}", {
      params: {
        path: { id },
      },
      body: data,
    });
    return extractResponseData(result, true);
  }

  async activateOffer(id: string) {
    const result = await this.billingClient.post(
      "/billing/offers/{id}/activate",
      {
        params: {
          path: { id },
        },
      },
    );
    return extractResponseData(result, true);
  }

  async deactivateOffer(id: string) {
    const result = await this.billingClient.post(
      "/billing/offers/{id}/deactivate",
      {
        params: {
          path: { id },
        },
      },
    );
    return extractResponseData(result, true);
  }

  // ==================== Subscriptions ====================

  async listSubscriptions(options?: {
    organization_id?: string;
    product_code?: string;
    offer_code?: string;
    status?: "ACTIVE" | "CANCELLED" | "EXPIRED" | "PAUSED" | "PENDING";
    cursor?: string;
    limit?: number;
  }) {
    const result = await this.billingClient.get("/billing/subscriptions", {
      params: {
        query: options,
      },
    });
    return extractCursorPage(result.response, {
      items: result.data,
      fetcher: this.billingClient.fetch,
    });
  }

  async getSubscription(id: string) {
    const result = await this.billingClient.get("/billing/subscriptions/{id}", {
      params: {
        path: { id },
      },
    });
    return extractResponseData(result);
  }

  async updateSubscription(
    id: string,
    data: {
      quantity?: number;
    },
  ) {
    const result = await this.billingClient.patch(
      "/billing/subscriptions/{id}",
      {
        params: {
          path: { id },
        },
        body: data,
      },
    );
    return extractResponseData(result, true);
  }

  async cancelSubscription(id: string) {
    const result = await this.billingClient.post(
      "/billing/subscriptions/{id}/cancel",
      {
        params: {
          path: { id },
        },
      },
    );
    return extractResponseData(result, true);
  }

  async resumeSubscription(id: string) {
    const result = await this.billingClient.post(
      "/billing/subscriptions/{id}/resume",
      {
        params: {
          path: { id },
        },
      },
    );
    return extractResponseData(result, true);
  }

  // ==================== Invoices ====================

  async listInvoices(options?: {
    organization_id?: string;
    status?: "PAID" | "PENDING" | "REFUNDED" | "VOID";
    created_after?: string;
    created_before?: string;
    cursor?: string;
    limit?: number;
  }) {
    const result = await this.billingClient.get(
      "/billing/subscriptions/invoices",
      {
        params: {
          query: options,
        },
      },
    );
    return extractCursorPage(result.response, {
      items: result.data,
      fetcher: this.billingClient.fetch,
    });
  }

  async getInvoice(id: string) {
    const result = await this.billingClient.get(
      "/billing/subscriptions/invoices/{id}",
      {
        params: {
          path: { id },
        },
      },
    );
    return extractResponseData(result);
  }

  // ==================== Orders ====================

  async listOrders(options?: {
    organization_id?: string;
    status?: "PENDING" | "PAID" | "REFUNDED" | "FAILED";
    created_after?: string;
    created_before?: string;
    cursor?: string;
    limit?: number;
  }) {
    const result = await this.billingClient.get("/billing/orders", {
      params: {
        query: options,
      },
    });
    return extractCursorPage(result.response, {
      items: result.data,
      fetcher: this.billingClient.fetch,
    });
  }

  async getOrder(id: string) {
    const result = await this.billingClient.get("/billing/orders/{id}", {
      params: {
        path: { id },
      },
    });
    return extractResponseData(result);
  }

  // ==================== Checkout ====================

  async listCheckouts(options?: {
    organization_id?: string;
    product_code?: string;
    offer_code?: string;
    cursor?: string;
    limit?: number;
  }) {
    const result = await this.billingClient.get("/billing/checkout", {
      params: {
        query: options,
      },
    });
    return extractCursorPage(result.response, {
      items: result.data,
      fetcher: this.billingClient.fetch,
    });
  }

  async getCheckout(id: string) {
    const result = await this.billingClient.get("/billing/checkout/{id}", {
      params: {
        path: { id },
      },
    });
    return extractResponseData(result);
  }

  async createCheckout(data: {
    organization_id: string;
    product_code: string;
    offer_code: string;
    quantity: number;
    redirect_url: string;
    duration?: number;
    data?: Record<string, never>;
  }) {
    const result = await this.billingClient.post("/billing/checkout", {
      body: data,
    });
    return extractResponseData(result, true);
  }

  // ==================== Usage ====================

  async listUsageCounters(options: {
    organization_id: string;
    code?: string;
    group?: string;
    cursor?: string;
    limit?: number;
  }) {
    const result = await this.billingClient.get("/billing/usage/counters", {
      params: {
        query: options,
      },
    });
    return extractCursorPage(result.response, {
      items: result.data,
      fetcher: this.billingClient.fetch,
    });
  }

  async getUsageCounterByCode({
    organization_id,
    code,
    group,
  }: {
    organization_id: string;
    code: string;
    group?: string;
  }) {
    const result = await this.billingClient.get(
      "/billing/usage/counters/by-code",
      {
        params: {
          query: { organization_id, code, group },
        },
      },
    );
    return extractResponseData(result);
  }

  async getUsageCounter(id: string) {
    const result = await this.billingClient.get(
      "/billing/usage/counters/{id}",
      {
        params: {
          path: { id },
        },
      },
    );
    return extractResponseData(result);
  }

  async incrementUsage(data: {
    organization_id: string;
    code: string;
    amount: number;
    group?: string;
  }) {
    const result = await this.billingClient.post("/billing/usage/increment", {
      body: data,
    });
    if (!result.response.ok && result.response.status === 429) {
      return {
        success: false as const,
        error: "too_many_requests" as const,
        message: (result.error as any)?.message ?? "Usage limit exceeded",
      };
    }
    return {
      success: true as const,
      data: extractResponseData(result, true),
    };
  }

  async listUsageEvents(options?: {
    organization_id?: string;
    counter_code?: string;
    counter_group?: string;
    ref?: string;
    created_after?: string;
    created_before?: string;
    cursor?: string;
    limit?: number;
  }) {
    const result = await this.billingClient.get("/billing/usage/events", {
      params: {
        query: options,
      },
    });
    return extractCursorPage(result.response, {
      items: result.data,
      fetcher: this.billingClient.fetch,
    });
  }

  async getUsageHold(id: string) {
    const result = await this.billingClient.get("/billing/usage/holds/{id}", {
      params: {
        path: { id },
      },
    });
    return extractResponseData(result);
  }

  async reserveUsage(data: {
    organization_id: string;
    code: string;
    group?: string;
    amount: number;
    note: string;
    duration: number;
    ref: string;
    data?: Record<string, never>;
  }) {
    const result = await this.billingClient.post("/billing/usage/holds", {
      body: data,
    });
    if (!result.response.ok && result.response.status === 429) {
      return {
        success: false as const,
        error: "too_many_requests" as const,
        message: (result.error as any)?.message ?? "Usage limit exceeded",
      };
    }
    return {
      success: true as const,
      data: extractResponseData(result, true),
    };
  }

  async commitUsageHold(data: { ref: string; organization_id: string }) {
    const result = await this.billingClient.post(
      "/billing/usage/holds/commit",
      {
        body: data,
      },
    );
    return extractResponseData(result, true);
  }

  async releaseUsageHold(data: { ref: string; organization_id: string }) {
    const result = await this.billingClient.post(
      "/billing/usage/holds/release",
      {
        body: data,
      },
    );
    return extractResponseData(result, true);
  }

  // ==================== Entitlements ====================

  async getEntitlements(options: { organization_id: string }) {
    const result = await this.billingClient.get("/billing/entitlements", {
      params: {
        query: options,
      },
    });
    return extractResponseData(result);
  }

  async checkFeatureAccess(options: {
    organization_id: string;
    features: string;
  }) {
    const result = await this.billingClient.get(
      "/billing/entitlements/access",
      {
        params: {
          query: options,
        },
      },
    );
    return extractResponseData(result);
  }

  async getFeatureQuota(options: {
    organization_id: string;
    features: string[];
  }) {
    const result = await this.billingClient.get("/billing/entitlements/quota", {
      params: {
        query: {
          organization_id: options.organization_id,
          features: options.features.join(","),
        },
      },
    });
    return extractResponseData(result);
  }

  // ==================== Admin - Webhooks ====================

  async listWebhooks(options?: {
    provider?: "LEMON_SQUEEZY";
    processed?: boolean;
    created_after?: string;
    created_before?: string;
    cursor?: string;
    limit?: number;
  }) {
    const result = await this.billingClient.get("/billing/admin/webhooks", {
      params: {
        query: options,
      },
    });
    return extractCursorPage(result.response, {
      items: result.data,
      fetcher: this.billingClient.fetch,
    });
  }

  async getWebhook(id: string) {
    const result = await this.billingClient.get(
      "/billing/admin/webhooks/{id}",
      {
        params: {
          path: { id },
        },
      },
    );
    return extractResponseData(result);
  }
}
