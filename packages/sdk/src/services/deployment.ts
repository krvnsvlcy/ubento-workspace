import type { Deployment } from "~/clients/deployment/client.js";
import { createDeploymentServiceClient } from "~/clients/deployment/client.js";
import { extractResponseData } from "~/lib/client.js";
import { extractCursorPage } from "~/lib/pagination.js";
import { TokenManager } from "~/lib/token_manager.js";

export class DeploymentService {
  private deploymentClient: ReturnType<typeof createDeploymentServiceClient>;

  constructor({
    baseUrl,
    tokenManager,
  }: {
    baseUrl?: string;
    tokenManager: TokenManager;
  }) {
    this.deploymentClient = createDeploymentServiceClient({
      baseUrl,
      tokenManager,
    });
  }

  async listDeployments(options?: {
    ids?: string[];
    limit?: number;
    cursor?: string;
    direction?: "forward" | "backward";
    sort?: string;
  }) {
    const result = await this.deploymentClient.get("/deployments", {
      params: {
        query: {
          ids: options?.ids,
          limit: options?.limit,
          cursor: options?.cursor,
          direction: options?.direction,
          sort: options?.sort,
        },
      },
    });
    return extractCursorPage<Deployment>(result.response, {
      items: (result.data as any)?.items || result.data,
      fetcher: this.deploymentClient.fetch,
    });
  }

  async createDeployment(data: { repository_id: string; manifest: any }) {
    const result = await this.deploymentClient.post("/deployments", {
      body: data,
    });
    return extractResponseData(result, true);
  }

  async getDeployment(deploymentId: string) {
    const result = await this.deploymentClient.get(
      "/deployments/{deployment_id}",
      {
        params: {
          path: { deployment_id: deploymentId },
        },
      },
    );
    return extractResponseData(result);
  }

  async getDeploymentManifest(deploymentId: string) {
    const result = await this.deploymentClient.get(
      "/deployments/{deployment_id}/manifest",
      {
        params: {
          path: { deployment_id: deploymentId },
        },
      },
    );
    return extractResponseData(result);
  }
}
