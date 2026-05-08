import { Environment, EnvironmentContext } from "@ubento/bento.core";
import { BentoRuntime } from "../runtime/runtime";
import { BentoBoardView } from "./board";
import { BentoHomeView } from "./home";

export function BentoRuntimeView({
  runtime,
  environment,
}: {
  runtime: BentoRuntime;
  environment: Environment;
}) {
  const location = runtime.useState((s) => s.location);

  let content = <BentoHomeView runtime={runtime} />;

  if (location) {
    content = (
      <BentoBoardView
        key={location.boardId}
        runtime={runtime}
        boardId={location.boardId}
        params={location.params}
      />
    );
  }

  return <EnvironmentContext value={environment}>{content}</EnvironmentContext>;
}
