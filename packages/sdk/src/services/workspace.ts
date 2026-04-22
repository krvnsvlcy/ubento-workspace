import type {
  CreateFileRequest,
  CreateWorkspaceRequest,
  File,
  UpdateFileRequest,
  UpdateWorkspaceRequest,
  Workspace,
} from "~/clients/workspace/client.js";
import { createWorkspaceServiceClient } from "~/clients/workspace/client.js";
import { extractResponseData } from "~/lib/client.js";
import { extractCursorPage } from "~/lib/pagination.js";
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
    });
  }

  async listWorkspaces(organizationId?: string) {
    const result = await this.workspaceClient.get("/workspaces", {
      params: {
        query: organizationId ? { organization_id: organizationId } : undefined,
      },
    });
    return extractCursorPage<Workspace>(result.response, {
      items: result.data,
      fetcher: this.workspaceClient.fetch,
    });
  }

  async createWorkspace(data: CreateWorkspaceRequest) {
    const result = await this.workspaceClient.post("/workspaces", {
      body: data,
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
    return extractResponseData(result);
  }

  async updateWorkspace(workspaceId: string, data: UpdateWorkspaceRequest) {
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

  async listWorkspaceFiles(
    workspaceId: string,
    options?: {
      path?: string;
      depth?: number;
      types?: string;
      exclude?: string;
      include?: string;
      exclude_types?: string;
      updated_after?: string;
      order?: string;
      limit?: number;
      offset?: number;
      cursor?: string;
      direction?: "forward" | "backward";
    },
  ) {
    const result = await this.workspaceClient.get(
      "/workspaces/{workspace_id}/files",
      {
        params: {
          path: { workspace_id: workspaceId },
          query: options,
        },
      },
    );
    return extractCursorPage<File>(result.response, {
      items: result.data,
      fetcher: this.workspaceClient.fetch,
    });
  }

  async getWorkspaceFileByPath(workspaceId: string, filePath: string) {
    const result = await this.workspaceClient.get(
      "/workspaces/{workspace_id}/file",
      {
        params: {
          path: { workspace_id: workspaceId },
          query: { path: filePath },
        },
      },
    );
    return extractResponseData(result);
  }

  async getWorkspaceTree(
    workspaceId: string,
    options?: { directories?: boolean },
  ) {
    const result = await this.workspaceClient.get(
      "/workspaces/{workspace_id}/tree",
      {
        params: {
          path: { workspace_id: workspaceId },
          query: options,
        },
      },
    );
    return extractResponseData(result, true);
  }

  async getOrCreateWorkspaceFileByPath(
    workspaceId: string,
    filePath: string,
    create: { type: string },
  ) {
    const file = await this.getWorkspaceFileByPath(workspaceId, filePath);
    if (file) {
      return file;
    } else {
      return this.createWorkspaceFile({
        workspace_id: workspaceId,
        path: filePath,
        type: create.type,
      });
    }
  }

  async listFilesByIds(fileIds: string[]) {
    const result = await this.workspaceClient.get("/workspace-files", {
      params: {
        query: { file_ids: fileIds.join(",") },
      },
    });
    return extractResponseData(result, true);
  }

  async createWorkspaceFile(data: CreateFileRequest) {
    const result = await this.workspaceClient.post("/workspace-files", {
      body: data,
    });
    return extractResponseData(result, true);
  }

  async getWorkspaceFile(fileId: string) {
    const result = await this.workspaceClient.get(
      "/workspace-files/{file_id}",
      {
        params: {
          path: { file_id: fileId },
        },
      },
    );
    return extractResponseData(result);
  }

  async updateWorkspaceFile(fileId: string, data: UpdateFileRequest) {
    const result = await this.workspaceClient.patch(
      "/workspace-files/{file_id}",
      {
        params: {
          path: { file_id: fileId },
        },
        body: data,
      },
    );
    return extractResponseData(result, true);
  }

  async deleteWorkspaceFile(fileId: string) {
    const result = await this.workspaceClient.delete(
      "/workspace-files/{file_id}",
      {
        params: {
          path: { file_id: fileId },
        },
      },
    );
    return extractResponseData(result, true);
  }

  async getWorkspaceFileContent(fileId: string) {
    const response = await this.workspaceClient.fetch(
      new Request(
        new URL(
          `/workspace-files/${fileId}/content`,
          this.workspaceClient.baseUrl,
        ),
        {
          method: "GET",
        },
      ),
    );
    if (!response.ok) {
      throw new Error(
        `Failed to get workspace file content: ${response.statusText}`,
      );
    }
    return response.text();
  }
  async updateWorkspaceFileContent(fileId: string, content: string) {
    const response = await this.workspaceClient.fetch(
      new Request(
        new URL(
          `/workspace-files/${fileId}/content`,
          this.workspaceClient.baseUrl,
        ),
        {
          method: "PUT",
          body: content,
          headers: {
            "Content-Type": "text/plain",
          },
        },
      ),
    );
    if (!response.ok) {
      throw new Error(
        `Failed to update workspace file content: ${response.statusText || response.status}`,
      );
    }
    return (await response.json()) as File;
  }
}
