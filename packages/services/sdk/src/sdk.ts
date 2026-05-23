import { TokenManager } from "./lib/token_manager.js";
import { BillingService } from "./services/billing.js";
import { IamService } from "./services/iam.js";
import { IntelligenceService } from "./services/intelligence.js";
import { ModuleService } from "./services/module.js";
import { VertexService } from "./services/vertex.js";
import { WorkspaceService } from "./services/workspace.js";

export interface UbentoSDKOptions {
  /** Global baseUrl fallback for all services */
  baseUrl?: string;
  /** Optional map to override baseUrl per service */
  serviceBaseUrls?: Partial<Record<ServiceKey, string>>;
  tokenManager: TokenManager;
  /** Optional EventSource factory for pubsub service */
  createEventSource?: (url: string) => EventSource;
}

/** Union of service keys */
export type ServiceKey =
  | "iam"
  | "workspace"
  | "module"
  | "intelligence"
  | "billing"
  | "vertex";

export class UbentoSDK {
  public readonly tokenManager: TokenManager;

  public readonly iam: IamService;
  public readonly workspace: WorkspaceService;
  public readonly module: ModuleService;
  public readonly intelligence: IntelligenceService;
  public readonly billing: BillingService;
  public readonly vertex: VertexService;

  constructor(options: UbentoSDKOptions) {
    const { baseUrl, serviceBaseUrls = {}, tokenManager } = options;

    this.tokenManager = tokenManager;

    const makeConfig = (key: ServiceKey) => ({
      baseUrl: serviceBaseUrls[key] ?? baseUrl,
      tokenManager,
    });

    this.iam = new IamService(makeConfig("iam"));
    this.workspace = new WorkspaceService(makeConfig("workspace"));
    this.module = new ModuleService(makeConfig("module"));
    this.intelligence = new IntelligenceService(makeConfig("intelligence"));
    this.billing = new BillingService(makeConfig("billing"));
    this.vertex = new VertexService(makeConfig("vertex"));
  }
}
