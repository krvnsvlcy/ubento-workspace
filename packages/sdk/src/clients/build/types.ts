export interface paths {
    "/builds": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List builds
         * @description List builds with cursor pagination and filters.
         */
        get: {
            parameters: {
                query?: {
                    /** @example 20 */
                    limit?: components["parameters"]["queryLimit"];
                    /** @example eyJfcGFnZSI6IjIwMjUtMTAtMDMiLCJpZCI6ImJsZF8xMjMifQ */
                    cursor?: components["parameters"]["queryCursor"];
                    /**
                     * @description Comma-separated build ids.
                     * @example bld_123,bld_456
                     */
                    ids?: string[];
                    organization_id?: string;
                    commit_id?: string;
                    pipeline_id?: string;
                    repository_id?: string;
                    /**
                     * @description Comma-separated build statuses (must match enum).
                     * @example RUNNING,SUCCEEDED
                     */
                    statuses?: ("CREATED" | "QUEUED" | "RUNNING" | "SUCCEEDED" | "FAILED" | "CANCELLED")[];
                    /**
                     * @description Sort expression. Supported fields: created_at, started_at, ended_at. E.g. created_at:desc
                     * @example created_at:desc
                     */
                    sort?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Builds page */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Build"][];
                    };
                };
                400: components["responses"]["ValidationError"];
                401: components["responses"]["Unauthorized"];
            };
        };
        put?: never;
        /**
         * Create a build
         * @description Creates a build, and (by default) enqueues a build task unless `options.omit_push` is true.
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
                        commit_id: string;
                        pipeline_id: string;
                        options?: {
                            omit_push?: boolean;
                        } & {
                            [key: string]: unknown;
                        };
                    };
                };
            };
            responses: {
                /** @description The created build */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Build"];
                    };
                };
                400: components["responses"]["ValidationError"];
                401: components["responses"]["Unauthorized"];
                500: components["responses"]["ServerError"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/builds/{build_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a build */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    build_id: components["parameters"]["pathBuildId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The build */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Build"];
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
        /**
         * Update a build
         * @description Update build status. Timestamps are managed by the service based on transitions (e.g., QUEUED → queued_at, RUNNING → started_at, terminal → ended_at).
         */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    build_id: components["parameters"]["pathBuildId"];
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        /** @enum {string} */
                        status: "CREATED" | "QUEUED" | "RUNNING" | "SUCCEEDED" | "FAILED" | "CANCELLED";
                        output?: Record<string, never>;
                    };
                };
            };
            responses: {
                /** @description The updated build */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Build"];
                    };
                };
                400: components["responses"]["ValidationError"];
                401: components["responses"]["Unauthorized"];
                404: components["responses"]["NotFound"];
            };
        };
        trace?: never;
    };
    "/pipelines": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List pipelines */
        get: {
            parameters: {
                query?: {
                    /** @example 20 */
                    limit?: components["parameters"]["queryLimit"];
                    /** @example eyJfcGFnZSI6IjIwMjUtMTAtMDMiLCJpZCI6ImJsZF8xMjMifQ */
                    cursor?: components["parameters"]["queryCursor"];
                    organization_id?: string;
                    repository_id?: string;
                    name?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Pipelines page */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Pipeline"][];
                    };
                };
                401: components["responses"]["Unauthorized"];
            };
        };
        put?: never;
        /** Create a pipeline */
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
                        description?: string;
                        auto_build?: boolean;
                        config: Record<string, never>;
                    };
                };
            };
            responses: {
                /** @description The created pipeline */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Pipeline"];
                    };
                };
                400: components["responses"]["ValidationError"];
                401: components["responses"]["Unauthorized"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/pipelines/{pipeline_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a pipeline */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    pipeline_id: components["parameters"]["pathPipelineId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The pipeline */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Pipeline"];
                    };
                };
                401: components["responses"]["Unauthorized"];
                404: components["responses"]["NotFound"];
            };
        };
        put?: never;
        post?: never;
        /** Delete a pipeline */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    pipeline_id: components["parameters"]["pathPipelineId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Deleted */
                204: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                401: components["responses"]["Unauthorized"];
                404: components["responses"]["NotFound"];
                /** @description Conflict (e.g., pipeline in use) */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        options?: never;
        head?: never;
        /** Update a pipeline */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    pipeline_id: components["parameters"]["pathPipelineId"];
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        name?: string;
                        description?: string;
                        auto_build?: boolean;
                        config?: Record<string, never>;
                    };
                };
            };
            responses: {
                /** @description The updated pipeline */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Pipeline"];
                    };
                };
                400: components["responses"]["ValidationError"];
                401: components["responses"]["Unauthorized"];
                404: components["responses"]["NotFound"];
            };
        };
        trace?: never;
    };
    "/tasks": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List tasks */
        get: {
            parameters: {
                query?: {
                    /** @example 20 */
                    limit?: components["parameters"]["queryLimit"];
                    /** @example eyJfcGFnZSI6IjIwMjUtMTAtMDMiLCJpZCI6ImJsZF8xMjMifQ */
                    cursor?: components["parameters"]["queryCursor"];
                    name?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Tasks page */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Task"][];
                    };
                };
                401: components["responses"]["Unauthorized"];
            };
        };
        put?: never;
        /** Create a task */
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
                        description?: string;
                    };
                };
            };
            responses: {
                /** @description The created task */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Task"];
                    };
                };
                400: components["responses"]["ValidationError"];
                401: components["responses"]["Unauthorized"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/tasks/{task_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a task */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    task_id: components["parameters"]["pathTaskId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The task */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Task"];
                    };
                };
                401: components["responses"]["Unauthorized"];
                404: components["responses"]["NotFound"];
            };
        };
        put?: never;
        post?: never;
        /** Delete a task */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    task_id: components["parameters"]["pathTaskId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Deleted */
                204: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                401: components["responses"]["Unauthorized"];
                404: components["responses"]["NotFound"];
                /** @description Conflict (e.g., versions exist) */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        options?: never;
        head?: never;
        /** Update a task */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    task_id: components["parameters"]["pathTaskId"];
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        name?: string;
                        description?: string;
                    };
                };
            };
            responses: {
                /** @description The updated task */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Task"];
                    };
                };
                400: components["responses"]["ValidationError"];
                401: components["responses"]["Unauthorized"];
                404: components["responses"]["NotFound"];
            };
        };
        trace?: never;
    };
    "/tasks/deploy": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Deploy a task version
         * @description Deploy a task version with manifest and files.
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
                        /** @description The organization ID */
                        organization_id: string;
                        /** @description Task manifest object */
                        manifest: Record<string, never>;
                        /** @description Files object containing task files */
                        files: Record<string, never>;
                    };
                };
            };
            responses: {
                /** @description The deployed task version */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["TaskVersion"];
                    };
                };
                400: components["responses"]["ValidationError"];
                401: components["responses"]["Unauthorized"];
                404: components["responses"]["NotFound"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/task-versions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List task versions */
        get: {
            parameters: {
                query?: {
                    /** @example 20 */
                    limit?: components["parameters"]["queryLimit"];
                    /** @example eyJfcGFnZSI6IjIwMjUtMTAtMDMiLCJpZCI6ImJsZF8xMjMifQ */
                    cursor?: components["parameters"]["queryCursor"];
                    task_name?: string;
                    semver?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Task versions page */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["TaskVersion"][];
                    };
                };
                401: components["responses"]["Unauthorized"];
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
    "/task-versions/{task_version_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a task version */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    task_version_id: components["parameters"]["pathTaskVersionId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The task version */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["TaskVersion"];
                    };
                };
                401: components["responses"]["Unauthorized"];
                404: components["responses"]["NotFound"];
            };
        };
        put?: never;
        post?: never;
        /** Delete a task version */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    task_version_id: components["parameters"]["pathTaskVersionId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Deleted */
                204: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                401: components["responses"]["Unauthorized"];
                404: components["responses"]["NotFound"];
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/task-versions/{task_version_id}/artifact.tar.zst": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Download task version artifact
         * @description Download the .tar.zst artifact file for a specific task version
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    task_version_id: components["parameters"]["pathTaskVersionId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The task version artifact file */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/zstd": string;
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
    "/task-versions/{task_version_id}/file/{fileName}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get task version file
         * @description Get a specific file from a task version
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    task_version_id: components["parameters"]["pathTaskVersionId"];
                    /** @description Name of the file to retrieve */
                    fileName: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The requested file content */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "*/*": string;
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
    "/task-versions/resolve/{organization_id}/{ref}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Resolve task version by reference
         * @description Resolve a task version using semantic version reference format 'name@range'
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description Organization ID */
                    organization_id: string;
                    /**
                     * @description Task version reference in format 'name@semverRange' (e.g., 'my-task@^1.2.0', 'my-task@latest')
                     * @example my-task@^1.2.0
                     */
                    ref: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The resolved task version */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["TaskVersion"];
                    };
                };
                /** @description Bad request - invalid reference format */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            message: string;
                        };
                    };
                };
                401: components["responses"]["Unauthorized"];
                /** @description Task or version not found */
                404: {
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
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/deploy/tasks/{task_id}/versions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Deploy a task version
         * @description Deploy a task version with semantic version, manifest, and files.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    task_id: components["parameters"]["pathTaskId"];
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        /**
                         * @description Semantic version for the task version
                         * @example 1.0.0
                         */
                        semver: string;
                        /** @description Task manifest object */
                        manifest: Record<string, never>;
                        /** @description Files object containing task files */
                        files: Record<string, never>;
                    };
                };
            };
            responses: {
                /** @description The deployed task version */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["TaskVersion"];
                    };
                };
                400: components["responses"]["ValidationError"];
                401: components["responses"]["Unauthorized"];
                404: components["responses"]["NotFound"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/variables": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List variables
         * @description List variables with cursor pagination and filters.
         */
        get: {
            parameters: {
                query: {
                    /** @example 20 */
                    limit?: components["parameters"]["queryLimit"];
                    /** @example eyJfcGFnZSI6IjIwMjUtMTAtMDMiLCJpZCI6ImJsZF8xMjMifQ */
                    cursor?: components["parameters"]["queryCursor"];
                    organization_id: string;
                    /** @description The repository ID */
                    repository_id?: string;
                    pipeline_id?: string | null;
                    /**
                     * @description Comma-separated variable names.
                     * @example API_KEY,DATABASE_URL
                     */
                    names?: string[];
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Variables page */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Variable"][];
                    };
                };
                400: components["responses"]["ValidationError"];
                401: components["responses"]["Unauthorized"];
            };
        };
        put?: never;
        /**
         * Create a variable
         * @description Creates a new variable. Values are automatically encrypted if is_sensitive is true.
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
                        organization_id: string;
                        repository_id?: string | null;
                        pipeline_id?: string | null;
                        name: string;
                        value: string;
                        is_sensitive: boolean;
                    };
                };
            };
            responses: {
                /** @description The created variable */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Variable"];
                    };
                };
                400: components["responses"]["ValidationError"];
                401: components["responses"]["Unauthorized"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/variables/resolved": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Resolve variables
         * @description Resolve all variables for a organization and optionally a repository and pipeline. Returns a map of variable names to their resolved values and metadata.
         */
        get: {
            parameters: {
                query: {
                    /** @description The organization ID */
                    organization_id: string;
                    /** @description The repository ID */
                    repository_id?: string;
                    /** @description The pipeline ID */
                    pipeline_id?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The resolved variables */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            [key: string]: {
                                value: string;
                                is_sensitive: boolean;
                                organization_id: string;
                                repository_id: string | null;
                                pipeline_id: string | null;
                            };
                        };
                    };
                };
                400: components["responses"]["ValidationError"];
                401: components["responses"]["Unauthorized"];
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
    "/variable": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a variable by name
         * @description Get a single variable by name within a organization and optionally a pipeline. If pipeline_id is provided, searches within that pipeline, otherwise searches organization-level variables (pipeline_id=null).
         */
        get: {
            parameters: {
                query: {
                    /** @description The organization ID */
                    organization_id: string;
                    /** @description The repository ID */
                    repository_id?: string;
                    /** @description The variable name */
                    name: string;
                    /** @description The pipeline ID. If provided, searches within that pipeline, otherwise searches organization-level variables. */
                    pipeline_id?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The variable */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Variable"];
                    };
                };
                400: components["responses"]["ValidationError"];
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
    "/variables/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get a variable by ID */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: components["parameters"]["pathVariableId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The variable */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Variable"];
                    };
                };
                401: components["responses"]["Unauthorized"];
                404: components["responses"]["NotFound"];
            };
        };
        put?: never;
        post?: never;
        /** Delete a variable */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: components["parameters"]["pathVariableId"];
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Deleted */
                204: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                401: components["responses"]["Unauthorized"];
                404: components["responses"]["NotFound"];
            };
        };
        options?: never;
        head?: never;
        /**
         * Update a variable
         * @description Update a variable. Values are automatically encrypted/decrypted based on is_sensitive flag.
         */
        patch: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    id: components["parameters"]["pathVariableId"];
                };
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": {
                        name?: string;
                        value?: string;
                        is_sensitive?: boolean;
                    };
                };
            };
            responses: {
                /** @description The updated variable */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Variable"];
                    };
                };
                400: components["responses"]["ValidationError"];
                401: components["responses"]["Unauthorized"];
                404: components["responses"]["NotFound"];
            };
        };
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Build: {
            id: string;
            /** @default build */
            entity: string;
            organization_id: string;
            repository_id: string;
            commit_id: string;
            pipeline_id: string;
            build_number: number;
            /**
             * @default CREATED
             * @enum {string}
             */
            status: "CREATED" | "QUEUED" | "RUNNING" | "SUCCEEDED" | "FAILED" | "CANCELLED";
            log_sink_id?: string | null;
            output?: number | string | boolean | Record<string, never> | unknown[] | null;
            /** Format: date-time */
            queued_at?: string | null;
            /** Format: date-time */
            started_at?: string | null;
            /** Format: date-time */
            ended_at?: string | null;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        Pipeline: {
            id: string;
            /** @default pipeline */
            entity: string;
            organization_id: string;
            repository_id: string;
            name: string;
            description?: string | null;
            /** @default false */
            auto_build: boolean;
            config: number | string | boolean | Record<string, never> | unknown[] | null;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        Task: {
            id: string;
            /** @default task */
            entity: string;
            organization_id: string;
            name: string;
            description?: string | null;
            latest?: string | null;
            latest_stable?: string | null;
            latest_per_major?: number | string | boolean | Record<string, never> | unknown[] | null;
            latest_per_channel?: number | string | boolean | Record<string, never> | unknown[] | null;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        TaskVersion: {
            id: string;
            /** @default task_version */
            entity: string;
            organization_id: string;
            task_name: string;
            semver: string;
            semver_rank: number;
            manifest: number | string | boolean | Record<string, never> | unknown[] | null;
            /** @default 1 */
            version: number;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            updated_at: string;
        };
        Variable: {
            id: string;
            /** @default variable */
            entity: string;
            organization_id: string;
            repository_id?: string | null;
            pipeline_id?: string | null;
            name: string;
            value?: string | null;
            cipher_text?: string | null;
            iv?: string | null;
            edk?: string | null;
            /** @default false */
            is_sensitive: boolean;
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
        pathBuildId: string;
        pathPipelineId: string;
        pathTaskId: string;
        pathTaskVersionId: string;
        pathVariableId: string;
        /** @example 20 */
        queryLimit: number;
        /** @example eyJfcGFnZSI6IjIwMjUtMTAtMDMiLCJpZCI6ImJsZF8xMjMifQ */
        queryCursor: string;
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
