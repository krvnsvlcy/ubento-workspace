import { useEffect, useRef, useState } from "react";
import { useEngine } from "../../engine";

export function ComponentSelector({
  onSelect,
}: {
  onSelect: (moduleId: string) => void;
  onClose: () => void;
}) {
  const searchModules = useEngine((s) => s.searchModules);
  const createModule = useEngine((s) => s.createModule);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const search = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      try {
        const res = await searchModules(query);
        setResults(res);
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(search, 300);
    return () => clearTimeout(timer);
  }, [query, searchModules]);

  const onCreate = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await createModule(query);
      onSelect(res.id);
    } catch (err) {
      console.error("Creation failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        marginTop: "8px",
        background: "#1a1a1a",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "12px",
        padding: "8px",
        zIndex: 1000,
        minWidth: "240px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
        pointerEvents: "auto",
      }}
    >
      <div style={{ padding: "4px" }}>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search components..."
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            padding: "10px 12px",
            color: "white",
            fontSize: "13px",
            outline: "none",
            boxSizing: "border-box",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && results.length === 0 && query.trim()) {
              onCreate();
            } else if (e.key === "Enter" && results.length > 0) {
              onSelect(results[0].id);
            }
          }}
        />
      </div>

      <div
        style={{
          marginTop: "4px",
          maxHeight: "240px",
          overflowY: "auto",
          padding: "4px",
        }}
      >
        {results.map((res) => (
          <div
            key={res.id}
            onClick={() => onSelect(res.id)}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              cursor: "pointer",
              color: "white",
              fontSize: "14px",
              transition: "background 0.2s",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <div style={{ fontWeight: "600" }}>{res.name}</div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>
              {res.id}
            </div>
          </div>
        ))}

        {query.trim() && results.length === 0 && !loading && (
          <div
            onClick={onCreate}
            style={{
              padding: "12px",
              borderRadius: "8px",
              cursor: "pointer",
              background: "rgba(59, 130, 246, 0.05)",
              border: "1px dashed rgba(59, 130, 246, 0.2)",
              color: "#60a5fa",
              fontSize: "13px",
              textAlign: "center",
              marginTop: "4px",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(59, 130, 246, 0.1)";
              e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(59, 130, 246, 0.05)";
              e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.2)";
            }}
          >
            Create module "{query}"
          </div>
        )}

        {loading && (
          <div
            style={{
              padding: "16px",
              color: "rgba(255,255,255,0.3)",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            Searching team components...
          </div>
        )}

        {!query.trim() && !loading && (
          <div
            style={{
              padding: "16px",
              color: "rgba(255,255,255,0.2)",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            Type to search or create
          </div>
        )}
      </div>
    </div>
  );
}
