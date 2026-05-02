import { useEffect, useRef, useState } from "react";
import { useBentoEngine } from "../../../engine/engine";

export function ComponentSelector({
  onSelect,
}: {
  onSelect: (moduleId: string) => void;
  onClose: () => void;
}) {
  const engine = useBentoEngine();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="absolute left-1/2 top-full z-[1000] mt-2 min-w-[240px] -translate-x-1/2 rounded-xl border border-neutral-border bg-neutral-surface p-2 shadow-2xl pointer-events-auto">
      <div className="p-1">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search components..."
          className="w-full rounded-lg border border-neutral-border bg-neutral-surface-hover px-3 py-2.5 text-[13px] text-neutral-content outline-none transition-colors focus:border-accent-border"
        />
      </div>

      <div className="mt-1 max-h-[240px] overflow-y-auto p-1">
        {results.map((res) => (
          <div
            key={res.id}
            onClick={() => onSelect(res.id)}
            className="flex cursor-pointer flex-col gap-0.5 rounded-lg px-3 py-2 text-sm text-neutral-content transition-colors hover:bg-neutral-surface-hover"
          >
            <div className="font-semibold">{res.name}</div>
            <div className="text-[10px] text-neutral-content-muted">
              {res.id}
            </div>
          </div>
        ))}

        {query.trim() && results.length === 0 && !loading && (
          <div className="mt-1 cursor-pointer rounded-lg border border-dashed border-accent-border bg-accent-surface p-3 text-center text-[13px] text-accent transition-all hover:border-accent-border-hover hover:bg-accent-surface-hover">
            Create module "{query}"
          </div>
        )}

        {loading && (
          <div className="p-4 text-center text-[12px] text-neutral-content-muted">
            Searching team components...
          </div>
        )}

        {!query.trim() && !loading && (
          <div className="p-4 text-center text-[12px] text-neutral-content-muted">
            Type to search or create
          </div>
        )}
      </div>
    </div>
  );
}
