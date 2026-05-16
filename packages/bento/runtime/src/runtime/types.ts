import { BoardSpec, WorkspaceSpec } from "@ubento/bento.core";

export type SpecIssue = {
  location: string[];
  message: string;
};
export type ParsedSpec<T> =
  | {
      isValid: true;
      data: T;
      issues?: SpecIssue[];
    }
  | {
      isValid: false;
      data: unknown;
      issues: SpecIssue[];
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
