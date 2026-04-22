import { createIamServiceClient } from "~/clients/iam/client.js";
import { extractResponseData } from "~/lib/client.js";
import { extractCursorPage } from "~/lib/pagination.js";
import { TokenManager } from "~/lib/token_manager.js";

export class IamService {
  private iamClient: ReturnType<typeof createIamServiceClient>;

  constructor({
    baseUrl,
    tokenManager,
  }: {
    baseUrl?: string;
    tokenManager: TokenManager;
  }) {
    this.iamClient = createIamServiceClient({
      baseUrl,
      tokenManager,
    });
  }

  // ===== Organizations =====

  async listOrganizations({
    limit,
    cursor,
    ids,
    name,
    handle,
  }: {
    limit?: number;
    cursor?: string;
    ids?: string[];
    name?: string;
    handle?: string;
  } = {}) {
    const result = await this.iamClient.get("/organizations", {
      params: {
        query: {
          limit,
          cursor,
          ids,
          name,
          handle,
        },
      },
    });
    return extractCursorPage(result.response, {
      items: result.data,
      fetcher: this.iamClient.fetch,
    });
  }

  async getOrganization(organizationId: string) {
    const result = await this.iamClient.get(
      "/organizations/{organization_id}",
      {
        params: {
          path: { organization_id: organizationId },
        },
      },
    );
    return extractResponseData(result);
  }

  async createOrganization(data: {
    name: string;
    handle: string;
    owner: string;
  }) {
    const result = await this.iamClient.post("/organizations", {
      body: data,
    });
    return extractResponseData(result, true);
  }
  async checkOrganizationHandle(handle: string) {
    const result = await this.iamClient.post("/organizations/check-handle", {
      body: { handle },
    });
    return extractResponseData(result, true);
  }

  async updateOrganization(
    organizationId: string,
    data: { name?: string; handle?: string },
  ) {
    const result = await this.iamClient.patch(
      "/organizations/{organization_id}",
      {
        params: {
          path: { organization_id: organizationId },
        },
        body: data,
      },
    );
    return extractResponseData(result, true);
  }

  async deleteOrganization(organizationId: string) {
    const result = await this.iamClient.delete(
      "/organizations/{organization_id}",
      {
        params: {
          path: { organization_id: organizationId },
        },
      },
    );
    return extractResponseData(result, true);
  }

  // ===== Users =====

  async listUsers({
    limit,
    cursor,
    email,
  }: {
    limit?: number;
    cursor?: string;
    email?: string;
  } = {}) {
    const result = await this.iamClient.get("/users", {
      params: {
        query: {
          limit,
          cursor,
          email,
        },
      },
    });
    return extractCursorPage(result.response, {
      items: result.data,
      fetcher: this.iamClient.fetch,
    });
  }

  async getUser(userId: string) {
    const result = await this.iamClient.get("/users/{user_id}", {
      params: {
        path: { user_id: userId },
      },
    });
    return extractResponseData(result);
  }

  async deleteUser(userId: string) {
    const result = await this.iamClient.delete("/users/{user_id}", {
      params: {
        path: { user_id: userId },
      },
    });
    return extractResponseData(result, true);
  }

  async getUserOrganizations(userId: string) {
    const result = await this.iamClient.get("/users/{user_id}/organizations", {
      params: {
        path: { user_id: userId },
      },
    });
    return extractResponseData(result, true);
  }

  // ===== Organization Invites =====

  async listOrganizationInvites({
    organizationId,
    limit,
    cursor,
    statuses,
    email,
  }: {
    organizationId: string;
    limit?: number;
    cursor?: string;
    statuses?: ("PENDING" | "ACCEPTED" | "REVOKED" | "EXPIRED")[];
    email?: string;
  }) {
    const result = await this.iamClient.get(
      "/organizations/{organization_id}/invites",
      {
        params: {
          path: { organization_id: organizationId },
          query: {
            limit,
            cursor,
            statuses,
            email,
          },
        },
      },
    );
    return extractCursorPage(result.response, {
      items: result.data?.items || [],
      fetcher: this.iamClient.fetch,
    });
  }

  async createOrganizationInvite({
    organizationId,
    email,
    role,
    expires_in_seconds,
  }: {
    organizationId: string;
    email: string;
    role: string;
    expires_in_seconds?: number;
  }) {
    const result = await this.iamClient.post(
      "/organizations/{organization_id}/invites",
      {
        params: {
          path: { organization_id: organizationId },
        },
        body: {
          email,
          role,
          expires_in_seconds,
        },
      },
    );
    return extractResponseData(result, true);
  }

  async getOrganizationInvite(inviteId: string) {
    const result = await this.iamClient.get(
      "/organization-invites/{invite_id}",
      {
        params: {
          path: { invite_id: inviteId },
        },
      },
    );
    return extractResponseData(result);
  }

  async revokeOrganizationInvite(inviteId: string) {
    const result = await this.iamClient.post(
      "/organization-invites/{invite_id}/revoke",
      {
        params: {
          path: { invite_id: inviteId },
        },
      },
    );
    return extractResponseData(result, true);
  }

  async resolveOrganizationInvite(token: string) {
    const result = await this.iamClient.post("/organization-invites/resolve", {
      body: { token },
    });
    return extractResponseData(result, true);
  }

  async acceptOrganizationInvite(token: string) {
    const result = await this.iamClient.post("/organization-invites/accept", {
      body: { token },
    });
    return extractResponseData(result, true);
  }

  // ===== Sessions =====

  async listSessions({
    limit,
    cursor,
    user_id,
  }: {
    limit?: number;
    cursor?: string;
    user_id?: string;
  } = {}) {
    const result = await this.iamClient.get("/sessions", {
      params: {
        query: {
          limit,
          cursor,
          user_id,
        },
      },
    });
    return extractCursorPage(result.response, {
      items: result.data?.items || [],
      fetcher: this.iamClient.fetch,
    });
  }

  async getSession(id: string) {
    const result = await this.iamClient.get("/sessions/{id}", {
      params: {
        path: { id },
      },
    });
    return extractResponseData(result);
  }

  async revokeSession(id: string) {
    const result = await this.iamClient.post("/sessions/{id}/revoke", {
      params: {
        path: { id },
      },
    });
    return extractResponseData(result, true);
  }

  // ===== Clients =====

  async listClients({
    limit,
    cursor,
  }: {
    limit?: number;
    cursor?: string;
  } = {}) {
    const result = await this.iamClient.get("/clients", {
      params: {
        query: {
          limit,
          cursor,
        },
      },
    });
    return extractCursorPage(result.response, {
      items: result.data,
      fetcher: this.iamClient.fetch,
    });
  }

  async getClient(id: string) {
    const result = await this.iamClient.get("/clients/{id}", {
      params: {
        path: { id },
      },
    });
    return extractResponseData(result);
  }

  async createClient(data: { name: string; description?: string }) {
    const result = await this.iamClient.post("/clients", {
      body: data,
    });
    return extractResponseData(result, true);
  }

  async deleteClient(id: string) {
    const result = await this.iamClient.delete("/clients/{id}", {
      params: {
        path: { id },
      },
    });
    return extractResponseData(result, true);
  }

  // ===== Client Credentials =====

  async listClientCredentials({
    limit,
    cursor,
    client_id,
  }: {
    limit?: number;
    cursor?: string;
    client_id?: string;
  } = {}) {
    const result = await this.iamClient.get("/client-credentials", {
      params: {
        query: {
          limit,
          cursor,
          client_id,
        },
      },
    });
    return extractCursorPage(result.response, {
      items: result.data,
      fetcher: this.iamClient.fetch,
    });
  }

  async createClientCredential(data: { client_id: string; label?: string }) {
    const result = await this.iamClient.post("/client-credentials", {
      body: data,
    });
    return extractResponseData(result, true);
  }

  async deleteClientCredential(id: string) {
    const result = await this.iamClient.delete("/client-credentials/{id}", {
      params: {
        path: { id },
      },
    });
    return extractResponseData(result, true);
  }
}
