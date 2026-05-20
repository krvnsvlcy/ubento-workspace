import {
  EntitlementGrantTable,
  QuotaAmount,
  sumQuotaAmount,
} from "./entitlements.js";

export type FeatureAccessEvaluation = {
  allowed: boolean;
  by_feature: Record<string, boolean>;
};

export function evaluateFeatureAccess({
  entitlements,
  feature_code,
}: {
  entitlements: EntitlementGrantTable;
  feature_code: string;
}): boolean {
  const grant = entitlements[feature_code];
  return Boolean(grant && grant.type === "ACCESS");
}

export function resolveFeatureQuota({
  entitlements,
  feature_code,
}: {
  entitlements: EntitlementGrantTable;
  feature_code: string;
}): QuotaAmount {
  const grant = entitlements[feature_code];
  if (grant && grant.type === "QUOTA") {
    return sumQuotaAmount(grant.max, grant.sum);
  } else {
    return 0;
  }
}
