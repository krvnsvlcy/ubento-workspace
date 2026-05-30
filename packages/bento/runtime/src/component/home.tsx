import { Button, Heading, Input, Text } from "@ubento/bento.arlo-core";
import { ChevronRight, Layout, Plus, Search } from "lucide-react";
import { useState } from "react";
import { BentoRuntime } from "../runtime/runtime";
import { WorkspaceBoardSpec } from "../spec";

type BoardMap = Record<string, WorkspaceBoardSpec>;

// ─── component ──────────────────────────────────────────────────────────────

export function BentoHomeView({ runtime }: { runtime: BentoRuntime }) {
  const workspace = runtime.useState((s) => s.workspace);
  const spec = runtime.useState((s) => s.workspace.spec);
  const [search, setSearch] = useState("");

  const boards: BoardMap =
    (spec.isValid && (spec.data?.boards as BoardMap)) || {};
  const roots: string[] = (spec.isValid && spec.data?.roots) || [];
  const isEmpty = roots.length === 0;

  // Empty state
  if (isEmpty) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-background p-8">
        <div className="flex flex-col items-center text-center max-w-md gap-6">
          <Heading level="display">{workspace.title}</Heading>
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

  const lowerSearch = search.toLowerCase();
  const matchesSearch = (b: WorkspaceBoardSpec) =>
    !lowerSearch || b.title.toLowerCase().includes(lowerSearch);

  return (
    <div className="h-full w-full flex flex-col items-center overflow-auto bg-background p-8 md:p-12 lg:p-16">
      <div className="w-full max-w-2xl space-y-10 mt-8">
        {/* Header */}
        <div className="space-y-1">
          <Heading level="display">{workspace.title}</Heading>
        </div>

        {/* Search + create */}
        <div className="flex w-full gap-2">
          <div className="grow">
            <Input
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              placeholder="Search boards…"
              prefix={<Search size={16} />}
            />
          </div>
          <Button
            variant="primary"
            size="lg"
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

        {/* Tree */}
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

  // If searching, only show nodes that match or have matching descendants
  const selfMatches = matchesSearch(board);
  const anyChildMatches = (id: string): boolean => {
    const b = boards[id];
    if (!b) return false;
    if (matchesSearch(b)) return true;
    return (b.children ?? []).some(anyChildMatches);
  };
  if (!selfMatches && !children.some(anyChildMatches)) return null;

  return (
    <div style={{ paddingLeft: depth * 16 }}>
      {/* Row */}
      <div
        className="group flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer hover:bg-surface transition-colors duration-150"
        onClick={() => runtime.goToBoard(board.id)}
      >
        {/* Expand toggle */}
        <button
          className={`shrink-0 text-content-muted transition-transform duration-200 ${
            hasChildren ? "opacity-100" : "opacity-0 pointer-events-none"
          } ${expanded ? "rotate-90" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setExpanded((v) => !v);
          }}
        >
          <ChevronRight size={14} />
        </button>

        {/* Icon */}
        <div className="w-7 h-7 rounded-lg border border-border bg-background flex items-center justify-center text-content-muted group-hover:text-base group-hover:border-border/40 transition-colors shrink-0">
          <Layout size={13} />
        </div>

        {/* Name */}
        <Text weight="medium" className="truncate flex-1">
          {board.title || "Untitled"}
        </Text>

        {/* Child count badge */}
        {hasChildren && (
          <span className="text-[10px] font-medium text-content-subtle bg-surface border border-border rounded-full px-1.5 py-0.5 leading-none">
            {children.length}
          </span>
        )}
      </div>

      {/* Children */}
      {expanded && hasChildren && (
        <div className="border-l border-border/50 ml-[22px] mt-0.5 mb-1">
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
