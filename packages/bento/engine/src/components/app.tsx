import React from "react";
import { useSnapshot } from "valtio";
import { BaseLocationHook, Route, Router, Switch } from "wouter";
import { AppData } from "../models";
import { Page } from "./page";

export function App({
  app,
  locationHook,
}: {
  app: AppData;
  locationHook?: BaseLocationHook;
}): React.JSX.Element {
  const snap = useSnapshot(app);

  return (
    <Router hook={locationHook}>
      <Switch>
        {Object.entries(snap.routes).map(([path, pageId]) => (
          <Route key={path} path={path}>
            <Page id={pageId} />
          </Route>
        ))}
        <Route>
          <div className="p-4 text-white">
            404 - No route matches for {snap.id}
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

