import { IconKey } from "@/components/icon/icon";
import { UbentoLocation } from "../../../engine/app/location";

export type TabDefinition<
  C extends { location: UbentoLocation } = { location: UbentoLocation },
> = {
  id: string;
  name: string | ((location: UbentoLocation) => string);
  icon: IconKey;
  component: React.ComponentType;
  enabled?: (context: C) => boolean;
};
