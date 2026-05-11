import { useCallback } from "react";
import { useEnvironment } from "../states/environment.js";

export function useModal() {
  const { overlayManager } = useEnvironment();

  const open = useCallback((component: string, inputs: Record<string, any> = {}) => {
    return overlayManager.open({
      type: "modal",
      component,
      inputs,
      zIndex: 10000,
    });
  }, [overlayManager]);

  const close = useCallback((id: string) => {
    overlayManager.close(id);
  }, [overlayManager]);

  return { open, close };
}

export function usePopover() {
  const { overlayManager, domManager } = useEnvironment();

  const open = useCallback((anchorId: string, component: string, inputs: Record<string, any> = {}) => {
    const anchorRect = domManager.getState().rects[anchorId];
    
    return overlayManager.open({
      type: "popover",
      component,
      inputs,
      anchorId,
      anchorRect,
      zIndex: 9000,
    });
  }, [overlayManager, domManager]);

  const close = useCallback((id: string) => {
    overlayManager.close(id);
  }, [overlayManager]);

  return { open, close };
}

export function useTooltip() {
  const { overlayManager, domManager } = useEnvironment();

  const open = useCallback((anchorId: string, component: string, inputs: Record<string, any> = {}) => {
    const anchorRect = domManager.getState().rects[anchorId];
    
    return overlayManager.open({
      type: "tooltip",
      component,
      inputs,
      anchorId,
      anchorRect,
      zIndex: 11000,
    });
  }, [overlayManager, domManager]);

  const close = useCallback((id: string) => {
    overlayManager.close(id);
  }, [overlayManager]);

  return { open, close };
}
