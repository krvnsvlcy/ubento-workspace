import type { ConnectionProviderConfig } from "@ubento/vertex.core";

export const config: ConnectionProviderConfig = {
  type: "http",
  auth: {
    apiKey: {
      location: "header",
      name: "Authorization",
      template: "Bearer {{key}}",
    },
  },
};

export default config;
