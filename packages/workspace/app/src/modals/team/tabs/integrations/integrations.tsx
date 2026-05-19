import { useSession } from "@/contexts/session";
import {
  Content,
  ContentBody,
  ContentHeader,
  Heading,
  TabSwitch,
  TabSwitchOption,
  Text,
} from "@ubento/bento.arlo-core";
import { FC, useState } from "react";
import { Case, Switch } from "react-if";
import { ConnectionsTab } from "./tabs/connections.js";
import { ProvidersTab } from "./tabs/providers.js";

interface IntegrationsTabProps {
  team?: any;
}

export const IntegrationsTab: FC<IntegrationsTabProps> = ({
  team: initialTeam,
}) => {
  const session = useSession();
  const teamId = initialTeam?.id || session.teamId;

  const integrationTabs: TabSwitchOption<"connections" | "providers">[] = [
    { key: "connections", label: "Connections" },
    { key: "providers", label: "Providers" },
  ];

  const [subTab, setSubTab] = useState<"connections" | "providers">(
    "connections",
  );

  return (
    <Content>
      <ContentHeader className="space-y-4">
        <div className="space-y-1">
          <Heading>Integrations</Heading>
          <Text tone="subtle">Manage external integrations.</Text>
        </div>
        <TabSwitch
          options={integrationTabs}
          value={subTab}
          onChange={setSubTab}
        />
      </ContentHeader>
      <ContentBody
        paddingY={false}
        paddingX={false}
        className="overflow-hidden"
      >
        <Switch>
          <Case condition={subTab === "connections"}>
            <ConnectionsTab teamId={teamId} />
          </Case>

          <Case condition={subTab === "providers"}>
            <ProvidersTab />
          </Case>
        </Switch>
      </ContentBody>
    </Content>
  );
};
