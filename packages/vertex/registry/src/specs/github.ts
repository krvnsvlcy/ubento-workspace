import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  "spec": 1,
  "name": "github",
  "connections": {},
  "schemas": {
    "repository": {
      "type": "object",
      "properties": {
        "id": {
          "type": "number"
        },
        "name": {
          "type": "string"
        },
        "full_name": {
          "type": "string"
        },
        "html_url": {
          "type": "string"
        },
        "description": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "name",
        "full_name"
      ]
    },
    "issue": {
      "type": "object",
      "properties": {
        "id": {
          "type": "number"
        },
        "number": {
          "type": "number"
        },
        "title": {
          "type": "string"
        },
        "body": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "html_url": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "number",
        "title",
        "state"
      ]
    },
    "pull_request": {
      "type": "object",
      "properties": {
        "id": {
          "type": "number"
        },
        "number": {
          "type": "number"
        },
        "title": {
          "type": "string"
        },
        "body": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "html_url": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "number",
        "title",
        "state"
      ]
    }
  },
  "entities": {
    "repository": {
      "name": "Repository",
      "primaryKey": "id",
      "schema": {
        "type": "ref",
        "ref": "repository"
      }
    },
    "issue": {
      "name": "Issue",
      "primaryKey": "id",
      "schema": {
        "type": "ref",
        "ref": "issue"
      }
    },
    "pull_request": {
      "name": "Pull Request",
      "primaryKey": "id",
      "schema": {
        "type": "ref",
        "ref": "pull_request"
      }
    }
  },
  "queries": {},
  "actions": {}
};

export default spec;
