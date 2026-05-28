import { WorkspaceEngineProvider } from "@/contexts/workspace.js";
import { useAppModal } from "@/modals/app/hook.js";
import { appModalRoutes, routeMatch } from "@/modals/app/routes.js";
import { Case, Switch } from "react-if";
import { ServiceBrowser } from "./browser.js";
import { CreateProviderModal } from "./create-provider-modal.js";
import { CreateServiceModal } from "./create-service/create-service.js";
import { ServiceDetails } from "./details/details.js";
import { EditServiceModal } from "./edit-service.js";

export function ServicesModal() {
  const { path } = useAppModal();

  return (
    <WorkspaceEngineProvider>
      <Switch>
        <Case condition={routeMatch(path, appModalRoutes.services.edit)}>
          <EditServiceModal />
        </Case>
        <Case condition={routeMatch(path, appModalRoutes.services.create)}>
          <CreateServiceModal />
        </Case>
        <Case
          condition={routeMatch(path, appModalRoutes.services.createProvider)}
        >
          <CreateProviderModal />
        </Case>
        <Case condition={routeMatch(path, appModalRoutes.services.service)}>
          <ServiceDetails />
        </Case>
        <Case condition={routeMatch(path, appModalRoutes.services.services)}>
          <ServiceBrowser />
        </Case>
      </Switch>
    </WorkspaceEngineProvider>
  );
}
