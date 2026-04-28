import { normalizePath } from "@elllphnt/backend";

export const fileDenyWriteList: RegExp[] = [/^\.\/elll\//, /^\.\/elll$/];
export const fileDenyReadList: RegExp[] = [/^\.\/elll\//, /^\.\/elll$/];

export function isFileWriteAllowed(path: string) {
  return !fileDenyWriteList.some((regex) => regex.test(normalizePath(path)));
}

export function isFileReadAllowed(path: string) {
  return !fileDenyReadList.some((regex) => regex.test(normalizePath(path)));
}
