import { useSession } from "@/contexts/session";
import { Content, ContentBody, ContentHeader, Field, FieldLabel, Heading, Input, ScrollArea, Text } from "@ubento/bento.arlo-core";
import { Info, User } from "lucide-react";
import { FC } from "react";

export const GeneralTab: FC = () => {
  const session = useSession();

  return (
    <Content>
      <ContentHeader>
        <div className="space-y-1">
          <Heading>Profile Info</Heading>
          <Text shade="subtle">Your personal profile details.</Text>
        </div>
      </ContentHeader>
      <ContentBody
        paddingX={false}
        paddingY={false}
        className="overflow-hidden flex flex-col"
      >
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-8">
            <section className="space-y-6">
              <div className="flex items-center gap-6 p-6 rounded-2xl bg-surface border border-border">
                <div className="h-20 w-20 rounded-full bg-surface-hover flex items-center justify-center overflow-hidden ring-4 ring-background">
                  {session.picture ? (
                    <img
                      src={session.picture}
                      alt={session.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-10 w-10 text-content-muted" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-content">
                    {session.name}
                  </h3>
                  <p className="text-sm text-content-subtle">
                    {session.email}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-xl bg-surface-hover/30 border border-border text-sm text-content-subtle">
                <Info className="h-5 w-5 shrink-0 text-content-subtle" />
                <div>
                  <p className="font-medium text-content">Managed by your provider</p>
                  <p className="mt-0.5">These details are synced from your identity provider and can be changed in your provider account.</p>
                </div>
              </div>

              <div className="grid gap-6">
                <Field>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input
                    type="text"
                    value={session.name}
                    disabled
                    placeholder="Full Name"
                  />
                </Field>
                <Field>
                  <FieldLabel>Email Address</FieldLabel>
                  <Input
                    type="email"
                    value={session.email}
                    disabled
                    placeholder="Email Address"
                  />
                </Field>
              </div>
            </section>
          </div>
        </ScrollArea>
      </ContentBody>
    </Content>
  );
};
