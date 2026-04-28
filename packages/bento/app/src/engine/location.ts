export type BaseUbentoLocation<
  V extends string = string,
  P = Record<string, string>,
> = {
  view: V;
  params: P;
};
export type UbentoLocation =
  | BaseUbentoLocation<"home">
  | BaseUbentoLocation<"workspaces">
  | BaseUbentoLocation<"workspace", { slug: string; boardId?: string }>
  | BaseUbentoLocation<"builder", { moduleId: string }>;
