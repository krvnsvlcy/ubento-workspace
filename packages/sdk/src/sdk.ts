import { TokenManager } from "./lib/token_manager.js";
import { BillingService } from "./services/billing.js";
import { BuildService } from "./services/build.js";
import { ConfigurationService } from "./services/configuration.js";
import { DeploymentService } from "./services/deployment.js";
import { DriveService } from "./services/drive.js";
import { IamService } from "./services/iam.js";
import { IntegrationService } from "./services/integration.js";
import { IntelligenceService } from "./services/intelligence.js";
import { LoggingService } from "./services/logging.js";
import { NetworkingService } from "./services/networking.js";
import { PubsubService } from "./services/pubsub.js";
import { RepositoryService } from "./services/repository.js";
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
  | "billing"
  | "build"
  | "configuration"
  | "deployment"
  | "drive"
  | "function"
  | "iam"
  | "integration"
  | "intelligence"
  | "logging"
  | "networking"
  | "pubsub"
  | "repository"
  | "supabase"
  | "workspace";

export class UbentoSDK {
  public readonly tokenManager: TokenManager;
  public readonly billing: BillingService;
  public readonly build: BuildService;
  public readonly configuration: ConfigurationService;
  public readonly deployment: DeploymentService;
  public readonly drive: DriveService;
  public readonly iam: IamService;
  public readonly integration: IntegrationService;
  public readonly intelligence: IntelligenceService;
  public readonly logging: LoggingService;
  public readonly networking: NetworkingService;
  public readonly pubsub: PubsubService;
  public readonly repository: RepositoryService;
  public readonly workspace: WorkspaceService;

  constructor(options: UbentoSDKOptions) {
    const {
      baseUrl,
      serviceBaseUrls = {},
      tokenManager,
      createEventSource,
    } = options;

    this.tokenManager = tokenManager;

    const makeConfig = (key: ServiceKey) => ({
      baseUrl: serviceBaseUrls[key] ?? baseUrl,
      tokenManager,
    });

    const makePubsubConfig = (key: ServiceKey) => ({
      baseUrl: serviceBaseUrls[key] ?? baseUrl,
      tokenManager,
      createEventSource,
    });

    this.billing = new BillingService(makeConfig("billing"));
    this.build = new BuildService(makeConfig("build"));
    this.configuration = new ConfigurationService(makeConfig("configuration"));
    this.deployment = new DeploymentService(makeConfig("deployment"));
    this.drive = new DriveService(makeConfig("drive"));
    this.iam = new IamService(makeConfig("iam"));
    this.integration = new IntegrationService(makeConfig("integration"));
    this.intelligence = new IntelligenceService(makeConfig("intelligence"));
    this.logging = new LoggingService(makeConfig("logging"));
    this.networking = new NetworkingService(makeConfig("networking"));
    this.pubsub = new PubsubService(makePubsubConfig("pubsub"));
    this.repository = new RepositoryService(makeConfig("repository"));
    this.workspace = new WorkspaceService(makeConfig("workspace"));
  }
}
