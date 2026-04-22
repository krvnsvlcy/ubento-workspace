import { PubsubClient, createPubsubClient } from "~/clients/pubsub/client.js";
import type {
  CreateInterestRequest,
  Interest,
  PublishEventRequest,
  Subscription,
  UpdateInterestRequest,
} from "~/clients/pubsub/types.js";
import type { TokenManager } from "~/lib/token_manager.js";

export class PubsubService {
  private pubsubClient: PubsubClient;

  constructor({
    baseUrl,
    tokenManager,
    createEventSource,
  }: {
    baseUrl?: string;
    tokenManager: TokenManager;
    createEventSource?: (url: string) => EventSource;
  }) {
    this.pubsubClient = createPubsubClient({
      baseUrl,
      tokenManager,
      createEventSource,
    });
  }

  // Subscription management
  async createSubscription(): Promise<Subscription> {
    return this.pubsubClient.createSubscription();
  }

  async deleteSubscription(subscriptionId: string): Promise<void> {
    return this.pubsubClient.deleteSubscription(subscriptionId);
  }

  // Interest management
  async listSubscriptionInterests(subscriptionId: string): Promise<Interest[]> {
    return this.pubsubClient.listSubscriptionInterests(subscriptionId);
  }

  async addInterestsToSubscription(
    subscriptionId: string,
    interests: CreateInterestRequest[],
  ): Promise<Interest[]> {
    return this.pubsubClient.addInterestsToSubscription(
      subscriptionId,
      interests,
    );
  }

  async updateSubscriptionInterest(
    subscriptionId: string,
    interestId: string,
    update: UpdateInterestRequest,
  ): Promise<Interest> {
    return this.pubsubClient.updateSubscriptionInterest(
      subscriptionId,
      interestId,
      update,
    );
  }

  async removeInterestsFromSubscription(
    subscriptionId: string,
    interestIds: string[],
  ): Promise<void> {
    return this.pubsubClient.removeInterestsFromSubscription(
      subscriptionId,
      interestIds,
    );
  }

  // Event publishing
  async publishEvent(event: PublishEventRequest): Promise<void> {
    return this.pubsubClient.publishEvent(event);
  }

  // Event streaming with enhanced API
  subscribeToEvents(
    subscriptionId: string,
    onEvent: (event: any) => void,
    options?: {
      onError?: (error: Error) => void;
      onConnect?: () => void;
      onDisconnect?: () => void;
    },
  ): () => void {
    return this.pubsubClient.listenToSubscriptionEvents(
      subscriptionId,
      onEvent,
      options,
    );
  }

  // Convenience methods
  async subscribeToTopic(
    topic: string,
    onEvent: (event: any) => void,
    filter?: Record<string, any>,
    options?: {
      onError?: (error: Error) => void;
      onConnect?: () => void;
      onDisconnect?: () => void;
    },
  ): Promise<{ subscriptionId: string; unsubscribe: () => void }> {
    // Create subscription
    const subscription = await this.createSubscription();

    // Add interest for the topic
    await this.addInterestsToSubscription(subscription.id, [{ topic, filter }]);

    // Start listening
    const unsubscribe = this.subscribeToEvents(
      subscription.id,
      onEvent,
      options,
    );

    return {
      subscriptionId: subscription.id,
      unsubscribe: () => {
        unsubscribe();
        // Optionally clean up subscription
        this.deleteSubscription(subscription.id).catch(() => {
          // Ignore cleanup errors
        });
      },
    };
  }

  // Health check
  async ping(): Promise<void> {
    return this.pubsubClient.ping();
  }
}
