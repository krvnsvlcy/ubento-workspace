import { BoardSpec } from "@ubento/bento.core";

export function generateInitialBoardSpec(): BoardSpec {
  return {
    style: {
      layout: "column",
      gap: 16,
      flow: "scroll",
      padding: { top: 32, right: 32, bottom: 32, left: 32 },
    },
    children: ["header", "body"],
    elements: {
      header: {
        component: "TextLine",
        props: {
          variant: "h1",
        },
        bindings: {
          text: { value: "board.title", setValue: "board.setTitle" },
        },
      },
      body: {
        component: "Stack",
        props: {
          gap: 16,
        },
        children: ["description"],
      },
      description: {
        component: "Paragraph",
        props: {
          text: "Welcome to your new board! This is a starting point for your interface. You can add more components and configure their behavior.",
        },
      },
    },
    params: {},
  };
}
