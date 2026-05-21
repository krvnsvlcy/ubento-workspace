import { useWorkspaceEngine } from "@/contexts/workspace";
import { useUbento } from "@/engine/app/engine";
import { useDebounce } from "@/hooks/use-debouce.js";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll.js";
import { useAppModal } from "@/modals/app/hook.js";
import { appModalRoutes } from "@/modals/app/routes.js";
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
import {
  Cloud,
  CreditCard,
  GitBranch,
  Key,
  LayoutGrid,
  MessageSquare,
  Plus,
  Search,
  Server,
  Share2,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { FC, useState } from "react";
import { Case, Default, Switch } from "react-if";
import { GoBack } from "../go-back.js";

const CATEGORIES = [
  { id: "all", name: "All Services", icon: LayoutGrid },
  { id: "category:ai", name: "AI", icon: Sparkles },
  { id: "category:infrastructure", name: "Infrastructure", icon: Cloud }, // Swapped from Cpu
  { id: "category:devops", name: "DevOps", icon: GitBranch }, // Swapped from Wrench
  { id: "category:iam", name: "IAM", icon: Key }, // Swapped from Server
  { id: "category:communication", name: "Communication", icon: MessageSquare }, // Swapped from Code2
  { id: "category:productivity", name: "Productivity", icon: Target }, // Swapped from Briefcase
  { id: "category:crm", name: "CRM", icon: Users }, // Swapped from Briefcase
  { id: "category:finance", name: "Finance", icon: CreditCard }, // Swapped from Briefcase
  { id: "category:social", name: "Social", icon: Share2 }, // Swapped from Sparkles
].sort((a, b) => a.id.localeCompare(b.id));

interface ServiceCardProps {
  service: vertexClient.Service;
  isInstalled: boolean;
  onSelect: (id: string) => void;
}

const ServiceCard: FC<ServiceCardProps> = ({
  service,
  isInstalled,
  onSelect,
}) => {
  return (
    <Card
      variant="surface-interactive"
      onClick={() => onSelect(service.id)}
      className={`flex flex-col items-start text-left ${isInstalled ? "opacity-50" : ""}`}
    >
      <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-background text-neutral-content-muted group-hover:text-neutral-content transition-all mb-3 overflow-hidden">
        <Switch>
          <Case condition={!!service.image_url}>
            <img
              src={service.image_url!}
              alt={service.display_name}
              className="w-full h-full object-cover"
            />
          </Case>
          <Default>
            <Server className="h-5 w-5" />
          </Default>
        </Switch>
      </div>
      <div className="w-full flex items-center justify-between gap-2 mb-1">
        <h4 className="text-sm font-bold text-neutral-content group-hover:text-foreground transition-colors truncate">
          {service.display_name}
        </h4>
        {isInstalled && (
          <span className="px-2 py-0.5 rounded-full bg-success/10 border border-success/20 text-success text-[9px] font-bold uppercase tracking-wider shrink-0">
            Installed
          </span>
        )}
      </div>
      <p className="text-xs text-neutral-content-muted line-clamp-2">
        {service.description}
      </p>
    </Card>
  );
};

export const ServiceBrowser: FC = () => {
  const ubento = useUbento();
  const { push } = useAppModal();
  const activeWorkspaceEngine = useWorkspaceEngine();

  const installedServices =
    activeWorkspaceEngine?.useState(
      (s) => (s.workspace as any)?.services || {},
    ) || {};

  const [query, setQuery] = useState("");
  const debouncedSearch = useDebounce(query, 500);
  const [activeCategory, setActiveCategory] = useState("all");

  const { data, fetchNextPage, hasNextPage, isFetching } =
    ubento.vertex.useInfiniteServices({
      name: debouncedSearch,
      tags: activeCategory === "all" ? undefined : [activeCategory],
    });

  const sentinelRef = useInfiniteScroll({
    hasNextPage: !!hasNextPage,
    isFetching,
    onLoadMore: fetchNextPage,
  });

  const services = data?.pages.flatMap((page) => page.data) ?? [];

  const onSelectService = (id: string) => {
    push(appModalRoutes.services.service, { serviceId: id });
  };

  return (
    <RailLayout>
      <RailLayoutSide>
        <Content>
          <ContentHeader>
            <GoBack />
            <Heading>Select Service</Heading>
            <Text tone="subtle">Add services to your workspace.</Text>
          </ContentHeader>
          <ContentBody>
            <div className="flex flex-col gap-2">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <Button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    variant={isActive ? "primary" : "ghost"}
                    align="start"
                  >
                    <Icon size={16} />
                    {cat.name}
                  </Button>
                );
              })}
            </div>
          </ContentBody>
          <ContentFooter className="border-t border-neutral-border/30 pt-3">
            <Button
              onClick={() => push(appModalRoutes.services.create)}
              className="w-full"
              variant="primary"
              align="start"
            >
              <Plus size={16} /> Create Service
            </Button>
          </ContentFooter>
        </Content>
      </RailLayoutSide>
      <RailLayoutMain>
        <Content>
          <ContentHeader>
            <Input
              prefix={<Search className="h-4 w-4 text-neutral-content-muted" />}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for services, integrations, and tools..."
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
              <Case condition={isFetching && !services.length}>
                <div className="flex justify-center p-12">
                  <Spinner className="text-neutral-content-muted" />
                </div>
              </Case>
              <Case condition={!services.length}>
                <EmptyView message="No matching services found." />
              </Case>
              <Default>
                <ScrollArea>
                  <div className="px-6 grid grid-cols-2 gap-4 pb-6">
                    {services.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        isInstalled={!!installedServices[service.id]}
                        onSelect={onSelectService}
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
