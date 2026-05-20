import {
  createClientCredentialsTokenManager,
  UbentoSDK,
} from "@ubento/services.sdk";
import { env } from "../env.js";

export const ubento = new UbentoSDK({
  tokenManager: createClientCredentialsTokenManager({
    issuerUrl: env.UBENTO_AUTH_SERVER_URL,
    clientId: env.UBENTO_SERVICES_CLIENT_ID,
    clientSecret: env.UBENTO_SERVICES_CLIENT_SECRET,
    audience: env.UBENTO_API_AUDIENCE,
  }),
});
