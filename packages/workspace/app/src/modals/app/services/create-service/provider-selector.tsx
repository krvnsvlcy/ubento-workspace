import { useUbento } from "@/hooks/app-engine";
import { useDebounce } from "@/hooks/use-debouce.js";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll.js";
import { useAppModal } from "@/modals/app/hook.js";
import { appModalRoutes } from "@/modals/app/routes.js";
import {
  Button,
  Field,
  FieldLabel,
  Input,
  ScrollArea,
  Spinner,
} from "@ubento/bento.arlo-core";
import { useEffect, useRef, useState } from "react";

interface ProviderSelectorProps {
  selectedProviderId: string;
  setSelectedProviderId: (id: string) => void;
}

export function ProviderSelector({
  selectedProviderId,
  setSelectedProviderId,
}: ProviderSelectorProps) {
  const ubento = useUbento();
  const { push } = useAppModal();

  const [providerSearch, setProviderSearch] = useState("");
  const debouncedSearch = useDebounce(providerSearch, 300);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch connection providers with infinite query
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    ubento.vertex.useConnectionProviders({
      name: debouncedSearch || undefined,
    });

  const providers = data?.pages.flatMap((page) => page.data) ?? [];

  // Register sentinel for infinite scroll inside the suggestions container
  const sentinelRef = useInfiniteScroll({
    hasNextPage: !!hasNextPage,
    isFetching,
    onLoadMore: fetchNextPage,
  });

  // Handle clicking outside the suggestions dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Synchronize input text with the selected provider's name when selectedProviderId changes
  useEffect(() => {
    if (selectedProviderId && providers.length > 0) {
      const selected = providers.find((p) => p.id === selectedProviderId);
      if (selected) {
        setProviderSearch(selected.name || selected.id);
      }
    }
  }, [selectedProviderId, providers]);

  return (
    <Field className="relative" ref={containerRef}>
      <div className="flex items-center justify-between w-full">
        <FieldLabel>Connection Provider</FieldLabel>
        <Button
          variant="link"
          size="sm"
          className="h-auto p-0 text-xs font-semibold text-base hover:underline"
          onClick={() => push(appModalRoutes.services.createProvider)}
        >
          Create new provider
        </Button>
      </div>

      <Input
        value={providerSearch}
        onChange={(e) => {
          setProviderSearch(e.target.value);
          setShowSuggestions(true);
          // If clearing, clear selection
          if (!e.target.value) {
            setSelectedProviderId("");
          }
        }}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Search connection provider..."
        className="w-full"
      />

      {showSuggestions && (
        <div className="absolute z-[100] top-full left-0 right-0 mt-1 max-h-[220px] overflow-hidden bg-background border border-border rounded-xl shadow-xl p-1 flex flex-col">
          {providers.length > 0 ? (
            <ScrollArea className="flex-1">
              <div className="flex flex-col">
                {providers.map((p: any) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedProviderId(p.id);
                      setProviderSearch(p.name || p.id);
                      setShowSuggestions(false);
                    }}
                    className={`rounded-lg px-3 py-2 text-xs text-content hover:bg-surface-hover cursor-pointer flex justify-between items-center ${
                      selectedProviderId === p.id
                        ? "bg-surface-hover/60 text-base font-medium"
                        : ""
                    }`}
                  >
                    <span>{p.name || p.id}</span>
                    <span className="text-[9px] text-content-muted uppercase font-mono px-1 bg-surface-hover rounded">
                      {p.type}
                    </span>
                  </div>
                ))}

                {/* Infinite scroll sentinel */}
                <div
                  ref={sentinelRef}
                  className="flex items-center justify-center"
                >
                  {isFetching && <Spinner className="w-4 h-4" />}
                </div>
              </div>
            </ScrollArea>
          ) : (
            <div className="px-3 py-2 text-xs text-content-muted italic">
              {isLoading ? "Loading..." : "No providers found"}
            </div>
          )}
        </div>
      )}
    </Field>
  );
}
