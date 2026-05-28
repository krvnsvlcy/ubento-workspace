"use client";

import TypeIt from "typeit-react";

export function AnimatedHeadline() {
  return (
    <h1 className="mx-auto mb-6 max-w-4xl text-5xl font-heading font-bold tracking-tight text-neutral-content leading-[1.1] text-center">
      Maximize leverage with workspaces built for your{" "}
      <span className="inline-block text-left text-neutral-content">
        <TypeIt
          options={{
            lifeLike: true,
            strings: ["business.", "work.", "craft."],
            speed: 80, // premium typing cadence
            deleteSpeed: 60, // slightly faster backspacing
            nextStringDelay: [3000, 0], // pause for readability when fully typed
            loopDelay: [0, 3000],
            loop: true,
            breakLines: false,
          }}
        />
      </span>
    </h1>
  );
}
