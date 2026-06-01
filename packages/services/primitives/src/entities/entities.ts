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
  team: {
    name: "team",
    code: "tem",
  },
  /**
   * Represents an invitation for a user to join an organization.
   */
  teamInvite: {
    name: "team_invite",
    code: "tiv",
  },
  /**
   * Represents a membership for a user in an organization.
   */
  teamMembership: {
    name: "team_membership",
    code: "tmb",
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

  // Workspace
  /**
   * Represents a workspace.
   */
  workspace: {
    name: "workspace",
    code: "wks",
  },
  /**
   * Represents a board in a workspace.
   */
  board: {
    name: "board",
    code: "brd",
  },
  /**
   * Represents a component in a workspace.
   */
  component: {
    name: "component",
    code: "cmp",
  },
  /**
   * Represents a membership for a user in a workspace.
   */
  workspaceMembership: {
    name: "workspace_membership",
    code: "wmb",
  },
  /**
   * Represents an invitation for a user to join a workspace.
   */
  workspaceInvite: {
    name: "workspace_invite",
    code: "wiv",
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

  // Networking
  /**
   * Represents a domain name in the system.
   */
  domain: {
    name: "domain",
    code: "dom",
  },
  /**
   * Represents an SSL certificate in the system.
   */
  certificate: {
    name: "certificate",
    code: "crt",
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
  /**
   * Represents an OAuth client credential for connecting to external services.
   */
  oauthClient: {
    name: "oauth_client",
    code: "oac",
  },
  service: {
    name: "service",
    code: "srv",
  },
  serviceChannel: {
    name: "service_channel",
    code: "svc",
  },

  // Module
  /**
   * Represents a module.
   */
  module: {
    name: "module",
    code: "mod",
  },
  /**
   * Represents a version of a module.
   */
  moduleVersion: {
    name: "module_version",
    code: "mdv",
  },
  /**
   * Represents a collection of modules.
   */
  moduleCollection: {
    name: "module_collection",
    code: "mcl",
  },
  /**
   * Represents a setting.
   */
  setting: {
    name: "setting",
    code: "stg",
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
