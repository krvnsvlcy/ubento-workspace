export interface paths {
    "/workspaces": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List all workspaces */
        get: {
            parameters: {
                query?: {
                    organization_id?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of workspaces */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Workspace"][];
                    };
                };
            };
        };
        put?: never;
        /** Create a new workspace */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["CreateWorkspaceRequest"];
                };
            };
            responses: {
                /** @description The created workspace */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Workspace"];
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
    "/workspaces/{workspace_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a workspace by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    workspace_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The workspace */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Workspace"];
                    };
                };
                /** @description Workspace not found */
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
        /** Delete a workspace */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    workspace_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The deleted workspace ID */
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
                /** @description Workspace not found */
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
        /** Update a workspace */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    workspace_id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["UpdateWorkspaceRequest"];
                };
            };
            responses: {
                /** @description The updated workspace */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Workspace"];
                    };
                };
                /** @description Workspace not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        trace?: never;
    };
    "/workspaces/{workspace_id}/file": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a file by path in a workspace */
        get: {
            parameters: {
                query: {
                    path: string;
                };
                header?: never;
                path: {
                    workspace_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The file */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["File"];
                    };
                };
                /** @description File not found */
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
    "/workspaces/{workspace_id}/files": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List all files in a workspace */
        get: {
            parameters: {
                query?: {
                    path?: string;
                    depth?: number;
                    types?: string;
                    exclude?: string;
                    include?: string;
                    exclude_types?: string;
                    /** @description Filter files updated after the given date (ISO 8601 format) */
                    updated_after?: string;
                    order?: string;
                    limit?: number;
                    offset?: number;
                    cursor?: string;
                    direction?: "forward" | "backward";
                };
                header?: never;
                path: {
                    workspace_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of files */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["File"][];
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
    "/workspaces/{workspace_id}/tree": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get the file tree structure of a workspace */
        get: {
            parameters: {
                query?: {
                    /** @description Include directories in the tree structure */
                    directories?: boolean;
                };
                header?: never;
                path: {
                    workspace_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The file tree structure */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["File"][];
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
    "/workspace-files": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List files by IDs */
        get: {
            parameters: {
                query: {
                    /** @description Comma-separated list of file IDs */
                    file_ids: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of files */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["File"][];
                    };
                };
            };
        };
        put?: never;
        /** Create a new file in a workspace */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["CreateFileRequest"];
                };
            };
            responses: {
                /** @description The created file */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["File"];
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
    "/workspace-files/{file_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a file by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    file_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The file */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["File"];
                    };
                };
                /** @description File not found */
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
        /** Delete a file */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    file_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The deleted file ID */
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
                /** @description File not found */
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
        /** Update a file */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    file_id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["UpdateFileRequest"];
                };
            };
            responses: {
                /** @description The updated file */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["File"];
                    };
                };
                /** @description File not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        trace?: never;
    };
    "/workspace-files/{file_id}/content": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get the content of a file as plain text */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    file_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The content of the file as plain text */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "text/plain": string;
                    };
                };
                /** @description File not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        /** Update the content of a file with plain text */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    file_id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "text/plain": string;
                };
            };
            responses: {
                /** @description The updated file */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["File"];
                    };
                };
                /** @description File not found */
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
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Workspace: {
            id: string;
            /** @default workspace */
            entity: string;
            organization_id: string;
            name: string;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        CreateWorkspaceRequest: {
            organization_id: string;
            name: string;
            members?: {
                subject?: string;
                roles?: string[];
            }[];
        };
        UpdateWorkspaceRequest: {
            name?: string;
        };
        File: {
            id: string;
            /** @default workspace_file */
            entity: string;
            workspace_id: string;
            path: string;
            type: string;
            hash?: string | null;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        CreateFileRequest: {
            workspace_id: string;
            bare_id?: string;
            path: string;
            type: string;
            content?: string;
        };
        UpdateFileRequest: {
            path?: string;
            type?: string;
            content?: string;
        };
        FileContent: {
            file_id: string;
            hash: string;
            version: number;
            data: string;
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
