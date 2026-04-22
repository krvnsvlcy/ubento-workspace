import { createClientFactory } from "~/lib/client.js";
import { components, paths } from "./types.js";

export const createDeploymentServiceClient = createClientFactory<paths>();
export type Deployment = components["schemas"]["Deployment"];