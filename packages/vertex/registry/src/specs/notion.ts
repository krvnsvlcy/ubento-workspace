import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  "spec": 1,
  "name": "notion",
  "connections": {},
  "schemas": {
    "page": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "url": {
          "type": "string"
        }
      },
      "required": [
        "id"
      ]
    },
    "database": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "title": {
          "type": "string"
        }
      },
      "required": [
        "id"
      ]
    }
  },
  "entities": {
    "page": {
      "name": "Page",
      "primaryKey": "id",
      "schema": {
        "type": "ref",
        "ref": "page"
      }
    },
    "database": {
      "name": "Database",
      "primaryKey": "id",
      "schema": {
        "type": "ref",
        "ref": "database"
      }
    }
  },
  "queries": {},
  "actions": {}
};

export default spec;
