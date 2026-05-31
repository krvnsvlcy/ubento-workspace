import type React from "react";

export type ContextMenuItem = {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  action: () => void;
  disabled?: boolean;
};

export type ContextMenuItemGroup = {
  title?: string;
  items: ContextMenuItem[];
};

export type ContextMenuContentItem =
  | ContextMenuItem
  | ContextMenuItemGroup
  | React.ReactNode;

export type ContextMenuInstance = {
  position: { x: number; y: number };
  content: ContextMenuContentItem[];
};
