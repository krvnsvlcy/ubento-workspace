import { Card, Heading, Text } from "@ubento/workspace.primitives";
import { Boxes, Database, FileCode, Search, Zap } from "lucide-react";

export function AboutSection({ description }: { description?: string }) {
  return (
    <section className="bg-neutral-surface/10 p-6 rounded-2xl border border-neutral-border/20 backdrop-blur-sm hover:bg-neutral-surface/20 transition-colors">
      <Heading level="h3" as="h3" className="mb-3 flex items-center gap-2 text-[16px] font-bold">
        <FileCode size={18} className="text-accent" />
        About this service
      </Heading>
      <Text tone="muted" className="leading-relaxed text-[13px]">
        {description || "No description available."}
      </Text>
    </section>
  );
}

export function EntitiesSection({ entities }: { entities: Record<string, any> }) {
  return (
    <section>
      <Heading level="h3" as="h3" className="mb-4 flex items-center gap-2 text-[16px] font-bold">
        <Boxes size={18} className="text-accent" />
        Entities
      </Heading>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(entities).map(([key, entity]) => (
          <Card key={key} className="p-5 bg-neutral-surface/20 border border-neutral-border/30 backdrop-blur-sm rounded-xl hover:border-accent/30 hover:bg-neutral-surface/30 transition-all group">
            <div className="flex items-center justify-between mb-2">
              <div className="font-bold text-neutral-content group-hover:text-accent transition-colors">
                {entity.name}
              </div>
              <Database size={14} className="text-neutral-content-muted" />
            </div>
            <div className="text-[11px] font-mono text-neutral-content-muted bg-black/20 px-2 py-0.5 rounded inline-block">
              PK: {entity.primaryKey}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function QueriesSection({ queries }: { queries: Record<string, any> }) {
  return (
    <section>
      <Heading level="h3" as="h3" className="mb-4 flex items-center gap-2 text-[16px] font-bold">
        <Search size={18} className="text-accent" />
        Queries
      </Heading>
      <div className="space-y-3">
        {Object.entries(queries).map(([key, query]) => (
          <Card
            key={key}
            className="p-4 flex items-center justify-between bg-neutral-surface/20 border border-neutral-border/30 backdrop-blur-sm rounded-xl hover:border-accent/30 hover:bg-neutral-surface/30 transition-all group"
          >
            <div className="font-medium text-neutral-content group-hover:text-accent transition-colors">
              {query.name}
            </div>
            <div className="text-[11px] font-mono text-neutral-content-muted bg-black/20 px-2 py-0.5 rounded">
              {Object.keys(query.args || {}).length} arguments
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function ActionsSection({ actions }: { actions: Record<string, any> }) {
  return (
    <section>
      <Heading level="h3" as="h3" className="mb-4 flex items-center gap-2 text-[16px] font-bold">
        <Zap size={18} className="text-accent" />
        Actions
      </Heading>
      <div className="space-y-3">
        {Object.entries(actions).map(([key, action]) => (
          <Card
            key={key}
            className="p-4 flex items-center justify-between bg-neutral-surface/20 border border-neutral-border/30 backdrop-blur-sm rounded-xl hover:border-accent/30 hover:bg-neutral-surface/30 transition-all group"
          >
            <div className="font-medium text-neutral-content group-hover:text-accent transition-colors">
              {action.name}
            </div>
            <div className="text-[11px] font-mono text-neutral-content-muted bg-black/20 px-2 py-0.5 rounded">
              {Object.keys(action.args || {}).length} arguments
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
