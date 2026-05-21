import { useEffect, useState } from "react";

// Each rect is [x, y, width, height, opacity]
const layouts = [
  [
    [0, 0, 5, 12, 1],
    [7, 0, 5, 5, 1],
    [7, 7, 5, 5, 1],
    [0, 12, 5, 0, 0],
  ],
  [
    [0, 0, 5, 5, 1],
    [7, 0, 5, 5, 1],
    [7, 7, 5, 5, 1],
    [12, 7, 0, 5, 0],
  ],
  [
    [0, 0, 5, 5, 1],
    [7, 0, 5, 5, 1],
    [0, 7, 12, 5, 1],
    [12, 7, 0, 5, 1],
  ],
  [
    [0, 0, 7, 5, 1],
    [9, 0, 3, 5, 1],
    [0, 7, 12, 5, 1],
    [12, 7, 0, 5, 1],
  ],
  [
    [0, 0, 7, 5, 1],
    [9, 0, 3, 5, 1],
    [0, 7, 3, 5, 1],
    [5, 7, 7, 5, 1],
  ],
  [
    [0, 0, 12, 5, 1],
    [12, 0, 0, 5, 1],
    [0, 7, 3, 5, 1],
    [5, 7, 7, 5, 1],
  ],
  [
    [5, 0, 7, 5, 1],
    [12, 0, 0, 5, 1],
    [0, 7, 3, 5, 1],
    [5, 7, 7, 5, 1],
  ],
  [
    [5, 0, 7, 5, 1],
    [12, 0, 0, 5, 1],
    [0, 0, 3, 12, 1],
    [5, 7, 7, 5, 1],
  ],
  [
    [5, 0, 7, 5, 1],
    [12, 0, 0, 5, 1],
    [0, 0, 3, 5, 1],
    [5, 7, 7, 5, 1],
  ],
  [
    [0, 0, 12, 5, 1],
    [12, 0, 0, 5, 1],
    [0, 0, 0, 5, 1],
    [5, 7, 7, 5, 1],
  ],
  [
    [0, 0, 5, 5, 1],
    [7, 0, 5, 5, 1],
    [12, 7, 0, 5, 1],
    [0, 7, 12, 5, 1],
  ],
  [
    [0, 0, 5, 5, 1],
    [7, 0, 5, 5, 1],
    [7, 7, 5, 5, 1],
    [0, 7, 5, 5, 1],
  ],
];

export interface BentoLoaderProps {
  size?: number | string;
  color?: string;
  duration?: number;
  opacity?: number;
}

export const BentoLoader = ({
  size = 120,
  color = "currentColor",
  duration = 0.5,
  opacity = 1,
}: BentoLoaderProps) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setStep((prev) => (prev + 1) % layouts.length);
      },
      duration * 1000 + 200,
    );
    return () => clearInterval(interval);
  }, [duration]);

  const cornerRadius = 1.5;

  return (
    <svg
      viewBox="0 0 12 12"
      style={{
        width: size,
        height: size,
        overflow: "visible",
        opacity,
      }}
    >
      {layouts[step].map((rect, index) => (
        <rect
          key={index}
          rx={cornerRadius}
          ry={cornerRadius}
          fill={color}
          style={{
            x: `${rect[0]}px`,
            y: `${rect[1]}px`,
            width: `${rect[2]}px`,
            height: `${rect[3]}px`,
            opacity: rect[4],
            transition: `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        />
      ))}
    </svg>
  );
};
