import { LayoutContext } from "@ubento/bento.arlo";
import {
  type BoardSpec,
  BoardView,
  EnvironmentContext,
  Interactor,
} from "@ubento/bento.engine";
import { environment } from "./environment";
import { spec } from "./spec";

export function GuestWorkspace() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        transition: "padding 0.2s",
      }}
    >
      <BoardPreview spec={spec} />
    </div>
  );
}

function BoardPreview({ spec }: { spec: BoardSpec }) {
  return (
    <EnvironmentContext value={environment}>
      <LayoutContext value={spec.style?.direction || "column"}>
        <BoardView spec={spec}>
          <Interactor />
        </BoardView>
      </LayoutContext>
    </EnvironmentContext>
  );
}
