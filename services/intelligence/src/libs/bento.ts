import { UbentoSDK } from "@ubento/services.sdk";

export const bento = new UbentoSDK({
  // serviceBaseUrls: { billing: "http://localhost:6124" },
  tokenManager: {
    getToken: async () => {
      return "test";
    },
  },
});
