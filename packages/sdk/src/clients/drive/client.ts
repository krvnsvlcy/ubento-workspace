import { createClientFactory } from "~/lib/client.js";
import { components, paths } from "./types.js";

export const createDriveServiceClient = createClientFactory<paths>();
export type Drive = components["schemas"]["Drive"];
export type CreateDriveRequest = components["schemas"]["CreateDriveRequest"];
export type UpdateDriveRequest = components["schemas"]["UpdateDriveRequest"];
export type File = components["schemas"]["File"];
export type CreateFileRequest = components["schemas"]["CreateFileRequest"];
export type UpdateFileRequest = components["schemas"]["UpdateFileRequest"];
export type FileContent = components["schemas"]["FileContent"];
export type FileSignedUrlData = components["schemas"]["FileSignedUrlData"];