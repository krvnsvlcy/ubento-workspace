import { useBentoHost } from "@/contexts/host";
import { useModule } from "@/hooks/module";
import {
  BaseStyle,
  BlockData,
  BoardData,
  BoardStyle,
  ElementData,
  StackStyle,
} from "@ubento/engine";
import {
  Box,
  ChevronRight,
  Code2,
  Eye,
  Globe,
  Layers,
  Layout,
  Palette,
  Plus,
  Puzzle,
  Settings2,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import { WorkspaceController } from "../controller";

export function ControlPanel({
  controller,
}: {
  controller: WorkspaceController;
}) {
  const state = useStore(controller);
  const [activeTab, setActiveTab] = useState<"context" | "workspace">(
    "context",
  );
  const currentBoardId = state.location?.boardId;
  const board = currentBoardId ? state.boards[currentBoardId] : null;
  const selectedId = state.selection?.[0];
  const element = selectedId && board ? board.elements[selectedId] : null;

  const renderTabs = () => (
    <div className="flex p-1">
      <button
        onClick={() => setActiveTab("context")}
        className={`flex flex-1 items-center justify-center gap-2 rounded-md py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${
          activeTab === "context"
            ? "text-primary-500"
            : "text-foreground-500 hover:text-foreground-300"
        }`}
      >
        <Layout size={12} />
        Context
      </button>
      <button
        onClick={() => setActiveTab("workspace")}
        className={`flex flex-1 items-center justify-center gap-2 rounded-md py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${
          activeTab === "workspace"
            ? "text-primary-500"
            : "text-foreground-500 hover:text-foreground-300"
        }`}
      >
        <Globe size={12} />
        Workspace
      </button>
    </div>
  );

  const renderContent = () => {
    if (activeTab === "workspace") {
      return (
        <div className="flex h-full flex-col">
          {renderTabs()}
          <div className="flex-1 overflow-y-auto">
            <WorkspaceSettings controller={controller} />
          </div>
        </div>
      );
    }

    if (!element) {
      if (!board) {
        return (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center text-foreground-400">
            <div className="flex h-16 w-16 items-center justify-center rounded-full">
              <Eye size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">
                No selection
              </h3>
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
          {renderTabs()}
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
                <span className="font-mono text-[10px] text-foreground-500">
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
        {renderTabs()}
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
              <span className="font-mono text-[10px] text-foreground-500">
                {selectedId}
              </span>
            </PropertyRow>
            <PropertyRow label="Type">
              <span className="text-[10px] font-bold uppercase text-foreground-500">
                {element.type}
              </span>
            </PropertyRow>
            <div className="mt-4 px-4">
              <button
                onClick={() =>
                  currentBoardId &&
                  selectedId &&
                  controller
                    .getState()
                    .deleteElement(currentBoardId, selectedId)
                }
                className="w-full rounded-md py-2 text-[10px] font-bold uppercase tracking-wider text-red-500 transition-colors"
              >
                Delete Element
              </button>
            </div>
          </Section>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full" style={{ padding: 6 }}>
      <div
        className="h-full overflow-hidden rounded-2xl"
        style={{
          background: "var(--page-background)",
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
}

function WorkspaceSettings({
  controller,
}: {
  controller: WorkspaceController;
}) {
  const state = useStore(controller);
  const workspace = state.workspace;

  if (!workspace) return null;

  const updateWorkspace = (data: Partial<typeof workspace>) => {
    controller.getState().updateWorkspace(data);
  };

  const handleAddService = () => {
    const serviceName = prompt("Enter service name:");
    if (!serviceName) return;
    const moduleId = prompt("Enter module ID:");
    if (!moduleId) return;

    const services = { ...workspace.services };
    services[serviceName] = {
      moduleId,
      moduleVersionId: "latest",
      args: {},
    };
    updateWorkspace({ services });
  };

  const handleRemoveService = (name: string) => {
    const services = { ...workspace.services };
    delete services[name];
    updateWorkspace({ services });
  };

  return (
    <div className="pb-8">
      <Section title="General" icon={Settings2}>
        <PropertyRow label="Workspace Name">
          <TextInput
            value={workspace.name}
            onChange={(v) => updateWorkspace({ name: v })}
          />
        </PropertyRow>
        <PropertyRow label="Slug">
          <span className="font-mono text-[10px] text-foreground-500">
            {workspace.slug}
          </span>
        </PropertyRow>
        <PropertyRow label="Home Board">
          <Select
            value={workspace.homeBoardId || ""}
            options={Object.values(state.boards).map((b) => b.id)}
            onChange={(v) => updateWorkspace({ homeBoardId: v })}
          />
        </PropertyRow>
      </Section>

      <Section title="Services" icon={Puzzle}>
        <div className="px-4 py-2">
          {Object.entries(workspace.services || {}).map(([name, data]) => (
            <div key={name} className="mb-2 flex flex-col rounded-md p-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-foreground">
                  {name}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRemoveService(name)}
                    className="text-foreground-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              <div className="mt-1 flex flex-col gap-1 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider text-foreground-500">
                    Module
                  </span>
                  <span className="text-[10px] font-mono text-foreground-300">
                    {data.moduleId}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider text-foreground-500">
                    Version
                  </span>
                  <span className="text-[10px] font-mono text-foreground-300">
                    {data.moduleVersionId || "latest"}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={handleAddService}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-md py-2 text-[10px] font-bold uppercase tracking-wider text-foreground-400 transition-colors hover:text-primary-500"
          >
            <Plus size={12} />
            Add Service
          </button>
        </div>
      </Section>

      <Section title="Info" icon={Globe}>
        <PropertyRow label="Workspace ID">
          <span className="font-mono text-[10px] text-foreground-500">
            {workspace.id}
          </span>
        </PropertyRow>
        <PropertyRow label="Team ID">
          <span className="font-mono text-[10px] text-foreground-500">
            {workspace.teamId}
          </span>
        </PropertyRow>
      </Section>
    </div>
  );
}

// Sub-components

function ModuleSection({
  element,
  selectedId,
  controller,
}: {
  element: BlockData;
  selectedId: string;
  controller: WorkspaceController;
}) {
  const host = useBentoHost();
  const { data: moduleMetadata, isLoading } = useModule(element.moduleId);

  return (
    <Section title="Module" icon={Box}>
      <PropertyRow label="Module ID">
        <TextInput
          value={element.moduleId}
          onChange={(v) => {
            controller
              .getState()
              .setBlockModule(selectedId, v, element.moduleVersionId || "");
          }}
        />
      </PropertyRow>
      <PropertyRow label="Version">
        <div className="flex w-full items-center gap-1">
          <TextInput
            value={element.moduleVersionId}
            onChange={(v) => {
              controller
                .getState()
                .setBlockModule(selectedId, element.moduleId, v);
            }}
          />
          {!isLoading &&
            moduleMetadata &&
            element.moduleVersionId !== moduleMetadata.latest_version_id && (
              <button
                onClick={() => {
                  controller
                    .getState()
                    .setBlockModule(
                      selectedId,
                      element.moduleId,
                      moduleMetadata.latest_version_id,
                    );
                }}
                className="shrink-0 rounded-md px-2 py-1 text-[8px] font-bold uppercase tracking-tight text-white"
                title={`Update to latest: ${moduleMetadata.latest_version_id}`}
              >
                Update
              </button>
            )}
        </div>
      </PropertyRow>
      <div className="mt-2 flex flex-col gap-2 px-4">
        <button
          onClick={() => {
            console.log("Editing props for", selectedId);
          }}
          className="w-full rounded-md py-1.5 text-center text-[10px] font-bold uppercase tracking-wider text-foreground-300 transition-colors"
        >
          Edit Props
        </button>
        <button
          onClick={() => {
            host.goToLocation({
              view: "builder",
              params: { moduleId: element.moduleId },
            });
          }}
          className="flex w-full items-center justify-center gap-2 rounded-md py-2 text-center text-[10px] font-bold uppercase tracking-wider text-primary-500 transition-colors"
        >
          <Code2 size={12} />
          Edit Component
        </button>
      </div>
    </Section>
  );
}

function PanelHeader({
  element,
  id,
  onAddElement,
}: {
  element: ElementData;
  id: string;
  onAddElement?: () => void;
}) {
  return (
    <div className="sticky top-0 z-10 px-4 py-4 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-lg p-1.5 text-primary-500">
            {element.type === "stack" ? (
              <Layers size={14} />
            ) : (
              <Box size={14} />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase leading-none tracking-widest text-foreground-400">
              {element.type}
            </span>
            <span className="max-w-[180px] truncate text-sm font-bold text-foreground">
              {id}
            </span>
          </div>
        </div>

        {element.type === "stack" && onAddElement && (
          <button
            onClick={onAddElement}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-primary-500 transition-colors"
            title="Add Element"
          >
            <Plus size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

function BoardHeader({
  board,
  onAddElement,
}: {
  board: BoardData;
  onAddElement?: () => void;
}) {
  return (
    <div className="sticky top-0 z-10 px-4 py-4 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-lg p-1.5 text-orange-500">
            <Layout size={14} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase leading-none tracking-widest text-foreground-400">
              Board
            </span>
            <span className="max-w-[180px] truncate text-sm font-bold text-foreground">
              {board.name || "Untitled Board"}
            </span>
          </div>
        </div>

        {onAddElement && (
          <button
            onClick={onAddElement}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-primary-500 transition-colors"
            title="Add Element"
          >
            <Plus size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

function PaddingControl({
  value,
  onChange,
}: {
  value?: BaseStyle["padding"];
  onChange: (v: BaseStyle["padding"]) => void;
}) {
  return (
    <div className="mt-2 px-4">
      <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-500">
        Padding
      </span>
      <div className="mt-1 grid grid-cols-2 gap-2">
        <NumberInput
          value={value?.top}
          onChange={(v) => onChange({ ...value, top: v })}
          unit="T"
        />
        <NumberInput
          value={value?.right}
          onChange={(v) => onChange({ ...value, right: v })}
          unit="R"
        />
        <NumberInput
          value={value?.bottom}
          onChange={(v) => onChange({ ...value, bottom: v })}
          unit="B"
        />
        <NumberInput
          value={value?.left}
          onChange={(v) => onChange({ ...value, left: v })}
          unit="L"
        />
      </div>
    </div>
  );
}

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex flex-col">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-4 py-3 transition-colors"
      >
        <Icon
          size={14}
          className="text-foreground-400 transition-colors group-hover:text-primary-400"
        />
        <span className="text-[11px] font-bold uppercase tracking-wider text-foreground-400 group-hover:text-foreground-200">
          {title}
        </span>
        <div className="ml-auto">
          <ChevronRight
            size={14}
            className={`text-foreground-500 transition-transform duration-300 ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PropertyRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-1.5">
      <span className="text-xs font-medium text-foreground-400">{label}</span>
      <div className="flex max-w-[60%] flex-1 justify-end">{children}</div>
    </div>
  );
}

function NumberInput({
  value,
  onChange,
  unit,
}: {
  value?: number;
  onChange: (v: number | undefined) => void;
  unit?: string;
}) {
  const [localValue, setLocalValue] = useState<string>(value?.toString() ?? "");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setLocalValue(value?.toString() ?? "");
    }
  }, [value, isFocused]);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    if (newValue === "") {
      onChange(undefined);
      return;
    }
    const num = Number(newValue);
    if (!isNaN(num)) {
      onChange(num);
    }
  };

  return (
    <div className="group flex items-center rounded-md px-2 py-1 transition-all focus-within:ring-1 focus-within:ring-primary-500/50">
      <input
        type="number"
        value={localValue}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full border-none bg-transparent font-mono text-xs text-right outline-none text-foreground-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      {unit && (
        <span className="ml-1 text-[10px] font-medium text-foreground-500">
          {unit}
        </span>
      )}
      {value !== undefined && (
        <button
          onClick={() => {
            onChange(undefined);
            setLocalValue("");
          }}
          className="ml-1 text-foreground-500 opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100"
          title="Clear"
        >
          <X size={10} />
        </button>
      )}
    </div>
  );
}

function TextInput({
  value,
  onChange,
}: {
  value?: string;
  onChange: (v: string) => void;
}) {
  const [localValue, setLocalValue] = useState<string>(value ?? "");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setLocalValue(value ?? "");
    }
  }, [value, isFocused]);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex w-full items-center rounded-md px-2 py-1 transition-all focus-within:ring-1 focus-within:ring-primary-500/50">
      <input
        type="text"
        value={localValue}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full border-none bg-transparent text-xs text-foreground-200 outline-none"
      />
    </div>
  );
}

function Select({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="cursor-pointer rounded-md border-none px-2 py-1 text-xs text-foreground-200 outline-none transition-colors"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt.charAt(0).toUpperCase() + opt.slice(1)}
        </option>
      ))}
    </select>
  );
}

function ColorInput({
  value,
  onChange,
}: {
  value?: string;
  onChange: (v: string) => void;
}) {
  const [localValue, setLocalValue] = useState<string>(value ?? "");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setLocalValue(value ?? "");
    }
  }, [value, isFocused]);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex w-full items-center gap-2 rounded-md px-2 py-1">
      <div
        className="h-4 w-4 shrink-0 rounded-sm"
        style={{ background: localValue || "transparent" }}
      />
      <input
        type="text"
        value={localValue}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full border-none bg-transparent font-mono text-[10px] text-foreground-200 outline-none"
        placeholder="#000000"
      />
    </div>
  );
}
