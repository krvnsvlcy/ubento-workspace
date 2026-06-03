import { z } from "zod";
import { httpServiceSpecV1Schema } from "./protocols/http/service.js";
import { mongodbServiceSpecV1Schema } from "./protocols/mongodb/service.js";

export const serviceSpecV1Schema = z.discriminatedUnion("type", [
  httpServiceSpecV1Schema,
  mongodbServiceSpecV1Schema,
]);
export type ServiceSpecV1_r = z.input<typeof serviceSpecV1Schema>;
export type ServiceSpecV1 = z.output<typeof serviceSpecV1Schema>;

export { HttpServiceSpecV1 } from "./protocols/http/service.js";
export { MongodbServiceSpecV1 } from "./protocols/mongodb/service.js";
