import { Logo } from "@/app/components/logo";
import { ThemeSelector } from "@/app/components/ThemeSelector";
import { UserButton } from "@/app/components/user-button";
import { useTheme } from "@/contexts/theme";
import { motion } from "motion/react";

interface HeaderProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  const { currentTheme, isThemeOpen, setIsThemeOpen, changeTheme } = useTheme();

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex w-full items-center justify-between py-6"
    >
      <div className="flex items-center">
        <Logo />
      </div>
      <div className="flex items-center gap-4">
        {children}
        <ThemeSelector
          currentTheme={currentTheme}
          isThemeOpen={isThemeOpen}
          setIsThemeOpen={setIsThemeOpen}
          onChangeTheme={changeTheme}
        />
        <UserButton />
      </div>
    </motion.nav>
  );
}
