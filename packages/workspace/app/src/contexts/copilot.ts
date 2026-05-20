import { UbentoCopilot } from "@/engine/copilot/copilot";
import { createContext, useContext } from "react";

export const CopilotContext = createContext<UbentoCopilot | undefined>(
  undefined,
);

export function useCopilot() {
  const copilot = useContext(CopilotContext);
  if (!copilot) {
    throw new Error("useCopilot must be used within CopilotContext");
  }
  return copilot;
}
