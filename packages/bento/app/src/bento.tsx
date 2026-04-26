import { ErrorView } from "@/components/error";
import { BentoHostContext } from "@/contexts/host";
import { BentoHost, BentoLocation } from "@/types";
import { Workspace } from "@/views/workspace/workspace";
import { Workspaces } from "@/views/workspaces/workspaces";
import { Home } from "@/views/home/home";
import { AnimatePresence, motion } from "motion/react";
import { BentoSessionContext } from "./contexts/session";

export function Bento({
  host,
  location,
}: {
  host: BentoHost;
  location: BentoLocation;
}) {
  let content = <></>;

  switch (location.view) {
    case "home":
      content = <Home />;
      break;
    case "workspace":
      content = <Workspace slug={location.params.slug} boardId={location.params.boardId} />;
      break;
    case "workspaces":
      content = <Workspaces />;
      break;
    default:
      content = (
        <ErrorView message={`Unknown view: ${(location as any).view}`} />
      );
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <BentoHostContext value={host}>
        <BentoSessionContext value={host.session}>
          <AnimatePresence mode="wait">
            <motion.div
              key={
                location.view === "workspace"
                  ? `workspace-${location.params.slug}`
                  : location.view
              }
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="min-h-screen w-full"
            >
              {content}
            </motion.div>
          </AnimatePresence>
        </BentoSessionContext>
      </BentoHostContext>
    </div>
  );
}
