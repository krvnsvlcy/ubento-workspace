import * as ts from "@tanstack/react-query";
import { ServiceOperationError } from "../../bridge/bridge.js";
import { useBentoRuntime } from "../../context/runtime.js";
import { BentoRuntime } from "../../runtime/runtime.js";

import { MutationOptions, QueryOptions } from "./types.js";

export type Filter<TDocument> = any;
export type Projection<TDocument> = any;
export type Sort<TDocument> = any;

export function mongodbFindQueryOptions<TDocument>({
  service,
  collection,
  filter,
  projection,
  sort,
  limit,
  skip,
  options,
}: {
  service: string;
  collection: string;
  filter?: Filter<TDocument>;
  projection?: Projection<TDocument>;
  sort?: Sort<TDocument>;
  limit?: number;
  skip?: number;
  options?: QueryOptions;
}) {
  return ts.queryOptions({
    ...options,
    queryKey: [
      service,
      collection,
      "find",
      filter,
      projection,
      sort,
      limit,
      skip,
    ],
    queryFn: async ({ meta }) => {
      const runtime = meta!.runtime as BentoRuntime;
      const res = await runtime.runServiceOperation({
        service,
        operation: "find",
        type: "query",
        args: {
          collection,
          filter,
          options: { projection, sort, limit, skip },
        },
      });
      if (res.ok) {
        return res.result;
      } else {
        throw new ServiceOperationError(res.error);
      }
    },
  });
}

export function mongodbFindOneQueryOptions<TDocument>({
  service,
  collection,
  filter,
  projection,
  options,
}: {
  service: string;
  collection: string;
  filter?: Filter<TDocument>;
  projection?: Projection<TDocument>;
  options?: QueryOptions;
}) {
  return ts.queryOptions({
    ...options,
    queryKey: [service, collection, "findOne", filter, projection],
    queryFn: async ({ meta }) => {
      const runtime = meta!.runtime as BentoRuntime;
      const res = await runtime.runServiceOperation({
        service,
        operation: "findOne",
        type: "query",
        args: {
          collection,
          filter,
          options: { projection },
        },
      });
      if (res.ok) {
        return res.result;
      } else {
        throw new ServiceOperationError(res.error);
      }
    },
  });
}

export function mongodbCountDocumentsQueryOptions<TDocument>({
  service,
  collection,
  filter,
  options,
}: {
  service: string;
  collection: string;
  filter?: Filter<TDocument>;
  options?: QueryOptions;
}) {
  return ts.queryOptions({
    ...options,
    queryKey: [service, collection, "countDocuments", filter],
    queryFn: async ({ meta }) => {
      const runtime = meta!.runtime as BentoRuntime;
      const res = await runtime.runServiceOperation({
        service,
        operation: "countDocuments",
        type: "query",
        args: {
          collection,
          filter,
        },
      });
      if (res.ok) {
        return res.result;
      } else {
        throw new ServiceOperationError(res.error);
      }
    },
  });
}

export function mongodbAggregateQueryOptions({
  service,
  collection,
  pipeline,
  options,
}: {
  service: string;
  collection: string;
  pipeline: any[];
  options?: QueryOptions;
}) {
  return ts.queryOptions({
    ...options,
    queryKey: [service, collection, "aggregate", pipeline],
    queryFn: async ({ meta }) => {
      const runtime = meta!.runtime as BentoRuntime;
      const res = await runtime.runServiceOperation({
        service,
        operation: "aggregate",
        type: "query",
        args: {
          collection,
          pipeline,
        },
      });
      if (res.ok) {
        return res.result;
      } else {
        throw new ServiceOperationError(res.error);
      }
    },
  });
}

export function mongodbListCollectionsQueryOptions({
  service,
  options,
}: {
  service: string;
  options?: QueryOptions;
}) {
  return ts.queryOptions({
    ...options,
    queryKey: [service, "listCollections"],
    queryFn: async ({ meta }) => {
      const runtime = meta!.runtime as BentoRuntime;
      const res = await runtime.runServiceOperation({
        service,
        operation: "listCollections",
        type: "query",
        args: {},
      });
      if (res.ok) {
        return res.result;
      } else {
        throw new ServiceOperationError(res.error);
      }
    },
  });
}

export function mongodbListDatabasesQueryOptions({
  service,
  options,
}: {
  service: string;
  options?: QueryOptions;
}) {
  return ts.queryOptions({
    ...options,
    queryKey: [service, "listDatabases"],
    queryFn: async ({ meta }) => {
      const runtime = meta!.runtime as BentoRuntime;
      const res = await runtime.runServiceOperation({
        service,
        operation: "listDatabases",
        type: "query",
        args: {},
      });
      if (res.ok) {
        return res.result;
      } else {
        throw new ServiceOperationError(res.error);
      }
    },
  });
}

export function mongodbExtractCollectionSchemaQueryOptions({
  service,
  collection,
  sampleSize,
  options,
}: {
  service: string;
  collection: string;
  sampleSize?: number;
  options?: QueryOptions;
}) {
  return ts.queryOptions({
    ...options,
    queryKey: [service, collection, "extractCollectionSchema", sampleSize],
    queryFn: async ({ meta }) => {
      const runtime = meta!.runtime as BentoRuntime;
      const res = await runtime.runServiceOperation({
        service,
        operation: "extractCollectionSchema",
        type: "query",
        args: {
          collection,
          sampleSize,
        },
      });
      if (res.ok) {
        return res.result;
      } else {
        throw new ServiceOperationError(res.error);
      }
    },
  });
}

export function mongodbExtractDbSchemaQueryOptions({
  service,
  sampleSize,
  options,
}: {
  service: string;
  sampleSize?: number;
  options?: QueryOptions;
}) {
  return ts.queryOptions({
    ...options,
    queryKey: [service, "extractDbSchema", sampleSize],
    queryFn: async ({ meta }) => {
      const runtime = meta!.runtime as BentoRuntime;
      const res = await runtime.runServiceOperation({
        service,
        operation: "extractDbSchema",
        type: "query",
        args: {
          sampleSize,
        },
      });
      if (res.ok) {
        return res.result;
      } else {
        throw new ServiceOperationError(res.error);
      }
    },
  });
}

export function mongodbInsertOneMutationOptions({
  service,
  collection,
  options,
}: {
  service: string;
  collection: string;
  options?: MutationOptions;
}) {
  const runtime = useBentoRuntime();
  return ts.mutationOptions({
    ...options,
    mutationKey: [service, collection, "insertOne"],
    mutationFn: async (variables: { document: any; options?: any }) => {
      const res = await runtime.runServiceOperation({
        service,
        operation: "insertOne",
        type: "action",
        args: {
          collection,
          document: variables.document,
          options: variables.options,
        },
      });
      if (res.ok) {
        return res.result;
      } else {
        throw new ServiceOperationError(res.error);
      }
    },
  });
}

export function mongodbInsertManyMutationOptions({
  service,
  collection,
  options,
}: {
  service: string;
  collection: string;
  options?: MutationOptions;
}) {
  const runtime = useBentoRuntime();
  return ts.mutationOptions({
    ...options,
    mutationKey: [service, collection, "insertMany"],
    mutationFn: async (variables: { documents: any[]; options?: any }) => {
      const res = await runtime.runServiceOperation({
        service,
        operation: "insertMany",
        type: "action",
        args: {
          collection,
          documents: variables.documents,
          options: variables.options,
        },
      });
      if (res.ok) {
        return res.result;
      } else {
        throw new ServiceOperationError(res.error);
      }
    },
  });
}

export function mongodbUpdateOneMutationOptions({
  service,
  collection,
  options,
}: {
  service: string;
  collection: string;
  options?: MutationOptions;
}) {
  const runtime = useBentoRuntime();
  return ts.mutationOptions({
    ...options,
    mutationKey: [service, collection, "updateOne"],
    mutationFn: async (variables: {
      filter: any;
      update: any;
      options?: any;
    }) => {
      const res = await runtime.runServiceOperation({
        service,
        operation: "updateOne",
        type: "action",
        args: {
          collection,
          filter: variables.filter,
          update: variables.update,
          options: variables.options,
        },
      });
      if (res.ok) {
        return res.result;
      } else {
        throw new ServiceOperationError(res.error);
      }
    },
  });
}

export function mongodbUpdateManyMutationOptions({
  service,
  collection,
  options,
}: {
  service: string;
  collection: string;
  options?: MutationOptions;
}) {
  const runtime = useBentoRuntime();
  return ts.mutationOptions({
    ...options,
    mutationKey: [service, collection, "updateMany"],
    mutationFn: async (variables: {
      filter: any;
      update: any;
      options?: any;
    }) => {
      const res = await runtime.runServiceOperation({
        service,
        operation: "updateMany",
        type: "action",
        args: {
          collection,
          filter: variables.filter,
          update: variables.update,
          options: variables.options,
        },
      });
      if (res.ok) {
        return res.result;
      } else {
        throw new ServiceOperationError(res.error);
      }
    },
  });
}

export function mongodbDeleteOneMutationOptions({
  service,
  collection,
  options,
}: {
  service: string;
  collection: string;
  options?: MutationOptions;
}) {
  const runtime = useBentoRuntime();
  return ts.mutationOptions({
    ...options,
    mutationKey: [service, collection, "deleteOne"],
    mutationFn: async (variables: { filter: any; options?: any }) => {
      const res = await runtime.runServiceOperation({
        service,
        operation: "deleteOne",
        type: "action",
        args: {
          collection,
          filter: variables.filter,
          options: variables.options,
        },
      });
      if (res.ok) {
        return res.result;
      } else {
        throw new ServiceOperationError(res.error);
      }
    },
  });
}

export function mongodbDeleteManyMutationOptions({
  service,
  collection,
  options,
}: {
  service: string;
  collection: string;
  options?: MutationOptions;
}) {
  const runtime = useBentoRuntime();
  return ts.mutationOptions({
    ...options,
    mutationKey: [service, collection, "deleteMany"],
    mutationFn: async (variables: { filter: any; options?: any }) => {
      const res = await runtime.runServiceOperation({
        service,
        operation: "deleteMany",
        type: "action",
        args: {
          collection,
          filter: variables.filter,
          options: variables.options,
        },
      });
      if (res.ok) {
        return res.result;
      } else {
        throw new ServiceOperationError(res.error);
      }
    },
  });
}

export function mongodbFindOneAndUpdateMutationOptions({
  service,
  collection,
  options,
}: {
  service: string;
  collection: string;
  options?: MutationOptions;
}) {
  const runtime = useBentoRuntime();
  return ts.mutationOptions({
    ...options,
    mutationKey: [service, collection, "findOneAndUpdate"],
    mutationFn: async (variables: {
      filter: any;
      update: any;
      options?: any;
    }) => {
      const res = await runtime.runServiceOperation({
        service,
        operation: "findOneAndUpdate",
        type: "action",
        args: {
          collection,
          filter: variables.filter,
          update: variables.update,
          options: variables.options,
        },
      });
      if (res.ok) {
        return res.result;
      } else {
        throw new ServiceOperationError(res.error);
      }
    },
  });
}
