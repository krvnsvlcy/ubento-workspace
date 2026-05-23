export interface paths {
    "/vertex/connection-providers": {
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
                    team_id?: string;
                    name?: string;
                    cursor?: string;
                    limit?: number;
                    tags?: string[];
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
                        "application/json": {
                            data: components["schemas"]["ConnectionProvider"][];
                            nextPage?: {
                                cursor: string;
                                limit: number;
                            };
                            previousPage?: {
                                cursor: string;
                                limit: number;
                            };
                        };
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
                        team_id: string;
                        name: string;
                        display_name: string;
                        description?: string | null;
                        config?: Record<string, never> | null;
                        tags?: string[];
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
    "/vertex/connection-providers/{provider_id}": {
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
                        tags?: string[];
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
    "/vertex/connection-providers/{provider_id}/image": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                provider_id: string;
            };
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Upload image for connection provider */
        post: {
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
                    "multipart/form-data": {
                        /** Format: binary */
                        image: string;
                    };
                };
            };
            responses: {
                /** @description The updated connection provider with image_url */
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
    "/vertex/connection-providers/by-name/{name}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                name: string;
            };
            cookie?: never;
        };
        /** Get a connection provider by name */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    name: string;
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
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/vertex/connections": {
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
                    team_id?: string;
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
                        "application/json": {
                            data: components["schemas"]["Connection"][];
                            nextPage?: {
                                cursor: string;
                                limit: number;
                            };
                            previousPage?: {
                                cursor: string;
                                limit: number;
                            };
                        };
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
                        team_id: string;
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
    "/vertex/connections/{connection_id}": {
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
    "/vertex/connections/{connection_id}/auth": {
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
    "/vertex/connections/team/{team_id}/{provider_name}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                team_id: string;
                provider_name: string;
            };
            cookie?: never;
        };
        /** Get a connection for a team by provider name */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    team_id: string;
                    provider_name: string;
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
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/vertex/services": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List all services */
        get: {
            parameters: {
                query?: {
                    team_id?: string;
                    scope?: string;
                    name?: string;
                    cursor?: string;
                    limit?: number;
                    tags?: string[];
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of services */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: components["schemas"]["Service"][];
                            nextPage?: {
                                cursor: string;
                                limit: number;
                            };
                            previousPage?: {
                                cursor: string;
                                limit: number;
                            };
                        };
                    };
                };
            };
        };
        put?: never;
        /** Create a service */
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
                        team_id: string;
                        scope?: string;
                        name: string;
                        display_name: string;
                        description?: string | null;
                        config?: Record<string, never> | null;
                        tags?: string[];
                    };
                };
            };
            responses: {
                /** @description The created service */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Service"];
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
    "/vertex/services/{service_id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                service_id: string;
            };
            cookie?: never;
        };
        /** Get a service */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    service_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The service */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Service"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        /** Delete a service */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    service_id: string;
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
        /** Update a service */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    service_id: string;
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
                        tags?: string[];
                    };
                };
            };
            responses: {
                /** @description The updated service */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Service"];
                    };
                };
            };
        };
        trace?: never;
    };
    "/vertex/services/{service_id}/image": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                service_id: string;
            };
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Upload image for service */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    service_id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "multipart/form-data": {
                        /** Format: binary */
                        image: string;
                    };
                };
            };
            responses: {
                /** @description The updated service with image_url */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Service"];
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
    "/vertex/services/{service_id}/channels": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                service_id: string;
            };
            cookie?: never;
        };
        /** List all service channels */
        get: {
            parameters: {
                query?: {
                    cursor?: string;
                    limit?: number;
                };
                header?: never;
                path: {
                    service_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of service channels */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: components["schemas"]["ServiceChannel"][];
                            nextPage?: {
                                cursor: string;
                                limit: number;
                            };
                            previousPage?: {
                                cursor: string;
                                limit: number;
                            };
                        };
                    };
                };
            };
        };
        put?: never;
        /** Create a service channel */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    service_id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": {
                        team_id: string;
                        name: string;
                    };
                };
            };
            responses: {
                /** @description The created service channel */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ServiceChannel"];
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
    "/vertex/service-channels/{service_channel_id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                service_channel_id: string;
            };
            cookie?: never;
        };
        /** Get a service channel */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    service_channel_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The service channel */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ServiceChannel"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        /** Delete a service channel */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    service_channel_id: string;
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
        /** Update a service channel */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    service_channel_id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": {
                        name?: string;
                    };
                };
            };
            responses: {
                /** @description The updated service channel */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ServiceChannel"];
                    };
                };
            };
        };
        trace?: never;
    };
    "/vertex/service-channels/{service_channel_id}/spec": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                service_channel_id: string;
            };
            cookie?: never;
        };
        /** Get the spec for a service channel */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    service_channel_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The service spec */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
            };
        };
        put?: never;
        /** Upload the spec for a service channel */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    service_channel_id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description Confirmation of upload */
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
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/vertex/oauth-clients": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List all OAuth clients */
        get: {
            parameters: {
                query?: {
                    team_id?: string;
                    provider_id?: string;
                    cursor?: string;
                    limit?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of OAuth clients */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: components["schemas"]["OAuthClient"][];
                            nextPage?: {
                                cursor: string;
                                limit: number;
                            };
                            previousPage?: {
                                cursor: string;
                                limit: number;
                            };
                        };
                    };
                };
            };
        };
        put?: never;
        /** Create an OAuth client */
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
                        team_id?: string;
                        provider_id: string;
                        name: string;
                        credentials: {
                            clientId: string;
                            clientSecret: string;
                        };
                    };
                };
            };
            responses: {
                /** @description The created OAuth client */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["OAuthClient"];
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
    "/vertex/oauth-clients/{oauth_client_id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                oauth_client_id: string;
            };
            cookie?: never;
        };
        /** Get an OAuth client */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    oauth_client_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The OAuth client */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["OAuthClient"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        /** Delete an OAuth client */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    oauth_client_id: string;
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
        /** Update an OAuth client */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    oauth_client_id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": {
                        name?: string;
                        credentials?: {
                            clientId?: string;
                            clientSecret?: string;
                        };
                    };
                };
            };
            responses: {
                /** @description The updated OAuth client */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["OAuthClient"];
                    };
                };
            };
        };
        trace?: never;
    };
    "/vertex/{team_id}/query": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                team_id: string;
            };
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Invoke a query */
        post: {
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
                        service_channel_id: string;
                        query: string;
                        args?: Record<string, never> | null;
                    };
                };
            };
            responses: {
                /** @description The result of the query */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["VertexResult"];
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
    "/vertex/{team_id}/action": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                team_id: string;
            };
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Invoke an action */
        post: {
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
                        service_channel_id: string;
                        action: string;
                        args?: Record<string, never> | null;
                    };
                };
            };
            responses: {
                /** @description The result of the action */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["VertexResult"];
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
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        ConnectionProvider: {
            id: string;
            /** @default connection_provider */
            entity: string;
            handle: string;
            type: string;
            name: string;
            description?: string;
            config?: Record<string, never>;
            tags?: string[];
            image_hash?: string;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
            image_url?: string | null;
        };
        Connection: {
            id: string;
            /** @default connection */
            entity: string;
            team_id: string;
            name: string;
            description?: string;
            provider_id: string;
            credentials?: components["schemas"]["EncryptedData"];
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
            team_id: string;
            oauth_client_id: string;
            state?: string;
            redirect_uri?: string;
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
        Service: {
            id: string;
            /** @default service */
            entity: string;
            team_id: string;
            /** @default public */
            scope: string;
            handle: string;
            name: string;
            description?: string;
            config?: Record<string, never>;
            tags?: string[];
            image_hash?: string;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
            /** Format: date-time */
            deleted_at?: string;
            image_url?: string | null;
        };
        ServiceChannel: {
            id: string;
            /** @default service_version */
            entity: string;
            team_id: string;
            service_id: string;
            name: string;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
            /** Format: date-time */
            deleted_at?: string;
        };
        OAuthClient: {
            id: string;
            /** @default oauth_client */
            entity: string;
            team_id?: string;
            name: string;
            provider_id: string;
            credentials?: components["schemas"]["EncryptedData"];
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        VertexError: {
            /** @enum {string} */
            code: "INVALID_REQUEST_ERROR" | "USAGE_LIMIT_EXCEEDED" | "UPSTREAM_ERROR" | "INVALID_CREDENTIALS";
            message?: string | null;
            details?: Record<string, never> | null;
        };
        VertexResult: {
            data?: Record<string, never> | null;
            error?: components["schemas"]["VertexError"];
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
