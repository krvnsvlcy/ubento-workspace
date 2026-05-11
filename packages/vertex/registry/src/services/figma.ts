import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "figma",
  type: "http",
  connection: {
    provider: "figma",
    baseUrl: "https://api.figma.com",
  },
  schemas: {
    "file": {
      "type": "object",
      "properties": {
        "key": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "thumbnail_url": {
          "type": "string"
        },
        "last_modified": {
          "type": "string"
        }
      },
      "required": [
        "key",
        "name"
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
        }
      },
      "required": [
        "id",
        "name"
      ]
    }
  },
  entities: {
    "file": {
      "name": "File",
      "primaryKey": "key",
      "schema": {
        "type": "ref",
        "ref": "file"
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
