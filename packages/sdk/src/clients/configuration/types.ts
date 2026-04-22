export interface paths {
    "/configurations/id/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        /** Get Configuration by ID */
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
                /** @description Configuration details */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Configuration"];
                    };
                };
                /** @description Configuration not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        /** Delete Configuration by ID */
        delete: {
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
                /** @description Configuration deleted */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": string;
                    };
                };
                /** @description Configuration not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/configurations/id/{id}/data": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        get?: never;
        /** Update Configuration by ID */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": {
                        data: Record<string, never>;
                    };
                };
            };
            responses: {
                /** @description Configuration updated */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Configuration"];
                    };
                };
                /** @description Configuration not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/configurations/{owner}/{key}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                owner: string;
                key: string;
            };
            cookie?: never;
        };
        /** Get Configuration */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    owner: string;
                    key: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Configuration details */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Configuration"];
                    };
                };
                /** @description Configuration not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        /** Delete Configuration */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    owner: string;
                    key: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Configuration deleted */
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
    "/configurations/{owner}/{key}/data": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                owner: string;
                key: string;
            };
            cookie?: never;
        };
        get?: never;
        /** Update Configuration */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    owner: string;
                    key: string;
                };
                cookie?: never;
            };
            requestBody?: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description Configuration updated */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Configuration"];
                    };
                };
            };
        };
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
        Configuration: {
            id: string;
            /** @default configuration */
            entity: string;
            owner: string;
            key: string;
            data: number | string | boolean | Record<string, never> | unknown[] | null;
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
