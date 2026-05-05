import { LucideIcon } from "lucide-react";
import { UbentoLocation } from "../../../engine/location";

export type TabDefinition = {
  id: string;
  name: string | ((location: UbentoLocation) => string);
  icon: LucideIcon;
  component: React.ComponentType;
  enabled: (location: UbentoLocation) => boolean;
};
