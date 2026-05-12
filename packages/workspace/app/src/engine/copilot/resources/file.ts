import { UbentoSDK } from "@ubento/services.sdk";
import { ResourceType } from "@ubento/workspace.agent";

export interface FileResourceData {
  path: string;
}

export const fileResource = {
  type: "file",
  data: (data: FileResourceData) => data,
  create: (ubentoApi: UbentoSDK): ResourceType<FileResourceData> => {
    return {
      type: "file",
      resolveData: async (data) => {
        // Shim for file reading via SDK
        return {
          type: "data",
          label: `File: ${data.path}`,
          data: {
            content: "", // Should fetch from SDK
          },
        };
      },
    };
  },
};
