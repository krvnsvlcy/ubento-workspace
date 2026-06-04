import { Text } from "@ubento/bento.arlo-core";
import { AlertCircle, Terminal } from "lucide-react";
import {
  ActionsSection,
  CollectionsSection,
  DatabasesSection,
  EntitiesSection,
  QueriesSection,
  SchemasSection,
} from "./sections";

interface DetailsBodyProps {
  isLoadingSpec: boolean;
  specData: any;
  service: any;
  searchQuery: string;
  specError?: string;
}

export function DetailsBody({
  isLoadingSpec,
  specData,
  searchQuery,
  specError,
}: DetailsBodyProps) {
  const filteredQueries = specData?.queries
    ? Object.entries(specData.queries).reduce(
        (acc, [key, query]: [string, any]) => {
          if (
            key.toLowerCase().includes(searchQuery.toLowerCase()) ||
            query.name?.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            acc[key] = query;
          }
          return acc;
        },
        {} as Record<string, any>,
      )
    : {};

  const filteredActions = specData?.actions
    ? Object.entries(specData.actions).reduce(
        (acc, [key, action]: [string, any]) => {
          if (
            key.toLowerCase().includes(searchQuery.toLowerCase()) ||
            action.name?.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            acc[key] = action;
          }
          return acc;
        },
        {} as Record<string, any>,
      )
    : {};

  const filteredSchemas = specData?.schemas
    ? Object.entries(specData.schemas).reduce(
        (acc, [key, schema]: [string, any]) => {
          if (
            key.toLowerCase().includes(searchQuery.toLowerCase()) ||
            schema?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            schema?.title?.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            acc[key] = schema;
          }
          return acc;
        },
        {} as Record<string, any>,
      )
    : {};

  const filteredCollections = specData?.collections
    ? specData.collections.filter((col: any) => {
        return (
          col.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          col.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (specData.database || "").toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
    : [];

  return (
    <>
      {isLoadingSpec ? (
        <div className="flex items-center gap-2 text-content-muted">
          <div className="w-4 h-4 border-2 border-border border-t-accent rounded-full animate-spin" />
          <p className="text-[13px]">Loading specification...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {specError && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-red-500">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Specification Error</p>
                <p className="text-[13px] opacity-80 leading-relaxed">
                  {specError}
                </p>
              </div>
            </div>
          )}

          {specData?.type === "mongodb" ? (
            filteredCollections.length > 0 ? (
              <CollectionsSection collections={filteredCollections} />
            ) : (
              !isLoadingSpec && !specError && (
                <div className="flex flex-col items-center justify-center py-12 bg-surface/10 rounded-2xl border border-border/20">
                  <Terminal size={32} className="text-content-muted mb-4" />
                  <Text shade="muted" className="text-[13px]">
                    No matching collections found.
                  </Text>
                </div>
              )
            )
          ) : (
            <>
              {specData?.entities && Object.keys(specData.entities).length > 0 && (
                <EntitiesSection entities={specData.entities} />
              )}

              {Object.keys(filteredQueries).length > 0 && (
                <QueriesSection queries={filteredQueries} />
              )}

              {Object.keys(filteredActions).length > 0 && (
                <ActionsSection actions={filteredActions} />
              )}

              {Object.keys(filteredSchemas).length > 0 && (
                <SchemasSection schemas={filteredSchemas} />
              )}
            </>
          )}

          {!specData && !isLoadingSpec && !specError && (
            <div className="flex flex-col items-center justify-center py-12 bg-surface/10 rounded-2xl border border-border/20">
              <Terminal size={32} className="text-content-muted mb-4" />
              <Text shade="muted" className="text-[13px]">
                No specification details available for this channel.
              </Text>
            </div>
          )}
        </div>
      )}
    </>
  );
}
