import { useTheme } from "@/contexts/theme";

export function useDarkMode() {
  const { isDark } = useTheme();
  return isDark;
}
