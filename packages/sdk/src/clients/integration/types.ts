export interface paths {
    "/integration/connection-providers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List all connection providers */
        get: {
            parameters: {
                query?: {
                    organization_id?: string;
                    name?: string;
                    cursor?: string;
                    limit?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of connection providers */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ConnectionProvider"][];
                    };
                };
            };
        };
        put?: never;
        /** Create a connection provider */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": {
                        organization_id: string;
                        name: string;
                        display_name: string;
                        description?: string | null;
                        config?: Record<string, never> | null;
                    };
                };
            };
            responses: {
                /** @description The created connection provider */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ConnectionProvider"];
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
    "/integration/connection-providers/{provider_id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                provider_id: string;
            };
            cookie?: never;
        };
        /** Get a connection provider */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    provider_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The connection provider */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ConnectionProvider"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        /** Delete a connection provider */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    provider_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Confirmation of deletion */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            id?: string;
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        /** Update a connection provider */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    provider_id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": {
                        name?: string;
                        display_name?: string;
                        description?: string | null;
                        config?: Record<string, never> | null;
                    };
                };
            };
            responses: {
                /** @description The updated connection provider */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ConnectionProvider"];
                    };
                };
            };
        };
        trace?: never;
    };
    "/integration/connections": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List all connections */
        get: {
            parameters: {
                query?: {
                    organization_id?: string;
                    cursor?: string;
                    limit?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of connections */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Connection"][];
                    };
                };
            };
        };
        put?: never;
        /** Create a connection */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": {
                        organization_id: string;
                        provider_id: string;
                        auth?: Record<string, never> | null;
                    };
                };
            };
            responses: {
                /** @description The created connection */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Connection"];
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
    "/integration/connections/{connection_id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                connection_id: string;
            };
            cookie?: never;
        };
        /** Get a connection */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    connection_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The connection */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Connection"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        /** Delete a connection */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    connection_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Confirmation of deletion */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            id?: string;
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/integration/connections/{connection_id}/auth": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                connection_id: string;
            };
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Update connection auth */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    connection_id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description The updated connection */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Connection"];
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
    "/integration/extensions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List all extensions */
        get: {
            parameters: {
                query?: {
                    ids?: string[];
                    name?: string;
                    cursor?: string;
                    limit?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of extensions */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Extension"][];
                    };
                };
            };
        };
        put?: never;
        /** Create an extension */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": {
                        organization_id: string;
                        name: string;
                        description?: string | null;
                    };
                };
            };
            responses: {
                /** @description The created extension */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Extension"];
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
    "/integration/extensions/{extension_id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                extension_id: string;
            };
            cookie?: never;
        };
        /** Get an extension */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    extension_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The extension */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Extension"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        /** Delete an extension */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    extension_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Confirmation of deletion */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            id?: string;
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        /** Update an extension */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    extension_id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": {
                        name?: string | null;
                        description?: string | null;
                    };
                };
            };
            responses: {
                /** @description The updated extension */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Extension"];
                    };
                };
            };
        };
        trace?: never;
    };
    "/integration/extensions/{extension_id}/versions": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                extension_id: string;
            };
            cookie?: never;
        };
        /** List extension versions by extension ID */
        get: {
            parameters: {
                query?: {
                    cursor?: string;
                    limit?: number;
                };
                header?: never;
                path: {
                    extension_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of extension versions */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ExtensionVersion"][];
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
    "/integration/extensions/{extension_id}/versions/{semver}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                extension_id: string;
                semver: string;
            };
            cookie?: never;
        };
        /** Get an extension version by semver for a given extension ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    extension_id: string;
                    semver: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The extension version */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ExtensionVersion"];
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
    "/integration/extension-versions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List all extension versions */
        get: {
            parameters: {
                query?: {
                    ids?: string[];
                    extension_name?: string;
                    semver?: string;
                    cursor?: string;
                    limit?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of extension versions */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ExtensionVersion"][];
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
    "/integration/extension-versions/{extension_version_id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                extension_version_id: string;
            };
            cookie?: never;
        };
        /** Get an extension version */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    extension_version_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The extension version */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ExtensionVersion"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        /** Delete an extension version */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    extension_version_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Confirmation of deletion */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            id?: string;
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/integration/extension-versions/{extension_version_id}/file/{fileName}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                extension_version_id: string;
                fileName: string;
            };
            cookie?: never;
        };
        /** Download extension version file */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    extension_version_id: string;
                    fileName: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description File content */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": string;
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
    "/integration/extension-versions/resolve/{organization_id}/{ref}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                organization_id: string;
                ref: string;
            };
            cookie?: never;
        };
        /** Resolve an extension version by ref */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organization_id: string;
                    ref: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The resolved extension version */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ExtensionVersion"];
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
    "/integration/extensions/deploy": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Deploy a new extension version */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": {
                        organization_id: string;
                        manifest: Record<string, never>;
                        files: {
                            [key: string]: string;
                        };
                    };
                };
            };
            responses: {
                /** @description The deployed extension version */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ExtensionVersion"];
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
    "/integration/oauth/connect": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Start OAuth connection flow */
        get: {
            parameters: {
                query: {
                    provider_id: string;
                    organization_id: string;
                    state?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Redirect to provider auth URL */
                302: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
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
    "/integration/oauth/callback": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** OAuth callback handler */
        get: {
            parameters: {
                query?: {
                    code?: string;
                    state?: string;
                    error?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Success HTML page */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
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
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        ConnectionProvider: {
            id: string;
            /** @default connection_provider */
            entity: string;
            organization_id: string;
            name: string;
            display_name: string;
            description?: string | null;
            config?: number | string | boolean | Record<string, never> | unknown[] | null;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        Connection: {
            id: string;
            /** @default connection */
            entity: string;
            organization_id: string;
            provider_id: string;
            auth_strategy?: string | null;
            auth?: components["schemas"]["EncryptedData"] | null;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        OAuthConnectionState: {
            id: string;
            /** @default oauth_connection_state */
            entity: string;
            organization_id: string;
            provider_id: string;
            state?: string | null;
            redirect_uri?: string | null;
            /** Format: date-time */
            expires_at: string;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        EncryptedData: {
            iv: string;
            auth_tag: string;
            cipher_text: string;
        };
        Extension: {
            id: string;
            /** @default extension */
            entity: string;
            organization_id: string;
            name: string;
            description?: string | null;
            latest?: string | null;
            latest_stable?: string | null;
            latest_per_major?: number | string | boolean | Record<string, never> | unknown[] | null;
            latest_per_channel?: number | string | boolean | Record<string, never> | unknown[] | null;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        ExtensionVersion: {
            id: string;
            /** @default extension_version */
            entity: string;
            organization_id: string;
            extension_id: string;
            extension_name: string;
            semver: string;
            semver_rank: number;
            manifest: number | string | boolean | Record<string, never> | unknown[] | null;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
