import { ServiceConfig, ServiceStatus } from "@ubento/workspace.contracts";

export let apiProxy = "";
export let invocationProxy = "";

export function setApiProxy(url: string) {
  apiProxy = url;
}

export function setInvocationProxy(url: string) {
  invocationProxy = url;
}

export const activeConfigs = new Map<string, ServiceConfig>();
export const instances = new Map<string, any>();
export const statuses = new Map<
  string,
  { status: ServiceStatus; details?: Record<string, unknown> }
>();
