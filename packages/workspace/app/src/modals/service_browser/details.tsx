import { useUbento } from "@/engine/engine";
import {
  Content,
  ContentBody,
  ContentHeader,
  Heading,
  Text,
} from "@ubento/workspace.primitives";
import { ArrowLeft, Server, Sparkles } from "lucide-react";

export function ServiceDetails({
  serviceId,
  isInstalled,
  onBack,
  onInstall,
}: {
  serviceId: string;
  isInstalled: boolean;
  onBack: () => void;
  onInstall: (id: string, name: string) => void;
}) {
  const ubento = useUbento();
  const { data: service, isLoading } = ubento.module.useModule(serviceId);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] gap-4 text-neutral-content-muted">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        <p className="text-[13px]">Loading service details...</p>
      </div>
    );
  }

  if (!service) return null;

  return (
    <Content>
      <ContentHeader>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-neutral-content-muted hover:text-neutral-content transition-colors text-[13px] font-medium mb-4 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          Back to marketplace
        </button>
        <div className="flex items-center gap-6">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[24px] bg-neutral-surface border border-neutral-border text-neutral-content shadow-sm">
            <Server size={40} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <Heading>{service.name}</Heading>
              {isInstalled && (
                <div className="px-2.5 py-1 rounded-full bg-success/10 border border-success/20 text-success text-[10px] font-bold uppercase tracking-wider">
                  Installed
                </div>
              )}
            </div>
            <Text tone="subtle">
              {service.summary || "Powerful integration for your workspace."}
            </Text>
          </div>
          {!isInstalled && (
            <button
              onClick={() => onInstall(service.id, service.name)}
              className="px-6 py-2.5 rounded-xl bg-accent text-accent-content text-[14px] font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-accent/20"
            >
              Install <Sparkles size={16} />
            </button>
          )}
        </div>
      </ContentHeader>
      <ContentBody>
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-8">
            <section>
              <h3 className="text-[16px] font-bold text-neutral-content mb-3">
                About this service
              </h3>
              <p className="text-[14px] text-neutral-content-muted leading-relaxed">
                {service.summary}
              </p>
            </section>

            <section>
              <h3 className="text-[16px] font-bold text-neutral-content mb-3">
                Key Features
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Real-time data synchronization",
                  "Advanced automation workflows",
                  "Deep integration with workspace",
                  "Secure and private by design",
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-surface/50 border border-neutral-border/50 text-[13px] text-neutral-content"
                  >
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    {feature}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-neutral-surface/30 border border-neutral-border/50">
              <h4 className="text-[13px] font-bold text-neutral-content uppercase tracking-wider mb-4">
                Details
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="text-[11px] text-neutral-content-muted uppercase font-bold mb-1">
                    Developer
                  </div>
                  <div className="text-[13px] text-neutral-content font-medium">
                    Ubento Team
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-neutral-content-muted uppercase font-bold mb-1">
                    Version
                  </div>
                  <div className="text-[13px] text-neutral-content font-medium">
                    1.0.0
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-neutral-content-muted uppercase font-bold mb-1">
                    Last Updated
                  </div>
                  <div className="text-[13px] text-neutral-content font-medium">
                    Today
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentBody>
    </Content>
  );
}
