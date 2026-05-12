import type { ServiceSpecV1 } from "@ubento/vertex.core";

export const spec: ServiceSpecV1 = {
  spec: 1,
  name: "clerk",
  type: "http",
  connection: {
    provider: "clerk",
    baseUrl: "https://api.clerk.com/v1",
  },
  schemas: {
    "JWKS.ed25519.PublicKey": {
      type: "object",
      properties: {
        kid: {
          type: "string",
        },
        alg: {
          type: "string",
        },
        use: {
          type: "string",
        },
        kty: {
          type: "string",
        },
        crv: {
          type: "string",
        },
        x: {
          type: "string",
        },
        x5c: {
          type: "array",
          items: {
            type: "string",
          },
        },
        x5t: {
          type: "string",
        },
        "x5t#S256": {
          type: "string",
        },
        x5u: {
          type: "string",
        },
      },
      required: ["kid", "alg", "use", "kty", "crv", "x"],
    },
    "JWKS.ecdsa.PublicKey": {
      type: "object",
      properties: {
        kid: {
          type: "string",
        },
        alg: {
          type: "string",
        },
        use: {
          type: "string",
        },
        kty: {
          type: "string",
        },
        crv: {
          type: "string",
        },
        x: {
          type: "string",
        },
        y: {
          type: "string",
        },
        x5c: {
          type: "array",
          items: {
            type: "string",
          },
        },
        x5t: {
          type: "string",
        },
        "x5t#S256": {
          type: "string",
        },
        x5u: {
          type: "string",
        },
      },
      required: ["kid", "alg", "use", "kty", "crv", "x", "y"],
    },
    "JWKS.rsa.PublicKey": {
      type: "object",
      properties: {
        kid: {
          type: "string",
        },
        alg: {
          type: "string",
        },
        use: {
          type: "string",
        },
        kty: {
          type: "string",
        },
        n: {
          type: "string",
        },
        e: {
          type: "string",
        },
        x5c: {
          type: "array",
          items: {
            type: "string",
          },
        },
        x5t: {
          type: "string",
        },
        "x5t#S256": {
          type: "string",
        },
        x5u: {
          type: "string",
        },
      },
      required: ["kid", "alg", "use", "kty", "n", "e"],
    },
    "JWKS.ed25519.PrivateKey": {
      type: "object",
      properties: {
        kid: {
          type: "string",
        },
        alg: {
          type: "string",
        },
        use: {
          type: "string",
        },
        kty: {
          type: "string",
        },
        crv: {
          type: "string",
        },
        x: {
          type: "string",
        },
        d: {
          type: "string",
        },
        x5c: {
          type: "array",
          items: {
            type: "string",
          },
        },
        x5t: {
          type: "string",
        },
        "x5t#S256": {
          type: "string",
        },
        x5u: {
          type: "string",
        },
      },
      required: ["kid", "alg", "use", "kty", "crv", "x", "d"],
    },
    "JWKS.ecdsa.PrivateKey": {
      type: "object",
      properties: {
        kid: {
          type: "string",
        },
        alg: {
          type: "string",
        },
        use: {
          type: "string",
        },
        kty: {
          type: "string",
        },
        crv: {
          type: "string",
        },
        x: {
          type: "string",
        },
        y: {
          type: "string",
        },
        d: {
          type: "string",
        },
        x5c: {
          type: "array",
          items: {
            type: "string",
          },
        },
        x5t: {
          type: "string",
        },
        "x5t#S256": {
          type: "string",
        },
        x5u: {
          type: "string",
        },
      },
      required: ["kid", "alg", "use", "kty", "crv", "x", "y", "d"],
    },
    "JWKS.rsa.PrivateKey": {
      type: "object",
      properties: {
        kid: {
          type: "string",
        },
        alg: {
          type: "string",
        },
        use: {
          type: "string",
        },
        kty: {
          type: "string",
        },
        n: {
          type: "string",
        },
        e: {
          type: "string",
        },
        d: {
          type: "string",
        },
        p: {
          type: "string",
        },
        q: {
          type: "string",
        },
        dp: {
          type: "string",
        },
        dq: {
          type: "string",
        },
        qi: {
          type: "string",
        },
        x5c: {
          type: "array",
          items: {
            type: "string",
          },
        },
        x5t: {
          type: "string",
        },
        "x5t#S256": {
          type: "string",
        },
        x5u: {
          type: "string",
        },
      },
      required: ["kid", "alg", "use", "kty", "crv", "n", "e", "d", "p", "q"],
    },
    "JWKS.symmetric.Key": {
      type: "object",
      properties: {
        kid: {
          type: "string",
        },
        alg: {
          type: "string",
        },
        use: {
          type: "string",
        },
        kty: {
          type: "string",
        },
        k: {
          type: "string",
        },
        x5c: {
          type: "array",
          items: {
            type: "string",
          },
        },
        x5t: {
          type: "string",
        },
        "x5t#S256": {
          type: "string",
        },
        x5u: {
          type: "string",
        },
      },
      required: ["kid", "alg", "use", "kty", "k"],
    },
    JWKS: {
      type: "object",
      properties: {
        keys: {
          type: "array",
          items: {
            type: "ref",
            ref: "JWKS.ed25519.PublicKey",
          },
        },
      },
    },
    SessionActivityResponse: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        device_type: {
          type: "string",
        },
        is_mobile: {
          type: "boolean",
        },
        browser_name: {
          type: "string",
        },
        browser_version: {
          type: "string",
        },
        ip_address: {
          type: "string",
        },
        city: {
          type: "string",
        },
        country: {
          type: "string",
        },
      },
      required: ["id", "object", "is_mobile"],
    },
    SessionTask: {
      type: "object",
      properties: {
        key: {
          type: "string",
        },
      },
      required: ["key"],
    },
    Session: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        user_id: {
          type: "string",
        },
        client_id: {
          type: "string",
        },
        actor: {
          type: "object",
          properties: {},
        },
        status: {
          type: "string",
        },
        last_active_organization_id: {
          type: "string",
        },
        last_active_at: {
          type: "number",
        },
        latest_activity: {
          type: "ref",
          ref: "SessionActivityResponse",
        },
        expire_at: {
          type: "number",
        },
        abandon_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
        created_at: {
          type: "number",
        },
        tasks: {
          type: "array",
          items: {
            type: "ref",
            ref: "SessionTask",
          },
        },
      },
      required: [
        "object",
        "id",
        "user_id",
        "client_id",
        "status",
        "last_active_at",
        "expire_at",
        "abandon_at",
        "updated_at",
        "created_at",
      ],
    },
    Client: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        session_ids: {
          type: "array",
          items: {
            type: "string",
          },
        },
        sessions: {
          type: "array",
          items: {
            type: "ref",
            ref: "Session",
          },
        },
        sign_in_id: {
          type: "string",
        },
        sign_up_id: {
          type: "string",
        },
        last_active_session_id: {
          type: "string",
        },
        last_authentication_strategy: {
          type: "string",
        },
        updated_at: {
          type: "number",
        },
        created_at: {
          type: "number",
        },
      },
      required: [
        "object",
        "id",
        "session_ids",
        "sessions",
        "sign_in_id",
        "sign_up_id",
        "last_active_session_id",
        "last_authentication_strategy",
        "updated_at",
        "created_at",
      ],
    },
    ClerkError: {
      type: "object",
      properties: {
        message: {
          type: "string",
        },
        long_message: {
          type: "string",
        },
        code: {
          type: "string",
        },
        meta: {
          type: "object",
          properties: {},
        },
      },
      required: ["message", "long_message", "code"],
    },
    ClerkErrors: {
      type: "object",
      properties: {
        errors: {
          type: "array",
          items: {
            type: "ref",
            ref: "ClerkError",
          },
        },
        meta: {
          type: "object",
          properties: {},
        },
        clerk_trace_id: {
          type: "string",
        },
      },
      required: ["errors"],
    },
    verification_otp: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        status: {
          type: "string",
        },
        strategy: {
          type: "string",
        },
        attempts: {
          type: "number",
        },
        expire_at: {
          type: "number",
        },
        verified_at_client: {
          type: "string",
        },
      },
      required: ["status", "strategy", "attempts", "expire_at"],
    },
    verification_admin: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        status: {
          type: "string",
        },
        strategy: {
          type: "string",
        },
        attempts: {
          type: "number",
        },
        expire_at: {
          type: "number",
        },
        verified_at_client: {
          type: "string",
        },
      },
      required: ["status", "strategy", "attempts", "expire_at"],
    },
    verification_from_oauth: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        status: {
          type: "string",
        },
        strategy: {
          type: "string",
        },
        error: {
          type: "ref",
          ref: "ClerkError",
        },
        expire_at: {
          type: "number",
        },
        attempts: {
          type: "number",
        },
        verified_at_client: {
          type: "string",
        },
      },
      required: ["status", "strategy", "attempts", "expire_at"],
    },
    verification_ticket: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        status: {
          type: "string",
        },
        strategy: {
          type: "string",
        },
        attempts: {
          type: "number",
        },
        expire_at: {
          type: "number",
        },
        verified_at_client: {
          type: "string",
        },
      },
      required: ["status", "strategy", "attempts", "expire_at"],
    },
    verification_saml: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        status: {
          type: "string",
        },
        strategy: {
          type: "string",
        },
        external_verification_redirect_url: {
          type: "string",
        },
        error: {
          type: "ref",
          ref: "ClerkError",
        },
        expire_at: {
          type: "number",
        },
        attempts: {
          type: "number",
        },
        verified_at_client: {
          type: "string",
        },
      },
      required: ["status", "strategy", "attempts"],
    },
    verification_email_link: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        status: {
          type: "string",
        },
        strategy: {
          type: "string",
        },
        attempts: {
          type: "number",
        },
        expire_at: {
          type: "number",
        },
        verified_at_client: {
          type: "string",
        },
      },
      required: ["status", "strategy", "attempts", "expire_at"],
    },
    IdentificationLink: {
      type: "object",
      properties: {
        type: {
          type: "string",
        },
        id: {
          type: "string",
        },
      },
      required: ["type", "id"],
    },
    EmailAddress: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        object: {
          type: "string",
        },
        email_address: {
          type: "string",
        },
        reserved: {
          type: "boolean",
        },
        verification: {
          type: "ref",
          ref: "verification_otp",
        },
        linked_to: {
          type: "array",
          items: {
            type: "ref",
            ref: "IdentificationLink",
          },
        },
        matches_sso_connection: {
          type: "boolean",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
      },
      required: [
        "object",
        "email_address",
        "verification",
        "linked_to",
        "reserved",
        "created_at",
        "updated_at",
      ],
    },
    DeletedObject: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        slug: {
          type: "string",
        },
        deleted: {
          type: "boolean",
        },
        external_id: {
          type: "string",
        },
      },
      required: ["object", "deleted"],
    },
    PhoneNumber: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        object: {
          type: "string",
        },
        phone_number: {
          type: "string",
        },
        reserved_for_second_factor: {
          type: "boolean",
        },
        default_second_factor: {
          type: "boolean",
        },
        reserved: {
          type: "boolean",
        },
        verification: {
          type: "ref",
          ref: "verification_otp",
        },
        linked_to: {
          type: "array",
          items: {
            type: "ref",
            ref: "IdentificationLink",
          },
        },
        backup_codes: {
          type: "array",
          items: {
            type: "string",
          },
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
      },
      required: [
        "object",
        "phone_number",
        "verification",
        "linked_to",
        "reserved",
        "created_at",
        "updated_at",
      ],
    },
    Token: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        jwt: {
          type: "string",
        },
      },
      required: ["object", "jwt"],
    },
    Cookies: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        cookies: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      required: ["object", "cookies"],
    },
    SessionRefresh: {
      type: "ref",
      ref: "Token",
    },
    Template: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        object: {
          type: "string",
        },
        instance_id: {
          type: "string",
        },
        resource_type: {
          type: "string",
        },
        template_type: {
          type: "string",
        },
        name: {
          type: "string",
        },
        slug: {
          type: "string",
        },
        position: {
          type: "number",
        },
        can_revert: {
          type: "boolean",
        },
        can_delete: {
          type: "boolean",
        },
        can_edit_body: {
          type: "boolean",
        },
        can_toggle: {
          type: "boolean",
        },
        subject: {
          type: "string",
        },
        markup: {
          type: "string",
        },
        body: {
          type: "string",
        },
        available_variables: {
          type: "array",
          items: {
            type: "string",
          },
        },
        required_variables: {
          type: "array",
          items: {
            type: "string",
          },
        },
        from_email_name: {
          type: "string",
        },
        reply_to_email_name: {
          type: "string",
        },
        delivered_by_clerk: {
          type: "boolean",
        },
        enabled: {
          type: "boolean",
        },
        flagged_as_suspicious: {
          type: "boolean",
        },
        updated_at: {
          type: "number",
        },
        created_at: {
          type: "number",
        },
      },
    },
    verification_web3: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        status: {
          type: "string",
        },
        strategy: {
          type: "string",
        },
        nonce: {
          type: "string",
        },
        message: {
          type: "string",
        },
        attempts: {
          type: "number",
        },
        expire_at: {
          type: "number",
        },
        verified_at_client: {
          type: "string",
        },
      },
      required: ["status", "strategy", "attempts", "expire_at"],
    },
    Web3Wallet: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        object: {
          type: "string",
        },
        web3_wallet: {
          type: "string",
        },
        verification: {
          type: "ref",
          ref: "verification_web3",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
      },
      required: [
        "object",
        "web3_wallet",
        "verification",
        "created_at",
        "updated_at",
      ],
    },
    verification_passkey: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        status: {
          type: "string",
        },
        strategy: {
          type: "string",
        },
        nonce: {
          type: "string",
        },
        message: {
          type: "string",
        },
        attempts: {
          type: "number",
        },
        expire_at: {
          type: "number",
        },
        verified_at_client: {
          type: "string",
        },
      },
      required: ["status", "strategy", "attempts", "expire_at"],
    },
    Passkey: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        object: {
          type: "string",
        },
        name: {
          type: "string",
        },
        last_used_at: {
          type: "number",
        },
        verification: {
          type: "ref",
          ref: "verification_passkey",
        },
      },
      required: ["object", "name", "last_used_at", "verification"],
    },
    verification_oauth: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        status: {
          type: "string",
        },
        strategy: {
          type: "string",
        },
        external_verification_redirect_url: {
          type: "string",
        },
        error: {
          type: "ref",
          ref: "ClerkError",
        },
        expire_at: {
          type: "number",
        },
        attempts: {
          type: "number",
        },
        verified_at_client: {
          type: "string",
        },
      },
      required: ["status", "strategy", "attempts", "expire_at"],
    },
    verification_google_one_tap: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        status: {
          type: "string",
        },
        strategy: {
          type: "string",
        },
        expire_at: {
          type: "number",
        },
        attempts: {
          type: "number",
        },
        verified_at_client: {
          type: "string",
        },
        error: {
          type: "ref",
          ref: "ClerkError",
        },
      },
      required: ["status", "strategy", "attempts", "expire_at"],
    },
    ExternalAccountWithVerification: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        provider: {
          type: "string",
        },
        identification_id: {
          type: "string",
        },
        provider_user_id: {
          type: "string",
        },
        approved_scopes: {
          type: "string",
        },
        email_address: {
          type: "string",
        },
        email_address_verified: {
          type: "boolean",
        },
        first_name: {
          type: "string",
        },
        last_name: {
          type: "string",
        },
        avatar_url: {
          type: "string",
        },
        image_url: {
          type: "string",
        },
        username: {
          type: "string",
        },
        phone_number: {
          type: "string",
        },
        public_metadata: {
          type: "object",
          properties: {},
        },
        label: {
          type: "string",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
        verification: {
          type: "ref",
          ref: "verification_oauth",
        },
      },
      required: [
        "object",
        "id",
        "provider",
        "identification_id",
        "provider_user_id",
        "approved_scopes",
        "email_address",
        "first_name",
        "last_name",
        "public_metadata",
        "created_at",
        "updated_at",
        "verification",
      ],
    },
    SAMLAccountConnection: {
      type: "object",
      properties: {},
      required: ["domain"],
    },
    SAMLAccount: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        object: {
          type: "string",
        },
        provider: {
          type: "string",
        },
        active: {
          type: "boolean",
        },
        email_address: {
          type: "string",
        },
        first_name: {
          type: "string",
        },
        last_name: {
          type: "string",
        },
        provider_user_id: {
          type: "string",
        },
        last_authenticated_at: {
          type: "number",
        },
        public_metadata: {
          type: "object",
          properties: {},
        },
        verification: {
          type: "ref",
          ref: "verification_saml",
        },
        saml_connection: {
          type: "ref",
          ref: "SAMLAccountConnection",
        },
      },
      required: [
        "id",
        "object",
        "provider",
        "active",
        "email_address",
        "verification",
      ],
    },
    EnterpriseAccountConnection: {
      type: "object",
      properties: {},
      required: ["domain"],
    },
    EnterpriseAccount: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        object: {
          type: "string",
        },
        protocol: {
          type: "string",
        },
        provider: {
          type: "string",
        },
        active: {
          type: "boolean",
        },
        email_address: {
          type: "string",
        },
        first_name: {
          type: "string",
        },
        last_name: {
          type: "string",
        },
        provider_user_id: {
          type: "string",
        },
        enterprise_connection_id: {
          type: "string",
        },
        public_metadata: {
          type: "object",
          properties: {},
        },
        verification: {
          type: "ref",
          ref: "verification_ticket",
        },
        enterprise_connection: {
          type: "ref",
          ref: "EnterpriseAccountConnection",
        },
        last_authenticated_at: {
          type: "number",
        },
      },
      required: [
        "id",
        "object",
        "provider",
        "active",
        "email_address",
        "verification",
      ],
    },
    Organization: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        name: {
          type: "string",
        },
        slug: {
          type: "string",
        },
        image_url: {
          type: "string",
        },
        has_image: {
          type: "boolean",
        },
        members_count: {
          type: "number",
        },
        missing_member_with_elevated_permissions: {
          type: "boolean",
        },
        pending_invitations_count: {
          type: "number",
        },
        max_allowed_memberships: {
          type: "number",
        },
        admin_delete_enabled: {
          type: "boolean",
        },
        public_metadata: {
          type: "object",
          properties: {},
        },
        private_metadata: {
          type: "object",
          properties: {},
        },
        created_by: {
          type: "string",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
        last_active_at: {
          type: "number",
        },
        role_set_key: {
          type: "string",
        },
      },
      required: [
        "object",
        "id",
        "name",
        "slug",
        "has_image",
        "max_allowed_memberships",
        "admin_delete_enabled",
        "public_metadata",
        "created_at",
        "updated_at",
      ],
    },
    OrganizationMembershipPublicUserData: {
      type: "object",
      properties: {
        user_id: {
          type: "string",
        },
        first_name: {
          type: "string",
        },
        last_name: {
          type: "string",
        },
        profile_image_url: {
          type: "string",
        },
        image_url: {
          type: "string",
        },
        has_image: {
          type: "boolean",
        },
        identifier: {
          type: "string",
        },
        username: {
          type: "string",
        },
        banned: {
          type: "boolean",
        },
      },
      required: [
        "user_id",
        "first_name",
        "last_name",
        "profile_image_url",
        "image_url",
        "has_image",
      ],
    },
    OrganizationMembership: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        object: {
          type: "string",
        },
        role: {
          type: "string",
        },
        role_name: {
          type: "string",
        },
        permissions: {
          type: "array",
          items: {
            type: "string",
          },
        },
        public_metadata: {
          type: "object",
          properties: {},
        },
        private_metadata: {
          type: "object",
          properties: {},
        },
        organization: {
          type: "ref",
          ref: "Organization",
        },
        public_user_data: {
          type: "ref",
          ref: "OrganizationMembershipPublicUserData",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
      },
      required: [
        "object",
        "id",
        "role",
        "permissions",
        "public_metadata",
        "created_at",
        "updated_at",
        "organization",
      ],
    },
    SCIMUserMetadata: {
      type: "object",
      properties: {
        directory_id: {
          type: "string",
        },
        directory_enabled: {
          type: "boolean",
        },
        external_id: {
          type: "string",
        },
      },
      required: ["directory_id", "external_id"],
    },
    User: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        object: {
          type: "string",
        },
        external_id: {
          type: "string",
        },
        primary_email_address_id: {
          type: "string",
        },
        primary_phone_number_id: {
          type: "string",
        },
        primary_web3_wallet_id: {
          type: "string",
        },
        username: {
          type: "string",
        },
        first_name: {
          type: "string",
        },
        last_name: {
          type: "string",
        },
        locale: {
          type: "string",
        },
        profile_image_url: {
          type: "string",
        },
        image_url: {
          type: "string",
        },
        has_image: {
          type: "boolean",
        },
        public_metadata: {
          type: "object",
          properties: {},
        },
        private_metadata: {
          type: "object",
          properties: {},
        },
        unsafe_metadata: {
          type: "object",
          properties: {},
        },
        email_addresses: {
          type: "array",
          items: {
            type: "ref",
            ref: "EmailAddress",
          },
        },
        phone_numbers: {
          type: "array",
          items: {
            type: "ref",
            ref: "PhoneNumber",
          },
        },
        web3_wallets: {
          type: "array",
          items: {
            type: "ref",
            ref: "Web3Wallet",
          },
        },
        passkeys: {
          type: "array",
          items: {
            type: "ref",
            ref: "Passkey",
          },
        },
        password_enabled: {
          type: "boolean",
        },
        two_factor_enabled: {
          type: "boolean",
        },
        totp_enabled: {
          type: "boolean",
        },
        backup_code_enabled: {
          type: "boolean",
        },
        mfa_enabled_at: {
          type: "number",
        },
        mfa_disabled_at: {
          type: "number",
        },
        password_last_updated_at: {
          type: "number",
        },
        external_accounts: {
          type: "array",
          items: {
            type: "ref",
            ref: "ExternalAccountWithVerification",
          },
        },
        saml_accounts: {
          type: "array",
          items: {
            type: "ref",
            ref: "SAMLAccount",
          },
        },
        enterprise_accounts: {
          type: "array",
          items: {
            type: "ref",
            ref: "EnterpriseAccount",
          },
        },
        organization_memberships: {
          type: "array",
          items: {
            type: "ref",
            ref: "OrganizationMembership",
          },
        },
        last_sign_in_at: {
          type: "number",
        },
        banned: {
          type: "boolean",
        },
        locked: {
          type: "boolean",
        },
        deprovisioned: {
          type: "boolean",
        },
        lockout_expires_in_seconds: {
          type: "number",
        },
        verification_attempts_remaining: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
        created_at: {
          type: "number",
        },
        delete_self_enabled: {
          type: "boolean",
        },
        create_organization_enabled: {
          type: "boolean",
        },
        create_organizations_limit: {
          type: "number",
        },
        last_active_at: {
          type: "number",
        },
        legal_accepted_at: {
          type: "number",
        },
        bypass_client_trust: {
          type: "boolean",
        },
        scim: {
          type: "ref",
          ref: "SCIMUserMetadata",
        },
      },
      required: [
        "id",
        "object",
        "username",
        "first_name",
        "last_name",
        "has_image",
        "primary_email_address_id",
        "primary_phone_number_id",
        "primary_web3_wallet_id",
        "password_enabled",
        "two_factor_enabled",
        "totp_enabled",
        "backup_code_enabled",
        "email_addresses",
        "phone_numbers",
        "web3_wallets",
        "passkeys",
        "external_accounts",
        "saml_accounts",
        "enterprise_accounts",
        "public_metadata",
        "external_id",
        "last_sign_in_at",
        "banned",
        "locked",
        "lockout_expires_in_seconds",
        "verification_attempts_remaining",
        "created_at",
        "updated_at",
        "delete_self_enabled",
        "create_organization_enabled",
        "last_active_at",
        "mfa_enabled_at",
        "mfa_disabled_at",
        "legal_accepted_at",
      ],
    },
    PasswordHasher: {
      type: "string",
    },
    TotalCount: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        total_count: {
          type: "number",
        },
      },
      required: ["object", "total_count"],
    },
    CommerceMoneyResponse: {
      type: "object",
      properties: {
        amount: {
          type: "number",
        },
        amount_formatted: {
          type: "string",
        },
        currency: {
          type: "string",
        },
        currency_symbol: {
          type: "string",
        },
      },
      required: ["amount", "amount_formatted", "currency", "currency_symbol"],
    },
    CommerceSubscriptionCreditResponse: {
      type: "object",
      properties: {
        amount: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
        cycle_remaining_percent: {
          type: "number",
        },
      },
    },
    CommerceProrationCreditDetailResponse: {
      type: "object",
      properties: {
        amount: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
        cycle_days_remaining: {
          type: "number",
        },
        cycle_days_total: {
          type: "number",
        },
        cycle_remaining_percent: {
          type: "number",
        },
      },
      required: [
        "amount",
        "cycle_days_remaining",
        "cycle_days_total",
        "cycle_remaining_percent",
      ],
    },
    CommercePayerCreditResponse: {
      type: "object",
      properties: {
        remaining_balance: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
        applied_amount: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
      },
      required: ["remaining_balance", "applied_amount"],
    },
    CommerceCreditsResponse: {
      type: "object",
      properties: {
        proration: {
          type: "ref",
          ref: "CommerceProrationCreditDetailResponse",
        },
        payer: {
          type: "ref",
          ref: "CommercePayerCreditResponse",
        },
        total: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
      },
      required: ["proration", "payer", "total"],
    },
    FeatureResponse: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        name: {
          type: "string",
        },
        description: {
          type: "string",
        },
        slug: {
          type: "string",
        },
        avatar_url: {
          type: "string",
        },
      },
      required: ["object", "id", "name", "description", "slug", "avatar_url"],
    },
    CommercePlanUnitPriceTier: {
      type: "object",
      properties: {
        starts_at_block: {
          type: "number",
        },
        ends_after_block: {
          type: "number",
        },
        fee_per_block: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
      },
      required: ["starts_at_block", "fee_per_block"],
    },
    CommercePlanUnitPrice: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        block_size: {
          type: "number",
        },
        tiers: {
          type: "array",
          items: {
            type: "ref",
            ref: "CommercePlanUnitPriceTier",
          },
        },
      },
      required: ["name", "block_size", "tiers"],
    },
    CommercePlan: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        name: {
          type: "string",
        },
        fee: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
        annual_monthly_fee: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
        annual_fee: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
        description: {
          type: "string",
        },
        product_id: {
          type: "string",
        },
        is_default: {
          type: "boolean",
        },
        is_recurring: {
          type: "boolean",
        },
        publicly_visible: {
          type: "boolean",
        },
        has_base_fee: {
          type: "boolean",
        },
        for_payer_type: {
          type: "string",
        },
        slug: {
          type: "string",
        },
        avatar_url: {
          type: "string",
        },
        features: {
          type: "array",
          items: {
            type: "ref",
            ref: "FeatureResponse",
          },
        },
        free_trial_enabled: {
          type: "boolean",
        },
        free_trial_days: {
          type: "number",
        },
        unit_prices: {
          type: "array",
          items: {
            type: "ref",
            ref: "CommercePlanUnitPrice",
          },
        },
      },
      required: [
        "object",
        "id",
        "name",
        "fee",
        "annual_monthly_fee",
        "annual_fee",
        "description",
        "product_id",
        "is_default",
        "is_recurring",
        "publicly_visible",
        "has_base_fee",
        "for_payer_type",
        "slug",
        "avatar_url",
        "free_trial_enabled",
        "free_trial_days",
      ],
    },
    CommercePaymentMethodResponse: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        payer_id: {
          type: "string",
        },
        payment_type: {
          type: "string",
        },
        is_default: {
          type: "boolean",
        },
        gateway: {
          type: "string",
        },
        gateway_external_id: {
          type: "string",
        },
        gateway_external_account_id: {
          type: "string",
        },
        last4: {
          type: "string",
        },
        status: {
          type: "string",
        },
        wallet_type: {
          type: "string",
        },
        card_type: {
          type: "string",
        },
        expiry_year: {
          type: "number",
        },
        expiry_month: {
          type: "number",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
        is_removable: {
          type: "boolean",
        },
      },
      required: [
        "object",
        "id",
        "payer_id",
        "payment_type",
        "gateway",
        "gateway_external_id",
        "gateway_external_account_id",
        "last4",
        "status",
        "card_type",
      ],
    },
    CommerceSubscriptionItemNextPaymentResponse: {
      type: "object",
      properties: {
        amount: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
        date: {
          type: "number",
        },
      },
    },
    CommercePayerResponse: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        instance_id: {
          type: "string",
        },
        user_id: {
          type: "string",
        },
        first_name: {
          type: "string",
        },
        last_name: {
          type: "string",
        },
        email: {
          type: "string",
        },
        organization_id: {
          type: "string",
        },
        organization_name: {
          type: "string",
        },
        image_url: {
          type: "string",
        },
        credits_balance: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
      },
      required: ["object", "id", "instance_id"],
    },
    CommercePerUnitTotalTier: {
      type: "object",
      properties: {
        quantity: {
          type: "number",
        },
        fee_per_block: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
        total: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
      },
      required: ["fee_per_block", "total"],
    },
    CommerceSubscriptionItemSeatsResponse: {
      type: "object",
      properties: {
        quantity: {
          type: "number",
        },
        tiers: {
          type: "array",
          items: {
            type: "ref",
            ref: "CommercePerUnitTotalTier",
          },
        },
      },
      required: ["quantity"],
    },
    CommercePerUnitTotal: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        block_size: {
          type: "number",
        },
        tiers: {
          type: "array",
          items: {
            type: "ref",
            ref: "CommercePerUnitTotalTier",
          },
        },
      },
      required: ["name", "block_size", "tiers"],
    },
    CommerceTotalsResponse: {
      type: "object",
      properties: {
        subtotal: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
        base_fee: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
        tax_total: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
        grand_total: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
        per_unit_totals: {
          type: "array",
          items: {
            type: "ref",
            ref: "CommercePerUnitTotal",
          },
        },
        credits: {
          type: "ref",
          ref: "CommerceCreditsResponse",
        },
      },
      required: ["subtotal", "base_fee", "tax_total", "grand_total"],
    },
    CommerceSubscriptionItem: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        instance_id: {
          type: "string",
        },
        status: {
          type: "string",
        },
        credit: {
          type: "ref",
          ref: "CommerceSubscriptionCreditResponse",
        },
        credits: {
          type: "ref",
          ref: "CommerceCreditsResponse",
        },
        plan_id: {
          type: "string",
        },
        price_id: {
          type: "string",
        },
        plan: {
          type: "ref",
          ref: "CommercePlan",
        },
        plan_period: {
          type: "string",
        },
        payment_method: {
          type: "ref",
          ref: "CommercePaymentMethodResponse",
        },
        lifetime_paid: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
        next_payment: {
          type: "ref",
          ref: "CommerceSubscriptionItemNextPaymentResponse",
        },
        payer_id: {
          type: "string",
        },
        payer: {
          type: "ref",
          ref: "CommercePayerResponse",
        },
        is_free_trial: {
          type: "boolean",
        },
        period_start: {
          type: "number",
        },
        period_end: {
          type: "number",
        },
        proration_date: {
          type: "string",
        },
        canceled_at: {
          type: "number",
        },
        past_due_at: {
          type: "number",
        },
        ended_at: {
          type: "number",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
        seats: {
          type: "ref",
          ref: "CommerceSubscriptionItemSeatsResponse",
        },
        totals: {
          type: "ref",
          ref: "CommerceTotalsResponse",
        },
      },
      required: [
        "object",
        "id",
        "instance_id",
        "status",
        "plan_id",
        "plan_period",
        "payer_id",
        "is_free_trial",
        "period_start",
        "period_end",
        "canceled_at",
        "past_due_at",
        "ended_at",
      ],
    },
    CommerceSubscriptionNextPayment: {
      type: "object",
      properties: {
        date: {
          type: "number",
        },
        amount: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
      },
      required: ["date", "amount"],
    },
    CommerceSubscription: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        instance_id: {
          type: "string",
        },
        status: {
          type: "string",
        },
        payer_id: {
          type: "string",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
        active_at: {
          type: "number",
        },
        past_due_at: {
          type: "number",
        },
        subscription_items: {
          type: "array",
          items: {
            type: "ref",
            ref: "CommerceSubscriptionItem",
          },
        },
        next_payment: {
          type: "ref",
          ref: "CommerceSubscriptionNextPayment",
        },
        eligible_for_free_trial: {
          type: "boolean",
        },
      },
      required: [
        "object",
        "id",
        "instance_id",
        "status",
        "payer_id",
        "created_at",
        "updated_at",
        "active_at",
        "past_due_at",
        "subscription_items",
      ],
    },
    CommerceCreditBalanceResponse: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        balance: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
      },
      required: ["object", "balance"],
    },
    AdjustCreditBalanceRequest: {
      type: "object",
      properties: {
        amount: {
          type: "number",
        },
        action: {
          type: "string",
        },
        currency: {
          type: "string",
        },
        idempotency_key: {
          type: "string",
        },
        note: {
          type: "string",
        },
      },
      required: ["amount", "action", "idempotency_key"],
    },
    CommerceCreditLedgerResponse: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        payer_id: {
          type: "string",
        },
        amount: {
          type: "number",
        },
        currency: {
          type: "string",
        },
        source_type: {
          type: "string",
        },
        source_id: {
          type: "string",
        },
        note: {
          type: "string",
        },
        created_at: {
          type: "string",
        },
      },
      required: [
        "object",
        "id",
        "payer_id",
        "amount",
        "currency",
        "source_type",
        "source_id",
        "created_at",
      ],
    },
    OAuthAccessToken: {
      type: "array",
      items: {
        type: "object",
        properties: {
          object: {
            type: "string",
          },
          external_account_id: {
            type: "string",
          },
          provider_user_id: {
            type: "string",
          },
          token: {
            type: "string",
          },
          expires_at: {
            type: "number",
          },
          provider: {
            type: "string",
          },
          public_metadata: {
            type: "object",
            properties: {},
          },
          label: {
            type: "string",
          },
          scopes: {
            type: "array",
            items: {
              type: "string",
            },
          },
          id_token: {
            type: "string",
          },
          token_secret: {
            type: "string",
          },
        },
        required: [
          "object",
          "external_account_id",
          "provider_user_id",
          "token",
          "expires_at",
          "provider",
          "public_metadata",
          "label",
        ],
      },
    },
    OrganizationMemberships: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "ref",
            ref: "OrganizationMembership",
          },
        },
        total_count: {
          type: "number",
        },
      },
      required: ["data", "total_count"],
    },
    OrganizationInvitationPublicUserData: {
      type: "object",
      properties: {
        user_id: {
          type: "string",
        },
        first_name: {
          type: "string",
        },
        last_name: {
          type: "string",
        },
        image_url: {
          type: "string",
        },
        has_image: {
          type: "boolean",
        },
        identifier: {
          type: "string",
        },
      },
      required: [
        "user_id",
        "first_name",
        "last_name",
        "image_url",
        "has_image",
        "identifier",
      ],
    },
    OrganizationInvitationPublicOrganizationData: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        name: {
          type: "string",
        },
        slug: {
          type: "string",
        },
        image_url: {
          type: "string",
        },
        has_image: {
          type: "boolean",
        },
      },
      required: ["id", "name", "slug", "has_image"],
    },
    OrganizationInvitationWithPublicOrganizationData: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        email_address: {
          type: "string",
        },
        role: {
          type: "string",
        },
        role_name: {
          type: "string",
        },
        organization_id: {
          type: "string",
        },
        inviter_id: {
          type: "string",
        },
        public_inviter_data: {
          type: "ref",
          ref: "OrganizationInvitationPublicUserData",
        },
        status: {
          type: "string",
        },
        public_metadata: {
          type: "object",
          properties: {},
        },
        private_metadata: {
          type: "object",
          properties: {},
        },
        url: {
          type: "string",
        },
        expires_at: {
          type: "number",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
      },
    },
    OrganizationInvitationsWithPublicOrganizationData: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "ref",
            ref: "OrganizationInvitationWithPublicOrganizationData",
          },
        },
        total_count: {
          type: "number",
        },
      },
      required: ["data", "total_count"],
    },
    Invitation: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        email_address: {
          type: "string",
        },
        public_metadata: {
          type: "object",
          properties: {},
        },
        revoked: {
          type: "boolean",
        },
        status: {
          type: "string",
        },
        url: {
          type: "string",
        },
        expires_at: {
          type: "number",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
      },
      required: [
        "object",
        "id",
        "email_address",
        "public_metadata",
        "status",
        "created_at",
        "updated_at",
      ],
    },
    AllowlistIdentifier: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        invitation_id: {
          type: "string",
        },
        identifier: {
          type: "string",
        },
        identifier_type: {
          type: "string",
        },
        instance_id: {
          type: "string",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
      },
    },
    BlocklistIdentifier: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        identifier: {
          type: "string",
        },
        identifier_type: {
          type: "string",
        },
        instance_id: {
          type: "string",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
      },
    },
    BlocklistIdentifiers: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "ref",
            ref: "BlocklistIdentifier",
          },
        },
        total_count: {
          type: "number",
        },
      },
      required: ["data", "total_count"],
    },
    ActorToken: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        status: {
          type: "string",
        },
        user_id: {
          type: "string",
        },
        actor: {
          type: "object",
          properties: {},
        },
        token: {
          type: "string",
        },
        url: {
          type: "string",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
      },
      required: [
        "object",
        "id",
        "user_id",
        "actor",
        "status",
        "created_at",
        "updated_at",
      ],
    },
    CNameTarget: {
      type: "object",
      properties: {
        host: {
          type: "string",
        },
        value: {
          type: "string",
        },
        required: {
          type: "boolean",
        },
      },
      required: ["host", "value", "required"],
    },
    Domain: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        name: {
          type: "string",
        },
        is_satellite: {
          type: "boolean",
        },
        frontend_api_url: {
          type: "string",
        },
        accounts_portal_url: {
          type: "string",
        },
        proxy_url: {
          type: "string",
        },
        development_origin: {
          type: "string",
        },
        cname_targets: {
          type: "array",
          items: {
            type: "ref",
            ref: "CNameTarget",
          },
        },
      },
      required: [
        "object",
        "id",
        "name",
        "is_satellite",
        "frontend_api_url",
        "development_origin",
      ],
    },
    Domains: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "ref",
            ref: "Domain",
          },
        },
        total_count: {
          type: "number",
        },
      },
      required: ["data", "total_count"],
    },
    Instance: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        environment_type: {
          type: "string",
        },
        allowed_origins: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      required: ["object", "id", "environment_type", "allowed_origins"],
    },
    InstanceRestrictions: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        allowlist: {
          type: "boolean",
        },
        blocklist: {
          type: "boolean",
        },
        allowlist_blocklist_disabled_on_sign_in: {
          type: "boolean",
        },
        block_email_subaddresses: {
          type: "boolean",
        },
        block_disposable_email_domains: {
          type: "boolean",
        },
      },
      required: [
        "object",
        "allowlist",
        "blocklist",
        "allowlist_blocklist_disabled_on_sign_in",
        "block_email_subaddresses",
        "block_disposable_email_domains",
      ],
    },
    InstanceProtect: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        rules_enabled: {
          type: "boolean",
        },
        specter_enabled: {
          type: "boolean",
        },
      },
      required: ["object", "rules_enabled", "specter_enabled"],
    },
    InstanceCommunication: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        blocked_country_codes: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
      required: ["object", "blocked_country_codes"],
    },
    OAuthApplicationSettings: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        dynamic_oauth_client_registration: {
          type: "boolean",
        },
        oauth_jwt_access_tokens: {
          type: "boolean",
        },
      },
      required: [
        "object",
        "dynamic_oauth_client_registration",
        "oauth_jwt_access_tokens",
      ],
    },
    OrganizationSettings: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        enabled: {
          type: "boolean",
        },
        max_allowed_memberships: {
          type: "number",
        },
        max_allowed_roles: {
          type: "number",
        },
        max_role_sets_allowed: {
          type: "number",
        },
        max_allowed_domains: {
          type: "number",
        },
        max_allowed_permissions: {
          type: "number",
        },
        creator_role: {
          type: "string",
        },
        admin_delete_enabled: {
          type: "boolean",
        },
        domains_enabled: {
          type: "boolean",
        },
        slug_disabled: {
          type: "boolean",
        },
        domains_enrollment_modes: {
          type: "array",
          items: {
            type: "string",
          },
        },
        domains_default_role: {
          type: "string",
        },
        initial_role_set_key: {
          type: "string",
        },
      },
      required: [
        "object",
        "enabled",
        "max_allowed_memberships",
        "max_allowed_roles",
        "max_allowed_domains",
        "creator_role",
        "admin_delete_enabled",
        "domains_enabled",
        "domains_enrollment_modes",
        "domains_default_role",
      ],
    },
    SvixURL: {
      type: "object",
      properties: {
        svix_url: {
          type: "string",
        },
      },
      required: ["svix_url"],
    },
    JWTTemplate: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        name: {
          type: "string",
        },
        claims: {
          type: "object",
          properties: {},
        },
        lifetime: {
          type: "number",
        },
        allowed_clock_skew: {
          type: "number",
        },
        custom_signing_key: {
          type: "boolean",
        },
        signing_algorithm: {
          type: "string",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
      },
      required: [
        "object",
        "id",
        "name",
        "claims",
        "lifetime",
        "allowed_clock_skew",
        "custom_signing_key",
        "signing_algorithm",
        "created_at",
        "updated_at",
      ],
    },
    MachineWithoutScopedMachines: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        name: {
          type: "string",
        },
        instance_id: {
          type: "string",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
        default_token_ttl: {
          type: "number",
        },
      },
      required: [
        "object",
        "id",
        "name",
        "instance_id",
        "created_at",
        "updated_at",
      ],
    },
    Machine: {
      type: "ref",
      ref: "MachineWithoutScopedMachines",
    },
    MachineScope: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        from_machine_id: {
          type: "string",
        },
        to_machine_id: {
          type: "string",
        },
        created_at: {
          type: "number",
        },
      },
      required: ["object", "from_machine_id", "to_machine_id", "created_at"],
    },
    Organizations: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "ref",
            ref: "Organization",
          },
        },
        total_count: {
          type: "number",
        },
      },
      required: ["data", "total_count"],
    },
    OrganizationWithLogo: {
      type: "ref",
      ref: "Organization",
    },
    OrganizationInvitation: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        email_address: {
          type: "string",
        },
        role: {
          type: "string",
        },
        role_name: {
          type: "string",
        },
        organization_id: {
          type: "string",
        },
        inviter_id: {
          type: "string",
        },
        public_inviter_data: {
          type: "ref",
          ref: "OrganizationInvitationPublicUserData",
        },
        status: {
          type: "string",
        },
        public_metadata: {
          type: "object",
          properties: {},
        },
        private_metadata: {
          type: "object",
          properties: {},
        },
        url: {
          type: "string",
        },
        expires_at: {
          type: "number",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
      },
      required: [
        "object",
        "id",
        "email_address",
        "role",
        "role_name",
        "public_metadata",
        "url",
        "expires_at",
        "created_at",
        "updated_at",
        "inviter_id",
        "public_inviter_data",
      ],
    },
    OrganizationInvitations: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "ref",
            ref: "OrganizationInvitation",
          },
        },
        total_count: {
          type: "number",
        },
      },
      required: ["data", "total_count"],
    },
    Permission: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        name: {
          type: "string",
        },
        key: {
          type: "string",
        },
        description: {
          type: "string",
        },
        type: {
          type: "string",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
      },
      required: [
        "object",
        "id",
        "name",
        "key",
        "description",
        "type",
        "created_at",
        "updated_at",
      ],
    },
    Role: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        name: {
          type: "string",
        },
        key: {
          type: "string",
        },
        description: {
          type: "string",
        },
        is_creator_eligible: {
          type: "boolean",
        },
        permissions: {
          type: "array",
          items: {
            type: "ref",
            ref: "Permission",
          },
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
      },
      required: [
        "object",
        "id",
        "name",
        "key",
        "description",
        "is_creator_eligible",
        "permissions",
        "created_at",
        "updated_at",
      ],
    },
    Roles: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "ref",
            ref: "Role",
          },
        },
        total_count: {
          type: "number",
        },
      },
      required: ["data", "total_count"],
    },
    OrganizationDomainVerification: {
      type: "object",
      properties: {
        status: {
          type: "string",
        },
        strategy: {
          type: "string",
        },
        attempts: {
          type: "number",
        },
        expire_at: {
          type: "number",
        },
      },
      required: ["status", "strategy", "attempts", "expire_at"],
    },
    OrganizationDomain: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        organization_id: {
          type: "string",
        },
        name: {
          type: "string",
        },
        enrollment_mode: {
          type: "string",
        },
        affiliation_email_address: {
          type: "string",
        },
        verification: {
          type: "ref",
          ref: "OrganizationDomainVerification",
        },
        total_pending_invitations: {
          type: "number",
        },
        total_pending_suggestions: {
          type: "number",
        },
        public_organization_data: {
          type: "ref",
          ref: "OrganizationInvitationPublicOrganizationData",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
      },
      required: [
        "object",
        "id",
        "organization_id",
        "name",
        "enrollment_mode",
        "affiliation_email_address",
        "verification",
        "total_pending_invitations",
        "total_pending_suggestions",
        "created_at",
        "updated_at",
      ],
    },
    OrganizationDomains: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "ref",
            ref: "OrganizationDomain",
          },
        },
        total_count: {
          type: "number",
        },
      },
      required: ["data", "total_count"],
    },
    ProxyCheck: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        domain_id: {
          type: "string",
        },
        last_run_at: {
          type: "number",
        },
        proxy_url: {
          type: "string",
        },
        successful: {
          type: "boolean",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
      },
      required: [
        "object",
        "id",
        "domain_id",
        "last_run_at",
        "proxy_url",
        "successful",
        "created_at",
        "updated_at",
      ],
    },
    RedirectURL: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        url: {
          type: "string",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
      },
      required: ["object", "id", "url", "created_at", "updated_at"],
    },
    SignInToken: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        status: {
          type: "string",
        },
        user_id: {
          type: "string",
        },
        token: {
          type: "string",
        },
        url: {
          type: "string",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
      },
      required: [
        "object",
        "id",
        "user_id",
        "status",
        "created_at",
        "updated_at",
      ],
    },
    SignUpVerification: {
      type: "object",
      properties: {
        next_action: {
          type: "string",
        },
        supported_strategies: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
    },
    SignUpVerifications: {
      type: "object",
      properties: {
        email_address: {
          type: "ref",
          ref: "SignUpVerification",
        },
        phone_number: {
          type: "ref",
          ref: "SignUpVerification",
        },
        web3_wallet: {
          type: "ref",
          ref: "SignUpVerification",
        },
        external_account: {
          type: "object",
          properties: {},
        },
      },
      required: [
        "email_address",
        "phone_number",
        "web3_wallet",
        "external_account",
      ],
    },
    SignUp: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        status: {
          type: "string",
        },
        required_fields: {
          type: "array",
          items: {
            type: "string",
          },
        },
        optional_fields: {
          type: "array",
          items: {
            type: "string",
          },
        },
        missing_fields: {
          type: "array",
          items: {
            type: "string",
          },
        },
        unverified_fields: {
          type: "array",
          items: {
            type: "string",
          },
        },
        verifications: {
          type: "ref",
          ref: "SignUpVerifications",
        },
        username: {
          type: "string",
        },
        email_address: {
          type: "string",
        },
        phone_number: {
          type: "string",
        },
        web3_wallet: {
          type: "string",
        },
        password_enabled: {
          type: "boolean",
        },
        first_name: {
          type: "string",
        },
        last_name: {
          type: "string",
        },
        unsafe_metadata: {
          type: "object",
          properties: {},
        },
        public_metadata: {
          type: "object",
          properties: {},
        },
        custom_action: {
          type: "boolean",
        },
        external_id: {
          type: "string",
        },
        created_session_id: {
          type: "string",
        },
        created_user_id: {
          type: "string",
        },
        abandon_at: {
          type: "number",
        },
        legal_accepted_at: {
          type: "number",
        },
        locale: {
          type: "string",
        },
        external_account: {
          type: "object",
          properties: {},
        },
      },
      required: [
        "object",
        "id",
        "status",
        "required_fields",
        "optional_fields",
        "missing_fields",
        "unverified_fields",
        "verifications",
        "username",
        "email_address",
        "phone_number",
        "web3_wallet",
        "password_enabled",
        "first_name",
        "last_name",
        "custom_action",
        "external_id",
        "created_session_id",
        "created_user_id",
        "abandon_at",
        "legal_accepted_at",
      ],
    },
    OAuthApplication: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        instance_id: {
          type: "string",
        },
        name: {
          type: "string",
        },
        client_id: {
          type: "string",
        },
        client_uri: {
          type: "string",
        },
        client_image_url: {
          type: "string",
        },
        dynamically_registered: {
          type: "boolean",
        },
        consent_screen_enabled: {
          type: "boolean",
        },
        pkce_required: {
          type: "boolean",
        },
        public: {
          type: "boolean",
        },
        scopes: {
          type: "string",
        },
        redirect_uris: {
          type: "array",
          items: {
            type: "string",
          },
        },
        callback_url: {
          type: "string",
        },
        authorize_url: {
          type: "string",
        },
        token_fetch_url: {
          type: "string",
        },
        user_info_url: {
          type: "string",
        },
        discovery_url: {
          type: "string",
        },
        token_introspection_url: {
          type: "string",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
      },
      required: [
        "object",
        "id",
        "instance_id",
        "name",
        "dynamically_registered",
        "consent_screen_enabled",
        "pkce_required",
        "public",
        "client_id",
        "client_uri",
        "client_image_url",
        "scopes",
        "redirect_uris",
        "callback_url",
        "authorize_url",
        "token_fetch_url",
        "user_info_url",
        "discovery_url",
        "token_introspection_url",
        "created_at",
        "updated_at",
      ],
    },
    OAuthApplications: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "ref",
            ref: "OAuthApplication",
          },
        },
        total_count: {
          type: "number",
        },
      },
      required: ["data", "total_count"],
    },
    OAuthApplicationWithSecret: {
      type: "ref",
      ref: "OAuthApplication",
    },
    SAMLConnectionAttributeMapping: {
      type: "object",
      properties: {
        user_id: {
          type: "string",
        },
        email_address: {
          type: "string",
        },
        first_name: {
          type: "string",
        },
        last_name: {
          type: "string",
        },
      },
      required: ["user_id", "email_address", "first_name", "last_name"],
    },
    SAMLConnection: {
      type: "object",
      properties: {},
      required: ["domain"],
    },
    SAMLConnections: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "ref",
            ref: "SAMLConnection",
          },
        },
        total_count: {
          type: "number",
        },
      },
      required: ["data", "total_count"],
    },
    EnterpriseConnection: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
        name: {
          type: "string",
        },
        provider: {
          type: "string",
        },
        logo_public_url: {
          type: "string",
        },
        active: {
          type: "boolean",
        },
        domains: {
          type: "array",
          items: {
            type: "string",
          },
        },
        organization_id: {
          type: "string",
        },
        sync_user_attributes: {
          type: "boolean",
        },
        disable_additional_identifications: {
          type: "boolean",
        },
        allow_organization_account_linking: {
          type: "boolean",
        },
        custom_attributes: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              key: {
                type: "string",
              },
              sso_path: {
                type: "string",
              },
              scim_path: {
                type: "string",
              },
            },
            required: ["name", "key"],
          },
        },
        saml_connection: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            name: {
              type: "string",
            },
            idp_entity_id: {
              type: "string",
            },
            idp_sso_url: {
              type: "string",
            },
            idp_metadata_url: {
              type: "string",
            },
            acs_url: {
              type: "string",
            },
            sp_entity_id: {
              type: "string",
            },
            sp_metadata_url: {
              type: "string",
            },
            active: {
              type: "boolean",
            },
            allow_idp_initiated: {
              type: "boolean",
            },
            allow_subdomains: {
              type: "boolean",
            },
            force_authn: {
              type: "boolean",
            },
          },
        },
        oauth_config: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            name: {
              type: "string",
            },
            provider_key: {
              type: "string",
            },
            client_id: {
              type: "string",
            },
            discovery_url: {
              type: "string",
            },
            auth_url: {
              type: "string",
            },
            token_url: {
              type: "string",
            },
            user_info_url: {
              type: "string",
            },
            requires_pkce: {
              type: "boolean",
            },
            logo_public_url: {
              type: "string",
            },
            created_at: {
              type: "number",
            },
            updated_at: {
              type: "number",
            },
          },
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
      },
      required: [
        "id",
        "name",
        "provider",
        "active",
        "domains",
        "authenticatable",
        "created_at",
        "updated_at",
      ],
    },
    EnterpriseConnections: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "ref",
            ref: "EnterpriseConnection",
          },
        },
        total_count: {
          type: "number",
        },
      },
      required: ["data", "total_count"],
    },
    TestingToken: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        token: {
          type: "string",
        },
        expires_at: {
          type: "number",
        },
      },
      required: ["object", "token", "expires_at"],
    },
    AgentTask: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        agent_id: {
          type: "string",
        },
        agent_task_id: {
          type: "string",
        },
        task_id: {
          type: "string",
        },
        url: {
          type: "string",
        },
      },
      required: ["object", "agent_id", "agent_task_id", "task_id"],
    },
    WaitlistEntry: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        email_address: {
          type: "string",
        },
        status: {
          type: "string",
        },
        is_locked: {
          type: "boolean",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
        invitation: {
          type: "ref",
          ref: "Invitation",
        },
      },
      required: [
        "object",
        "id",
        "email_address",
        "status",
        "created_at",
        "updated_at",
      ],
    },
    PaginatedCommercePlanResponse: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "ref",
            ref: "CommercePlan",
          },
        },
        total_count: {
          type: "number",
        },
      },
      required: ["data", "total_count"],
    },
    BillingPriceResponse: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        plan_id: {
          type: "string",
        },
        instance_id: {
          type: "string",
        },
        currency: {
          type: "string",
        },
        currency_symbol: {
          type: "string",
        },
        amount: {
          type: "number",
        },
        annual_monthly_amount: {
          type: "number",
        },
        fee: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
        annual_monthly_fee: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
        description: {
          type: "string",
        },
        is_default: {
          type: "boolean",
        },
        created_at: {
          type: "number",
        },
      },
      required: [
        "object",
        "id",
        "plan_id",
        "instance_id",
        "currency",
        "currency_symbol",
        "amount",
        "annual_monthly_amount",
        "fee",
        "annual_monthly_fee",
        "is_default",
        "created_at",
      ],
    },
    PaginatedBillingPriceResponse: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "ref",
            ref: "BillingPriceResponse",
          },
        },
        total_count: {
          type: "number",
        },
      },
      required: ["data", "total_count"],
    },
    CreateBillingPriceRequest: {
      type: "object",
      properties: {
        plan_id: {
          type: "string",
        },
        currency: {
          type: "string",
        },
        amount: {
          type: "number",
        },
        annual_monthly_amount: {
          type: "number",
        },
        description: {
          type: "string",
        },
      },
      required: ["plan_id", "amount"],
    },
    PaginatedCommerceSubscriptionItemResponse: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "ref",
            ref: "CommerceSubscriptionItem",
          },
        },
        total_count: {
          type: "number",
        },
      },
      required: ["data", "total_count"],
    },
    ExtendFreeTrialRequest: {
      type: "object",
      properties: {
        extend_to: {
          type: "string",
        },
      },
      required: ["extend_to"],
    },
    "schemas-FeatureResponse": {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        name: {
          type: "string",
        },
        description: {
          type: "string",
        },
        slug: {
          type: "string",
        },
        avatar_url: {
          type: "string",
        },
      },
      required: ["object", "id", "name", "description", "slug", "avatar_url"],
    },
    "schemas-CommercePlan": {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        name: {
          type: "string",
        },
        fee: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
        annual_monthly_fee: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
        annual_fee: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
        amount: {
          type: "number",
        },
        amount_formatted: {
          type: "string",
        },
        annual_monthly_amount: {
          type: "number",
        },
        annual_monthly_amount_formatted: {
          type: "string",
        },
        annual_amount: {
          type: "number",
        },
        annual_amount_formatted: {
          type: "string",
        },
        currency_symbol: {
          type: "string",
        },
        currency: {
          type: "string",
        },
        description: {
          type: "string",
        },
        product_id: {
          type: "string",
        },
        is_default: {
          type: "boolean",
        },
        is_recurring: {
          type: "boolean",
        },
        publicly_visible: {
          type: "boolean",
        },
        has_base_fee: {
          type: "boolean",
        },
        payer_type: {
          type: "array",
          items: {
            type: "string",
          },
        },
        for_payer_type: {
          type: "string",
        },
        slug: {
          type: "string",
        },
        avatar_url: {
          type: "string",
        },
        period: {
          type: "string",
        },
        interval: {
          type: "number",
        },
        features: {
          type: "array",
          items: {
            type: "ref",
            ref: "schemas-FeatureResponse",
          },
        },
        free_trial_enabled: {
          type: "boolean",
        },
        free_trial_days: {
          type: "number",
        },
      },
      required: [
        "object",
        "id",
        "name",
        "fee",
        "annual_monthly_fee",
        "annual_fee",
        "amount",
        "amount_formatted",
        "annual_monthly_amount",
        "annual_monthly_amount_formatted",
        "annual_amount",
        "annual_amount_formatted",
        "currency_symbol",
        "currency",
        "description",
        "product_id",
        "is_default",
        "is_recurring",
        "publicly_visible",
        "has_base_fee",
        "payer_type",
        "for_payer_type",
        "slug",
        "avatar_url",
        "features",
      ],
    },
    CommercePaymentSourceResponse: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        payer_id: {
          type: "string",
        },
        payment_method: {
          type: "string",
        },
        is_default: {
          type: "boolean",
        },
        gateway: {
          type: "string",
        },
        gateway_external_id: {
          type: "string",
        },
        gateway_external_account_id: {
          type: "string",
        },
        last4: {
          type: "string",
        },
        status: {
          type: "string",
        },
        wallet_type: {
          type: "string",
        },
        card_type: {
          type: "string",
        },
        expiry_year: {
          type: "number",
        },
        expiry_month: {
          type: "number",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
        is_removable: {
          type: "boolean",
        },
      },
      required: [
        "object",
        "id",
        "payer_id",
        "payment_method",
        "gateway",
        "gateway_external_id",
        "last4",
        "status",
        "wallet_type",
        "card_type",
        "created_at",
        "updated_at",
      ],
    },
    "schemas-CommercePayerResponse": {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        instance_id: {
          type: "string",
        },
        user_id: {
          type: "string",
        },
        first_name: {
          type: "string",
        },
        last_name: {
          type: "string",
        },
        email: {
          type: "string",
        },
        organization_id: {
          type: "string",
        },
        organization_name: {
          type: "string",
        },
        image_url: {
          type: "string",
        },
        credits_balance: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
      },
      required: [
        "object",
        "id",
        "instance_id",
        "first_name",
        "last_name",
        "email",
        "image_url",
        "created_at",
        "updated_at",
      ],
    },
    "schemas-CommerceSubscriptionItem": {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        instance_id: {
          type: "string",
        },
        status: {
          type: "string",
        },
        credit: {
          type: "ref",
          ref: "CommerceSubscriptionCreditResponse",
        },
        plan_id: {
          type: "string",
        },
        price_id: {
          type: "string",
        },
        plan: {
          type: "ref",
          ref: "schemas-CommercePlan",
        },
        plan_period: {
          type: "string",
        },
        payment_source_id: {
          type: "string",
        },
        payment_source: {
          type: "ref",
          ref: "CommercePaymentSourceResponse",
        },
        lifetime_paid: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
        amount: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
        next_invoice: {
          type: "ref",
          ref: "CommerceSubscriptionItemNextPaymentResponse",
        },
        next_payment: {
          type: "ref",
          ref: "CommerceSubscriptionItemNextPaymentResponse",
        },
        payer_id: {
          type: "string",
        },
        payer: {
          type: "ref",
          ref: "schemas-CommercePayerResponse",
        },
        is_free_trial: {
          type: "boolean",
        },
        period_start: {
          type: "number",
        },
        period_end: {
          type: "number",
        },
        proration_date: {
          type: "string",
        },
        canceled_at: {
          type: "number",
        },
        past_due_at: {
          type: "number",
        },
        ended_at: {
          type: "number",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
      },
      required: [
        "object",
        "id",
        "instance_id",
        "status",
        "plan_id",
        "plan",
        "plan_period",
        "payment_source_id",
        "payer_id",
        "is_free_trial",
        "proration_date",
        "created_at",
        "updated_at",
      ],
    },
    PriceTransitionRequest: {
      type: "object",
      properties: {
        from_price_id: {
          type: "string",
        },
        to_price_id: {
          type: "string",
        },
      },
      required: ["from_price_id", "to_price_id"],
    },
    CommercePriceTransitionDetails: {
      type: "object",
      properties: {
        previous_plan: {
          type: "ref",
          ref: "schemas-CommercePlan",
        },
        previous_price: {
          type: "ref",
          ref: "BillingPriceResponse",
        },
        effective_at: {
          type: "number",
        },
        effective_mode: {
          type: "string",
        },
        next_billing_date: {
          type: "number",
        },
        charged_immediately: {
          type: "boolean",
        },
        immediate_charge: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
        previous_subscription_item_status: {
          type: "string",
        },
        previous_subscription_item_id: {
          type: "string",
        },
      },
      required: [
        "previous_plan",
        "previous_price",
        "effective_at",
        "effective_mode",
        "charged_immediately",
        "previous_subscription_item_status",
        "previous_subscription_item_id",
      ],
    },
    CommercePriceTransitionResponse: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        subscription_item: {
          type: "ref",
          ref: "schemas-CommerceSubscriptionItem",
        },
        transition: {
          type: "ref",
          ref: "CommercePriceTransitionDetails",
        },
      },
      required: ["object", "subscription_item", "transition"],
    },
    BillingPaymentAttempt: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        payment_id: {
          type: "string",
        },
        instance_id: {
          type: "string",
        },
        charge_type: {
          type: "string",
        },
        payee_id: {
          type: "string",
        },
        payee: {
          type: "object",
          properties: {},
        },
        payer_id: {
          type: "string",
        },
        payer: {
          type: "ref",
          ref: "CommercePayerResponse",
        },
        subscription_item_id: {
          type: "string",
        },
        subscription_item: {
          type: "object",
          properties: {},
        },
        amount: {
          type: "ref",
          ref: "CommerceMoneyResponse",
        },
        totals: {
          type: "ref",
          ref: "CommerceTotalsResponse",
        },
        payment_method_id: {
          type: "string",
        },
        payment_method: {
          type: "ref",
          ref: "CommercePaymentMethodResponse",
        },
        statement_id: {
          type: "string",
        },
        gateway_external_id: {
          type: "string",
        },
        gateway_external_url: {
          type: "string",
        },
        status: {
          type: "string",
        },
        paid_at: {
          type: "number",
        },
        failed_at: {
          type: "number",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
      },
      required: [
        "object",
        "id",
        "payment_id",
        "instance_id",
        "charge_type",
        "payee_id",
        "payee",
        "payer_id",
        "payer",
        "amount",
        "payment_method_id",
        "payment_method",
        "statement_id",
        "gateway_external_id",
        "gateway_external_url",
        "status",
        "paid_at",
        "failed_at",
        "created_at",
        "updated_at",
      ],
    },
    BillingStatement: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        instance_id: {
          type: "string",
        },
        timestamp: {
          type: "number",
        },
        payer: {
          type: "ref",
          ref: "CommercePayerResponse",
        },
        status: {
          type: "string",
        },
        totals: {
          type: "object",
          properties: {
            grand_total: {
              type: "ref",
              ref: "CommerceMoneyResponse",
            },
            subtotal: {
              type: "ref",
              ref: "CommerceMoneyResponse",
            },
            base_fee: {
              type: "ref",
              ref: "CommerceMoneyResponse",
            },
            tax_total: {
              type: "ref",
              ref: "CommerceMoneyResponse",
            },
          },
          required: ["grand_total", "subtotal", "base_fee", "tax_total"],
        },
        groups: {
          type: "array",
          items: {
            type: "object",
            properties: {
              object: {
                type: "string",
              },
              timestamp: {
                type: "number",
              },
              items: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "BillingPaymentAttempt",
                },
              },
            },
            required: ["object", "timestamp", "items"],
          },
        },
      },
      required: [
        "object",
        "id",
        "instance_id",
        "timestamp",
        "payer",
        "status",
        "totals",
        "groups",
      ],
    },
    PaginatedBillingStatementResponse: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "ref",
            ref: "BillingStatement",
          },
        },
        total_count: {
          type: "number",
        },
      },
      required: ["data", "total_count"],
    },
    PaginatedBillingPaymentAttemptResponse: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "ref",
            ref: "BillingPaymentAttempt",
          },
        },
        total_count: {
          type: "number",
        },
      },
      required: ["data", "total_count"],
    },
    Permissions: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "ref",
            ref: "Permission",
          },
        },
        total_count: {
          type: "number",
        },
      },
      required: ["data", "total_count"],
    },
    RoleSetItem: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        name: {
          type: "string",
        },
        key: {
          type: "string",
        },
        description: {
          type: "string",
        },
        members_count: {
          type: "number",
        },
        has_members: {
          type: "boolean",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
      },
      required: [
        "object",
        "id",
        "name",
        "key",
        "description",
        "created_at",
        "updated_at",
      ],
    },
    RoleSetMigration: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        organization_id: {
          type: "string",
        },
        instance_id: {
          type: "string",
        },
        source_role_set_id: {
          type: "string",
        },
        dest_role_set_id: {
          type: "string",
        },
        trigger_type: {
          type: "string",
        },
        status: {
          type: "string",
        },
        migrated_members: {
          type: "number",
        },
        mappings: {
          type: "object",
          properties: {},
        },
        started_at: {
          type: "number",
        },
        completed_at: {
          type: "number",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
      },
      required: [
        "object",
        "id",
        "instance_id",
        "source_role_set_id",
        "trigger_type",
        "status",
        "migrated_members",
        "created_at",
        "updated_at",
      ],
    },
    RoleSet: {
      type: "object",
      properties: {
        object: {
          type: "string",
        },
        id: {
          type: "string",
        },
        name: {
          type: "string",
        },
        key: {
          type: "string",
        },
        description: {
          type: "string",
        },
        roles: {
          type: "array",
          items: {
            type: "ref",
            ref: "RoleSetItem",
          },
        },
        default_role: {
          type: "ref",
          ref: "RoleSetItem",
        },
        creator_role: {
          type: "ref",
          ref: "RoleSetItem",
        },
        type: {
          type: "string",
        },
        role_set_migration: {
          type: "ref",
          ref: "RoleSetMigration",
        },
        created_at: {
          type: "number",
        },
        updated_at: {
          type: "number",
        },
      },
      required: [
        "object",
        "id",
        "name",
        "key",
        "description",
        "roles",
        "type",
        "created_at",
        "updated_at",
      ],
    },
    RoleSets: {
      type: "object",
      properties: {
        data: {
          type: "array",
          items: {
            type: "ref",
            ref: "RoleSet",
          },
        },
        total_count: {
          type: "number",
        },
      },
      required: ["data", "total_count"],
    },
    ReassignmentMappings: {
      type: "object",
      properties: {},
    },
  },
  entities: {},
  queries: {
    GetPublicInterstitial: {
      name: "Returns the markup for the interstitial page",
      schema: {
        type: "object",
      },
      args: {
        frontendApi: {
          schema: {
            type: "string",
          },
          required: false,
        },
        frontend_api: {
          schema: {
            type: "string",
          },
          required: false,
        },
        publishable_key: {
          schema: {
            type: "string",
          },
          required: false,
        },
        proxy_url: {
          schema: {
            type: "string",
          },
          required: false,
        },
        domain: {
          schema: {
            type: "string",
          },
          required: false,
        },
        sign_in_url: {
          schema: {
            type: "string",
          },
          required: false,
        },
        use_domain_for_script: {
          schema: {
            type: "boolean",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/public/interstitial",
          query: {
            frontendApi: {
              $resolve: "args.frontendApi",
            },
            frontend_api: {
              $resolve: "args.frontend_api",
            },
            publishable_key: {
              $resolve: "args.publishable_key",
            },
            proxy_url: {
              $resolve: "args.proxy_url",
            },
            domain: {
              $resolve: "args.domain",
            },
            sign_in_url: {
              $resolve: "args.sign_in_url",
            },
            use_domain_for_script: {
              $resolve: "args.use_domain_for_script",
            },
          },
        },
      },
    },
    GetJWKS: {
      name: "Retrieve the JSON Web Key Set of the instance",
      schema: {
        type: "object",
      },
      args: {},
      handler: {
        request: {
          method: "GET",
          path: "/jwks",
        },
      },
    },
    GetClientList: {
      name: "List all clients",
      schema: {
        type: "object",
      },
      args: {
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/clients",
        },
      },
    },
    GetClient: {
      name: "Get a client",
      schema: {
        type: "object",
      },
      args: {
        client_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/clients/{client_id}",
          params: {
            client_id: {
              $resolve: "args.client_id",
            },
          },
        },
      },
    },
    GetEmailAddress: {
      name: "Retrieve an email address",
      schema: {
        type: "object",
      },
      args: {
        email_address_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/email_addresses/{email_address_id}",
          params: {
            email_address_id: {
              $resolve: "args.email_address_id",
            },
          },
        },
      },
    },
    GetPhoneNumber: {
      name: "Retrieve a phone number",
      schema: {
        type: "object",
      },
      args: {
        phone_number_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/phone_numbers/{phone_number_id}",
          params: {
            phone_number_id: {
              $resolve: "args.phone_number_id",
            },
          },
        },
      },
    },
    GetSessionList: {
      name: "List all sessions",
      schema: {
        type: "object",
      },
      args: {
        client_id: {
          schema: {
            type: "string",
          },
          required: false,
        },
        user_id: {
          schema: {
            type: "string",
          },
          required: false,
        },
        status: {
          schema: {
            type: "string",
          },
          required: false,
        },
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/sessions",
          query: {
            client_id: {
              $resolve: "args.client_id",
            },
            user_id: {
              $resolve: "args.user_id",
            },
            status: {
              $resolve: "args.status",
            },
          },
        },
      },
    },
    GetSession: {
      name: "Retrieve a session",
      schema: {
        type: "object",
      },
      args: {
        session_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/sessions/{session_id}",
          params: {
            session_id: {
              $resolve: "args.session_id",
            },
          },
        },
      },
    },
    GetTemplateList: {
      name: "List all templates",
      schema: {
        type: "object",
      },
      args: {
        template_type: {
          schema: {
            type: "string",
          },
          required: true,
        },
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/templates/{template_type}",
          params: {
            template_type: {
              $resolve: "args.template_type",
            },
          },
        },
      },
    },
    GetTemplate: {
      name: "Retrieve a template",
      schema: {
        type: "object",
      },
      args: {
        template_type: {
          schema: {
            type: "string",
          },
          required: true,
        },
        slug: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/templates/{template_type}/{slug}",
          params: {
            template_type: {
              $resolve: "args.template_type",
            },
            slug: {
              $resolve: "args.slug",
            },
          },
        },
      },
    },
    GetUserList: {
      name: "List all users",
      schema: {
        type: "object",
      },
      args: {
        email_address: {
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        phone_number: {
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        external_id: {
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        username: {
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        web3_wallet: {
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        user_id: {
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        organization_id: {
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        query: {
          schema: {
            type: "string",
          },
          required: false,
        },
        email_address_query: {
          schema: {
            type: "string",
          },
          required: false,
        },
        phone_number_query: {
          schema: {
            type: "string",
          },
          required: false,
        },
        username_query: {
          schema: {
            type: "string",
          },
          required: false,
        },
        name_query: {
          schema: {
            type: "string",
          },
          required: false,
        },
        banned: {
          schema: {
            type: "boolean",
          },
          required: false,
        },
        last_active_at_before: {
          schema: {
            type: "number",
          },
          required: false,
        },
        last_active_at_after: {
          schema: {
            type: "number",
          },
          required: false,
        },
        last_active_at_since: {
          schema: {
            type: "number",
          },
          required: false,
        },
        created_at_before: {
          schema: {
            type: "number",
          },
          required: false,
        },
        created_at_after: {
          schema: {
            type: "number",
          },
          required: false,
        },
        last_sign_in_at_before: {
          schema: {
            type: "number",
          },
          required: false,
        },
        last_sign_in_at_after: {
          schema: {
            type: "number",
          },
          required: false,
        },
        provider: {
          schema: {
            type: "string",
          },
          required: false,
        },
        provider_user_id: {
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
        order_by: {
          schema: {
            type: "string",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/users",
          query: {
            email_address: {
              $resolve: "args.email_address",
            },
            phone_number: {
              $resolve: "args.phone_number",
            },
            external_id: {
              $resolve: "args.external_id",
            },
            username: {
              $resolve: "args.username",
            },
            web3_wallet: {
              $resolve: "args.web3_wallet",
            },
            user_id: {
              $resolve: "args.user_id",
            },
            organization_id: {
              $resolve: "args.organization_id",
            },
            query: {
              $resolve: "args.query",
            },
            email_address_query: {
              $resolve: "args.email_address_query",
            },
            phone_number_query: {
              $resolve: "args.phone_number_query",
            },
            username_query: {
              $resolve: "args.username_query",
            },
            name_query: {
              $resolve: "args.name_query",
            },
            banned: {
              $resolve: "args.banned",
            },
            last_active_at_before: {
              $resolve: "args.last_active_at_before",
            },
            last_active_at_after: {
              $resolve: "args.last_active_at_after",
            },
            last_active_at_since: {
              $resolve: "args.last_active_at_since",
            },
            created_at_before: {
              $resolve: "args.created_at_before",
            },
            created_at_after: {
              $resolve: "args.created_at_after",
            },
            last_sign_in_at_before: {
              $resolve: "args.last_sign_in_at_before",
            },
            last_sign_in_at_after: {
              $resolve: "args.last_sign_in_at_after",
            },
            provider: {
              $resolve: "args.provider",
            },
            provider_user_id: {
              $resolve: "args.provider_user_id",
            },
            order_by: {
              $resolve: "args.order_by",
            },
          },
        },
      },
    },
    GetUsersCount: {
      name: "Count users",
      schema: {
        type: "object",
      },
      args: {
        email_address: {
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        phone_number: {
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        external_id: {
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        username: {
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        web3_wallet: {
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        user_id: {
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        organization_id: {
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        query: {
          schema: {
            type: "string",
          },
          required: false,
        },
        email_address_query: {
          schema: {
            type: "string",
          },
          required: false,
        },
        phone_number_query: {
          schema: {
            type: "string",
          },
          required: false,
        },
        username_query: {
          schema: {
            type: "string",
          },
          required: false,
        },
        name_query: {
          schema: {
            type: "string",
          },
          required: false,
        },
        banned: {
          schema: {
            type: "boolean",
          },
          required: false,
        },
        last_active_at_before: {
          schema: {
            type: "number",
          },
          required: false,
        },
        last_active_at_after: {
          schema: {
            type: "number",
          },
          required: false,
        },
        last_active_at_since: {
          schema: {
            type: "number",
          },
          required: false,
        },
        created_at_before: {
          schema: {
            type: "number",
          },
          required: false,
        },
        created_at_after: {
          schema: {
            type: "number",
          },
          required: false,
        },
        last_sign_in_at_before: {
          schema: {
            type: "number",
          },
          required: false,
        },
        last_sign_in_at_after: {
          schema: {
            type: "number",
          },
          required: false,
        },
        provider: {
          schema: {
            type: "string",
          },
          required: false,
        },
        provider_user_id: {
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/users/count",
          query: {
            email_address: {
              $resolve: "args.email_address",
            },
            phone_number: {
              $resolve: "args.phone_number",
            },
            external_id: {
              $resolve: "args.external_id",
            },
            username: {
              $resolve: "args.username",
            },
            web3_wallet: {
              $resolve: "args.web3_wallet",
            },
            user_id: {
              $resolve: "args.user_id",
            },
            organization_id: {
              $resolve: "args.organization_id",
            },
            query: {
              $resolve: "args.query",
            },
            email_address_query: {
              $resolve: "args.email_address_query",
            },
            phone_number_query: {
              $resolve: "args.phone_number_query",
            },
            username_query: {
              $resolve: "args.username_query",
            },
            name_query: {
              $resolve: "args.name_query",
            },
            banned: {
              $resolve: "args.banned",
            },
            last_active_at_before: {
              $resolve: "args.last_active_at_before",
            },
            last_active_at_after: {
              $resolve: "args.last_active_at_after",
            },
            last_active_at_since: {
              $resolve: "args.last_active_at_since",
            },
            created_at_before: {
              $resolve: "args.created_at_before",
            },
            created_at_after: {
              $resolve: "args.created_at_after",
            },
            last_sign_in_at_before: {
              $resolve: "args.last_sign_in_at_before",
            },
            last_sign_in_at_after: {
              $resolve: "args.last_sign_in_at_after",
            },
            provider: {
              $resolve: "args.provider",
            },
            provider_user_id: {
              $resolve: "args.provider_user_id",
            },
          },
        },
      },
    },
    GetUser: {
      name: "Retrieve a user",
      schema: {
        type: "object",
      },
      args: {
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/users/{user_id}",
          params: {
            user_id: {
              $resolve: "args.user_id",
            },
          },
        },
      },
    },
    GetUserBillingSubscription: {
      name: "Retrieve a user's billing subscription",
      schema: {
        type: "object",
      },
      args: {
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/users/{user_id}/billing/subscription",
          params: {
            user_id: {
              $resolve: "args.user_id",
            },
          },
        },
      },
    },
    GetUserBillingCreditBalance: {
      name: "Retrieve a user's credit balance",
      schema: {
        type: "object",
      },
      args: {
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/users/{user_id}/billing/credits",
          params: {
            user_id: {
              $resolve: "args.user_id",
            },
          },
        },
      },
    },
    GetOAuthAccessToken: {
      name: "Retrieve the OAuth access token of a user",
      schema: {
        type: "object",
      },
      args: {
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        provider: {
          schema: {
            type: "string",
          },
          required: true,
        },
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/users/{user_id}/oauth_access_tokens/{provider}",
          params: {
            user_id: {
              $resolve: "args.user_id",
            },
            provider: {
              $resolve: "args.provider",
            },
          },
        },
      },
    },
    UsersGetOrganizationMemberships: {
      name: "Retrieve all memberships for a user",
      schema: {
        type: "object",
      },
      args: {
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/users/{user_id}/organization_memberships",
          params: {
            user_id: {
              $resolve: "args.user_id",
            },
          },
        },
      },
    },
    UsersGetOrganizationInvitations: {
      name: "Retrieve all invitations for a user",
      schema: {
        type: "object",
      },
      args: {
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
        status: {
          schema: {
            type: "string",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/users/{user_id}/organization_invitations",
          params: {
            user_id: {
              $resolve: "args.user_id",
            },
          },
          query: {
            status: {
              $resolve: "args.status",
            },
          },
        },
      },
    },
    ListInvitations: {
      name: "List all invitations",
      schema: {
        type: "object",
      },
      args: {
        status: {
          schema: {
            type: "string",
          },
          required: false,
        },
        query: {
          schema: {
            type: "string",
          },
          required: false,
        },
        order_by: {
          schema: {
            type: "string",
          },
          required: false,
        },
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/invitations",
          query: {
            status: {
              $resolve: "args.status",
            },
            query: {
              $resolve: "args.query",
            },
            order_by: {
              $resolve: "args.order_by",
            },
          },
        },
      },
    },
    ListInstanceOrganizationInvitations: {
      name: "Get a list of organization invitations for the current instance",
      schema: {
        type: "object",
      },
      args: {
        order_by: {
          schema: {
            type: "string",
          },
          required: false,
        },
        status: {
          schema: {
            type: "string",
          },
          required: false,
        },
        query: {
          schema: {
            type: "string",
          },
          required: false,
        },
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/organization_invitations",
          query: {
            order_by: {
              $resolve: "args.order_by",
            },
            status: {
              $resolve: "args.status",
            },
            query: {
              $resolve: "args.query",
            },
          },
        },
      },
    },
    ListAllowlistIdentifiers: {
      name: "List all identifiers on the allow-list",
      schema: {
        type: "object",
      },
      args: {
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/allowlist_identifiers",
        },
      },
    },
    ListBlocklistIdentifiers: {
      name: "List all identifiers on the block-list",
      schema: {
        type: "object",
      },
      args: {},
      handler: {
        request: {
          method: "GET",
          path: "/blocklist_identifiers",
        },
      },
    },
    ListDomains: {
      name: "List all instance domains",
      schema: {
        type: "object",
      },
      args: {},
      handler: {
        request: {
          method: "GET",
          path: "/domains",
        },
      },
    },
    GetInstance: {
      name: "Fetch the current instance",
      schema: {
        type: "object",
      },
      args: {},
      handler: {
        request: {
          method: "GET",
          path: "/instance",
        },
      },
    },
    GetInstanceProtect: {
      name: "Get instance protect settings",
      schema: {
        type: "object",
      },
      args: {},
      handler: {
        request: {
          method: "GET",
          path: "/instance/protect",
        },
      },
    },
    GetInstanceCommunication: {
      name: "Get instance communication settings",
      schema: {
        type: "object",
      },
      args: {},
      handler: {
        request: {
          method: "GET",
          path: "/instance/communication",
        },
      },
    },
    GetInstanceOAuthApplicationSettings: {
      name: "Get OAuth application settings",
      schema: {
        type: "object",
      },
      args: {},
      handler: {
        request: {
          method: "GET",
          path: "/instance/oauth_application_settings",
        },
      },
    },
    GetInstanceOrganizationSettings: {
      name: "Get instance organization settings",
      schema: {
        type: "object",
      },
      args: {},
      handler: {
        request: {
          method: "GET",
          path: "/instance/organization_settings",
        },
      },
    },
    ListJWTTemplates: {
      name: "List all templates",
      schema: {
        type: "object",
      },
      args: {
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/jwt_templates",
        },
      },
    },
    GetJWTTemplate: {
      name: "Retrieve a template",
      schema: {
        type: "object",
      },
      args: {
        template_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/jwt_templates/{template_id}",
          params: {
            template_id: {
              $resolve: "args.template_id",
            },
          },
        },
      },
    },
    ListMachines: {
      name: "Get a list of machines for an instance",
      schema: {
        type: "object",
      },
      args: {
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
        query: {
          schema: {
            type: "string",
          },
          required: false,
        },
        order_by: {
          schema: {
            type: "string",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/machines",
          query: {
            query: {
              $resolve: "args.query",
            },
            order_by: {
              $resolve: "args.order_by",
            },
          },
        },
      },
    },
    GetMachine: {
      name: "Retrieve a machine",
      schema: {
        type: "object",
      },
      args: {
        machine_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/machines/{machine_id}",
          params: {
            machine_id: {
              $resolve: "args.machine_id",
            },
          },
        },
      },
    },
    GetMachineSecretKey: {
      name: "Retrieve a machine secret key",
      schema: {
        type: "object",
      },
      args: {
        machine_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/machines/{machine_id}/secret_key",
          params: {
            machine_id: {
              $resolve: "args.machine_id",
            },
          },
        },
      },
    },
    ListOrganizations: {
      name: "Get a list of organizations for an instance",
      schema: {
        type: "object",
      },
      args: {
        include_members_count: {
          schema: {
            type: "boolean",
          },
          required: false,
        },
        include_missing_member_with_elevated_permissions: {
          schema: {
            type: "boolean",
          },
          required: false,
        },
        query: {
          schema: {
            type: "string",
          },
          required: false,
        },
        user_id: {
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        organization_id: {
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        order_by: {
          schema: {
            type: "string",
          },
          required: false,
        },
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/organizations",
          query: {
            include_members_count: {
              $resolve: "args.include_members_count",
            },
            include_missing_member_with_elevated_permissions: {
              $resolve: "args.include_missing_member_with_elevated_permissions",
            },
            query: {
              $resolve: "args.query",
            },
            user_id: {
              $resolve: "args.user_id",
            },
            organization_id: {
              $resolve: "args.organization_id",
            },
            order_by: {
              $resolve: "args.order_by",
            },
          },
        },
      },
    },
    GetOrganization: {
      name: "Retrieve an organization by ID or slug",
      schema: {
        type: "object",
      },
      args: {
        organization_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        include_members_count: {
          schema: {
            type: "boolean",
          },
          required: false,
        },
        include_missing_member_with_elevated_permissions: {
          schema: {
            type: "boolean",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/organizations/{organization_id}",
          params: {
            organization_id: {
              $resolve: "args.organization_id",
            },
          },
          query: {
            include_members_count: {
              $resolve: "args.include_members_count",
            },
            include_missing_member_with_elevated_permissions: {
              $resolve: "args.include_missing_member_with_elevated_permissions",
            },
          },
        },
      },
    },
    GetOrganizationBillingSubscription: {
      name: "Retrieve an organization's billing subscription",
      schema: {
        type: "object",
      },
      args: {
        organization_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/organizations/{organization_id}/billing/subscription",
          params: {
            organization_id: {
              $resolve: "args.organization_id",
            },
          },
        },
      },
    },
    GetOrganizationBillingCreditBalance: {
      name: "Retrieve an organization's credit balance",
      schema: {
        type: "object",
      },
      args: {
        organization_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/organizations/{organization_id}/billing/credits",
          params: {
            organization_id: {
              $resolve: "args.organization_id",
            },
          },
        },
      },
    },
    ListOrganizationInvitations: {
      name: "Get a list of organization invitations",
      schema: {
        type: "object",
      },
      args: {
        organization_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        status: {
          schema: {
            type: "string",
          },
          required: false,
        },
        email_address: {
          schema: {
            type: "string",
          },
          required: false,
        },
        order_by: {
          schema: {
            type: "string",
          },
          required: false,
        },
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/organizations/{organization_id}/invitations",
          params: {
            organization_id: {
              $resolve: "args.organization_id",
            },
          },
          query: {
            status: {
              $resolve: "args.status",
            },
            email_address: {
              $resolve: "args.email_address",
            },
            order_by: {
              $resolve: "args.order_by",
            },
          },
        },
      },
    },
    ListPendingOrganizationInvitations: {
      name: "Get a list of pending organization invitations",
      schema: {
        type: "object",
      },
      args: {
        organization_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/organizations/{organization_id}/invitations/pending",
          params: {
            organization_id: {
              $resolve: "args.organization_id",
            },
          },
        },
      },
    },
    GetOrganizationInvitation: {
      name: "Retrieve an organization invitation by ID",
      schema: {
        type: "object",
      },
      args: {
        organization_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        invitation_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/organizations/{organization_id}/invitations/{invitation_id}",
          params: {
            organization_id: {
              $resolve: "args.organization_id",
            },
            invitation_id: {
              $resolve: "args.invitation_id",
            },
          },
        },
      },
    },
    ListOrganizationRoles: {
      name: "Get a list of organization roles",
      schema: {
        type: "object",
      },
      args: {
        query: {
          schema: {
            type: "string",
          },
          required: false,
        },
        order_by: {
          schema: {
            type: "string",
          },
          required: false,
        },
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/organization_roles",
          query: {
            query: {
              $resolve: "args.query",
            },
            order_by: {
              $resolve: "args.order_by",
            },
          },
        },
      },
    },
    GetOrganizationRole: {
      name: "Retrieve an organization role",
      schema: {
        type: "object",
      },
      args: {
        organization_role_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/organization_roles/{organization_role_id}",
          params: {
            organization_role_id: {
              $resolve: "args.organization_role_id",
            },
          },
        },
      },
    },
    ListOrganizationMemberships: {
      name: "Get a list of all members of an organization",
      schema: {
        type: "object",
      },
      args: {
        organization_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        order_by: {
          schema: {
            type: "string",
          },
          required: false,
        },
        user_id: {
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        email_address: {
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        phone_number: {
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        username: {
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        web3_wallet: {
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        role: {
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        query: {
          schema: {
            type: "string",
          },
          required: false,
        },
        email_address_query: {
          schema: {
            type: "string",
          },
          required: false,
        },
        phone_number_query: {
          schema: {
            type: "string",
          },
          required: false,
        },
        username_query: {
          schema: {
            type: "string",
          },
          required: false,
        },
        name_query: {
          schema: {
            type: "string",
          },
          required: false,
        },
        last_active_at_before: {
          schema: {
            type: "number",
          },
          required: false,
        },
        last_active_at_after: {
          schema: {
            type: "number",
          },
          required: false,
        },
        created_at_before: {
          schema: {
            type: "number",
          },
          required: false,
        },
        created_at_after: {
          schema: {
            type: "number",
          },
          required: false,
        },
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/organizations/{organization_id}/memberships",
          params: {
            organization_id: {
              $resolve: "args.organization_id",
            },
          },
          query: {
            order_by: {
              $resolve: "args.order_by",
            },
            user_id: {
              $resolve: "args.user_id",
            },
            email_address: {
              $resolve: "args.email_address",
            },
            phone_number: {
              $resolve: "args.phone_number",
            },
            username: {
              $resolve: "args.username",
            },
            web3_wallet: {
              $resolve: "args.web3_wallet",
            },
            role: {
              $resolve: "args.role",
            },
            query: {
              $resolve: "args.query",
            },
            email_address_query: {
              $resolve: "args.email_address_query",
            },
            phone_number_query: {
              $resolve: "args.phone_number_query",
            },
            username_query: {
              $resolve: "args.username_query",
            },
            name_query: {
              $resolve: "args.name_query",
            },
            last_active_at_before: {
              $resolve: "args.last_active_at_before",
            },
            last_active_at_after: {
              $resolve: "args.last_active_at_after",
            },
            created_at_before: {
              $resolve: "args.created_at_before",
            },
            created_at_after: {
              $resolve: "args.created_at_after",
            },
          },
        },
      },
    },
    ListOrganizationDomains: {
      name: "Get a list of all domains of an organization.",
      schema: {
        type: "object",
      },
      args: {
        organization_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        verified: {
          schema: {
            type: "string",
          },
          required: false,
        },
        enrollment_mode: {
          schema: {
            type: "string",
          },
          required: false,
        },
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/organizations/{organization_id}/domains",
          params: {
            organization_id: {
              $resolve: "args.organization_id",
            },
          },
          query: {
            verified: {
              $resolve: "args.verified",
            },
            enrollment_mode: {
              $resolve: "args.enrollment_mode",
            },
          },
        },
      },
    },
    ListAllOrganizationDomains: {
      name: "List all organization domains",
      schema: {
        type: "object",
      },
      args: {
        organization_id: {
          schema: {
            type: "string",
          },
          required: false,
        },
        verified: {
          schema: {
            type: "string",
          },
          required: false,
        },
        enrollment_mode: {
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        query: {
          schema: {
            type: "string",
          },
          required: false,
        },
        domains: {
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
        order_by: {
          schema: {
            type: "string",
          },
          required: false,
        },
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/organization_domains",
          query: {
            organization_id: {
              $resolve: "args.organization_id",
            },
            verified: {
              $resolve: "args.verified",
            },
            enrollment_mode: {
              $resolve: "args.enrollment_mode",
            },
            query: {
              $resolve: "args.query",
            },
            domains: {
              $resolve: "args.domains",
            },
            order_by: {
              $resolve: "args.order_by",
            },
          },
        },
      },
    },
    ListRedirectURLs: {
      name: "List all redirect URLs",
      schema: {
        type: "object",
      },
      args: {
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/redirect_urls",
        },
      },
    },
    GetRedirectURL: {
      name: "Retrieve a redirect URL",
      schema: {
        type: "object",
      },
      args: {
        id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/redirect_urls/{id}",
          params: {
            id: {
              $resolve: "args.id",
            },
          },
        },
      },
    },
    GetSignUp: {
      name: "Retrieve a sign-up by ID",
      schema: {
        type: "object",
      },
      args: {
        id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/sign_ups/{id}",
          params: {
            id: {
              $resolve: "args.id",
            },
          },
        },
      },
    },
    ListOAuthApplications: {
      name: "Get a list of OAuth applications for an instance",
      schema: {
        type: "object",
      },
      args: {
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
        order_by: {
          schema: {
            type: "string",
          },
          required: false,
        },
        name_query: {
          schema: {
            type: "string",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/oauth_applications",
          query: {
            order_by: {
              $resolve: "args.order_by",
            },
            name_query: {
              $resolve: "args.name_query",
            },
          },
        },
      },
    },
    GetOAuthApplication: {
      name: "Retrieve an OAuth application by ID",
      schema: {
        type: "object",
      },
      args: {
        oauth_application_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/oauth_applications/{oauth_application_id}",
          params: {
            oauth_application_id: {
              $resolve: "args.oauth_application_id",
            },
          },
        },
      },
    },
    ListSAMLConnections: {
      name: "Get a list of SAML Connections for an instance",
      schema: {
        type: "object",
      },
      args: {
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
        query: {
          schema: {
            type: "string",
          },
          required: false,
        },
        order_by: {
          schema: {
            type: "string",
          },
          required: false,
        },
        organization_id: {
          schema: {
            type: "array",
            items: {
              type: "string",
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/saml_connections",
          query: {
            query: {
              $resolve: "args.query",
            },
            order_by: {
              $resolve: "args.order_by",
            },
            organization_id: {
              $resolve: "args.organization_id",
            },
          },
        },
      },
    },
    GetSAMLConnection: {
      name: "Retrieve a SAML Connection by ID",
      schema: {
        type: "object",
      },
      args: {
        saml_connection_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/saml_connections/{saml_connection_id}",
          params: {
            saml_connection_id: {
              $resolve: "args.saml_connection_id",
            },
          },
        },
      },
    },
    ListEnterpriseConnections: {
      name: "List enterprise connections",
      schema: {
        type: "object",
      },
      args: {
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
        organization_id: {
          schema: {
            type: "string",
          },
          required: false,
        },
        active: {
          schema: {
            type: "boolean",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/enterprise_connections",
          query: {
            organization_id: {
              $resolve: "args.organization_id",
            },
            active: {
              $resolve: "args.active",
            },
          },
        },
      },
    },
    GetEnterpriseConnection: {
      name: "Retrieve an enterprise connection",
      schema: {
        type: "object",
      },
      args: {
        enterprise_connection_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/enterprise_connections/{enterprise_connection_id}",
          params: {
            enterprise_connection_id: {
              $resolve: "args.enterprise_connection_id",
            },
          },
        },
      },
    },
    InstanceGetOrganizationMemberships: {
      name: "Get a list of all organization memberships within an instance.",
      schema: {
        type: "object",
      },
      args: {
        order_by: {
          schema: {
            type: "string",
          },
          required: false,
        },
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/organization_memberships",
          query: {
            order_by: {
              $resolve: "args.order_by",
            },
          },
        },
      },
    },
    ListWaitlistEntries: {
      name: "List all waitlist entries",
      schema: {
        type: "object",
      },
      args: {
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
        query: {
          schema: {
            type: "string",
          },
          required: false,
        },
        status: {
          schema: {
            type: "string",
          },
          required: false,
        },
        order_by: {
          schema: {
            type: "string",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/waitlist_entries",
          query: {
            query: {
              $resolve: "args.query",
            },
            status: {
              $resolve: "args.status",
            },
            order_by: {
              $resolve: "args.order_by",
            },
          },
        },
      },
    },
    GetCommercePlanList: {
      name: "List all billing plans",
      schema: {
        type: "object",
      },
      args: {
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
        payer_type: {
          schema: {
            type: "string",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/billing/plans",
          query: {
            payer_type: {
              $resolve: "args.payer_type",
            },
          },
        },
      },
    },
    GetBillingPriceList: {
      name: "List all billing prices",
      schema: {
        type: "object",
      },
      args: {
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
        plan_id: {
          schema: {
            type: "string",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/billing/prices",
          query: {
            plan_id: {
              $resolve: "args.plan_id",
            },
          },
        },
      },
    },
    GetCommerceSubscriptionItemList: {
      name: "List all subscription items",
      schema: {
        type: "object",
      },
      args: {
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
        status: {
          schema: {
            type: "string",
          },
          required: false,
        },
        payer_type: {
          schema: {
            type: "string",
          },
          required: false,
        },
        plan_id: {
          schema: {
            type: "string",
          },
          required: false,
        },
        include_free: {
          schema: {
            type: "boolean",
          },
          required: false,
        },
        query: {
          schema: {
            type: "string",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/billing/subscription_items",
          query: {
            status: {
              $resolve: "args.status",
            },
            payer_type: {
              $resolve: "args.payer_type",
            },
            plan_id: {
              $resolve: "args.plan_id",
            },
            include_free: {
              $resolve: "args.include_free",
            },
            query: {
              $resolve: "args.query",
            },
          },
        },
      },
    },
    GetBillingStatementList: {
      name: "List all billing statements",
      schema: {
        type: "object",
      },
      args: {
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/billing/statements",
        },
      },
    },
    GetBillingStatement: {
      name: "Retrieve a billing statement",
      schema: {
        type: "object",
      },
      args: {
        statementID: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/billing/statements/{statementID}",
          params: {
            statementID: {
              $resolve: "args.statementID",
            },
          },
        },
      },
    },
    GetBillingStatementPaymentAttempts: {
      name: "List payment attempts for a billing statement",
      schema: {
        type: "object",
      },
      args: {
        statementID: {
          schema: {
            type: "string",
          },
          required: true,
        },
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/billing/statements/{statementID}/payment_attempts",
          params: {
            statementID: {
              $resolve: "args.statementID",
            },
          },
        },
      },
    },
    ListOrganizationPermissions: {
      name: "Get a list of all organization permissions",
      schema: {
        type: "object",
      },
      args: {
        query: {
          schema: {
            type: "string",
          },
          required: false,
        },
        order_by: {
          schema: {
            type: "string",
          },
          required: false,
        },
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/organization_permissions",
          query: {
            query: {
              $resolve: "args.query",
            },
            order_by: {
              $resolve: "args.order_by",
            },
          },
        },
      },
    },
    GetOrganizationPermission: {
      name: "Get an organization permission",
      schema: {
        type: "object",
      },
      args: {
        permission_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/organization_permissions/{permission_id}",
          params: {
            permission_id: {
              $resolve: "args.permission_id",
            },
          },
        },
      },
    },
    ListRoleSets: {
      name: "Get a list of role sets",
      schema: {
        type: "object",
      },
      args: {
        query: {
          schema: {
            type: "string",
          },
          required: false,
        },
        order_by: {
          schema: {
            type: "string",
          },
          required: false,
        },
        undefined: {
          schema: {
            type: "object",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/role_sets",
          query: {
            query: {
              $resolve: "args.query",
            },
            order_by: {
              $resolve: "args.order_by",
            },
          },
        },
      },
    },
    GetRoleSet: {
      name: "Retrieve a role set",
      schema: {
        type: "object",
      },
      args: {
        role_set_key_or_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/role_sets/{role_set_key_or_id}",
          params: {
            role_set_key_or_id: {
              $resolve: "args.role_set_key_or_id",
            },
          },
        },
      },
    },
    getApiKeys: {
      name: "Get API Keys",
      schema: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              type: "object",
              properties: {
                object: {
                  type: "string",
                },
                id: {
                  type: "string",
                },
                type: {
                  type: "string",
                },
                subject: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                claims: {
                  type: "object",
                  properties: {},
                },
                scopes: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                revoked: {
                  type: "boolean",
                },
                revocation_reason: {
                  type: "string",
                },
                expired: {
                  type: "boolean",
                },
                expiration: {
                  type: "number",
                },
                created_by: {
                  type: "string",
                },
                last_used_at: {
                  type: "number",
                },
                created_at: {
                  type: "number",
                },
                updated_at: {
                  type: "number",
                },
              },
              required: [
                "object",
                "id",
                "type",
                "subject",
                "name",
                "claims",
                "scopes",
                "revoked",
                "revocation_reason",
                "expired",
                "expiration",
                "created_by",
                "last_used_at",
                "created_at",
                "updated_at",
              ],
            },
          },
          total_count: {
            type: "number",
          },
        },
        required: ["data", "total_count"],
      },
      args: {
        type: {
          schema: {
            type: "string",
          },
          required: false,
        },
        subject: {
          schema: {
            type: "string",
          },
          required: true,
        },
        include_invalid: {
          schema: {
            type: "string",
          },
          required: false,
        },
        limit: {
          schema: {
            type: "number",
          },
          required: false,
        },
        offset: {
          schema: {
            type: "number",
          },
          required: false,
        },
        query: {
          schema: {
            type: "string",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/api_keys",
          query: {
            type: {
              $resolve: "args.type",
            },
            subject: {
              $resolve: "args.subject",
            },
            include_invalid: {
              $resolve: "args.include_invalid",
            },
            limit: {
              $resolve: "args.limit",
            },
            offset: {
              $resolve: "args.offset",
            },
            query: {
              $resolve: "args.query",
            },
          },
        },
      },
    },
    getApiKey: {
      name: "Get an API Key by ID",
      schema: {
        type: "object",
        properties: {
          object: {
            type: "string",
          },
          id: {
            type: "string",
          },
          type: {
            type: "string",
          },
          subject: {
            type: "string",
          },
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          claims: {
            type: "object",
            properties: {},
          },
          scopes: {
            type: "array",
            items: {
              type: "string",
            },
          },
          revoked: {
            type: "boolean",
          },
          revocation_reason: {
            type: "string",
          },
          expired: {
            type: "boolean",
          },
          expiration: {
            type: "number",
          },
          created_by: {
            type: "string",
          },
          last_used_at: {
            type: "number",
          },
          created_at: {
            type: "number",
          },
          updated_at: {
            type: "number",
          },
        },
        required: [
          "object",
          "id",
          "type",
          "subject",
          "name",
          "claims",
          "scopes",
          "revoked",
          "revocation_reason",
          "expired",
          "expiration",
          "created_by",
          "last_used_at",
          "created_at",
          "updated_at",
        ],
      },
      args: {
        apiKeyID: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/api_keys/{apiKeyID}",
          params: {
            apiKeyID: {
              $resolve: "args.apiKeyID",
            },
          },
        },
      },
    },
    getApiKeySecret: {
      name: "Get an API Key Secret",
      schema: {
        type: "object",
        properties: {
          secret: {
            type: "string",
          },
        },
        required: ["secret"],
      },
      args: {
        apiKeyID: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/api_keys/{apiKeyID}/secret",
          params: {
            apiKeyID: {
              $resolve: "args.apiKeyID",
            },
          },
        },
      },
    },
    getM2MTokens: {
      name: "Get M2M Tokens",
      schema: {
        type: "object",
        properties: {
          m2m_tokens: {
            type: "array",
            items: {
              type: "object",
              properties: {
                object: {
                  type: "string",
                },
                id: {
                  type: "string",
                },
                subject: {
                  type: "string",
                },
                claims: {
                  type: "object",
                  properties: {},
                },
                scopes: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                revoked: {
                  type: "boolean",
                },
                revocation_reason: {
                  type: "string",
                },
                expired: {
                  type: "boolean",
                },
                expiration: {
                  type: "number",
                },
                last_used_at: {
                  type: "number",
                },
                created_at: {
                  type: "number",
                },
                updated_at: {
                  type: "number",
                },
              },
              required: [
                "object",
                "id",
                "subject",
                "revoked",
                "revocation_reason",
                "expired",
                "expiration",
                "last_used_at",
                "created_at",
                "updated_at",
              ],
            },
          },
          total_count: {
            type: "number",
          },
        },
        required: ["m2m_tokens", "total_count"],
      },
      args: {
        subject: {
          schema: {
            type: "string",
          },
          required: true,
        },
        revoked: {
          schema: {
            type: "boolean",
          },
          required: false,
        },
        expired: {
          schema: {
            type: "boolean",
          },
          required: false,
        },
        limit: {
          schema: {
            type: "number",
          },
          required: false,
        },
        offset: {
          schema: {
            type: "number",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "GET",
          path: "/m2m_tokens",
          query: {
            subject: {
              $resolve: "args.subject",
            },
            revoked: {
              $resolve: "args.revoked",
            },
            expired: {
              $resolve: "args.expired",
            },
            limit: {
              $resolve: "args.limit",
            },
            offset: {
              $resolve: "args.offset",
            },
          },
        },
      },
    },
  },
  actions: {
    VerifyClient: {
      name: "Verify a client",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              token: {
                type: "string",
              },
            },
            required: ["token"],
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/clients/verify",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    CreateEmailAddress: {
      name: "Create an email address",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              user_id: {
                type: "string",
              },
              email_address: {
                type: "string",
              },
              verified: {
                type: "boolean",
              },
              primary: {
                type: "boolean",
              },
            },
            required: ["user_id", "email_address"],
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/email_addresses",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    DeleteEmailAddress: {
      name: "Delete an email address",
      schema: {
        type: "object",
      },
      args: {
        email_address_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/email_addresses/{email_address_id}",
          params: {
            email_address_id: {
              $resolve: "args.email_address_id",
            },
          },
        },
      },
    },
    UpdateEmailAddress: {
      name: "Update an email address",
      schema: {
        type: "object",
      },
      args: {
        email_address_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              verified: {
                type: "boolean",
              },
              primary: {
                type: "boolean",
              },
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "PATCH",
          path: "/email_addresses/{email_address_id}",
          params: {
            email_address_id: {
              $resolve: "args.email_address_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    CreatePhoneNumber: {
      name: "Create a phone number",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              user_id: {
                type: "string",
              },
              phone_number: {
                type: "string",
              },
              verified: {
                type: "boolean",
              },
              primary: {
                type: "boolean",
              },
              reserved_for_second_factor: {
                type: "boolean",
              },
            },
            required: ["user_id", "phone_number"],
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/phone_numbers",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    DeletePhoneNumber: {
      name: "Delete a phone number",
      schema: {
        type: "object",
      },
      args: {
        phone_number_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/phone_numbers/{phone_number_id}",
          params: {
            phone_number_id: {
              $resolve: "args.phone_number_id",
            },
          },
        },
      },
    },
    UpdatePhoneNumber: {
      name: "Update a phone number",
      schema: {
        type: "object",
      },
      args: {
        phone_number_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              verified: {
                type: "boolean",
              },
              primary: {
                type: "boolean",
              },
              reserved_for_second_factor: {
                type: "boolean",
              },
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "PATCH",
          path: "/phone_numbers/{phone_number_id}",
          params: {
            phone_number_id: {
              $resolve: "args.phone_number_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    createSession: {
      name: "Create a new active session",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              user_id: {
                type: "string",
              },
              active_organization_id: {
                type: "string",
              },
            },
            required: ["user_id"],
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/sessions",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    RefreshSession: {
      name: "Refresh a session",
      schema: {
        type: "object",
      },
      args: {
        session_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              expired_token: {
                type: "string",
              },
              refresh_token: {
                type: "string",
              },
              request_origin: {
                type: "string",
              },
              request_headers: {
                type: "object",
                properties: {},
              },
              format: {
                type: "string",
              },
              request_originating_ip: {
                type: "string",
              },
            },
            required: ["expired_token", "refresh_token", "request_origin"],
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/sessions/{session_id}/refresh",
          params: {
            session_id: {
              $resolve: "args.session_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    RevokeSession: {
      name: "Revoke a session",
      schema: {
        type: "object",
      },
      args: {
        session_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/sessions/{session_id}/revoke",
          params: {
            session_id: {
              $resolve: "args.session_id",
            },
          },
        },
      },
    },
    CreateSessionToken: {
      name: "Create a session token",
      schema: {
        type: "object",
        properties: {
          object: {
            type: "string",
          },
          jwt: {
            type: "string",
          },
        },
      },
      args: {
        session_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              expires_in_seconds: {
                type: "number",
              },
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/sessions/{session_id}/tokens",
          params: {
            session_id: {
              $resolve: "args.session_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    CreateSessionTokenFromTemplate: {
      name: "Create a session token from a JWT template",
      schema: {
        type: "object",
        properties: {
          object: {
            type: "string",
          },
          jwt: {
            type: "string",
          },
        },
      },
      args: {
        session_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        template_name: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              expires_in_seconds: {
                type: "number",
              },
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/sessions/{session_id}/tokens/{template_name}",
          params: {
            session_id: {
              $resolve: "args.session_id",
            },
            template_name: {
              $resolve: "args.template_name",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    UpsertTemplate: {
      name: "Update a template for a given type and slug",
      schema: {
        type: "object",
      },
      args: {
        template_type: {
          schema: {
            type: "string",
          },
          required: true,
        },
        slug: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              subject: {
                type: "string",
              },
              markup: {
                type: "string",
              },
              body: {
                type: "string",
              },
              delivered_by_clerk: {
                type: "boolean",
              },
              from_email_name: {
                type: "string",
              },
              reply_to_email_name: {
                type: "string",
              },
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "PUT",
          path: "/templates/{template_type}/{slug}",
          params: {
            template_type: {
              $resolve: "args.template_type",
            },
            slug: {
              $resolve: "args.slug",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    RevertTemplate: {
      name: "Revert a template",
      schema: {
        type: "object",
      },
      args: {
        template_type: {
          schema: {
            type: "string",
          },
          required: true,
        },
        slug: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/templates/{template_type}/{slug}/revert",
          params: {
            template_type: {
              $resolve: "args.template_type",
            },
            slug: {
              $resolve: "args.slug",
            },
          },
        },
      },
    },
    PreviewTemplate: {
      name: "Preview changes to a template",
      schema: {
        type: "object",
        properties: {},
      },
      args: {
        template_type: {
          schema: {
            type: "string",
          },
          required: true,
        },
        slug: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              subject: {
                type: "string",
              },
              body: {
                type: "string",
              },
              from_email_name: {
                type: "string",
              },
              reply_to_email_name: {
                type: "string",
              },
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/templates/{template_type}/{slug}/preview",
          params: {
            template_type: {
              $resolve: "args.template_type",
            },
            slug: {
              $resolve: "args.slug",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    ToggleTemplateDelivery: {
      name: "Toggle the delivery by Clerk for a template of a given type and slug",
      schema: {
        type: "object",
      },
      args: {
        template_type: {
          schema: {
            type: "string",
          },
          required: true,
        },
        slug: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              delivered_by_clerk: {
                type: "boolean",
              },
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/templates/{template_type}/{slug}/toggle_delivery",
          params: {
            template_type: {
              $resolve: "args.template_type",
            },
            slug: {
              $resolve: "args.slug",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    CreateUser: {
      name: "Create a new user",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              external_id: {
                type: "string",
              },
              first_name: {
                type: "string",
              },
              last_name: {
                type: "string",
              },
              locale: {
                type: "string",
              },
              email_address: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              phone_number: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              web3_wallet: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              username: {
                type: "string",
              },
              password: {
                type: "string",
              },
              password_digest: {
                type: "string",
              },
              password_hasher: {
                type: "ref",
                ref: "PasswordHasher",
              },
              skip_password_checks: {
                type: "boolean",
              },
              skip_password_requirement: {
                type: "boolean",
              },
              totp_secret: {
                type: "string",
              },
              backup_codes: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              public_metadata: {
                type: "object",
                properties: {},
              },
              private_metadata: {
                type: "object",
                properties: {},
              },
              unsafe_metadata: {
                type: "object",
                properties: {},
              },
              delete_self_enabled: {
                type: "boolean",
              },
              legal_accepted_at: {
                type: "string",
              },
              skip_legal_checks: {
                type: "boolean",
              },
              skip_user_requirement: {
                type: "boolean",
              },
              create_organization_enabled: {
                type: "boolean",
              },
              create_organizations_limit: {
                type: "number",
              },
              created_at: {
                type: "string",
              },
              bypass_client_trust: {
                type: "boolean",
              },
            },
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/users",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    UpdateUser: {
      name: "Update a user",
      schema: {
        type: "object",
      },
      args: {
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              external_id: {
                type: "string",
              },
              first_name: {
                type: "string",
              },
              last_name: {
                type: "string",
              },
              locale: {
                type: "string",
              },
              primary_email_address_id: {
                type: "string",
              },
              notify_primary_email_address_changed: {
                type: "boolean",
              },
              primary_phone_number_id: {
                type: "string",
              },
              primary_web3_wallet_id: {
                type: "string",
              },
              username: {
                type: "string",
              },
              profile_image_id: {
                type: "string",
              },
              password: {
                type: "string",
              },
              password_digest: {
                type: "string",
              },
              password_hasher: {
                type: "ref",
                ref: "PasswordHasher",
              },
              skip_password_checks: {
                type: "boolean",
              },
              sign_out_of_other_sessions: {
                type: "boolean",
              },
              totp_secret: {
                type: "string",
              },
              backup_codes: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              public_metadata: {
                type: "object",
                properties: {},
              },
              private_metadata: {
                type: "object",
                properties: {},
              },
              unsafe_metadata: {
                type: "object",
                properties: {},
              },
              delete_self_enabled: {
                type: "boolean",
              },
              create_organization_enabled: {
                type: "boolean",
              },
              legal_accepted_at: {
                type: "string",
              },
              skip_legal_checks: {
                type: "boolean",
              },
              create_organizations_limit: {
                type: "number",
              },
              created_at: {
                type: "string",
              },
              bypass_client_trust: {
                type: "boolean",
              },
            },
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "PATCH",
          path: "/users/{user_id}",
          params: {
            user_id: {
              $resolve: "args.user_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    DeleteUser: {
      name: "Delete a user",
      schema: {
        type: "object",
      },
      args: {
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/users/{user_id}",
          params: {
            user_id: {
              $resolve: "args.user_id",
            },
          },
        },
      },
    },
    BanUser: {
      name: "Ban a user",
      schema: {
        type: "object",
      },
      args: {
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/users/{user_id}/ban",
          params: {
            user_id: {
              $resolve: "args.user_id",
            },
          },
        },
      },
    },
    UnbanUser: {
      name: "Unban a user",
      schema: {
        type: "object",
      },
      args: {
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/users/{user_id}/unban",
          params: {
            user_id: {
              $resolve: "args.user_id",
            },
          },
        },
      },
    },
    UsersBan: {
      name: "Ban multiple users",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              user_ids: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
            required: ["user_ids"],
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/users/ban",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    UsersUnban: {
      name: "Unban multiple users",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              user_ids: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
            required: ["user_ids"],
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/users/unban",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    LockUser: {
      name: "Lock a user",
      schema: {
        type: "object",
      },
      args: {
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/users/{user_id}/lock",
          params: {
            user_id: {
              $resolve: "args.user_id",
            },
          },
        },
      },
    },
    UnlockUser: {
      name: "Unlock a user",
      schema: {
        type: "object",
      },
      args: {
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/users/{user_id}/unlock",
          params: {
            user_id: {
              $resolve: "args.user_id",
            },
          },
        },
      },
    },
    SetUserProfileImage: {
      name: "Set user profile image",
      schema: {
        type: "object",
      },
      args: {
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/users/{user_id}/profile_image",
          params: {
            user_id: {
              $resolve: "args.user_id",
            },
          },
        },
      },
    },
    DeleteUserProfileImage: {
      name: "Delete user profile image",
      schema: {
        type: "object",
      },
      args: {
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/users/{user_id}/profile_image",
          params: {
            user_id: {
              $resolve: "args.user_id",
            },
          },
        },
      },
    },
    UpdateUserMetadata: {
      name: "Merge and update a user's metadata",
      schema: {
        type: "object",
      },
      args: {
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              public_metadata: {
                type: "object",
                properties: {},
              },
              private_metadata: {
                type: "object",
                properties: {},
              },
              unsafe_metadata: {
                type: "object",
                properties: {},
              },
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "PATCH",
          path: "/users/{user_id}/metadata",
          params: {
            user_id: {
              $resolve: "args.user_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    AdjustUserBillingCreditBalance: {
      name: "Adjust a user's credit balance",
      schema: {
        type: "object",
      },
      args: {
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "ref",
            ref: "AdjustCreditBalanceRequest",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/users/{user_id}/billing/credits",
          params: {
            user_id: {
              $resolve: "args.user_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    VerifyPassword: {
      name: "Verify the password of a user",
      schema: {
        type: "object",
        properties: {
          verified: {
            type: "boolean",
          },
        },
      },
      args: {
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              password: {
                type: "string",
              },
            },
            required: ["password"],
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/users/{user_id}/verify_password",
          params: {
            user_id: {
              $resolve: "args.user_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    VerifyTOTP: {
      name: "Verify a TOTP or backup code for a user",
      schema: {
        type: "object",
        properties: {
          verified: {
            type: "boolean",
          },
          code_type: {
            type: "string",
          },
        },
      },
      args: {
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              code: {
                type: "string",
              },
            },
            required: ["code"],
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/users/{user_id}/verify_totp",
          params: {
            user_id: {
              $resolve: "args.user_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    DisableMFA: {
      name: "Disable a user's MFA methods",
      schema: {
        type: "object",
        properties: {
          user_id: {
            type: "string",
          },
        },
      },
      args: {
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/users/{user_id}/mfa",
          params: {
            user_id: {
              $resolve: "args.user_id",
            },
          },
        },
      },
    },
    DeleteBackupCode: {
      name: "Disable all user's Backup codes",
      schema: {
        type: "object",
        properties: {
          user_id: {
            type: "string",
          },
        },
      },
      args: {
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/users/{user_id}/backup_code",
          params: {
            user_id: {
              $resolve: "args.user_id",
            },
          },
        },
      },
    },
    UserPasskeyDelete: {
      name: "Delete a user passkey",
      schema: {
        type: "object",
      },
      args: {
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        passkey_identification_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/users/{user_id}/passkeys/{passkey_identification_id}",
          params: {
            user_id: {
              $resolve: "args.user_id",
            },
            passkey_identification_id: {
              $resolve: "args.passkey_identification_id",
            },
          },
        },
      },
    },
    UserWeb3WalletDelete: {
      name: "Delete a user web3 wallet",
      schema: {
        type: "object",
      },
      args: {
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        web3_wallet_identification_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/users/{user_id}/web3_wallets/{web3_wallet_identification_id}",
          params: {
            user_id: {
              $resolve: "args.user_id",
            },
            web3_wallet_identification_id: {
              $resolve: "args.web3_wallet_identification_id",
            },
          },
        },
      },
    },
    DeleteTOTP: {
      name: "Delete all the user's TOTPs",
      schema: {
        type: "object",
        properties: {
          user_id: {
            type: "string",
          },
        },
      },
      args: {
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/users/{user_id}/totp",
          params: {
            user_id: {
              $resolve: "args.user_id",
            },
          },
        },
      },
    },
    DeleteExternalAccount: {
      name: "Delete External Account",
      schema: {
        type: "object",
      },
      args: {
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        external_account_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/users/{user_id}/external_accounts/{external_account_id}",
          params: {
            user_id: {
              $resolve: "args.user_id",
            },
            external_account_id: {
              $resolve: "args.external_account_id",
            },
          },
        },
      },
    },
    SetUserPasswordCompromised: {
      name: "Set a user's password as compromised",
      schema: {
        type: "object",
      },
      args: {
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              revoke_all_sessions: {
                type: "boolean",
              },
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/users/{user_id}/password/set_compromised",
          params: {
            user_id: {
              $resolve: "args.user_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    UnsetUserPasswordCompromised: {
      name: "Unset a user's password as compromised",
      schema: {
        type: "object",
      },
      args: {
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/users/{user_id}/password/unset_compromised",
          params: {
            user_id: {
              $resolve: "args.user_id",
            },
          },
        },
      },
    },
    CreateInvitation: {
      name: "Create an invitation",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              email_address: {
                type: "string",
              },
              public_metadata: {
                type: "object",
                properties: {},
              },
              redirect_url: {
                type: "string",
              },
              notify: {
                type: "boolean",
              },
              ignore_existing: {
                type: "boolean",
              },
              expires_in_days: {
                type: "number",
              },
              template_slug: {
                type: "string",
              },
            },
            required: ["email_address"],
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/invitations",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    CreateBulkInvitations: {
      name: "Create multiple invitations",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                email_address: {
                  type: "string",
                },
                public_metadata: {
                  type: "object",
                  properties: {},
                },
                redirect_url: {
                  type: "string",
                },
                notify: {
                  type: "boolean",
                },
                ignore_existing: {
                  type: "boolean",
                },
                expires_in_days: {
                  type: "number",
                },
                template_slug: {
                  type: "string",
                },
              },
              required: ["email_address"],
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/invitations/bulk",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    RevokeInvitation: {
      name: "Revokes an invitation",
      schema: {
        type: "object",
      },
      args: {
        invitation_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/invitations/{invitation_id}/revoke",
          params: {
            invitation_id: {
              $resolve: "args.invitation_id",
            },
          },
        },
      },
    },
    CreateAllowlistIdentifier: {
      name: "Add identifier to the allow-list",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              identifier: {
                type: "string",
              },
              notify: {
                type: "boolean",
              },
            },
            required: ["identifier"],
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/allowlist_identifiers",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    DeleteAllowlistIdentifier: {
      name: "Delete identifier from allow-list",
      schema: {
        type: "object",
      },
      args: {
        identifier_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/allowlist_identifiers/{identifier_id}",
          params: {
            identifier_id: {
              $resolve: "args.identifier_id",
            },
          },
        },
      },
    },
    CreateBlocklistIdentifier: {
      name: "Add identifier to the block-list",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              identifier: {
                type: "string",
              },
            },
            required: ["identifier"],
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/blocklist_identifiers",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    DeleteBlocklistIdentifier: {
      name: "Delete identifier from block-list",
      schema: {
        type: "object",
      },
      args: {
        identifier_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/blocklist_identifiers/{identifier_id}",
          params: {
            identifier_id: {
              $resolve: "args.identifier_id",
            },
          },
        },
      },
    },
    UpdateInstanceAuthConfig: {
      name: "Update instance settings",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              restricted_to_allowlist: {
                type: "boolean",
              },
              from_email_address: {
                type: "string",
              },
              progressive_sign_up: {
                type: "boolean",
              },
              test_mode: {
                type: "boolean",
              },
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "PATCH",
          path: "/beta_features/instance_settings",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    UpdateProductionInstanceDomain: {
      name: "Update production instance domain",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              home_url: {
                type: "string",
              },
              is_secondary: {
                type: "boolean",
              },
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "PUT",
          path: "/beta_features/domain",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    CreateActorToken: {
      name: "Create actor token",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              user_id: {
                type: "string",
              },
              actor: {
                type: "object",
                properties: {
                  sub: {
                    type: "string",
                  },
                },
                required: ["sub"],
              },
              expires_in_seconds: {
                type: "number",
              },
              session_max_duration_in_seconds: {
                type: "number",
              },
            },
            required: ["user_id", "actor"],
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/actor_tokens",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    RevokeActorToken: {
      name: "Revoke actor token",
      schema: {
        type: "object",
      },
      args: {
        actor_token_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/actor_tokens/{actor_token_id}/revoke",
          params: {
            actor_token_id: {
              $resolve: "args.actor_token_id",
            },
          },
        },
      },
    },
    AddDomain: {
      name: "Add a domain",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              is_satellite: {
                type: "boolean",
              },
              proxy_url: {
                type: "string",
              },
            },
            required: ["name", "is_satellite"],
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/domains",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    DeleteDomain: {
      name: "Delete a satellite domain",
      schema: {
        type: "object",
      },
      args: {
        domain_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/domains/{domain_id}",
          params: {
            domain_id: {
              $resolve: "args.domain_id",
            },
          },
        },
      },
    },
    UpdateDomain: {
      name: "Update a domain",
      schema: {
        type: "object",
      },
      args: {
        domain_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              proxy_url: {
                type: "string",
              },
              is_secondary: {
                type: "boolean",
              },
            },
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "PATCH",
          path: "/domains/{domain_id}",
          params: {
            domain_id: {
              $resolve: "args.domain_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    UpdateInstance: {
      name: "Update instance settings",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              test_mode: {
                type: "boolean",
              },
              hibp: {
                type: "boolean",
              },
              support_email: {
                type: "string",
              },
              clerk_js_version: {
                type: "string",
              },
              development_origin: {
                type: "string",
              },
              allowed_origins: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              cookieless_dev: {
                type: "boolean",
              },
              url_based_session_syncing: {
                type: "boolean",
              },
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "PATCH",
          path: "/instance",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    UpdateInstanceRestrictions: {
      name: "Update instance restrictions",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              allowlist: {
                type: "boolean",
              },
              blocklist: {
                type: "boolean",
              },
              allowlist_blocklist_disabled_on_sign_in: {
                type: "boolean",
              },
              block_email_subaddresses: {
                type: "boolean",
              },
              block_disposable_email_domains: {
                type: "boolean",
              },
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "PATCH",
          path: "/instance/restrictions",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    UpdateInstanceProtect: {
      name: "Update instance protect settings",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              rules_enabled: {
                type: "boolean",
              },
              specter_enabled: {
                type: "boolean",
              },
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "PATCH",
          path: "/instance/protect",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    UpdateInstanceCommunication: {
      name: "Update instance communication settings",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              blocked_country_codes: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "PATCH",
          path: "/instance/communication",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    UpdateInstanceOAuthApplicationSettings: {
      name: "Update OAuth application settings",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              dynamic_oauth_client_registration: {
                type: "boolean",
              },
              oauth_jwt_access_tokens: {
                type: "boolean",
              },
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "PATCH",
          path: "/instance/oauth_application_settings",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    ChangeProductionInstanceDomain: {
      name: "Update production instance domain",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              home_url: {
                type: "string",
              },
              is_secondary: {
                type: "boolean",
              },
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/instance/change_domain",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    UpdateInstanceOrganizationSettings: {
      name: "Update instance organization settings",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
              max_allowed_memberships: {
                type: "number",
              },
              admin_delete_enabled: {
                type: "boolean",
              },
              domains_enabled: {
                type: "boolean",
              },
              slug_disabled: {
                type: "boolean",
              },
              domains_enrollment_modes: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              creator_role_id: {
                type: "string",
              },
              domains_default_role_id: {
                type: "string",
              },
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "PATCH",
          path: "/instance/organization_settings",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    CreateSvixApp: {
      name: "Create a Svix app",
      schema: {
        type: "object",
      },
      args: {},
      handler: {
        request: {
          method: "POST",
          path: "/webhooks/svix",
        },
      },
    },
    DeleteSvixApp: {
      name: "Delete a Svix app",
      schema: {
        type: "object",
      },
      args: {},
      handler: {
        request: {
          method: "DELETE",
          path: "/webhooks/svix",
        },
      },
    },
    GenerateSvixAuthURL: {
      name: "Create a Svix Dashboard URL",
      schema: {
        type: "object",
      },
      args: {},
      handler: {
        request: {
          method: "POST",
          path: "/webhooks/svix_url",
        },
      },
    },
    CreateJWTTemplate: {
      name: "Create a JWT template",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              claims: {
                type: "object",
                properties: {},
              },
              lifetime: {
                type: "number",
              },
              allowed_clock_skew: {
                type: "number",
              },
              custom_signing_key: {
                type: "boolean",
              },
              signing_algorithm: {
                type: "string",
              },
              signing_key: {
                type: "string",
              },
            },
            required: ["name", "claims"],
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/jwt_templates",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    UpdateJWTTemplate: {
      name: "Update a JWT template",
      schema: {
        type: "object",
      },
      args: {
        template_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              claims: {
                type: "object",
                properties: {},
              },
              lifetime: {
                type: "number",
              },
              allowed_clock_skew: {
                type: "number",
              },
              custom_signing_key: {
                type: "boolean",
              },
              signing_algorithm: {
                type: "string",
              },
              signing_key: {
                type: "string",
              },
            },
            required: ["name", "claims"],
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "PATCH",
          path: "/jwt_templates/{template_id}",
          params: {
            template_id: {
              $resolve: "args.template_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    DeleteJWTTemplate: {
      name: "Delete a Template",
      schema: {
        type: "object",
      },
      args: {
        template_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/jwt_templates/{template_id}",
          params: {
            template_id: {
              $resolve: "args.template_id",
            },
          },
        },
      },
    },
    CreateMachine: {
      name: "Create a machine",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              scoped_machines: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              default_token_ttl: {
                type: "number",
              },
            },
            required: ["name"],
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/machines",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    UpdateMachine: {
      name: "Update a machine",
      schema: {
        type: "object",
      },
      args: {
        machine_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              default_token_ttl: {
                type: "number",
              },
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "PATCH",
          path: "/machines/{machine_id}",
          params: {
            machine_id: {
              $resolve: "args.machine_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    DeleteMachine: {
      name: "Delete a machine",
      schema: {
        type: "object",
      },
      args: {
        machine_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/machines/{machine_id}",
          params: {
            machine_id: {
              $resolve: "args.machine_id",
            },
          },
        },
      },
    },
    RotateMachineSecretKey: {
      name: "Rotate a machine's secret key",
      schema: {
        type: "object",
      },
      args: {
        machine_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              previous_token_ttl: {
                type: "number",
              },
            },
            required: ["previous_token_ttl"],
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/machines/{machine_id}/secret_key/rotate",
          params: {
            machine_id: {
              $resolve: "args.machine_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    CreateMachineScope: {
      name: "Create a machine scope",
      schema: {
        type: "object",
      },
      args: {
        machine_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              to_machine_id: {
                type: "string",
              },
            },
            required: ["to_machine_id"],
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/machines/{machine_id}/scopes",
          params: {
            machine_id: {
              $resolve: "args.machine_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    DeleteMachineScope: {
      name: "Delete a machine scope",
      schema: {
        type: "object",
      },
      args: {
        machine_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        other_machine_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/machines/{machine_id}/scopes/{other_machine_id}",
          params: {
            machine_id: {
              $resolve: "args.machine_id",
            },
            other_machine_id: {
              $resolve: "args.other_machine_id",
            },
          },
        },
      },
    },
    CreateOrganization: {
      name: "Create an organization",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              created_by: {
                type: "string",
              },
              private_metadata: {
                type: "object",
                properties: {},
              },
              public_metadata: {
                type: "object",
                properties: {},
              },
              slug: {
                type: "string",
              },
              max_allowed_memberships: {
                type: "number",
              },
              created_at: {
                type: "string",
              },
              role_set_key: {
                type: "string",
              },
            },
            required: ["name"],
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/organizations",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    UpdateOrganization: {
      name: "Update an organization",
      schema: {
        type: "object",
      },
      args: {
        organization_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              public_metadata: {
                type: "object",
                properties: {},
              },
              private_metadata: {
                type: "object",
                properties: {},
              },
              name: {
                type: "string",
              },
              slug: {
                type: "string",
              },
              max_allowed_memberships: {
                type: "number",
              },
              admin_delete_enabled: {
                type: "boolean",
              },
              created_at: {
                type: "string",
              },
              role_set_key: {
                type: "string",
              },
            },
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "PATCH",
          path: "/organizations/{organization_id}",
          params: {
            organization_id: {
              $resolve: "args.organization_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    DeleteOrganization: {
      name: "Delete an organization",
      schema: {
        type: "object",
      },
      args: {
        organization_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/organizations/{organization_id}",
          params: {
            organization_id: {
              $resolve: "args.organization_id",
            },
          },
        },
      },
    },
    MergeOrganizationMetadata: {
      name: "Merge and update metadata for an organization",
      schema: {
        type: "object",
      },
      args: {
        organization_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              public_metadata: {
                type: "object",
                properties: {},
              },
              private_metadata: {
                type: "object",
                properties: {},
              },
            },
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "PATCH",
          path: "/organizations/{organization_id}/metadata",
          params: {
            organization_id: {
              $resolve: "args.organization_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    UploadOrganizationLogo: {
      name: "Upload a logo for the organization",
      schema: {
        type: "object",
      },
      args: {
        organization_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "PUT",
          path: "/organizations/{organization_id}/logo",
          params: {
            organization_id: {
              $resolve: "args.organization_id",
            },
          },
        },
      },
    },
    DeleteOrganizationLogo: {
      name: "Delete the organization's logo.",
      schema: {
        type: "object",
      },
      args: {
        organization_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/organizations/{organization_id}/logo",
          params: {
            organization_id: {
              $resolve: "args.organization_id",
            },
          },
        },
      },
    },
    AdjustOrganizationBillingCreditBalance: {
      name: "Adjust an organization's credit balance",
      schema: {
        type: "object",
      },
      args: {
        organization_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "ref",
            ref: "AdjustCreditBalanceRequest",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/organizations/{organization_id}/billing/credits",
          params: {
            organization_id: {
              $resolve: "args.organization_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    CreateOrganizationInvitation: {
      name: "Create and send an organization invitation",
      schema: {
        type: "object",
      },
      args: {
        organization_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              email_address: {
                type: "string",
              },
              inviter_user_id: {
                type: "string",
              },
              role: {
                type: "string",
              },
              public_metadata: {
                type: "object",
                properties: {},
              },
              private_metadata: {
                type: "object",
                properties: {},
              },
              redirect_url: {
                type: "string",
              },
              expires_in_days: {
                type: "number",
              },
              notify: {
                type: "boolean",
              },
            },
            required: ["email_address", "role"],
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/organizations/{organization_id}/invitations",
          params: {
            organization_id: {
              $resolve: "args.organization_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    CreateOrganizationInvitationBulk: {
      name: "Bulk create and send organization invitations",
      schema: {
        type: "object",
      },
      args: {
        organization_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                email_address: {
                  type: "string",
                },
                inviter_user_id: {
                  type: "string",
                },
                role: {
                  type: "string",
                },
                public_metadata: {
                  type: "object",
                  properties: {},
                },
                private_metadata: {
                  type: "object",
                  properties: {},
                },
                redirect_url: {
                  type: "string",
                },
                expires_in_days: {
                  type: "number",
                },
                notify: {
                  type: "boolean",
                },
              },
              required: ["email_address", "role"],
            },
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/organizations/{organization_id}/invitations/bulk",
          params: {
            organization_id: {
              $resolve: "args.organization_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    RevokeOrganizationInvitation: {
      name: "Revoke a pending organization invitation",
      schema: {
        type: "object",
      },
      args: {
        organization_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        invitation_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              requesting_user_id: {
                type: "string",
              },
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/organizations/{organization_id}/invitations/{invitation_id}/revoke",
          params: {
            organization_id: {
              $resolve: "args.organization_id",
            },
            invitation_id: {
              $resolve: "args.invitation_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    CreateOrganizationRole: {
      name: "Create an organization role",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              key: {
                type: "string",
              },
              description: {
                type: "string",
              },
              permissions: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              include_in_initial_role_set: {
                type: "boolean",
              },
            },
            required: ["name", "key"],
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/organization_roles",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    UpdateOrganizationRole: {
      name: "Update an organization role",
      schema: {
        type: "object",
      },
      args: {
        organization_role_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              key: {
                type: "string",
              },
              description: {
                type: "string",
              },
              permissions: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "PATCH",
          path: "/organization_roles/{organization_role_id}",
          params: {
            organization_role_id: {
              $resolve: "args.organization_role_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    DeleteOrganizationRole: {
      name: "Delete an organization role",
      schema: {
        type: "object",
      },
      args: {
        organization_role_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/organization_roles/{organization_role_id}",
          params: {
            organization_role_id: {
              $resolve: "args.organization_role_id",
            },
          },
        },
      },
    },
    AssignPermissionToOrganizationRole: {
      name: "Assign a permission to an organization role",
      schema: {
        type: "object",
      },
      args: {
        organization_role_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        permission_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/organization_roles/{organization_role_id}/permissions/{permission_id}",
          params: {
            organization_role_id: {
              $resolve: "args.organization_role_id",
            },
            permission_id: {
              $resolve: "args.permission_id",
            },
          },
        },
      },
    },
    RemovePermissionFromOrganizationRole: {
      name: "Remove a permission from an organization role",
      schema: {
        type: "object",
      },
      args: {
        organization_role_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        permission_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/organization_roles/{organization_role_id}/permissions/{permission_id}",
          params: {
            organization_role_id: {
              $resolve: "args.organization_role_id",
            },
            permission_id: {
              $resolve: "args.permission_id",
            },
          },
        },
      },
    },
    CreateOrganizationMembership: {
      name: "Create a new organization membership",
      schema: {
        type: "object",
      },
      args: {
        organization_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              user_id: {
                type: "string",
              },
              role: {
                type: "string",
              },
              public_metadata: {
                type: "object",
                properties: {},
              },
              private_metadata: {
                type: "object",
                properties: {},
              },
            },
            required: ["user_id", "role"],
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/organizations/{organization_id}/memberships",
          params: {
            organization_id: {
              $resolve: "args.organization_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    UpdateOrganizationMembership: {
      name: "Update an organization membership",
      schema: {
        type: "object",
      },
      args: {
        organization_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              role: {
                type: "string",
              },
            },
            required: ["role"],
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "PATCH",
          path: "/organizations/{organization_id}/memberships/{user_id}",
          params: {
            organization_id: {
              $resolve: "args.organization_id",
            },
            user_id: {
              $resolve: "args.user_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    DeleteOrganizationMembership: {
      name: "Remove a member from an organization",
      schema: {
        type: "object",
      },
      args: {
        organization_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/organizations/{organization_id}/memberships/{user_id}",
          params: {
            organization_id: {
              $resolve: "args.organization_id",
            },
            user_id: {
              $resolve: "args.user_id",
            },
          },
        },
      },
    },
    UpdateOrganizationMembershipMetadata: {
      name: "Merge and update organization membership metadata",
      schema: {
        type: "object",
      },
      args: {
        organization_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        user_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              public_metadata: {
                type: "object",
                properties: {},
              },
              private_metadata: {
                type: "object",
                properties: {},
              },
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "PATCH",
          path: "/organizations/{organization_id}/memberships/{user_id}/metadata",
          params: {
            organization_id: {
              $resolve: "args.organization_id",
            },
            user_id: {
              $resolve: "args.user_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    CreateOrganizationDomain: {
      name: "Create a new organization domain.",
      schema: {
        type: "object",
      },
      args: {
        organization_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              enrollment_mode: {
                type: "string",
              },
              verified: {
                type: "boolean",
              },
            },
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/organizations/{organization_id}/domains",
          params: {
            organization_id: {
              $resolve: "args.organization_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    UpdateOrganizationDomain: {
      name: "Update an organization domain.",
      schema: {
        type: "object",
      },
      args: {
        organization_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        domain_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              enrollment_mode: {
                type: "string",
              },
              verified: {
                type: "boolean",
              },
            },
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "PATCH",
          path: "/organizations/{organization_id}/domains/{domain_id}",
          params: {
            organization_id: {
              $resolve: "args.organization_id",
            },
            domain_id: {
              $resolve: "args.domain_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    DeleteOrganizationDomain: {
      name: "Remove a domain from an organization.",
      schema: {
        type: "object",
      },
      args: {
        organization_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        domain_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/organizations/{organization_id}/domains/{domain_id}",
          params: {
            organization_id: {
              $resolve: "args.organization_id",
            },
            domain_id: {
              $resolve: "args.domain_id",
            },
          },
        },
      },
    },
    VerifyDomainProxy: {
      name: "Verify the proxy configuration for your domain",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              domain_id: {
                type: "string",
              },
              proxy_url: {
                type: "string",
              },
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/proxy_checks",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    CreateRedirectURL: {
      name: "Create a redirect URL",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              url: {
                type: "string",
              },
            },
            required: ["url"],
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/redirect_urls",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    DeleteRedirectURL: {
      name: "Delete a redirect URL",
      schema: {
        type: "object",
      },
      args: {
        id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/redirect_urls/{id}",
          params: {
            id: {
              $resolve: "args.id",
            },
          },
        },
      },
    },
    CreateSignInToken: {
      name: "Create sign-in token",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              user_id: {
                type: "string",
              },
              expires_in_seconds: {
                type: "number",
              },
            },
            required: ["user_id"],
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/sign_in_tokens",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    RevokeSignInToken: {
      name: "Revoke the given sign-in token",
      schema: {
        type: "object",
      },
      args: {
        sign_in_token_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/sign_in_tokens/{sign_in_token_id}/revoke",
          params: {
            sign_in_token_id: {
              $resolve: "args.sign_in_token_id",
            },
          },
        },
      },
    },
    UpdateSignUp: {
      name: "Update a sign-up",
      schema: {
        type: "object",
      },
      args: {
        id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              external_id: {
                type: "string",
              },
              custom_action: {
                type: "boolean",
              },
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "PATCH",
          path: "/sign_ups/{id}",
          params: {
            id: {
              $resolve: "args.id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    CreateOAuthApplication: {
      name: "Create an OAuth application",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              redirect_uris: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              callback_url: {
                type: "string",
              },
              scopes: {
                type: "string",
              },
              consent_screen_enabled: {
                type: "boolean",
              },
              pkce_required: {
                type: "boolean",
              },
              public: {
                type: "boolean",
              },
            },
            required: ["name"],
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/oauth_applications",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    UpdateOAuthApplication: {
      name: "Update an OAuth application",
      schema: {
        type: "object",
      },
      args: {
        oauth_application_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              redirect_uris: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              callback_url: {
                type: "string",
              },
              scopes: {
                type: "string",
              },
              consent_screen_enabled: {
                type: "boolean",
              },
              pkce_required: {
                type: "boolean",
              },
              public: {
                type: "boolean",
              },
            },
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "PATCH",
          path: "/oauth_applications/{oauth_application_id}",
          params: {
            oauth_application_id: {
              $resolve: "args.oauth_application_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    DeleteOAuthApplication: {
      name: "Delete an OAuth application",
      schema: {
        type: "object",
      },
      args: {
        oauth_application_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/oauth_applications/{oauth_application_id}",
          params: {
            oauth_application_id: {
              $resolve: "args.oauth_application_id",
            },
          },
        },
      },
    },
    UploadOAuthApplicationLogo: {
      name: "Upload a logo for the OAuth application",
      schema: {
        type: "object",
      },
      args: {
        oauth_application_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "PUT",
          path: "/oauth_applications/{oauth_application_id}/logo",
          params: {
            oauth_application_id: {
              $resolve: "args.oauth_application_id",
            },
          },
        },
      },
    },
    RotateOAuthApplicationSecret: {
      name: "Rotate the client secret of the given OAuth application",
      schema: {
        type: "object",
      },
      args: {
        oauth_application_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/oauth_applications/{oauth_application_id}/rotate_secret",
          params: {
            oauth_application_id: {
              $resolve: "args.oauth_application_id",
            },
          },
        },
      },
    },
    CreateSAMLConnection: {
      name: "Create a SAML Connection",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {},
            required: ["domain"],
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/saml_connections",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    UpdateSAMLConnection: {
      name: "Update a SAML Connection",
      schema: {
        type: "object",
      },
      args: {
        saml_connection_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              domain: {
                type: "string",
              },
              domains: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              idp_entity_id: {
                type: "string",
              },
              idp_sso_url: {
                type: "string",
              },
              idp_certificate: {
                type: "string",
              },
              idp_metadata_url: {
                type: "string",
              },
              idp_metadata: {
                type: "string",
              },
              organization_id: {
                type: "string",
              },
              attribute_mapping: {
                type: "object",
                properties: {
                  user_id: {
                    type: "string",
                  },
                  email_address: {
                    type: "string",
                  },
                  first_name: {
                    type: "string",
                  },
                  last_name: {
                    type: "string",
                  },
                },
              },
              active: {
                type: "boolean",
              },
              sync_user_attributes: {
                type: "boolean",
              },
              allow_subdomains: {
                type: "boolean",
              },
              allow_idp_initiated: {
                type: "boolean",
              },
              disable_additional_identifications: {
                type: "boolean",
              },
              allow_organization_account_linking: {
                type: "boolean",
              },
              force_authn: {
                type: "boolean",
              },
              consent_verified_domains_deletion: {
                type: "boolean",
              },
            },
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "PATCH",
          path: "/saml_connections/{saml_connection_id}",
          params: {
            saml_connection_id: {
              $resolve: "args.saml_connection_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    DeleteSAMLConnection: {
      name: "Delete a SAML Connection",
      schema: {
        type: "object",
      },
      args: {
        saml_connection_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/saml_connections/{saml_connection_id}",
          params: {
            saml_connection_id: {
              $resolve: "args.saml_connection_id",
            },
          },
        },
      },
    },
    CreateEnterpriseConnection: {
      name: "Create an enterprise connection",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              provider: {
                type: "string",
              },
              domains: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              organization_id: {
                type: "string",
              },
              allow_organization_account_linking: {
                type: "boolean",
              },
              active: {
                type: "boolean",
              },
              saml: {
                type: "object",
                properties: {
                  idp_entity_id: {
                    type: "string",
                  },
                  idp_sso_url: {
                    type: "string",
                  },
                  idp_certificate: {
                    type: "string",
                  },
                  idp_metadata_url: {
                    type: "string",
                  },
                  idp_metadata: {
                    type: "string",
                  },
                  attribute_mapping: {
                    type: "object",
                    properties: {
                      user_id: {
                        type: "string",
                      },
                      email_address: {
                        type: "string",
                      },
                      first_name: {
                        type: "string",
                      },
                      last_name: {
                        type: "string",
                      },
                    },
                  },
                  allow_subdomains: {
                    type: "boolean",
                  },
                  allow_idp_initiated: {
                    type: "boolean",
                  },
                  force_authn: {
                    type: "boolean",
                  },
                },
              },
              oidc: {
                type: "object",
                properties: {
                  client_id: {
                    type: "string",
                  },
                  client_secret: {
                    type: "string",
                  },
                  discovery_url: {
                    type: "string",
                  },
                  auth_url: {
                    type: "string",
                  },
                  token_url: {
                    type: "string",
                  },
                  user_info_url: {
                    type: "string",
                  },
                  requires_pkce: {
                    type: "boolean",
                  },
                },
              },
              custom_attributes: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    key: {
                      type: "string",
                    },
                    sso_path: {
                      type: "string",
                    },
                    scim_path: {
                      type: "string",
                    },
                  },
                  required: ["name", "key"],
                },
              },
            },
            required: ["name", "provider", "domains"],
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/enterprise_connections",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    UpdateEnterpriseConnection: {
      name: "Update an enterprise connection",
      schema: {
        type: "object",
      },
      args: {
        enterprise_connection_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              domains: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              active: {
                type: "boolean",
              },
              sync_user_attributes: {
                type: "boolean",
              },
              disable_additional_identifications: {
                type: "boolean",
              },
              allow_organization_account_linking: {
                type: "boolean",
              },
              organization_id: {
                type: "string",
              },
              saml: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  idp_entity_id: {
                    type: "string",
                  },
                  idp_sso_url: {
                    type: "string",
                  },
                  idp_certificate: {
                    type: "string",
                  },
                  idp_metadata_url: {
                    type: "string",
                  },
                  idp_metadata: {
                    type: "string",
                  },
                  attribute_mapping: {
                    type: "object",
                    properties: {
                      user_id: {
                        type: "string",
                      },
                      email_address: {
                        type: "string",
                      },
                      first_name: {
                        type: "string",
                      },
                      last_name: {
                        type: "string",
                      },
                    },
                  },
                  allow_subdomains: {
                    type: "boolean",
                  },
                  allow_idp_initiated: {
                    type: "boolean",
                  },
                  force_authn: {
                    type: "boolean",
                  },
                },
              },
              oidc: {
                type: "object",
                properties: {
                  client_id: {
                    type: "string",
                  },
                  client_secret: {
                    type: "string",
                  },
                  discovery_url: {
                    type: "string",
                  },
                  auth_url: {
                    type: "string",
                  },
                  token_url: {
                    type: "string",
                  },
                  user_info_url: {
                    type: "string",
                  },
                  requires_pkce: {
                    type: "boolean",
                  },
                },
              },
              custom_attributes: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    key: {
                      type: "string",
                    },
                    sso_path: {
                      type: "string",
                    },
                    scim_path: {
                      type: "string",
                    },
                  },
                  required: ["name", "key"],
                },
              },
            },
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "PATCH",
          path: "/enterprise_connections/{enterprise_connection_id}",
          params: {
            enterprise_connection_id: {
              $resolve: "args.enterprise_connection_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    DeleteEnterpriseConnection: {
      name: "Delete an enterprise connection",
      schema: {
        type: "object",
      },
      args: {
        enterprise_connection_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/enterprise_connections/{enterprise_connection_id}",
          params: {
            enterprise_connection_id: {
              $resolve: "args.enterprise_connection_id",
            },
          },
        },
      },
    },
    CreateTestingToken: {
      name: "Retrieve a new testing token",
      schema: {
        type: "object",
      },
      args: {},
      handler: {
        request: {
          method: "POST",
          path: "/testing_tokens",
        },
      },
    },
    CreateAgentTask: {
      name: "Create agent task",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              on_behalf_of: {
                type: "object",
                properties: {
                  user_id: {
                    type: "string",
                  },
                  identifier: {
                    type: "string",
                  },
                },
              },
              permissions: {
                type: "string",
              },
              agent_name: {
                type: "string",
              },
              task_description: {
                type: "string",
              },
              redirect_url: {
                type: "string",
              },
              session_max_duration_in_seconds: {
                type: "number",
              },
            },
            required: [
              "on_behalf_of",
              "permissions",
              "agent_name",
              "task_description",
              "redirect_url",
            ],
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/agents/tasks",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    RevokeAgentTask: {
      name: "Revoke agent task",
      schema: {
        type: "object",
      },
      args: {
        agent_task_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/agents/tasks/{agent_task_id}/revoke",
          params: {
            agent_task_id: {
              $resolve: "args.agent_task_id",
            },
          },
        },
      },
    },
    CreateWaitlistEntry: {
      name: "Create a waitlist entry",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              email_address: {
                type: "string",
              },
              notify: {
                type: "boolean",
              },
            },
            required: ["email_address"],
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/waitlist_entries",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    CreateBulkWaitlistEntries: {
      name: "Create multiple waitlist entries",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                email_address: {
                  type: "string",
                },
                notify: {
                  type: "boolean",
                },
              },
              required: ["email_address"],
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/waitlist_entries/bulk",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    DeleteWaitlistEntry: {
      name: "Delete a pending waitlist entry",
      schema: {
        type: "object",
      },
      args: {
        waitlist_entry_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/waitlist_entries/{waitlist_entry_id}",
          params: {
            waitlist_entry_id: {
              $resolve: "args.waitlist_entry_id",
            },
          },
        },
      },
    },
    InviteWaitlistEntry: {
      name: "Invite a waitlist entry",
      schema: {
        type: "object",
      },
      args: {
        waitlist_entry_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              ignore_existing: {
                type: "boolean",
              },
            },
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/waitlist_entries/{waitlist_entry_id}/invite",
          params: {
            waitlist_entry_id: {
              $resolve: "args.waitlist_entry_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    RejectWaitlistEntry: {
      name: "Reject a waitlist entry",
      schema: {
        type: "object",
      },
      args: {
        waitlist_entry_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/waitlist_entries/{waitlist_entry_id}/reject",
          params: {
            waitlist_entry_id: {
              $resolve: "args.waitlist_entry_id",
            },
          },
        },
      },
    },
    CreateBillingPrice: {
      name: "Create a custom billing price",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "ref",
            ref: "CreateBillingPriceRequest",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/billing/prices",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    CancelCommerceSubscriptionItem: {
      name: "Cancel a subscription item",
      schema: {
        type: "object",
      },
      args: {
        subscription_item_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        end_now: {
          schema: {
            type: "boolean",
          },
          required: false,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/billing/subscription_items/{subscription_item_id}",
          params: {
            subscription_item_id: {
              $resolve: "args.subscription_item_id",
            },
          },
          query: {
            end_now: {
              $resolve: "args.end_now",
            },
          },
        },
      },
    },
    ExtendBillingSubscriptionItemFreeTrial: {
      name: "Extend free trial for a subscription item",
      schema: {
        type: "object",
      },
      args: {
        subscription_item_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "ref",
            ref: "ExtendFreeTrialRequest",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/billing/subscription_items/{subscription_item_id}/extend_free_trial",
          params: {
            subscription_item_id: {
              $resolve: "args.subscription_item_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    CreateBillingPriceTransition: {
      name: "Create a price transition for a subscription item",
      schema: {
        type: "object",
      },
      args: {
        subscription_item_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "ref",
            ref: "PriceTransitionRequest",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/billing/subscription_items/{subscription_item_id}/price_transition",
          params: {
            subscription_item_id: {
              $resolve: "args.subscription_item_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    CreateOrganizationPermission: {
      name: "Create a new organization permission",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              key: {
                type: "string",
              },
              description: {
                type: "string",
              },
            },
            required: ["name", "key"],
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/organization_permissions",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    UpdateOrganizationPermission: {
      name: "Update an organization permission",
      schema: {
        type: "object",
      },
      args: {
        permission_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              key: {
                type: "string",
              },
              description: {
                type: "string",
              },
            },
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "PATCH",
          path: "/organization_permissions/{permission_id}",
          params: {
            permission_id: {
              $resolve: "args.permission_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    DeleteOrganizationPermission: {
      name: "Delete an organization permission",
      schema: {
        type: "object",
      },
      args: {
        permission_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/organization_permissions/{permission_id}",
          params: {
            permission_id: {
              $resolve: "args.permission_id",
            },
          },
        },
      },
    },
    CreateRoleSet: {
      name: "Create a role set",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              key: {
                type: "string",
              },
              description: {
                type: "string",
              },
              default_role_key: {
                type: "string",
              },
              creator_role_key: {
                type: "string",
              },
              type: {
                type: "string",
              },
              roles: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
            required: ["name", "default_role_key", "creator_role_key", "roles"],
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/role_sets",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    UpdateRoleSet: {
      name: "Update a role set",
      schema: {
        type: "object",
      },
      args: {
        role_set_key_or_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              key: {
                type: "string",
              },
              description: {
                type: "string",
              },
              type: {
                type: "string",
              },
              default_role_key: {
                type: "string",
              },
              creator_role_key: {
                type: "string",
              },
            },
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "PATCH",
          path: "/role_sets/{role_set_key_or_id}",
          params: {
            role_set_key_or_id: {
              $resolve: "args.role_set_key_or_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    ReplaceRoleSet: {
      name: "Replace a role set",
      schema: {
        type: "object",
      },
      args: {
        role_set_key_or_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              dest_role_set_key: {
                type: "string",
              },
              reassignment_mappings: {
                type: "ref",
                ref: "ReassignmentMappings",
              },
            },
            required: ["dest_role_set_key"],
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/role_sets/{role_set_key_or_id}/replace",
          params: {
            role_set_key_or_id: {
              $resolve: "args.role_set_key_or_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    AddRolesToRoleSet: {
      name: "Add roles to a role set",
      schema: {
        type: "object",
      },
      args: {
        role_set_key_or_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              role_keys: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              default_role_key: {
                type: "string",
              },
              creator_role_key: {
                type: "string",
              },
            },
            required: ["role_keys"],
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/role_sets/{role_set_key_or_id}/roles",
          params: {
            role_set_key_or_id: {
              $resolve: "args.role_set_key_or_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    ReplaceRoleInRoleSet: {
      name: "Replace a role in a role set",
      schema: {
        type: "object",
      },
      args: {
        role_set_key_or_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              role_key: {
                type: "string",
              },
              to_role_key: {
                type: "string",
              },
            },
            required: ["role_key", "to_role_key"],
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/role_sets/{role_set_key_or_id}/roles/replace",
          params: {
            role_set_key_or_id: {
              $resolve: "args.role_set_key_or_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    createApiKey: {
      name: "Create an API Key",
      schema: {
        type: "object",
        properties: {
          object: {
            type: "string",
          },
          id: {
            type: "string",
          },
          type: {
            type: "string",
          },
          subject: {
            type: "string",
          },
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          claims: {
            type: "object",
            properties: {},
          },
          scopes: {
            type: "array",
            items: {
              type: "string",
            },
          },
          secret: {
            type: "string",
          },
          revoked: {
            type: "boolean",
          },
          revocation_reason: {
            type: "string",
          },
          expired: {
            type: "boolean",
          },
          expiration: {
            type: "number",
          },
          created_by: {
            type: "string",
          },
          last_used_at: {
            type: "number",
          },
          created_at: {
            type: "number",
          },
          updated_at: {
            type: "number",
          },
        },
        required: [
          "object",
          "id",
          "type",
          "subject",
          "name",
          "claims",
          "scopes",
          "secret",
          "revoked",
          "revocation_reason",
          "expired",
          "expiration",
          "created_by",
          "last_used_at",
          "created_at",
          "updated_at",
        ],
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              type: {
                type: "string",
              },
              name: {
                type: "string",
              },
              description: {
                type: "string",
              },
              subject: {
                type: "string",
              },
              claims: {
                type: "object",
                properties: {},
              },
              scopes: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              created_by: {
                type: "string",
              },
              seconds_until_expiration: {
                type: "number",
              },
            },
            required: ["name", "subject"],
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/api_keys",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    updateApiKey: {
      name: "Update an API Key",
      schema: {
        type: "object",
        properties: {
          object: {
            type: "string",
          },
          id: {
            type: "string",
          },
          type: {
            type: "string",
          },
          subject: {
            type: "string",
          },
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          claims: {
            type: "object",
            properties: {},
          },
          scopes: {
            type: "array",
            items: {
              type: "string",
            },
          },
          revoked: {
            type: "boolean",
          },
          revocation_reason: {
            type: "string",
          },
          expired: {
            type: "boolean",
          },
          expiration: {
            type: "number",
          },
          created_by: {
            type: "string",
          },
          last_used_at: {
            type: "number",
          },
          created_at: {
            type: "number",
          },
          updated_at: {
            type: "number",
          },
        },
        required: [
          "object",
          "id",
          "type",
          "subject",
          "name",
          "claims",
          "scopes",
          "revoked",
          "revocation_reason",
          "expired",
          "expiration",
          "created_by",
          "last_used_at",
          "created_at",
          "updated_at",
        ],
      },
      args: {
        apiKeyID: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              claims: {
                type: "object",
                properties: {},
              },
              scopes: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              description: {
                type: "string",
              },
              subject: {
                type: "string",
              },
              seconds_until_expiration: {
                type: "number",
              },
            },
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "PATCH",
          path: "/api_keys/{apiKeyID}",
          params: {
            apiKeyID: {
              $resolve: "args.apiKeyID",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    deleteApiKey: {
      name: "Delete an API Key",
      schema: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          object: {
            type: "string",
          },
          deleted: {
            type: "boolean",
          },
        },
        required: ["id", "object", "deleted"],
      },
      args: {
        apiKeyID: {
          schema: {
            type: "string",
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "DELETE",
          path: "/api_keys/{apiKeyID}",
          params: {
            apiKeyID: {
              $resolve: "args.apiKeyID",
            },
          },
        },
      },
    },
    revokeApiKey: {
      name: "Revoke an API Key",
      schema: {
        type: "object",
        properties: {
          object: {
            type: "string",
          },
          id: {
            type: "string",
          },
          type: {
            type: "string",
          },
          subject: {
            type: "string",
          },
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          claims: {
            type: "object",
            properties: {},
          },
          scopes: {
            type: "array",
            items: {
              type: "string",
            },
          },
          revoked: {
            type: "boolean",
          },
          revocation_reason: {
            type: "string",
          },
          expired: {
            type: "boolean",
          },
          expiration: {
            type: "number",
          },
          created_by: {
            type: "string",
          },
          last_used_at: {
            type: "number",
          },
          created_at: {
            type: "number",
          },
          updated_at: {
            type: "number",
          },
        },
        required: [
          "object",
          "id",
          "type",
          "subject",
          "name",
          "claims",
          "scopes",
          "revoked",
          "revocation_reason",
          "expired",
          "expiration",
          "created_by",
          "last_used_at",
          "created_at",
          "updated_at",
        ],
      },
      args: {
        apiKeyID: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              revocation_reason: {
                type: "string",
              },
            },
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/api_keys/{apiKeyID}/revoke",
          params: {
            apiKeyID: {
              $resolve: "args.apiKeyID",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    verifyApiKey: {
      name: "Verify an API Key",
      schema: {
        type: "object",
        properties: {
          object: {
            type: "string",
          },
          id: {
            type: "string",
          },
          type: {
            type: "string",
          },
          subject: {
            type: "string",
          },
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          claims: {
            type: "object",
            properties: {},
          },
          scopes: {
            type: "array",
            items: {
              type: "string",
            },
          },
          revoked: {
            type: "boolean",
          },
          revocation_reason: {
            type: "string",
          },
          expired: {
            type: "boolean",
          },
          expiration: {
            type: "number",
          },
          created_by: {
            type: "string",
          },
          last_used_at: {
            type: "number",
          },
          created_at: {
            type: "number",
          },
          updated_at: {
            type: "number",
          },
        },
        required: [
          "object",
          "id",
          "type",
          "subject",
          "name",
          "claims",
          "scopes",
          "revoked",
          "revocation_reason",
          "expired",
          "expiration",
          "created_by",
          "last_used_at",
          "created_at",
          "updated_at",
        ],
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              secret: {
                type: "string",
              },
            },
            required: ["secret"],
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/api_keys/verify",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    createM2MToken: {
      name: "Create a M2M Token",
      schema: {
        type: "object",
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              token_format: {
                type: "string",
              },
              seconds_until_expiration: {
                type: "number",
              },
              claims: {
                type: "object",
                properties: {},
              },
              min_remaining_ttl_seconds: {
                type: "number",
              },
            },
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/m2m_tokens",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    revokeM2MToken: {
      name: "Revoke a M2M Token",
      schema: {
        type: "object",
        properties: {
          object: {
            type: "string",
          },
          id: {
            type: "string",
          },
          subject: {
            type: "string",
          },
          claims: {
            type: "object",
            properties: {},
          },
          scopes: {
            type: "array",
            items: {
              type: "string",
            },
          },
          revoked: {
            type: "boolean",
          },
          revocation_reason: {
            type: "string",
          },
          expired: {
            type: "boolean",
          },
          expiration: {
            type: "number",
          },
          last_used_at: {
            type: "number",
          },
          created_at: {
            type: "number",
          },
          updated_at: {
            type: "number",
          },
        },
        required: [
          "object",
          "id",
          "subject",
          "revoked",
          "revocation_reason",
          "expired",
          "expiration",
          "last_used_at",
          "created_at",
          "updated_at",
        ],
      },
      args: {
        m2m_token_id: {
          schema: {
            type: "string",
          },
          required: true,
        },
        data: {
          schema: {
            type: "object",
            properties: {
              revocation_reason: {
                type: "string",
              },
            },
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/m2m_tokens/{m2m_token_id}/revoke",
          params: {
            m2m_token_id: {
              $resolve: "args.m2m_token_id",
            },
          },
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    verifyM2MToken: {
      name: "Verify a M2M Token",
      schema: {
        type: "object",
        properties: {
          object: {
            type: "string",
          },
          id: {
            type: "string",
          },
          subject: {
            type: "string",
          },
          claims: {
            type: "object",
            properties: {},
          },
          scopes: {
            type: "array",
            items: {
              type: "string",
            },
          },
          revoked: {
            type: "boolean",
          },
          revocation_reason: {
            type: "string",
          },
          expired: {
            type: "boolean",
          },
          expiration: {
            type: "number",
          },
          last_used_at: {
            type: "number",
          },
          created_at: {
            type: "number",
          },
          updated_at: {
            type: "number",
          },
        },
        required: [
          "object",
          "id",
          "subject",
          "revoked",
          "revocation_reason",
          "expired",
          "expiration",
          "last_used_at",
          "created_at",
          "updated_at",
        ],
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              token: {
                type: "string",
              },
            },
            required: ["token"],
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/m2m_tokens/verify",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
    verifyOAuthAccessToken: {
      name: "Verify an OAuth Access Token",
      schema: {
        type: "object",
        properties: {
          object: {
            type: "string",
          },
          id: {
            type: "string",
          },
          client_id: {
            type: "string",
          },
          subject: {
            type: "string",
          },
          scopes: {
            type: "array",
            items: {
              type: "string",
            },
          },
          revoked: {
            type: "boolean",
          },
          revocation_reason: {
            type: "string",
          },
          expired: {
            type: "boolean",
          },
          expiration: {
            type: "number",
          },
          created_at: {
            type: "number",
          },
          updated_at: {
            type: "number",
          },
        },
        required: [
          "object",
          "id",
          "client_id",
          "subject",
          "scopes",
          "revoked",
          "revocation_reason",
          "expired",
          "expiration",
          "created_at",
          "updated_at",
        ],
      },
      args: {
        data: {
          schema: {
            type: "object",
            properties: {
              access_token: {
                type: "string",
              },
              secret: {
                type: "string",
              },
            },
          },
          required: true,
        },
      },
      handler: {
        request: {
          method: "POST",
          path: "/oauth_applications/access_tokens/verify",
          body: {
            type: "json",
            data: {
              $resolve: "args.data",
            },
          },
        },
      },
    },
  },
};

export default spec;
