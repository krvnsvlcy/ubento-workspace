import { WorkspaceSpec } from "../spec";

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

export function getSpecOrDefault<T>(parsed: ParsedSpec<T>, defaultValue: T): T {
  if (parsed.isValid) {
    return parsed.data;
  } else {
    return defaultValue;
  }
}
