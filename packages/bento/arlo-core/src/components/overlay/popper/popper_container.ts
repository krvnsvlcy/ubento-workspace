import * as React from "react";

export const PopperContainerContext = React.createContext<
  React.RefObject<HTMLElement | null> | HTMLElement | null | undefined
>(undefined);

export function usePopperContainer() {
  const ref = React.useContext(PopperContainerContext);
  if (ref instanceof HTMLElement) {
    return ref;
  }
  return ref?.current || document.body;
}
