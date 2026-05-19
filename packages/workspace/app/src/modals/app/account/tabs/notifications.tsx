import {
  Content,
  ContentBody,
  ContentHeader,
  Heading,
  Text,
} from "@ubento/bento.arlo-core";
import { Bell } from "lucide-react";
import { FC } from "react";

export const NotificationsTab: FC = () => {
  return (
    <Content>
      <ContentHeader>
        <div className="space-y-1">
          <Heading>Notification Settings</Heading>
          <Text tone="subtle">Manage how you receive alerts and updates.</Text>
        </div>
      </ContentHeader>
      <ContentBody className="flex flex-col items-center justify-center h-full py-20 text-center">
        <div className="h-16 w-16 rounded-2xl bg-neutral-surface border border-neutral-border flex items-center justify-center mb-4">
          <Bell className="h-8 w-8 text-neutral-content-muted" />
        </div>
        <Heading className="text-lg font-bold mb-2">Coming Soon</Heading>
        <Text tone="subtle" className="max-w-xs text-sm">
          We're currently working on this section to provide you with more control over your notifications.
        </Text>
      </ContentBody>
    </Content>
  );
};
