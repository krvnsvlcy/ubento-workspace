import {
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ubento/bento.arlo-core";
import { IconName, iconNames } from "lucide-react/dynamic";
import { useMemo, useState } from "react";
import { Icon } from "./icon.js";

interface IconPickerProps {
  value: IconName;
  onChange: (value: IconName) => void;
  className?: string;
}

export function IconPicker({ value, onChange, className }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredIcons = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) {
      // Return first 100 icons as default options
      return iconNames.slice(0, 100);
    }
    const matches: IconName[] = [];
    for (const name of iconNames) {
      if (name.toLowerCase().includes(query)) {
        matches.push(name);
        if (matches.length >= 100) break;
      }
    }
    return matches;
  }, [search]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border border-border bg-surface hover:bg-surface-hover transition-all text-content cursor-pointer text-sm font-medium ${className}`}
        >
          <div className="flex items-center justify-center h-6 w-6 rounded-lg bg-base/10 text-base shrink-0">
            <Icon icon={value} size={16} />
          </div>
          <span className="capitalize truncate max-w-[120px]">
            {value || "select icon"}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-72 p-3 space-y-3 flex flex-col"
        align="start"
      >
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search icons..."
          className="w-full text-sm"
          autoFocus
        />
        <div className="h-60 overflow-y-auto pr-1">
          {filteredIcons.length === 0 ? (
            <div className="h-full flex items-center justify-center text-content-muted text-xs">
              No icons found
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-1.5 p-0.5">
              {filteredIcons.map((iconName) => {
                const isSelected = value === iconName;
                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => {
                      onChange(iconName);
                      setOpen(false);
                    }}
                    className={`flex items-center justify-center h-10 w-10 rounded-lg border transition-all cursor-pointer hover:scale-105 ${
                      isSelected
                        ? "border-base bg-base/5 text-base shadow-sm"
                        : "border-transparent bg-surface hover:bg-surface-hover text-content-muted hover:text-content"
                    }`}
                    title={iconName}
                  >
                    <Icon icon={iconName} size={18} />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
