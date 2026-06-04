import * as ts from "@tanstack/react-query";

export type QueryOptions = Omit<
  Parameters<typeof ts.useQuery>[0],
  "queryKey" | "queryFn"
> & {
  keepPreviousData?: boolean;
};

export type InfiniteQueryOptions = Omit<
  Parameters<typeof ts.useInfiniteQuery>[0],
  "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
>;

export type MutationOptions = Omit<
  Parameters<typeof ts.useMutation>[0],
  "mutationKey" | "mutationFn"
>;
