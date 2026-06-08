import { UserMessageAttachment } from "@ubento/workspace.agent";
import { Briefcase } from "lucide-react";
import { AttachmentType } from "../types";

export type BentoWorkspaceAttachment = UserMessageAttachment<
  "current-workspace",
  {
    id: string;
    title: string;
    services: string[];
  }
>;

export const ubentoWorkspaceAttachmentType: AttachmentType<BentoWorkspaceAttachment> =
  {
    type: "current-workspace",
    label: (data) => {
      return data.title || data.id;
    },
    icon: (data) => {
      return <Briefcase />;
    },
  };
