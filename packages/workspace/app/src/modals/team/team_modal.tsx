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
import { CreditCard, Link as LinkIcon, Settings } from "lucide-react";
import { useState } from "react";
import { Case, Switch } from "react-if";
import { BillingTab } from "./tabs/billing/billing.js";
import { GeneralTab } from "./tabs/general.js";
import { IntegrationsTab } from "./tabs/integrations/integrations.js";

interface TeamModalProps {
  team?: any;
}

export function TeamModal({ team }: TeamModalProps) {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { key: "general", label: "General", icon: Settings },
    { key: "billing", label: "Billing", icon: CreditCard },
    { key: "integrations", label: "Integrations", icon: LinkIcon },
  ];

  return (
    <RailLayout>
      <RailLayoutSide>
        <Content>
          <ContentHeader>
            <div className="space-y-1">
              <Heading>Settings</Heading>
              <Text tone="subtle">Team settings</Text>
            </div>
          </ContentHeader>
          <ContentBody>
            <div className="flex flex-col gap-1">
              {tabs.map((tab) => (
                <Button
                  size="lg"
                  align="start"
                  variant={activeTab === tab.key ? "primary" : "ghost"}
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
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
          <Case condition={activeTab === "general"}>
            <GeneralTab team={team} />
          </Case>
          <Case condition={activeTab === "billing"}>
            <BillingTab team={team} />
          </Case>
          <Case condition={activeTab === "integrations"}>
            <IntegrationsTab team={team} />
          </Case>
        </Switch>
      </RailLayoutMain>
    </RailLayout>
  );
}
