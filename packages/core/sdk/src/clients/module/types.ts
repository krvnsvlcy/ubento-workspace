export interface paths {
    "/modules/slug/{slug}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Module by Slug */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    slug: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Module details */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Module"];
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
    "/modules": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Modules */
        get: {
            parameters: {
                query?: {
                    team_id?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of modules */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: components["schemas"]["Module"][];
                        };
                    };
                };
            };
        };
        put?: never;
        /** Create Module */
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
                        slug?: string;
                        team_id: string;
                        source: string;
                        /** @enum {string} */
                        scope: "team" | "public";
                    };
                };
            };
            responses: {
                /** @description Module created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Module"];
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
    "/modules/{module_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Module */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    module_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Module details */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Module"];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        /** Delete Module */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    module_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Module deleted */
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
        options?: never;
        head?: never;
        /** Update Module */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    module_id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": {
                        name?: string;
                        slug?: string;
                    };
                };
            };
            responses: {
                /** @description Module updated */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Module"];
                    };
                };
            };
        };
        trace?: never;
    };
    "/modules/{module_id}/versions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Module Versions */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    module_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of module versions */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: components["schemas"]["ModuleVersion"][];
                        };
                    };
                };
            };
        };
        put?: never;
        /** Publish Module Version */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    module_id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        source: string;
                    };
                };
            };
            responses: {
                /** @description Version published */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ModuleVersion"];
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
    "/modules/{module_id}/versions/{version_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Module Version */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    module_id: string;
                    version_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Module version details */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ModuleVersion"];
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
    "/modules/{module_id}/versions/{version_id}/source": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Module Version Source */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    module_id: string;
                    version_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Module version source code (TSX) */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: {
                                source: string;
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
    "/modules/{module_id}/versions/{version_id}/artifact": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Module Version Artifact */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    module_id: string;
                    version_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Module version transpiled artifact (JS) */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: {
                                artifact: string;
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
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Module: {
            id: string;
            /** @default module */
            entity: string;
            team_id: string;
            name: string;
            slug: string;
            latest_version_id: string;
            scope: string;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
            /** Format: date-time */
            deleted_at?: string;
        };
        ModuleVersion: {
            id: string;
            /** @default module_version */
            entity: string;
            module_id: string;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        Error: {
            error: {
                code: string;
                message: string;
                details?: Record<string, never>;
            };
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
