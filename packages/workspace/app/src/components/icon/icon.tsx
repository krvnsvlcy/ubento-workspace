import {
  Bolt,
  Box,
  CircleX,
  Home,
  LayoutGrid,
  PanelsTopLeft,
  Plus,
} from "lucide-react";

type LucideIcon = React.ComponentType<React.ComponentProps<"svg">>;

const iconMap = {
  plus: Plus,
  home: Home,
  workspace: LayoutGrid,
  board: PanelsTopLeft,
  assets: Box,
  service: Bolt,
} satisfies Record<string, LucideIcon>;

export type IconKey = keyof typeof iconMap;

export function Icon({
  icon,
  size = 16,
  className = "",
  strokeWidth = 1.25,
}: {
  icon: IconKey;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  const Icon = iconMap[icon] || CircleX;
  return (
    <Icon
      size={size}
      strokeWidth={strokeWidth}
      absoluteStrokeWidth
      className={className}
    />
  );
}
