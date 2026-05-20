import { PrimitiveButton as Button, Content, ContentBody, ContentHeader, Heading, RailLayout, RailLayoutMain, RailLayoutSide, Text } from "@ubento/bento.arlo-core";
import { User } from "lucide-react";
import { Case, Switch } from "react-if";
import { useAppModal } from "../hook.js";
import { appModalRoutes, routeMatch } from "../routes.js";
import { GeneralTab } from "./tabs/general.js";

export function AccountModal() {
  const { path, push: navigate } = useAppModal();

  const tabs = [
    {
      key: "general",
      label: "General",
      icon: User,
      path: appModalRoutes.account.general,
    },
  ];

  return (
    <RailLayout>
      <RailLayoutSide>
        <Content>
          <ContentHeader>
            <div className="space-y-1">
              <Heading>Account Settings</Heading>
              <Text tone="subtle">Manage personal settings</Text>
            </div>
          </ContentHeader>
          <ContentBody>
            <div className="flex flex-col gap-1">
              {tabs.map((tab) => (
                <Button
                  size="lg"
                  align="start"
                  variant={routeMatch(path, tab.path) ? "primary" : "ghost"}
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
          <Case condition={routeMatch(path, appModalRoutes.account.general)}>
            <GeneralTab />
          </Case>
        </Switch>
      </RailLayoutMain>
    </RailLayout>
  );
}
