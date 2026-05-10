import { ServiceManifest } from "@ubento/bento.service";

export const githubServiceManifest: ServiceManifest = {
  name: "@ubento/github-service",
  version: "1.0.0",
  schemas: {
    repository: {
      type: "object",
      properties: {
        id: { type: "number" },
        name: { type: "string" },
        full_name: { type: "string" },
        html_url: { type: "string" },
        description: { type: "string" },
      },
      required: ["id", "name", "full_name"],
    },
    issue: {
      type: "object",
      properties: {
        id: { type: "number" },
        number: { type: "number" },
        title: { type: "string" },
        body: { type: "string" },
        state: { type: "string" },
        html_url: { type: "string" },
      },
      required: ["id", "number", "title", "state"],
    },
    pull_request: {
      type: "object",
      properties: {
        id: { type: "number" },
        number: { type: "number" },
        title: { type: "string" },
        body: { type: "string" },
        state: { type: "string" },
        html_url: { type: "string" },
      },
      required: ["id", "number", "title", "state"],
    },
  },
  entities: {
    repository: {
      name: "Repository",
      primaryKey: "id",
      schema: { type: "ref", ref: "repository" },
    },
    issue: {
      name: "Issue",
      primaryKey: "id",
      schema: { type: "ref", ref: "issue" },
    },
    pull_request: {
      name: "Pull Request",
      primaryKey: "id",
      schema: { type: "ref", ref: "pull_request" },
    },
  },
  queries: {},
  actions: {},
};

export default githubServiceManifest;
