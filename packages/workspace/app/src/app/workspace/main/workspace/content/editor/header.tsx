import { useUbento } from "@/hooks/app-engine";
import { useActiveBoard, useEditingModuleId } from "@/hooks/workspace";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Spinner,
  TabSwitch,
  Tooltip,
} from "@ubento/bento.arlo-core";
import { Layout, X } from "lucide-react";
import { useEffect, useState } from "react";
import AutosizeInput from "react-input-autosize";
import { ModuleSourceStatus } from "./use-module-source";

export type ViewMode = "code" | "split" | "preview";

function NameInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <div className="flex items-center hover:bg-neutral-500/10 focus-within:bg-neutral-500/10 h-8 px-2 rounded-xl transition-colors">
      <AutosizeInput
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setText(e.target.value)
        }
        onBlur={() => {
          if (text.trim() && text !== value) {
            onChange(text);
          } else {
            setText(value);
          }
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
          } else if (e.key === "Escape") {
            setText(value);
            e.currentTarget.blur();
          }
        }}
        placeholder="Untitled"
        inputClassName="bg-transparent border-none outline-none focus:ring-0 text-sm font-medium p-0 text-foreground"
      />
    </div>
  );
}

function StatusIndicator({
  status,
  isDirty,
  error,
}: {
  status: ModuleSourceStatus;
  isDirty: boolean;
  error?: string | null;
}) {
  if (status === "loading" || status === "idle") {
    return (
      <div
        className="flex items-center gap-2 bg-surface text-content px-2 rounded-full"
        data-tone="neutral"
      >
        <Spinner className="size-3" />
        <span className="text-[11px] font-medium">Loading</span>
      </div>
    );
  }

  if (status === "saving") {
    return (
      <div
        className="flex items-center gap-2 bg-surface text-content px-2 rounded-full"
        data-tone="neutral"
      >
        <Spinner className="size-3" />
        <span className="text-[11px] font-medium">Saving</span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <Tooltip
        delayDuration={200}
        sideOffset={4}
        content={error || "Unknown error"}
      >
        <div
          className="flex items-center gap-2 bg-surface text-content px-2 rounded-full cursor-help"
          data-tone="destructive"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          <span className="text-[11px] font-medium">Errored</span>
        </div>
      </Tooltip>
    );
  }

  if (isDirty) {
    return (
      <div
        className="flex items-center gap-2 bg-surface text-content px-2 rounded-full"
        data-tone="info"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-current" />
        <span className="text-[11px] font-medium">Modified</span>
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-2 bg-surface text-content px-2 rounded-full"
      data-tone="success"
    >
      <div className="w-1.5 h-1.5 rounded-full bg-current" />
      <span className="text-[11px] font-medium">Up to date</span>
    </div>
  );
}

export function Header({
  onClose,
  mode,
  isDirty,
  onModeChange,
  moduleStatus,
  error,
}: {
  onClose: () => void;
  mode: ViewMode;
  isDirty: boolean;
  onModeChange: (mode: ViewMode) => void;
  moduleStatus: ModuleSourceStatus;
  error?: string | null;
}) {
  const board = useActiveBoard();
  const ubento = useUbento();
  const editingModuleId = useEditingModuleId();
  const { data: moduleData } = ubento.module.useModule(editingModuleId || "", {
    enabled: !!editingModuleId,
  });

  return (
    <div className="flex items-center justify-between p-3 border-b border-border shrink-0">
      <div className="flex items-center">
        <Breadcrumb>
          <BreadcrumbList>
            {board && (
              <>
                <BreadcrumbItem>
                  <Button onClick={onClose} variant="ghost" className="gap-2">
                    <Layout size={16} />
                    {board.title}
                  </Button>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage>
                <div className="flex items-center gap-2">
                  <NameInput
                    value={moduleData?.name || ""}
                    onChange={(newName) => {
                      console.log("Renaming module to:", newName);
                    }}
                  />
                  <StatusIndicator
                    status={moduleStatus}
                    isDirty={isDirty}
                    error={error}
                  />
                </div>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-3">
        <TabSwitch<ViewMode>
          options={[
            { key: "code", label: "Code" },
            { key: "split", label: "Split" },
            { key: "preview", label: "Preview" },
          ]}
          value={mode}
          onChange={onModeChange}
        />
        <Button size="icon" variant="ghost" onClick={onClose}>
          <X size={16} />
        </Button>
      </div>
    </div>
  );
}
