import { useUbento } from "@/hooks/app-engine";
import { useActiveBoard, useEditingModuleId } from "@/hooks/workspace";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  TabSwitch,
} from "@ubento/bento.arlo-core";
import { Layout, X } from "lucide-react";
import { useEffect, useState } from "react";
import AutosizeInput from "react-input-autosize";

export type ViewMode = "code" | "split" | "preview";

interface HeaderProps {
  onClose: () => void;
  mode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
  saveStatus?: "idle" | "loading" | "success" | "error";
}

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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
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

export function Header({
  onClose,
  mode,
  onModeChange,
  saveStatus,
}: HeaderProps) {
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
                  {saveStatus && saveStatus !== "idle" && (
                    <>
                      {saveStatus === "loading" && (
                        <>
                          <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse" />
                          <span className="text-[11px] text-content-muted font-medium">
                            Syncing...
                          </span>
                        </>
                      )}
                      {saveStatus === "success" && (
                        <>
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          <span className="text-[11px] text-content-muted font-medium">
                            Saved
                          </span>
                        </>
                      )}
                      {saveStatus === "error" && (
                        <>
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          <span className="text-[11px] text-red-500 font-medium">
                            Error saving
                          </span>
                        </>
                      )}
                    </>
                  )}
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
