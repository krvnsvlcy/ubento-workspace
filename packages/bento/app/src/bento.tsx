import { ErrorView } from "@/components/error";
import { BentoHostContext } from "@/contexts/host";
import { BentoHost, BentoLocation } from "@/types";
import { App } from "@/views/app/app";
import { Apps } from "@/views/apps/apps";
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
    case "app":
      content = <App slug={location.params.slug} />;
      break;
    case "apps":
      content = <Apps />;
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
                location.view === "app"
                  ? `app-${location.params.slug}`
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
