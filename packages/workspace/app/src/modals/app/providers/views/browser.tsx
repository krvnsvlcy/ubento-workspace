import { useUbento } from "@/engine/app/engine";
import { useDebounce } from "@/hooks/use-debouce.js";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll.js";
import {
  Button,
  Card,
  Content,
  ContentBody,
  ContentFooter,
  ContentHeader,
  EmptyView,
  Heading,
  Input,
  RailLayout,
  RailLayoutMain,
  RailLayoutSide,
  ScrollArea,
  Spinner,
  Text,
} from "@ubento/bento.arlo-core";
import { vertexClient } from "@ubento/services.sdk";
import { Globe, Plus, Search } from "lucide-react";
import { FC, useState } from "react";
import { Case, Default, Switch } from "react-if";
import { GoBack } from "../../go-back.js";
import { useAppModal } from "../../hook.js";
import { appModalRoutes } from "../../routes.js";

export const ProvidersBrowser: FC = () => {
  const { push: navigate } = useAppModal();
  const ubento = useUbento();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data, fetchNextPage, hasNextPage, isFetching } =
    ubento.vertex.useConnectionProviders({ name: debouncedSearch });
  const sentinelRef = useInfiniteScroll({
    hasNextPage: !!hasNextPage,
    isFetching,
    onLoadMore: fetchNextPage,
  });
  const providers = data?.pages.flatMap((page) => page.data) ?? [];

  const handleSelect = (provider: any) => {
    navigate(appModalRoutes.provider.provider, {
      providerCode: provider.handle,
    });
  };

  return (
    <RailLayout>
      <RailLayoutSide>
        <Content>
          <ContentHeader>
            <GoBack />
            <Heading>Select Connection Provider</Heading>
            <Text tone="subtle">
              Choose a connection provider to add to your team.
            </Text>
          </ContentHeader>
          <ContentBody />
          <ContentFooter>
            <Button
              onClick={() => navigate(appModalRoutes.providers.create)}
              className="w-full"
              variant="primary"
              align="start"
            >
              <Plus size={16} /> Create Provider
            </Button>
          </ContentFooter>
        </Content>
      </RailLayoutSide>

      <RailLayoutMain>
        <Content>
          <ContentHeader>
            <Input
              prefix={<Search className="h-4 w-4 text-neutral-content-muted" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search integrations (e.g., Slack, GitHub...)"
              className="w-full"
              autoFocus
            />
          </ContentHeader>

          <ContentBody
            paddingX={false}
            paddingY={false}
            className="overflow-hidden"
          >
            <Switch>
              <Case condition={!providers.length}>
                <EmptyView
                  message={`No matching connection providers found.`}
                />
              </Case>
              <Default>
                <ScrollArea>
                  <div className="px-6 grid grid-cols-2 gap-4">
                    {providers.map((provider) => (
                      <ProviderCard
                        key={provider.id}
                        provider={provider}
                        onSelect={handleSelect}
                      />
                    ))}

                    <div
                      ref={sentinelRef}
                      className="flex justify-center h-6 col-span-2"
                    />

                    {isFetching && (
                      <div className="flex justify-center p-6 col-span-2">
                        <Spinner className="text-neutral-content-muted" />
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </Default>
            </Switch>
          </ContentBody>
        </Content>
      </RailLayoutMain>
    </RailLayout>
  );
};

interface ProviderCardProps {
  provider: vertexClient.ConnectionProvider;
  onSelect: (provider: any) => void;
}

const ProviderCard: FC<ProviderCardProps> = ({ provider, onSelect }) => {
  return (
    <Card
      variant="surface-interactive"
      onClick={() => onSelect(provider)}
      className="flex flex-col items-start text-left"
    >
      <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-background text-neutral-content-muted group-hover:text-neutral-content transition-all mb-3">
        <Globe className="h-5 w-5" />
      </div>
      <h4 className="text-sm font-bold text-neutral-content group-hover:text-foreground transition-colors mb-1">
        {provider.name || provider.handle}
      </h4>
      <p className="text-xs text-neutral-content-muted line-clamp-2">
        {provider.description ||
          `Integrate ${provider.name || provider.handle} services with your team.`}
      </p>
    </Card>
  );
};
