import { ErrorView } from "@/components/error.js";
import { useWorkspaceEngine } from "@/contexts/workspace.js";
import { useUbentoEngine } from "@/hooks/app-engine";
import { PendingView } from "@ubento/bento.arlo-core";
import { WorkspaceEngine } from "../../../../../engine/workspace/engine.js";
import { useTheme } from "@/contexts/theme.js";
import { useEffect } from "react";

function WorkspaceOverlay({ engine }: { engine: WorkspaceEngine }) {
  const workspaceName = engine.useState((state) => state.workspace.title);
  const workspaceSlug = engine.useState((state) => state.workspace.slug);
  const runtimeStatus = engine.useState((state) => state.status);

  if (runtimeStatus === "ready") {
    return <></>;
  }

  let content = <></>;

  if (runtimeStatus === "error") {
    content = <ErrorView message="Failed to load workspace" />;
  } else {
    content = (
      <PendingView message={workspaceName || workspaceSlug || "Workspace"} />
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1000,
      }}
      className="bg-background"
    >
      {content}
    </div>
  );
}

function InvalidSpecOverlay({ engine }: { engine: WorkspaceEngine }) {
  const specIssues = engine.useState((state) => {
    const spec = state.workspace.spec;
    if (!spec.isValid) {
      return spec.issues;
    }
    return undefined;
  });

  if (!specIssues?.length) {
    return null;
  }

  const handleReset = () => {
    engine.updateWorkspaceSpec({
      spec: {},
      overwrite: true,
    });
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1001,
      }}
      className="bg-background"
    >
      <ErrorView
        message="Workspace specification is invalid"
        details={
          specIssues && specIssues.length > 0 ? (
            <pre className="max-w-[600px] max-h-[200px] overflow-auto text-[12px] whitespace-pre-wrap text-left">
              {specIssues
                ?.map(
                  (issue) => `${issue.location.join(".")}: ${issue.message}`,
                )
                .join("\n")}
            </pre>
          ) : undefined
        }
        action={{
          label: "Reset Workspace Spec",
          handler: handleReset,
        }}
      />
    </div>
  );
}

export function Viewer() {
  const appEngine = useUbentoEngine();
  const workspaceEngine = useWorkspaceEngine();
  const { isDark } = useTheme();

  useEffect(() => {
    workspaceEngine.setTheme(isDark);
  }, [isDark, workspaceEngine]);

  return (
    <div className="h-full w-full relative overflow-hidden flex flex-col">
      <div className="flex-1 relative">
        <iframe
          src={appEngine.workspaceRuntimeUrl}
          key={workspaceEngine.id}
          onLoad={(e) => {
            if (e.currentTarget.contentWindow) {
              workspaceEngine.init(e.currentTarget.contentWindow);
            }
          }}
          style={{
            height: "100%",
            width: "100%",
            border: "none",
            outline: "none",
          }}
        />
      </div>

      <WorkspaceOverlay engine={workspaceEngine} />
      <InvalidSpecOverlay engine={workspaceEngine} />
    </div>
  );
}
