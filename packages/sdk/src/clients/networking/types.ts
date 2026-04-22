export interface paths {
    "/pointers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List pointers
         * @description List pointers
         */
        get: {
            parameters: {
                query?: {
                    /**
                     * @example [
                     *       "name:asc",
                     *       "age:desc"
                     *     ]
                     */
                    order?: components["parameters"]["queryOrder"];
                    /** @example 10 */
                    limit?: components["parameters"]["queryLimit"];
                    /** @example 10 */
                    offset?: components["parameters"]["queryOffset"];
                    /** @example eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 */
                    cursor?: components["parameters"]["queryCursor"];
                    /** @example forward */
                    direction?: components["parameters"]["queryDirection"];
                    target?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The pointers */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Pointer"][];
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
    "/pointers/{pointer_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a pointer
         * @description Get a pointer
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    pointer_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The pointer */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Pointer"];
                    };
                };
                /** @description Pointer not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        /**
         * Delete a pointer
         * @description Delete a pointer
         */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    pointer_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The id of the deleted pointer */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": string;
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/pointers/{pointer_id}/target": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Assign a pointer to a target
         * @description Assign a pointer to a target
         */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    pointer_id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        value: string;
                    };
                };
            };
            responses: {
                /** @description The assigned pointer */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Pointer"];
                    };
                };
                /** @description Invalid target */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            message?: string;
                        };
                    };
                };
            };
        };
        post?: never;
        /**
         * Unassign a pointer target
         * @description Unassign a pointer target
         */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    pointer_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The unassigned pointer id */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": string;
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/pointer/{pointer}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a pointer by name (optionally create)
         * @description Get a pointer by name (optionally create)
         */
        get: {
            parameters: {
                query?: {
                    /** @description Set to 'true' to create if missing */
                    create?: string;
                    /** @description Organization ID to use when creating the pointer */
                    organizationId?: string;
                };
                header?: never;
                path: {
                    pointer: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The pointer */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Pointer"];
                    };
                };
                /** @description Pointer not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            message?: string;
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
    "/domains": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List domains
         * @description List domains
         */
        get: {
            parameters: {
                query?: {
                    /**
                     * @example [
                     *       "name:asc",
                     *       "age:desc"
                     *     ]
                     */
                    order?: components["parameters"]["queryOrder"];
                    /** @example 10 */
                    limit?: components["parameters"]["queryLimit"];
                    /** @example 10 */
                    offset?: components["parameters"]["queryOffset"];
                    /** @example eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 */
                    cursor?: components["parameters"]["queryCursor"];
                    /** @example forward */
                    direction?: components["parameters"]["queryDirection"];
                    pointer?: string;
                    organization_id?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The domains */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Domain"][];
                    };
                };
            };
        };
        put?: never;
        /**
         * Create a domain
         * @description Create a domain
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
                        organization_id: string;
                        name: string;
                    };
                };
            };
            responses: {
                /** @description The created domain */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Domain"];
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
    "/domains/{domain_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a domain
         * @description Get a domain
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    domain_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The domain */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Domain"];
                    };
                };
                /** @description Domain not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        /**
         * Delete a domain
         * @description Delete a domain
         */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    domain_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The id of the deleted domain */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            domain?: string;
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
    "/domains/{domain_id}/records": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a domain's records
         * @description Get a domain's records
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    domain_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The domain's records */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["DomainRecordSet"];
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
    "/domains/{domain_id}/certificate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get or create a certificate for a domain
         * @description Get or create a certificate for a domain
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    domain_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The certificate */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Certificate"];
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
    "/domains/{domain_id}/pointer": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Assign a domain to a pointer
         * @description Assign a domain to a pointer
         */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    domain_id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        value: string;
                    };
                };
            };
            responses: {
                /** @description The assigned domain */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Domain"];
                    };
                };
                /** @description Invalid pointer */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            message?: string;
                        };
                    };
                };
            };
        };
        post?: never;
        /**
         * Unassign a domain pointer
         * @description Unassign a domain pointer
         */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    domain_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The unassigned domain */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Domain"];
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/domain/{domain}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a domain by name
         * @description Get a domain by name
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    domain: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The domain */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Domain"];
                    };
                };
                /** @description Domain not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            message?: string;
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
    "/certificates": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List certificates
         * @description List certificates
         */
        get: {
            parameters: {
                query?: {
                    /**
                     * @example [
                     *       "name:asc",
                     *       "age:desc"
                     *     ]
                     */
                    order?: components["parameters"]["queryOrder"];
                    /** @example 10 */
                    limit?: components["parameters"]["queryLimit"];
                    /** @example 10 */
                    offset?: components["parameters"]["queryOffset"];
                    /** @example eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 */
                    cursor?: components["parameters"]["queryCursor"];
                    /** @example forward */
                    direction?: components["parameters"]["queryDirection"];
                    /** @description Filter certificates expiring before this date (ISO 8601) */
                    expires_before?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The certificates */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Certificate"][];
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
    "/certificates/{certificate_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a certificate
         * @description Get a certificate
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    certificate_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The certificate */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Certificate"];
                    };
                };
                /** @description Certificate not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            message?: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        /**
         * Delete a certificate
         * @description Delete a certificate
         */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    certificate_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The id of the deleted certificate */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": string;
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/certificates/{certificate_id}/provision": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Provision a certificate
         * @description Provision a certificate. This endpoint is idempotent and will return the current certificate if conditions are met.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    certificate_id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": {
                        force?: boolean;
                    };
                };
            };
            responses: {
                /** @description The provisioned certificate */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Certificate"];
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
    "/certificates/{certificate_id}/domain-states": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a certificate's domain states
         * @description Retrieve the domain states associated with the certificate
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    certificate_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The domain states */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["DomainStates"];
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
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Certificate: {
            id: string;
            /** @default certificate */
            entity: string;
            organization_id: string;
            issuer?: string | null;
            /** Format: date-time */
            from?: string | null;
            /** Format: date-time */
            to?: string | null;
            status: string;
            domains: string[];
            metadata?: number | string | boolean | Record<string, never> | unknown[] | null;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        Domain: {
            id: string;
            /** @default domain */
            entity: string;
            organization_id: string;
            name: string;
            pointer?: string | null;
            certificate_id?: string | null;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        Pointer: {
            id: string;
            /** @default pointer */
            entity: string;
            organization_id: string;
            name: string;
            target?: string | null;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        DnsAnswer: {
            /** @description DNS record type */
            type?: string;
            /** @description DNS record name */
            name?: string;
            /** @description DNS record TTL */
            ttl?: number;
            /** @description DNS record data */
            data?: string;
            /** @description DNS record class */
            class?: string;
            /** @description DNS record flush flag */
            flush?: boolean;
        };
        DomainRecordSet: {
            A?: components["schemas"]["DnsAnswer"][];
            CNAME?: components["schemas"]["DnsAnswer"][];
        };
        /** @description State information per domain for a certificate */
        DomainStates: Record<string, never>;
    };
    responses: never;
    parameters: {
        /**
         * @example [
         *       "name:asc",
         *       "age:desc"
         *     ]
         */
        queryOrder: string[];
        /** @example 10 */
        queryLimit: number;
        /** @example 10 */
        queryOffset: number;
        /** @example eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 */
        queryCursor: string;
        /** @example forward */
        queryDirection: string;
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
