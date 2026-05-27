import { useBentoRuntime } from "../context/runtime";

export function useLocation() {
  const runtime = useBentoRuntime();
  const location = runtime.useState((s) => s.location);
  return location;
}

export function useNavigation() {
  const runtime = useBentoRuntime();
  return {
    goToBoard: (boardId: string, params: Record<string, string> = {}) => {
      runtime.goToBoard(boardId, params);
    },
    goHome: () => {
      runtime.goHome();
    },
  };
}

export function useParams() {
  const location = useLocation();
  return location?.params || {};
}
