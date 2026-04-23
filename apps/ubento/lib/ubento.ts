import { UbentoSDK } from "@ubento/sdk";

export const ubento = new UbentoSDK({
  baseUrl: "/api/ubento",
  tokenManager: {
    getToken: async () => "",
  },
});
