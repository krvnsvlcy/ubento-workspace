import { OperationSpec } from "@ubento/vertex.core";
import { PrimitiveCard as Card, Heading, Text, PrimitiveButton as Button } from "@ubento/bento.arlo-core";
import {
  Boxes,
  ChevronDown,
  ChevronUp,
  Copy,
  Database,
  FileCode,
  Search,
  Zap,
} from "lucide-react";
import { ComponentType, useState } from "react";

export function AboutSection({ description }: { description?: string }) {
  return (
    <section className="bg-neutral-surface/10 p-6 rounded-2xl border border-neutral-border/20 backdrop-blur-sm hover:bg-neutral-surface/20 transition-colors">
      <Heading
        level="h3"
        as="h3"
        className="mb-3 flex items-center gap-2 text-[16px] font-bold"
      >
        <FileCode size={18} className="text-accent" />
        About this service
      </Heading>
      <Text tone="muted" className="leading-relaxed text-[13px]">
        {description || "No description available."}
      </Text>
    </section>
  );
}

export function EntitiesSection({
  entities,
}: {
  entities: Record<string, any>;
}) {
  return (
    <section>
      <Heading
        level="h3"
        as="h3"
        className="mb-4 flex items-center gap-2 text-[16px] font-bold"
      >
        <Boxes size={18} className="text-accent" />
        Entities
      </Heading>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(entities).map(([key, entity]) => (
          <Card
            key={key}
            className="p-5 bg-neutral-surface/20 border border-neutral-border/30 backdrop-blur-sm rounded-xl hover:border-accent/30 hover:bg-neutral-surface/30 transition-all group"
          >
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

interface OperationsSectionProps {
  title: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  operations: Record<string, any>;
}

export function OperationCard({
  name,
  operation,
}: {
  name: string;
  operation: OperationSpec<any>;
}) {
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(operation, null, 2));
  };

  return (
    <div className="flex items-center justify-between group">
      <div className="overflow-hidden space-y-1">
        <div className="text-neutral-content truncate">{name}</div>
        <div className="text-neutral-content-subtle text-xs">
          {operation.name}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleCopy}
        title="Copy spec data"
      >
        <Copy size={14} />
      </Button>
    </div>
  );
}

export function OperationsSection({
  title,
  icon: Icon,
  operations,
}: OperationsSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section>
      <div
        className="mb-4 flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Heading
          level="h3"
          as="h3"
          className="flex items-center gap-2 text-[16px] font-bold"
        >
          <Icon size={18} className="text-accent" />
          {title}
        </Heading>
        {isOpen ? (
          <ChevronUp size={16} className="text-neutral-content-muted" />
        ) : (
          <ChevronDown size={16} className="text-neutral-content-muted" />
        )}
      </div>
      {isOpen && (
        <div className="grid grid-cols-2 gap-6">
          {Object.entries(operations).map(([key, op]) => (
            <OperationCard key={key} name={key} operation={op} />
          ))}
        </div>
      )}
    </section>
  );
}

export function QueriesSection({ queries }: { queries: Record<string, any> }) {
  return (
    <OperationsSection title="Queries" icon={Search} operations={queries} />
  );
}

export function ActionsSection({ actions }: { actions: Record<string, any> }) {
  return <OperationsSection title="Actions" icon={Zap} operations={actions} />;
}
