import {
  createModuleServiceClient,
  Module,
  ModuleVersion,
} from "~/clients/module/client.js";
import { extractResponseData } from "~/lib/client.js";
import { TokenManager } from "~/lib/token_manager.js";

export class ModuleService {
  private moduleClient: ReturnType<typeof createModuleServiceClient>;

  constructor({
    baseUrl,
    tokenManager,
  }: {
    baseUrl?: string;
    tokenManager: TokenManager;
  }) {
    this.moduleClient = createModuleServiceClient({
      baseUrl,
      tokenManager,
      headers: {
        "x-ubento-service": "module",
      },
    });
  }

  // ===== Modules =====
  async searchModules(query: {
    query?: string;
    types?: string[];
    scope?: "public" | "private";
    page?: number;
    limit?: number;
  }) {
    const result = await this.moduleClient.get("/modules/search", {
      params: {
        query,
      },
    });
    return extractResponseData(result, true);
  }

  async listModules(query: {
    team_id?: string;
    type?: string;
    scope?: "public" | "private";
    limit?: number;
    cursor?: string;
  } = {}) {
    const result = await this.moduleClient.get("/modules", {
      params: {
        query,
      },
    });
    return extractResponseData(result, true);
  }

  async getModule(moduleId: string) {
    const result = await this.moduleClient.get("/modules/{module_id}", {
      params: {
        path: { module_id: moduleId },
      },
    });
    return extractResponseData(result, true) as Module;
  }

  async createModule(data: {
    name: string;
    team_id: string;
    source: string;
    scope: "public" | "private";
    type: string;
    summary?: string;
  }) {
    const result = await this.moduleClient.post("/modules", {
      body: data,
    });
    return extractResponseData(result, true) as Module;
  }

  async deleteModule(moduleId: string) {
    const result = await this.moduleClient.delete("/modules/{module_id}", {
      params: {
        path: { module_id: moduleId },
      },
    });
    return extractResponseData(result, true);
  }

  // ===== Versions =====

  async listModuleVersions(moduleId: string, query: {
    limit?: number;
    cursor?: string;
  } = {}) {
    const result = await this.moduleClient.get(
      "/modules/{module_id}/versions",
      {
        params: {
          path: { module_id: moduleId },
          query,
        },
      },
    );
    return extractResponseData(result, true);
  }

  async uploadFile(
    file: Buffer | Uint8Array,
    contentType: string = "application/octet-stream",
  ) {
    const result = await this.moduleClient.post("/modules/upload", {
      body: file as any,
      headers: {
        "content-type": contentType,
      },
      // Ensure we don't try to JSON stringify the binary body
      bodySerializer: (body) => body,
    });
    return extractResponseData(result, true) as { hash: string };
  }

  async saveModuleVersion(
    moduleId: string,
    options: string | { content?: string; files?: Record<string, string> },
  ) {
    const body = typeof options === "string" ? { content: options } : options;
    const result = await this.moduleClient.post(
      "/modules/{module_id}/versions",
      {
        params: {
          path: { module_id: moduleId },
        },
        body: body as any,
      },
    );
    return extractResponseData(result, true) as Module;
  }

  async publishModule(moduleId: string) {
    const result = await this.moduleClient.post(
      "/modules/{module_id}/publish",
      {
        params: {
          path: { module_id: moduleId },
        },
      },
    );
    return extractResponseData(result, true) as Module;
  }

  async getModuleVersion(moduleId: string, versionId: string) {
    const result = await this.moduleClient.get(
      "/modules/{module_id}/versions/{version_id}",
      {
        params: {
          path: { module_id: moduleId, version_id: versionId },
        },
      },
    );
    return extractResponseData(result, true) as ModuleVersion;
  }

  async readModuleVersionFile(moduleId: string, versionId: string, filename: string) {
    const result = await this.moduleClient.get(
      "/modules/{module_id}/versions/{version_id}/{filename}",
      {
        params: {
          path: { module_id: moduleId, version_id: versionId, filename },
        },
      },
    );
    const data = extractResponseData(result, true) as { content: string };
    return data.content;
  }

  // ===== Registry =====

  async getRegistryToken(teamIds: string[]) {
    const result = await this.moduleClient.post("/modules/registry/token", {
      body: { teamIds },
    });
    return extractResponseData(result, true) as { token: string };
  }
}
