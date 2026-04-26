import { PendingView } from "@ubento/bento-primitives";
import { App, type AppData } from "@ubento/engine";
import { useEffect, useState } from "react";
import { proxy } from "valtio";
import { useKeyboardController } from "./keyboard";
import { rpc } from "./rpc";
import { createAppEngineController, setModuleUrlTemplate } from "./state";

const controller = createAppEngineController();

export function GuestApp() {
  useKeyboardController();
  const [app, setApp] = useState<AppData | null>(null);

  useEffect(() => {
    rpc.setHandlers({
      init: ({
        app,
        moduleUrlTemplate,
      }: {
        app: AppData;
        moduleUrlTemplate: string;
      }) => {
        setModuleUrlTemplate(moduleUrlTemplate);
        setApp(proxy(app));
        rpc.egress.ready({});
      },
      modeChanged: ({ mode }) => {
        controller.state.mode = mode;
      },
      selectionChanged: ({ elementIds }) => {
        controller.state.selection = elementIds;
      },
      selectionScopeChanged: ({ scope }) => {
        controller.state.selectionScope = scope;
      },
      locationChanged: ({ pageId, params }) => {
        controller.state.location = { pageId, params: params || {} };
      },
    });
    rpc.egress.connect({});
  }, []);

  let content: React.ReactNode;

  if (!app) {
    content = <PendingView message="Loading Application..." />;
  } else {
    content = <App app={app} controller={controller} />;
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {content}
    </div>
  );
}
