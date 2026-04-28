import type { UbentoSDK } from "@ubento/sdk";

export type BaseBentoLocation<
  V extends string = string,
  P = Record<string, string>,
> = {
  view: V;
  params: P;
};
export type BentoLocation =
  | BaseBentoLocation<"home">
  | BaseBentoLocation<"workspaces">
  | BaseBentoLocation<"workspace", { slug: string; boardId?: string }>
  | BaseBentoLocation<"builder", { moduleId: string }>;

export type BentoSession = {
  userId: string;
  teamId: string;
  email: string;
  name: string;
  picture?: string;
};

export type BentoHostState = {
  session: BentoSession;
  location: BentoLocation;
  ubento: UbentoSDK;
  iframeUrl: string;
  componentIframeUrl: string;
  moduleUrlTemplate: string;
};

export type BentoHostStore = BentoHostState & {
  // navigation
  goToLocation: (location: BentoLocation) => void;
};

export type BentoHost = BentoHostStore;
