import { Console } from "./console";
import { AppNavigation } from "./navigation";
import { AppState } from "../controller";

export function AppInteractor({
  app,
  state,
}: {
  app?: any;
  state: AppState;
}) {
  return (
    <>
      <AppNavigation state={state} app={app} />
      <Console state={state} />
    </>
  );
}
