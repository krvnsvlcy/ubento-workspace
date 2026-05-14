import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "wise",
  type: "http",
  connection: {
    provider: "wise",
    baseUrl: "https://api.wise.com",
  },
  schemas: {
    "profile": {
      "type": "object",
      "properties": {
        "id": {
          "type": "number"
        },
        "type": {
          "type": "string"
        },
        "details": {
          "type": "object"
        }
      },
      "required": [
        "id"
      ]
    },
    "account": {
      "type": "object",
      "properties": {
        "id": {
          "type": "number"
        },
        "profileId": {
          "type": "number"
        },
        "currency": {
          "type": "string"
        },
        "accountHolderName": {
          "type": "string"
        }
      },
      "required": [
        "id"
      ]
    }
  },

  queries: {},
  actions: {}
};

export default spec;
