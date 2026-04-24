import { User, LogOut, Settings as SettingsIcon, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { Logo } from "../logo";
import { ThemeSelector } from "../ThemeSelector";

interface HeaderProps {
  currentSession: any;
  currentTheme: string;
  isThemeOpen: boolean;
  setIsThemeOpen: (open: boolean) => void;
  onChangeTheme: (themeId: string) => void;
  onOpenUserSettings: () => void;
}

export function Header({
  currentSession,
  currentTheme,
  isThemeOpen,
  setIsThemeOpen,
  onChangeTheme,
  onOpenUserSettings,
}: HeaderProps) {
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
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-20 flex w-full items-center justify-between"
      >
        <div className="flex items-center text-primary-300">
          <Logo />
        </div>
        <div className="flex items-center gap-4">
          <ThemeSelector
            currentTheme={currentTheme}
            isThemeOpen={isThemeOpen}
            setIsThemeOpen={setIsThemeOpen}
            onChangeTheme={onChangeTheme}
          />
          {currentSession ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 group"
              >
                <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-background-300 overflow-hidden text-foreground-200 transition-all hover:bg-background-400 hover:scale-105 active:scale-95 ring-2 ring-transparent group-hover:ring-primary-500/30">
                  {currentSession.picture ? (
                    <img
                      src={currentSession.picture}
                      alt={currentSession.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>
                <ChevronDown className={`h-3.5 w-3.5 text-foreground-300 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 top-full mt-2 w-56 origin-top-right overflow-hidden rounded-2xl bg-background-200 border border-background-400/50 shadow-2xl z-50 p-1.5"
                  >
                    <div className="px-3 py-2 mb-1 border-b border-background-400/30">
                      <p className="text-xs font-semibold text-foreground-400 uppercase tracking-wider">Account</p>
                      <p className="text-sm font-medium text-foreground truncate">{currentSession.name}</p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onOpenUserSettings();
                      }}
                      className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground-200 transition-all hover:bg-background-300 hover:text-foreground group"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background-400/50 group-hover:bg-primary-500/10 group-hover:text-primary-500 transition-colors">
                        <SettingsIcon className="h-4 w-4" />
                      </div>
                      Settings
                    </button>

                    <a
                      href="/api/auth/logout"
                      className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 transition-all hover:bg-red-400/10 hover:text-red-300 group"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-400/5 group-hover:bg-red-400/10 transition-colors">
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
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="mb-16 text-2xl font-medium tracking-tight sm:text-3xl"
      >
        Good afternoon {currentSession?.name || "Guest"}
      </motion.h1>
    </>
  );
}
