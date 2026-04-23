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
      headers: {
        "x-ubento-service": "iam",
      },
    });
  }

  // ===== Teams =====

  async listTeams({
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
    const result = await this.iamClient.get("/teams", {
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

  async getTeam(teamId: string) {
    const result = await this.iamClient.get("/teams/{team_id}", {
      params: {
        path: { team_id: teamId },
      },
    });
    return extractResponseData(result);
  }

  async createTeam(data: { name: string; handle: string; owner: string }) {
    const result = await this.iamClient.post("/teams", {
      body: data,
    });
    return extractResponseData(result, true);
  }

  async checkTeamHandle(handle: string) {
    const result = await this.iamClient.post("/teams/check-handle", {
      body: { handle },
    });
    return extractResponseData(result, true);
  }

  async updateTeam(teamId: string, data: { name?: string; handle?: string }) {
    const result = await this.iamClient.patch("/teams/{team_id}", {
      params: {
        path: { team_id: teamId },
      },
      body: data,
    });
    return extractResponseData(result, true);
  }

  async deleteTeam(teamId: string) {
    const result = await this.iamClient.delete("/teams/{team_id}", {
      params: {
        path: { team_id: teamId },
      },
    });
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

  async getUserTeams(userId: string) {
    const result = await this.iamClient.get("/users/{user_id}/teams", {
      params: {
        path: { user_id: userId },
      },
    });
    return extractResponseData(result, true);
  }

  // ===== Team Invites =====

  async listTeamInvites({
    teamId,
    limit,
    cursor,
    statuses,
    email,
  }: {
    teamId: string;
    limit?: number;
    cursor?: string;
    statuses?: ("PENDING" | "ACCEPTED" | "REVOKED" | "EXPIRED")[];
    email?: string;
  }) {
    const result = await this.iamClient.get("/teams/{team_id}/invites", {
      params: {
        path: { team_id: teamId },
        query: {
          limit,
          cursor,
          statuses,
          email,
        },
      },
    });
    return extractCursorPage(result.response, {
      items: (result.data as any)?.items || [],
      fetcher: this.iamClient.fetch,
    });
  }

  async createTeamInvite({
    teamId,
    email,
    role,
    expires_in_seconds,
  }: {
    teamId: string;
    email: string;
    role: string;
    expires_in_seconds?: number;
  }) {
    const result = await this.iamClient.post("/teams/{team_id}/invites", {
      params: {
        path: { team_id: teamId },
      },
      body: {
        email,
        role,
        expires_in_seconds,
      },
    });
    return extractResponseData(result, true);
  }

  async getTeamInvite(inviteId: string) {
    const result = await this.iamClient.get("/team-invites/{invite_id}", {
      params: {
        path: { invite_id: inviteId },
      },
    });
    return extractResponseData(result);
  }

  async revokeTeamInvite(inviteId: string) {
    const result = await this.iamClient.post(
      "/team-invites/{invite_id}/revoke",
      {
        params: {
          path: { invite_id: inviteId },
        },
      },
    );
    return extractResponseData(result, true);
  }

  async resolveTeamInvite(token: string) {
    const result = await this.iamClient.post("/team-invites/resolve", {
      body: { token },
    });
    return extractResponseData(result, true);
  }

  async acceptTeamInvite(token: string) {
    const result = await this.iamClient.post("/team-invites/accept", {
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
      items: (result.data as any)?.items || [],
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
