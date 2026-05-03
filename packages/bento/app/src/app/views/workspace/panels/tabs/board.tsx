import { BoardStyle } from "@ubento/engine";
import { Layout, Palette, Settings2 } from "lucide-react";
import { WorkspaceEngine } from "../../engine/engine";
import {
  NumberInput,
  PaddingControl,
  PropertyRow,
  Section,
  Select,
  TextInput,
} from "../shared";

export function BoardTab({ controller }: { controller: WorkspaceEngine }) {
  const state = controller.useState();
  const currentBoardId = state.location?.board;
  const board = currentBoardId ? state.boards[currentBoardId] : null;

  if (!board) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center text-neutral-content-muted">
        <div className="text-sm font-bold text-neutral-content">
          No board selected
        </div>
        <p className="text-xs">Navigate to a board to edit its style.</p>
      </div>
    );
  }

  const updateBoardStyle = (style: Partial<BoardStyle>) => {
    if (!currentBoardId) return;
    controller.updateBoardStyle(currentBoardId, style);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto pb-8">
        <Section title="Layout" icon={Layout}>
          <PropertyRow label="Direction">
            <Select
              value={board.style?.direction || "column"}
              options={["row", "column"]}
              onChange={(v) => updateBoardStyle({ direction: v as any })}
            />
          </PropertyRow>
          <PropertyRow label="Gap">
            <NumberInput
              value={board.style?.gap}
              onChange={(v) => updateBoardStyle({ gap: v })}
              unit="px"
              min={0}
            />
          </PropertyRow>
        </Section>

        <Section title="Appearance" icon={Palette}>
          <PaddingControl
            value={board.style?.padding}
            onChange={(v) => updateBoardStyle({ padding: v })}
          />
        </Section>

        <Section title="Settings" icon={Settings2}>
          <PropertyRow label="Name">
            <TextInput
              value={board.name || ""}
              onChange={(v) =>
                currentBoardId && controller.setBoardName(currentBoardId, v)
              }
            />
          </PropertyRow>
          <PropertyRow label="Board ID">
            <span className="font-mono text-[10px] text-neutral-content-subtle select-all">
              {board.id}
            </span>
          </PropertyRow>
        </Section>
      </div>
    </div>
  );
}
