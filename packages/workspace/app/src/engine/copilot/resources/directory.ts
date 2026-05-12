import { UbentoSDK } from "@ubento/services.sdk";
import { ResourceType } from "@ubento/workspace.agent";

export interface DirectoryResourceData {
  path: string;
}

export const directoryResource = {
  type: "directory",
  data: (data: DirectoryResourceData) => data,
  create: (ubentoApi: UbentoSDK): ResourceType<DirectoryResourceData> => {
    return {
      type: "directory",
      resolveData: async (data) => {
        // Shim for directory reading via SDK
        return {
          type: "data",
          label: `Directory: ${data.path}`,
          data: [], // Should fetch from SDK
        };
      },
    };
  },
};
