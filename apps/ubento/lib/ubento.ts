import { UbentoSDK } from "@ubento/services.sdk";

export const ubentoApi = new UbentoSDK({
  baseUrl: "/proxy/ubento",
  tokenManager: {
    getToken: async () => "",
  },
});
