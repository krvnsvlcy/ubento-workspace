import { useSession } from "@/contexts/session";
import { PrimitiveButton as Button, Content, ContentBody, ContentHeader, Field, FieldLabel, Heading, PrimitiveInput as Input, ScrollArea, Text } from "@ubento/bento.arlo-core";
import { User } from "lucide-react";
import { FC, useState } from "react";

export const GeneralTab: FC = () => {
  const session = useSession();
  const [name, setName] = useState(session.name);

  const handleSave = () => {
    // Save operation placeholder or backend integration
  };

  return (
    <Content>
      <ContentHeader>
        <div className="space-y-1">
          <Heading>Profile Info</Heading>
          <Text tone="subtle">Update your profile photo and personal details.</Text>
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
              <div className="flex items-center gap-6 p-6 rounded-2xl bg-neutral-surface border border-neutral-border">
                <div className="h-20 w-20 rounded-full bg-neutral-surface-hover flex items-center justify-center overflow-hidden ring-4 ring-background">
                  {session.picture ? (
                    <img
                      src={session.picture}
                      alt={session.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-10 w-10 text-neutral-content-muted" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-content">
                    {session.name}
                  </h3>
                  <p className="text-sm text-neutral-content-subtle">
                    {session.email}
                  </p>
                </div>
              </div>

              <div className="grid gap-6">
                <Field>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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

            <div className="flex justify-end pt-4 border-t border-neutral-border/20">
              <Button onClick={handleSave} variant="primary" size="lg">
                Save Changes
              </Button>
            </div>
          </div>
        </ScrollArea>
      </ContentBody>
    </Content>
  );
};
