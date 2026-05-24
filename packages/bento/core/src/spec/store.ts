import { z } from "zod";
import { eagerDirectiveSchema } from "./directives";

const queryStoreEntrySchema = z
  .object({
    type: z
      .literal("query")
      .describe(
        "Discriminator indicating this is a read-only data fetching operation.",
      ),
    service: z
      .string()
      .describe(
        "The name or identifier of the backend service, database, or API module resolving the query.",
      ),
    query: z
      .string()
      .describe(
        "The specific query identifier, method name, or endpoint path to execute (e.g., 'getUser', 'listProjects').",
      ),
    params: z
      .record(z.string(), z.any())
      .optional()
      .describe(
        "A map of arguments, variables, or filters passed into the query. These can be static values or expressions mapping to board parameters/state.",
      ),
    required: z
      .array(eagerDirectiveSchema)
      .optional()
      .describe(
        "A list of values that determine whether the query is enabled. The query is enabled if all values are truthy.",
      ),
  })
  .describe(
    "Defines a read-only operation used to fetch external data and inject it into the board's context.",
  );

export type QueryStoreEntry = z.infer<typeof queryStoreEntrySchema>;

const actionStoreEntrySchema = z
  .object({
    type: z
      .literal("action")
      .describe(
        "Discriminator indicating this is a mutation or side-effect operation (e.g., create, update, delete).",
      ),
    service: z
      .string()
      .describe(
        "The name or identifier of the backend service or API module handling the mutation.",
      ),
    action: z
      .string()
      .describe(
        "The specific action identifier, mutation method, or endpoint path to execute (e.g., 'updateStatus', 'deleteRecord').",
      ),
    params: z
      .record(z.string(), z.any())
      .optional()
      .describe(
        "Optional default payload parameters or static arguments to merge when executing the action.",
      ),
  })
  .describe(
    "Defines an executable operation that modifies backend state, typically triggered by UI listeners.",
  );

export type ActionStoreEntry = z.infer<typeof actionStoreEntrySchema>;

export const storeEntrySchema = z
  .discriminatedUnion("type", [queryStoreEntrySchema, actionStoreEntrySchema])
  .describe(
    "A discriminated union resolving to either a read-only query or a state-mutating action.",
  );

export const storeSpecSchema = z
  .record(z.string(), storeEntrySchema)
  .describe(
    "The global dictionary of all external data connections and mutations available to the board. Keys act as unique aliases referenced by UI bindings (for queries) or listeners (for actions).",
  );

export type StoreSpec = z.infer<typeof storeSpecSchema>;
export type StoreEntry = QueryStoreEntry | ActionStoreEntry;
