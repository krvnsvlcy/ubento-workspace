import { DynamicIcon, iconNames, type IconName } from "lucide-react/dynamic";

export { IconName, iconNames };

export function Icon({
  icon,
  size = 16,
  className = "",
  strokeWidth = 1.25,
  style,
}: {
  icon: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
}) {
  return (
    <DynamicIcon
      name={icon as any}
      size={size}
      strokeWidth={strokeWidth}
      absoluteStrokeWidth
      className={className}
      style={style}
    />
  );
}

export const standardIcons = {
  home: "home",
  workspace: "layout-dashboard",
  board: "panels-top-left",
  service: "bolt",
  module: "blocks",
  package: "package",
  assets: "shapes",
} satisfies Record<string, IconName>;
