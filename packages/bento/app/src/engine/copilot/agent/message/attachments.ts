export type BaseAttachment<T extends string> = {
  type: T;
};

// Common fields for any attachment pointing to a physical file or asset
type ResourcePayload = {
  id: string;
  path: string;
};

// Project
export type WorkspaceFileAttachment = BaseAttachment<"workspace-file"> &
  ResourcePayload;
export type DriveFileAttachment = BaseAttachment<"drive-file"> &
  ResourcePayload;
export type VariableSetAttachment = BaseAttachment<"variable-set"> &
  ResourcePayload;
export type TypefaceAttachment = BaseAttachment<"typeface"> & ResourcePayload;
export type TextStylesheetAttachment = BaseAttachment<"text-stylesheet"> &
  ResourcePayload;
export type PackageAttachment = BaseAttachment<"package"> & ResourcePayload;

// Thread
export type ImageAttachment = BaseAttachment<"thread-image"> & ResourcePayload;
export type FileAttachment = BaseAttachment<"thread-file"> & ResourcePayload;

// Editor-Specific
export type DiagnosticsAttachment = BaseAttachment<"diagnostics"> & {
  diagnostics: string;
};
export type ElementaSelectionAttachment =
  BaseAttachment<"elementa-selection"> & {
    selection: string;
  };
export type ModacoRangeAttachment = BaseAttachment<"modaco-range"> & {
  range: string;
};

export type MessageAttachment<T extends string = string, D = unknown> = {
  type: T;
  data: D;
};
