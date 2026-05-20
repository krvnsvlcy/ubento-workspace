import { useSyncExternalStore } from "react";

export type State<T extends unknown = unknown> = {
  getSnapshot: () => T;
  subscribe: (listener: (state: T) => void) => () => void;
};
export type MutableState<T extends unknown = unknown> = State<T> & {
  update(updater: ((state: T) => Partial<T>) | Partial<T>): void;
};

export type StateValue<S extends State<unknown>> =
  S extends State<infer T> ? T : never;

export function combineStates<R extends Record<string, State<unknown>>>(
  states: R,
): State<{
  [K in keyof R]: StateValue<R[K]>;
}> {
  const getSnapshot = () => {
    return Object.fromEntries(
      Object.entries(states).map(([key, state]) => [key, state.getSnapshot()]),
    ) as {
      [K in keyof R]: StateValue<R[K]>;
    };
  };

  return {
    getSnapshot,
    subscribe: (
      listener: (state: { [K in keyof R]: StateValue<R[K]> }) => void,
    ) => {
      // Hold the current immutable reference
      let currentSnapshot = getSnapshot();

      const subscriptions = Object.entries(states).map(([key, state]) =>
        state.subscribe((newValue) => {
          // Create a NEW object reference on every update
          currentSnapshot = {
            ...currentSnapshot,
            [key]: newValue,
          };
          listener(currentSnapshot);
        }),
      );

      return () => {
        subscriptions.forEach((unsubscribe) => unsubscribe());
      };
    },
  };
}

export function mapState<T, U>(
  state: State<T>,
  mapper: (state: T) => U,
  isEqual?: (prev: U, next: U) => boolean,
): State<U> {
  let lastBaseSnapshot: T | undefined;
  let lastMappedSnapshot: U | undefined;
  let isInitialized = false;

  const getSnapshot = () => {
    const currentBaseSnapshot = state.getSnapshot();

    // Only recalculate if the base state reference changes
    if (!isInitialized || currentBaseSnapshot !== lastBaseSnapshot) {
      const nextMappedSnapshot = mapper(currentBaseSnapshot);

      if (!isInitialized) {
        lastMappedSnapshot = nextMappedSnapshot;
        isInitialized = true;
      } else {
        // Evaluate custom equality, or fallback to strict reference equality
        const areEqual = isEqual
          ? isEqual(lastMappedSnapshot as U, nextMappedSnapshot)
          : lastMappedSnapshot === nextMappedSnapshot;

        // Only update the memoized result if they are genuinely different
        if (!areEqual) {
          lastMappedSnapshot = nextMappedSnapshot;
        }
      }

      // Always update the base tracking reference
      lastBaseSnapshot = currentBaseSnapshot;
    }

    return lastMappedSnapshot as U;
  };

  return {
    getSnapshot,
    subscribe: (listener: (state: U) => void) => {
      // Keep track of the snapshot for this specific subscription
      let currentSnapshot = getSnapshot();

      return state.subscribe(() => {
        const nextSnapshot = getSnapshot();

        // The Ultimate Bailout:
        // If the snapshot reference hasn't changed (thanks to our memoization/isEqual logic),
        // we don't even wake up the listener (React).
        if (currentSnapshot !== nextSnapshot) {
          currentSnapshot = nextSnapshot;
          listener(nextSnapshot);
        }
      });
    },
  };
}

export function useStateValue<S extends State<unknown>>(
  state: S,
): StateValue<S> {
  return useSyncExternalStore(
    state.subscribe,
    state.getSnapshot,
  ) as StateValue<S>;
}
