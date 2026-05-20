export interface paths {
    "/intelligence/models/{model_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Proxy request to AI model provider
         * @description Proxy requests to AI model providers (OpenAI, Anthropic, Google). The request body must match the format expected by the target provider.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The model identifier */
                    model_id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": Record<string, never>;
                };
            };
            responses: {
                /** @description Model response */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Model not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
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
    "/intelligence/threads": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List threads
         * @description Retrieve a paginated list of threads for a workspace or team
         */
        get: {
            parameters: {
                query?: {
                    /** @description The workspace ID to filter threads */
                    workspace_id?: string;
                    /** @description The team ID to filter threads */
                    team_id?: string;
                    /** @description Comma-separated list of member IDs to filter threads (e.g., `?members=id1,id2,id3`). */
                    members?: string;
                    /** @description Pagination cursor for retrieving next page */
                    cursor?: string;
                    /** @description Maximum number of threads to return */
                    limit?: number;
                    /** @description Sort order for threads */
                    sort?: "recent" | "newest" | "id";
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description List of threads */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: components["schemas"]["Thread"][];
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
                /** @description Bad request */
                400: {
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
        /**
         * Create a new thread
         * @description Create a new conversation thread
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
                        /** @description Optional thread title */
                        title?: string;
                        /** @description The team ID where the thread belongs */
                        team_id?: string;
                        /** @description The workspace ID where the thread belongs */
                        workspace_id?: string;
                    };
                };
            };
            responses: {
                /** @description Thread created successfully */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Thread"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
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
    "/intelligence/threads/{thread_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a specific thread
         * @description Retrieve details of a specific thread by ID
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The thread ID */
                    thread_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Thread details */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Thread"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
                    };
                };
                /** @description Thread not found */
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
        /**
         * Delete a thread
         * @description Permanently delete a thread by ID
         */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The thread ID */
                    thread_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Thread deleted successfully */
                204: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
                    };
                };
                /** @description Thread not found */
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
        options?: never;
        head?: never;
        /**
         * Update a thread
         * @description Update thread title and metadata
         */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The thread ID */
                    thread_id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        /** @description New thread title */
                        title?: string;
                        /** @description Optional thread metadata */
                        metadata?: {
                            [key: string]: unknown;
                        };
                        /** @description Optional thread context */
                        context?: {
                            [key: string]: unknown;
                        };
                    };
                };
            };
            responses: {
                /** @description Thread updated successfully */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Thread"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
                    };
                };
                /** @description Thread not found */
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
    "/intelligence/threads/{thread_id}/generate-title": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Generate a title for a thread
         * @description Generate a title for a thread based on its messages
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The thread ID */
                    thread_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Thread title generated successfully */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Thread"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
                    };
                };
                /** @description Thread not found */
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
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/intelligence/threads/{thread_id}/messages": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get thread messages
         * @description Retrieve messages for a specific thread with pagination
         */
        get: {
            parameters: {
                query?: {
                    /** @description Pagination cursor for retrieving next page */
                    cursor?: string;
                    /** @description Maximum number of messages to return */
                    limit?: number;
                    /** @description Sort order for messages */
                    sort?: "newest" | "oldest";
                };
                header?: never;
                path: {
                    /** @description The thread ID */
                    thread_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description List of thread messages */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: components["schemas"]["Message"][];
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
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
                    };
                };
                /** @description Thread not found */
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
        /**
         * Create a message in the thread
         * @description Create a new message in the thread (user or agent message)
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The thread ID */
                    thread_id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        message: {
                            /**
                             * @description The role of the message sender
                             * @enum {string}
                             */
                            role: "user" | "agent";
                            /** @description Optional author identifier */
                            author?: string;
                            /** @description Message content data */
                            data: Record<string, never>;
                        };
                    };
                };
            };
            responses: {
                /** @description Message created successfully */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Message"];
                    };
                };
                /** @description Bad request - validation errors */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
                    };
                };
                /** @description Thread not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
                    };
                };
                /** @description Internal server error */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
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
    "/intelligence/messages/{message_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a specific message
         * @description Retrieve details of a specific message by ID
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The message ID */
                    message_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Message details */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Message"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
                    };
                };
                /** @description Message not found */
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
        /**
         * Delete a specific message
         * @description Permanently delete a message by ID
         */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The message ID */
                    message_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Message deleted successfully */
                204: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
                    };
                };
                /** @description Message not found */
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
        options?: never;
        head?: never;
        /**
         * Update a message
         * @description Update an existing message (used for agent message updates)
         */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The message ID */
                    message_id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        /** @description Updated message data */
                        data?: {
                            [key: string]: unknown;
                        };
                        /** @description Error message if any */
                        error?: string;
                    };
                };
            };
            responses: {
                /** @description Message updated successfully */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Message"];
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
                    };
                };
                /** @description Message not found */
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
    "/intelligence/messages": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Delete multiple messages
         * @description Delete multiple messages at once by providing an array of message IDs
         */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        /** @description Array of message IDs to delete */
                        message_ids: string[];
                    };
                };
            };
            responses: {
                /** @description Messages deleted successfully */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @description Number of messages that were deleted */
                            deleted_count: number;
                        };
                    };
                };
                /** @description Bad request - validation errors */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/intelligence/files": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List files
         * @description Retrieve a paginated list of files for a workspace
         */
        get: {
            parameters: {
                query?: {
                    /** @description The team ID to filter files */
                    team_id?: string;
                    /** @description The workspace ID to filter files */
                    workspace_id?: string;
                    /** @description Pagination cursor for retrieving next page */
                    cursor?: string;
                    /** @description Maximum number of files to return */
                    limit?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description List of files */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            data: components["schemas"]["File"][];
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
                /** @description Bad request */
                400: {
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
        /**
         * Upload a file
         * @description Upload a new file attachment
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
                    "multipart/form-data": {
                        /**
                         * Format: binary
                         * @description The file to upload
                         */
                        file: string;
                        /** @description The team ID */
                        team_id: string;
                        /** @description The workspace ID */
                        workspace_id?: string;
                    };
                };
            };
            responses: {
                /** @description File uploaded successfully */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["File"];
                    };
                };
                /** @description Bad request - no file or validation errors */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
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
    "/intelligence/files/{file_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a specific file
         * @description Retrieve metadata for a specific file
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The file ID */
                    file_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description File metadata */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["File"];
                    };
                };
                /** @description Bad request */
                400: {
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
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/intelligence/files/{file_id}/url": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a signed URL for a file
         * @description Retrieve a signed, short-lived download URL for a file
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The file ID */
                    file_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Signed download URL */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @description The signed URL */
                            url?: string;
                        };
                    };
                };
                /** @description File not found */
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
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/intelligence/tools/read-webpage": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Read a webpage
         * @description Fetch and extract content from a web URL
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
                        /**
                         * Format: uri
                         * @description The web URL to read
                         */
                        url: string;
                        /**
                         * @description Requested output format
                         * @default markdown
                         * @enum {string}
                         */
                        format?: "markdown" | "raw" | "json";
                    };
                };
            };
            responses: {
                /** @description Webpage content */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @description The extracted content */
                            content: string;
                        };
                    };
                };
                /** @description Bad request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Error"];
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
        Message: {
            id: string;
            /** @default intelligence_message */
            entity: string;
            thread_id: string;
            role: string;
            author?: string | null;
            data: number | string | boolean | Record<string, never> | unknown[] | null;
            error?: string | null;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        Thread: {
            id: string;
            /** @default intelligence_thread */
            entity: string;
            team_id: string;
            workspace_id?: string | null;
            title?: string | null;
            context?: number | string | boolean | Record<string, never> | unknown[] | null;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
            /** Format: date-time */
            last_message_at?: string;
        };
        File: {
            id: string;
            /** @default intelligence_file */
            entity: string;
            team_id: string;
            workspace_id?: string | null;
            name: string;
            type: string;
            size: number;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        /**
         * @description The current status of a message
         * @enum {string}
         */
        MessageStatus: "in_progress" | "completed" | "errored" | "aborted";
        Error: {
            /** @description A human-readable error message. */
            message: string;
            /** @description An internal error code. */
            code?: string;
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
