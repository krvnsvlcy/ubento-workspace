import {
  PrimitiveButton as Button,
  Card,
  Heading,
  Input,
  Text,
} from "@ubento/bento.arlo-core";
import { useStoreEntities } from "@ubento/fabric";
import { ArrowRight, Layout, Plus, Search } from "lucide-react";
import { BentoRuntime } from "../runtime/runtime";

export function BentoHomeView({ runtime }: { runtime: BentoRuntime }) {
  const { data: boards, status } = useStoreEntities(runtime.boardStore);
  const workspace = runtime.useState((runtime) => runtime.workspace);

  const boardsList = boards || [];

  // Empty state
  if (status !== "pending" && boardsList.length === 0) {
    return (
      <div
        key="empty-state"
        className="h-screen w-screen flex flex-col items-center justify-center bg-background p-8 selection:bg-neutral-800 selection:text-white"
      >
        <div className="flex flex-col items-center text-center max-w-md duration-500 gap-6">
          <Heading level="display">{workspace.title}</Heading>
          <Text tone="subtle">
            Start by creating your first board to organize your tasks and
            visualize your data in this workspace.
          </Text>
          <Button variant="primary">Create your first board</Button>
        </div>
      </div>
    );
  }

  // Populated dashboard
  return (
    <div className="h-full w-full flex flex-col items-center overflow-auto bg-background p-8 md:p-12 lg:p-16 selection:bg-neutral-800 selection:text-white">
      <div className="w-full max-w-5xl space-y-12 duration-500 mt-8">
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Heading level="display">{workspace.title}</Heading>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex w-full gap-2">
          <div className="grow">
            <Input
              placeholder="Search boards..."
              prefix={<Search size={16} />}
            />
          </div>
          <Button variant="primary" size="lg">
            <Plus size={14} />
            Create Board
          </Button>
        </div>

        {/* Boards grid */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {status === "pending"
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-32 rounded-xl border border-neutral-border bg-neutral-surface/50 animate-pulse"
                  />
                ))
              : boardsList.map((board) => (
                  <BoardCard
                    key={board.id}
                    board={board}
                    onClick={() => runtime.goToBoard(board.id)}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BoardCard({
  board,
  onClick,
}: {
  board: { id: string; title: string };
  onClick: () => void;
}) {
  return (
    <Card
      onClick={onClick}
      variant="surface-interactive"
      className="space-y-3 cursor-pointer group p-4 hover:border-accent/50 hover:bg-neutral-surface transition-all duration-200"
    >
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl border border-neutral-border bg-background flex items-center justify-center text-neutral-content group-hover:bg-neutral-content group-hover:text-background transition-colors shrink-0">
          <Layout size={16} />
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-8 h-8 rounded-full border border-neutral-border flex items-center justify-center text-neutral-content-muted">
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
      <div>
        <Text weight="semibold">{board.title}</Text>
        <Text tone="subtle" size="sm">
          Click to open board
        </Text>
      </div>
    </Card>
  );
}
