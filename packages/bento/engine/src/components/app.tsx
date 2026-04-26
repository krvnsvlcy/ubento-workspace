import React from "react";
import { useSnapshot } from "valtio";
import { AppEngineController, AppEngineControllerContext } from "../controller";
import { AppData } from "../models";
import { NoPage } from "./page/no-page";
import { Page } from "./page/page";

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
    content = <NoPage />;
  }

  return (
    <AppEngineControllerContext value={controller}>
      {content}
    </AppEngineControllerContext>
  );
}
