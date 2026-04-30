import {
  createIntegrationServiceClient,
  ConnectionProvider,
  Connection,
} from "~/clients/integration/client.js";
import { extractResponseData } from "~/lib/client.js";
import { TokenManager } from "~/lib/token_manager.js";

export class IntegrationService {
  private integrationClient: ReturnType<typeof createIntegrationServiceClient>;

  constructor({
    baseUrl,
    tokenManager,
  }: {
    baseUrl?: string;
    tokenManager: TokenManager;
  }) {
    this.integrationClient = createIntegrationServiceClient({
      baseUrl,
      tokenManager,
      headers: {
        "x-ubento-service": "integration",
      },
    });
  }

  // ===== Connection Providers =====

  async listConnectionProviders(options: {
    organization_id?: string;
    name?: string;
    limit?: number;
    cursor?: string;
  } = {}) {
    const result = await this.integrationClient.get("/integration/connection-providers", {
      params: { query: options },
    });
    return extractResponseData(result, true);
  }

  async getConnectionProvider(
    providerId: string,
  ): Promise<ConnectionProvider> {
    const result = await this.integrationClient.get(
      "/integration/connection-providers/{provider_id}",
      {
        params: { path: { provider_id: providerId } },
      },
    );
    return extractResponseData(result, true);
  }

  // ===== Connections =====

  async listConnections(options: {
    organization_id?: string;
    limit?: number;
    cursor?: string;
  } = {}) {
    const result = await this.integrationClient.get("/integration/connections", {
      params: { query: options },
    });
    return extractResponseData(result, true);
  }

  async getConnection(connectionId: string): Promise<Connection> {
    const result = await this.integrationClient.get(
      "/integration/connections/{connection_id}",
      {
        params: { path: { connection_id: connectionId } },
      },
    );
    return extractResponseData(result, true);
  }

  async createConnection(data: {
    organization_id: string;
    provider_id: string;
    auth?: Record<string, any>;
  }): Promise<Connection> {
    const result = await this.integrationClient.post(
      "/integration/connections",
      {
        body: {
          ...data,
          auth: data.auth as any,
        },
      },
    );
    return extractResponseData(result, true);
  }

  async deleteConnection(connectionId: string) {
    const result = await this.integrationClient.delete("/integration/connections/{connection_id}", {
      params: { path: { connection_id: connectionId } },
    });
    return extractResponseData(result, true);
  }
}
