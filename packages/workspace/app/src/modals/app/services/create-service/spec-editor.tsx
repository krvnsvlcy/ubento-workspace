import { useUbento } from "@/hooks/app-engine";
import { useAppModal } from "@/modals/app/hook.js";
import { appModalRoutes } from "@/modals/app/routes.js";
import { Button, Field, FieldLabel, Input } from "@ubento/bento.arlo-core";
import { generateServiceSpecFromOpenApi } from "@ubento/vertex.core";
import { useState } from "react";
import { parse as parseYaml } from "yaml";

interface ServiceSpecEditorProps {
  handle: string;
  specText: string;
  setSpecText: (value: string) => void;
}

export function ServiceSpecEditor({
  handle,
  specText,
  setSpecText,
}: ServiceSpecEditorProps) {
  const [importMode, setImportMode] = useState(false);

  return (
    <div className="flex flex-col w-full h-full py-6 pr-6">
      <div className="h-full w-full border rounded-xl overflow-hidden">
        {importMode ? (
          <OpenApiImporter
            handle={handle}
            onImport={(spec) => {
              setSpecText(JSON.stringify(spec, null, 2));
              setImportMode(false);
            }}
            onCancel={() => setImportMode(false)}
          />
        ) : (
          <RawSpecEditor
            specText={specText}
            setSpecText={setSpecText}
            onImportModeToggle={() => setImportMode(true)}
          />
        )}
      </div>
    </div>
  );
}

interface OpenApiImporterProps {
  handle: string;
  onImport: (spec: any) => void;
  onCancel: () => void;
}

function OpenApiImporter({ handle, onImport, onCancel }: OpenApiImporterProps) {
  const ubento = useUbento();
  const { push } = useAppModal();

  const [selectedProviderId, setSelectedProviderId] = useState("");
  const [specUrl, setSpecUrl] = useState("");
  const [fetchingSpec, setFetchingSpec] = useState(false);
  const [specError, setSpecError] = useState("");

  // Autocomplete state
  const [providerSearch, setProviderSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Subscriptions & Queries
  const { data: providersData } = ubento.vertex.useConnectionProviders();
  const providers = providersData?.pages.flatMap((page) => page.data) ?? [];

  const filteredProviders = providers.filter((p: any) =>
    (p.name || p.id).toLowerCase().includes(providerSearch.toLowerCase()),
  );

  const handleFetchAndGenerate = async () => {
    if (!specUrl) {
      setSpecError("Please enter an OpenAPI Spec URL.");
      return;
    }
    if (!selectedProviderId) {
      setSpecError("Please select a Connection Provider.");
      return;
    }

    setFetchingSpec(true);
    setSpecError("");

    try {
      const res = await fetch(specUrl);
      if (!res.ok) {
        throw new Error(`Failed to fetch spec (Status: ${res.status})`);
      }
      const rawText = await res.text();
      let openapiObj: any;

      // Attempt JSON parsing first, fall back to YAML
      try {
        openapiObj = JSON.parse(rawText);
      } catch {
        try {
          openapiObj = parseYaml(rawText);
        } catch {
          throw new Error("Could not parse file as JSON or YAML.");
        }
      }

      if (!openapiObj || typeof openapiObj !== "object") {
        throw new Error("Invalid OpenAPI specification.");
      }

      // Generate service spec config
      const spec = generateServiceSpecFromOpenApi({
        openapi: openapiObj,
        template: {
          name: handle || "custom-service",
          connection: {
            provider: selectedProviderId,
            baseUrl: openapiObj.servers?.[0]?.url || "https://api.example.com",
          },
          discover: true,
        },
      });

      onImport(spec);
      setSpecError("");
    } catch (err: any) {
      setSpecError(
        err.message || "Failed to generate configuration from OpenAPI spec.",
      );
    } finally {
      setFetchingSpec(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex items-center justify-between p-3">
        <h3 className="text-sm font-semibold text-neutral-content">
          Import OpenAPI Specification
        </h3>
      </div>

      <hr />

      <div className="flex-1 p-3 space-y-4 overflow-y-auto">
        <Field className="relative">
          <FieldLabel>Connection Provider</FieldLabel>
          <Input
            value={providerSearch}
            onChange={(e) => {
              setProviderSearch(e.target.value);
              setShowSuggestions(true);
              const matched = providers.find(
                (p: any) =>
                  (p.name || p.id).toLowerCase() ===
                  e.target.value.toLowerCase(),
              );
              if (matched) {
                setSelectedProviderId(matched.id);
              } else {
                setSelectedProviderId("");
              }
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => {
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            placeholder="Search or select connection provider..."
            className="w-full"
          />

          {showSuggestions && (
            <div className="absolute z-[100] top-full left-0 right-0 mt-1 max-h-[180px] overflow-y-auto bg-neutral-surface border border-neutral-border/30 rounded-lg shadow-xl py-1">
              {filteredProviders.length > 0 ? (
                filteredProviders.map((p: any) => (
                  <div
                    key={p.id}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setSelectedProviderId(p.id);
                      setProviderSearch(p.name || p.id);
                      setShowSuggestions(false);
                    }}
                    className={`px-3 py-1.5 text-xs text-neutral-content hover:bg-neutral-surface-hover cursor-pointer flex justify-between items-center ${
                      selectedProviderId === p.id
                        ? "bg-neutral-surface-hover/60 text-accent font-medium"
                        : ""
                    }`}
                  >
                    <span>{p.name || p.id}</span>
                    <span className="text-[9px] text-neutral-content-muted uppercase font-mono px-1 bg-neutral-surface-hover rounded">
                      {p.type}
                    </span>
                  </div>
                ))
              ) : (
                <div className="px-3 py-1.5 text-xs text-neutral-content-muted italic">
                  No providers found
                </div>
              )}

              <div
                onMouseDown={(e) => {
                  e.preventDefault();
                  setShowSuggestions(false);
                  push(appModalRoutes.services.createProvider);
                }}
                className="border-t border-neutral-border/20 mt-1 px-3 py-1.5 text-xs text-accent font-medium hover:bg-neutral-surface-hover cursor-pointer flex items-center gap-1.5"
              >
                ⚡ Create new provider...
              </div>
            </div>
          )}
        </Field>

        <Field>
          <FieldLabel>OpenAPI Spec URL</FieldLabel>
          <Input
            value={specUrl}
            onChange={(e) => setSpecUrl(e.target.value)}
            placeholder="https://api.example.com/openapi.yaml"
          />
        </Field>

        {specError && (
          <div className="p-2.5 text-xs text-destructive bg-destructive/10 rounded-lg font-medium">
            {specError}
          </div>
        )}
      </div>

      <hr />

      <div className="flex justify-end gap-2 p-3">
        <Button onClick={onCancel} variant="ghost" size="sm">
          Cancel
        </Button>
        <Button
          onClick={handleFetchAndGenerate}
          variant="primary"
          size="sm"
          disabled={fetchingSpec || !specUrl || !selectedProviderId}
        >
          {fetchingSpec ? "Fetching..." : "Generate & Import"}
        </Button>
      </div>
    </div>
  );
}

interface RawSpecEditorProps {
  specText: string;
  setSpecText: (value: string) => void;
  onImportModeToggle: () => void;
}

function RawSpecEditor({
  specText,
  setSpecText,
  onImportModeToggle,
}: RawSpecEditorProps) {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex items-center justify-between p-3">
        <h3 className="text-sm font-semibold text-neutral-content">
          Specification
        </h3>
        <Button
          onClick={onImportModeToggle}
          variant="outline"
          size="sm"
          className="text-xs h-7 px-2.5 py-0"
        >
          Import from OpenAPI Spec
        </Button>
      </div>

      <hr />

      <div className="flex-1 flex flex-col min-h-[300px]">
        <textarea
          value={specText}
          onChange={(e) => setSpecText(e.target.value)}
          style={{ outline: "none", border: "none" }}
          placeholder="No specification defined yet. Paste raw JSON here or click Import to generate one."
          className="flex-1 w-full font-mono text-[11px] bg-neutral-surface p-3 resize-none text-neutral-content"
        />
      </div>
    </div>
  );
}
