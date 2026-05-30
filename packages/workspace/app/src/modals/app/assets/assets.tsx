import { useWorkspaceEngine } from "@/contexts/workspace";
import { useUbentoEngine } from "@/hooks/app-engine";
import { useDebounce } from "@/hooks/use-debouce.js";
import { useAppModal } from "@/modals/app/hook.js";
import {
  Button,
  Card,
  Content,
  ContentBody,
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
import {
  Box,
  LayoutGrid,
  Search,
  Component,
} from "lucide-react";
import React, { FC, useState } from "react";
import { Case, Default, Switch } from "react-if";
import { GoBack } from "../go-back.js";

const CATEGORIES = [
  { id: "all", name: "All Assets", icon: LayoutGrid, types: ["component", "module"] },
  { id: "components", name: "Components", icon: Component, types: ["component"] },
  { id: "modules", name: "Modules", icon: Box, types: ["module"] },
];

interface AssetCardProps {
  module: any;
  isInstalled: boolean;
  onInstall: (module: any) => void;
}

const AssetCard: FC<AssetCardProps> = ({
  module,
  isInstalled,
  onInstall,
}) => {
  const Icon = module.type === "component" ? Component : Box;
  return (
    <Card
      variant="surface-interactive"
      onClick={() => {
        if (!isInstalled) {
          onInstall(module);
        }
      }}
      className={`flex flex-col items-start text-left ${isInstalled ? "opacity-50 cursor-default" : ""}`}
    >
      <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-background text-content-muted mb-3 overflow-hidden">
        <Icon className="h-5 w-5" />
      </div>
      <div className="w-full flex items-center justify-between gap-2 mb-1">
        <h4 className="text-sm font-bold text-content group-hover:text-foreground transition-colors truncate">
          {module.name}
        </h4>
        {isInstalled && (
          <span className="px-2 py-0.5 rounded-full bg-base/10 border border-border/20 text-base text-[9px] font-bold uppercase tracking-wider shrink-0">
            Installed
          </span>
        )}
      </div>
      <p className="text-xs text-content-muted line-clamp-2">
        {module.summary || `A ${module.type} asset.`}
      </p>
    </Card>
  );
};

export const AssetsBrowserModal: FC = () => {
  const engine = useUbentoEngine();
  const ubento = engine.ubento;
  const session = engine.useState((s) => s.session);
  const activeWorkspaceEngine = useWorkspaceEngine();

  const specData = activeWorkspaceEngine?.useState((s) => (s.workspace as any)?.spec?.data) || {};
  const installedComponents = specData.components || {};
  const installedModules = specData.modules || {};

  const [query, setQuery] = useState("");
  const debouncedSearch = useDebounce(query, 500);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("public");

  const assetTabs = [
    { key: "public", label: "Public" },
    { key: "private", label: "Private" },
  ];

  const category = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];

  const searchParams = {
    query: debouncedSearch,
    types: category.types,
    scope: activeTab === "private" ? "private" as const : "public" as const,
  };

  const { data: searchResults, isLoading } = ubento.module.useSearchModules(searchParams);

  const modules = searchResults?.data?.data || [];

  const handleInstall = (mod: any) => {
    const defaultName = mod.name;
    const name = prompt(`Enter local name for the ${mod.type}:`, defaultName);
    if (!name) return;

    const trimmed = name.trim();
    if (!trimmed) return;

    const isComponent = mod.type === "component";
    const recordName = isComponent ? "components" : "modules";

    const currentRecord = {
      ...(isComponent ? installedComponents : installedModules)
    };

    if (currentRecord[trimmed]) {
      alert(`An asset named "${trimmed}" is already installed.`);
      return;
    }

    currentRecord[trimmed] = {
      id: mod.id,
      versionId: mod.latest_version_id,
    };

    activeWorkspaceEngine.updateWorkspaceSpec({
      spec: {
        [recordName]: currentRecord
      }
    });
  };

  return (
    <RailLayout>
      <RailLayoutSide>
        <Content>
          <ContentHeader>
            <GoBack />
            <Heading>Select Asset</Heading>
            <Text shade="subtle">Add components or modules to your workspace.</Text>
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
        </Content>
      </RailLayoutSide>
      <RailLayoutMain>
        <Content>
          <ContentHeader className="space-y-4">
            <Input
              prefix={<Search className="h-4 w-4 text-content-muted" />}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for components and modules..."
              className="w-full"
              autoFocus
            />
            <TabSwitch
              options={assetTabs}
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
              <Case condition={isLoading && !modules.length}>
                <div className="flex justify-center p-12">
                  <Spinner className="text-content-muted" />
                </div>
              </Case>
              <Case condition={!modules.length}>
                <EmptyView message="No matching assets found." />
              </Case>
              <Default>
                <ScrollArea>
                  <div className="px-6 grid grid-cols-2 gap-4 pb-6">
                    {modules.map((mod: any) => {
                      const isInstalled = mod.type === "component"
                        ? Object.values(installedComponents).some((ref: any) => ref.id === mod.id)
                        : Object.values(installedModules).some((ref: any) => ref.id === mod.id);
                      return (
                        <AssetCard
                          key={mod.id}
                          module={mod}
                          isInstalled={isInstalled}
                          onInstall={handleInstall}
                        />
                      );
                    })}
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
