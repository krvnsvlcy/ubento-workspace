import { Content, ContentBody, ContentHeader, Heading, ScrollArea, TabSwitch, Text } from "@ubento/bento.arlo-core";
import { useState } from "react";
import { Case, Switch } from "react-if";
import { AddonsTab } from "./tabs/addons";
import { HistoryTab } from "./tabs/history";
import { PlanTab } from "./tabs/plan";
import { UsageTab } from "./tabs/usage";

export const BillingTab = () => {
  const [activeBillingTab, setActiveBillingTab] = useState("plan");

  const billingTabs = [
    { key: "plan", label: "Plan" },
    { key: "usage", label: "Usage" },
    { key: "addons", label: "Addons" },
    { key: "history", label: "History" },
  ];

  return (
    <Content>
      <ContentHeader className="space-y-4">
        <div className="space-y-1">
          <Heading>Billing</Heading>
          <Text tone="subtle">Manage your billing plan and invoices.</Text>
        </div>
        <TabSwitch
          options={billingTabs}
          value={activeBillingTab}
          onChange={setActiveBillingTab}
        />
      </ContentHeader>
      <ContentBody
        paddingX={false}
        paddingY={false}
        className="overflow-hidden flex flex-col"
      >
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            <Switch>
              <Case condition={activeBillingTab === "plan"}>
                <PlanTab />
              </Case>
              <Case condition={activeBillingTab === "usage"}>
                <UsageTab />
              </Case>
              <Case condition={activeBillingTab === "addons"}>
                <AddonsTab />
              </Case>
              <Case condition={activeBillingTab === "history"}>
                <HistoryTab />
              </Case>
            </Switch>
          </div>
        </ScrollArea>
      </ContentBody>
    </Content>
  );
};
