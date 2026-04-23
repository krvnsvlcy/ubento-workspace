import { UbentoSDK } from "@ubento/sdk";

export const ubento = new UbentoSDK({
  tokenManager: {
    getToken: async () => "",
  },
});
