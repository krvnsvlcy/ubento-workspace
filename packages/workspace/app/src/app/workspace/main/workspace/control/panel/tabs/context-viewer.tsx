import { Check, ChevronDown, ChevronRight, Copy } from "lucide-react";
import React, { useEffect, useState } from "react";
import { WorkspaceEngine } from "../../../../../../../engine/workspace/engine";

function TreeNode({
  path,
  label,
  type,
  hasChildren,
  displayValue,
  controller,
}: {
  path: string;
  label: string;
  type: string;
  hasChildren: boolean;
  displayValue?: string;
  controller: WorkspaceEngine;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const watchedContextNodes = controller.useState((s) => s.watchedContextNodes);
  const children = watchedContextNodes[path];

  useEffect(() => {
    if (!isExpanded || !hasChildren) return;

    let subKey: string | null = null;
    controller.watchContextNode(path).then((key) => {
      subKey = key;
    });

    return () => {
      if (subKey) {
        controller.unwatchContextNode(subKey, path);
      }
    };
  }, [isExpanded, path, hasChildren, controller]);

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (displayValue === undefined) return;

    let textToCopy = displayValue;
    try {
      const parsed = JSON.parse(displayValue);
      if (typeof parsed === "string") {
        textToCopy = parsed;
      }
    } catch {
      // Use displayValue as-is
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex flex-col select-none">
      <div
        className={`flex items-center gap-1.5 py-1 px-1.5 rounded hover:bg-surface-hover/20 cursor-pointer text-xs transition-colors group`}
        onClick={toggleExpand}
      >
        {hasChildren ? (
          <div className="text-content-muted">
            {isExpanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </div>
        ) : (
          <div className="w-3.5" />
        )}

        <span className="font-mono text-content-strong font-medium">
          {label}
        </span>
        <span className="text-[10px] text-content-muted px-1.5 py-0.5 rounded bg-surface-active/10 font-mono">
          {type}
        </span>

        {displayValue !== undefined && (
          <span className="font-mono text-content-strong/80 truncate max-w-[200px]">
            : {displayValue}
          </span>
        )}

        {displayValue !== undefined && (
          <button
            type="button"
            className="ml-auto opacity-0 group-hover:opacity-100 transition-all p-1 rounded hover:bg-surface-active/20 text-content-muted hover:text-content-strong flex items-center justify-center"
            onClick={handleCopy}
            title="Copy value"
          >
            {copied ? (
              <Check size={12} className="text-base" />
            ) : (
              <Copy size={12} />
            )}
          </button>
        )}
      </div>

      {isExpanded && hasChildren && (
        <div className="pl-3 border-l border-border/20 ml-3 mt-0.5 flex flex-col gap-0.5">
          {children === undefined ? (
            <div className="text-[10px] text-content-muted pl-4 py-1 italic">
              Loading...
            </div>
          ) : children.length === 0 ? (
            <div className="text-[10px] text-content-muted pl-4 py-1 italic">
              Empty
            </div>
          ) : (
            children.map((child: any) => {
              const childPath = path ? `${path}.${child.key}` : child.key;
              return (
                <TreeNode
                  key={childPath}
                  path={childPath}
                  label={child.key}
                  type={child.type}
                  hasChildren={child.hasChildren}
                  displayValue={child.value}
                  controller={controller}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export function ContextViewerTab({
  controller,
}: {
  controller: WorkspaceEngine;
}) {
  const location = controller.appEngine.useState((s) => s.location);
  const boardId = location?.board;
  const watchedContextNodes = controller.useState((s) => s.watchedContextNodes);
  const rootChildren = watchedContextNodes[""];

  useEffect(() => {
    if (!boardId) return;

    let subKey: string | null = null;
    controller.watchContextNode("").then((key) => {
      subKey = key;
    });

    return () => {
      if (subKey) {
        controller.unwatchContextNode(subKey, "");
      }
    };
  }, [boardId, controller]);

  if (!boardId) {
    return (
      <div className="p-4 text-xs text-content-muted">
        No active board
      </div>
    );
  }

  return (
    <div className="p-4 h-full overflow-auto flex flex-col gap-4">
      {rootChildren === undefined ? (
        <div className="text-xs text-content-muted italic">
          Connecting to context...
        </div>
      ) : rootChildren.length === 0 ? (
        <div className="text-xs text-content-muted italic">
          No context available
        </div>
      ) : (
        rootChildren.map((child: any) => (
          <TreeNode
            key={child.key}
            path={child.key}
            label={child.key}
            type={child.type}
            hasChildren={child.hasChildren}
            displayValue={child.value}
            controller={controller}
          />
        ))
      )}
    </div>
  );
}
