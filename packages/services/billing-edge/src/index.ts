import { randomUUID } from "crypto";
import { UbentoSDK, BillingService, billingClient } from "@ubento/services.sdk";

export type UsageHold = billingClient.UsageHold;

export interface RedisPipeline {
  hget(key: string, field: string): this;
  hdel(key: string, field: string): this;
  hincrby(key: string, field: string, increment: number): this;
  exec(): Promise<[Error | null, any][] | null>;
}

export interface RedisClient {
  hget(key: string, field: string): Promise<string | null>;
  hgetall(key: string): Promise<Record<string, string> | null>;
  hset(key: string, field: string, value: string | number): Promise<number>;
  hdel(key: string, ...fields: string[]): Promise<number>;
  pipeline(): RedisPipeline;
}

export interface EdgeUsageProxyConfig {
  usageKey: string; // e.g., `vertex-req-usage`
  redis: RedisClient; // Your ioredis or redis client instance
  ubentoSdk: UbentoSDK | { billing: Pick<BillingService, "reserveUsage"> } | Pick<BillingService, "reserveUsage">;
  blockSize: {
    min: number;
    max: number;
  };
  featureCode?: string; // Optional custom feature code, defaults to usageKey
  group?: string; // Optional group
  note?: string; // Optional note
  duration?: number; // Optional duration in ms for the hold, defaults to 24 hours (86400000 ms)
}

export function createEdgeUsageProxy({
  usageKey,
  redis,
  ubentoSdk,
  blockSize,
  featureCode = usageKey,
  group,
  note,
  duration = 86400000,
}: EdgeUsageProxyConfig) {
  // We split the state into three Redis keys for atomic operations
  const holdsKey = `${usageKey}:holds`;
  const heldKey = `${usageKey}:held`;
  const stateKey = `${usageKey}:state`; // stores `used` and `last_commit_ts`

  // Helper to extract the reserveUsage function dynamically
  const getReserveUsageFn = () => {
    if (
      "billing" in ubentoSdk &&
      typeof ubentoSdk.billing === "object" &&
      ubentoSdk.billing !== null &&
      "reserveUsage" in ubentoSdk.billing
    ) {
      return ubentoSdk.billing.reserveUsage.bind(ubentoSdk.billing);
    }
    if ("reserveUsage" in ubentoSdk && typeof ubentoSdk.reserveUsage === "function") {
      return ubentoSdk.reserveUsage.bind(ubentoSdk);
    }
    throw new Error("Invalid ubentoSdk: must expose billing.reserveUsage or reserveUsage directly");
  };

  const reserveUsage = getReserveUsageFn();

  /**
   * Helper to calculate the current available local quota
   */
  const getAvailable = async (): Promise<number> => {
    // Run all three Redis reads in parallel
    const [usedStr, holdsMap, heldMap] = await Promise.all([
      redis.hget(stateKey, "used"),
      redis.hgetall(holdsKey),
      redis.hgetall(heldKey),
    ]);

    const used = parseInt(usedStr || "0", 10);
    
    // Sum up all blocks reserved from the central DB
    const totalHolds = Object.values(holdsMap || {}).reduce(
      (acc, val) => acc + (parseInt(val as string, 10) || 0),
      0
    );
    
    // Sum up all in-flight requests currently running on the edge
    const totalHeld = Object.values(heldMap || {}).reduce(
      (acc, val) => acc + (parseInt(val as string, 10) || 0),
      0
    );

    return totalHolds - used - totalHeld;
  };

  return {
    getAvailable,

    /**
     * Reserves usage locally. If not enough is available, fetches a new block.
     * Returns a unique reservation key.
     */
    async reserve(
      teamId: string,
      estimatedAmount: number
    ): Promise<string> {
      let available = await getAvailable();

      if (available < estimatedAmount) {
        // We need a new block. Ensure we request at least enough for this prompt.
        const targetMin = Math.max(blockSize.min, estimatedAmount);
        const targetMax = Math.max(blockSize.max, estimatedAmount);

        // Call the central billing API
        const response = await reserveUsage({
          team_id: teamId,
          feature_code: featureCode,
          group,
          note: note ?? `Edge block allocation for ${teamId}`,
          duration,
          ref: randomUUID(),
          amount: undefined,
          minAmount: targetMin,
          maxAmount: targetMax,
        });

        if (response.error || !response.data) {
          throw new Error(
            `Quota exceeded or billing reservation failed: ${response.error || "No data returned"}`
          );
        }

        const newHold = response.data;

        // Add the new block to our local 'holds' hash
        await redis.hset(holdsKey, newHold.ref, newHold.amount);

        // Re-calculate to ensure we are good to go
        available = await getAvailable();
        if (available < estimatedAmount) {
          throw new Error("Quota exceeded: Unable to secure enough tokens.");
        }
      }

      const reqKey = randomUUID(); // The unique key for this specific request

      // Lock the estimated amount locally
      await redis.hset(heldKey, reqKey, estimatedAmount);

      return reqKey;
    },

    /**
     * Commits the actual usage consumed.
     */
    async commit(reqKey: string, actualAmount: number): Promise<void> {
      // We use a Redis pipeline to ensure atomicity. 
      // It deletes the local hold and increments the 'used' counter in one network trip.
      const pipeline = redis.pipeline();
      pipeline.hget(heldKey, reqKey);
      pipeline.hdel(heldKey, reqKey);
      pipeline.hincrby(stateKey, "used", actualAmount);

      const results = await pipeline.exec();

      if (!results || !results[0]) {
        throw new Error(`Pipeline execution failed for key: ${reqKey}`);
      }

      const [err, heldAmountStr] = results[0];
      if (err) {
        throw err;
      }

      if (!heldAmountStr) {
        throw new Error(`Invalid or expired reservation key: ${reqKey}`);
      }
    },

    /**
     * Releases the local hold without committing any usage (e.g., the Vertex call failed).
     */
    async release(reqKey: string): Promise<void> {
      const removed = await redis.hdel(heldKey, reqKey);
      
      if (removed === 0) {
        console.warn(`Attempted to release unknown reservation key: ${reqKey}`);
      }
    },
  };
}
