import { Button, Heading, Text } from "@ubento/bento.arlo-core";
import { ChevronRight, Layout, Plus } from "lucide-react";
import { useState } from "react";
import { BentoRuntime } from "../runtime/runtime";
import { WorkspaceBoardSpec } from "../spec";

type BoardMap = Record<string, WorkspaceBoardSpec>;

// ─── component ──────────────────────────────────────────────────────────────

export function BentoHomeView({ runtime }: { runtime: BentoRuntime }) {
  const workspace = runtime.useState((s) => s.workspace);
  const spec = runtime.useState((s) => s.workspace.spec);

  const boards: BoardMap =
    (spec.isValid && (spec.data?.boards as BoardMap)) || {};
  const roots: string[] = (spec.isValid && spec.data?.roots) || [];
  const isEmpty = roots.length === 0;

  // Empty state
  if (isEmpty) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-background p-8">
        <div className="flex flex-col items-center text-center max-w-md gap-6">
          <Heading level="h1">{workspace.title}</Heading>
          <Text shade="subtle">
            Start by creating your first board to organize your tasks and
            visualize your data in this workspace.
          </Text>
          <Button
            variant="primary"
            onClick={async () => {
              await runtime.createBoard();
              // Navigate to the most-recently added root board
              const spec = runtime.getState().workspace.spec;
              if (spec.isValid && spec.data?.roots?.length) {
                const roots = spec.data.roots;
                runtime.goToBoard(roots[roots.length - 1]);
              }
            }}
          >
            Create your first board
          </Button>
        </div>
      </div>
    );
  }

  const matchesSearch = (b: WorkspaceBoardSpec) => true;

  return (
    <div className="h-full flex flex-col items-center bg-background py-16 gap-8">
      <div className="sticky top-0 w-full bg-background z-10 flex justify-center">
        <div className="max-w-5xl w-full px-8 flex py-6 items-center justify-between gap-4 border-b">
          <Heading level="h1">{workspace.title}</Heading>
          <Button
            variant="primary"
            size="md"
            onClick={async () => {
              await runtime.createBoard();
              const spec = runtime.getState().workspace.spec;
              if (spec.isValid && spec.data?.roots?.length) {
                const roots = spec.data.roots;
                runtime.goToBoard(roots[roots.length - 1]);
              }
            }}
          >
            <Plus size={14} />
            New Board
          </Button>
        </div>
      </div>
      <div className="w-full max-w-5xl px-8">
        <div className="space-y-1">
          {roots.map((rootId) => (
            <BoardTreeNode
              key={rootId}
              boardId={rootId}
              boards={boards}
              depth={0}
              runtime={runtime}
              matchesSearch={matchesSearch}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── tree node ───────────────────────────────────────────────────────────────

interface TreeEntryProps extends React.ComponentProps<"div"> {
  icon?: React.ReactNode;
  active?: boolean;
  isContainer?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  depth: number;
}

function TreeEntry({
  children,
  icon,
  active,
  isContainer,
  isOpen,
  onOpenChange,
  depth,
  ...props
}: TreeEntryProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClass = depth === 0 ? "w-9 h-9" : "w-8 h-8";
  const iconSize = depth === 0 ? 16 : 14;

  let iconNode = (
    <div
      className={`${sizeClass} rounded-xl border border-border bg-background flex items-center justify-center text-content-muted transition-colors shrink-0`}
    >
      {icon}
    </div>
  );

  if (isContainer && isHovered) {
    iconNode = (
      <button
        className={`${sizeClass} flex items-center justify-center text-content-muted hover:bg-surface-hover hover:text-content cursor-pointer rounded-xl border border-border bg-background transition-colors shrink-0`}
        onClick={(e) => {
          e.stopPropagation();
          onOpenChange?.(!isOpen);
        }}
      >
        <ChevronRight
          size={iconSize}
          className="transition-transform duration-150"
          style={{
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
          }}
        />
      </button>
    );
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group flex items-center gap-3 rounded-xl px-4 py-3 cursor-pointer transition-colors duration-150 ${
        active ? "bg-surface text-content" : "hover:bg-surface/50 text-content"
      }`}
      {...props}
    >
      <div className="flex items-center justify-center shrink-0">
        {iconNode}
      </div>
      <div className="grow overflow-hidden truncate flex items-center justify-between">
        {children}
      </div>
    </div>
  );
}

function BoardTreeNode({
  boardId,
  boards,
  depth,
  runtime,
  matchesSearch,
}: {
  boardId: string;
  boards: BoardMap;
  depth: number;
  runtime: BentoRuntime;
  matchesSearch: (b: WorkspaceBoardSpec) => boolean;
}) {
  const board = boards[boardId];
  const [expanded, setExpanded] = useState(true);

  if (!board) return null;

  const children = board.children ?? [];
  const hasChildren = children.length > 0;

  const selfMatches = matchesSearch(board);
  const anyChildMatches = (id: string): boolean => {
    const b = boards[id];
    if (!b) return false;
    if (matchesSearch(b)) return true;
    return (b.children ?? []).some(anyChildMatches);
  };
  if (!selfMatches && !children.some(anyChildMatches)) return null;

  return (
    <div style={{ paddingLeft: depth * 24 }}>
      <TreeEntry
        isContainer={hasChildren}
        isOpen={expanded}
        onOpenChange={(v) => setExpanded(v)}
        depth={depth}
        icon={<Layout size={depth === 0 ? 16 : 14} />}
        onClick={() => runtime.goToBoard(board.id)}
      >
        <div className="flex items-center justify-between w-full">
          <Text
            size={depth === 0 ? "xl" : "lg"}
            weight={depth === 0 ? "semibold" : "medium"}
            className="truncate flex-1"
          >
            {board.title || "Untitled"}
          </Text>

          {hasChildren && (
            <span className="text-[11px] font-medium text-content-subtle bg-surface border border-border rounded-full px-2 py-0.5 leading-none">
              {children.length}
            </span>
          )}
        </div>
      </TreeEntry>

      {/* Children */}
      {expanded && hasChildren && (
        <div className="border-l border-border/50 ml-[34px] mt-0.5 mb-1">
          {children.map((childId: string) => (
            <BoardTreeNode
              key={childId}
              boardId={childId}
              boards={boards}
              depth={1}
              runtime={runtime}
              matchesSearch={matchesSearch}
            />
          ))}
        </div>
      )}
    </div>
  );
}
