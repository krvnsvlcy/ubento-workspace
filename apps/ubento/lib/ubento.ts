import { UbentoSDK } from "@ubento/services.sdk";

export const ubento = new UbentoSDK({
  baseUrl: "/api/ubento",
  tokenManager: {
    getToken: async () => "",
  },
});
