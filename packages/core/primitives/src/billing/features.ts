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
    credits: {
      type: "QUOTA",
      code: "ai.credits",
      name: "AI Credits",
      description: "Allowance of credits for AI services",
      groupStrategy: "MONTH",
    },
  },

  /**
   * BUILDER & DEPLOYER SERVICES
   * Controls CI/CD pipelines, hosting, and domains.
   */
  build: {
    runs: {
      type: "QUOTA",
      code: "build.runs",
      name: "Build Runs",
      description: "Monthly execution time for build pipelines",
      groupStrategy: "MONTH",
    },
    minutes: {
      type: "QUOTA",
      code: "build.minutes",
      name: "Build Minutes",
      description: "Monthly execution time for build pipelines",
      groupStrategy: "MONTH",
    },
    concurrency: {
      type: "QUOTA",
      code: "build.concurrency",
      name: "Concurrent Builds",
      description: "Number of builds that can run simultaneously",
      groupStrategy: "MONTH",
    },
  },

  /**
   * DRIVE & REPOSITORY SERVICES
   * Controls storage limits and file history retention.
   */
  drive: {
    storage: {
      type: "QUOTA",
      code: "drive.storage",
      name: "Asset Storage",
      description: "Total storage for images, videos, and project files",
      groupStrategy: "LIFETIME",
    },
  },

  /**
   * IDE & IDENTITY SERVICES
   * Controls collaboration, teams, and developer tools.
   */
  collaboration: {
    seats: {
      type: "QUOTA",
      code: "collaboration.seats",
      name: "Team Seats",
      description: "Number of collaborators allowed in the organization",
      groupStrategy: "LIFETIME",
    },
  },
} satisfies FeatureRecord;
