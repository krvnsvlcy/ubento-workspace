import { useGlobalModals } from "@/contexts/modals";
import { useSession } from "@/contexts/session";
import { useUbento } from "@/engine/app/engine";
import { LogOut, Settings as SettingsIcon, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function UserButton() {
  const { openModal } = useGlobalModals();
  const ubento = useUbento();
  const session = useSession();
  const { data: user } = ubento.iam.useUser(session?.userId || "");

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session) {
    return (
      <a
        href="/api/auth/login"
        className="flex h-10 items-center justify-center rounded-full bg-neutral-content px-6 text-sm font-medium text-neutral-contrast transition-transform hover:scale-105 active:scale-95"
      >
        Sign In
      </a>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className="group flex items-center gap-2"
      >
        <div className="flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-neutral-surface-hover text-neutral-content-subtle ring-2 ring-transparent transition-all hover:scale-105 hover:bg-neutral-surface-active active:scale-95 group-hover:ring-accent/30">
          {user?.picture ? (
            <img
              src={user.picture}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <User className="h-4 w-4" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isUserMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="z-50 absolute right-0 top-full mt-2 w-56 origin-top-right overflow-hidden rounded-2xl border border-neutral-border bg-neutral-surface p-1.5 shadow-2xl"
          >
            <div className="mb-1 border-b border-neutral-border px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-content-muted">
                Account
              </p>
              <p className="truncate text-sm font-medium text-neutral-content">
                {user?.name || "Loading..."}
              </p>
            </div>

            <button
              onClick={() => {
                setIsUserMenuOpen(false);
                openModal("account");
              }}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-content-subtle transition-all hover:bg-neutral-surface-hover hover:text-neutral-content"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-surface-active/50 transition-colors group-hover:bg-accent-surface group-hover:text-accent">
                <SettingsIcon className="h-4 w-4" />
              </div>
              Settings
            </button>

            <a
              href="/api/auth/logout"
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive-content transition-all hover:bg-destructive-surface hover:text-destructive"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive-surface/50 transition-colors group-hover:bg-destructive-surface-hover">
                <LogOut className="h-4 w-4" />
              </div>
              Logout
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
