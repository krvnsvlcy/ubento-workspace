import { useBentoHost } from "@/contexts/host";
import { UbentoSDK } from "@ubento/sdk";
import { createUbentoIamService } from "./iam";

export function useUbento() {
  const host = useBentoHost();
  return host.ubentoApi;
}

export function createUbentoService({ ubentoSdk }: { ubentoSdk: UbentoSDK }) {
  return {
    iam: createUbentoIamService({ ubentoSdk }),
  };
}
