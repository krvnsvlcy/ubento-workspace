export interface paths {
    "/teams": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Teams */
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
                /** @description A list of teams */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: components["schemas"]["Team"][];
                            page: {
                                /** @enum {string} */
                                type: "cursor";
                                nextCursor?: string | null;
                            };
                        };
                    };
                };
            };
        };
        put?: never;
        /** Create Team */
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
                /** @description Team created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Team"];
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
    "/teams/check-handle": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Check Team Handle */
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
                /** @description Team handle checked */
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
    "/teams/{team_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Team */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    team_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Team details */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Team"];
                    };
                };
                /** @description Invalid team id */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
                    };
                };
                /** @description Team not found */
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
        /** Delete Team */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    team_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Team deleted */
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
        /** Update Team */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    team_id: string;
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
                /** @description Team updated */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Team"];
                    };
                };
                /** @description Invalid team id or validation error */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
                    };
                };
                /** @description Team not found */
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
    "/teams/{team_id}/members": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List team members */
        get: {
            parameters: {
                query?: {
                    /** @example 20 */
                    limit?: components["parameters"]["queryLimit"];
                    cursor?: components["parameters"]["queryCursor"];
                };
                header?: never;
                path: {
                    team_id: components["parameters"]["pathTeamId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of team members */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: components["schemas"]["User"][];
                            page: {
                                /** @enum {string} */
                                type: "cursor";
                                nextCursor?: string | null;
                            };
                        };
                    };
                };
                401: components["responses"]["Unauthorized"];
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
    "/teams/{team_id}/invites": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List team invites */
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
                    team_id: components["parameters"]["pathTeamId"];
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
                            data: components["schemas"]["TeamInvite"][];
                            page: {
                                /** @enum {string} */
                                type: "cursor";
                                nextCursor?: string | null;
                            };
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
                    team_id: components["parameters"]["pathTeamId"];
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
                            invite: components["schemas"]["TeamInvite"];
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
    "/team-invites/{invite_id}": {
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
                        "application/json": components["schemas"]["TeamInvite"];
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
    "/team-invites/{invite_id}/revoke": {
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
                        "application/json": components["schemas"]["TeamInvite"];
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
    "/team-invites/resolve": {
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
    "/team-invites/accept": {
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
                            invite: components["schemas"]["TeamInvite"];
                            team: components["schemas"]["Team"];
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
                        "application/json": {
                            data: components["schemas"]["User"][];
                            page: {
                                /** @enum {string} */
                                type: "cursor";
                                nextCursor?: string | null;
                            };
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
    "/users/{user_id}/teams": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get User Teams */
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
                /** @description User teams */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: components["schemas"]["Team"][];
                            page: {
                                /** @enum {string} */
                                type: "cursor";
                                nextCursor?: string | null;
                            };
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
                            data: components["schemas"]["Session"][];
                            page: {
                                /** @enum {string} */
                                type: "cursor";
                                nextCursor?: string | null;
                            };
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
                        "application/json": {
                            data: components["schemas"]["Client"][];
                            page: {
                                /** @enum {string} */
                                type: "cursor";
                                nextCursor?: string | null;
                            };
                        };
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
                        "application/json": {
                            data: components["schemas"]["ClientCredential"][];
                            page: {
                                /** @enum {string} */
                                type: "cursor";
                                nextCursor?: string | null;
                            };
                        };
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
    "/oauth/token": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Issue Token
         * @description Exchanges a grant for an access token.
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
                        /** @enum {unknown} */
                        grant_type: "authorization_code";
                        code: string;
                        redirect_uri: string;
                        client_id: string;
                        client_secret: string;
                    } | {
                        /** @enum {unknown} */
                        grant_type: "refresh_token";
                        refresh_token: string;
                        client_id: string;
                        client_secret?: string;
                    } | {
                        /** @enum {unknown} */
                        grant_type: "client_credentials";
                        client_id: string;
                        client_secret: string;
                        scope?: string[];
                        audience?: string;
                    } | {
                        /** @enum {unknown} */
                        grant_type: "password";
                        /** Format: email */
                        email: string;
                        password: string;
                        client_id: string;
                        client_secret: string;
                    };
                };
            };
            responses: {
                /** @description Token response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            access_token: string;
                            /** @example Bearer */
                            token_type: string;
                            expires_in: number;
                            refresh_token?: string;
                        };
                    };
                };
                400: components["responses"]["ValidationError"];
                401: components["responses"]["Unauthorized"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Team: {
            id: string;
            /** @default team */
            entity: string;
            /** @enum {string} */
            broker: "WORKOS";
            broker_id: string;
            handle: string;
            name: string;
            picture?: string;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
            /** Format: date-time */
            deleted_at?: string;
        };
        User: {
            id: string;
            /** @default user */
            entity: string;
            /** @enum {string} */
            broker: "WORKOS";
            broker_id: string;
            email: string;
            name: string;
            picture?: string;
            /** @default false */
            email_verified: boolean;
            roles?: string[];
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
            refresh_token: string;
            /** Format: date-time */
            refresh_token_rotated_at?: string;
            /**
             * @default ACTIVE
             * @enum {string}
             */
            status: "ACTIVE" | "EXPIRED" | "REVOKED";
            metadata?: Record<string, never>;
            ip?: string;
            user_agent?: string;
            /** Format: date-time */
            revoked_at?: string;
            /** Format: date-time */
            expires_at: string;
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
            description?: string;
            allowed_scopes?: string[];
            allowed_audiences?: string[];
            redirect_uris?: string[];
            /**
             * @default ACTIVE
             * @enum {string}
             */
            status: "ACTIVE" | "INACTIVE";
            metadata?: Record<string, never>;
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
            client_id: string;
            label?: string;
            secret_hash: string;
            /**
             * @default ACTIVE
             * @enum {string}
             */
            status: "ACTIVE" | "REVOKED" | "EXPIRED";
            /** Format: date-time */
            expires_at?: string;
            /** Format: date-time */
            revoked_at?: string;
            /** Format: date-time */
            last_used_at?: string;
            last_used_ip?: string;
            metadata?: Record<string, never>;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        /** @enum {string} */
        InviteStatus: "PENDING" | "ACCEPTED" | "REVOKED" | "EXPIRED";
        /** @description Single-use invite to join a team. Minimal public/admin shape. */
        TeamInvite: {
            id: string;
            team_id: string;
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
            team: {
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
        pathTeamId: string;
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
