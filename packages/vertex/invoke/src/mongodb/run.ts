import { Db } from "mongodb";
import { operationHandlers } from "./handlers.js";

export type MongoOperation = keyof typeof operationHandlers;

export type RunMongoOperationError = {
  code: "INVALID_OPERATION" | "INVALID_ARGUMENTS" | "INTERNAL_ERROR";
  message: string;
  details?: unknown;
};

export type RunMongoOperationResult<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: RunMongoOperationError;
    };

export async function runMongoOperation<T>({
  db,
  operation,
  args,
}: {
  db: Db;
  operation: MongoOperation;
  args: unknown;
}): Promise<RunMongoOperationResult<T>> {
  const handler = operationHandlers[operation];
  if (!handler) {
    return {
      data: null,
      error: {
        code: "INVALID_OPERATION",
        message: `Invalid operation: ${String(operation)}`,
        details: {
          operation,
        },
      },
    };
  }
  const parsedArgs = handler.schema.safeParse(args);
  if (!parsedArgs.success) {
    return {
      data: null,
      error: {
        code: "INVALID_ARGUMENTS",
        message: `Invalid arguments: ${parsedArgs.error.message}`,
        details: {
          operation,
          validationErrors: parsedArgs.error,
        },
      },
    };
  }

  try {
    const result = await handler.run(db, parsedArgs.data as any);
    return {
      data: result,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: {
        code: "INTERNAL_ERROR",
        message: error?.message || "Unknown error",
        details: error,
      },
    };
  }
}
