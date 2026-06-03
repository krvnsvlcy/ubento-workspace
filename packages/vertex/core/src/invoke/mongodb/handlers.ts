import { MongoClient } from "mongodb";
import { z } from "zod";

export type MongodbOperationHandler<S extends z.ZodType, O> = {
  schema: S;
  run: (client: MongoClient, args: z.infer<S>) => Promise<O>;
};

export const operationHandlers = {
  find: {
    schema: z.object({
      database: z.string(),
      collection: z.string(),
      filter: z.record(z.string(), z.any()).optional(),
      options: z.record(z.string(), z.any()).optional(),
    }),
    run: async function (client: MongoClient, args): Promise<any> {
      return client
        .db(args.database)
        .collection(args.collection)
        .find(args.filter ?? {}, args.options)
        .toArray();
    },
  },

  findOne: {
    schema: z.object({
      database: z.string(),
      collection: z.string(),
      filter: z.record(z.string(), z.any()).optional(),
      options: z.record(z.string(), z.any()).optional(),
    }),
    run: async function (client: MongoClient, args): Promise<any> {
      return client
        .db(args.database)
        .collection(args.collection)
        .findOne(args.filter ?? {}, args.options);
    },
  },

  insertOne: {
    schema: z.object({
      database: z.string(),
      collection: z.string(),
      document: z.record(z.string(), z.any()),
      options: z.record(z.string(), z.any()).optional(),
    }),
    run: async function (client: MongoClient, args): Promise<any> {
      return client
        .db(args.database)
        .collection(args.collection)
        .insertOne(args.document, args.options);
    },
  },

  insertMany: {
    schema: z.object({
      database: z.string(),
      collection: z.string(),
      documents: z.array(z.record(z.string(), z.any())),
      options: z.record(z.string(), z.any()).optional(),
    }),
    run: async function (client: MongoClient, args): Promise<any> {
      return client
        .db(args.database)
        .collection(args.collection)
        .insertMany(args.documents, args.options);
    },
  },

  updateOne: {
    schema: z.object({
      database: z.string(),
      collection: z.string(),
      filter: z.record(z.string(), z.any()),
      update: z.record(z.string(), z.any()),
      options: z.record(z.string(), z.any()).optional(),
    }),
    run: async function (client: MongoClient, args): Promise<any> {
      return client
        .db(args.database)
        .collection(args.collection)
        .updateOne(args.filter, args.update, args.options);
    },
  },

  updateMany: {
    schema: z.object({
      database: z.string(),
      collection: z.string(),
      filter: z.record(z.string(), z.any()),
      update: z.record(z.string(), z.any()),
      options: z.record(z.string(), z.any()).optional(),
    }),
    run: async function (client: MongoClient, args): Promise<any> {
      return client
        .db(args.database)
        .collection(args.collection)
        .updateMany(args.filter, args.update, args.options);
    },
  },

  deleteOne: {
    schema: z.object({
      database: z.string(),
      collection: z.string(),
      filter: z.record(z.string(), z.any()),
      options: z.record(z.string(), z.any()).optional(),
    }),
    run: async function (client: MongoClient, args): Promise<any> {
      return client
        .db(args.database)
        .collection(args.collection)
        .deleteOne(args.filter, args.options);
    },
  },

  deleteMany: {
    schema: z.object({
      database: z.string(),
      collection: z.string(),
      filter: z.record(z.string(), z.any()),
      options: z.record(z.string(), z.any()).optional(),
    }),
    run: async function (client: MongoClient, args): Promise<any> {
      return client
        .db(args.database)
        .collection(args.collection)
        .deleteMany(args.filter, args.options);
    },
  },

  countDocuments: {
    schema: z.object({
      database: z.string(),
      collection: z.string(),
      filter: z.record(z.string(), z.any()).optional(),
      options: z.record(z.string(), z.any()).optional(),
    }),
    run: async function (client: MongoClient, args): Promise<any> {
      return client
        .db(args.database)
        .collection(args.collection)
        .countDocuments(args.filter ?? {}, args.options);
    },
  },

  aggregate: {
    schema: z.object({
      database: z.string(),
      collection: z.string(),
      pipeline: z.array(z.record(z.string(), z.any())),
      options: z.record(z.string(), z.any()).optional(),
    }),
    run: async function (client: MongoClient, args): Promise<any> {
      return client
        .db(args.database)
        .collection(args.collection)
        .aggregate(args.pipeline, args.options)
        .toArray();
    },
  },

  findOneAndUpdate: {
    schema: z.object({
      database: z.string(),
      collection: z.string(),
      filter: z.record(z.string(), z.any()),
      update: z.record(z.string(), z.any()),
      options: z.record(z.string(), z.any()).optional(),
    }),
    run: async function (client: MongoClient, args): Promise<any> {
      return client
        .db(args.database)
        .collection(args.collection)
        .findOneAndUpdate(args.filter, args.update, args.options);
    },
  },
} satisfies Record<string, MongodbOperationHandler<any, any>>;
