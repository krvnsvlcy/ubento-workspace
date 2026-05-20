import { createWorkspaceServiceClient } from "~/clients/workspace/client.js";
import { extractResponseData } from "~/lib/client.js";
import { TokenManager } from "~/lib/token_manager.js";

export class WorkspaceService {
  private workspaceClient: ReturnType<typeof createWorkspaceServiceClient>;

  constructor({
    baseUrl,
    tokenManager,
  }: {
    baseUrl?: string;
    tokenManager: TokenManager;
  }) {
    this.workspaceClient = createWorkspaceServiceClient({
      baseUrl,
      tokenManager,
      headers: {
        "x-ubento-service": "workspace",
      },
    });
  }

  // ===== Workspaces =====

  async listWorkspaces({
    limit,
    cursor,
    team_id,
  }: {
    limit?: number;
    cursor?: string;
    team_id?: string;
  } = {}) {
    const result = await this.workspaceClient.get("/workspaces", {
      params: {
        query: {
          limit,
          cursor,
          team_id,
        },
      },
    });
    return extractResponseData(result, true);
  }

  async getWorkspace(workspaceId: string) {
    const result = await this.workspaceClient.get(
      "/workspaces/{workspace_id}",
      {
        params: {
          path: { workspace_id: workspaceId },
        },
      },
    );
    return extractResponseData(result, true);
  }

  async getWorkspaceBySlug(slug: string) {
    const result = await this.workspaceClient.get("/workspaces/slug/{slug}", {
      params: {
        path: { slug },
      },
    });
    return extractResponseData(result, true);
  }

  async createWorkspace(data: {
    name: string;
    team_id: string;
    description?: string;
    data: Record<string, unknown>;
  }) {
    const result = await this.workspaceClient.post("/workspaces", {
      body: data,
    });
    return extractResponseData(result, true);
  }

  async updateWorkspace(
    workspaceId: string,
    data: {
      name?: string;
      description?: string;
      data?: Record<string, unknown>;
    },
  ) {
    const result = await this.workspaceClient.patch(
      "/workspaces/{workspace_id}",
      {
        params: {
          path: { workspace_id: workspaceId },
        },
        body: data,
      },
    );
    return extractResponseData(result, true);
  }

  async deleteWorkspace(workspaceId: string) {
    const result = await this.workspaceClient.delete(
      "/workspaces/{workspace_id}",
      {
        params: {
          path: { workspace_id: workspaceId },
        },
      },
    );
    return extractResponseData(result, true);
  }

  // ===== Boards =====

  async listBoards({
    workspace_id,
    limit,
    cursor,
    parent_id,
  }: {
    workspace_id: string;
    limit?: number;
    cursor?: string;
    parent_id?: string | null;
  }) {
    const result = await this.workspaceClient.get("/boards", {
      params: {
        query: {
          workspace_id,
          limit,
          cursor,
          parent_id,
        } as any,
      },
    });
    return extractResponseData(result, true);
  }

  async getBoard(boardId: string) {
    const result = await this.workspaceClient.get("/boards/{board_id}", {
      params: {
        path: { board_id: boardId },
      },
    });
    return extractResponseData(result, true);
  }

  async createBoard(data: {
    workspace_id: string;
    name: string;
    parent_id?: string;
    data: any;
  }) {
    const result = await this.workspaceClient.post("/boards", {
      body: data as any,
    });
    return extractResponseData(result, true);
  }

  async updateBoard(
    boardId: string,
    data: { name?: string; parent_id?: string; data?: any },
  ) {
    const result = await this.workspaceClient.patch("/boards/{board_id}", {
      params: {
        path: { board_id: boardId },
      },
      body: data,
    });
    return extractResponseData(result, true);
  }

  async deleteBoard(boardId: string) {
    const result = await this.workspaceClient.delete("/boards/{board_id}", {
      params: {
        path: { board_id: boardId },
      },
    });
    return extractResponseData(result, true);
  }

  // ===== Workspace Memberships =====

  async listWorkspaceMemberships({
    workspace_id,
    user_id,
    limit,
    cursor,
  }: {
    workspace_id?: string;
    user_id?: string;
    limit?: number;
    cursor?: string;
  } = {}) {
    const result = await this.workspaceClient.get("/workspace-memberships", {
      params: {
        query: {
          workspace_id,
          user_id,
          limit,
          cursor,
        },
      },
    });
    return extractResponseData(result, true);
  }

  async createWorkspaceMembership(data: {
    workspace_id: string;
    user_id: string;
    role: string;
  }) {
    const result = await this.workspaceClient.post("/workspace-memberships", {
      body: data,
    });
    return extractResponseData(result, true);
  }

  async deleteWorkspaceMembership(membershipId: string) {
    const result = await this.workspaceClient.delete(
      "/workspace-memberships/{membership_id}",
      {
        params: {
          path: { membership_id: membershipId },
        },
      },
    );
    return extractResponseData(result, true);
  }

  // ===== Workspace Invites =====

  async listWorkspaceInvites({
    workspace_id,
    limit,
    cursor,
  }: {
    workspace_id: string;
    limit?: number;
    cursor?: string;
  }) {
    const result = await this.workspaceClient.get(
      "/workspace-invites/{workspace_id}",
      {
        params: {
          path: { workspace_id },
          query: {
            limit,
            cursor,
          },
        },
      },
    );
    return extractResponseData(result, true);
  }

  async createWorkspaceInvite(
    workspace_id: string,
    data: { email: string; role: string },
  ) {
    const result = await this.workspaceClient.post(
      "/workspace-invites/{workspace_id}",
      {
        params: {
          path: { workspace_id },
        },
        body: data,
      },
    );
    return extractResponseData(result, true);
  }

  async acceptWorkspaceInvite(id: string, token: string) {
    const result = await this.workspaceClient.post(
      "/workspace-invites/{id}/accept",
      {
        params: {
          path: { id },
        },
        body: { token },
      },
    );
    return extractResponseData(result, true);
  }
}
