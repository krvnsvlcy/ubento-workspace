import { UserMessageAttachment } from "@ubento/workspace.agent";
import { Briefcase } from "lucide-react";
import { AttachmentType } from "../types";

export type BentoWorkspaceAttachment = UserMessageAttachment<
  "bento-workspace",
  {
    id: string;
    title: string;
    slug: string;
    services: string[];
  }
>;

export const ubentoWorkspaceAttachmentType: AttachmentType<BentoWorkspaceAttachment> =
  {
    type: "bento-workspace",
    label: (data) => {
      return data.title || data.slug || data.id;
    },
    icon: (data) => {
      return <Briefcase />;
    },
  };
