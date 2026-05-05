import { useCallback, useEffect, useRef, useState } from "react";

export type MutationStatus = "idle" | "pending" | "success" | "error";

export interface UseMutationOptions<
  TData,
  TError,
  TVariables,
  TContext = unknown,
> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  onMutate?: (
    variables: TVariables,
  ) => Promise<TContext | void> | TContext | void;
  onSuccess?: (
    data: TData,
    variables: TVariables,
    context: TContext | undefined,
  ) => Promise<unknown> | void;
  onError?: (
    error: TError,
    variables: TVariables,
    context: TContext | undefined,
  ) => Promise<unknown> | void;
  onSettled?: (
    data: TData | undefined,
    error: TError | null,
    variables: TVariables,
    context: TContext | undefined,
  ) => Promise<unknown> | void;
}

export function useMutation<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
>(options: UseMutationOptions<TData, TError, TVariables, TContext>) {
  const [status, setStatus] = useState<MutationStatus>("idle");
  const [data, setData] = useState<TData | undefined>(undefined);
  const [error, setError] = useState<TError | null>(null);

  // Keep options in a ref to avoid infinite re-renders if the consumer passes inline functions
  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const mutateAsync = useCallback(async (variables: TVariables) => {
    setStatus("pending");
    setError(null);
    const currentOptions = optionsRef.current;

    let context: TContext | undefined;

    try {
      if (currentOptions.onMutate) {
        context = (await currentOptions.onMutate(variables)) as
          | TContext
          | undefined;
      }

      const result = await currentOptions.mutationFn(variables);

      setData(result);
      setStatus("success");

      if (currentOptions.onSuccess) {
        await currentOptions.onSuccess(result, variables, context);
      }
      if (currentOptions.onSettled) {
        await currentOptions.onSettled(result, null, variables, context);
      }

      return result;
    } catch (err) {
      const castedError = err as TError;
      setError(castedError);
      setStatus("error");

      if (currentOptions.onError) {
        await currentOptions.onError(castedError, variables, context);
      }
      if (currentOptions.onSettled) {
        await currentOptions.onSettled(
          undefined,
          castedError,
          variables,
          context,
        );
      }

      throw castedError; // mutateAsync should throw so consumers can try/catch
    }
  }, []);

  const mutate = useCallback(
    (
      variables: TVariables,
      mutateOptions?: {
        onSuccess?: (data: TData, variables: TVariables) => void;
        onError?: (error: TError, variables: TVariables) => void;
        onSettled?: (data: TData | undefined, error: TError | null) => void;
      },
    ) => {
      // Fire and forget. We catch the error internally to prevent unhandled promise rejections.
      mutateAsync(variables)
        .then((result) => mutateOptions?.onSuccess?.(result, variables))
        .catch((err) => mutateOptions?.onError?.(err as TError, variables))
        .finally(() => mutateOptions?.onSettled?.(data, error));
    },
    [mutateAsync, data, error],
  );

  return {
    mutate,
    mutateAsync,
    data,
    error,
    status,
    isIdle: status === "idle",
    isPending: status === "pending",
    isSuccess: status === "success",
    isError: status === "error",
    reset: () => {
      setStatus("idle");
      setData(undefined);
      setError(null);
    },
  };
}
