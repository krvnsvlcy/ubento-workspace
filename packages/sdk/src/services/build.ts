import { createBuildServiceClient } from "~/clients/build/client.js";
import { extractResponseData } from "~/lib/client.js";
import { extractCursorPage } from "~/lib/pagination.js";
import { TokenManager } from "~/lib/token_manager.js";

export class BuildService {
  private buildClient: ReturnType<typeof createBuildServiceClient>;

  constructor({
    baseUrl,
    tokenManager,
  }: {
    baseUrl?: string;
    tokenManager: TokenManager;
  }) {
    this.buildClient = createBuildServiceClient({
      baseUrl,
      tokenManager,
    });
  }

  async listBuilds({
    limit,
    cursor,
    ids,
    organization_id,
    commit_id,
    pipeline_id,
    repository_id,
    statuses,
    sort,
  }: {
    limit?: number;
    cursor?: string;
    ids?: string[];
    organization_id?: string;
    commit_id?: string;
    pipeline_id?: string;
    repository_id?: string;
    statuses?: (
      | "CREATED"
      | "QUEUED"
      | "RUNNING"
      | "SUCCEEDED"
      | "FAILED"
      | "CANCELLED"
    )[];
    sort?: string;
  } = {}) {
    const result = await this.buildClient.get("/builds", {
      params: {
        query: {
          limit,
          cursor,
          ids,
          organization_id,
          commit_id,
          pipeline_id,
          repository_id,
          statuses,
          sort,
        },
      },
    });
    return extractCursorPage(result.response, {
      items: result.data,
      fetcher: this.buildClient.fetch,
    });
  }

  async createBuild(data: {
    commit_id: string;
    pipeline_id: string;
    options?: {
      omit_push?: boolean;
      [key: string]: any;
    };
  }) {
    const result = await this.buildClient.post("/builds", {
      body: data,
    });
    if (!result.response.ok && result.response.status === 429) {
      return {
        success: false as const,
        error: "too_many_requests" as const,
        message: (result.error as any)?.message ?? "Build usage exceeded",
      };
    }
    return {
      success: true as const,
      data: extractResponseData(result, true),
    };
  }

  async getBuild(buildId: string) {
    const result = await this.buildClient.get("/builds/{build_id}", {
      params: {
        path: { build_id: buildId },
      },
    });
    return extractResponseData(result);
  }

  async updateBuild(
    buildId: string,
    data: {
      status?:
        | "CREATED"
        | "QUEUED"
        | "RUNNING"
        | "SUCCEEDED"
        | "FAILED"
        | "CANCELLED";
      output?: any;
    },
  ) {
    const result = await this.buildClient.patch("/builds/{build_id}", {
      params: {
        path: { build_id: buildId },
      },
      body: data as any,
    });
    return extractResponseData(result, true);
  }

  // Pipeline methods
  async listPipelines({
    limit,
    cursor,
    ids,
    organization_id,
    repository_id,
    name,
  }: {
    limit?: number;
    cursor?: string;
    ids?: string[];
    organization_id?: string;
    repository_id?: string;
    name?: string;
  } = {}) {
    const result = await this.buildClient.get("/pipelines", {
      params: {
        query: {
          limit,
          cursor,
          ids,
          organization_id,
          repository_id,
          name,
        },
      },
    });
    return extractCursorPage(result.response, {
      items: result.data,
      fetcher: this.buildClient.fetch,
    });
  }

  async createPipeline(data: {
    repository_id: string;
    name: string;
    description?: string;
    auto_build?: boolean;
    config: any;
  }) {
    const result = await this.buildClient.post("/pipelines", {
      body: data,
    });
    return extractResponseData(result, true);
  }

  async getPipeline(pipelineId: string) {
    const result = await this.buildClient.get("/pipelines/{pipeline_id}", {
      params: {
        path: { pipeline_id: pipelineId },
      },
    });
    return extractResponseData(result);
  }

  async updatePipeline(
    pipelineId: string,
    data: {
      name?: string;
      description?: string;
      auto_build?: boolean;
      config?: any;
    },
  ) {
    const result = await this.buildClient.patch("/pipelines/{pipeline_id}", {
      params: {
        path: { pipeline_id: pipelineId },
      },
      body: data,
    });
    return extractResponseData(result, true);
  }

  async deletePipeline(pipelineId: string) {
    const result = await this.buildClient.delete("/pipelines/{pipeline_id}", {
      params: {
        path: { pipeline_id: pipelineId },
      },
    });
    return extractResponseData(result, true);
  }

  // Task methods
  async listTasks({
    limit,
    cursor,
    ids,
    name,
  }: {
    limit?: number;
    cursor?: string;
    ids?: string[];
    name?: string;
  } = {}) {
    const result = await this.buildClient.get("/tasks", {
      params: {
        query: {
          limit,
          cursor,
          ids,
          name,
        },
      },
    });
    return extractCursorPage(result.response, {
      items: result.data,
      fetcher: this.buildClient.fetch,
    });
  }

  async createTask(data: { name: string; description?: string }) {
    const result = await this.buildClient.post("/tasks", {
      body: data,
    });
    return extractResponseData(result, true);
  }

  async getTask(taskId: string) {
    const result = await this.buildClient.get("/tasks/{task_id}", {
      params: {
        path: { task_id: taskId },
      },
    });
    return extractResponseData(result);
  }

  async updateTask(
    taskId: string,
    data: {
      name?: string;
      description?: string;
    },
  ) {
    const result = await this.buildClient.patch("/tasks/{task_id}", {
      params: {
        path: { task_id: taskId },
      },
      body: data,
    });
    return extractResponseData(result, true);
  }

  async deleteTask(taskId: string) {
    const result = await this.buildClient.delete("/tasks/{task_id}", {
      params: {
        path: { task_id: taskId },
      },
    });
    return extractResponseData(result, true);
  }

  async deployTaskVersion(data: {
    organization_id: string;
    manifest: any;
    files: Record<string, string>;
  }) {
    const result = await this.buildClient.post("/tasks/deploy", {
      body: {
        organization_id: data.organization_id,
        manifest: data.manifest,
        files: data.files as any,
      },
    });
    return extractResponseData(result, true);
  }

  // Task Version methods
  async listTaskVersions({
    limit,
    cursor,
    ids,
    task_name,
    semver,
  }: {
    limit?: number;
    cursor?: string;
    ids?: string[];
    task_name?: string;
    semver?: string;
  } = {}) {
    const result = await this.buildClient.get("/task-versions", {
      params: {
        query: {
          limit,
          cursor,
          ids,
          task_name,
          semver,
        },
      },
    });
    return extractCursorPage(result.response, {
      items: result.data,
      fetcher: this.buildClient.fetch,
    });
  }

  async getTaskVersion(taskVersionId: string) {
    const result = await this.buildClient.get(
      "/task-versions/{task_version_id}",
      {
        params: {
          path: { task_version_id: taskVersionId },
        },
      },
    );
    return extractResponseData(result);
  }

  async deleteTaskVersion(taskVersionId: string) {
    const result = await this.buildClient.delete(
      "/task-versions/{task_version_id}",
      {
        params: {
          path: { task_version_id: taskVersionId },
        },
      },
    );
    return extractResponseData(result, true);
  }

  async readTaskVersionFile(taskVersionId: string, fileName: string) {
    const result = await this.buildClient.get(
      "/task-versions/{task_version_id}/file/{fileName}",
      {
        params: {
          path: { task_version_id: taskVersionId, fileName },
        },
        parseAs: "text",
      },
    );

    if (result.response.status === 404) {
      return "";
    } else if (!result.response.ok) {
      throw new Error(
        `Failed to fetch file: ${result.response.status} ${result.response.statusText}`,
      );
    }

    return result.data || "";
  }

  async resolveTaskVersion(organizationId: string, ref: string) {
    const result = await this.buildClient.get(
      "/task-versions/resolve/{organization_id}/{ref}",
      {
        params: {
          path: { organization_id: organizationId, ref },
        },
      },
    );
    return extractResponseData(result);
  }

  // Variable methods
  async listVariables({
    limit,
    cursor,
    organization_id,
    repository_id,
    pipeline_id,
    names,
  }: {
    limit?: number;
    cursor?: string;
    organization_id: string;
    repository_id?: string;
    pipeline_id?: string | null;
    names?: string[];
  }) {
    const result = await this.buildClient.get("/variables", {
      params: {
        query: {
          limit,
          cursor,
          organization_id,
          repository_id,
          pipeline_id,
          names,
        },
      },
    });
    return extractCursorPage(result.response, {
      items: result.data,
      fetcher: this.buildClient.fetch,
    });
  }

  async createVariable(data: {
    organization_id: string;
    pipeline_id?: string | null;
    repository_id?: string | null;
    name: string;
    value: string;
    is_sensitive: boolean;
  }) {
    const result = await this.buildClient.post("/variables", {
      body: data,
    });
    return extractResponseData(result, true);
  }

  async getVariable(variableId: string) {
    const result = await this.buildClient.get("/variables/{id}", {
      params: {
        path: { id: variableId },
      },
    });
    return extractResponseData(result);
  }

  async updateVariable(
    variableId: string,
    data: {
      value?: string;
      is_sensitive?: boolean;
    },
  ) {
    const result = await this.buildClient.patch("/variables/{id}", {
      params: {
        path: { id: variableId },
      },
      body: data,
    });
    return extractResponseData(result, true);
  }

  async deleteVariable(variableId: string) {
    const result = await this.buildClient.delete("/variables/{id}", {
      params: {
        path: { id: variableId },
      },
    });
    return extractResponseData(result, true);
  }

  async getVariableByName({
    organization_id,
    name,
    repository_id,
    pipeline_id,
  }: {
    organization_id: string;
    name: string;
    repository_id?: string | null;
    pipeline_id?: string | null;
  }) {
    const result = await this.buildClient.get("/variable", {
      params: {
        query: {
          organization_id,
          name,
          repository_id: repository_id || undefined,
          pipeline_id: pipeline_id || undefined,
        },
      },
    });
    return extractResponseData(result);
  }

  async resolveVariables({
    organization_id,
    repository_id,
    pipeline_id,
  }: {
    organization_id: string;
    repository_id?: string | null;
    pipeline_id?: string | null;
  }) {
    const result = await this.buildClient.get("/variables/resolved", {
      params: {
        query: {
          organization_id,
          repository_id: repository_id || undefined,
          pipeline_id: pipeline_id || undefined,
        },
      },
    });
    return extractResponseData(result);
  }

  // Backward compatibility aliases
  /** @deprecated Use createVariable instead */
  async upsertVariable(data: {
    organization_id: string;
    pipeline_id?: string | null;
    key: string;
    value: string;
    is_sensitive?: boolean;
  }) {
    return this.createVariable({
      organization_id: data.organization_id,
      pipeline_id: data.pipeline_id,
      name: data.key, // Map key to name
      value: data.value,
      is_sensitive: data.is_sensitive ?? false,
    });
  }
}
