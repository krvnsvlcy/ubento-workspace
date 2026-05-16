export function cx(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export const focusRing = "focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
export const focusInput = "focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
export const hasErrorInput = "border-red-500 focus:border-red-500 focus:ring-red-500";
