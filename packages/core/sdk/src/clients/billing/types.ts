export interface paths {
    "/billing/products": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List products */
        get: {
            parameters: {
                query?: {
                    cursor?: components["parameters"]["cursor"];
                    limit?: components["parameters"]["limit"];
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Array of Product */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: components["schemas"]["Product"][];
                            page: {
                                /** @enum {string} */
                                type: "cursor";
                                nextCursor?: string | null;
                            };
                        };
                    };
                };
                default: components["responses"]["Problem"];
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
    "/billing/products/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get product by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Product */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Product"];
                    };
                };
                /** @description Product not found */
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
                default: components["responses"]["Problem"];
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
    "/billing/products/by-code/{code}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get product by code */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    code: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Product */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Product"];
                    };
                };
                /** @description Product not found */
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
                default: components["responses"]["Problem"];
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
    "/billing/offers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List offers */
        get: {
            parameters: {
                query?: {
                    cursor?: components["parameters"]["cursor"];
                    limit?: components["parameters"]["limit"];
                    active?: boolean;
                    code?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Array of Offer */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: components["schemas"]["Offer"][];
                            page: {
                                /** @enum {string} */
                                type: "cursor";
                                nextCursor?: string | null;
                            };
                        };
                    };
                };
                default: components["responses"]["Problem"];
            };
        };
        put?: never;
        /** Create offer */
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
                        code: string;
                        name: string;
                        description?: string;
                        entitlements?: {
                            feature_code: string;
                            value?: unknown;
                        }[];
                        metadata?: unknown;
                        active?: boolean;
                        product_code: string;
                    };
                };
            };
            responses: {
                /** @description Offer created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Offer"];
                    };
                };
                default: components["responses"]["Problem"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/billing/offers/by-code/{code}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get offer by code */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    code: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Offer */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Offer"];
                    };
                };
                /** @description Offer not found */
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
                default: components["responses"]["Problem"];
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
    "/billing/offers/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get offer by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Offer */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Offer"];
                    };
                };
                /** @description Offer not found */
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
                default: components["responses"]["Problem"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Update offer */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        name?: string;
                        description?: string;
                        entitlements?: {
                            feature_code: string;
                            value?: unknown;
                        }[];
                        metadata?: unknown;
                        active?: boolean;
                    };
                };
            };
            responses: {
                /** @description Offer updated */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Offer"];
                    };
                };
                default: components["responses"]["Problem"];
            };
        };
        trace?: never;
    };
    "/billing/offers/{id}/activate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Activate offer */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Offer activated */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Offer"];
                    };
                };
                default: components["responses"]["Problem"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/billing/offers/{id}/deactivate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Deactivate offer */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Offer deactivated */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Offer"];
                    };
                };
                default: components["responses"]["Problem"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/billing/subscriptions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List subscriptions for an organization */
        get: {
            parameters: {
                query?: {
                    organization_id?: string;
                    product_code?: string;
                    offer_code?: string;
                    status?: "ACTIVE" | "CANCELLED" | "EXPIRED" | "PAUSED" | "PENDING";
                    cursor?: components["parameters"]["cursor"];
                    limit?: components["parameters"]["limit"];
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Array of Subscription */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: components["schemas"]["Subscription"][];
                            page: {
                                /** @enum {string} */
                                type: "cursor";
                                nextCursor?: string | null;
                            };
                        };
                    };
                };
                default: components["responses"]["Problem"];
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
    "/billing/subscriptions/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a subscription by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Subscription */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Subscription"];
                    };
                };
                /** @description Subscription not found */
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
                default: components["responses"]["Problem"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Update a subscription */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        quantity?: number;
                    };
                };
            };
            responses: {
                /** @description Subscription updated */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Subscription"];
                    };
                };
                /** @description Subscription not found */
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
                default: components["responses"]["Problem"];
            };
        };
        trace?: never;
    };
    "/billing/subscriptions/{id}/cancel": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Cancel a subscription */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Subscription cancelled */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Subscription"];
                    };
                };
                default: components["responses"]["Problem"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/billing/subscriptions/{id}/resume": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Resume a paused subscription */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Subscription resumed */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Subscription"];
                    };
                };
                default: components["responses"]["Problem"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/billing/subscriptions/invoices": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List invoices */
        get: {
            parameters: {
                query?: {
                    organization_id?: string;
                    status?: "PAID" | "PENDING" | "REFUNDED" | "VOID";
                    created_after?: string;
                    created_before?: string;
                    cursor?: components["parameters"]["cursor"];
                    limit?: components["parameters"]["limit"];
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Array of Invoice */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: components["schemas"]["SubscriptionInvoice"][];
                            page: {
                                /** @enum {string} */
                                type: "cursor";
                                nextCursor?: string | null;
                            };
                        };
                    };
                };
                default: components["responses"]["Problem"];
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
    "/billing/subscriptions/invoices/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get invoice by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Invoice */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["SubscriptionInvoice"];
                    };
                };
                /** @description Invoice not found */
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
                default: components["responses"]["Problem"];
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
    "/billing/orders": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List orders for an organization */
        get: {
            parameters: {
                query?: {
                    organization_id?: string;
                    status?: "PENDING" | "PAID" | "REFUNDED" | "FAILED";
                    created_after?: string;
                    created_before?: string;
                    cursor?: components["parameters"]["cursor"];
                    limit?: components["parameters"]["limit"];
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Array of Order */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: components["schemas"]["Order"][];
                            page: {
                                /** @enum {string} */
                                type: "cursor";
                                nextCursor?: string | null;
                            };
                        };
                    };
                };
                default: components["responses"]["Problem"];
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
    "/billing/orders/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get order by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Order */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Order"];
                    };
                };
                /** @description Order not found */
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
                default: components["responses"]["Problem"];
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
    "/billing/usage/counters": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List usage counters for an organization */
        get: {
            parameters: {
                query: {
                    organization_id: components["parameters"]["organization_id"];
                    code?: string;
                    group?: string;
                    cursor?: components["parameters"]["cursor"];
                    limit?: components["parameters"]["limit"];
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Array of UsageCounter */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: components["schemas"]["UsageCounter"][];
                            page: {
                                /** @enum {string} */
                                type: "cursor";
                                nextCursor?: string | null;
                            };
                        };
                    };
                };
                /** @description organization_id is required */
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
                default: components["responses"]["Problem"];
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
    "/billing/usage/counters/by-code": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get usage counter by code */
        get: {
            parameters: {
                query: {
                    organization_id: components["parameters"]["organization_id"];
                    code?: string;
                    group?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description UsageCounter */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["UsageCounter"];
                    };
                };
                /** @description Usage counter not found */
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
                default: components["responses"]["Problem"];
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
    "/billing/usage/counters/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get usage counter by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description UsageCounter */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["UsageCounter"];
                    };
                };
                /** @description Usage counter not found */
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
                default: components["responses"]["Problem"];
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
    "/billing/usage/increment": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Atomically increment usage for a feature */
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
                        code: string;
                        amount: number;
                        group?: string;
                    };
                };
            };
            responses: {
                /** @description Updated usage counter */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["UsageCounter"];
                    };
                };
                default: components["responses"]["Problem"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/billing/usage/events": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List usage events */
        get: {
            parameters: {
                query?: {
                    organization_id?: string;
                    counter_code?: string;
                    counter_group?: string;
                    ref?: string;
                    created_after?: string;
                    created_before?: string;
                    cursor?: components["parameters"]["cursor"];
                    limit?: components["parameters"]["limit"];
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Array of UsageEvent */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: components["schemas"]["UsageEvent"][];
                            page: {
                                /** @enum {string} */
                                type: "cursor";
                                nextCursor?: string | null;
                            };
                        };
                    };
                };
                default: components["responses"]["Problem"];
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
    "/billing/usage/holds": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Reserve usage (create hold) */
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
                        code: string;
                        group?: string;
                        amount: number;
                        note: string;
                        duration: number;
                        ref: string;
                        data?: Record<string, never>;
                    };
                };
            };
            responses: {
                /** @description Usage hold created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["UsageHold"];
                    };
                };
                default: components["responses"]["Problem"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/billing/usage/holds/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get usage hold by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description UsageHold */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["UsageHold"];
                    };
                };
                /** @description Usage hold not found */
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
                default: components["responses"]["Problem"];
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
    "/billing/usage/holds/commit": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Commit usage hold by ref */
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
                        ref: string;
                        organization_id: string;
                    };
                };
            };
            responses: {
                /** @description Hold committed */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                default: components["responses"]["Problem"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/billing/usage/holds/release": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Release usage hold by ref */
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
                        ref: string;
                        organization_id: string;
                    };
                };
            };
            responses: {
                /** @description Hold released */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["UsageHold"];
                    };
                };
                default: components["responses"]["Problem"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/billing/entitlements": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get entitlement grants for an organization */
        get: {
            parameters: {
                query: {
                    organization_id: components["parameters"]["organization_id"];
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Entitlement grant table */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                default: components["responses"]["Problem"];
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
    "/billing/entitlements/access": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Check feature access for an organization */
        get: {
            parameters: {
                query: {
                    organization_id: components["parameters"]["organization_id"];
                    /** @description Comma-separated list of feature codes */
                    features: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Feature access evaluation */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            [key: string]: boolean;
                        };
                    };
                };
                default: components["responses"]["Problem"];
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
    "/billing/entitlements/quota": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get usage quota for features */
        get: {
            parameters: {
                query: {
                    organization_id: components["parameters"]["organization_id"];
                    /** @description Comma-separated list of feature codes */
                    features: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Feature quotas */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            [key: string]: number;
                        };
                    };
                };
                default: components["responses"]["Problem"];
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
    "/billing/checkout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List checkouts */
        get: {
            parameters: {
                query?: {
                    organization_id?: string;
                    product_code?: string;
                    offer_code?: string;
                    cursor?: components["parameters"]["cursor"];
                    limit?: components["parameters"]["limit"];
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Array of Checkout */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: components["schemas"]["Checkout"][];
                            page: {
                                /** @enum {string} */
                                type: "cursor";
                                nextCursor?: string | null;
                            };
                        };
                    };
                };
                default: components["responses"]["Problem"];
            };
        };
        put?: never;
        /** Create a new checkout session */
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
                        product_code: string;
                        offer_code: string;
                        quantity: number;
                        /** Format: uri */
                        redirect_url: string;
                        duration?: number;
                        data?: Record<string, never>;
                    };
                };
            };
            responses: {
                /** @description Checkout created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Checkout"];
                    };
                };
                default: components["responses"]["Problem"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/billing/checkout/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get checkout by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Checkout */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Checkout"];
                    };
                };
                /** @description Checkout not found */
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
                default: components["responses"]["Problem"];
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
    "/billing/admin/webhooks": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List stored webhook events */
        get: {
            parameters: {
                query?: {
                    provider?: "LEMON_SQUEEZY";
                    processed?: boolean;
                    created_after?: string;
                    created_before?: string;
                    cursor?: components["parameters"]["cursor"];
                    limit?: components["parameters"]["limit"];
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Array of WebhookEvent */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: components["schemas"]["WebhookEvent"][];
                            page: {
                                /** @enum {string} */
                                type: "cursor";
                                nextCursor?: string | null;
                            };
                        };
                    };
                };
                default: components["responses"]["Problem"];
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
    "/billing/admin/webhooks/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get webhook event by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description WebhookEvent */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["WebhookEvent"];
                    };
                };
                /** @description Webhook event not found */
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
                default: components["responses"]["Problem"];
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
        Product: {
            id: string;
            /** @default billing_product */
            entity: string;
            code: string;
            name: string;
            description?: string;
            default_offer_code?: string;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        Offer: {
            id: string;
            /** @default billing_offer */
            entity: string;
            code: string;
            product_code: string;
            name: string;
            price?: number;
            /** @enum {string} */
            currency?: "USD";
            description?: string;
            /** @default true */
            active: boolean;
            entitlements: Record<string, never>[];
            metadata?: Record<string, never>;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        ProviderLink: {
            id: string;
            /** @default billing_provider_link */
            entity: string;
            /** @enum {string} */
            provider: "LEMON_SQUEEZY";
            /** @enum {string} */
            provider_entity: "ORDER" | "SUBSCRIPTION" | "SUBSCRIPTION_INVOICE" | "PRODUCT" | "PRODUCT_VARIANT";
            provider_id: string;
            /** @enum {string} */
            resource_type: "PRODUCT" | "OFFER";
            resource_code: string;
            /**
             * @default ACTIVE
             * @enum {string}
             */
            status: "ACTIVE" | "INACTIVE";
            /** @default 0 */
            priority: number;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        UsageCounter: {
            id: string;
            /** @default billing_usage_counter */
            entity: string;
            organization_id: string;
            feature_code: string;
            group: string;
            /** @default 0 */
            value: number;
            /** @default 0 */
            reserved: number;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        UsageHold: {
            id: string;
            /** @default billing_usage_hold */
            entity: string;
            organization_id: string;
            counter_id: string;
            ref: string;
            amount: number;
            note: string;
            /**
             * @default HELD
             * @enum {string}
             */
            status: "HELD" | "COMMITTED" | "RELEASED" | "EXPIRED";
            /** Format: date-time */
            expires_at: string;
            data?: Record<string, never>;
            /** Format: date-time */
            committed_at?: string;
            /** Format: date-time */
            released_at?: string;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        UsageEvent: {
            id: string;
            /** @default billing_usage_event */
            entity: string;
            organization_id: string;
            counter_id: string;
            value: number;
            ref?: string;
            note: string;
            data?: Record<string, never>;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        Subscription: {
            id: string;
            /** @default billing_subscription */
            entity: string;
            organization_id: string;
            product_code: string;
            offer_code: string;
            quantity: number;
            /** @enum {string} */
            provider: "LEMON_SQUEEZY";
            provider_id: string;
            /** @enum {string} */
            status: "ACTIVE" | "ON_TRIAL" | "PAUSED" | "PAST_DUE" | "UNPAID" | "CANCELLED" | "EXPIRED";
            data?: Record<string, never>;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
            /** Format: date-time */
            ends_at?: string;
            /** Format: date-time */
            link_updated_at?: string;
        };
        SubscriptionInvoice: {
            id: string;
            /** @default billing_subscription_invoice */
            entity: string;
            organization_id: string;
            /** @enum {string} */
            provider: "LEMON_SQUEEZY";
            provider_id: string;
            subscription_id: string;
            /** @enum {string} */
            status: "DRAFT" | "OPEN" | "PAID" | "VOID" | "UNCOLLECTIBLE";
            /** @default 0 */
            subtotal: number;
            /** @default 0 */
            tax: number;
            /** @default 0 */
            total: number;
            currency: string;
            /** Format: date-time */
            issued_at?: string;
            /** Format: date-time */
            due_at?: string;
            hosted_url?: string;
            data?: Record<string, never>;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        Order: {
            id: string;
            /** @default billing_order */
            entity: string;
            organization_id: string;
            product_code: string;
            offer_code: string;
            quantity: number;
            /** @enum {string} */
            provider: "LEMON_SQUEEZY";
            provider_id: string;
            /** @enum {string} */
            status: "PENDING" | "FAILED" | "PAID" | "REFUNDED" | "PARTIAL_REFUND" | "FRAUDULENT";
            currency?: string;
            amount_total?: number;
            line_items?: components["schemas"]["OrderLineItem"][];
            data?: Record<string, never>;
            /** Format: date-time */
            link_updated_at?: string;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        Checkout: {
            id: string;
            /** @default billing_checkout */
            entity: string;
            organization_id: string;
            product_code: string;
            offer_code: string;
            quantity: number;
            url: string;
            /** @enum {string} */
            provider: "LEMON_SQUEEZY";
            provider_id: string;
            data?: Record<string, never>;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        WebhookEvent: {
            id: string;
            /** @default billing_webhook_event */
            entity: string;
            /** @enum {string} */
            provider: "LEMON_SQUEEZY";
            provider_id: string;
            payload: Record<string, never>;
            event: string;
            attempts?: components["schemas"]["WebhookEventAttempt"][];
            /**
             * @default RECEIVED
             * @enum {string}
             */
            status: "RECEIVED" | "PROCESSING" | "PROCESSED" | "ERRORED";
            error?: string;
            /** Format: date-time */
            lock_expires_at?: string;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        EntitlementGrant: {
            id: string;
            /** @default billing_entitlement_grant */
            entity: string;
            organization_id: string;
            /** Format: date-time */
            expires_at: string;
            data: Record<string, never>;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        OrderLineItem: {
            code: string;
            name?: string;
            quantity: number;
            unit?: string;
            unit_price?: number;
            amount?: number;
            currency?: string;
            metadata?: Record<string, never>;
        };
        WebhookEventAttempt: {
            id: string;
            /** Format: date-time */
            at: string;
            /**
             * @default STARTED
             * @enum {string}
             */
            status: "STARTED" | "SUCCEEDED" | "FAILED";
            error?: string;
        };
    };
    responses: {
        /** @description RFC 7807 Problem Details */
        Problem: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/problem+json": {
                    /** Format: uri */
                    type?: string;
                    title?: string;
                    status?: number;
                    detail?: string;
                    instance?: string;
                } & {
                    [key: string]: unknown;
                };
            };
        };
    };
    parameters: {
        organization_id: string;
        cursor: string;
        limit: number;
    };
    requestBodies: never;
    headers: {
        /** @description Echoed request id. */
        "X-Request-Id": string;
        /** @description Prevents duplicate processing of side-effecting requests. */
        "Idempotency-Key": string;
    };
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
