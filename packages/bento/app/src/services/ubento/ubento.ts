import { UbentoSDK } from "@ubento/sdk";
import { createUbentoBillingService } from "./services/billing";
import { createUbentoIamService } from "./services/iam";
import { createUbentoIntegrationService } from "./services/integration";
import { createUbentoIntelligenceService } from "./services/intelligence";
import { createUbentoModuleService } from "./services/module";
import { createUbentoWorkspaceService } from "./services/workspace";

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

export type UbentoService = ReturnType<typeof createUbentoService>;
