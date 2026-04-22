import { makeEntityId } from "../id.js";

export type FileIdStruct = {
  code: string;
  driveBareId: string;
  fileBareId: string;
};

export function makeFileId({
  code,
  driveBareId,
  fileBareId,
}: FileIdStruct): string | undefined {
  return makeEntityId({
    code,
    bareId: `${driveBareId}_${fileBareId}`,
  });
}
export function parseFileId(fileId: string): FileIdStruct {
  const [code, driveBareId, fileBareId] = fileId.split("_", 3);

  return {
    code: code || "",
    driveBareId: driveBareId || "",
    fileBareId: fileBareId || "",
  };
}
