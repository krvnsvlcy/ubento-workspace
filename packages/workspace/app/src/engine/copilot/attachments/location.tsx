import { BentoLocation } from "@ubento/bento.runtime";
import { UserMessageAttachment } from "@ubento/workspace.agent";
import { LayoutDashboard } from "lucide-react";
import { AttachmentType } from "../types";

export type BentoLocationAttachment = UserMessageAttachment<
  "current-location",
  BentoLocation & {
    boardTitle?: string;
  }
>;
export const ubentoLocationAttachmentType: AttachmentType<BentoLocationAttachment> =
  {
    type: "current-location",
    label: (data) => {
      return data.boardTitle || data.boardId;
    },
    icon: (data) => {
      return <LayoutDashboard />;
    },
  };
