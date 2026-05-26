import { Button, Content, ContentBody, ContentHeader, Heading, RailLayout, RailLayoutMain, RailLayoutSide, Text } from "@ubento/bento.arlo-core";
import { CreditCard, Link as LinkIcon, Settings } from "lucide-react";
import { Case, Switch } from "react-if";
import { useAppModal } from "../hook.js";
import { appModalRoutes, routeMatch } from "../routes.js";
import { BillingTab } from "./tabs/billing/billing.js";
import { GeneralTab } from "./tabs/general.js";
import { TeamConnectionsTab } from "./tabs/connections/connections.js";

const tabs = [
  {
    key: "general",
    label: "General",
    icon: Settings,
    path: appModalRoutes.team.general,
  },
  {
    key: "billing",
    label: "Billing",
    icon: CreditCard,
    path: appModalRoutes.team.billing,
  },
  {
    key: "connections",
    label: "Connections",
    icon: LinkIcon,
    path: appModalRoutes.team.connections,
  },
];

export function TeamModal() {
  const { path: location, push: navigate } = useAppModal();

  return (
    <RailLayout>
      <RailLayoutSide>
        <Content>
          <ContentHeader>
            <div className="space-y-1">
              <Heading>Settings</Heading>
              <Text shade="subtle">Team settings</Text>
            </div>
          </ContentHeader>
          <ContentBody>
            <div className="flex flex-col gap-1">
              {tabs.map((tab) => (
                <Button
                  size="lg"
                  align="start"
                  variant={routeMatch(location, tab.path) ? "primary" : "ghost"}
                  key={tab.key}
                  onClick={() => navigate(tab.path)}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </Button>
              ))}
            </div>
          </ContentBody>
        </Content>
      </RailLayoutSide>

      <RailLayoutMain>
        <Switch>
          <Case condition={routeMatch(location, appModalRoutes.team.general)}>
            <GeneralTab />
          </Case>
          <Case condition={routeMatch(location, appModalRoutes.team.billing)}>
            <BillingTab />
          </Case>
          <Case
            condition={routeMatch(location, appModalRoutes.team.connections)}
          >
            <TeamConnectionsTab />
          </Case>
        </Switch>
      </RailLayoutMain>
    </RailLayout>
  );
}
