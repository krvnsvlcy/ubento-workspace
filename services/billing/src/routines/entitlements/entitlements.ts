import { SubscriptionStatus } from "@ubento/services.database/billing";
import { z } from "zod";
import prisma from "../../lib/prisma.js";
import { getUbentoFeatureMap } from "../features.js";

/* ========================================================================
   2. Schemas & Types (With "inf" Support)
   ======================================================================== */

export const baseEntitlementSchema = z.object({
  feature_code: z.string(),
});

// Allow numbers OR the literal string "inf"
export const quotaAmountSchema = z.union([
  z.number().int().nonnegative(),
  z.literal("inf"),
]);

export const quotaEntitlementSchema = baseEntitlementSchema.extend({
  amount: quotaAmountSchema,
  merge_strategy: z.enum(["SUM", "MAX"]),
});

export const accessEntitlementSchema = baseEntitlementSchema;

export type QuotaAmount = z.infer<typeof quotaAmountSchema>;
export type QuotaEntitlement = z.infer<typeof quotaEntitlementSchema>;
export type AccessEntitlement = z.infer<typeof accessEntitlementSchema>;
export type Entitlement = QuotaEntitlement | AccessEntitlement;

/* ========================================================================
   3. Math Helpers (Infinity-Safe)
   ======================================================================== */

export function maxQuotaAmount(...amounts: QuotaAmount[]): QuotaAmount {
  let max = 0;
  for (const amount of amounts) {
    if (amount === "inf") return "inf";
    if (amount > max) max = amount;
  }
  return max;
}

export function sumQuotaAmount(...amounts: QuotaAmount[]): QuotaAmount {
  let sum = 0;
  for (const amount of amounts) {
    if (amount === "inf") return "inf";
    sum += amount;
  }
  return sum;
}

export function compareQuotaAmounts(a: QuotaAmount, b: QuotaAmount): number {
  if (a === "inf" && b === "inf") return 0;
  if (a === "inf") return 1;
  if (b === "inf") return -1;
  return a - b;
}

/* ========================================================================
   4. Grant Types
   ======================================================================== */

export type BaseEntitlementGrant<T extends string> = {
  type: T;
  sources: Array<{
    product_code: string;
    offer_code: string;
    subscription_id?: string;
  }>;
};

export type QuotaEntitlementGrant = BaseEntitlementGrant<"QUOTA"> & {
  sum: QuotaAmount;
  max: QuotaAmount;
};

export type AccessEntitlementGrant = BaseEntitlementGrant<"ACCESS">;
export type EntitlementGrant = QuotaEntitlementGrant | AccessEntitlementGrant;
export type EntitlementGrantTable = Record<string, EntitlementGrant>;

/* ========================================================================
   5. Resolver Logic
   ======================================================================== */

function isEntitledSubscription(s: {
  status: SubscriptionStatus;
  ends_at: Date | null;
}): boolean {
  switch (s.status) {
    case SubscriptionStatus.ACTIVE:
    case SubscriptionStatus.ON_TRIAL:
    case SubscriptionStatus.PAST_DUE:
      return true;

    case SubscriptionStatus.CANCELLED:
      return !!s.ends_at && s.ends_at.getTime() > Date.now();

    case SubscriptionStatus.PAUSED:
    case SubscriptionStatus.UNPAID:
    case SubscriptionStatus.EXPIRED:
    default:
      return false;
  }
}

/**
 * Fetches default entitlements from the Product Catalog (DB).
 * Returns a FRESH object every time to prevent mutation leaks.
 */
export async function resolveDefaultEntitlementGrantTable(): Promise<EntitlementGrantTable> {
  const ubentoFeatureMap = getUbentoFeatureMap();
  const products = await prisma.product.findMany({
    where: {},
    select: {
      id: true,
      code: true,
      default_offer: true,
    },
  });

  const table: EntitlementGrantTable = {};

  for (const product of products) {
    if (!product.default_offer?.active) continue;

    for (const entitlement of product.default_offer.entitlements) {
      const parsed = baseEntitlementSchema.safeParse(entitlement);
      if (!parsed.success) continue;

      const { feature_code } = parsed.data;
      const feature = ubentoFeatureMap[feature_code];
      if (!feature) continue;

      // Ensure slot exists
      if (!table[feature_code]) {
        if (feature.type === "QUOTA") {
          table[feature_code] = {
            type: "QUOTA",
            sum: 0,
            max: 0,
            sources: [],
          };
        } else {
          table[feature_code] = {
            type: "ACCESS",
            sources: [],
          };
        }
      }

      const grant = table[feature_code];

      switch (feature.type) {
        case "QUOTA": {
          const quotaParsed = quotaEntitlementSchema.safeParse(entitlement);
          if (!quotaParsed.success) continue;

          // Safe cast because we initialized it based on feature.type above
          const qGrant = grant as QuotaEntitlementGrant;

          if (quotaParsed.data.merge_strategy === "SUM") {
            qGrant.sum = sumQuotaAmount(qGrant.sum, quotaParsed.data.amount);
          } else {
            qGrant.max = maxQuotaAmount(qGrant.max, quotaParsed.data.amount);
          }

          qGrant.sources.push({
            offer_code: product.default_offer.code,
            product_code: product.code,
          });
          break;
        }
        case "ACCESS": {
          const accessParsed = accessEntitlementSchema.safeParse(entitlement);
          if (!accessParsed.success) continue;

          const aGrant = grant as AccessEntitlementGrant;

          aGrant.sources.push({
            offer_code: product.default_offer.code,
            product_code: product.code,
          });
          break;
        }
      }
    }
  }

  return table;
}

/**
 * Main Resolver: Merges Defaults + User Subscriptions + Ad-hoc Entitlement Grants
 */
export async function resolveEntitlementGrantTable(
  organization_id: string,
): Promise<EntitlementGrantTable> {
  const ubentoFeatureMap = getUbentoFeatureMap();

  // 1. Fetch Subscriptions
  const subscriptions = await prisma.subscription.findMany({
    where: {
      organization_id,
      status: {
        in: [
          SubscriptionStatus.ACTIVE,
          SubscriptionStatus.ON_TRIAL,
          SubscriptionStatus.CANCELLED,
          SubscriptionStatus.PAST_DUE,
        ],
      },
    },
    select: {
      id: true,
      offer: true,
      status: true,
      ends_at: true,
      quantity: true,
    },
  });

  const entitledSubs = subscriptions.filter(isEntitledSubscription);

  // 2. Fetch Defaults
  const defaults = await resolveDefaultEntitlementGrantTable();

  // SECURITY CRITICAL: Deep Clone defaults
  const table: EntitlementGrantTable = structuredClone(defaults);

  // 3. Merge User Subscriptions
  for (const sub of entitledSubs) {
    if (!sub.offer.active) continue;

    for (const entitlement of sub.offer.entitlements) {
      const parsed = baseEntitlementSchema.safeParse(entitlement);
      if (!parsed.success) continue;

      const { feature_code } = parsed.data;
      const feature = ubentoFeatureMap[feature_code];
      if (!feature) continue;

      if (!table[feature_code]) {
        table[feature_code] =
          feature.type === "QUOTA"
            ? { type: "QUOTA", sum: 0, max: 0, sources: [] }
            : { type: "ACCESS", sources: [] };
      }

      const existingGrant = table[feature_code];

      if (feature.type === "QUOTA") {
        const quotaParsed = quotaEntitlementSchema.safeParse(entitlement);
        if (!quotaParsed.success) continue;

        const qGrant = existingGrant as QuotaEntitlementGrant;
        const amounts = Array(sub.quantity).fill(quotaParsed.data.amount);

        if (quotaParsed.data.merge_strategy === "SUM") {
          qGrant.sum = sumQuotaAmount(qGrant.sum, ...amounts);
        } else {
          qGrant.max = maxQuotaAmount(qGrant.max, ...amounts);
        }

        qGrant.sources.push({
          subscription_id: sub.id,
          offer_code: sub.offer.code,
          product_code: sub.offer.product_code,
        });
      } else {
        const aGrant = existingGrant as AccessEntitlementGrant;
        aGrant.sources.push({
          subscription_id: sub.id,
          offer_code: sub.offer.code,
          product_code: sub.offer.product_code,
        });
      }
    }
  }

  // 4. Merge Ad-hoc Entitlement Grants (JSON Data Based)
  const adhocGrants = await prisma.entitlementGrant.findMany({
    where: {
      organization_id,
      expires_at: { gt: new Date() },
    },
  });

  for (const grant of adhocGrants) {
    // Parse the JSON data field using the same schema as subscriptions
    const parsed = baseEntitlementSchema.safeParse(grant.data);
    if (!parsed.success) continue;

    const { feature_code } = parsed.data;
    const feature = ubentoFeatureMap[feature_code];
    if (!feature) continue;

    // Initialize slot if it doesn't exist
    if (!table[feature_code]) {
      table[feature_code] =
        feature.type === "QUOTA"
          ? { type: "QUOTA", sum: 0, max: 0, sources: [] }
          : { type: "ACCESS", sources: [] };
    }

    const existingGrant = table[feature_code];

    if (feature.type === "QUOTA") {
      const quotaParsed = quotaEntitlementSchema.safeParse(grant.data);
      if (!quotaParsed.success) continue;

      const qGrant = existingGrant as QuotaEntitlementGrant;

      if (quotaParsed.data.merge_strategy === "SUM") {
        qGrant.sum = sumQuotaAmount(qGrant.sum, quotaParsed.data.amount);
      } else {
        qGrant.max = maxQuotaAmount(qGrant.max, quotaParsed.data.amount);
      }

      qGrant.sources.push({
        subscription_id: grant.id, // Using the grant ID as the reference
        offer_code: "AD_HOC",
        product_code: "AD_HOC",
      });
    } else if (feature.type === "ACCESS") {
      const aGrant = existingGrant as AccessEntitlementGrant;
      aGrant.sources.push({
        subscription_id: grant.id,
        offer_code: "AD_HOC",
        product_code: "AD_HOC",
      });
    }
  }

  return table;
}
