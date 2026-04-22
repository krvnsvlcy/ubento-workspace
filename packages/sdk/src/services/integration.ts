import { createIntegrationServiceClient } from "~/clients/integration/client.js";
import { extractResponseData } from "~/lib/client.js";
import { extractCursorPage } from "~/lib/pagination.js";
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
    });
  }

  async listConnectionProviders(query?: {
    organization_id?: string;
    name?: string;
    cursor?: string;
    limit?: number;
  }) {
    const result = await this.integrationClient.get(
      "/integration/connection-providers",
      {
        params: { query },
      },
    );
    return extractCursorPage(result.response, {
      items: result.data,
      fetcher: this.integrationClient.fetch,
    });
  }

  async createConnectionProvider(data: {
    organization_id: string;
    name: string;
    display_name: string;
    description?: string;
    config?: unknown;
  }) {
    const result = await this.integrationClient.post(
      "/integration/connection-providers",
      {
        body: data as any,
      },
    );
    return extractResponseData(result);
  }

  async getConnectionProvider(providerId: string) {
    const result = await this.integrationClient.get(
      "/integration/connection-providers/{provider_id}",
      {
        params: {
          path: { provider_id: providerId },
        },
      },
    );
    return extractResponseData(result);
  }

  async updateConnectionProvider(
    providerId: string,
    data: {
      name?: string;
      display_name?: string;
      description?: string;
      config?: unknown;
    },
  ) {
    const result = await this.integrationClient.patch(
      "/integration/connection-providers/{provider_id}",
      {
        params: {
          path: { provider_id: providerId },
        },
        body: data as any,
      },
    );
    return extractResponseData(result);
  }

  async deleteConnectionProvider(providerId: string) {
    const result = await this.integrationClient.delete(
      "/integration/connection-providers/{provider_id}",
      {
        params: {
          path: { provider_id: providerId },
        },
      },
    );
    return extractResponseData(result, true);
  }

  async listConnections(query?: {
    organization_id?: string;
    cursor?: string;
    limit?: number;
  }) {
    const result = await this.integrationClient.get(
      "/integration/connections",
      {
        params: { query },
      },
    );
    return extractCursorPage(result.response, {
      items: result.data,
      fetcher: this.integrationClient.fetch,
    });
  }

  async createConnection(data: {
    organization_id: string;
    provider_id: string;
    auth?: Record<string, unknown>;
  }) {
    const result = await this.integrationClient.post(
      "/integration/connections",
      {
        body: data as any,
      },
    );
    return extractResponseData(result);
  }

  async getConnection(connectionId: string) {
    const result = await this.integrationClient.get(
      "/integration/connections/{connection_id}",
      {
        params: {
          path: { connection_id: connectionId },
        },
      },
    );
    return extractResponseData(result);
  }

  async updateConnectionAuth(connectionId: string, auth: any) {
    const result = await this.integrationClient.post(
      "/integration/connections/{connection_id}/auth",
      {
        params: {
          path: { connection_id: connectionId },
        },
        body: auth,
      },
    );
    return extractResponseData(result);
  }

  async deleteConnection(connectionId: string) {
    const result = await this.integrationClient.delete(
      "/integration/connections/{connection_id}",
      {
        params: {
          path: { connection_id: connectionId },
        },
      },
    );
    return extractResponseData(result, true);
  }

  getConnectUrl(query: {
    provider_id: string;
    organization_id: string;
    state?: string;
  }) {
    const url = new URL(
      "/integration/auth/connect",
      this.integrationClient.baseUrl,
    );
    url.searchParams.set("provider_id", query.provider_id);
    url.searchParams.set("organization_id", query.organization_id);
    if (query.state) {
      url.searchParams.set("state", query.state);
    }
    return url.toString();
  }

  async listExtensions(query?: {
    ids?: string[];
    name?: string;
    cursor?: string;
    limit?: number;
  }) {
    const result = await this.integrationClient.get("/integration/extensions", {
      params: { query },
    });
    return extractCursorPage(result.response, {
      items: result.data,
      fetcher: this.integrationClient.fetch,
    });
  }

  async createExtension(data: {
    organization_id: string;
    name: string;
    description?: string;
  }) {
    const result = await this.integrationClient.post(
      "/integration/extensions",
      {
        body: data as any,
      },
    );
    return extractResponseData(result);
  }

  async getExtension(extensionId: string) {
    const result = await this.integrationClient.get(
      "/integration/extensions/{extension_id}",
      {
        params: { path: { extension_id: extensionId } },
      },
    );
    return extractResponseData(result);
  }

  async updateExtension(
    extensionId: string,
    data: { name?: string; description?: string },
  ) {
    const result = await this.integrationClient.patch(
      "/integration/extensions/{extension_id}",
      {
        params: { path: { extension_id: extensionId } },
        body: data as any,
      },
    );
    return extractResponseData(result);
  }

  async deleteExtension(extensionId: string) {
    const result = await this.integrationClient.delete(
      "/integration/extensions/{extension_id}",
      {
        params: { path: { extension_id: extensionId } },
      },
    );
    return extractResponseData(result, true);
  }

  async listExtensionVersionsForExtension(
    extensionId: string,
    query?: { cursor?: string; limit?: number },
  ) {
    const result = await this.integrationClient.get(
      "/integration/extensions/{extension_id}/versions",
      {
        params: {
          path: { extension_id: extensionId },
          query,
        },
      },
    );
    return extractCursorPage(result.response, {
      items: result.data,
      fetcher: this.integrationClient.fetch,
    });
  }

  async getExtensionVersionBySemver(extensionId: string, semver: string) {
    const result = await this.integrationClient.get(
      "/integration/extensions/{extension_id}/versions/{semver}",
      {
        params: {
          path: { extension_id: extensionId, semver },
        },
      },
    );
    return extractResponseData(result);
  }

  async listExtensionVersions(query?: {
    ids?: string[];
    extension_name?: string;
    semver?: string;
    cursor?: string;
    limit?: number;
  }) {
    const result = await this.integrationClient.get(
      "/integration/extension-versions",
      {
        params: { query },
      },
    );
    return extractCursorPage(result.response, {
      items: result.data,
      fetcher: this.integrationClient.fetch,
    });
  }

  async getExtensionVersion(extensionVersionId: string) {
    const result = await this.integrationClient.get(
      "/integration/extension-versions/{extension_version_id}",
      {
        params: { path: { extension_version_id: extensionVersionId } },
      },
    );
    return extractResponseData(result);
  }

  async deleteExtensionVersion(extensionVersionId: string) {
    const result = await this.integrationClient.delete(
      "/integration/extension-versions/{extension_version_id}",
      {
        params: { path: { extension_version_id: extensionVersionId } },
      },
    );
    return extractResponseData(result, true);
  }

  async readExtensionVersionFile(extensionVersionId: string, fileName: string) {
    const result = await this.integrationClient.get(
      "/integration/extension-versions/{extension_version_id}/file/{fileName}",
      {
        params: {
          path: { extension_version_id: extensionVersionId, fileName },
        },
      },
    );
    // Note: the extractResponseData doesn't parse raw files correctly if it's not JSON,
    // so we return the raw string/blob if we didn't specify the `parseAs: "text"`
    // We'll rely on fetch returning the text.
    return result.data ?? result.error;
  }

  async resolveExtensionVersion(organizationId: string, ref: string) {
    const result = await this.integrationClient.get(
      "/integration/extension-versions/resolve/{organization_id}/{ref}",
      {
        params: { path: { organization_id: organizationId, ref } },
      },
    );
    return extractResponseData(result);
  }

  async deployExtensionVersion(data: {
    organization_id: string;
    manifest: any;
    files: Record<string, string>;
  }) {
    const result = await this.integrationClient.post(
      "/integration/extensions/deploy",
      {
        body: data as any,
      },
    );
    return extractResponseData(result);
  }

  getConnectionProviderAuthorizationUrl({
    providerId,
    organizationId,
  }: {
    providerId: string;
    organizationId: string;
  }) {
    const url = new URL(
      `/integration/oauth/connect`,
      this.integrationClient.baseUrl,
    );
    url.searchParams.set("provider_id", providerId);
    url.searchParams.set("organization_id", organizationId);
    return url.toString();
  }
  getProxyUrl({
    providerId,
    organizationId,
    targetUrl,
  }: {
    providerId: string;
    organizationId: string;
    targetUrl: string;
  }) {
    const _tUrl = new URL(targetUrl);
    let _baseUrl = this.integrationClient.baseUrl;
    if (_baseUrl.endsWith("/")) {
      _baseUrl = _baseUrl.slice(0, -1);
    }

    const proxyPath = `/integration/connection-providers/${providerId}/proxies/${organizationId}${_tUrl.pathname}`;
    const proxyUrl = `${_baseUrl}${proxyPath}${_tUrl.search}`;
    const xTargetUrl = _tUrl.origin;

    return {
      proxyUrl,
      xTargetUrl,
    };
  }
}
