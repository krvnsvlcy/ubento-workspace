import { BentoRuntime } from "../runtime/runtime";
import { BentoBoardView } from "./board";
import { BentoHomeView } from "./home";

export function BentoRuntimeView({ runtime }: { runtime: BentoRuntime }) {
  const location = runtime.useState((s) => s.location);

  if (location) {
    return (
      <BentoBoardView
        key={location.boardId}
        runtime={runtime}
        boardId={location.boardId}
        params={location.params}
      />
    );
  } else {
    return <BentoHomeView runtime={runtime} />;
  }
}
