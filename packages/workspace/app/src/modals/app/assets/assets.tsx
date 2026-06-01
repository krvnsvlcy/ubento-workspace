import { useWorkspaceEngine } from "@/contexts/workspace";
import { useUbentoEngine } from "@/hooks/app-engine";
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
  FolderOpen,
  ArrowLeft,
} from "lucide-react";
import React, { FC, useState } from "react";
import { Case, Default, Switch } from "react-if";
import { GoBack } from "../go-back.js";

const CATEGORIES = [
  { id: "all", name: "All Assets", icon: LayoutGrid, types: ["component", "module"] },
  { id: "components", name: "Components", icon: Component, types: ["component"] },
  { id: "modules", name: "Modules", icon: Box, types: ["module"] },
  { id: "collections", name: "Collections", icon: FolderOpen, types: [] },
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

interface CollectionCardProps {
  collection: any;
  onClick: () => void;
}

const CollectionCard: FC<CollectionCardProps> = ({ collection, onClick }) => {
  return (
    <Card
      variant="surface-interactive"
      onClick={onClick}
      className="flex flex-col overflow-hidden text-left p-0 border border-border/40 hover:border-border-hover transition-all duration-200 group"
    >
      <div className="relative h-24 w-full bg-surface-hover/30 border-b border-border/20 overflow-hidden flex items-center justify-center">
        {collection.cover_url ? (
          <img
            src={collection.cover_url}
            alt={collection.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/15 via-primary/5 to-surface-hover flex items-center justify-center">
            <FolderOpen className="h-7 w-7 text-content-muted group-hover:text-primary transition-colors duration-300" />
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-content group-hover:text-primary transition-colors line-clamp-1">
            {collection.name}
          </h4>
          {collection.summary && (
            <p className="text-xs text-content-muted line-clamp-2 leading-normal">
              {collection.summary}
            </p>
          )}
        </div>
        <div className="mt-3 pt-2.5 border-t border-border/10 flex items-center justify-between">
          <span className="text-[10px] text-content-subtle font-bold">
            {collection.module_ids?.length || 0} Modules
          </span>
        </div>
      </div>
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
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("public");
  const [selectedCollection, setSelectedCollection] = useState<any | null>(null);

  const assetTabs = [
    { key: "public", label: "Public" },
    { key: "private", label: "Private" },
  ];

  const category = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setSelectedCollection(null);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSelectedCollection(null);
  };

  // 1. Fetch modules (either all public or all team modules)
  const modulesParams = activeTab === "private"
    ? { team_id: session?.teamId || "", scope: "private" as const }
    : { scope: "public" as const };

  const { data: allModulesData, isLoading: isLoadingModules } = ubento.module.useModules(
    modulesParams,
    { enabled: activeCategory !== "collections" || !!selectedCollection }
  );

  const allModules = allModulesData ?? [];

  // 2. Fetch collections if selected
  const collectionsParams = activeTab === "private"
    ? { team_id: session?.teamId || "", scope: "private" as const }
    : { scope: "public" as const };

  const { data: allCollectionsData, isLoading: isLoadingCollections } = ubento.module.useModuleCollections(
    collectionsParams,
    { enabled: activeCategory === "collections" }
  );

  const allCollections = allCollectionsData ?? [];

  // Filter modules based on category, collection selection, and search query
  const filteredModules = allModules.filter((mod: any) => {
    // Category type check
    if (activeCategory !== "collections" && !category.types.includes(mod.type)) {
      return false;
    }
    // Collection selection check
    if (activeCategory === "collections" && selectedCollection) {
      if (!(selectedCollection.module_ids || []).includes(mod.id)) {
        return false;
      }
    }
    // Search query check
    const term = query.toLowerCase().trim();
    if (term) {
      return (
        (mod.name || "").toLowerCase().includes(term) ||
        (mod.summary || "").toLowerCase().includes(term) ||
        (mod.type || "").toLowerCase().includes(term)
      );
    }
    return true;
  });

  // Filter collections based on search query
  const filteredCollections = allCollections.filter((col: any) => {
    const term = query.toLowerCase().trim();
    if (term) {
      return (
        (col.name || "").toLowerCase().includes(term) ||
        (col.summary || "").toLowerCase().includes(term)
      );
    }
    return true;
  });

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

  const showCollections = activeCategory === "collections" && !selectedCollection;
  const isLoading = showCollections ? isLoadingCollections : isLoadingModules;

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
                    onClick={() => handleCategoryChange(cat.id)}
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
          <ContentHeader className="space-y-4 shrink-0">
            <Input
              prefix={<Search className="h-4 w-4 text-content-muted" />}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                showCollections
                  ? "Search collections..."
                  : "Search components and modules..."
              }
              className="w-full"
              autoFocus
            />
            <TabSwitch
              options={assetTabs}
              value={activeTab}
              onChange={handleTabChange}
            />
          </ContentHeader>

          {/* Selected Collection Breadcrumb Bar */}
          {activeCategory === "collections" && selectedCollection && (
            <div className="px-6 py-2.5 flex items-center gap-2 border-b border-border/10 bg-surface/10 shrink-0 select-none">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedCollection(null)}
                className="p-1 h-auto"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <span className="text-[10px] uppercase font-black tracking-widest text-content-muted">
                Collections
              </span>
              <span className="text-xs text-content-muted">/</span>
              <span className="text-xs font-bold text-content">
                {selectedCollection.name}
              </span>
            </div>
          )}

          <ContentBody
            paddingX={false}
            paddingY={false}
            className="overflow-hidden flex-1 flex flex-col"
          >
            <Switch>
              <Case condition={isLoading}>
                <div className="flex justify-center p-12 flex-1 items-center">
                  <Spinner className="text-content-muted" />
                </div>
              </Case>

              <Case condition={showCollections ? !filteredCollections.length : !filteredModules.length}>
                <div className="flex-1 flex items-center justify-center p-12">
                  <EmptyView message={showCollections ? "No matching collections found." : "No matching assets found."} />
                </div>
              </Case>

              <Default>
                <ScrollArea className="flex-1">
                  <div className="px-6 grid grid-cols-2 gap-4 pb-6 mt-4">
                    {showCollections ? (
                      /* COLLECTIONS GRID */
                      filteredCollections.map((col: any) => (
                        <CollectionCard
                          key={col.id}
                          collection={col}
                          onClick={() => setSelectedCollection(col)}
                        />
                      ))
                    ) : (
                      /* MODULES GRID */
                      filteredModules.map((mod: any) => {
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
                      })
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
