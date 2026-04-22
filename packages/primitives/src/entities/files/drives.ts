import { EntityName, getEntityByName } from "../entities.js";

const driveToFileMap = {
  workspace: "workspace_file",
  commit: "commit_file",
  drive: "drive_file",
} satisfies Partial<Record<EntityName, EntityName>>;
const driveCodeToFileCodeMap = Object.fromEntries(
  Object.entries(driveToFileMap).map(([driveName, filename]) => {
    const driveEntity = getEntityByName(driveName as EntityName);
    const fileEntity = getEntityByName(filename as EntityName);
    if (!driveEntity) {
      throw new Error(`Drive entity not found: ${driveName}`);
    }
    if (!fileEntity) {
      throw new Error(`File entity not found: ${filename}`);
    }
    return [driveEntity.code, fileEntity.code];
  })
);

const fileToDriveMap = Object.fromEntries(
  Object.entries(driveToFileMap).map(([key, value]) => [value, key])
) as Partial<Record<EntityName, EntityName>>;
const fileCodeToDriveCodeMap = Object.fromEntries(
  Object.entries(driveCodeToFileCodeMap).map(([key, value]) => [value, key])
);

export type FileDriveEntityName = keyof typeof driveToFileMap;
export type FileEntityName = (typeof driveToFileMap)[FileDriveEntityName];

export function getFileEntityForDrive(
  driveEntity: FileDriveEntityName
): FileEntityName {
  return driveToFileMap[driveEntity];
}
export function getFileCodeForDriveCode(driveCode: string): string {
  return driveCodeToFileCodeMap[driveCode];
}

export function getDriveEntityForFile(
  fileEntity: EntityName
): FileDriveEntityName {
  return fileToDriveMap[fileEntity] as FileDriveEntityName;
}
export function getDriveCodeForFileCode(fileCode: string): string {
  return fileCodeToDriveCodeMap[fileCode];
}
