/* ========================================================================
   Feature Definition Types (Unchanged)
   ======================================================================== */
export type BaseFeature<T extends string> = {
  type: T;
  code: string;
  name: string;
  description: string;
};

export type QuotaFeature = BaseFeature<"QUOTA"> & {
  groupStrategy: "DAY" | "WEEK" | "MONTH" | "YEAR" | "LIFETIME";
};

export type AccessFeature = BaseFeature<"ACCESS">;

export type Feature = QuotaFeature | AccessFeature;

export type FeatureRecord = {
  [key: string]: Feature | FeatureRecord;
};

/* ========================================================================
   Elementa Platform Catalog
   ======================================================================== */

export const ubentoFeatures = {
  /**
   * INTELLIGENCE SERVICE
   * Controls AI usage, model availability, and context windows.
   */
  ai: {
    weeklyCredits: {
      type: "QUOTA",
      code: "ai.weekly_credits",
      name: "Weekly AI Credits",
      description: "Allowance of credits for AI services",
      groupStrategy: "WEEK",
    },
  },

  /**
   * VERTEX SERVICE
   * Controls external API requests and data fetching.
   */
  vertex: {
    weeklyRequests: {
      type: "QUOTA",
      code: "vertex.weekly_requests",
      name: "Weekly Vertex Requests",
      description: "Allowance for Vertex API requests",
      groupStrategy: "WEEK",
    },
  },
} satisfies FeatureRecord;
