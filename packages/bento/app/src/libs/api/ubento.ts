import { useBentoHost } from "@/contexts/host";

export function useUbento() {
  const host = useBentoHost();
  return host.ubento;
}
