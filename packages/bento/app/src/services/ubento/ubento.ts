import { useBentoHost } from "@/contexts/host";
import { UbentoSDK } from "@ubento/sdk";
import { createUbentoIamService } from "./iam";
import { createUbentoModuleService } from "./module";
import { createUbentoWorkspaceService } from "./workspace";

export function useUbento() {
  const host = useBentoHost();
  return createUbentoService({ ubentoSdk: host.ubentoApi });
}

export function createUbentoService({ ubentoSdk }: { ubentoSdk: UbentoSDK }) {
  return {
    iam: createUbentoIamService({ ubentoSdk }),
    module: createUbentoModuleService({ ubentoSdk }),
    workspace: createUbentoWorkspaceService({ ubentoSdk }),
  };
}
