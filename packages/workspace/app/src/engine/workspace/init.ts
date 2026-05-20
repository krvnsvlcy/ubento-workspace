import { BoardSpec } from "@ubento/bento.core";

export function generateInitialBoardSpec({
  title,
}: {
  title: string;
}): BoardSpec {
  return {
    style: {
      layout: "column",
      gap: 16,
      flow: "scroll",
      padding: { top: 32, right: 32, bottom: 32, left: 32 },
    },
    children: ["header", "description"],
    elements: {
      header: {
        component: "Heading",
        props: {
          text: title,
          level: "h1",
          size: 32,
          weight: 700,
          color: "#0f172a",
        },
      },
      description: {
        component: "Text",
        props: {
          text: "Welcome to your new board! This is a starting point for your interface. You can add more components and configure their behavior.",
          size: 16,
          color: "#64748b",
        },
      },
    },
    params: {},
  };
}
