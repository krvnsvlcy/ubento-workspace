import { parseLocationString } from "@/engine/app/app_modal";
import { useUbentoEngine } from "@/engine/app/engine";

export function useAppModal() {
  const engine = useUbentoEngine();
  const history = engine.useState((s) => s.appModalHistory);

  const location = history[history.length - 1] || "";
  const parsedLocation = parseLocationString(location);

  return {
    path: parsedLocation.path,
    params: parsedLocation.params,
    canGoBack: history.length > 1,

    location,
    goBack: () => {
      engine.popAppModal();
    },
    push: (path: string, params: Record<string, string> = {}) => {
      engine.pushAppModal(path, params);
    },
    replace: (path: string, params: Record<string, string> = {}) => {
      engine.replaceAppModal(path, params);
    },
  };
}
