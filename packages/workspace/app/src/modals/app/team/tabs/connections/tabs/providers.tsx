import { useSession } from "@/contexts/session";
import { useUbento } from "@/hooks/app-engine";
import { useAppModal } from "@/modals/app/hook";
import { appModalRoutes } from "@/modals/app/routes";
import { Badge, Button, Input, ScrollArea } from "@ubento/bento.arlo-core";
import { Globe, Plus } from "lucide-react";
import { FC, useState } from "react";

export const ProvidersTab: FC = () => {
  const ubento = useUbento();
  const session = useSession();
  const { push: navigate } = useAppModal();
  const [providerSearch, setProviderSearch] = useState("");

  const { data: allProvidersData, isFetching: isFetchingAllProviders } =
    ubento.vertex.useConnectionProviders({
      name: providerSearch,
      team_id: session.teamId,
    });
  const allProviders =
    allProvidersData?.pages.flatMap((page) => page.data) ?? [];

  const handleCreateProvider = () => {
    navigate(appModalRoutes.providers.create);
  };

  return (
    <section className="flex flex-col h-full gap-6">
      <div className="flex justify-between items-center gap-4 px-6">
        <div className="relative flex-1">
          <Input
            type="text"
            value={providerSearch}
            onChange={(e) => setProviderSearch(e.target.value)}
            placeholder="Search providers..."
          />
        </div>
        <Button onClick={handleCreateProvider} size="lg">
          <Plus className="h-3 w-3" />
          Create Provider
        </Button>
      </div>

      <ScrollArea className="flex-1 px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isFetchingAllProviders && (
            <div className="col-span-full py-12 text-center text-content-muted">
              <p className="text-[13px]">Loading providers...</p>
            </div>
          )}
          {!isFetchingAllProviders && allProviders.length === 0 && (
            <div className="col-span-full py-12 text-center text-content-muted">
              <p className="text-[13px]">
                {providerSearch
                  ? "No providers match search query."
                  : "No providers found."}
              </p>
            </div>
          )}
          {allProviders.map((p: any) => {
            const supportedAuth: string[] = [];
            if (p.config?.auth?.apiKey) supportedAuth.push("API Key");
            if (p.config?.auth?.basic) supportedAuth.push("Basic");
            if (p.config?.auth?.oauth2) supportedAuth.push("OAuth 2.0");

            return (
              <button
                key={p.id}
                onClick={() =>
                  navigate(appModalRoutes.provider.provider, {
                    providerCode: p.handle,
                  })
                }
                className="flex flex-col text-left items-start p-5 rounded-2xl bg-surface border border-border hover:border-border-hover hover:bg-surface-hover/30 hover:shadow-lg transition-all group duration-200 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-surface-hover text-content-muted group-hover:text-content transition-all">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div className="flex gap-1.5 flex-wrap justify-end">
                    {supportedAuth.map((auth) => (
                      <Badge
                        key={auth}
                        variant="outline"
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-md"
                      >
                        {auth}
                      </Badge>
                    ))}
                  </div>
                </div>
                <h4 className="text-sm font-bold text-content group-hover:text-foreground transition-colors mb-1">
                  {p.name || p.id}
                </h4>
                <p className="text-xs text-content-muted line-clamp-2">
                  {p.description ||
                    `Integration provider for ${p.name || p.id}.`}
                </p>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </section>
  );
};
