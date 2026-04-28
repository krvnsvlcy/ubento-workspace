import { ErrorView } from "@/components/error";
import {
  BentoHostContext,
  useBentoHost,
  type BentoHostApi,
} from "@/contexts/host";
import { Builder } from "@/views/builder/builder";
import { Home } from "@/views/home/home";
import { Workspace } from "@/views/workspace/workspace";
import { Workspaces } from "@/views/workspaces/workspaces";
import { AnimatePresence, motion } from "motion/react";
import { BentoSessionContext } from "./contexts/session";

export function Bento({ host }: { host: BentoHostApi }) {
  return (
    <BentoHostContext value={host}>
      <BentoContent />
    </BentoHostContext>
  );
}

function BentoContent() {
  const location = useBentoHost((s) => s.location);
  const session = useBentoHost((s) => s.session);
  let content = <></>;

  switch (location.view) {
    case "home":
      content = <Home />;
      break;
    case "workspace":
      content = (
        <Workspace
          slug={location.params.slug}
          boardId={location.params.boardId}
        />
      );
      break;
    case "workspaces":
      content = <Workspaces />;
      break;
    case "builder":
      content = <Builder moduleId={location.params.moduleId} />;
      break;
    default:
      content = (
        <ErrorView message={`Unknown view: ${(location as any).view}`} />
      );
  }

  return (
    <div
      className="bg-background-100"
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <BentoSessionContext value={session}>
        <AnimatePresence mode="wait">
          <motion.div
            key={
              location.view === "workspace"
                ? `workspace-${location.params.slug}`
                : location.view === "builder"
                  ? `builder-${location.params.moduleId}`
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
    </div>
  );
}
