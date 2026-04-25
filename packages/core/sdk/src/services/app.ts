import { App, createAppServiceClient } from "~/clients/app/client.js";
import { extractResponseData } from "~/lib/client.js";
import { extractCursorPage } from "~/lib/pagination.js";
import { TokenManager } from "~/lib/token_manager.js";

export class AppService {
  private appClient: ReturnType<typeof createAppServiceClient>;

  constructor({
    baseUrl,
    tokenManager,
  }: {
    baseUrl?: string;
    tokenManager: TokenManager;
  }) {
    this.appClient = createAppServiceClient({
      baseUrl,
      tokenManager,
      headers: {
        "x-ubento-service": "app",
      },
    });
  }

  // ===== Apps =====

  async listApps({
    limit,
    cursor,
    team_id,
  }: {
    limit?: number;
    cursor?: string;
    team_id?: string;
  } = {}) {
    const result = await this.appClient.get("/apps", {
      params: {
        query: {
          limit,
          cursor,
          team_id,
        },
      },
    });
    return extractResponseData(result) as unknown as App[];
  }

  async getApp(appId: string) {
    const result = await this.appClient.get("/apps/{app_id}", {
      params: {
        path: { app_id: appId },
      },
    });
    return extractResponseData(result);
  }

  async getAppBySlug(slug: string) {
    const result = await this.appClient.get("/apps/slug/{slug}", {
      params: {
        path: { slug },
      },
    });
    return extractResponseData(result);
  }

  async createApp(data: {
    name: string;
    team_id: string;
    description?: string;
    data: Record<string, unknown>;
  }) {
    const result = await this.appClient.post("/apps", {
      body: data,
    });
    return extractResponseData(result, true);
  }

  async updateApp(
    appId: string,
    data: {
      name?: string;
      description?: string;
      data?: Record<string, unknown>;
    },
  ) {
    const result = await this.appClient.patch("/apps/{app_id}", {
      params: {
        path: { app_id: appId },
      },
      body: data,
    });
    return extractResponseData(result, true);
  }

  async deleteApp(appId: string) {
    const result = await this.appClient.delete("/apps/{app_id}", {
      params: {
        path: { app_id: appId },
      },
    });
    return extractResponseData(result, true);
  }

  // ===== Pages =====

  async listPages({
    app_id,
    limit,
    cursor,
  }: {
    app_id: string;
    limit?: number;
    cursor?: string;
  }) {
    const result = await this.appClient.get("/pages", {
      params: {
        query: {
          app_id,
          limit,
          cursor,
        },
      },
    });
    return extractCursorPage(result.response, {
      items: (result.data as any)?.items || [],
      fetcher: this.appClient.fetch,
    });
  }

  async getPage(pageId: string) {
    const result = await this.appClient.get("/pages/{page_id}", {
      params: {
        path: { page_id: pageId },
      },
    });
    return extractResponseData(result);
  }

  async createPage(data: { app_id: string; name: string; path: string }) {
    const result = await this.appClient.post("/pages", {
      body: data,
    });
    return extractResponseData(result, true);
  }

  async updatePage(pageId: string, data: { name?: string; path?: string }) {
    const result = await this.appClient.patch("/pages/{page_id}", {
      params: {
        path: { page_id: pageId },
      },
      body: data,
    });
    return extractResponseData(result, true);
  }

  async deletePage(pageId: string) {
    const result = await this.appClient.delete("/pages/{page_id}", {
      params: {
        path: { page_id: pageId },
      },
    });
    return extractResponseData(result, true);
  }

  // ===== Components =====

  async listComponents({
    app_id,
    limit,
    cursor,
  }: {
    app_id: string;
    limit?: number;
    cursor?: string;
  }) {
    const result = await this.appClient.get("/components", {
      params: {
        query: {
          app_id,
          limit,
          cursor,
        },
      },
    });
    return extractCursorPage(result.response, {
      items: (result.data as any)?.items || [],
      fetcher: this.appClient.fetch,
    });
  }

  async getComponent(componentId: string) {
    const result = await this.appClient.get("/components/{component_id}", {
      params: {
        path: { component_id: componentId },
      },
    });
    return extractResponseData(result);
  }

  async createComponent(data: {
    app_id: string;
    name: string;
    type: string;
    props?: Record<string, any>;
  }) {
    const result = await this.appClient.post("/components", {
      body: data as any,
    });
    return extractResponseData(result, true);
  }

  async updateComponent(
    componentId: string,
    data: { name?: string; type?: string; props?: Record<string, any> },
  ) {
    const result = await this.appClient.patch("/components/{component_id}", {
      params: {
        path: { component_id: componentId },
      },
      body: data as any,
    });
    return extractResponseData(result, true);
  }

  async deleteComponent(componentId: string) {
    const result = await this.appClient.delete("/components/{component_id}", {
      params: {
        path: { component_id: componentId },
      },
    });
    return extractResponseData(result, true);
  }

  // ===== App Memberships =====

  async listAppMemberships({
    app_id,
    user_id,
    limit,
    cursor,
  }: {
    app_id?: string;
    user_id?: string;
    limit?: number;
    cursor?: string;
  } = {}) {
    const result = await this.appClient.get("/app-memberships", {
      params: {
        query: {
          app_id,
          user_id,
          limit,
          cursor,
        },
      },
    });
    return extractCursorPage(result.response, {
      items: (result.data as any)?.items || [],
      fetcher: this.appClient.fetch,
    });
  }

  async createAppMembership(data: {
    app_id: string;
    user_id: string;
    role: string;
  }) {
    const result = await this.appClient.post("/app-memberships", {
      body: data,
    });
    return extractResponseData(result, true);
  }

  async deleteAppMembership(membershipId: string) {
    const result = await this.appClient.delete(
      "/app-memberships/{membership_id}",
      {
        params: {
          path: { membership_id: membershipId },
        },
      },
    );
    return extractResponseData(result, true);
  }

  // ===== App Invites =====

  async listAppInvites({
    app_id,
    limit,
    cursor,
  }: {
    app_id: string;
    limit?: number;
    cursor?: string;
  }) {
    const result = await this.appClient.get("/app-invites/{app_id}", {
      params: {
        path: { app_id },
        query: {
          limit,
          cursor,
        },
      },
    });
    return extractCursorPage(result.response, {
      items: (result.data as any)?.items || [],
      fetcher: this.appClient.fetch,
    });
  }

  async createAppInvite(app_id: string, data: { email: string; role: string }) {
    const result = await this.appClient.post("/app-invites/{app_id}", {
      params: {
        path: { app_id },
      },
      body: data,
    });
    return extractResponseData(result, true);
  }

  async acceptAppInvite(id: string, token: string) {
    const result = await this.appClient.post("/app-invites/{id}/accept", {
      params: {
        path: { id },
      },
      body: { token },
    });
    return extractResponseData(result, true);
  }
}
