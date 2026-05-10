import { ServiceManifest } from "@ubento/bento.service";

export const resendServiceManifest: ServiceManifest = {
  name: "@ubento/resend-service",
  version: "1.0.0",
  schemas: {
    email: {
      type: "object",
      properties: {
        id: { type: "string" },
        from: { type: "string" },
        to: { type: "array", items: { type: "string" } },
        subject: { type: "string" },
        created_at: { type: "string" },
      },
      required: ["id", "from", "to", "subject"],
    },
  },
  entities: {
    email: {
      name: "Email",
      primaryKey: "id",
      schema: { type: "ref", ref: "email" },
    },
  },
  queries: {},
  actions: {
    sendEmail: {
      name: "Send Email",
      parameters: {
        from: { schema: { type: "string" }, required: true },
        to: { schema: { type: "array", items: { type: "string" } }, required: true },
        subject: { schema: { type: "string" }, required: true },
        text: { schema: { type: "string" } },
        html: { schema: { type: "string" } },
      },
    },
  },
};

export default resendServiceManifest;
