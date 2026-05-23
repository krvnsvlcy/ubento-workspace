import { cx } from "@/lib/utils.js";
import { createComponent } from "@ubento/bento.core";
import { useState } from "react";
import { z } from "zod";

function UnsafeObjectViewer({
  data,
  name,
  isLast = true,
  depth = 0,
}: {
  data: unknown;
  name?: string;
  isLast?: boolean;
  depth?: number;
}) {
  const [expanded, setExpanded] = useState(true);
  const toggle = () => setExpanded(!expanded);
  const type = typeof data;

  const styles = {
    container: {
      fontFamily: "'Fira Code', 'Courier New', Courier, monospace",
      fontSize: "14px",
      lineHeight: "1.5",
      paddingLeft: depth > 0 ? "12px" : "0",
      position: "relative" as const,
    },
    line: {
      display: "flex",
      alignItems: "baseline",
      flexWrap: "wrap" as const,
    },
    key: {
      color: "#a78bfa", // Purple
      fontWeight: "500",
      marginRight: "4px",
    },
    string: { color: "#34d399" }, // Green
    number: { color: "#60a5fa" }, // Blue
    boolean: { color: "#f472b6" }, // Pink
    null: { color: "var(--color-neutral-content-muted)" }, // Gray
    undefined: { color: "var(--color-neutral-content-muted)" }, // Gray
    error: { color: "#ef4444" }, // Red
    bracket: { color: "var(--color-neutral-content-subtle)" }, // Light gray
    comma: { color: "var(--color-neutral-content-subtle)" },
    toggle: {
      cursor: "pointer",
      userSelect: "none" as const,
      marginRight: "4px",
      display: "inline-block",
      width: "12px",
      textAlign: "center" as const,
      color: "var(--color-neutral-content-muted)",
      fontSize: "10px",
    },
    childrenContainer: {
      borderLeft: "1px solid var(--color-neutral-border)",
      marginLeft: "4px",
      paddingLeft: "12px",
    },
  };

  if (data === null) {
    return (
      <div style={styles.container}>
        <div style={styles.line}>
          {name && <span style={styles.key}>{name}:</span>}
          <span style={styles.null}>null</span>
          {!isLast && <span style={styles.comma}>,</span>}
        </div>
      </div>
    );
  }

  if (type === "undefined") {
    return (
      <div style={styles.container}>
        <div style={styles.line}>
          {name && <span style={styles.key}>{name}:</span>}
          <span style={styles.undefined}>undefined</span>
          {!isLast && <span style={styles.comma}>,</span>}
        </div>
      </div>
    );
  }

  if (type === "string") {
    return (
      <div style={styles.container}>
        <div style={styles.line}>
          {name && <span style={styles.key}>{name}:</span>}
          <span style={styles.string}>"{String(data)}"</span>
          {!isLast && <span style={styles.comma}>,</span>}
        </div>
      </div>
    );
  }

  if (type === "number") {
    return (
      <div style={styles.container}>
        <div style={styles.line}>
          {name && <span style={styles.key}>{name}:</span>}
          <span style={styles.number}>{data as number}</span>
          {!isLast && <span style={styles.comma}>,</span>}
        </div>
      </div>
    );
  }

  if (type === "boolean") {
    return (
      <div style={styles.container}>
        <div style={styles.line}>
          {name && <span style={styles.key}>{name}:</span>}
          <span style={styles.boolean}>{String(data)}</span>
          {!isLast && <span style={styles.comma}>,</span>}
        </div>
      </div>
    );
  }

  // Explicit case for Error objects
  if (data instanceof Error) {
    return (
      <div style={styles.container}>
        <div style={styles.line}>
          {name && <span style={styles.key}>{name}:</span>}
          <span style={styles.error}>{`[${data.name}: ${data.message}]`}</span>
          {!isLast && <span style={styles.comma}>,</span>}
        </div>
      </div>
    );
  }

  if (Array.isArray(data)) {
    const isEmpty = data.length === 0;
    return (
      <div style={styles.container}>
        <div style={styles.line}>
          {!isEmpty && (
            <span style={styles.toggle} onClick={toggle}>
              {expanded ? "▼" : "▶"}
            </span>
          )}
          {name && <span style={styles.key}>{name}:</span>}
          <span style={styles.bracket}>[</span>
          {!expanded && !isEmpty && (
            <span
              style={{ ...styles.null, cursor: "pointer" }}
              onClick={toggle}
            >
              ... {data.length} items
            </span>
          )}
          {isEmpty && <span style={styles.bracket}>]</span>}
          {!isLast && isEmpty && <span style={styles.comma}>,</span>}
        </div>
        {expanded && !isEmpty && (
          <div style={styles.childrenContainer}>
            {data.map((item, index) => (
              <UnsafeObjectViewer
                key={index}
                data={item}
                isLast={index === data.length - 1}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
        {!isEmpty && expanded && (
          <div>
            <span style={styles.bracket}>]</span>
            {!isLast && <span style={styles.comma}>,</span>}
          </div>
        )}
      </div>
    );
  }

  if (type === "object") {
    const keys = Object.keys(data as object);
    const isEmpty = keys.length === 0;
    return (
      <div style={styles.container}>
        <div style={styles.line}>
          {!isEmpty && (
            <span style={styles.toggle} onClick={toggle}>
              {expanded ? "▼" : "▶"}
            </span>
          )}
          {name && <span style={styles.key}>{name}:</span>}
          <span style={styles.bracket}>{"{"}</span>
          {!expanded && !isEmpty && (
            <span
              style={{ ...styles.null, cursor: "pointer" }}
              onClick={toggle}
            >
              ... {keys.length} keys
            </span>
          )}
          {isEmpty && <span style={styles.bracket}>{"}"}</span>}
          {!isLast && isEmpty && <span style={styles.comma}>,</span>}
        </div>
        {expanded && !isEmpty && (
          <div style={styles.childrenContainer}>
            {keys.map((key, index) => (
              <UnsafeObjectViewer
                key={key}
                name={key}
                data={(data as any)[key]}
                isLast={index === keys.length - 1}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
        {!isEmpty && expanded && (
          <div>
            <span style={styles.bracket}>{"}"}</span>
            {!isLast && <span style={styles.comma}>,</span>}
          </div>
        )}
      </div>
    );
  }

  return null;
}

export const ObjectViewer = createComponent({
  props: z.object({
    data: z.unknown(),
    name: z.string().optional(),
    className: z.string().optional(),
  }),

  summary: "A component for viewing and inspecting JSON objects.",
  instructions: [
    "Use this component to display structured data in a readable format.",
    "The `data` prop accepts any JSON-serializable value.",
    "The `name` prop optionally sets a root label.",
  ].join("\n"),

  render: ({ ref, props }) => {
    return (
      <div
        ref={ref}
        className={cx(
          "overflow-auto p-4 bg-neutral-surface rounded-md",
          props.className,
        )}
      >
        <UnsafeObjectViewer data={props.data} name={props.name} />
      </div>
    );
  },
});
