import { Text } from "@ubento/workspace.primitives";
import { Terminal } from "lucide-react";
import { AboutSection, ActionsSection, EntitiesSection, QueriesSection } from "./sections";

interface DetailsBodyProps {
  serviceId: string;
  activeChannelId: string | null;
  setActiveChannelId: (id: string) => void;
  isLoadingSpec: boolean;
  specData: any;
  service: any;
}

export function DetailsBody({
  serviceId,
  activeChannelId,
  setActiveChannelId,
  isLoadingSpec,
  specData,
  service,
}: DetailsBodyProps) {
  return (
    <>

      {isLoadingSpec ? (
        <div className="flex items-center gap-2 text-neutral-content-muted">
          <div className="w-4 h-4 border-2 border-neutral-border border-t-accent rounded-full animate-spin" />
          <p className="text-[13px]">Loading specification...</p>
        </div>
      ) : (
        <div className="space-y-8">
          <AboutSection description={specData?.description || service.description} />

          {specData?.entities && Object.keys(specData.entities).length > 0 && (
            <EntitiesSection entities={specData.entities} />
          )}

          {specData?.queries && Object.keys(specData.queries).length > 0 && (
            <QueriesSection queries={specData.queries} />
          )}

          {specData?.actions && Object.keys(specData.actions).length > 0 && (
            <ActionsSection actions={specData.actions} />
          )}

          {!specData && !isLoadingSpec && (
            <div className="flex flex-col items-center justify-center py-12 bg-neutral-surface/10 rounded-2xl border border-neutral-border/20">
              <Terminal size={32} className="text-neutral-content-muted mb-4" />
              <Text tone="muted" className="text-[13px]">
                No specification details available for this channel.
              </Text>
            </div>
          )}
        </div>
      )}
    </>
  );
}
