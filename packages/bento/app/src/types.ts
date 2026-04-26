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
  | BaseBentoLocation<"workspace", { slug: string; boardId?: string }>;

export type BentoSession = {
  userId: string;
  teamId: string;
  email: string;
  name: string;
  picture?: string;
};

export interface BentoHost {
  session: BentoSession;
  ubento: UbentoSDK;
  iframeUrl: string;
  moduleUrlTemplate: string;
  // navigation
  goToLocation: (location: BentoLocation) => void;
}

