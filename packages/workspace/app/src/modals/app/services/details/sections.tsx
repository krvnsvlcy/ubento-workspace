import { Button, Card, Heading, Text } from "@ubento/bento.arlo-core";
import { OperationSpec } from "@ubento/vertex.core";
import {
  Boxes,
  Braces,
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
    <section className="bg-surface/10 p-6 rounded-2xl border border-border/20 backdrop-blur-sm hover:bg-surface/20 transition-colors">
      <Heading
        level="h3"
        as="h3"
        className="mb-3 flex items-center gap-2 text-[16px] font-bold"
      >
        <FileCode size={18} className="text-base" />
        About this service
      </Heading>
      <Text shade="muted" className="leading-relaxed text-[13px]">
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
        <Boxes size={18} className="text-base" />
        Entities
      </Heading>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(entities).map(([key, entity]) => (
          <Card
            key={key}
            className="p-5 bg-surface/20 border border-border/30 backdrop-blur-sm rounded-xl hover:border-border/30 hover:bg-surface/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-bold text-content group-hover:text-base transition-colors">
                {entity.name}
              </div>
              <Database size={14} className="text-content-muted" />
            </div>
            <div className="text-[11px] font-mono text-content-muted bg-black/20 px-2 py-0.5 rounded inline-block">
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
        <div className="text-content truncate">{name}</div>
        {operation.description && (
          <div
            className="text-content-subtle text-xs"
            dangerouslySetInnerHTML={{ __html: operation.description }}
          />
        )}
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
          <Icon size={18} className="text-base" />
          {title}
        </Heading>
        {isOpen ? (
          <ChevronUp size={16} className="text-content-muted" />
        ) : (
          <ChevronDown size={16} className="text-content-muted" />
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

export function SchemasSection({ schemas }: { schemas: Record<string, any> }) {
  return <OperationsSection title="Schemas" icon={Braces} operations={schemas} />;
}

export function DatabasesSection({
  databases,
}: {
  databases: any[];
}) {
  return (
    <section className="space-y-6">
      <Heading
        level="h3"
        as="h3"
        className="mb-4 flex items-center gap-2 text-[16px] font-bold"
      >
        <Database size={18} className="text-base" />
        Databases & Collections
      </Heading>
      <div className="space-y-6">
        {databases.map((db, idx) => (
          <div key={db.name || idx} className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-content text-sm">{db.name}</span>
              {db.description && (
                <span className="text-xs text-content-muted">{db.description}</span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {db.collections?.map((col: any, colIdx: number) => (
                <Card
                  key={col.name || colIdx}
                  className="p-5 bg-surface/20 border border-border/30 backdrop-blur-sm rounded-xl hover:border-border/30 hover:bg-surface/30 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-content group-hover:text-base transition-colors">
                      {col.name}
                    </div>
                    <Boxes size={14} className="text-content-muted" />
                  </div>
                  {col.description && (
                    <p className="text-xs text-content-subtle mb-3">{col.description}</p>
                  )}
                  {col.schema && col.schema.properties && (
                    <div className="space-y-1">
                      <div className="text-[10px] uppercase font-bold text-content-muted tracking-wider">
                        Fields
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {Object.entries(col.schema.properties).map(([fieldName, fieldMeta]: [string, any]) => {
                          const fieldType = Array.isArray(fieldMeta.types)
                            ? fieldMeta.types.join(" | ")
                            : fieldMeta.type || "any";
                          return (
                            <span
                              key={fieldName}
                              className="text-[10px] font-mono text-content-muted bg-black/20 px-2 py-0.5 rounded"
                              title={`${fieldName}: ${fieldType}`}
                            >
                              {fieldName} <span className="opacity-60">({fieldType})</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CollectionsSection({
  collections,
}: {
  collections: any[];
}) {
  return (
    <section className="space-y-4">
      <Heading
        level="h3"
        as="h3"
        className="mb-4 flex items-center gap-2 text-[16px] font-bold"
      >
        <Boxes size={18} className="text-base" />
        Collections
      </Heading>
      <div className="grid grid-cols-2 gap-4">
        {collections.map((col: any, colIdx: number) => (
          <Card
            key={col.name || colIdx}
            className="p-5 bg-surface/20 border border-border/30 backdrop-blur-sm rounded-xl hover:border-border/30 hover:bg-surface/30 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-bold text-content group-hover:text-base transition-colors">
                {col.name}
              </div>
              <Boxes size={14} className="text-content-muted" />
            </div>
            {col.description && (
              <p className="text-xs text-content-subtle mb-3">{col.description}</p>
            )}
            {col.schema && col.schema.properties && (
              <div className="space-y-1">
                <div className="text-[10px] uppercase font-bold text-content-muted tracking-wider">
                  Fields
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(col.schema.properties).map(([fieldName, fieldMeta]: [string, any]) => {
                    const fieldType = Array.isArray(fieldMeta.types)
                      ? fieldMeta.types.join(" | ")
                      : fieldMeta.type || "any";
                    return (
                      <span
                        key={fieldName}
                        className="text-[10px] font-mono text-content-muted bg-black/20 px-2 py-0.5 rounded"
                        title={`${fieldName}: ${fieldType}`}
                      >
                        {fieldName} <span className="opacity-60">({fieldType})</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
