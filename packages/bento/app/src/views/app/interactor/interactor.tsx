import { Console } from "./console";
import { AppNavigation } from "./navigation";
import { AppInteractorState } from "./state";

export function AppInteractor({
  app,
  state,
}: {
  app?: any;
  state: AppInteractorState;
}) {
  return (
    <>
      <AppNavigation state={state} app={app} />
      <Console state={state} />
    </>
  );
}
