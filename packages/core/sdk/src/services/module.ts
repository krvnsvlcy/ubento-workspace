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

  async listModules({ team_id }: { team_id?: string } = {}) {
    const result = await this.moduleClient.get("/modules", {
      params: {
        query: { team_id },
      },
    });
    const data = extractResponseData(result) as any;
    return data.data as Module[];
  }

  async getModule(moduleId: string) {
    const result = await this.moduleClient.get("/modules/{module_id}", {
      params: {
        path: { module_id: moduleId },
      },
    });
    return extractResponseData(result) as Module;
  }

  async getModuleBySlug(slug: string) {
    const result = await this.moduleClient.get("/modules/slug/{slug}", {
      params: {
        path: { slug },
      },
    });
    return extractResponseData(result) as Module;
  }

  async createModule(data: {
    name: string;
    slug?: string;
    team_id: string;
    source: string;
    scope: "public" | "team";
  }) {
    const result = await this.moduleClient.post("/modules", {
      body: data,
    });
    return extractResponseData(result, true) as Module;
  }

  async updateModule(moduleId: string, data: { name?: string; slug?: string }) {
    const result = await this.moduleClient.patch("/modules/{module_id}", {
      params: {
        path: { module_id: moduleId },
      },
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

  async listModuleVersions(moduleId: string) {
    const result = await this.moduleClient.get(
      "/modules/{module_id}/versions",
      {
        params: {
          path: { module_id: moduleId },
        },
      },
    );
    const data = extractResponseData(result) as any;
    return data.data as ModuleVersion[];
  }

  async publishModuleVersion(moduleId: string, data: { source: string }) {
    const result = await this.moduleClient.post(
      "/modules/{module_id}/versions",
      {
        params: {
          path: { module_id: moduleId },
        },
        body: data,
      },
    );
    return extractResponseData(result, true) as ModuleVersion;
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
    return extractResponseData(result) as ModuleVersion;
  }

  async getModuleVersionSource(moduleId: string, versionId: string) {
    const result = await this.moduleClient.get(
      "/modules/{module_id}/versions/{version_id}/source",
      {
        params: {
          path: { module_id: moduleId, version_id: versionId },
        },
      },
    );
    const data = extractResponseData(result) as any;
    return data.source as string;
  }

  async getModuleVersionArtifact(moduleId: string, versionId: string) {
    const result = await this.moduleClient.get(
      "/modules/{module_id}/versions/{version_id}/artifact",
      {
        params: {
          path: { module_id: moduleId, version_id: versionId },
        },
      },
    );
    const data = extractResponseData(result) as any;
    return data.artifact as string;
  }
}
