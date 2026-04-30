import { BaseStyle, BlockData, BoardStyle, StackStyle } from "@ubento/engine";
import { Eye, Layout, Palette, Settings2 } from "lucide-react";
import { useStore } from "zustand";
import { WorkspaceController } from "../../controller";
import {
  BoardHeader,
  ModuleSection,
  NumberInput,
  PaddingControl,
  PanelHeader,
  PropertyRow,
  Section,
  Select,
  TextInput,
} from "../shared";

export function BoardTab({ controller }: { controller: WorkspaceController }) {
  const state = useStore(controller);
  const currentBoardId = state.location?.boardId;
  const board = currentBoardId ? state.boards[currentBoardId] : null;
  const selectedId = state.selection?.[0];
  const element = selectedId && board ? board.elements[selectedId] : null;

  if (!element) {
    if (!board) {
      return (
        <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center text-neutral-content-muted">
          <div className="flex h-16 w-16 items-center justify-center rounded-full">
            <Eye size={24} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-neutral-content">No selection</h3>
            <p className="mt-1 text-xs">
              Select an element on the board to edit its properties.
            </p>
          </div>
        </div>
      );
    }

    const updateBoardStyle = (style: Partial<BoardStyle>) => {
      if (!currentBoardId) return;
      controller.getState().setBoardStyle(currentBoardId, {
        ...board.style,
        ...style,
      });
    };

    const handleAddElement = (containerId: string) => {
      if (!currentBoardId) return;
      controller.getState().addElement(currentBoardId, containerId, {
        type: "stack",
        content: [],
        style: {
          width: 100,
          height: 100,
        },
      });
    };

    return (
      <div className="flex h-full flex-col">
        <BoardHeader
          board={board}
          onAddElement={() => handleAddElement("root")}
        />
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
            <PropertyRow label="Board ID">
              <span className="font-mono text-[10px] text-neutral-content-subtle">
                {board.id}
              </span>
            </PropertyRow>
            <PropertyRow label="Name">
              <TextInput
                value={board.name}
                onChange={(v) => {
                  // We might need a setBoardName action too, but for now just showing it
                }}
              />
            </PropertyRow>
          </Section>
        </div>
      </div>
    );
  }

  const updateStyle = (style: Partial<BaseStyle | StackStyle>) => {
    if (!selectedId || !element) return;
    controller.getState().setElementStyle(selectedId, {
      ...element.style,
      ...style,
    });
  };

  const handleAddElement = (containerId: string) => {
    if (!currentBoardId) return;
    controller.getState().addElement(currentBoardId, containerId, {
      type: "stack",
      content: [],
      style: {
        width: 100,
        height: 100,
      },
    });
  };

  return (
    <div className="flex h-full flex-col">
      <PanelHeader
        element={element}
        id={selectedId!}
        onAddElement={() => handleAddElement(selectedId!)}
      />

      <div className="flex-1 overflow-y-auto pb-8">
        <Section title="Layout" icon={Layout}>
          <PropertyRow label="Width">
            <NumberInput
              value={element.style?.width}
              onChange={(v) => updateStyle({ width: v })}
              unit="px"
            />
          </PropertyRow>
          <PropertyRow label="Height">
            <NumberInput
              value={element.style?.height}
              onChange={(v) => updateStyle({ height: v })}
              unit="px"
            />
          </PropertyRow>
          <PropertyRow label="Flex">
            <NumberInput
              value={element.style?.flex}
              onChange={(v) => updateStyle({ flex: v })}
            />
          </PropertyRow>
          {element.type === "stack" && (
            <>
              <PropertyRow label="Direction">
                <Select
                  value={element.style.direction || "column"}
                  options={["row", "column"]}
                  onChange={(v) => updateStyle({ direction: v as any })}
                />
              </PropertyRow>
              <PropertyRow label="Gap">
                <NumberInput
                  value={element.style.gap}
                  onChange={(v) => updateStyle({ gap: v })}
                  unit="px"
                />
              </PropertyRow>
              <PropertyRow label="Justify">
                <Select
                  value={element.style.justify || "start"}
                  options={[
                    "start",
                    "end",
                    "center",
                    "space-between",
                    "space-around",
                  ]}
                  onChange={(v) => updateStyle({ justify: v as any })}
                />
              </PropertyRow>
            </>
          )}
        </Section>

        <Section title="Appearance" icon={Palette}>
          <PaddingControl
            value={element.style?.padding}
            onChange={(v) => updateStyle({ padding: v })}
          />
        </Section>

        {element.type === "block" && (
          <ModuleSection
            element={element as BlockData}
            selectedId={selectedId!}
            controller={controller}
          />
        )}

        <Section title="Settings" icon={Settings2}>
          <PropertyRow label="ID">
            <span className="font-mono text-[10px] text-neutral-content-subtle">
              {selectedId}
            </span>
          </PropertyRow>
          <PropertyRow label="Type">
            <span className="text-[10px] font-bold uppercase text-neutral-content-subtle">
              {element.type}
            </span>
          </PropertyRow>
          <div className="mt-4 px-4">
            <button
              onClick={() =>
                currentBoardId &&
                selectedId &&
                controller.getState().deleteElement(currentBoardId, selectedId)
              }
              className="w-full rounded-md py-2 text-[10px] font-bold uppercase tracking-wider text-destructive transition-colors hover:bg-destructive-surface"
            >
              Delete Element
            </button>
          </div>
        </Section>
      </div>
    </div>
  );
}
