import { IconName } from "lucide-react/dynamic";
import { UbentoLocation } from "../../../engine/app/location";

export type TabDefinition<
  C extends { location: UbentoLocation } = { location: UbentoLocation },
> = {
  id: string;
  name: string | ((location: UbentoLocation) => string);
  icon: IconName;
  component: React.ComponentType;
  enabled?: (context: C) => boolean;
};
