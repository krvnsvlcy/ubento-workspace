import { useWorkspaceEngine } from "@/contexts/workspace";
import { useUbentoEngine } from "@/hooks/app-engine";
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
  TabSwitch,
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
import { FC, useState, useRef, useEffect } from "react";
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
      <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-background text-content-muted group-hover:text-content transition-all mb-3 overflow-hidden">
        <Switch>
          <Case condition={!!service.image_url}>
            <img
              src={service.image_url!}
              alt={service.name}
              className="w-full h-full object-cover"
            />
          </Case>
          <Default>
            <Server className="h-5 w-5" />
          </Default>
        </Switch>
      </div>
      <div className="w-full flex items-center justify-between gap-2 mb-1">
        <h4 className="text-sm font-bold text-content group-hover:text-foreground transition-colors truncate">
          {service.name}
        </h4>
        {isInstalled && (
          <span className="px-2 py-0.5 rounded-full bg-base/10 border border-border/20 text-base text-[9px] font-bold uppercase tracking-wider shrink-0">
            Installed
          </span>
        )}
      </div>
      <p className="text-xs text-content-muted line-clamp-2">
        {service.description}
      </p>
    </Card>
  );
};

export const ServiceBrowser: FC = () => {
  const engine = useUbentoEngine();
  const ubento = engine.ubento;
  const session = engine.useState((s) => s.session);
  const { push } = useAppModal();
  const activeWorkspaceEngine = useWorkspaceEngine();

  const installedServices =
    activeWorkspaceEngine?.useState(
      (s) => (s.workspace as any)?.services || {},
    ) || {};

  const [query, setQuery] = useState("");
  const debouncedSearch = useDebounce(query, 500);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("public");

  const [showCreateDropdown, setShowCreateDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowCreateDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const serviceTabs = [
    { key: "public", label: "Public" },
    { key: "private", label: "Private" },
  ];

  const { data, fetchNextPage, hasNextPage, isFetching } =
    ubento.vertex.useInfiniteServices({
      name: debouncedSearch,
      tags: activeCategory === "all" ? undefined : [activeCategory],
      scope: activeTab === "private" ? session.teamId : "public",
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
            <Heading level="h4">Select Service</Heading>
            <Text shade="subtle">Add services to your workspace.</Text>
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
          <ContentFooter className="border-t border-border/30 pt-3">
            <div className="relative w-full" ref={dropdownRef}>
              {showCreateDropdown && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-background border border-border/30 rounded-xl shadow-xl p-1 z-50 flex flex-col gap-1">
                  <Button
                    onClick={() => {
                      setShowCreateDropdown(false);
                      push(appModalRoutes.services.createHttp);
                    }}
                    variant="ghost"
                    align="start"
                    className="w-full text-xs font-semibold py-2 px-3 justify-start"
                  >
                    <Server size={14} className="mr-2" /> HTTP Service
                  </Button>
                  <Button
                    onClick={() => {
                      setShowCreateDropdown(false);
                      push(appModalRoutes.services.createMongo);
                    }}
                    variant="ghost"
                    align="start"
                    className="w-full text-xs font-semibold py-2 px-3 justify-start"
                  >
                    <Server size={14} className="mr-2" /> MongoDB Service
                  </Button>
                </div>
              )}
              <Button
                onClick={() => setShowCreateDropdown(!showCreateDropdown)}
                className="w-full"
                variant="primary"
              >
                <Plus size={16} /> Create Service
              </Button>
            </div>
          </ContentFooter>
        </Content>
      </RailLayoutSide>
      <RailLayoutMain>
        <Content>
          <ContentHeader className="space-y-4">
            <Input
              prefix={<Search className="h-4 w-4 text-content-muted" />}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for services, integrations, and tools..."
              className="w-full"
              autoFocus
            />
            <TabSwitch
              options={serviceTabs}
              value={activeTab}
              onChange={setActiveTab}
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
                  <Spinner className="text-content-muted" />
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
                        <Spinner className="text-content-muted" />
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
