export interface paths {
    "/apps": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Apps */
        get: {
            parameters: {
                query?: {
                    cursor?: components["parameters"]["queryCursor"];
                    limit?: components["parameters"]["queryLimit"];
                    team_id?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of apps */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            items: components["schemas"]["App"][];
                            next_cursor?: string | null;
                        };
                    };
                };
            };
        };
        put?: never;
        /** Create App */
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
                        team_id: string;
                        description?: string;
                    };
                };
            };
            responses: {
                /** @description App created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["App"];
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
    "/apps/{app_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get App */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    app_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description App details */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["App"];
                    };
                };
                404: components["responses"]["NotFound"];
            };
        };
        put?: never;
        post?: never;
        /** Delete App */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    app_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description App deleted */
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
        /** Update App */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    app_id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": {
                        name?: string;
                        description?: string;
                    };
                };
            };
            responses: {
                /** @description App updated */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["App"];
                    };
                };
                404: components["responses"]["NotFound"];
            };
        };
        trace?: never;
    };
    "/pages": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Pages */
        get: {
            parameters: {
                query: {
                    cursor?: components["parameters"]["queryCursor"];
                    limit?: components["parameters"]["queryLimit"];
                    app_id: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of pages */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            items: components["schemas"]["Page"][];
                            next_cursor?: string | null;
                        };
                    };
                };
            };
        };
        put?: never;
        /** Create Page */
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
                        app_id: string;
                        name: string;
                        path: string;
                    };
                };
            };
            responses: {
                /** @description Page created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Page"];
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
    "/pages/{page_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Page */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    page_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Page details */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Page"];
                    };
                };
                404: components["responses"]["NotFound"];
            };
        };
        put?: never;
        post?: never;
        /** Delete Page */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    page_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Page deleted */
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
        /** Update Page */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    page_id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": {
                        name?: string;
                        path?: string;
                    };
                };
            };
            responses: {
                /** @description Page updated */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Page"];
                    };
                };
                404: components["responses"]["NotFound"];
            };
        };
        trace?: never;
    };
    "/components": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Components */
        get: {
            parameters: {
                query: {
                    cursor?: components["parameters"]["queryCursor"];
                    limit?: components["parameters"]["queryLimit"];
                    app_id: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of components */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            items: components["schemas"]["Component"][];
                            next_cursor?: string | null;
                        };
                    };
                };
            };
        };
        put?: never;
        /** Create Component */
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
                        app_id: string;
                        name: string;
                        type: string;
                        props?: Record<string, never>;
                    };
                };
            };
            responses: {
                /** @description Component created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Component"];
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
    "/components/{component_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Component */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    component_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Component details */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Component"];
                    };
                };
                404: components["responses"]["NotFound"];
            };
        };
        put?: never;
        post?: never;
        /** Delete Component */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    component_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Component deleted */
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
        /** Update Component */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    component_id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": {
                        name?: string;
                        type?: string;
                        props?: Record<string, never>;
                    };
                };
            };
            responses: {
                /** @description Component updated */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Component"];
                    };
                };
                404: components["responses"]["NotFound"];
            };
        };
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        App: {
            id: string;
            /** @default app */
            entity: string;
            name: string;
            description?: string;
            team_id: string;
            metadata?: Record<string, never>;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
            /** Format: date-time */
            deleted_at?: string;
        };
        Page: {
            id: string;
            /** @default page */
            entity: string;
            app_id: string;
            name: string;
            path: string;
            metadata?: Record<string, never>;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
            /** Format: date-time */
            deleted_at?: string;
        };
        Component: {
            id: string;
            /** @default component */
            entity: string;
            app_id: string;
            name: string;
            type: string;
            props?: Record<string, never>;
            metadata?: Record<string, never>;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
            /** Format: date-time */
            deleted_at?: string;
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
        /** @description Resource not found */
        NotFound: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Validation error */
        ValidationError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
    };
    parameters: {
        queryLimit: number;
        queryCursor: string;
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
