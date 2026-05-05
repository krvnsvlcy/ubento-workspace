import { ServiceManifest } from "@ubento/bento.service";

export const wiseServiceManifest: ServiceManifest = {
  name: "@ubento/wise-service",
  version: "1.0.0",
  schemas: {
    profile: {
      type: "object",
      properties: {
        id: { type: "number" },
        type: { type: "string" },
        details: { type: "object" },
      },
      required: ["id"],
    },
    account: {
      type: "object",
      properties: {
        id: { type: "number" },
        profileId: { type: "number" },
        currency: { type: "string" },
        accountHolderName: { type: "string" },
      },
      required: ["id"],
    },
  },
  entities: {
    profile: {
      name: "Profile",
      primaryKey: "id",
      schema: {
        type: "ref",
        ref: "profile",
      },
    },
    account: {
      name: "Account",
      primaryKey: "id",
      schema: {
        type: "ref",
        ref: "account",
      },
    },
  },
  queries: {},
  actions: {},
};

export default wiseServiceManifest;
