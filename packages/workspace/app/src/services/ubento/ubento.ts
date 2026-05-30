import { UbentoSDK } from "@ubento/services.sdk";
import { Logger } from "@ubento/telemetry";
import { createUbentoBillingService } from "./services/billing";
import { createUbentoIamService } from "./services/iam";
import { createUbentoVertexService } from "./services/vertex";
import { createUbentoIntelligenceService } from "./services/intelligence";
import { createUbentoModuleService } from "./services/module";
import { createUbentoWorkspaceService } from "./services/workspace";
import { createUbentoSettingsService } from "./services/settings";

export function createUbentoService({ ubentoSdk, logger }: { ubentoSdk: UbentoSDK; logger: Logger }) {
  return {
    logger,
    sdk: ubentoSdk,
    iam: createUbentoIamService({ ubentoSdk }),
    module: createUbentoModuleService({ ubentoSdk }),
    workspace: createUbentoWorkspaceService({ ubentoSdk }),
    intelligence: createUbentoIntelligenceService({ ubentoSdk }),
    billing: createUbentoBillingService({ ubentoSdk }),
    vertex: createUbentoVertexService({ ubentoSdk }),
    settings: createUbentoSettingsService({ ubentoSdk }),
  };
}

export type UbentoService = ReturnType<typeof createUbentoService>;
