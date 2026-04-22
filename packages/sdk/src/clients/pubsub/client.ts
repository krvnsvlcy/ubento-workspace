import axios, { AxiosInstance } from "axios";
import type { TokenManager } from "~/lib/token_manager.js";
import type {
  CreateInterestRequest,
  Interest,
  PublishEventRequest,
  Subscription,
  UpdateInterestRequest,
} from "./types.js";

export interface PubsubClientOptions {
  baseUrl?: string;
  tokenManager: TokenManager;
  createEventSource?: (url: string) => EventSource;
}

export class PubsubClient {
  private apiClient: AxiosInstance;
  private baseUrl: string;
  private tokenManager: TokenManager;
  private createEventSource: (url: string) => EventSource;

  constructor(options: PubsubClientOptions) {
    this.baseUrl = options.baseUrl || "";
    this.tokenManager = options.tokenManager;
    this.createEventSource =
      options.createEventSource || ((url: string) => new EventSource(url));

    this.apiClient = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add request interceptor to include auth token
    this.apiClient.interceptors.request.use(async (config) => {
      const token = await this.tokenManager.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Subscription management
  async createSubscription(): Promise<Subscription> {
    const response = await this.apiClient.post("/pubsub/subscriptions");
    return response.data;
  }

  async deleteSubscription(subscriptionId: string): Promise<void> {
    await this.apiClient.delete(`/pubsub/subscriptions/${subscriptionId}`);
  }

  // Interest management
  async listSubscriptionInterests(subscriptionId: string): Promise<Interest[]> {
    const response = await this.apiClient.get(
      `/pubsub/subscriptions/${subscriptionId}/interests`,
    );
    return response.data;
  }

  async addInterestsToSubscription(
    subscriptionId: string,
    interests: CreateInterestRequest[],
  ): Promise<Interest[]> {
    const response = await this.apiClient.post(
      `/pubsub/subscriptions/${subscriptionId}/interests`,
      interests,
    );
    return response.data;
  }

  async updateSubscriptionInterest(
    subscriptionId: string,
    interestId: string,
    update: UpdateInterestRequest,
  ): Promise<Interest> {
    const response = await this.apiClient.patch(
      `/pubsub/subscriptions/${subscriptionId}/interests/${interestId}`,
      update,
    );
    return response.data;
  }

  async removeInterestsFromSubscription(
    subscriptionId: string,
    interestIds: string[],
  ): Promise<void> {
    await this.apiClient.delete(
      `/pubsub/subscriptions/${subscriptionId}/interests`,
      { data: interestIds },
    );
  }

  // Event publishing
  async publishEvent(event: PublishEventRequest): Promise<void> {
    await this.apiClient.post("/pubsub/publish", event);
  }

  // Event streaming
  listenToSubscriptionEvents(
    subscriptionId: string,
    onEvent: (event: any) => void,
    options?: {
      onError?: (error: Error) => void;
      onConnect?: () => void;
      onDisconnect?: () => void;
    },
  ): () => void {
    let eventSource: EventSource | null = null;
    let lastEventId = "";
    let retryCount = 0;
    let reconnectTimeout: ReturnType<typeof setTimeout>;
    let pingInterval: ReturnType<typeof setInterval>;
    let active = true;

    const connect = async () => {
      try {
        const url = new URL(
          `${this.baseUrl}/pubsub/subscriptions/${subscriptionId}/stream`,
        );
        if (lastEventId) {
          url.searchParams.set("lastEventId", lastEventId);
        }

        // Add auth token to URL if needed for EventSource
        const token = await this.tokenManager.getToken();
        if (token) {
          url.searchParams.set("token", token);
        }

        eventSource = this.createEventSource(url.toString());

        eventSource.onopen = () => {
          options?.onConnect?.();
          retryCount = 0; // Reset backoff on successful connection
        };

        eventSource.onmessage = (e) => {
          try {
            const parsed = JSON.parse(e.data);
            onEvent(parsed);
            if (e.lastEventId) {
              lastEventId = e.lastEventId;
            }
          } catch (error) {
            options?.onError?.(
              new Error(`Failed to parse event data: ${error}`),
            );
          }
        };

        eventSource.onerror = (error) => {
          if (!active) return;

          eventSource?.close();
          options?.onDisconnect?.();

          const delay = Math.min(10000, 1000 * 2 ** retryCount);
          retryCount++;

          options?.onError?.(
            new Error(`EventSource connection failed, retrying in ${delay}ms`),
          );

          reconnectTimeout = setTimeout(() => {
            if (active) {
              connect();
            }
          }, delay);
        };
      } catch (error) {
        options?.onError?.(error as Error);
      }
    };

    const startPinging = () => {
      pingInterval = setInterval(
        async () => {
          try {
            await this.apiClient.get("/pubsub/ping");
          } catch (e) {
            // Ignore ping errors - they're just for keepalive
          }
        },
        2 * 60 * 1000,
      ); // every 2 minutes
    };

    // Start connection and ping
    connect();
    startPinging();

    // Return cleanup function
    return () => {
      active = false;
      eventSource?.close();
      clearTimeout(reconnectTimeout);
      clearInterval(pingInterval);
    };
  }

  // Health check
  async ping(): Promise<void> {
    await this.apiClient.get("/pubsub/ping");
  }
}

export function createPubsubClient(options: PubsubClientOptions): PubsubClient {
  return new PubsubClient(options);
}
