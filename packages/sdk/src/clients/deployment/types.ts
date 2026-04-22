export interface paths {
    "/deployments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List deployments
         * @description List deployments with cursor pagination and filters.
         */
        get: {
            parameters: {
                query?: {
                    /** @example 20 */
                    limit?: components["parameters"]["queryLimit"];
                    /** @example eyJfcGFnZSI6IjIwMjUtMDktMzAiLCJpZCI6ImRlcF8xMjMifQ */
                    cursor?: components["parameters"]["queryCursor"];
                    /** @example forward */
                    direction?: components["parameters"]["queryDirection"];
                    /**
                     * @description Filter by deployment ids.
                     * @example dep_123,dep_456
                     */
                    ids?: string[];
                    /** @example created_at:desc */
                    sort?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Deployments page */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Deployment"][];
                    };
                };
            };
        };
        put?: never;
        /**
         * Create a deployment
         * @description Creates a deployment, attaches a log sink, and (by default) enqueues a deployment task unless `options.omit_push` is true.
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
                        repository_id: string;
                        manifest: {
                            [key: string]: unknown;
                        };
                    };
                };
            };
            responses: {
                /** @description The created deployment */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Deployment"];
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
    "/deployments/{deployment_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a deployment */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    deployment_id: components["parameters"]["pathDeploymentId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The deployment */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Deployment"];
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
    "/deployments/{deployment_id}/manifest": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get deployment manifest */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    deployment_id: components["parameters"]["pathDeploymentId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The deployment manifest */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            [key: string]: unknown;
                        };
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
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Deployment: {
            id: string;
            /** @default deployment */
            entity: string;
            organization_id: string;
            repository_id: string;
            manifest: number | string | boolean | Record<string, never> | unknown[] | null;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
    };
    responses: {
        /** @description Unauthorized */
        Unauthorized: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    message: string;
                };
            };
        };
        /** @description Resource not found */
        NotFound: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    message: string;
                };
            };
        };
        /** @description Validation error */
        ValidationError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    message: string;
                    errors?: {
                        [key: string]: unknown;
                    }[];
                };
            };
        };
        /** @description Server error */
        ServerError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": {
                    message: string;
                };
            };
        };
    };
    parameters: {
        pathDeploymentId: string;
        /** @example 20 */
        queryLimit: number;
        /** @example eyJfcGFnZSI6IjIwMjUtMDktMzAiLCJpZCI6ImRlcF8xMjMifQ */
        queryCursor: string;
        /** @example forward */
        queryDirection: "forward" | "backward";
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
