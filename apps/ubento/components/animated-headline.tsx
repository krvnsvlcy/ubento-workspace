"use client";

import TypeIt from "typeit-react";
import { Typography } from "./typography";

export function AnimatedHeadline() {
  return (
    <Typography variant="h1">
      Maximize leverage with workspaces built for your{" "}
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
    </Typography>
  );
}
