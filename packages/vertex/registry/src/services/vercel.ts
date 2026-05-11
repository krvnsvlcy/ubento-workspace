import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "vercel",
  type: "http",
  connection: {
    provider: "vercel",
    baseUrl: "https://api.vercel.com",
  },
  schemas: {
    "deployment": {
      "type": "object",
      "properties": {
        "uid": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "url": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "created": {
          "type": "number"
        }
      },
      "required": [
        "uid",
        "name",
        "url",
        "state"
      ]
    },
    "project": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "framework": {
          "type": "string"
        },
        "updatedAt": {
          "type": "number"
        }
      },
      "required": [
        "id",
        "name"
      ]
    }
  },
  entities: {
    "deployment": {
      "name": "Deployment",
      "primaryKey": "uid",
      "schema": {
        "type": "ref",
        "ref": "deployment"
      }
    },
    "project": {
      "name": "Project",
      "primaryKey": "id",
      "schema": {
        "type": "ref",
        "ref": "project"
      }
    }
  },
  queries: {},
  actions: {}
};

export default spec;
