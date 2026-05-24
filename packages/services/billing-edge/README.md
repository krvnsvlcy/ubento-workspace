# @ubento/services.billing-edge

A package to manage billing usage at the edge with local caching in Redis.

## Features

- **Optimistic Local Quotas**: Tracks holds, held requests, and actual consumed usage locally in Redis.
- **Dynamic Block Allocations**: Lazily fetches new usage blocks from the central billing API when local quotas run low.
- **Robust Typing**: Type definitions for Redis client compatibility and SDK integration.

## Usage

```typescript
import { createEdgeUsageProxy } from "@ubento/services.billing-edge";
import { UbentoSDK } from "@ubento/services.sdk";
import Redis from "ioredis";

const redis = new Redis();
const ubentoSdk = new UbentoSDK({ ... });

const proxy = createEdgeUsageProxy({
  usageKey: "vertex-req-usage",
  redis,
  ubentoSdk,
  blockSize: {
    min: 1000,
    max: 10000,
  },
});

// Reserve quota for a request
const reservationKey = await proxy.reserve("team-123", 500);

try {
  // Perform the operation (e.g. Vertex AI call)
  const actualUsage = 450;
  
  // Commit actual usage
  await proxy.commit(reservationKey, actualUsage);
} catch (error) {
  // Release reservation in case of failure
  await proxy.release(reservationKey);
}
```
