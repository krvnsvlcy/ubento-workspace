import { useUbento, useUbentoEngine } from "@/engine/engine";
import {
  BaseStyle,
  BlockData,
  BoardData,
  ElementData,
} from "@ubento/bento.engine";
import cx from "clsx";
import {
  Box,
  ChevronRight,
  Code2,
  Grid,
  Layers,
  Layout,
  Move,
  Plus,
  Square,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { WorkspaceEngine } from "../engine/engine";

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
          className="text-neutral-content-muted transition-colors group-hover:text-accent-active"
        />
        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-content-muted group-hover:text-neutral-content">
          {title}
        </span>
        <div className="ml-auto">
          <ChevronRight
            size={14}
            className={`text-neutral-content-subtle transition-transform duration-300 ${
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
      <span className="text-xs font-medium text-neutral-content-muted">
        {label}
      </span>
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
    <div className="flex w-full items-center rounded-md px-2 py-1 transition-all focus-within:ring-1 focus-within:ring-accent/50">
      <input
        type="text"
        value={localValue}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full border-none bg-transparent text-xs text-neutral-content-subtle outline-none"
      />
    </div>
  );
}

export function NumberInput({
  value,
  onChange,
  unit,
  step = 1,
  min = -Infinity,
  max = Infinity,
}: {
  value?: number;
  onChange: (v: number | undefined) => void;
  unit?: string;
  step?: number;
  min?: number;
  max?: number;
}) {
  const [localValue, setLocalValue] = useState<string>(value?.toString() ?? "");
  const [isFocused, setIsFocused] = useState(false);
  const [mode, setMode] = useState<"view" | "edit">("view");

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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (mode === "edit") return;

    e.preventDefault();
    const initialValue = value ?? 0;
    let delta = 0;
    let initialized = false;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!moveEvent.movementX && !moveEvent.movementY) return;

      if (!initialized) {
        initialized = true;
        return;
      }

      delta += moveEvent.movementX;
      const newValue = initialValue + delta * step;
      const clamped = Math.min(Math.max(newValue, min), max);
      onChange(clamped);
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onClick={() => {
        if (mode === "view") setMode("edit");
      }}
      className={cx(
        "group flex items-center rounded-md px-2 py-0.5 transition-all border border-transparent",
        "bg-neutral-surface/30 hover:bg-neutral-surface/50",
        {
          "ring-1 ring-accent/30 border-accent/20":
            isFocused || mode === "edit",
          "cursor-ew-resize": mode === "view",
        },
      )}
    >
      <input
        type="number"
        value={localValue}
        onFocus={() => {
          setIsFocused(true);
          setMode("edit");
        }}
        onBlur={() => {
          setIsFocused(false);
          setMode("view");
        }}
        onChange={(e) => handleChange(e.target.value)}
        className={cx(
          "w-full border-none bg-transparent font-mono text-[11px] text-right outline-none text-neutral-content-subtle [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          {
            "pointer-events-none": mode === "view",
          },
        )}
      />
      {unit && (
        <span className="ml-1 text-[9px] font-bold text-neutral-content-muted select-none">
          {unit}
        </span>
      )}
      {value !== undefined && mode === "edit" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChange(undefined);
            setLocalValue("");
          }}
          className="ml-1 text-neutral-content-muted hover:text-destructive transition-colors"
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
      className="cursor-pointer rounded-md border-none px-2 py-1 text-xs text-neutral-content-subtle outline-none transition-colors"
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
        className="w-full border-none bg-transparent font-mono text-[10px] text-neutral-content-subtle outline-none"
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
  const [mode, setMode] = useState<"all" | "axis" | "individual">("all");
  const p = value || {};

  return (
    <div className="mt-2 px-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-content-subtle">
          Padding
        </span>
        <div className="flex gap-1 rounded-md bg-neutral-surface p-1">
          <button
            onClick={() => setMode("all")}
            className={cx("rounded p-1 transition-colors", {
              "bg-accent text-accent-contrast": mode === "all",
              "text-neutral-content-muted hover:text-neutral-content":
                mode !== "all",
            })}
            title="All sides"
          >
            <Square size={10} />
          </button>
          <button
            onClick={() => setMode("axis")}
            className={cx("rounded p-1 transition-colors", {
              "bg-accent text-accent-contrast": mode === "axis",
              "text-neutral-content-muted hover:text-neutral-content":
                mode !== "axis",
            })}
            title="Axis"
          >
            <Move size={10} />
          </button>
          <button
            onClick={() => setMode("individual")}
            className={cx("rounded p-1 transition-colors", {
              "bg-accent text-accent-contrast": mode === "individual",
              "text-neutral-content-muted hover:text-neutral-content":
                mode !== "individual",
            })}
            title="Individual"
          >
            <Grid size={10} />
          </button>
        </div>
      </div>

      <div className="mt-1">
        {mode === "all" && (
          <NumberInput
            value={p.top}
            onChange={(v) => onChange({ top: v, bottom: v, left: v, right: v })}
            unit="PX"
            min={0}
          />
        )}

        {mode === "axis" && (
          <div className="grid grid-cols-2 gap-2">
            <NumberInput
              value={p.top}
              onChange={(v) => onChange({ ...p, top: v, bottom: v })}
              unit="Y"
            />
            <NumberInput
              value={p.left}
              onChange={(v) => onChange({ ...p, left: v, right: v })}
              unit="X"
            />
          </div>
        )}

        {mode === "individual" && (
          <div className="grid grid-cols-2 gap-2">
            <NumberInput
              value={p.top}
              onChange={(v) => onChange({ ...p, top: v })}
              unit="T"
            />
            <NumberInput
              value={p.right}
              onChange={(v) => onChange({ ...p, right: v })}
              unit="R"
            />
            <NumberInput
              value={p.bottom}
              onChange={(v) => onChange({ ...p, bottom: v })}
              unit="B"
            />
            <NumberInput
              value={p.left}
              onChange={(v) => onChange({ ...p, left: v })}
              unit="L"
            />
          </div>
        )}
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
          <div className="rounded-lg p-1.5 text-accent">
            <Layout size={14} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase leading-none tracking-widest text-neutral-content-muted">
              Board
            </span>
            <span className="max-w-[180px] truncate text-sm font-bold text-neutral-content">
              {board.name || "Untitled Board"}
            </span>
          </div>
        </div>

        {onAddElement && (
          <button
            onClick={onAddElement}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-accent transition-colors"
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
          <div className="rounded-lg p-1.5 text-accent">
            {element.type === "stack" ? (
              <Layers size={14} />
            ) : (
              <Box size={14} />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase leading-none tracking-widest text-neutral-content-muted">
              {element.type}
            </span>
            <span className="max-w-[180px] truncate text-sm font-bold text-neutral-content">
              {id}
            </span>
          </div>
        </div>

        {element.type === "stack" && onAddElement && (
          <button
            onClick={onAddElement}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-accent transition-colors"
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
  controller: WorkspaceEngine;
}) {
  const host = useUbentoEngine();
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
            controller.setBlockModule(
              selectedId,
              v,
              element.moduleVersionId || "",
            );
          }}
        />
      </PropertyRow>
      <PropertyRow label="Version">
        <div className="flex w-full items-center gap-1">
          <TextInput
            value={element.moduleVersionId}
            onChange={(v) => {
              controller.setBlockModule(selectedId, element.moduleId, v);
            }}
          />
          {!isLoading &&
            moduleMetadata &&
            element.moduleVersionId !== moduleMetadata.latest_version_id && (
              <button
                onClick={() => {
                  controller.setBlockModule(
                    selectedId,
                    element.moduleId,
                    moduleMetadata.latest_version_id || "",
                  );
                }}
                className="shrink-0 rounded-md bg-accent px-2 py-1 text-[8px] font-bold uppercase tracking-tight text-accent-contrast"
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
          className="w-full rounded-md py-1.5 text-center text-[10px] font-bold uppercase tracking-wider text-neutral-content-subtle transition-colors hover:bg-neutral-surface"
        >
          Edit Props
        </button>
        <button
          onClick={() => {
            host.goToLocation({
              component: element.moduleId,
            });
          }}
          className="flex w-full items-center justify-center gap-2 rounded-md py-2 text-center text-[10px] font-bold uppercase tracking-wider text-accent transition-colors hover:bg-accent-surface"
        >
          <Code2 size={12} />
          Edit Component
        </button>
      </div>
    </Section>
  );
}
