import { PropsWithChildren } from "react";
import { TeamFooter } from "./team-footer";
import { WorkspaceHeader } from "./team-header";

export function TeamSideLayout({
  icon,
  title,
  onTitleClick,
  children,
}: PropsWithChildren<{
  icon: React.ReactNode;
  title: React.ReactNode;
  onTitleClick: () => void;
}>) {
  return (
    <div className="h-full w-full flex flex-col">
      <WorkspaceHeader icon={icon} title={title} onTitleClick={onTitleClick} />
      <div className="flex-1 overflow-hidden space-y-4">{children}</div>
      <TeamFooter />
    </div>
  );
}
