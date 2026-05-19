import { Case, Switch } from "react-if";
import { useAppModal } from "../hook.js";
import { appModalRoutes, routeMatch } from "../routes.js";
import { ProvidersBrowser } from "./views/browser.js";
import { CreateProvider } from "./views/create.js";

export function ProvidersModal() {
  const { path } = useAppModal();

  return (
    <Switch>
      <Case condition={routeMatch(path, appModalRoutes.providers.create)}>
        <CreateProvider />
      </Case>
      <Case condition={routeMatch(path, appModalRoutes.providers.providers)}>
        <ProvidersBrowser />
      </Case>
    </Switch>
  );
}
