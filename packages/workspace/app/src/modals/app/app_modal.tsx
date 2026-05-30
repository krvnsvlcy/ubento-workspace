import { useModal } from "@/utils/modal-store";
import { PageModalContainer } from "@ubento/bento.arlo-core";
import { useEffect } from "react";
import { Case, Switch } from "react-if";
import { AccountModal } from "./account/account";
import { useAppModal } from "./hook";
import { ProviderModal } from "./provider/provider_modal";
import { ProvidersModal } from "./providers/providers_modal";
import { routeMatch } from "./routes";
import { ServicesModal } from "./services/services";
import { TeamModal } from "./team/team_modal";
import { WorkspaceModal } from "./workspace/workspace_modal.js";
import { AssetsBrowserModal } from "./assets/assets.js";
import { PackagesBrowserModal } from "./assets/packages.js";
import { WorkspaceEngineProvider } from "@/contexts/workspace.js";

export function AppModal() {
  const { path } = useAppModal();
  const { close } = useModal();

  useEffect(() => {
    if (!path) {
      close();
    }
  }, [path]);

  if (!path) {
    return <></>;
  }

  return (
    <PageModalContainer>
      <Switch>
        <Case condition={routeMatch(path, "/team")}>
          <TeamModal />
        </Case>
        <Case condition={routeMatch(path, "/account")}>
          <AccountModal />
        </Case>
        <Case condition={routeMatch(path, "/workspace")}>
          <WorkspaceModal />
        </Case>
        <Case condition={routeMatch(path, "/provider")}>
          <ProviderModal />
        </Case>
        <Case condition={routeMatch(path, "/providers")}>
          <ProvidersModal />
        </Case>
        <Case condition={routeMatch(path, "/services")}>
          <ServicesModal />
        </Case>
        <Case condition={routeMatch(path, "/assets")}>
          <WorkspaceEngineProvider>
            <AssetsBrowserModal />
          </WorkspaceEngineProvider>
        </Case>
        <Case condition={routeMatch(path, "/packages")}>
          <WorkspaceEngineProvider>
            <PackagesBrowserModal />
          </WorkspaceEngineProvider>
        </Case>
      </Switch>
    </PageModalContainer>
  );
}
