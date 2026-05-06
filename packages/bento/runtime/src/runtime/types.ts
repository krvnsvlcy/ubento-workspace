import { BoardSpec, WorkspaceSpec } from "@ubento/bento.core";

export type ParsedSpec<T> =
  | {
      status: "valid";
      data: T;
    }
  | {
      status: "invalid";
      data: unknown;
      errors: string[];
    };

export type BentoBoardData = {
  id: string;
  title: string;
  spec: ParsedSpec<BoardSpec>;
};

export type BentoWorkspaceData = {
  id: string;
  title: string;
  slug: string;
  spec: ParsedSpec<WorkspaceSpec>;
};

export type BentoUserData = {
  name: string;
  email: string;
};
