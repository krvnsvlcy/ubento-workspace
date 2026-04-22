export interface paths {
    "/drives": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List all drives */
        get: {
            parameters: {
                query?: {
                    organization_id?: string;
                    limit?: number;
                    cursor?: string;
                    sort?: "newest" | "id";
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of drives */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Drive"][];
                    };
                };
            };
        };
        put?: never;
        /** Create a new drive */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["CreateDriveRequest"];
                };
            };
            responses: {
                /** @description The created drive */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Drive"];
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
    "/drives/{drive_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a drive by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    drive_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The drive */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Drive"];
                    };
                };
                /** @description Drive not found */
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
        /** Delete a drive */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    drive_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The deleted drive ID */
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
                /** @description Drive not found */
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
        /** Update a drive */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    drive_id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["UpdateDriveRequest"];
                };
            };
            responses: {
                /** @description The updated drive */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Drive"];
                    };
                };
                /** @description Drive not found */
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
    "/drives/org/{organization_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a drive by organization ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    organization_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The drive */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Drive"];
                    };
                };
                /** @description Drive not found */
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
    "/drives/{drive_id}/file": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a file by path in a drive */
        get: {
            parameters: {
                query: {
                    path: string;
                };
                header?: never;
                path: {
                    drive_id: string;
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
    "/drives/{drive_id}/files": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List files in a drive */
        get: {
            parameters: {
                query?: {
                    path?: string;
                    exclude_types?: string;
                    limit?: number;
                    offset?: number;
                    cursor?: string;
                    direction?: "forward" | "backward";
                };
                header?: never;
                path: {
                    drive_id: string;
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
    "/drive-files": {
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
                    file_ids: string[];
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
        /** Create a new file in a drive */
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
    "/drive-files/{file_id}": {
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
    "/drive-files/{file_id}/signed-url": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Generate a signed URL for a file */
        get: {
            parameters: {
                query: {
                    action: "read" | "write";
                };
                header?: never;
                path: {
                    file_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The signed URL data */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["FileSignedUrlData"];
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
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Drive: {
            id: string;
            /** @default drive */
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
        CreateDriveRequest: {
            organization_id: string;
            name: string;
        };
        UpdateDriveRequest: {
            name?: string;
        };
        File: {
            id: string;
            /** @default drive_file */
            entity: string;
            drive_id: string;
            path: string;
            type: string;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        CreateFileRequest: {
            drive_id: string;
            path: string;
            type: string;
            content?: string;
        };
        UpdateFileRequest: {
            path?: string;
            content?: string;
        };
        FileContent: {
            file_id: string;
            hash: string;
            data: string;
        };
        FileSignedUrlData: {
            expires: number;
            ttl: number;
            id: string;
            drive_id: string;
            path: string;
            type: string;
            url: string;
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
