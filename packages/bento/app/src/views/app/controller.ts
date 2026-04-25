import { AppData } from "@ubento/engine";
import { proxy } from "valtio";

export type AppState = {
  loading: boolean;
  error: boolean;
};

export type AppController = {
  state: AppState;
  load: (data: AppData) => void;
};

export function createAppController({
  initialState,
}: {
  initialState?: AppState;
}): AppController {
  const state = proxy<AppState>({
    loading: false,
    error: false,
    ...initialState,
  });

  return {
    state,
    load: (data: AppData) => {},
  };
}
