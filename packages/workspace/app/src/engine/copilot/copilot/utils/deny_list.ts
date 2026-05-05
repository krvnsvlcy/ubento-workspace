export const fileDenyWriteList: RegExp[] = [/^\.\/ubento\//, /^\.\/ubento$/];
export const fileDenyReadList: RegExp[] = [/^\.\/ubento\//, /^\.\/ubento$/];

export function normalizePath(path: string) {
  return path.replace(/\\/g, "/");
}

export function isFileWriteAllowed(path: string) {
  return !fileDenyWriteList.some((regex) => regex.test(normalizePath(path)));
}

export function isFileReadAllowed(path: string) {
  return !fileDenyReadList.some((regex) => regex.test(normalizePath(path)));
}
