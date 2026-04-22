export interface paths {
    "/logging/sinks": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get all log sinks */
        get: {
            parameters: {
                query?: {
                    /** @description Cursor for pagination */
                    cursor?: string;
                    /** @description Number of items to return */
                    limit?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of log sinks */
                200: {
                    headers: {
                        /** @description Cursor for the next set of results */
                        "Next-Cursor"?: string | null;
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Sink"][];
                    };
                };
            };
        };
        put?: never;
        /** Create a new log sink */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["SinkCreate"];
                };
            };
            responses: {
                /** @description Log sink created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Sink"];
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
    "/logging/sinks/by-key/{key}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get or create a log sink by key */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    key: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A single log sink */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Sink"];
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
    "/logging/sinks/{sink_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a single log sink by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    sink_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A single log sink */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Sink"];
                    };
                };
                /** @description Log sink not found */
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
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/logging/sinks/{sink_id}/close": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Close a log sink */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    sink_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Log sink closed */
                204: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Log sink not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/logging/sinks/{sink_id}/logs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Fetch the log tail for a specific log sink */
        get: {
            parameters: {
                query?: {
                    /** @description Cursor for pagination */
                    cursor?: string;
                    /** @description Number of items to return */
                    limit?: number;
                };
                header?: never;
                path: {
                    sink_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of logs */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Log"][];
                    };
                };
                /** @description Log sink not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        /** Post a new log entry to a specific log sink */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    sink_id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["LogCreate"];
                };
            };
            responses: {
                /** @description Log entry created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Log"];
                    };
                };
                /** @description Sink is closed */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Log sink not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/logging/sinks/{sink_id}/logs/batch": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Post a batch of log entries to a specific log sink */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    sink_id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["LogBatchCreate"];
                };
            };
            responses: {
                /** @description Batch of log entries created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Log"][];
                    };
                };
                /** @description Sink is closed */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Log sink not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/logging/sinks/{sink_id}/stream": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Subscribe to a log sink's stream */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    sink_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Subscription to log sink stream established */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Log"];
                    };
                };
                /** @description Log sink not found */
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
        Sink: {
            id: string;
            /** @default log_sink */
            entity: string;
            key?: string;
            name?: string | null;
            description?: string | null;
            status: string;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        Log: {
            id: string;
            /** @default log */
            entity: string;
            sink_id: string;
            index: number;
            level: string;
            message: string;
            metadata?: number | string | boolean | Record<string, never> | unknown[] | null;
            timestamp: number;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        SinkCreate: {
            /** @example Application Logs */
            name?: string;
            /** @example Logs related to application events */
            description?: string;
        };
        LogCreate: {
            /** @example 1 */
            index: number;
            level: string;
            /** @example Application started successfully */
            message: string;
            timestamp: number;
            /**
             * @example {
             *       "userId": "12345",
             *       "ipAddress": "192.168.1.1"
             *     }
             */
            metadata?: {
                [key: string]: unknown;
            };
        };
        LogBatchCreate: {
            logs: components["schemas"]["LogCreate"][];
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
