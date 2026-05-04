import { createZustandStateController } from "@ubento/bento-primitives";
import { createStore as createZustandStore } from "zustand";

export type DomManagerState = {
  elements: Record<string, HTMLElement>;
  rects: Record<string, DOMRect>;
};

export function createDomManager() {
  const store = createZustandStore<DomManagerState>()(() => ({
    elements: {},
    rects: {},
  }));

  const controller = createZustandStateController(store);
  const elementToId = new Map<HTMLElement, string>();

  const updateAllRects = () => {
    controller.setState((state) => {
      const nextRects: Record<string, DOMRect> = {};
      let changed = false;

      for (const [id, element] of Object.entries(state.elements)) {
        const nextRect = element.getBoundingClientRect();
        const prevRect = state.rects[id];

        if (
          !prevRect ||
          nextRect.top !== prevRect.top ||
          nextRect.left !== prevRect.left ||
          nextRect.width !== prevRect.width ||
          nextRect.height !== prevRect.height
        ) {
          nextRects[id] = nextRect;
          changed = true;
        } else {
          nextRects[id] = prevRect;
        }
      }

      if (!changed) return state;
      return { ...state, rects: nextRects };
    });
  };

  const observer = new ResizeObserver(() => {
    updateAllRects();
  });

  // Listen for scroll and resize to track position changes
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", updateAllRects, { capture: true, passive: true });
    window.addEventListener("resize", updateAllRects, { passive: true });
  }

  return {
    ...controller,
    add: (id: string, element: HTMLElement) => {
      elementToId.set(element, id);
      observer.observe(element);

      controller.setState((state) => ({
        ...state,
        elements: {
          ...state.elements,
          [id]: element,
        },
        rects: {
          ...state.rects,
          [id]: element.getBoundingClientRect(),
        },
      }));
    },
    remove: (id: string) => {
      controller.setState((state) => {
        const element = state.elements[id];
        if (element) {
          observer.unobserve(element);
          elementToId.delete(element);
        }

        const nextElements = { ...state.elements };
        const nextRects = { ...state.rects };
        delete nextElements[id];
        delete nextRects[id];

        return {
          ...state,
          elements: nextElements,
          rects: nextRects,
        };
      });
    },
    refresh: updateAllRects,
    destroy: () => {
      observer.disconnect();
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", updateAllRects, { capture: true });
        window.removeEventListener("resize", updateAllRects);
      }
    }
  };
}

export type DomManager = ReturnType<typeof createDomManager>;
