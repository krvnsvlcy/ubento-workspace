export function cx(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export const focusRing = "focus:outline-hidden focus:ring-2 focus:ring-border focus:ring-offset-2";
export const focusInput = "focus:outline-hidden focus:border-border focus:ring-1 focus:ring-border";
export const hasErrorInput = "border-border focus:border-border focus:ring-destructive";
