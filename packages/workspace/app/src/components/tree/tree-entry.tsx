import { Spinner } from "@ubento/bento.arlo-core";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Action, ActionProps } from "../action/action";
import { Icon, IconKey } from "../icon/icon";
import { useTreeDepth } from "./tree-indent";

export function TreeEntry({
  children,
  actions,
  icon,
  actionMode = "hover",
  className,
  active,
  isContainer,
  onMouseEnter,
  onMouseLeave,
  isOpen,
  onOpenChange,
  loading,
  error,
  ...props
}: {
  className?: string;
  icon?: IconKey | React.ReactNode;
  actions?: ActionProps[];
  actionMode?: "hidden" | "visible" | "hover";
  active?: boolean;
  isContainer?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  loading?: boolean;
  error?: string;
} & React.ComponentProps<"div">) {
  const depth = useTreeDepth();
  const [isHovered, setIsHovered] = useState(false);

  let iconNode = (
    <div
      style={{
        width: 24,
        height: 24,
      }}
      className="flex items-center justify-center p-1"
    >
      {typeof icon === "string" ? (
        <Icon
          strokeWidth={active ? 1.5 : 1.25}
          icon={icon as IconKey}
          size={16}
        />
      ) : (
        icon
      )}
    </div>
  );

  if (loading) {
    iconNode = (
      <div
        style={{
          width: 24,
          height: 24,
        }}
        className="flex items-center justify-center p-1"
      >
        <Spinner className="w-4 h-4 text-content-muted" />
      </div>
    );
  }

  if (isContainer && isHovered && !loading) {
    iconNode = (
      <button
        style={{
          height: 24,
          width: 24,
        }}
        className="flex items-center justify-center text-current/80 hover:bg-current/10 hover:text-current cursor-pointer rounded-lg"
        onClick={(e) => {
          e.stopPropagation();
          onOpenChange?.(!isOpen);
        }}
      >
        <ChevronRight
          strokeWidth={2}
          size={16}
          className="transition-all duration-150"
          style={{
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
          }}
        />
      </button>
    );
  }

  return (
    <div
      onMouseEnter={(e) => {
        setIsHovered(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        onMouseLeave?.(e);
      }}
      className={clsx(
        "relative w-full group h-8 text-sm cursor-pointer flex items-center rounded-xl px-1 text-content transition-colors",
        className,
        {
          "bg-current/0 hover:bg-current/5": !active,
          "bg-current/7 hover:bg-current/9": active,
        },
      )}
      data-tone={error ? "destructive" : undefined}
      {...props}
    >
      {depth ? <div style={{ width: depth * 12, flexShrink: 0 }} /> : <></>}
      {icon || loading ? (
        <div
          className="flex items-center justify-center"
          style={{ flexShrink: 0 }}
        >
          {iconNode}
        </div>
      ) : (
        <></>
      )}
      <div className="px-1 grow overflow-hidden whitespace-nowrap truncate">
        {children}
      </div>

      {actions?.length && (
        <div
          className={clsx("items-center gap-1", {
            "hidden group-hover:flex": actionMode === "hover",
            flex: actionMode === "visible",
          })}
        >
          {actions.map((action, index) => (
            <Action key={index} {...action} />
          ))}
        </div>
      )}

      {error && (
        <div
          data-tone="destructive"
          style={{
            position: "absolute",
            bottom: -4,
            left: 0,
            right: 0,
            transform: "translateY(100%)",
            zIndex: 10,
          }}
          className="text-xs bg-content/90 text-contrast font-medium leading-normal px-2 py-1 rounded-md"
        >
          {error}
        </div>
      )}
    </div>
  );
}
