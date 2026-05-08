import { UserMessageAttachment } from "@ubento/workspace.agent";
import { ReactNode } from "react";

export type AttachmentType<A extends UserMessageAttachment> = {
  type: A["type"];
  label: (data: A["data"]) => string;
  icon: (data: A["data"]) => string | ReactNode;
};
