import { useUbentoEngine } from "@/engine/app/engine";
import { useModal } from "@/utils/modal-store";
import { AppModal } from "./app_modal";

function makeLocationString(path: string, params: Record<string, string> = {}) {
  return `${path}#${JSON.stringify(params)}`;
}

function parseLocationString(location: string) {
  const [path, params] = location.split("#");
  return {
    path,
    params: params ? JSON.parse(params) : {},
  };
}

export function useAppModal() {
  const engine = useUbentoEngine();
  const instance = useModal();
  const history = engine.useState((s) => s.appModalHistory);

  const location = history[history.length - 1] || "";
  const parsedLocation = parseLocationString(location);

  return {
    path: parsedLocation.path,
    params: parsedLocation.params,
    canGoBack: history.length > 1,

    location,
    goBack: () => {
      engine.popAppModalHistory();
    },
    push: (path: string, params: Record<string, string> = {}) => {
      const location = makeLocationString(path, params);
      if (instance.activeModal?.component !== AppModal) {
        engine.setAppModalHistory([location]);
        instance.open(AppModal);
      } else {
        engine.pushAppModalHistory(location);
      }
    },
    replace: (path: string, params: Record<string, string> = {}) => {
      const location = makeLocationString(path, params);
      if (instance.activeModal?.component !== AppModal) {
        engine.setAppModalHistory([location]);
        instance.open(AppModal);
      } else {
        engine.replaceAppModalHistory(location);
      }
    },
  };
}
