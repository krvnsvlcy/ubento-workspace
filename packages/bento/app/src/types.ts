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
  | BaseBentoLocation<"apps">
  | BaseBentoLocation<"app", { slug: string }>;

export type BentoSession = {
  userId: string;
  teamId: string;
};

export interface BentoHost {
  session: BentoSession;
  ubento: UbentoSDK;
  iframeUrl: string;
  // navigation
  goToLocation: (location: BentoLocation) => void;
}
