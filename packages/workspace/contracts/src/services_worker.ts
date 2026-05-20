export type ModuleRef = {
  id: string;
  versionId: string;
};

export type ServiceConfig = {
  module: ModuleRef;
  args: Record<string, unknown>;
};

export type ServiceStatus = "idle" | "starting" | "ready" | "error";

export type ServicesWorkerHostInterface = {
  onServiceStatusChanged: (input: {
    serviceName: string;
    status: ServiceStatus;
    details?: Record<string, unknown>;
  }) => void;
};
export type ServicesWorkerRuntimeInterface = {
  init: (input: {
    apiProxyUrl: string;
    invocationProxyUrl: string;
  }) => Promise<void>;
  syncServices: (input: { services: Record<string, ServiceConfig> }) => void;
  getServiceStatus: (input: { serviceName: string }) => {
    status: ServiceStatus;
    details?: Record<string, unknown>;
  };
  invokeService: (input: {
    serviceName: string;
    method: string;
    args: Record<string, unknown>;
  }) => Promise<unknown>;
};
