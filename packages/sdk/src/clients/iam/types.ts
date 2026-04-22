export interface paths {
    "/organizations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Organizations */
        get: {
            parameters: {
                query?: {
                    cursor?: components["parameters"]["queryCursor"];
                    /** @example 20 */
                    limit?: components["parameters"]["queryLimit"];
                    ids?: string[];
                    name?: string;
                    handle?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of organizations */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Organization"][];
                    };
                };
            };
        };
        put?: never;
        /** Create Organization */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        name: string;
                        handle: string;
                        owner: string;
                    };
                };
            };
            responses: {
                /** @description Organization created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Organization"];
                    };
                };
                /** @description Invalid request or validation error */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
                    };
                };
                401: components["responses"]["Unauthorized"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/check-handle": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Check Organization Handle */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        handle: string;
                    };
                };
            };
            responses: {
                /** @description Organization handle checked */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            handle: string;
                            available: boolean;
                        };
                    };
                };
                /** @description Invalid request or validation error */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
                    };
                };
                401: components["responses"]["Unauthorized"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizations/{organization_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Organization */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organization_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Organization details */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Organization"];
                    };
                };
                /** @description Invalid organization id */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
                    };
                };
                /** @description Organization not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        /** Delete Organization */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organization_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Organization deleted */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            success?: boolean;
                        };
                    };
                };
                404: components["responses"]["NotFound"];
            };
        };
        options?: never;
        head?: never;
        /** Update Organization */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organization_id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": {
                        name?: string;
                        handle?: string;
                    };
                };
            };
            responses: {
                /** @description Organization updated */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Organization"];
                    };
                };
                /** @description Invalid organization id or validation error */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
                    };
                };
                /** @description Organization not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
                    };
                };
            };
        };
        trace?: never;
    };
    "/organizations/{organization_id}/invites": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List organization invites */
        get: {
            parameters: {
                query?: {
                    /** @example 20 */
                    limit?: components["parameters"]["queryLimit"];
                    cursor?: components["parameters"]["queryCursor"];
                    /** @example PENDING,ACCEPTED */
                    statuses?: components["schemas"]["InviteStatus"][];
                    email?: string;
                };
                header?: never;
                path: {
                    organization_id: components["parameters"]["pathOrganizationId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Invites page */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            items: components["schemas"]["OrganizationInvite"][];
                            next_cursor?: string | null;
                        };
                    };
                };
                401: components["responses"]["Unauthorized"];
            };
        };
        put?: never;
        /**
         * Create an invite
         * @description Creates a single-use invite and returns a plaintext token once. The token must be stored client-side for composing an accept URL.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organization_id: components["parameters"]["pathOrganizationId"];
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        /** Format: email */
                        email: string;
                        role: string;
                        /** @default 259200 */
                        expires_in_seconds?: number;
                    };
                };
            };
            responses: {
                /** @description Invite created */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            invite: components["schemas"]["OrganizationInvite"];
                            /** @description Plaintext token (returned once) */
                            token: string;
                            /** @description Optional convenience URL if your backend constructs it */
                            accept_url?: string;
                        };
                    };
                };
                400: components["responses"]["ValidationError"];
                401: components["responses"]["Unauthorized"];
                /** @description An active (PENDING) invite already exists for this email */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Message"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organization-invites/{invite_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get invite (admin/issuer view) */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    invite_id: components["parameters"]["pathInviteId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Invite */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["OrganizationInvite"];
                    };
                };
                401: components["responses"]["Unauthorized"];
                404: components["responses"]["NotFound"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organization-invites/{invite_id}/revoke": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Revoke invite */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    invite_id: components["parameters"]["pathInviteId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Invite revoked */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["OrganizationInvite"];
                    };
                };
                401: components["responses"]["Unauthorized"];
                404: components["responses"]["NotFound"];
                /** @description Invite not revocable (already accepted/expired/revoked) */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Message"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organization-invites/resolve": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Resolve invite by token (public-safe view)
         * @description Resolves an invite using a plaintext token, returning limited information so the client can display a confirmation screen before acceptance.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        token: string;
                    };
                };
            };
            responses: {
                /** @description Resolved invite (public-safe) */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            invite: components["schemas"]["ResolvedInvitePublic"];
                        };
                    };
                };
                400: components["responses"]["ValidationError"];
                404: components["responses"]["NotFound"];
                /** @description Invite not acceptable (expired, revoked, already accepted) */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Message"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organization-invites/accept": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Accept invite by token
         * @description Accepts a PENDING invite using a plaintext token. If authenticated, `accepted_by` is set to the current user id; otherwise you may create/link a user first, then accept.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        token: string;
                    };
                };
            };
            responses: {
                /** @description Invite accepted and membership granted */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            invite: components["schemas"]["OrganizationInvite"];
                            organization: components["schemas"]["Organization"];
                            membership: {
                                id: string;
                                role: string;
                            };
                        };
                    };
                };
                400: components["responses"]["ValidationError"];
                401: components["responses"]["Unauthorized"];
                404: components["responses"]["NotFound"];
                /** @description Invite not acceptable (expired, revoked, already accepted) */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Message"];
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Users */
        get: {
            parameters: {
                query?: {
                    cursor?: components["parameters"]["queryCursor"];
                    /** @example 20 */
                    limit?: components["parameters"]["queryLimit"];
                    email?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of users */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["User"][];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{user_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get User */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    user_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description User details */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["User"];
                    };
                };
                /** @description User not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        /** Delete User */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    user_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description User deleted */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            success?: boolean;
                        };
                    };
                };
                404: components["responses"]["NotFound"];
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{user_id}/organizations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get User Organizations */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    user_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description User organizations */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Organization"][];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sessions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Sessions */
        get: {
            parameters: {
                query?: {
                    /** @example 20 */
                    limit?: components["parameters"]["queryLimit"];
                    cursor?: components["parameters"]["queryCursor"];
                    user_id?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of sessions */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            items: components["schemas"]["Session"][];
                            nextCursor?: string | null;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sessions/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Session */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: components["parameters"]["pathSessionId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Session details */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Session"];
                    };
                };
                404: components["responses"]["NotFound"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sessions/{id}/revoke": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Revoke Session */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: components["parameters"]["pathSessionId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Session revoked */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Session"];
                    };
                };
                404: components["responses"]["NotFound"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/clients": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Clients */
        get: {
            parameters: {
                query?: {
                    /** @example 20 */
                    limit?: components["parameters"]["queryLimit"];
                    cursor?: components["parameters"]["queryCursor"];
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of clients */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Client"][];
                    };
                };
            };
        };
        put?: never;
        /** Create Client */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        name: string;
                        description?: string;
                    };
                };
            };
            responses: {
                /** @description Client created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Client"];
                    };
                };
                400: components["responses"]["ValidationError"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/clients/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Client */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: components["parameters"]["pathClientId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Client details */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Client"];
                    };
                };
                404: components["responses"]["NotFound"];
            };
        };
        put?: never;
        post?: never;
        /** Delete Client */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: components["parameters"]["pathClientId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Client deleted */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            success?: boolean;
                        };
                    };
                };
                404: components["responses"]["NotFound"];
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/client-credentials": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Client Credentials */
        get: {
            parameters: {
                query?: {
                    cursor?: components["parameters"]["queryCursor"];
                    /** @example 20 */
                    limit?: components["parameters"]["queryLimit"];
                    client_id?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of credentials */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ClientCredential"][];
                    };
                };
                400: components["responses"]["ValidationError"];
            };
        };
        put?: never;
        /** Create Client Credential */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        client_id: string;
                        label?: string;
                    };
                };
            };
            responses: {
                /** @description Credential created (secret returned once) */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ClientCredential"] & {
                            /** @description Plaintext secret (returned once) */
                            secret?: string;
                        };
                    };
                };
                400: components["responses"]["ValidationError"];
                404: components["responses"]["NotFound"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/client-credentials/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Revoke Client Credential */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: components["parameters"]["pathCredentialId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Credential revoked */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            success?: boolean;
                        };
                    };
                };
                404: components["responses"]["NotFound"];
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Organization: {
            id: string;
            /** @default organization */
            entity: string;
            handle: string;
            name: string;
            picture?: string | null;
            /** @enum {string} */
            broker: "WORKOS";
            broker_id: string;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
            /** Format: date-time */
            deleted_at?: string | null;
        };
        User: {
            id: string;
            /** @default user */
            entity: string;
            /** @enum {string} */
            broker: "WORKOS";
            broker_id: string;
            roles: string[];
            email?: string | null;
            name?: string | null;
            picture?: string | null;
            email_verified?: boolean | null;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        Session: {
            id: string;
            /** @default session */
            entity: string;
            user_id: string;
            /**
             * @default ACTIVE
             * @enum {string}
             */
            status: "ACTIVE" | "REVOKED" | "EXPIRED";
            ip?: string | null;
            user_agent?: string | null;
            metadata?: number | string | boolean | Record<string, never> | unknown[] | null;
            /** Format: date-time */
            revoked_at?: string | null;
            /** Format: date-time */
            expires_at: string;
            refresh_token: string;
            /** Format: date-time */
            refresh_token_rotated_at: string;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        Client: {
            id: string;
            /** @default client */
            entity: string;
            name: string;
            description?: string | null;
            allowed_audiences: string[];
            allowed_scopes?: string[];
            redirect_uris?: string[];
            /**
             * @default ACTIVE
             * @enum {string}
             */
            status: "ACTIVE" | "DISABLED";
            metadata?: number | string | boolean | Record<string, never> | unknown[] | null;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        ClientCredential: {
            id: string;
            /** @default client_credential */
            entity: string;
            label?: string | null;
            client_id: string;
            secret_hash: string;
            /**
             * @default ACTIVE
             * @enum {string}
             */
            status: "ACTIVE" | "REVOKED" | "EXPIRED";
            /** Format: date-time */
            expires_at?: string | null;
            /** Format: date-time */
            revoked_at?: string | null;
            /** Format: date-time */
            last_used_at?: string | null;
            last_used_ip?: string | null;
            metadata?: number | string | boolean | Record<string, never> | unknown[] | null;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        /** @enum {string} */
        InviteStatus: "PENDING" | "ACCEPTED" | "REVOKED" | "EXPIRED";
        /** @description Single-use invite to join a organization. Minimal public/admin shape. */
        OrganizationInvite: {
            id: string;
            organization_id: string;
            /** Format: email */
            email: string;
            role: string;
            status: components["schemas"]["InviteStatus"];
            /** Format: date-time */
            expires_at: string;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
            issued_by?: string | null;
            accepted_by?: string | null;
            /** Format: date-time */
            accepted_at?: string | null;
            revoked_by?: string | null;
            /** Format: date-time */
            revoked_at?: string | null;
        };
        ResolvedInvitePublic: {
            /** @description Invite id (safe to reveal) */
            id: string;
            organization: {
                id: string;
                name: string;
            };
            /**
             * Format: email
             * @description Target email; you may obfuscate on the server if preferred.
             */
            email: string;
            role: string;
            status: components["schemas"]["InviteStatus"];
            /** Format: date-time */
            expires_at: string;
            /** @description Display name of inviter if available. */
            invited_by_display?: string | null;
        };
        Message: {
            message: string;
        };
        Error: {
            error: {
                code: string;
                message: string;
                details?: Record<string, never>;
            };
        };
    };
    responses: {
        /** @description Unauthorized */
        Unauthorized: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Message"];
            };
        };
        /** @description Validation error */
        ValidationError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    error: {
                        /** @example VALIDATION_ERROR */
                        code: string;
                        message: string;
                        details?: Record<string, never>;
                    };
                };
            };
        };
        /** @description Resource not found */
        NotFound: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Message"];
            };
        };
    };
    parameters: {
        pathOrganizationId: string;
        pathInviteId: string;
        pathRoleId: string;
        pathSessionId: string;
        pathClientId: string;
        pathCredentialId: string;
        /** @example 20 */
        queryLimit: number;
        queryCursor: string;
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
