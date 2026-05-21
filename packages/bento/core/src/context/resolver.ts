import {
  FunctionSchema,
  ObjectNodeSchema,
  ObjectSchema,
} from "../checker/schema.js";

// Helper type guard to safely check for standard objects
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function resolveBoardContextSchema({
  spec,
  getServiceOperationSchema,
}: {
  spec: unknown;
  getServiceOperationSchema: (input: {
    type: "query" | "action";
    name: string;
    service: string;
  }) => Promise<FunctionSchema>;
}): Promise<ObjectSchema> {
  // Safe cast for the root spec object
  const safeSpec = isRecord(spec) ? spec : {};

  // 1. Initialize the Root Context Object matching BoardRenderingContextType
  const contextSchema: ObjectNodeSchema = {
    type: "object",
    properties: {
      // Hardcoded Session API
      session: {
        type: "object",
        properties: {
          user: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              email: { type: "string" },
              picture: { type: "string" },
            },
            required: ["id", "name", "email", "picture"],
          },
          team: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              picture: { type: "string" },
            },
            required: ["id", "name", "picture"],
          },
        },
        required: ["user", "team"],
      },
      // Hardcoded Workspace API
      workspace: {
        type: "object",
        properties: {
          goTo: {
            type: "function",
            parameters: {
              type: "object",
              properties: {
                boardId: { type: "string" },
                params: { type: "object" },
              },
              required: ["boardId"],
            },
          },
        },
        required: ["goTo"],
      },
      // Hardcoded Board API
      board: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          setTitle: { type: "function" },
        },
        required: ["id", "title", "setTitle"],
      },
      // Hardcoded setState binding function
      setState: { type: "function" },
    },
    required: ["session", "workspace", "board", "params", "state", "store", "setState"],
  };

  // ---------------------------------------------------------
  // 2. Resolve Parameters ($.params)
  // ---------------------------------------------------------
  const paramsSchema: ObjectNodeSchema = { type: "object", properties: {} };

  // Explicitly check if params is a valid object
  if (isRecord(safeSpec.params)) {
    for (const [key, paramSpec] of Object.entries(safeSpec.params)) {
      if (isRecord(paramSpec)) {
        // Assert param type (fallback to 'any')
        const paramType =
          typeof paramSpec.type === "string" ? paramSpec.type : "any";

        const paramProp: any = {
          type: paramType,
        };

        // Assert description/label
        if (typeof paramSpec.label === "string") {
          paramProp.description = paramSpec.label;
        }

        // Assert enum sources safely
        if (
          isRecord(paramSpec.source) &&
          paramSpec.source.type === "enum" &&
          Array.isArray(paramSpec.source.value)
        ) {
          paramProp.enum = paramSpec.source.value;
        }

        paramsSchema.properties![key] = paramProp;
      }
    }
  }
  contextSchema.properties!["params"] = paramsSchema;

  // ---------------------------------------------------------
  // 3. Resolve State ($.state)
  // ---------------------------------------------------------
  if (isRecord(safeSpec.state)) {
    contextSchema.properties!["state"] =
      safeSpec.state as unknown as ObjectSchema;
  } else {
    contextSchema.properties!["state"] = { type: "object", properties: {} };
  }

  // ---------------------------------------------------------
  // 4. Resolve Store Connections ($.store) - TanStack Wrapped!
  // ---------------------------------------------------------
  const storeSchema: ObjectNodeSchema = { type: "object", properties: {} };

  if (isRecord(safeSpec.store)) {
    const storeEntries = Object.entries(safeSpec.store);

    await Promise.all(
      storeEntries.map(async ([alias, entry]) => {
        // If entry is completely broken, fallback to 'any'
        if (!isRecord(entry)) {
          storeSchema.properties![alias] = { type: "any" };
          return;
        }

        // Extract properties safely
        const entryType =
          typeof entry.type === "string" ? entry.type : undefined;
        const service =
          typeof entry.service === "string" ? entry.service : undefined;

        let operation: string | undefined;
        if (entryType === "query" && typeof entry.query === "string") {
          operation = entry.query;
        } else if (entryType === "action" && typeof entry.action === "string") {
          operation = entry.action;
        }

        // If we are missing critical fields or have an invalid entryType, fallback gracefully
        if (
          !service ||
          !operation ||
          (entryType !== "query" && entryType !== "action")
        ) {
          storeSchema.properties![alias] = { type: "any" };
          return;
        }

        try {
          // Updated to pass the object input format
          const operationSchema = await getServiceOperationSchema({
            type: entryType as "query" | "action", // Type-safe thanks to the check above
            name: operation,
            service: service,
          });

          const returnType = operationSchema.returns || { type: "any" };
          const paramType = operationSchema.parameters || { type: "object" };

          if (entryType === "query") {
            // Map to the shape injected by QueryStoreEntryProvider
            storeSchema.properties![alias] = {
              type: "object",
              properties: {
                data: returnType,
                error: { type: "any" },
                isError: { type: "boolean" },
                isPending: { type: "boolean" },
                isSuccess: { type: "boolean" },
                status: { type: "string" },
                fetchStatus: { type: "string" },
                isFetching: { type: "boolean" },
                isLoading: { type: "boolean" },
                params: paramType,
              },
            };
          } else if (entryType === "action") {
            // Map to the shape injected by ActionStoreEntryProvider
            storeSchema.properties![alias] = {
              type: "object",
              properties: {
                data: returnType,
                error: { type: "any" },
                isError: { type: "boolean" },
                isPending: { type: "boolean" },
                isSuccess: { type: "boolean" },
                status: { type: "string" },
                run: operationSchema, // The actual mapped FunctionSchema
                runAsync: operationSchema,
                reset: { type: "function" },
                params: paramType,
              },
            };
          }
        } catch (error) {
          console.error(
            `Ubento Compiler: Failed to resolve schema for store entry '${alias}'.`,
            error,
          );
          storeSchema.properties![alias] = { type: "any" };
        }
      }),
    );
  }
  contextSchema.properties!["store"] = storeSchema;

  return contextSchema;
}
