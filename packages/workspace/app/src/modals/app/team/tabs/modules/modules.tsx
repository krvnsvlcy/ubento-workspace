import { useSession } from "@/contexts/session";
import { useUbento } from "@/hooks/app-engine";
import { useAppModal } from "@/modals/app/hook.js";
import { appModalRoutes, routeMatch } from "@/modals/app/routes.js";
import { useModal } from "@/utils/modal-store.js";
import {
  Button,
  Content,
  ContentBody,
  ContentHeader,
  Heading,
  Input,
  ScrollArea,
  TabSwitch,
  TabSwitchOption,
  Text,
} from "@ubento/bento.arlo-core";
import { Box, FolderOpen, Globe, Lock, Plus, Settings } from "lucide-react";
import React, { FC, useState } from "react";
import { Case, Switch } from "react-if";
import { CreateCollectionModal, CreateCollectionPage } from "./create-collection-modal.js";
import { CollectionDetailsModal, CollectionDetailsPage } from "./collection-details-modal.js";

type SubTab = "modules" | "collections";

export const TeamModulesTab: FC = () => {
  const session = useSession();
  const teamId = session.teamId;
  const { path } = useAppModal();

  const tabOptions: TabSwitchOption<SubTab>[] = [
    { key: "modules", label: "Modules" },
    { key: "collections", label: "Collections" },
  ];

  const [subTab, setSubTab] = useState<SubTab>("modules");

  return (
    <Switch>
      <Case condition={routeMatch(path, appModalRoutes.team.createCollection)}>
        <CreateCollectionPage />
      </Case>
      <Case condition={routeMatch(path, appModalRoutes.team.collectionDetails)}>
        <CollectionDetailsPage />
      </Case>
      <Case condition={true}>
        <Content>
          <ContentHeader className="space-y-4 shrink-0">
            <div className="space-y-1">
              <Heading>Modules & Collections</Heading>
              <Text shade="subtle">Manage team-level modules and group them into collections.</Text>
            </div>
            <TabSwitch
              options={tabOptions}
              value={subTab}
              onChange={setSubTab}
            />
          </ContentHeader>
          <ContentBody
            paddingY={false}
            paddingX={false}
            className="overflow-hidden flex-1 flex flex-col"
          >
            <Switch>
              <Case condition={subTab === "modules"}>
                <ModulesTabContent teamId={teamId} />
              </Case>

              <Case condition={subTab === "collections"}>
                <CollectionsTabContent teamId={teamId} />
              </Case>
            </Switch>
          </ContentBody>
        </Content>
      </Case>
    </Switch>
  );
};

/* ============================================================================
 * MODULES TAB VIEW
 * ============================================================================ */
interface ModulesTabContentProps {
  teamId: string;
}

const ModulesTabContent: FC<ModulesTabContentProps> = ({ teamId }) => {
  const ubento = useUbento();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: modules, isFetching } = ubento.module.useModules({
    team_id: teamId,
  });

  const allModules = modules ?? [];

  const filteredModules = allModules.filter((mod: any) => {
    const term = searchQuery.toLowerCase();
    return (
      (mod.name || "").toLowerCase().includes(term) ||
      (mod.summary || "").toLowerCase().includes(term) ||
      (mod.type || "").toLowerCase().includes(term)
    );
  });

  return (
    <section className="flex flex-col h-full gap-6 flex-1 min-h-0">
      <div className="px-6 shrink-0">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search team modules..."
        />
      </div>

      <ScrollArea className="flex-1 px-6 pb-6">
        <div className="space-y-3">
          {isFetching && allModules.length === 0 && (
            <div className="py-12 text-center text-content-muted">
              <p className="text-[13px]">Loading modules...</p>
            </div>
          )}
          {!isFetching && filteredModules.length === 0 && (
            <div className="py-12 text-center text-content-muted">
              <p className="text-[13px]">
                {searchQuery ? "No modules match search query." : "No team modules created yet."}
              </p>
            </div>
          )}

          {filteredModules.map((mod: any) => (
            <div
              key={mod.id}
              className="flex items-center justify-between p-4 rounded-2xl bg-surface border border-border group hover:border-border-hover transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-surface-hover text-content-muted">
                  <Box className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold">{mod.name}</p>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-surface-hover border border-border/40 text-content-muted capitalize">
                      {mod.type || "module"}
                    </span>
                  </div>
                  {mod.summary && (
                    <p className="text-xs text-content-muted mt-0.5 max-w-md truncate">
                      {mod.summary}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {mod.scope === "private" ? (
                  <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-content-subtle bg-surface-hover/50 px-2 py-1 rounded-lg">
                    <Lock className="h-3 w-3" /> Private
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-lg">
                    <Globe className="h-3 w-3" /> Public
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
};

/* ============================================================================
 * COLLECTIONS TAB VIEW
 * ============================================================================ */
interface CollectionsTabContentProps {
  teamId: string;
}

const CollectionsTabContent: FC<CollectionsTabContentProps> = ({ teamId }) => {
  const ubento = useUbento();
  const { push } = useAppModal();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: collections,
    isFetching,
    refetch,
  } = ubento.module.useModuleCollections({
    team_id: teamId,
  });

  const allCollections = collections ?? [];

  const filteredCollections = allCollections.filter((col: any) => {
    const term = searchQuery.toLowerCase();
    return (
      (col.name || "").toLowerCase().includes(term) ||
      (col.summary || "").toLowerCase().includes(term)
    );
  });

  const handleCreateClick = () => {
    push(appModalRoutes.team.createCollection);
  };

  const handleCollectionClick = (collectionId: string) => {
    push(appModalRoutes.team.collectionDetails, { collectionId });
  };

  return (
    <section className="flex flex-col h-full gap-6 flex-1 min-h-0">
      <div className="flex justify-between items-center gap-4 px-6 shrink-0">
        <div className="flex-1">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search collections..."
          />
        </div>
        <Button
          onClick={handleCreateClick}
          align="start"
          variant="primary"
          size="lg"
        >
          <Plus className="h-4 w-4" />
          Create Collection
        </Button>
      </div>

      <ScrollArea className="flex-1 px-6 pb-6">
        {isFetching && allCollections.length === 0 && (
          <div className="py-12 text-center text-content-muted">
            <p className="text-[13px]">Loading collections...</p>
          </div>
        )}
        {!isFetching && filteredCollections.length === 0 && (
          <div className="py-12 text-center text-content-muted">
            <p className="text-[13px]">
              {searchQuery ? "No collections match search query." : "No collections created yet."}
            </p>
          </div>
        )}

        {/* Collection grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredCollections.map((col: any) => (
            <div
              key={col.id}
              onClick={() => handleCollectionClick(col.id)}
              className="flex flex-col rounded-2xl bg-surface border border-border overflow-hidden cursor-pointer hover:border-border-hover transition-all duration-200 group"
            >
              {/* Cover Thumbnail */}
              <div className="relative h-32 w-full bg-surface-hover/30 border-b border-border/30 overflow-hidden flex items-center justify-center shrink-0">
                {(col as any).cover_url ? (
                  <img
                    src={(col as any).cover_url}
                    alt={col.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 via-primary/5 to-surface-hover flex items-center justify-center">
                    <FolderOpen className="h-10 w-10 text-content-muted group-hover:text-primary transition-colors duration-300" />
                  </div>
                )}
                <div className="absolute top-3 right-3 shrink-0">
                  {col.scope === "private" ? (
                    <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-content-subtle bg-background/80 backdrop-blur px-2 py-0.5 rounded-full border border-border/20">
                      <Lock className="h-2.5 w-2.5" /> Private
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-primary bg-background/80 backdrop-blur px-2 py-0.5 rounded-full border border-primary/20">
                      <Globe className="h-2.5 w-2.5" /> Public
                    </span>
                  )}
                </div>
              </div>

              {/* Text content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-bold leading-snug group-hover:text-primary transition-colors">
                    {col.name}
                  </p>
                  {col.summary && (
                    <p className="text-xs text-content-muted line-clamp-2 leading-relaxed">
                      {col.summary}
                    </p>
                  )}
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-border/20">
                  <span className="text-[10px] text-content-muted font-bold">
                    {col.module_ids?.length || 0} Associated Modules
                  </span>
                  <Settings className="h-3.5 w-3.5 text-content-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
};
