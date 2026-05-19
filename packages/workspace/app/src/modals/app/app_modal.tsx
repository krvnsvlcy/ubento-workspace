import { useModal } from "@/utils/modal-store";
import { PageModalContainer } from "@ubento/bento.arlo-core";
import { useEffect } from "react";
import { Case, Switch } from "react-if";
import { AccountModal } from "./account/account";
import { useAppModal } from "./hook";
import { ProviderModal } from "./provider/provider_modal";
import { ProvidersModal } from "./providers/providers_modal";
import { routeMatch } from "./routes";
import { TeamModal } from "./team/team_modal";

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
        <Case condition={routeMatch(path, "/provider")}>
          <ProviderModal />
        </Case>
        <Case condition={routeMatch(path, "/providers")}>
          <ProvidersModal />
        </Case>
      </Switch>
    </PageModalContainer>
  );
}
