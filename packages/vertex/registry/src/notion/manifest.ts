import { ServiceManifest } from "@ubento/bento.service";

export const notionServiceManifest: ServiceManifest = {
  name: "@ubento/notion-service",
  version: "1.0.0",
  schemas: {
    page: {
      type: "object",
      properties: {
        id: { type: "string" },
        title: { type: "string" },
        url: { type: "string" },
      },
      required: ["id"],
    },
    database: {
      type: "object",
      properties: {
        id: { type: "string" },
        title: { type: "string" },
      },
      required: ["id"],
    },
  },
  entities: {
    page: {
      name: "Page",
      primaryKey: "id",
      schema: { type: "ref", ref: "page" },
    },
    database: {
      name: "Database",
      primaryKey: "id",
      schema: { type: "ref", ref: "database" },
    },
  },
  queries: {},
  actions: {},
};

export default notionServiceManifest;
