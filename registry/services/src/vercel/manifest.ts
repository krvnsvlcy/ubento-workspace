import { ServiceManifest } from "@ubento/bento.service";

export const vercelServiceManifest: ServiceManifest = {
  name: "@ubento/vercel-service",
  version: "1.0.0",
  schemas: {
    deployment: {
      type: "object",
      properties: {
        uid: { type: "string" },
        name: { type: "string" },
        url: { type: "string" },
        state: { type: "string" },
        created: { type: "number" },
      },
      required: ["uid", "name", "url", "state"],
    },
    project: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        framework: { type: "string" },
        updatedAt: { type: "number" },
      },
      required: ["id", "name"],
    },
  },
  entities: {
    deployment: {
      name: "Deployment",
      primaryKey: "uid",
      schema: { type: "ref", ref: "deployment" },
    },
    project: {
      name: "Project",
      primaryKey: "id",
      schema: { type: "ref", ref: "project" },
    },
  },
  queries: {},
  actions: {},
};

export default vercelServiceManifest;
