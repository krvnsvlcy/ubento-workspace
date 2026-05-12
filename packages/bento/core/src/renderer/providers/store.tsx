import { memo, PropsWithChildren } from "react";
import {
  ActionStoreEntry,
  EntityListStoreEntry,
  EntityStoreEntry,
  InfiniteEntityListStoreEntry,
  PagedEntityListStoreEntry,
  QueryStoreEntry,
  StoreEntry,
} from "../../spec/store.js";
import {
  BoardRenderingContext,
  useBoardRenderingContext,
} from "../states/context.js";
import { useService } from "../states/environment.js";
import { BoardRenderingContextPatch } from "./context.js";

export const EntityStoreEntryProvider = memo(function EntityStoreEntryProvider({
  entry,
  children,
}: PropsWithChildren<{
  entry: EntityStoreEntry;
}>) {
  const service = useService(entry.service);
  const entityState = service.entity({
    entity: entry.entity,
    id: entry.id,
  });

  return (
    <BoardRenderingContextPatch
      path={["store", entry.name]}
      value={entityState}
    >
      {children}
    </BoardRenderingContextPatch>
  );
});

export const EntityListStoreEntryProvider = memo(
  function EntityListStoreEntryProvider({
    entry,
    children,
  }: PropsWithChildren<{
    entry: EntityListStoreEntry;
  }>) {
    const service = useService(entry.service);
    const state = service.useEntityList({
      entity: entry.entity,
      params: entry.params,
    });

    return (
      <BoardRenderingContextPatch path={["store", entry.name]} value={state}>
        {children}
      </BoardRenderingContextPatch>
    );
  },
);

export const PagedEntityListStoreEntryProvider = memo(
  function PagedEntityListStoreEntryProvider({
    entry,
    children,
  }: PropsWithChildren<{
    entry: PagedEntityListStoreEntry;
  }>) {
    const service = useService(entry.service);
    const state = service.usePagedEntityList({
      entity: entry.entity,
      params: entry.params,
    });

    return (
      <BoardRenderingContextPatch path={["store", entry.name]} value={state}>
        {children}
      </BoardRenderingContextPatch>
    );
  },
);

export const InfiniteEntityListStoreEntryProvider = memo(
  function InfiniteEntityListStoreEntryProvider({
    entry,
    children,
  }: PropsWithChildren<{
    entry: InfiniteEntityListStoreEntry;
  }>) {
    const service = useService(entry.service);
    const state = service.useInfiniteEntityList({
      entity: entry.entity,
      params: entry.params,
    });

    return (
      <BoardRenderingContextPatch path={["store", entry.name]} value={state}>
        {children}
      </BoardRenderingContextPatch>
    );
  },
);

export const QueryStoreEntryProvider = memo(function QueryStoreEntryProvider({
  entry,
  children,
}: PropsWithChildren<{
  entry: QueryStoreEntry;
}>) {
  const service = useService(entry.service);
  const state = service.useQuery({
    query: entry.query,
    params: entry.params,
  });

  return (
    <BoardRenderingContextPatch path={["store", entry.name]} value={state}>
      {children}
    </BoardRenderingContextPatch>
  );
});

export const ActionStoreEntryProvider = memo(function ActionStoreEntryProvider({
  entry,
  children,
}: PropsWithChildren<{
  entry: ActionStoreEntry;
}>) {
  const service = useService(entry.service);
  const state = service.useAction({
    action: entry.action,
    params: entry.params,
  });

  return (
    <BoardRenderingContextPatch path={["store", entry.name]} value={state}>
      {children}
    </BoardRenderingContextPatch>
  );
});

export const StoreProvider = memo(function StoreProvider({
  children,
  store,
}: PropsWithChildren<{ store: Record<string, StoreEntry> }>) {
  const context = useBoardRenderingContext();

  let content = children;
  for (let i = store.length - 1; i >= 0; i--) {
    const entry = store[i];
    switch (entry.type) {
      case "entity":
        content = (
          <EntityStoreEntryProvider entry={entry}>
            {content}
          </EntityStoreEntryProvider>
        );
        break;
      case "entity-list":
        content = (
          <EntityListStoreEntryProvider entry={entry}>
            {content}
          </EntityListStoreEntryProvider>
        );
        break;
      case "paged-entity-list":
        content = (
          <PagedEntityListStoreEntryProvider entry={entry}>
            {content}
          </PagedEntityListStoreEntryProvider>
        );
        break;
      case "infinite-entity-list":
        content = (
          <InfiniteEntityListStoreEntryProvider entry={entry}>
            {content}
          </InfiniteEntityListStoreEntryProvider>
        );
        break;
      case "query":
        content = (
          <QueryStoreEntryProvider entry={entry}>
            {content}
          </QueryStoreEntryProvider>
        );
        break;
      case "action":
        content = (
          <ActionStoreEntryProvider entry={entry}>
            {content}
          </ActionStoreEntryProvider>
        );
        break;
    }
  }

  return (
    <BoardRenderingContext
      value={{
        ...context,
        store: {},
      }}
    >
      {content}
    </BoardRenderingContext>
  );
});

store;
