import {
  createSettingsServiceClient,
  Setting,
} from "~/clients/settings/client.js";
import { extractResponseData } from "~/lib/client.js";
import { TokenManager } from "~/lib/token_manager.js";

export class SettingsService {
  settingsClient: ReturnType<typeof createSettingsServiceClient>;

  constructor({
    baseUrl,
    tokenManager,
  }: {
    baseUrl?: string;
    tokenManager: TokenManager;
  }) {
    this.settingsClient = createSettingsServiceClient({
      baseUrl,
      tokenManager,
      headers: {
        "x-ubento-service": "settings",
      },
    });
  }

  async getSetting(id: string): Promise<Setting> {
    const result = await this.settingsClient.get("/settings/{id}", {
      params: { path: { id } },
    });
    return extractResponseData(result, true);
  }

  async getSettingByKey(key: string): Promise<Setting> {
    const result = await this.settingsClient.get("/settings/key/{key}", {
      params: { path: { key: encodeURIComponent(key) } },
    });
    return extractResponseData(result, true);
  }

  async listSettings(
    options: {
      scopes?: string[];
      limit?: number;
      cursor?: string;
    } = {},
  ) {
    const result = await this.settingsClient.get("/settings", {
      params: { query: options },
    });
    return extractResponseData(result, true);
  }

  async upsertSetting(data: {
    key: string;
    scopes: string[];
    data: any;
  }): Promise<Setting> {
    const result = await this.settingsClient.post("/settings", {
      body: data,
    });
    return extractResponseData(result, true);
  }

  async updateSetting(
    id: string,
    data: {
      scopes?: string[];
      data?: any;
    },
  ): Promise<Setting> {
    const result = await this.settingsClient.patch("/settings/{id}", {
      params: { path: { id } },
      body: data,
    });
    return extractResponseData(result, true);
  }

  async deleteSetting(id: string): Promise<{ success: boolean }> {
    const result = await this.settingsClient.delete("/settings/{id}", {
      params: { path: { id } },
    });
    return extractResponseData(result, true);
  }
}
