import { ErrorView } from "@/app/components/error";
import { Builder } from "@/app/views/builder/builder";
import { Home } from "@/app/views/home/home";
import { Workspace } from "@/app/views/workspace/workspace";
import { Workspaces } from "@/app/views/workspaces/workspaces";
import { AnimatePresence, motion } from "motion/react";
import { useUbentoEngine } from "../engine/engine";

export function Router() {
  const ubento = useUbentoEngine();
  const location = ubento.useState((s) => s.location);

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
      className="bg-background-200"
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1, ease: "easeOut" }}
          className="min-h-screen w-full"
        >
          {content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
