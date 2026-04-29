import { Logo } from "@/app/components/logo";
import { ThemeSelector } from "@/app/components/ThemeSelector";
import { useBentoSession } from "@/contexts/session";
import { useUbento } from "@/services/ubento/ubento";
import {
  ChevronDown,
  LogOut,
  Settings as SettingsIcon,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface HeaderProps {
  currentTheme: string;
  isThemeOpen: boolean;
  setIsThemeOpen: (open: boolean) => void;
  onChangeTheme: (themeId: string) => void;
  onOpenUserSettings: () => void;
}

export function Header({
  currentTheme,
  isThemeOpen,
  setIsThemeOpen,
  onChangeTheme,
  onOpenUserSettings,
}: HeaderProps) {
  const ubento = useUbento();
  const session = useBentoSession();
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

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mb-20 flex w-full items-center justify-between"
      >
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="flex items-center gap-4">
          <ThemeSelector
            currentTheme={currentTheme}
            isThemeOpen={isThemeOpen}
            setIsThemeOpen={setIsThemeOpen}
            onChangeTheme={onChangeTheme}
          />
          {session ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="group flex items-center gap-2"
              >
                <div className="flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-background-300 text-foreground-200 ring-2 ring-transparent transition-all hover:scale-105 hover:bg-background-400 active:scale-95 group-hover:ring-primary-500/30">
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
                <ChevronDown
                  className={`h-3.5 w-3.5 text-foreground-300 transition-transform duration-300 ${isUserMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="z-50 absolute right-0 top-full mt-2 w-56 origin-top-right overflow-hidden rounded-2xl border border-background-400/50 bg-background-200 p-1.5 shadow-2xl"
                  >
                    <div className="mb-1 border-b border-background-400/30 px-3 py-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-foreground-400">
                        Account
                      </p>
                      <p className="truncate text-sm font-medium text-foreground">
                        {user?.name || "Loading..."}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onOpenUserSettings();
                      }}
                      className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground-200 transition-all hover:bg-background-300 hover:text-foreground"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background-400/50 transition-colors group-hover:bg-primary-500/10 group-hover:text-primary-500">
                        <SettingsIcon className="h-4 w-4" />
                      </div>
                      Settings
                    </button>

                    <a
                      href="/api/auth/logout"
                      className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 transition-all hover:bg-red-400/10 hover:text-red-300"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-400/5 transition-colors group-hover:bg-red-400/10">
                        <LogOut className="h-4 w-4" />
                      </div>
                      Logout
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <a
              href="/api/auth/login"
              className="flex h-10 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform hover:scale-105 active:scale-95"
            >
              Sign In
            </a>
          )}
        </div>
      </motion.nav>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        className="mb-16 text-2xl font-medium tracking-tight sm:text-3xl"
      >
        Good afternoon {user?.name || "Guest"}
      </motion.h1>
    </>
  );
}
