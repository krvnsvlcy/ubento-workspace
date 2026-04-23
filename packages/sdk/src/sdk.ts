import { TokenManager } from "./lib/token_manager.js";
import { AppService } from "./services/app.js";
import { IamService } from "./services/iam.js";

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
export type ServiceKey = "iam" | "app";

export class UbentoSDK {
  public readonly tokenManager: TokenManager;
  public readonly iam: IamService;
  public readonly app: AppService;

  constructor(options: UbentoSDKOptions) {
    const { baseUrl, serviceBaseUrls = {}, tokenManager } = options;

    this.tokenManager = tokenManager;

    const makeConfig = (key: ServiceKey) => ({
      baseUrl: serviceBaseUrls[key] ?? baseUrl,
      tokenManager,
    });

    this.iam = new IamService(makeConfig("iam"));
    this.app = new AppService(makeConfig("app"));
  }
}
