import { createConfigurationServiceClient } from "~/clients/configuration/client.js";
import { extractResponseData } from "~/lib/client.js";
import { TokenManager } from "~/lib/token_manager.js";

export class ConfigurationService {
  private configurationClient: ReturnType<
    typeof createConfigurationServiceClient
  >;

  constructor({
    baseUrl,
    tokenManager,
  }: {
    baseUrl?: string;
    tokenManager: TokenManager;
  }) {
    this.configurationClient = createConfigurationServiceClient({
      baseUrl,
      tokenManager,
    });
  }

  // by id
  async getConfigurationById(id: string) {
    const result = await this.configurationClient.get(
      "/configurations/id/{id}",
      {
        params: {
          path: { id },
        },
      }
    );
    return extractResponseData(result);
  }
  async deleteConfigurationById(id: string) {
    const result = await this.configurationClient.delete(
      "/configurations/id/{id}",
      {
        params: {
          path: { id },
        },
      }
    );
    return extractResponseData(result);
  }
  async setConfigurationDataById(id: string, data: any) {
    const result = await this.configurationClient.put(
      "/configurations/id/{id}/data",
      {
        params: {
          path: { id },
        },
        body: data,
      }
    );
    return extractResponseData(result, true);
  }

  // by owner and key
  async getConfiguration(owner: string, key: string) {
    const result = await this.configurationClient.get(
      "/configurations/{owner}/{key}",
      {
        params: {
          path: { owner, key },
        },
      }
    );
    return extractResponseData(result);
  }
  async setConfigurationData(owner: string, key: string, value: any) {
    const result = await this.configurationClient.put(
      "/configurations/{owner}/{key}/data",
      {
        params: {
          path: { owner, key },
        },
        body: value,
      }
    );
    return extractResponseData(result, true);
  }
  async deleteConfiguration(owner: string, key: string) {
    const result = await this.configurationClient.delete(
      "/configurations/{owner}/{key}",
      {
        params: {
          path: { owner, key },
        },
      }
    );
    return extractResponseData(result, true);
  }
}
