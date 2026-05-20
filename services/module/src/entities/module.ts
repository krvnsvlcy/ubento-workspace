import {
  ModuleScope,
  ModuleVersionScope,
} from "@ubento/services.database/module";
import {
  generateBareId,
  makeEntityId,
  ubentoEntities,
} from "@ubento/services.primitives";
import {
  NotFoundError,
  prismaListWithCursor,
  ValidationError,
} from "@ubento/services.toolkit";
import prisma from "../lib/prisma.js";
import { createModuleVersion } from "./version.js";

export async function getModule(id: string) {
  return await prisma.module.findUnique({
    where: { id },
  });
}

export async function createModule(data: {
  name: string;
  team_id: string;
  source: string;
  author_id: string;
  scope: ModuleScope;
  type: string;
  summary?: string;
}) {
  const moduleId = makeEntityId({
    code: ubentoEntities.module.code,
    bareId: generateBareId(),
  });

  const version = await createModuleVersion({
    moduleId,
    source: data.source,
    type: data.type,
    authorId: data.author_id,
    scope: "private",
  });

  const module = await prisma.module.create({
    data: {
      id: moduleId,
      type: data.type,
      summary: data.summary || "",
      name: data.name,
      team_id: data.team_id,
      scope: data.scope,
      latest_version_id: version.id,
      private_version_id: version.id,
    },
  });

  return module;
}

export async function writeModule(args: {
  moduleId: string;
  authorId: string;
  source?: string;
  files?: Record<string, string>;
}) {
  const module = await prisma.module.findUnique({
    where: { id: args.moduleId },
    include: {
      latest_version: true,
    },
  });
  if (!module) {
    throw new NotFoundError(`Module with id ${args.moduleId} not found`);
  }

  const version = await createModuleVersion({
    moduleId: module.id,
    source: args.source,
    files: args.files,
    type: module.type,
    authorId: args.authorId,
    scope: "private",
  });
  return await prisma.module.update({
    where: { id: module.id },
    data: {
      private_version_id: version.id,
      latest_version_id: version.id,
    },
  });
}

export async function publishModule(args: {
  moduleId: string;
  authorId: string;
}) {
  const module = await prisma.module.findUnique({
    where: { id: args.moduleId },
    include: {
      latest_version: true,
    },
  });
  if (!module) {
    throw new NotFoundError(`Module with id ${args.moduleId} not found`);
  }

  const latestVersion = module.latest_version;
  if (latestVersion.scope === ModuleVersionScope.public) {
    throw new ValidationError(`Latest version is already public`);
  }

  const version = await prisma.moduleVersion.create({
    data: {
      id: makeEntityId({
        code: ubentoEntities.moduleVersion.code,
        bareId: generateBareId(),
      }),
      module_id: module.id,
      author_id: args.authorId,
      scope: "public",
      files: latestVersion.files as any,
    },
  });
  return await prisma.module.update({
    where: { id: module.id },
    data: {
      public_version_id: version.id,
      latest_version_id: version.id,
    },
  });
}

export async function updateModule(
  id: string,
  data: Partial<{
    name: string;
    summary: string;
    scope: ModuleScope;
  }>,
) {
  const module = await prisma.module.update({
    where: { id },
    data,
  });

  return module;
}

export async function deleteModule(id: string) {
  return await prisma.module.update({
    where: { id },
    data: {
      deleted_at: new Date(),
    },
  });
}

export async function listModules(filters: {
  team_id?: string;
  scope?: ModuleScope;
  type?: string;
  limit?: number;
  cursor?: string;
}) {
  return await prismaListWithCursor(prisma.module, {
    limit: filters.limit,
    cursor: filters.cursor,
    where: {
      team_id: filters.team_id,
      scope: filters.scope,
      type: filters.type,
      deleted_at: {
        isSet: false,
      },
    },
    orderBy: { created_at: "desc" },
    resolveCursor: (i) => ({ id: i.id }),
  });
}

export async function searchModules({
  query,
  types,
  scope,
  page = 1,
  limit = 20,
}: {
  query?: string;
  types?: string[];
  scope?: ModuleScope;
  page?: number;
  limit?: number;
}) {
  const skip = (page - 1) * limit;

  // 1. Dynamically build the filter array
  const filters: any[] = [];

  if (scope) {
    filters.push({
      text: { query: scope, path: "scope" },
    });
  }

  if (types && types.length > 0) {
    // Atlas Search text operator natively accepts an array of strings for OR logic
    filters.push({
      text: { query: types, path: "type.facetFilter" },
    });
  }

  // 2. Build the compound search object
  const compound: any = { filter: filters };

  if (query && query.trim() !== "") {
    // If there is a search term, do fuzzy relevance matching
    compound.must = [
      {
        text: {
          query: query.trim(),
          path: ["name", "summary", "type"],
          fuzzy: { maxEdits: 1, prefixLength: 2 },
        },
      },
    ];
  } else {
    // If the search bar is empty but they are using filters,
    // we use a wildcard to return all documents that match the filters.
    // (Requires "wildcard" analyzer in your index, or we just fallback to a standard match all)
    compound.must = [
      {
        wildcard: {
          query: "*",
          path: "name",
          allowAnalyzedField: true,
        },
      },
    ];
  }

  // 3. Execute the pipeline
  const pipeline = [
    {
      $search: {
        index: "module_marketplace_search",
        compound: compound,
      },
    },
    {
      $match: {
        deleted_at: { $exists: false },
      },
    },
    // If there is no query, sort by newest. If there is a query, Atlas sorts by relevance automatically.
    ...(query ? [] : [{ $sort: { created_at: -1 } }]),
    { $skip: skip },
    { $limit: limit + 1 }, // Fetch one extra to determine if there is a next page
    {
      $project: {
        id: { $toString: "$_id" },
        name: 1,
        type: 1,
        summary: 1,
        team_id: 1,
        scope: 1,
        latest_version_id: 1,
        created_at: 1,
        updated_at: 1,
        score: { $meta: "searchScore" },
      },
    },
  ];

  const rawResults = (await prisma.module.aggregateRaw({
    pipeline,
  })) as unknown as any[];

  // 4. Calculate pagination state
  const hasNextPage = rawResults.length > limit;
  const results = hasNextPage ? rawResults.slice(0, -1) : rawResults;

  return {
    data: results,
    pagination: {
      currentPage: page,
      hasNextPage,
      nextPage: hasNextPage ? page + 1 : null,
    },
  };
}
