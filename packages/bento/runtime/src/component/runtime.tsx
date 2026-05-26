import { QueryClientProvider } from "@tanstack/react-query";
import { BentoRuntimeProvider } from "../context/runtime";
import { queryClient } from "../query";
import { BentoRuntime } from "../runtime/runtime";
import { BentoBoardView } from "./board";
import { BentoHomeView } from "./home";

export function BentoRuntimeView({ runtime }: { runtime: BentoRuntime }) {
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

  return (
    <BentoRuntimeProvider runtime={runtime}>
      <QueryClientProvider client={queryClient}>{content}</QueryClientProvider>
    </BentoRuntimeProvider>
  );
}
