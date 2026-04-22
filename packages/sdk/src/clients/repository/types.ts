export interface paths {
    "/repositories": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Repositories */
        get: {
            parameters: {
                query?: {
                    /** @description Cursor for pagination */
                    cursor?: string;
                    /** @description Number of items to return */
                    limit?: number;
                    /** @description Filter by repository IDs */
                    ids?: string[];
                    /** @description Filter by repository name */
                    name?: string;
                    /** @description Filter by organization ID */
                    organization_id?: string;
                    /** @description Filter by repository type */
                    type?: string;
                    /** @description Filter by repository scope */
                    scope?: "public" | "private";
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of repositories */
                200: {
                    headers: {
                        /** @description Pagination link for next page */
                        Link?: string;
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Repository"][];
                    };
                };
            };
        };
        put?: never;
        /** Create Repository */
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
                        type: string;
                        scope?: string;
                    };
                };
            };
            responses: {
                /** @description Repository created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Repository"];
                    };
                };
                /** @description Validation errors */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ValidationError"];
                    };
                };
                /** @description Organization not found */
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
    "/repositories/{repository_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Repository */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    repository_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Repository details */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Repository"];
                    };
                };
                /** @description Repository not found */
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
        /** Delete Repository */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    repository_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Repository deleted */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": string;
                    };
                };
                /** @description Validation errors */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ValidationError"];
                    };
                };
                /** @description Repository not found */
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
        /** Update Repository */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    repository_id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        name?: string;
                    };
                };
            };
            responses: {
                /** @description Repository updated */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Repository"];
                    };
                };
                /** @description Validation errors */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ValidationError"];
                    };
                };
                /** @description Repository not found */
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
    "/repositories/{repository_id}/metadata": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Replace Repository Metadata */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    repository_id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        [key: string]: unknown;
                    };
                };
            };
            responses: {
                /** @description Repository details */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Repository"];
                    };
                };
                /** @description Repository not found */
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
        /** Update Repository Metadata */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    repository_id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        [key: string]: unknown;
                    };
                };
            };
            responses: {
                /** @description Repository details */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Repository"];
                    };
                };
                /** @description Repository not found */
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
    "/repositories/{repository_id}/commits": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Commits */
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
                    repository_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of commits */
                200: {
                    headers: {
                        /** @description Pagination link for next page */
                        Link?: string;
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Commit"][];
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
    "/commits/{commit_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Commit */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    commit_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Commit details */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Commit"];
                    };
                };
                /** @description Commit not found */
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
        /** Delete Commit */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    commit_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Commit deleted */
                204: {
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
    "/commits/{commit_id}/metadata": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Replace Commit Metadata */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    commit_id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        [key: string]: unknown;
                    };
                };
            };
            responses: {
                /** @description Commit details */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Commit"];
                    };
                };
                /** @description Commit not found */
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
        /** Update Commit Metadata */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    commit_id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        [key: string]: unknown;
                    };
                };
            };
            responses: {
                /** @description Commit details */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Commit"];
                    };
                };
                /** @description Commit not found */
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
    "/commits/{commit_id}/file": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get File at Path */
        get: {
            parameters: {
                query: {
                    path: string;
                };
                header?: never;
                path: {
                    commit_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description File details */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["CommitFile"];
                    };
                };
                /** @description Validation errors */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ValidationError"];
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
    "/commits/{commit_id}/files": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Commit Files */
        get: {
            parameters: {
                query?: {
                    path?: string;
                    depth?: number;
                };
                header?: never;
                path: {
                    commit_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description File list */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["CommitFile"][];
                    };
                };
                /** @description Validation errors */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ValidationError"];
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
    "/commit-files/{file_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get File */
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
                /** @description File details */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["CommitFile"];
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
    "/commit-files/{file_id}/content": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get the content of a file */
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
                /** @description File content */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": string;
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
    "/repositories/{repository_id}/workspace/diff": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Workspace Diff */
        get: {
            parameters: {
                query?: {
                    commit_id?: string;
                };
                header?: never;
                path: {
                    repository_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Workspace diff */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Validation errors */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ValidationError"];
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
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/repositories/{repository_id}/workspace/commit": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Commit Workspace Changes */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    repository_id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        message: string;
                        committer: string;
                        file_ids?: string[];
                    };
                };
            };
            responses: {
                /** @description Workspace committed */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Validation errors */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ValidationError"];
                    };
                };
                /** @description Committer not found or Workspace not found */
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
    "/repositories/{repository_id}/workspace/reset": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Reset Workspace Changes */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    repository_id: string;
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        commit_id?: string;
                        file_ids?: string[];
                    };
                };
            };
            responses: {
                /** @description Workspace reset */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Validation errors */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ValidationError"];
                    };
                };
                /** @description Committer not found or Workspace not found */
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
    "/commits/{commit_id}/record": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Commit Record */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    commit_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Commit record */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Commit not found */
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
    "/repositories/{repository_id}/workspace/record": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Workspace Record */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    repository_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Workspace record */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": Record<string, never>;
                    };
                };
                /** @description Validation errors */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ValidationError"];
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
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/repositories/{repository_id}/tags": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Tags */
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
                    repository_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description A list of tags */
                200: {
                    headers: {
                        /** @description Pagination link for next page */
                        Link?: string;
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Tag"][];
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
    "/repositories/{repository_id}/tags/{tag_name}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Tag by Name */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    repository_id: string;
                    tag_name: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Tag details */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Tag"];
                    };
                };
                /** @description Tag not found */
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
    "/repository-tags": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Create Tag */
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
                        name: string;
                        commit_id: string;
                    };
                };
            };
            responses: {
                /** @description Tag created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Tag"];
                    };
                };
                /** @description Validation errors */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["ValidationError"];
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
    "/repository-tags/{tag_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Tag by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    tag_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Tag details */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Tag"];
                    };
                };
                /** @description Tag not found */
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
        /** Delete Tag */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    tag_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Tag deleted */
                204: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Tag not found */
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
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Repository: {
            id: string;
            /** @default repository */
            entity: string;
            organization_id: string;
            name: string;
            scope?: string | null;
            type?: string | null;
            workspace_id: string;
            head?: string | null;
            pointers?: components["schemas"]["Pointer"][];
            metadata?: number | string | boolean | Record<string, never> | unknown[] | null;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        Commit: {
            id: string;
            /** @default commit */
            entity: string;
            organization_id: string;
            repository_id: string;
            sha: string;
            parent?: string | null;
            message: string;
            committer: string;
            /** Format: date-time */
            timestamp: string;
            tree: string;
            record: string;
            diff: number | string | boolean | Record<string, never> | unknown[] | null;
            metadata?: number | string | boolean | Record<string, never> | unknown[] | null;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        Tag: {
            id: string;
            /** @default repository_tag */
            entity: string;
            organization_id: string;
            repository_id: string;
            name: string;
            commit_id: string;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        Pointer: {
            name: string;
            tag_id: string;
        };
        CommitFile: {
            id: string;
            entity: string;
            commit_id: string;
            type: string;
            path: string;
            sha: string;
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        ValidationError: {
            errors?: {
                msg?: string;
                param?: string;
                location?: string;
            }[];
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
