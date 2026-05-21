import type { JSX } from "react";

export function LoadingProgressBar({
  height = 2,
  naked,
}: {
  height?: number;
  naked?: boolean;
}): JSX.Element {
  return (
    <div
      className="progress-bar"
      style={{ height, backgroundColor: naked ? "transparent" : undefined }}
    >
      <div className="progress-bar-value"></div>
    </div>
  );
}

export default LoadingProgressBar;
