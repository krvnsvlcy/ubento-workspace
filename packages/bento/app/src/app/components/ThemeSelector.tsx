import { AnimatePresence, motion } from "motion/react";
import { themes } from "../../services/constants";

interface ThemeSelectorProps {
  currentTheme: string;
  isThemeOpen: boolean;
  setIsThemeOpen: (open: boolean) => void;
  onChangeTheme: (themeId: string) => void;
}

export function ThemeSelector({
  currentTheme,
  isThemeOpen,
  setIsThemeOpen,
  onChangeTheme,
}: ThemeSelectorProps) {
  const activeTheme = themes.find((t) => t.id === currentTheme) || themes[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsThemeOpen(!isThemeOpen)}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-neutral-surface-hover text-neutral-content-subtle transition-all hover:bg-neutral-surface-active hover:scale-105 active:scale-95"
      >
        <div
          className={`h-4 w-4 rounded-full ${activeTheme.color} shadow-sm transition-colors duration-500`}
        />
      </button>

      <AnimatePresence>
        {isThemeOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsThemeOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: "-50%" }}
              animate={{ opacity: 1, x: "-50%" }}
              exit={{ opacity: 0, x: "-50%" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute left-1/2 top-12 z-50 min-w-[160px] overflow-hidden rounded-2xl border border-neutral-border bg-background p-1.5 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex flex-col gap-0.5">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      onChangeTheme(theme.id);
                      setIsThemeOpen(false);
                    }}
                    className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-all ${
                      currentTheme === theme.id
                        ? "bg-neutral-surface-hover text-neutral-content"
                        : "text-neutral-content-muted hover:bg-neutral-surface-hover/50 hover:text-neutral-content-subtle"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 shrink-0 rounded-full ${theme.color} ring-1 ring-neutral-surface-active/20`}
                    />
                    <span className="text-[13px] font-medium leading-none">
                      {theme.label}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
