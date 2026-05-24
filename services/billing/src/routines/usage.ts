import {
  HoldStatus,
  UsageCounter,
  UsageHold,
} from "@ubento/services.database/billing";
import {
  generateBareId,
  makeEntityId,
  QuotaFeature,
  ubentoEntities,
} from "@ubento/services.primitives";
import {
  AuthorizationError,
  ConflictError,
  prismaListWithCursor,
  ServiceError,
  TooManyRequestsError,
  ValidationError,
} from "@ubento/services.toolkit";
import { format } from "date-fns";
import { eventPublisher } from "../event.js";
import prisma from "../lib/prisma.js";
import {
  compareQuotaAmounts,
  resolveEntitlementGrantTable,
} from "./entitlements/entitlements.js";
import { resolveFeatureQuota } from "./entitlements/resolve.js";
import { getFeature } from "./features.js";

// ==================== Counter Operations ====================

export async function getUsageCounter(
  id: string,
): Promise<UsageCounter | null> {
  const counter = await prisma.usageCounter.findUnique({
    where: { id },
  });
  return counter;
}

function resolveFeatureActiveGroup(feature_code: string) {
  const feature = getFeature(feature_code);
  if (!feature) {
    throw new ValidationError(`Invalid feature code: ${feature_code}`);
  }
  if (feature.type !== "QUOTA") {
    throw new ValidationError(`Feature ${feature_code} is not a quota`);
  }

  return resolveActiveGroup(feature.groupStrategy);
}

export async function getUsageCounterByCode(
  team_id: string,
  feature_code: string,
  group?: string,
): Promise<UsageCounter | null> {
  const counter = await prisma.usageCounter.findUnique({
    where: {
      team_id_feature_code_group: {
        team_id,
        feature_code,
        group: group ?? resolveFeatureActiveGroup(feature_code),
      },
    },
  });
  return counter;
}

export async function listUsageCounters(filters: {
  team_id: string;
  code?: string;
  group?: string;
  limit?: number;
  cursor?: string;
}) {
  return prismaListWithCursor(prisma.usageCounter, {
    limit: filters.limit,
    cursor: filters.cursor,
    orderBy: [{ created_at: "desc" }, { id: "desc" }],
    where: {
      team_id: filters.team_id,
      ...(filters.code && { code: filters.code }),
      ...(filters.group && { group: filters.group }),
    },
    resolveCursor: (d) => ({ id: d.id }),
  });
}

export function resolveActiveGroup(
  group: QuotaFeature["groupStrategy"] = "LIFETIME",
) {
  const now = new Date();

  switch (group) {
    case "DAY":
      return format(now, "yyyy-MM-dd");
    case "WEEK":
      return format(now, "RRRR-'W'II");
    case "MONTH":
      return format(now, "yyyy-MM");
    case "YEAR":
      return format(now, "yyyy");
    case "LIFETIME":
      return "lifetime";
    default:
      return "default";
  }
}

export async function incrementOrganizationUsage({
  team_id,
  feature_code,
  amount,
  note = "Direct usage increment",
  ref,
  data,
}: {
  team_id: string;
  feature_code: string;
  amount: number;
  note?: string;
  ref?: string;
  data?: any;
}): Promise<UsageCounter> {
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new ValidationError(`Invalid amount: ${amount}`);
  }

  const feature = getFeature(feature_code);
  if (!feature) {
    throw new ValidationError(`Invalid feature code: ${feature_code}`);
  }
  if (feature.type !== "QUOTA") {
    throw new ValidationError(`Feature ${feature_code} is not a quota`);
  }

  const group = resolveActiveGroup(feature.groupStrategy);
  const entitlements = await resolveEntitlementGrantTable(team_id);
  const quota = resolveFeatureQuota({
    entitlements,
    feature_code: feature_code,
  });

  if (quota == null) {
    throw new AuthorizationError(`Usage of ${feature_code} is not allowed`);
  }

  // 1. Ensure counter exists
  const counterStub = await prisma.usageCounter.upsert({
    where: {
      team_id_feature_code_group: {
        team_id,
        feature_code,
        group,
      },
    },
    create: {
      id: makeEntityId({
        code: ubentoEntities.billingUsageCounter.code,
        bareId: generateBareId(),
      }),
      team_id,
      feature_code,
      group,
      value: 0,
      reserved: 0,
    },
    update: {},
  });

  // 2. Retry Loop with Transactional Safety
  // We use a fresh transaction per attempt to ensure Snapshot Isolation doesn't
  // cause us to read stale data across retries.
  const executeTransaction = async () => {
    return prisma.$transaction(async (tx) => {
      const current = await tx.usageCounter.findUniqueOrThrow({
        where: { id: counterStub.id },
      });

      const effective = current.value + current.reserved;
      if (compareQuotaAmounts(effective + amount, quota) > 0) {
        throw new TooManyRequestsError(
          `Usage limit exceeded for ${feature_code} in ${group}`,
        );
      }

      // Optimistic Update
      const updated = await tx.usageCounter.updateMany({
        where: {
          id: current.id,
          version: current.version,
        },
        data: {
          value: { increment: amount },
          version: { increment: 1 },
        },
      });

      if (updated.count === 0) {
        throw new Error("RETRY_TX");
      }

      // Create Ledger Entry
      await tx.usageEvent.create({
        data: {
          id: makeEntityId({
            code: ubentoEntities.billingUsageEvent.code,
            bareId: generateBareId(),
          }),
          team_id,
          counter_id: current.id,
          value: amount,
          ref,
          note,
          data,
        },
      });

      // Return fresh state
      return tx.usageCounter.findUniqueOrThrow({ where: { id: current.id } });
    });
  };

  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const result = await executeTransaction();
      eventPublisher.publishEntity("updated", result);
      return result;
    } catch (err: any) {
      if (err.message !== "RETRY_TX") throw err;
      // loop continues
    }
  }

  throw new TooManyRequestsError(
    `Concurrent usage update conflict for ${feature_code}`,
  );
}

// ==================== Usage Holds ====================

export async function getUsageHold(id: string): Promise<UsageHold | null> {
  return prisma.usageHold.findUnique({ where: { id } });
}

export async function getUsageHoldByRef(
  team_id: string,
  ref: string,
): Promise<UsageHold | null> {
  return prisma.usageHold.findUnique({
    where: { team_id_ref: { team_id, ref } },
  });
}

export async function reserveUsage({
  team_id,
  feature_code,
  amount,
  minAmount,
  maxAmount,
  note,
  duration,
  ref,
  data,
}: {
  team_id: string;
  feature_code: string;
  amount?: number;
  minAmount?: number;
  maxAmount?: number;
  note: string;
  duration: number; // ms
  ref: string;
  data?: any;
}): Promise<UsageHold> {
  if (!ref) throw new Error("ref is required");

  // Resolve target reservation boundaries
  const targetMin = minAmount ?? amount;
  const targetMax = maxAmount ?? amount;

  if (targetMin === undefined || targetMax === undefined) {
    throw new Error(
      "Must provide either 'amount', or both 'minAmount' and 'maxAmount'",
    );
  }
  if (
    !Number.isFinite(targetMin) ||
    targetMin <= 0 ||
    !Number.isFinite(targetMax) ||
    targetMax < targetMin
  ) {
    throw new Error(
      `Invalid reservation bounds. min: ${targetMin}, max: ${targetMax}`,
    );
  }
  if (!Number.isFinite(duration) || duration <= 0) {
    throw new Error(`Invalid duration: ${duration}`);
  }

  const feature = getFeature(feature_code);
  if (!feature) throw new Error(`Invalid feature code: ${feature_code}`);
  if (feature.type !== "QUOTA")
    throw new Error(`Feature ${feature_code} is not a quota`);

  const group = resolveActiveGroup(feature.groupStrategy);
  const entitlements = await resolveEntitlementGrantTable(team_id);
  const quota = resolveFeatureQuota({
    entitlements,
    feature_code: feature_code,
  });

  if (quota == null) {
    throw new AuthorizationError(`Usage of ${feature_code} is not allowed`);
  }

  // 1. Idempotency Check (Outside any transaction)
  const existing = await prisma.usageHold.findUnique({
    where: { team_id_ref: { team_id, ref } },
    include: { counter: true },
  });

  if (existing) {
    if (
      existing.counter.feature_code !== feature_code ||
      existing.counter.group !== group ||
      existing.amount < targetMin ||
      existing.amount > targetMax
    ) {
      throw new ConflictError(
        `ref already used with conflicting parameters: ${ref}`,
      );
    }
    return existing;
  }

  const expires_at = new Date(Date.now() + duration);

  // 2. Ensure the counter stub exists
  const counterStub = await prisma.usageCounter.upsert({
    where: {
      team_id_feature_code_group: { team_id, feature_code, group },
    },
    create: {
      id: makeEntityId({
        code: ubentoEntities.billingUsageCounter.code,
        bareId: generateBareId(),
      }),
      team_id,
      feature_code,
      group,
      value: 0,
      reserved: 0,
    },
    update: {},
  });

  // 3. The Optimistic Concurrency Control (OCC) Loop
  const maxRetries = 3;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const current = await prisma.usageCounter.findUniqueOrThrow({
      where: { id: counterStub.id },
    });

    const effective = current.value + current.reserved;
    let grantedAmount = targetMax;

    if (compareQuotaAmounts(effective + targetMax, quota) > 0) {
      const numericQuota =
        typeof quota === "number"
          ? quota
          : ((quota as any).value ?? (quota as any).amount ?? Infinity);
      const available = Math.max(0, numericQuota - effective);
      grantedAmount = available;
    }

    if (grantedAmount < targetMin) {
      throw new ServiceError(
        `Usage limit exceeded for ${feature_code}. Required min: ${targetMin}`,
        { code: "USAGE_LIMIT_EXCEEDED", status: 402 },
      );
    }

    // Attempt to secure the quota atomically
    const bumped = await prisma.usageCounter.updateMany({
      where: {
        id: current.id,
        version: current.version, // Ensure nobody else changed it
      },
      data: {
        reserved: { increment: grantedAmount },
        version: { increment: 1 },
      },
    });

    // If bumped.count === 0, another request updated the counter first.
    // The loop will automatically continue and retry the fetch -> calculate -> update.
    if (bumped.count > 0) {
      // 4. Quota secured. Now create the hold.
      try {
        return await prisma.usageHold.create({
          data: {
            id: makeEntityId({
              code: ubentoEntities.billingUsageHold.code,
              bareId: generateBareId(),
            }),
            team_id,
            ref,
            counter_id: current.id,
            amount: grantedAmount,
            note,
            status: HoldStatus.HELD,
            expires_at,
            data,
          },
          include: { counter: true },
        });
      } catch (error: any) {
        // 5. Compensating Action (Rollback)
        // If two concurrent requests generate the same `ref`, one will successfully create the hold,
        // and the other will throw a Unique Constraint violation (P2002 in Prisma).
        if (error.code === "P2002") {
          // Refund the counter immediately since we failed to create the hold
          await prisma.usageCounter.update({
            where: { id: current.id },
            data: { reserved: { decrement: grantedAmount } },
          });

          // Fetch and return the hold that beat us to the database
          const raceConditionHold = await prisma.usageHold.findUnique({
            where: { team_id_ref: { team_id, ref } },
            include: { counter: true },
          });

          if (raceConditionHold) return raceConditionHold;
        }

        // Re-throw any other unexpected database error
        throw error;
      }
    }
  }

  throw new Error(
    "Failed to reserve usage after maximum OCC retries due to high concurrency.",
  );
}

export async function commitUsageHold({
  ref,
  team_id,
  amount,
}: {
  ref: string;
  team_id: string;
  amount?: number; // Optional: If omitted, defaults to the remaining hold balance
}): Promise<{ hold: UsageHold; counter: UsageCounter }> {
  const result = await prisma.$transaction(async (tx) => {
    const hold = await tx.usageHold.findUnique({
      where: {
        team_id_ref: {
          team_id,
          ref,
        },
      },
    });

    if (!hold) throw new Error("Usage hold not found");
    if (hold.status !== "HELD")
      throw new Error(`Hold is already ${hold.status.toLowerCase()}`);

    const remainingHold = hold.amount - hold.committed_amount;

    // If amount is not provided, consume the entire remaining balance
    const commitAmount = amount !== undefined ? amount : remainingHold;

    // Delta validation
    if (!Number.isFinite(commitAmount) || commitAmount < 0) {
      throw new Error(
        `Invalid commit amount: ${commitAmount}. Delta cannot be negative.`,
      );
    }

    if (commitAmount > remainingHold) {
      throw new Error(
        `Commit delta (${commitAmount}) exceeds remaining hold balance (${remainingHold}) for ref: ${ref}`,
      );
    }

    // Auto-finalize if this flush consumes the exact last remaining tokens of the block
    const isExhausted = commitAmount === remainingHold;

    const counter = await tx.usageCounter.update({
      where: { id: hold.counter_id },
      data: {
        reserved: { decrement: commitAmount }, // Shift EXACTLY the consumed delta out of reserved
        value: { increment: commitAmount }, // And into billed value
        version: { increment: 1 },
      },
    });

    const updatedHold = await tx.usageHold.update({
      where: { id: hold.id },
      data: {
        committed_amount: { increment: commitAmount },
        ...(isExhausted && {
          status: "COMMITTED", // Close it out automatically
          committed_at: new Date(),
          released_at: new Date(),
        }),
      },
    });

    // === GENERATE EVENT ===
    // Prevent spamming the events table if a cron job flushes a 0-token delta
    // on an idle connection, unless it's the exhausting commit.
    if (commitAmount > 0 || isExhausted) {
      await tx.usageEvent.create({
        data: {
          id: makeEntityId({
            code: ubentoEntities.billingUsageEvent.code,
            bareId: generateBareId(),
          }),
          team_id,
          counter_id: counter.id,
          value: commitAmount, // Log the specific delta that was flushed
          ref: hold.ref,
          note: hold.note || "Usage flush from edge cache",
          data: {
            ...((hold.data as object) || {}),
            original_hold_amount: hold.amount,
            is_exhausted: isExhausted,
          },
        },
      });
    }

    return { hold: updatedHold, counter };
  });

  eventPublisher.publishEntity("updated", result.hold);
  eventPublisher.publishEntity(
    result.counter.version === 1 ? "created" : "updated",
    result.counter,
  );

  return result;
}

export async function releaseUsageHold({
  ref,
  team_id,
}: {
  ref: string;
  team_id: string;
}): Promise<UsageHold> {
  const updated = await prisma.$transaction(async (tx) => {
    const hold = await tx.usageHold.findUnique({
      where: { team_id_ref: { team_id, ref } },
    });

    if (!hold) throw new Error("Usage hold not found");
    if (hold.status !== "HELD")
      throw new Error(`Hold is already ${hold.status.toLowerCase()}`);

    await tx.usageCounter.update({
      where: { id: hold.counter_id },
      data: {
        reserved: { decrement: hold.amount },
        version: { increment: 1 },
      },
    });

    return tx.usageHold.update({
      where: { id: hold.id },
      data: { status: "RELEASED", released_at: new Date() },
    });
  });

  eventPublisher.publishEntity("updated", updated);
  return updated;
}

export async function listUsageEvents(filters?: {
  team_id?: string;
  counter_code?: string;
  counter_group?: string;
  ref?: string;
  created_after?: Date;
  created_before?: Date;
  limit?: number;
  cursor?: string;
}) {
  return prismaListWithCursor(prisma.usageEvent, {
    limit: filters?.limit,
    cursor: filters?.cursor,
    orderBy: [{ created_at: "desc" }, { id: "desc" }],
    where: {
      ...(filters?.team_id && {
        team_id: filters.team_id,
      }),
      ...(filters?.counter_code && { counter_code: filters.counter_code }),
      ...(filters?.counter_group && { counter_group: filters.counter_group }),
      ...(filters?.ref && { ref: filters.ref }),
      ...(filters?.created_after && {
        created_at: { gte: filters.created_after },
      }),
      ...(filters?.created_before && {
        created_at: { lte: filters.created_before },
      }),
    },
    resolveCursor: (d) => ({ id: d.id }),
  });
}
