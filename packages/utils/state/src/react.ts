import { useSyncExternalStore } from "react";
import { State, StateValue } from "./state.js";

export function useStateValue<S extends State<unknown>>(
  state: S,
): StateValue<S> {
  return useSyncExternalStore(
    state.subscribe,
    state.getSnapshot,
  ) as StateValue<S>;
}
