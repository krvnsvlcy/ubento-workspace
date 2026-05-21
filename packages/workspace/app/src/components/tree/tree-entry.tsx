import clsx from "clsx";
import { Action, ActionProps } from "../action/action";
import { Icon, IconKey } from "../icon/icon";

export function TreeEntry({
  children,
  actions,
  icon,
  actionMode = "hover",
  className,
  active,
  ...props
}: {
  className?: string;
  icon?: IconKey;
  actions?: ActionProps[];
  actionMode?: "hidden" | "visible" | "hover";
  active?: boolean;
} & React.ComponentProps<"div">) {
  return (
    <div
      className={clsx(
        "group h-8 text-sm cursor-pointer flex items-center rounded-lg px-1",
        className,
        {
          "text-neutral-content-subtle hover:bg-current/7": !active,
          "bg-accent text-accent-contrast hover:bg-accent-hover font-medium":
            active,
        },
      )}
      {...props}
    >
      {icon ? (
        <div className="pl-2">
          <Icon strokeWidth={active ? 1.5 : 1.25} icon={icon} size={16} />
        </div>
      ) : (
        <></>
      )}
      <div className="px-2 grow overflow-hidden whitespace-nowrap truncate">
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
    </div>
  );
}
