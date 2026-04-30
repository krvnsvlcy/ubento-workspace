import { useBentoHost } from "@/contexts/host";
import { UbentoSDK } from "@ubento/sdk";
import { createUbentoBillingService } from "./services/billing";
import { createUbentoIamService } from "./services/iam";
import { createUbentoIntegrationService } from "./services/integration";
import { createUbentoIntelligenceService } from "./services/intelligence";
import { createUbentoModuleService } from "./services/module";
import { createUbentoWorkspaceService } from "./services/workspace";

export function useUbento() {
  const host = useBentoHost();
  return createUbentoService({ ubentoSdk: host.ubentoApi });
}

export function createUbentoService({ ubentoSdk }: { ubentoSdk: UbentoSDK }) {
  return {
    iam: createUbentoIamService({ ubentoSdk }),
    module: createUbentoModuleService({ ubentoSdk }),
    workspace: createUbentoWorkspaceService({ ubentoSdk }),
    intelligence: createUbentoIntelligenceService({ ubentoSdk }),
    billing: createUbentoBillingService({ ubentoSdk }),
    integration: createUbentoIntegrationService({ ubentoSdk }),
  };
}

