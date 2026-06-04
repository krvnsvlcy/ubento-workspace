import { Db } from "mongodb";
import { z } from "zod";

// --- Configuration ---
const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 1000;

export type MongodbOperationHandler<S extends z.ZodType, O> = {
  schema: S;
  run: (db: Db, args: z.infer<S>) => Promise<O>;
};

export const operationHandlers = {
  find: {
    schema: z.object({
      collection: z.string(),
      filter: z.record(z.string(), z.any()).optional(),
      options: z.record(z.string(), z.any()).optional(),
    }),
    run: async function (db: Db, args): Promise<any> {
      const options = args.options ?? {};

      // 1. Enforce Default Limit if none is provided
      if (typeof options.limit !== "number") {
        options.limit = DEFAULT_LIMIT;
      }

      // 2. Enforce Hard Limit
      if (options.limit > MAX_LIMIT) {
        // Strict approach: Reject the request so the client developer knows they hit a wall.
        throw new Error(`Query rejected: limit cannot exceed ${MAX_LIMIT}.`);

        // Forgiving approach (alternative): Silently cap the limit instead of throwing.
        // options.limit = MAX_LIMIT;
      }

      return db
        .collection(args.collection)
        .find(args.filter ?? {}, options)
        .toArray();
    },
  },

  findOne: {
    schema: z.object({
      collection: z.string(),
      filter: z.record(z.string(), z.any()).optional(),
      options: z.record(z.string(), z.any()).optional(),
    }),
    run: async function (db: Db, args): Promise<any> {
      return db
        .collection(args.collection)
        .findOne(args.filter ?? {}, args.options);
    },
  },

  insertOne: {
    schema: z.object({
      collection: z.string(),
      document: z.record(z.string(), z.any()),
      options: z.record(z.string(), z.any()).optional(),
    }),
    run: async function (db: Db, args): Promise<any> {
      return db
        .collection(args.collection)
        .insertOne(args.document, args.options);
    },
  },

  insertMany: {
    schema: z.object({
      collection: z.string(),
      documents: z.array(z.record(z.string(), z.any())),
      options: z.record(z.string(), z.any()).optional(),
    }),
    run: async function (db: Db, args): Promise<any> {
      return db
        .collection(args.collection)
        .insertMany(args.documents, args.options);
    },
  },

  updateOne: {
    schema: z.object({
      collection: z.string(),
      filter: z.record(z.string(), z.any()),
      update: z.record(z.string(), z.any()),
      options: z.record(z.string(), z.any()).optional(),
    }),
    run: async function (db: Db, args): Promise<any> {
      return db
        .collection(args.collection)
        .updateOne(args.filter, args.update, args.options);
    },
  },

  updateMany: {
    schema: z.object({
      collection: z.string(),
      filter: z.record(z.string(), z.any()),
      update: z.record(z.string(), z.any()),
      options: z.record(z.string(), z.any()).optional(),
    }),
    run: async function (db: Db, args): Promise<any> {
      return db
        .collection(args.collection)
        .updateMany(args.filter, args.update, args.options);
    },
  },

  deleteOne: {
    schema: z.object({
      collection: z.string(),
      filter: z.record(z.string(), z.any()),
      options: z.record(z.string(), z.any()).optional(),
    }),
    run: async function (db: Db, args): Promise<any> {
      return db
        .collection(args.collection)
        .deleteOne(args.filter, args.options);
    },
  },

  deleteMany: {
    schema: z.object({
      collection: z.string(),
      filter: z.record(z.string(), z.any()),
      options: z.record(z.string(), z.any()).optional(),
    }),
    run: async function (db: Db, args): Promise<any> {
      return db
        .collection(args.collection)
        .deleteMany(args.filter, args.options);
    },
  },

  countDocuments: {
    schema: z.object({
      collection: z.string(),
      filter: z.record(z.string(), z.any()).optional(),
      options: z.record(z.string(), z.any()).optional(),
    }),
    run: async function (db: Db, args): Promise<any> {
      return db
        .collection(args.collection)
        .countDocuments(args.filter ?? {}, args.options);
    },
  },

  aggregate: {
    schema: z.object({
      collection: z.string(),
      pipeline: z.array(z.record(z.string(), z.any())),
      options: z.record(z.string(), z.any()).optional(),
    }),
    run: async function (db: Db, args): Promise<any> {
      return db
        .collection(args.collection)
        .aggregate(args.pipeline, args.options)
        .toArray();
    },
  },

  findOneAndUpdate: {
    schema: z.object({
      collection: z.string(),
      filter: z.record(z.string(), z.any()),
      update: z.record(z.string(), z.any()),
      options: z.record(z.string(), z.any()).optional(),
    }),
    run: async function (db: Db, args): Promise<any> {
      return db
        .collection(args.collection)
        .findOneAndUpdate(args.filter, args.update, args.options);
    },
  },

  listCollections: {
    schema: z.object({}),
    run: async function (db: Db, args): Promise<any> {
      const collections = await db.listCollections().toArray();
      return collections;
    },
  },

  listDatabases: {
    schema: z.object({}),
    run: async function (db: Db): Promise<any> {
      const adminDb = db.admin();
      const result = await adminDb.listDatabases();
      return result.databases;
    },
  },

  extractCollectionSchema: {
    schema: z.object({
      collection: z.string(),
      sampleSize: z.number().int().min(1).max(5000).default(100),
    }),
    run: async function (db: Db, args): Promise<any> {
      // Step 1: Check for explicit database-enforced JSON Schema validation rules
      const collections = await db
        .listCollections({ name: args.collection })
        .toArray();
      const explicitSchema = (collections[0] as any)?.options?.validator?.[
        "$jsonSchema"
      ];

      if (explicitSchema) {
        return {
          strategy: "explicit_validation",
          schema: explicitSchema,
        };
      }

      // Step 2: Fallback to probabilistic sampling for schema-less collections
      const sampledDocs = await db
        .collection(args.collection)
        .aggregate([{ $sample: { size: args.sampleSize } }])
        .toArray();

      if (sampledDocs.length === 0) {
        return {
          strategy: "empty_collection",
          schema: { type: "object", properties: {} },
        };
      }

      // Run recursive compilation over the collected payloads
      const inferredProperties = inferSchemaFromDocuments(sampledDocs);

      return {
        strategy: "probabilistic_inference",
        sampleSizeAnalyzed: sampledDocs.length,
        schema: {
          type: "object",
          properties: inferredProperties,
        },
      };
    },
  },

  extractDbSchema: {
    schema: z.object({
      sampleSize: z.number().int().min(1).max(5000).default(100),
    }),
    run: async function (db: Db, args): Promise<any> {
      const collections = await db.listCollections().toArray();
      const dbSchema: Record<string, any> = {};

      for (const colInfo of collections) {
        const colName = colInfo.name;
        const explicitSchema = (colInfo as any)?.options?.validator?.[
          "$jsonSchema"
        ];

        if (explicitSchema) {
          dbSchema[colName] = {
            strategy: "explicit_validation",
            schema: explicitSchema,
          };
          continue;
        }

        const sampledDocs = await db
          .collection(colName)
          .aggregate([{ $sample: { size: args.sampleSize } }])
          .toArray();

        if (sampledDocs.length === 0) {
          dbSchema[colName] = {
            strategy: "empty_collection",
            schema: { type: "object", properties: {} },
          };
          continue;
        }

        const inferredProperties = inferSchemaFromDocuments(sampledDocs);

        dbSchema[colName] = {
          strategy: "probabilistic_inference",
          sampleSizeAnalyzed: sampledDocs.length,
          schema: {
            type: "object",
            properties: inferredProperties,
          },
        };
      }

      return dbSchema;
    },
  },
} satisfies Record<string, MongodbOperationHandler<any, any>>;

/**
 * Iterates through a flat or deeply nested array of documents
 * to merge properties and detect structural types dynamically.
 */
function inferSchemaFromDocuments(docs: any[]): Record<string, any> {
  const schemaTree: Record<string, any> = {};

  for (const doc of docs) {
    if (!doc || typeof doc !== "object") continue;
    for (const [key, value] of Object.entries(doc)) {
      // Initialize key schema metadata if encountered for the first time
      if (!schemaTree[key]) {
        schemaTree[key] = { types: new Set<string>(), isOptional: false };
      }

      const detectedType = determineBsonType(value);
      schemaTree[key].types.add(detectedType);

      // Recursively parse inner object properties
      if (detectedType === "object" && value !== null) {
        schemaTree[key].properties = inferSchemaFromDocuments([value]);
      }

      // Recursively parse uniform or mixed array contents
      if (
        detectedType === "array" &&
        Array.isArray(value) &&
        value.length > 0
      ) {
        schemaTree[key].items = inferSchemaFromDocuments(value);
      }
    }
  }

  // Mark fields missing from any individual document in the sample batch as optional
  for (const key of Object.keys(schemaTree)) {
    const missingInDoc = docs.some((doc) => !doc || doc[key] === undefined);
    if (missingInDoc) {
      schemaTree[key].isOptional = true;
    }

    // Convert runtime tracking sets back into a clean serializable array configuration
    schemaTree[key].types = Array.from(schemaTree[key].types);
  }

  return schemaTree;
}

/**
 * Maps raw runtime data types and native driver primitives
 * directly back to standard BSON type strings.
 */
function determineBsonType(val: any): string {
  if (val === null) return "null";
  if (Array.isArray(val)) return "array";
  if (val instanceof Date) return "date";
  if (typeof val === "object") {
    // Detects native driver ObjectId instances cleanly
    if (typeof val.toHexString === "function") return "objectId";
    if (val._bsontype) return val._bsontype.toLowerCase();
    return "object";
  }
  return typeof val; // string, number, boolean
}
