import { createContext, useContext } from "react";
import { PageData } from "./models";

export type EngineMode = "live" | "edit";

export type AppEngineLocation = {
  pageId: string;
  params: Record<string, string>;
};

export type AppEngineState = {
  mode: EngineMode;
  location?: AppEngineLocation;
  selectionScope?: string;
  selection?: string[];
};

export type ComponentModule = {
  value?: React.ComponentType<any>;
};

export type AppEngineController = {
  state: AppEngineState;

  // selection
  select: (blockIds: string[], toggle?: boolean) => void;
  focusSelectionScope: (scope: string) => void;
  blurSelectionScope: () => void;

  // navigation
  goTo: (pageId: string, params?: Record<string, string>) => void;
  goBack: () => void;
  goForward: () => void;
  goHome: () => void;

  // page
  getPage: (pageId: string) => Promise<PageData>;
  getComponent: (componentId: string) => Promise<ComponentModule>;
};

export const AppEngineControllerContext =
  createContext<AppEngineController | null>(null);

export function useAppEngineController() {
  const controller = useContext(AppEngineControllerContext);

  if (!controller) {
    throw new Error(
      "useAppEngineController must be used within an AppEngineControllerProvider",
    );
  }

  return controller;
}
