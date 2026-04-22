import type {
  CreateDriveRequest,
  CreateFileRequest,
  UpdateDriveRequest,
  UpdateFileRequest,
} from "~/clients/drive/client.js";
import { createDriveServiceClient } from "~/clients/drive/client.js";
import { extractResponseData } from "~/lib/client.js";
import { TokenManager } from "~/lib/token_manager.js";

export class DriveService {
  private driveClient: ReturnType<typeof createDriveServiceClient>;

  constructor({
    baseUrl,
    tokenManager,
  }: {
    baseUrl?: string;
    tokenManager: TokenManager;
  }) {
    this.driveClient = createDriveServiceClient({
      baseUrl,
      tokenManager,
    });
  }

  async listDrives(organizationId?: string) {
    const result = await this.driveClient.get("/drives", {
      params: {
        query: organizationId ? { organization_id: organizationId } : undefined,
      },
    });
    return extractResponseData(result, true);
  }

  async createDrive(data: CreateDriveRequest) {
    const result = await this.driveClient.post("/drives", {
      body: data,
    });
    return extractResponseData(result, true);
  }

  async getDrive(driveId: string) {
    const result = await this.driveClient.get("/drives/{drive_id}", {
      params: {
        path: { drive_id: driveId },
      },
    });
    return extractResponseData(result);
  }

  async updateDrive(driveId: string, data: UpdateDriveRequest) {
    const result = await this.driveClient.patch("/drives/{drive_id}", {
      params: {
        path: { drive_id: driveId },
      },
      body: data,
    });
    return extractResponseData(result, true);
  }

  async deleteDrive(driveId: string) {
    const result = await this.driveClient.delete("/drives/{drive_id}", {
      params: {
        path: { drive_id: driveId },
      },
    });
    return extractResponseData(result, true);
  }

  async getDriveByOrg(organizationId: string) {
    const result = await this.driveClient.get("/drives/org/{organization_id}", {
      params: {
        path: { organization_id: organizationId },
      },
    });
    return extractResponseData(result);
  }

  async listDriveFiles(
    driveId: string,
    options?: {
      path?: string;
      exclude_types?: string;
      limit?: number;
      offset?: number;
      cursor?: string;
      direction?: "forward" | "backward";
    },
  ) {
    const result = await this.driveClient.get("/drives/{drive_id}/files", {
      params: {
        path: { drive_id: driveId },
        query: options,
      },
    });
    return extractResponseData(result, true);
  }

  async getDriveFileByPath(driveId: string, filePath: string) {
    const result = await this.driveClient.get("/drives/{drive_id}/file", {
      params: {
        path: { drive_id: driveId },
        query: { path: filePath },
      },
    });
    return extractResponseData(result);
  }

  async listFilesByIds(fileIds: string[]) {
    const result = await this.driveClient.get("/drive-files", {
      params: {
        query: { file_ids: fileIds },
      },
    });
    return extractResponseData(result, true);
  }

  async createDriveFile(data: CreateFileRequest) {
    const result = await this.driveClient.post("/drive-files", {
      body: data,
    });
    return extractResponseData(result, true);
  }

  async getDriveFile(fileId: string) {
    const result = await this.driveClient.get("/drive-files/{file_id}", {
      params: {
        path: { file_id: fileId },
      },
    });
    return extractResponseData(result);
  }

  async updateDriveFile(fileId: string, data: UpdateFileRequest) {
    const result = await this.driveClient.patch("/drive-files/{file_id}", {
      params: {
        path: { file_id: fileId },
      },
      body: data,
    });
    return extractResponseData(result, true);
  }

  async deleteDriveFile(fileId: string) {
    const result = await this.driveClient.delete("/drive-files/{file_id}", {
      params: {
        path: { file_id: fileId },
      },
    });
    return extractResponseData(result, true);
  }

  async getDriveFileSignedUrl(fileId: string, action: "read" | "write") {
    const result = await this.driveClient.get(
      "/drive-files/{file_id}/signed-url",
      {
        params: {
          path: { file_id: fileId },
          query: { action },
        },
      },
    );
    return extractResponseData(result);
  }
}
