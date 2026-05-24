import { useMutation, useQuery } from "@tanstack/react-query";
import { memo, PropsWithChildren } from "react";
import {
  ActionStoreEntry,
  QueryStoreEntry,
  StoreEntry,
} from "../../spec/store.js";
import { useEnvironment } from "../renderer.js";
import { useResolvedValue } from "../states/resolver.js";
import {
  BoardRenderingContext,
  BoardRenderingContextPatch,
  useBoardRenderingContext,
} from "./context.js";

export const QueryStoreEntryProvider = memo(function QueryStoreEntryProvider({
  name,
  entry,
  children,
}: PropsWithChildren<{
  name: string;
  entry: QueryStoreEntry;
}>) {
  const environment = useEnvironment();
  const context = useBoardRenderingContext();
  const params = useResolvedValue(entry.params, context);
  const required = useResolvedValue(entry.required, context) || [];
  const result = useQuery({
    queryKey: [entry.service, name, params],
    queryFn: () =>
      environment.serviceApi.runQuery({
        service: entry.service,
        query: entry.query,
        args: params,
      }),
    enabled: required.every(Boolean),
  });

  return (
    <BoardRenderingContextPatch
      path={["store", name]}
      value={{
        data: result.data,
        error: result.error,
        isError: result.isError,
        isPending: result.isPending,
        isSuccess: result.isSuccess,
        status: result.status,
        fetchStatus: result.fetchStatus,
        isFetching: result.isFetching,
        isLoading: result.isLoading,
        params,
      }}
    >
      {children}
    </BoardRenderingContextPatch>
  );
});

export const ActionStoreEntryProvider = memo(function ActionStoreEntryProvider({
  name,
  entry,
  children,
}: PropsWithChildren<{
  name: string;
  entry: ActionStoreEntry;
}>) {
  const environment = useEnvironment();
  const result = useMutation({
    mutationFn: (variables: any) =>
      environment.serviceApi.runAction({
        service: entry.service,
        action: entry.action,
        args: { ...entry.params, ...variables },
      }),
  });

  return (
    <BoardRenderingContextPatch
      path={["store", name]}
      value={{
        data: result.data,
        error: result.error,
        isError: result.isError,
        isPending: result.isPending,
        isSuccess: result.isSuccess,
        status: result.status,
        run: result.mutate,
        runAsync: result.mutateAsync,
        reset: result.reset,
        params: entry.params,
      }}
    >
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
  const entries = Object.entries(store);
  for (const [name, entry] of entries) {
    switch (entry.type) {
      case "query":
        content = (
          <QueryStoreEntryProvider name={name} entry={entry}>
            {content}
          </QueryStoreEntryProvider>
        );
        break;
      case "action":
        content = (
          <ActionStoreEntryProvider name={name} entry={entry}>
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
