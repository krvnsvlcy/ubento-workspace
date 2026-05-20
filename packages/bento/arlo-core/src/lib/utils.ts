export function cx(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export const focusRing = "focus:outline-hidden focus:ring-2 focus:ring-accent-border focus:ring-offset-2";
export const focusInput = "focus:outline-hidden focus:border-accent-border focus:ring-1 focus:ring-accent-border";
export const hasErrorInput = "border-destructive focus:border-destructive focus:ring-destructive";
