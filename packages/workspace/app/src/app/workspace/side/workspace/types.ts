import { UbentoLocation } from "@/engine/app/location";
import { TabDefinition } from "../types";

export type WorkspaceTabDefinition = TabDefinition<{
  location: UbentoLocation;
  workspaceMode?: "edit" | "live";
}>;
