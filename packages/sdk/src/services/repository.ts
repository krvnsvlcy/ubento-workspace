import {
  Commit,
  createRepositoryServiceClient,
  Repository,
  Tag,
} from "~/clients/repository/client.js";
import { extractResponseData } from "~/lib/client.js";
import { extractCursorPage } from "~/lib/pagination.js";
import { TokenManager } from "~/lib/token_manager.js";

/** A data structure that represents a file. */
export type BlobInfo = {
  /** Semantic type of the artifact (e.g. 'component', 'script', 'json', ...) */
  type: string;
  /** Hierarchical virtual path in the workspace */
  path: string;
  /** Content hash (stable identity of the contents) */
  sha: string;
};
/** A flat representation of a commit record (id → blob metadata). */
export type VcsRecord = Record<string, BlobInfo>;

export class RepositoryService {
  private repositoryClient: ReturnType<typeof createRepositoryServiceClient>;

  constructor({
    baseUrl,
    tokenManager,
  }: {
    baseUrl?: string;
    tokenManager: TokenManager;
  }) {
    this.repositoryClient = createRepositoryServiceClient({
      baseUrl,
      tokenManager,
    });
  }

  async listRepositories({
    organizationId,
    limit,
    cursor,
    ids,
    name,
    type,
    scope,
  }: {
    organizationId?: string;
    limit?: number;
    cursor?: string;
    ids?: string[];
    name?: string;
    type?: string;
    scope?: "public" | "private";
  } = {}) {
    const result = await this.repositoryClient.get("/repositories", {
      params: {
        query: {
          organization_id: organizationId,
          cursor: cursor,
          limit: limit,
          ids,
          name,
          type,
          scope,
        },
      },
    });
    return extractCursorPage<Repository>(result.response, {
      items: result.data,
      fetcher: this.repositoryClient.fetch,
    });
  }

  async createRepository(data: {
    organization_id: string;
    name: string;
    type: string;
    scope?: string;
  }) {
    const result = await this.repositoryClient.post("/repositories", {
      body: data,
    });
    return extractResponseData(result, true);
  }

  async getRepository(repositoryId: string) {
    const result = await this.repositoryClient.get(
      "/repositories/{repository_id}",
      {
        params: {
          path: { repository_id: repositoryId },
        },
      },
    );
    return extractResponseData(result);
  }

  async updateRepository(
    repositoryId: string,
    data: {
      name?: string;
      pointers?: Array<{
        tag_id: string;
        name: string;
      }>;
    },
  ) {
    const result = await this.repositoryClient.patch(
      "/repositories/{repository_id}",
      {
        params: {
          path: { repository_id: repositoryId },
        },
        body: data,
      },
    );
    return extractResponseData(result, true);
  }

  async updateRepositoryMetadata(
    repositoryId: string,
    update: Record<string, unknown>,
  ) {
    const result = await this.repositoryClient.patch(
      "/repositories/{repository_id}/metadata",
      {
        params: {
          path: { repository_id: repositoryId },
        },
        body: update,
      },
    );
    return extractResponseData(result, true);
  }

  async replaceRepositoryMetadata(
    repositoryId: string,
    update: Record<string, unknown>,
  ) {
    const result = await this.repositoryClient.put(
      "/repositories/{repository_id}/metadata",
      {
        params: {
          path: { repository_id: repositoryId },
        },
        body: update,
      },
    );
    return extractResponseData(result, true);
  }

  async deleteRepository(repositoryId: string) {
    const result = await this.repositoryClient.delete(
      "/repositories/{repository_id}",
      {
        params: {
          path: { repository_id: repositoryId },
        },
      },
    );
    return extractResponseData(result);
  }

  async listCommits(
    repositoryId: string,
    { limit, cursor }: { limit?: number; cursor?: string } = {},
  ) {
    const result = await this.repositoryClient.get(
      "/repositories/{repository_id}/commits",
      {
        params: {
          path: { repository_id: repositoryId },
          query: {
            limit,
            cursor,
          },
        },
      },
    );
    return extractCursorPage<Commit>(result.response, {
      items: result.data,
      fetcher: this.repositoryClient.fetch,
    });
  }

  async getCommit(commitId: string) {
    const result = await this.repositoryClient.get("/commits/{commit_id}", {
      params: {
        path: { commit_id: commitId },
      },
    });
    return extractResponseData(result);
  }

  async updateCommitMetadata(
    commitId: string,
    update: Record<string, unknown>,
  ) {
    const result = await this.repositoryClient.patch(
      "/commits/{commit_id}/metadata",
      {
        params: {
          path: { commit_id: commitId },
        },
        body: update,
      },
    );
    return extractResponseData(result, true);
  }
  async replaceCommitMetadata(
    commitId: string,
    update: Record<string, unknown>,
  ) {
    const result = await this.repositoryClient.put(
      "/commits/{commit_id}/metadata",
      {
        params: {
          path: { commit_id: commitId },
        },
        body: update,
      },
    );
    return extractResponseData(result, true);
  }

  async deleteCommit(commitId: string) {
    const result = await this.repositoryClient.delete("/commits/{commit_id}", {
      params: {
        path: { commit_id: commitId },
      },
    });
    return extractResponseData(result);
  }

  async getCommitFileAtPath(commitId: string, path: string) {
    const result = await this.repositoryClient.get(
      "/commits/{commit_id}/file",
      {
        params: {
          path: { commit_id: commitId },
          query: { path },
        },
      },
    );
    return extractResponseData(result);
  }

  async getCommitFile(fileId: string) {
    const result = await this.repositoryClient.get("/commit-files/{file_id}", {
      params: {
        path: { file_id: fileId },
      },
    });
    return extractResponseData(result);
  }

  async listCommitFiles(
    commitId: string,
    { path, depth }: { path?: string; depth?: number } = {},
  ) {
    const result = await this.repositoryClient.get(
      "/commits/{commit_id}/files",
      {
        params: {
          path: { commit_id: commitId },
          query: { path, depth },
        },
      },
    );
    return extractResponseData(result, true);
  }

  async getCommitFileById(fileId: string) {
    const result = await this.repositoryClient.get("/commit-files/{file_id}", {
      params: {
        path: { file_id: fileId },
      },
    });
    return extractResponseData(result);
  }

  async getCommitFileContent(fileId: string) {
    const result = await this.repositoryClient.get(
      "/commit-files/{file_id}/content",
      {
        params: {
          path: { file_id: fileId },
        },
      },
    );
    return extractResponseData(result);
  }

  async getWorkspaceDiff(repositoryId: string, commitId?: string) {
    const result = await this.repositoryClient.get(
      "/repositories/{repository_id}/workspace/diff",
      {
        params: {
          path: { repository_id: repositoryId },
          query: commitId ? { commit_id: commitId } : undefined,
        },
      },
    );
    return extractResponseData(result);
  }

  // Repository Tags
  async listRepositoryTags(
    repositoryId: string,
    {
      cursor,
      limit,
    }: {
      cursor?: string;
      limit?: number;
    } = {},
  ) {
    const result = await this.repositoryClient.get(
      "/repositories/{repository_id}/tags",
      {
        params: {
          path: { repository_id: repositoryId },
          query: {
            cursor,
            limit,
          },
        },
      },
    );
    return extractCursorPage<Tag>(result.response, {
      items: result.data,
      fetcher: this.repositoryClient.fetch,
    });
  }

  async getTagByName(repositoryId: string, tagName: string) {
    const result = await this.repositoryClient.get(
      "/repositories/{repository_id}/tags/{tag_name}",
      {
        params: {
          path: { repository_id: repositoryId, tag_name: tagName },
        },
      },
    );
    return extractResponseData(result);
  }

  async getTag(tagId: string) {
    const result = await this.repositoryClient.get(
      "/repository-tags/{tag_id}",
      {
        params: {
          path: { tag_id: tagId },
        },
      },
    );
    return extractResponseData(result);
  }

  async createTag(data: {
    repository_id: string;
    name: string;
    commit_id: string;
  }) {
    const result = await this.repositoryClient.post("/repository-tags", {
      body: data,
    });
    return extractResponseData(result, true);
  }

  async deleteTag(tagId: string) {
    const result = await this.repositoryClient.delete(
      "/repository-tags/{tag_id}",
      {
        params: {
          path: { tag_id: tagId },
        },
      },
    );
    return extractResponseData(result);
  }

  // Workspace operations
  async commitRepositoryWorkspace(
    repositoryId: string,
    data: {
      message: string;
      committer: string;
      file_ids?: string[];
    },
  ) {
    const result = await this.repositoryClient.post(
      "/repositories/{repository_id}/workspace/commit",
      {
        params: {
          path: { repository_id: repositoryId },
        },
        body: data,
      },
    );
    return extractResponseData(result, true);
  }

  async resetRepositoryWorkspace(
    repositoryId: string,
    data?: {
      file_ids?: string[];
      commit_id?: string;
    },
  ) {
    const result = await this.repositoryClient.post(
      "/repositories/{repository_id}/workspace/reset",
      {
        params: {
          path: { repository_id: repositoryId },
        },
        body: data || {},
      },
    );
    return extractResponseData(result);
  }

  async getRepositoryWorkspaceRecord(repositoryId: string) {
    const result = await this.repositoryClient.get(
      "/repositories/{repository_id}/workspace/record",
      {
        params: {
          path: { repository_id: repositoryId },
        },
      },
    );
    return extractResponseData(result, true);
  }

  // Commit Record
  async getCommitRecord(commitId: string) {
    const result = await this.repositoryClient.get(
      "/commits/{commit_id}/record",
      {
        params: {
          path: { commit_id: commitId },
        },
      },
    );
    return extractResponseData(result, true) as unknown as Promise<VcsRecord>;
  }
}
