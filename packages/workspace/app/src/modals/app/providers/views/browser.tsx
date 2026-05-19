import { useUbento } from "@/engine/app/engine";
import {
  Button,
  Content,
  ContentBody,
  Heading,
  Input,
  ScrollArea,
  RailLayout,
  RailLayoutMain,
  RailLayoutSide,
  Text,
} from "@ubento/bento.arlo-core";
import { Globe, Search, Plus } from "lucide-react";
import { FC, useState } from "react";
import { useAppModal } from "../../hook.js";
import { appModalRoutes } from "../../routes.js";
import { GoBack } from "../../go-back.js";

export const ProvidersBrowser: FC = () => {
  const { push: navigate } = useAppModal();
  const ubento = useUbento();
  const [search, setSearch] = useState("");

  const { data: allProviders = [] } = ubento.vertex.useConnectionProviders();

  const filtered = allProviders.filter((p: any) =>
    (p.name || p.id).toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelect = (provider: any) => {
    navigate(appModalRoutes.provider.provider, {
      providerCode: provider.code,
    });
  };

  return (
    <RailLayout>
      <RailLayoutSide>
        <div className="flex flex-col h-full justify-between p-6">
          <div className="space-y-4">
            <GoBack />
            <Heading className="text-xl font-bold">Select Service Provider</Heading>
            <Text tone="subtle" className="text-sm">
              Choose a service integration to add to your team, or configure authentication scopes and settings.
            </Text>
          </div>
          <div>
            <Button
              onClick={() => navigate(appModalRoutes.providers.create)}
              size="sm"
              className="gap-2 w-full justify-center"
            >
              <Plus size={14} /> Create Provider
            </Button>
          </div>
        </div>
      </RailLayoutSide>

      <RailLayoutMain>
        <Content>
          <div className="px-6 py-4 border-b border-neutral-border/30 bg-neutral-surface-hover/10">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-content-muted" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search integrations (e.g., Slack, GitHub...)"
                className="pl-9 w-full bg-neutral-surface border border-neutral-border/30 rounded-xl"
                autoFocus
              />
            </div>
          </div>

          <ContentBody
            paddingX={false}
            paddingY={false}
            className="flex-1 min-h-0 flex flex-col overflow-hidden"
          >
            <ScrollArea className="flex-1">
              <div className="p-6 space-y-4">
                {filtered.length === 0 ? (
                  <div className="py-12 text-center text-neutral-content-muted">
                    <p className="text-[13px]">
                      No integration providers found matching "{search}".
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {filtered.map((provider: any) => (
                      <button
                        key={provider.id}
                        onClick={() => handleSelect(provider)}
                        className="flex flex-col items-start text-left p-4 rounded-2xl bg-neutral-surface border border-neutral-border hover:border-neutral-border-hover hover:bg-neutral-surface-hover/30 hover:shadow-lg transition-all group duration-200 cursor-pointer"
                      >
                        <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-neutral-surface-hover group-hover:bg-neutral-surface-active text-neutral-content-muted group-hover:text-neutral-content transition-all mb-3">
                          <Globe className="h-5 w-5" />
                        </div>
                        <h4 className="text-sm font-bold text-neutral-content group-hover:text-foreground transition-colors mb-1">
                          {provider.name || provider.id}
                        </h4>
                        <p className="text-xs text-neutral-content-muted line-clamp-2">
                          {provider.description ||
                            `Integrate ${provider.name || provider.id} services with your team.`}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
          </ContentBody>

        </Content>
      </RailLayoutMain>
    </RailLayout>
  );
};
