import { UbentoEngine } from "@/engine/app/engine";
import { createContext } from "react";

export const UbentoEngineContext = createContext<UbentoEngine | null>(null);
