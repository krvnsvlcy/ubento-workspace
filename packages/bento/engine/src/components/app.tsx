import React from "react";
import { useSnapshot } from "valtio";
import { AppEngineController, AppEngineControllerContext } from "../controller";
import { AppData } from "../models";
import { Page } from "./page";

function NotFound(): React.JSX.Element {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <p className="text-xl text-gray-500">
        The page you are looking for does not exist.
      </p>
    </div>
  );
}

export function App({
  app,
  controller,
}: {
  app: AppData;
  controller: AppEngineController;
}): React.JSX.Element {
  const snap = useSnapshot(controller.state);
  let content = <></>;

  if (snap.location?.pageId) {
    content = (
      <Page id={snap.location.pageId} params={snap.location.params || {}} />
    );
  } else {
    content = <NotFound />;
  }

  return (
    <AppEngineControllerContext value={controller}>
      {content}
    </AppEngineControllerContext>
  );
}
