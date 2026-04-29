import { ResourceType } from "@/engine/copilot/agent/resource.js";
import { UbentoSDK } from "@ubento/sdk";

export interface FileResourceData {
  path: string;
}

export const fileResource = {
  type: "file",
  data: (data: FileResourceData) => data,
  create: (ubentoApi: UbentoSDK): ResourceType<FileResourceData> => {
    return {
      type: "file",
      getMessageItem: async (data) => {
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
