import { QueryClient } from "@tanstack/react-query";
import { ServiceOperationError } from "./bridge/bridge";

const retryLogic = (failureCount: number, error: unknown) => {
  // Max 3 retries
  if (failureCount >= 3) {
    return false;
  }

  if (error instanceof ServiceOperationError) {
    // Only retry if it's a temporary glitch AND safe to repeat
    return error.isTransient && error.isIdempotent;
  }

  // Default to retrying standard network errors
  return true;
};

// Define constants for readability (in milliseconds)
const STALE_TIME = 5 * 60 * 1000; // 5 minutes
const GC_TIME = 15 * 60 * 1000; // 15 minutes

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: retryLogic,

      // Data remains "fresh" for 5 minutes.
      // Components mounting during this window will use cache WITHOUT a background refetch.
      staleTime: STALE_TIME,

      // Inactive data stays in memory for 15 minutes before garbage collection.
      // Note: If you are using TanStack Query v4, rename `gcTime` to `cacheTime`.
      gcTime: GC_TIME,

      // Smart Default: Disable automatic refetching when the user switches tabs.
      // This prevents unnecessary API calls to your backend every time they alt-tab.
      refetchOnWindowFocus: false,

      // Smart Default: Only retry on mount if the data is actually stale.
      refetchOnMount: true,
    },
    mutations: {
      retry: retryLogic,
    },
  },
});
