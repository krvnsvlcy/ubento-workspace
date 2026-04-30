import { useBentoHost } from "@/contexts/host";
import { useUbento } from "@/engine/engine";
import { BaseStyle, BlockData, BoardData, ElementData } from "@ubento/engine";
import {
  Box,
  ChevronRight,
  Code2,
  Layers,
  Layout,
  Plus,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { WorkspaceController } from "../controller";

export function Section({
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

export function PropertyRow({
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

export function TextInput({
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

export function NumberInput({
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

export function Select({
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

export function ColorInput({
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

export function PaddingControl({
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

export function BoardHeader({
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

export function PanelHeader({
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

export function ModuleSection({
  element,
  selectedId,
  controller,
}: {
  element: BlockData;
  selectedId: string;
  controller: WorkspaceController;
}) {
  const host = useBentoHost();
  const ubento = useUbento();
  const { data: moduleMetadata, isLoading } = ubento.module.useModule(
    element.moduleId,
  );

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
