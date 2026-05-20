import { IconKey } from "@/components/icon/icon";
import { UbentoLocation } from "../../../engine/app/location";

export type TabDefinition = {
  id: string;
  name: string | ((location: UbentoLocation) => string);
  icon: IconKey;
  component: React.ComponentType;
  enabled: (location: UbentoLocation) => boolean;
};
