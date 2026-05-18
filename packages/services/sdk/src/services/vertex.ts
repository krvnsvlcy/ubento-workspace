import {
  Connection,
  ConnectionProvider,
  createVertexServiceClient,
  OAuthClient,
  Service,
  ServiceChannel,
} from "~/clients/vertex/client.js";
import { extractResponseData } from "~/lib/client.js";
import { TokenManager } from "~/lib/token_manager.js";

export class VertexService {
  private vertexClient: ReturnType<typeof createVertexServiceClient>;

  constructor({
    baseUrl,
    tokenManager,
  }: {
    baseUrl?: string;
    tokenManager: TokenManager;
  }) {
    this.vertexClient = createVertexServiceClient({
      baseUrl,
      tokenManager,
      headers: {
        "x-ubento-service": "vertex",
      },
    });
  }

  // ===== Connection Providers =====

  async listConnectionProviders(
    options: {
      team_id?: string;
      name?: string;
      limit?: number;
      cursor?: string;
    } = {},
  ) {
    const result = await this.vertexClient.get("/vertex/connection-providers", {
      params: { query: options },
    });
    return extractResponseData(result, true);
  }

  async getProviderByCode(code: string): Promise<ConnectionProvider> {
    const result = await this.vertexClient.get(
      "/vertex/connection-providers/by-code/{code}",
      {
        params: { path: { code } },
      },
    );
    return extractResponseData(result, true);
  }

  async createConnectionProvider(data: {
    code: string;
    type: string;
    name: string;
    description?: string;
    config?: Record<string, any>;
  }): Promise<ConnectionProvider> {
    const result = await this.vertexClient.post(
      "/vertex/connection-providers",
      {
        body: data as any,
      },
    );
    return extractResponseData(result, true);
  }

  async updateConnectionProvider(
    providerId: string,
    data: {
      code?: string;
      type?: string;
      name?: string;
      description?: string;
      config?: Record<string, any>;
    },
  ): Promise<ConnectionProvider> {
    const result = await this.vertexClient.patch(
      "/vertex/connection-providers/{provider_id}",
      {
        params: { path: { provider_id: providerId } },
        body: data as any,
      },
    );
    return extractResponseData(result, true);
  }

  async getConnectionProvider(providerId: string): Promise<ConnectionProvider> {
    const result = await this.vertexClient.get(
      "/vertex/connection-providers/{provider_id}",
      {
        params: { path: { provider_id: providerId } },
      },
    );
    return extractResponseData(result, true);
  }

  // ===== Connections =====

  async listConnections(
    options: {
      team_id?: string;
      limit?: number;
      cursor?: string;
      provider?: string;
    } = {},
  ) {
    const result = await this.vertexClient.get("/vertex/connections", {
      params: { query: options },
    });
    return extractResponseData(result, true);
  }

  async getConnection(connectionId: string): Promise<Connection> {
    const result = await this.vertexClient.get(
      "/vertex/connections/{connection_id}",
      {
        params: { path: { connection_id: connectionId } },
      },
    );
    return extractResponseData(result, true);
  }

  async getTeamConnection(
    teamId: string,
    provider: string,
  ): Promise<Connection | undefined> {
    const result = await this.vertexClient.get(
      "/vertex/connections/team/{team_id}/{provider_name}",
      {
        params: { path: { team_id: teamId, provider_name: provider } },
      },
    );
    return extractResponseData(result, false);
  }

  async createConnection(data: {
    team_id: string;
    provider_id: string;
    auth?: Record<string, any>;
  }): Promise<Connection> {
    const result = await this.vertexClient.post("/vertex/connections", {
      body: data as any,
    });
    return extractResponseData(result, true);
  }

  async deleteConnection(connectionId: string) {
    const result = await this.vertexClient.delete(
      "/vertex/connections/{connection_id}",
      {
        params: { path: { connection_id: connectionId } },
      },
    );
    return extractResponseData(result, true);
  }

  async updateConnectionAuth(
    connectionId: string,
    credentials: any,
  ): Promise<Connection> {
    const result = await this.vertexClient.post(
      "/vertex/connections/{connection_id}/auth",
      {
        params: { path: { connection_id: connectionId } },
        body: credentials,
      },
    );
    return extractResponseData(result, true);
  }

  // ===== OAuth Clients =====

  async listOAuthClients(
    options: {
      team_id?: string;
      provider_id?: string;
      limit?: number;
      cursor?: string;
    } = {},
  ) {
    const result = await this.vertexClient.get("/vertex/oauth-clients", {
      params: { query: options },
    });
    return extractResponseData(result, true);
  }

  async getOAuthClient(oauthClientId: string): Promise<OAuthClient> {
    const result = await this.vertexClient.get(
      "/vertex/oauth-clients/{oauth_client_id}",
      {
        params: { path: { oauth_client_id: oauthClientId } },
      },
    );
    return extractResponseData(result, true);
  }

  async getDefaultOAuthClient(providerId: string): Promise<OAuthClient> {
    const result = await this.vertexClient.get(
      "/vertex/oauth-clients/default/{provider_id}" as any,
      {
        params: { path: { provider_id: providerId } } as any,
      },
    );
    return extractResponseData(result, true);
  }

  async createOAuthClient(data: {
    team_id: string;
    provider_id: string;
    name: string;
    credentials: {
      clientId: string;
      clientSecret: string;
    };
  }): Promise<OAuthClient> {
    const result = await this.vertexClient.post("/vertex/oauth-clients", {
      body: data as any,
    });
    return extractResponseData(result, true);
  }

  async updateOAuthClient(
    oauthClientId: string,
    data: {
      name?: string;
      credentials?: {
        clientId?: string;
        clientSecret?: string;
      };
    },
  ): Promise<OAuthClient> {
    const result = await this.vertexClient.patch(
      "/vertex/oauth-clients/{oauth_client_id}",
      {
        params: { path: { oauth_client_id: oauthClientId } },
        body: data as any,
      },
    );
    return extractResponseData(result, true);
  }

  async deleteOAuthClient(oauthClientId: string) {
    const result = await this.vertexClient.delete(
      "/vertex/oauth-clients/{oauth_client_id}",
      {
        params: { path: { oauth_client_id: oauthClientId } },
      },
    );
    return extractResponseData(result, true);
  }

  // ===== Services =====

  async listServices(
    options: {
      team_id?: string;
      scope?: string;
      name?: string;
      limit?: number;
      cursor?: string;
    } = {},
  ) {
    const result = await this.vertexClient.get("/vertex/services", {
      params: { query: options },
    });
    return extractResponseData(result, true);
  }

  async getService(serviceId: string): Promise<Service> {
    const result = await this.vertexClient.get(
      "/vertex/services/{service_id}",
      {
        params: { path: { service_id: serviceId } },
      },
    );
    return extractResponseData(result, true);
  }

  async createService(data: {
    team_id: string;
    scope: string;
    name: string;
    display_name: string;
    description?: string;
    config?: Record<string, any>;
  }): Promise<Service> {
    const result = await this.vertexClient.post("/vertex/services", {
      body: data as any,
    });
    return extractResponseData(result, true);
  }

  async updateService(
    serviceId: string,
    data: {
      name?: string;
      display_name?: string;
      description?: string;
    },
  ): Promise<Service> {
    const result = await this.vertexClient.patch(
      "/vertex/services/{service_id}",
      {
        params: { path: { service_id: serviceId } },
        body: data as any,
      },
    );
    return extractResponseData(result, true);
  }

  async deleteService(serviceId: string) {
    const result = await this.vertexClient.delete(
      "/vertex/services/{service_id}",
      {
        params: { path: { service_id: serviceId } },
      },
    );
    return extractResponseData(result, true);
  }

  // ===== Service Channels =====

  async listServiceChannels(
    serviceId: string,
    options: {
      limit?: number;
      cursor?: string;
    } = {},
  ) {
    const result = await this.vertexClient.get(
      "/vertex/services/{service_id}/channels",
      {
        params: {
          path: { service_id: serviceId },
          query: options,
        },
      },
    );
    return extractResponseData(result, true);
  }

  async getServiceChannel(serviceChannelId: string): Promise<ServiceChannel> {
    const result = await this.vertexClient.get(
      "/vertex/service-channels/{service_channel_id}",
      {
        params: { path: { service_channel_id: serviceChannelId } },
      },
    );
    return extractResponseData(result, true);
  }

  async createServiceChannel(
    serviceId: string,
    data: {
      team_id: string;
      name: string;
    },
  ): Promise<ServiceChannel> {
    const result = await this.vertexClient.post(
      "/vertex/services/{service_id}/channels",
      {
        params: { path: { service_id: serviceId } },
        body: data as any,
      },
    );
    return extractResponseData(result, true);
  }

  async updateServiceChannel(
    serviceChannelId: string,
    data: {
      name?: string;
    },
  ): Promise<ServiceChannel> {
    const result = await this.vertexClient.patch(
      "/vertex/service-channels/{service_channel_id}",
      {
        params: { path: { service_channel_id: serviceChannelId } },
        body: data as any,
      },
    );
    return extractResponseData(result, true);
  }

  async deleteServiceChannel(serviceChannelId: string) {
    const result = await this.vertexClient.delete(
      "/vertex/service-channels/{service_channel_id}",
      {
        params: { path: { service_channel_id: serviceChannelId } },
      },
    );
    return extractResponseData(result, true);
  }

  async getServiceChannelSpec(serviceChannelId: string) {
    const result = await this.vertexClient.get(
      "/vertex/service-channels/{service_channel_id}/spec",
      {
        params: { path: { service_channel_id: serviceChannelId } },
      },
    );
    return extractResponseData(result, true);
  }

  async uploadServiceChannelSpec(
    serviceChannelId: string,
    spec: Record<string, any>,
  ) {
    const result = await this.vertexClient.post(
      "/vertex/service-channels/{service_channel_id}/spec",
      {
        params: { path: { service_channel_id: serviceChannelId } },
        body: spec as any,
      },
    );
    return extractResponseData(result, true);
  }

  async runQuery({
    teamId,
    serviceChannelId,
    query,
    args = {},
  }: {
    teamId: string;
    serviceChannelId: string;
    query: string;
    args?: Record<string, any>;
  }) {
    const result = await this.vertexClient.post("/vertex/{team_id}/query", {
      params: {
        path: { team_id: teamId },
      },
      body: {
        service_channel_id: serviceChannelId,
        query,
        args: args as any,
      },
    });
    return extractResponseData(result, true);
  }
  async runAction({
    teamId,
    serviceChannelId,
    action,
    args = {},
  }: {
    teamId: string;
    serviceChannelId: string;
    action: string;
    args?: Record<string, any>;
  }) {
    const result = await this.vertexClient.post("/vertex/{team_id}/action", {
      params: {
        path: { team_id: teamId },
      },
      body: {
        service_channel_id: serviceChannelId,
        action,
        args: args as any,
      },
    });
    return extractResponseData(result, true);
  }
}
