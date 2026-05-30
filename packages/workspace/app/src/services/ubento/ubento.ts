import { QueryClient } from "@tanstack/react-query";
import { UbentoSDK } from "@ubento/services.sdk";
import { Logger } from "@ubento/telemetry";
import { createUbentoBillingService } from "./services/billing";
import { createUbentoIamService } from "./services/iam";
import { createUbentoIntelligenceService } from "./services/intelligence";
import { createUbentoModuleService } from "./services/module";
import { createUbentoSettingsService } from "./services/settings";
import { createUbentoVertexService } from "./services/vertex";
import { createUbentoWorkspaceService } from "./services/workspace";

export function createUbentoService({
  ubentoSdk,
  logger,
  queryClient,
}: {
  ubentoSdk: UbentoSDK;
  logger: Logger;
  queryClient: QueryClient;
}) {
  return {
    logger,
    sdk: ubentoSdk,
    iam: createUbentoIamService({ ubentoSdk }),
    module: createUbentoModuleService({ ubentoSdk }),
    workspace: createUbentoWorkspaceService({ ubentoSdk }),
    intelligence: createUbentoIntelligenceService({ ubentoSdk }),
    billing: createUbentoBillingService({ ubentoSdk }),
    vertex: createUbentoVertexService({ ubentoSdk }),
    settings: createUbentoSettingsService({ ubentoSdk, queryClient }),
  };
}

export type UbentoService = ReturnType<typeof createUbentoService>;
