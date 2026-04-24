import { LayoutGrid, Plus, Settings, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface SidebarProps {
  onOpenModal: (type: "create" | "ai" | "settings") => void;
}

export function Sidebar({ onOpenModal }: SidebarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      className="col-span-1 flex flex-col gap-10"
    >
      {/* Create Section */}
      <div>
        <h2 className="mb-4 text-[13px] font-medium tracking-tight text-gray-200">
          Create
        </h2>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => onOpenModal("create")}
            className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-background-300"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-background-300 group-hover:bg-background-400">
              <Plus className="h-3.5 w-3.5 text-foreground-200" />
            </div>
            <span className="text-[13px] font-medium text-foreground-100">
              Create New App
            </span>
          </button>
          <button
            onClick={() => onOpenModal("ai")}
            className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-background-300"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-background-300">
              <Sparkles className="h-3.5 w-3.5 text-foreground-200" />
            </div>
            <span className="text-[13px] font-medium text-foreground-100">
              Start with AI
            </span>
          </button>
        </div>
      </div>

      {/* Quick Links Section */}
      <div>
        <h2 className="mb-4 text-[13px] font-medium tracking-tight text-gray-200">
          Quick Links
        </h2>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => onOpenModal("settings")}
            className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-background-300"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-background-300">
              <Settings className="h-3.5 w-3.5 text-foreground-200" />
            </div>
            <span className="text-[13px] font-medium text-foreground-100">
              Team Settings
            </span>
          </button>
          <button className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-background-300">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-background-300">
              <LayoutGrid className="h-3.5 w-3.5 text-foreground-200" />
            </div>
            <span className="text-[13px] font-medium text-foreground-100">
              All apps
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
