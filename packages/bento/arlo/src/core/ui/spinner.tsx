import { Loader2Icon } from "lucide-react";
import * as React from "react";

import { cx as cn } from "@/lib/utils.js";

const Spinner = React.forwardRef<SVGSVGElement, React.ComponentProps<"svg">>(
  ({ className, ...props }, ref) => {
    return (
      <Loader2Icon
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn("size-4 animate-spin", className)}
        {...props}
      />
    );
  },
);
Spinner.displayName = "Spinner";

export { Spinner };
