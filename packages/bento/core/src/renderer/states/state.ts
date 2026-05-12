import { createStore } from "zustand";
import { StateSpec } from "../../spec/state";

export type StateBuilderContext = {};

export function buildBoardState({
  init = {},
  spec,
  context,
}: {
  init?: Record<string, unknown>;
  spec: StateSpec;
  context: StateBuilderContext;
}) {
  let initialState: any = {};

  for (const [name, entry] of Object.entries(spec)) {
    switch (entry.type) {
      case "string":
        initialState[name] = "";
        break;
      case "number":
        initialState[name] = 0;
        break;
      case "boolean":
        initialState[name] = false;
        break;
      case "array":
        initialState[name] = [];
        break;
      case "object":
        initialState[name] = {};
      case "entity":
        break;
      case "entity-list":
        initialState[name] = [];
        break;
      case "set":
        break;
      case "map":
        break;
      case "ref":
        break;
    }
  }

  const store = createStore()(() => initialState);
}
