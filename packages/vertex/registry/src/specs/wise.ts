import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  "spec": 1,
  "name": "wise",
  "connections": {},
  "schemas": {
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
  "entities": {
    "profile": {
      "name": "Profile",
      "primaryKey": "id",
      "schema": {
        "type": "ref",
        "ref": "profile"
      }
    },
    "account": {
      "name": "Account",
      "primaryKey": "id",
      "schema": {
        "type": "ref",
        "ref": "account"
      }
    }
  },
  "queries": {},
  "actions": {}
};

export default spec;
