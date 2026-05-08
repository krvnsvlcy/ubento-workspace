import { BentoLocation } from "@ubento/bento.runtime";
import { UserMessageAttachment } from "@ubento/workspace.agent";
import { LayoutDashboard } from "lucide-react";
import { AttachmentType } from "../types";

export type BentoLocationAttachment = UserMessageAttachment<
  "bento-location",
  BentoLocation
>;
export const ubentoLocationAttachmentType: AttachmentType<BentoLocationAttachment> =
  {
    type: "bento-location",
    label: (data) => {
      return `${data.boardId}`;
    },
    icon: (data) => {
      return <LayoutDashboard />;
    },
  };
