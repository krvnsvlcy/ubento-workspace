import {
  Button,
  Content,
  ContentBody,
  ContentHeader,
  Heading,
  RailLayout,
  RailLayoutMain,
  RailLayoutSide,
  Text,
} from "@ubento/bento.arlo-core";
import { Settings } from "lucide-react";
import { Case, Switch } from "react-if";
import { useAppModal } from "../hook.js";
import { appModalRoutes, routeMatch } from "../routes.js";
import { GeneralTab } from "./tabs/general.js";

const tabs = [
  {
    key: "general",
    label: "General",
    icon: Settings,
    path: appModalRoutes.workspace.general,
  },
];

export function WorkspaceModal() {
  const { path: location, push: navigate } = useAppModal();

  return (
    <RailLayout>
      <RailLayoutSide>
        <Content>
          <ContentHeader>
            <div className="space-y-1">
              <Heading>Workspace Settings</Heading>
              <Text shade="subtle">Manage workspace settings</Text>
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
          <Case
            condition={routeMatch(location, appModalRoutes.workspace.general)}
          >
            <GeneralTab />
          </Case>
        </Switch>
      </RailLayoutMain>
    </RailLayout>
  );
}
