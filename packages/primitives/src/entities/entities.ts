export interface EntityDefinition {
  name: string;
  code: string;
}

/**
 * Centralized list of all entities in the system.
 */
export const ubentoEntities = {
  // IAM
  /**
   * Represents a human being using the system.
   */
  user: {
    name: "user",
    code: "usr",
  },
  /**
   * Represents a session for a user.
   */
  session: {
    name: "session",
    code: "ses",
  },
  /**
   * Represents a unit of administrative agency. An organization may contain one or more users.
   */
  organization: {
    name: "organization",
    code: "org",
  },
  /**
   * Represents an invitation for a user to join an organization.
   */
  organizationInvite: {
    name: "organization_invite",
    code: "oiv",
  },
  /**
   * Represents a membership for a user in an organization.
   */
  organizationMembership: {
    name: "organization_membership",
    code: "omb",
  },
  /**
   * Represents a client application.
   */
  client: {
    name: "client",
    code: "clt",
  },
  /**
   * Represents a credential for a client application.
   */
  clientCredential: {
    name: "client_credential",
    code: "ccd",
  },
  /**
   * Represents a JWT signing key.
   */
  jwtSigningKey: {
    name: "jwt_signing_key",
    code: "jsk",
  },
  /**
   * Represents an identity webhook event.
   */
  identityWebhookEvent: {
    name: "identity_webhook_event",
    code: "iwe",
  },
  /**
   * Represents a scope kind.
   */
  scopeKind: {
    name: "scope_kind",
    code: "skk",
  },
  /**
   * Represents a scope.
   */
  scope: {
    name: "scope",
    code: "scp",
  },
  /**
   * Represents a role.
   */
  role: {
    name: "role",
    code: "rol",
  },
  /**
   * Represents a role assignment.
   */
  roleAssignment: {
    name: "role_assignment",
    code: "ras",
  },
  // Workspace
  /**
   * Represents a development environment for users to collaborate.
   */
  workspace: {
    name: "workspace",
    code: "wks",
  },
  /**
   * Represents a file within a workspace.
   */
  workspaceFile: {
    name: "workspace_file",
    code: "wfl",
  },
  /**
   * Represents the content for a workspace file.
   */
  workspaceFileContent: {
    name: "workspace_file_content",
    code: "wfc",
  },

  // Repository
  /**
   * Represents a repository of code and other files.
   */
  repository: {
    name: "repository",
    code: "rpo",
  },
  /**
   * Represents a snapshot of a repository at a specific point in time.
   */
  commit: {
    name: "commit",
    code: "com",
  },
  /**
   * Represents references to a snapshot of a repository.
   */
  repositoryTag: {
    name: "repository_tag",
    code: "rtg",
  },
  /**
   * Represents a file within a commit.
   */
  commitFile: {
    name: "commit_file",
    code: "cfl",
  },

  // Intelligence
  /**
   * Represents a conversation thread with an AI agent.
   */
  intelligenceThread: {
    name: "intelligence_thread",
    code: "ith",
  },
  /**
   * Represents an entry within an intelligence thread.
   */
  intelligenceMessage: {
    name: "intelligence_message",
    code: "ime",
  },
  /**
   * Represents a file within an intelligence thread.
   */
  intelligenceFile: {
    name: "intelligence_file",
    code: "itf",
  },

  // System
  /**
   * Represents a configuration value in the system.
   */
  configuration: {
    name: "configuration",
    code: "cfg",
  },

  // Storage
  /**
   * Represents a storage drive in the system.
   */
  drive: {
    name: "drive",
    code: "drv",
  },
  /**
   * Represents a file within a storage drive.
   */
  driveFile: {
    name: "drive_file",
    code: "dfl",
  },

  // Deployment
  /**
   * Represents a deployment entity.
   */
  deployment: {
    name: "deployment",
    code: "dpl",
  },

  // Logging
  /**
   * Represents a log entry in the system.
   */
  log: {
    name: "log",
    code: "log",
  },
  /**
   * Represents a log sink in the system.
   */
  logSink: {
    name: "log_sink",
    code: "lgs",
  },

  // Networking
  /**
   * Represents a domain name in the system.
   */
  domain: {
    name: "domain",
    code: "dom",
  },
  /**
   * Represents a deployment pointer in the system.
   */
  pointer: {
    name: "pointer",
    code: "ptr",
  },
  /**
   * Represents an SSL certificate in the system.
   */
  certificate: {
    name: "certificate",
    code: "crt",
  },

  // Functions
  /**
   * Represents a function in the system.
   */
  function: {
    name: "function",
    code: "fnc",
  },
  /**
   * Represents a function version in the system.
   */
  functionVersion: {
    name: "function_version",
    code: "fnv",
  },
  /**
   * Represents a function invocation in the system.
   */
  invocation: {
    name: "invocation",
    code: "ivc",
  },

  // Environments
  /**
   * Represents a deployment environment.
   */
  environment: {
    name: "environment",
    code: "env",
  },
  /**
   * Represents an environment variable (plain or sensitive).
   */
  environmentVariable: {
    name: "environment_variable",
    code: "evr",
  },

  // Libraries
  /**
   * Represents a library of reusable code and resources.
   */
  library: {
    name: "library",
    code: "lbr",
  },
  /**
   * Represents a specific version of a library.
   */
  libraryVersion: {
    name: "library_version",
    code: "lbv",
  },

  // Billing
  /**
   * Represents a product in the billing catalog.
   */
  billingProduct: {
    name: "billing_product",
    code: "bpd",
  },
  /**
   * Represents a purchasable plan/bundle with entitlements.
   */
  billingOffer: {
    name: "billing_offer",
    code: "bof",
  },
  /**
   * Links billing provider entities to internal resources.
   */
  billingProviderLink: {
    name: "billing_provider_link",
    code: "bpl",
  },
  /**
   * Represents a feature that can be granted/limited by an offer.
   */
  billingFeature: {
    name: "billing_feature",
    code: "bft",
  },
  /**
   * Per-organization wallet for prepaid credits (minor units).
   */
  billingCreditWallet: {
    name: "billing_credit_wallet",
    code: "bcw",
  },
  /**
   * A credit wallet transaction (debit/credit) with reason & refs.
   */
  billingCreditTransaction: {
    name: "billing_credit_transaction",
    code: "bct",
  },
  /**
   * A temporary hold on credits that can be committed, released, or expired.
   */
  billingCreditHold: {
    name: "billing_credit_hold",
    code: "bch",
  },
  /**
   * A organization’s subscription to an offer (by provider/env).
   */
  billingSubscription: {
    name: "billing_subscription",
    code: "bsu",
  },
  /**
   * A subscription invoice snapshot with totals and status.
   */
  billingSubscriptionInvoice: {
    name: "billing_subscription_invoice",
    code: "bsi",
  },
  /**
   * Per-organization counter tracking usage of a specific resource or feature.
   */
  billingUsageCounter: {
    name: "billing_usage_counter",
    code: "buc",
  },
  /**
   * A temporary hold on usage that can be committed, released, or expired.
   */
  billingUsageHold: {
    name: "billing_usage_hold",
    code: "buh",
  },
  /**
   * Individual usage event recording consumption of a resource or feature.
   */
  billingUsageEvent: {
    name: "billing_usage_event",
    code: "bue",
  },
  /**
   * A normalized order (checkout/purchase) with line items.
   */
  billingOrder: {
    name: "billing_order",
    code: "bor",
  },
  /**
   * Represents a checkout session for purchasing products or subscriptions.
   */
  billingCheckout: {
    name: "billing_checkout",
    code: "bco",
  },
  /**
   * Raw inbound billing webhook payload and its processing state.
   */
  billingWebhookEvent: {
    name: "billing_webhook_event",
    code: "bwe",
  },

  // Build
  /**
   * Represents a build produced from a commit for a given pipeline.
   * Tracks lifecycle status (queued, started, ended) and links to a log sink.
   */
  build: {
    name: "build",
    code: "bld",
  },
  /**
   * Represents a build pipeline configuration for a repository.
   * Contains configuration for automated builds and deployment.
   */
  pipeline: {
    name: "pipeline",
    code: "pip",
  },
  /**
   * Represents a task definition in the build system.
   * Tasks are reusable units of work that can be referenced by pipelines.
   */
  task: {
    name: "task",
    code: "tsk",
  },
  /**
   * Represents a versioned task in the build system.
   * Each task can have multiple versions identified by semantic versioning.
   */
  taskVersion: {
    name: "task_version",
    code: "tsv",
  },
  /**
   * Represents a variable in the build system.
   * Can be plain text or encrypted for sensitive values.
   */
  variable: {
    name: "variable",
    code: "var",
  },

  // Extensions
  /**
   * Represents a reusable module extending Ubento functionally.
   */
  extension: {
    name: "extension",
    code: "ext",
  },
  /**
   * Represents a specific semantic version of an extension.
   */
  extensionVersion: {
    name: "extension_version",
    code: "exv",
  },

  // Connection Provider
  /**
   * Represents a external service that can be connected to.
   */
  connectionProvider: {
    name: "connection_provider",
    code: "cnp",
  },
  /**
   * Represents a connection to a external service.
   */
  connection: {
    name: "connection",
    code: "cnn",
  },
} as const;

// Ensure all entities are unique
const entityNames = new Set<string>();
const entityCodes = new Set<string>();
for (const entity of Object.values(ubentoEntities)) {
  if (entityNames.has(entity.name)) {
    throw new Error(`Duplicate entity name: ${entity.name}`);
  }
  if (entityCodes.has(entity.code)) {
    throw new Error(`Duplicate entity code: ${entity.code}`);
  }
  entityNames.add(entity.name);
  entityCodes.add(entity.code);
}

export type EntityName =
  (typeof ubentoEntities)[keyof typeof ubentoEntities]["name"];

const entitiesByName = Object.fromEntries(
  Object.entries(ubentoEntities).map(([_, value]) => [value.name, value]),
) as Record<EntityName, EntityDefinition>;

const entitiesByCode = Object.fromEntries(
  Object.entries(ubentoEntities).map(([_, value]) => [value.code, value]),
) as Record<string, EntityDefinition>;

export function getEntityByName(
  name: EntityName,
): EntityDefinition | undefined {
  return entitiesByName[name];
}
export function getEntityByCode(code: string): EntityDefinition | undefined {
  return entitiesByCode[code];
}
