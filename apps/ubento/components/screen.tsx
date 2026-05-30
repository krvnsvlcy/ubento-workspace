"use client";

import React from "react";

interface ScreenProps {
  children: React.ReactNode;
  className?: string;
}

export function Screen({ children, className = "" }: ScreenProps) {
  return (
    <div
      className={`w-full overflow-hidden rounded-2xl border bg-background transition-all duration-300 hover:border-border-hover ${className}`}
    >
      {/* Window Header */}
      <div className="flex p-3 items-center border-b bg-surface select-none">
        {/* Window Dots (Colorless) */}
        <div className="flex gap-2">
          <div className="h-2.5 w-2.5 rounded-full border-border-hover border" />
          <div className="h-2.5 w-2.5 rounded-full border-border-hover border" />
          <div className="h-2.5 w-2.5 rounded-full border-border-hover border" />
        </div>
      </div>

      {/* Screen Content */}
      <div className="w-full h-auto">{children}</div>
    </div>
  );
}
