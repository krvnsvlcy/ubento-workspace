import type { BoardSpec } from "@ubento/engine";

export const DEFAULT_SPEC: BoardSpec = {
  title: "Playground Board",
  params: {},
  state: {
    name: { type: "string", value: "Hello world" },
  },
  style: {
    direction: "column",
    gap: 12,
    padding: { top: 32, right: 32, bottom: 32, left: 32 },
    flow: "scroll",
  },
  children: ["header", "description", "footer"],
  elements: {
    header: {
      component: "Stack",
      props: {
        direction: "row",
        gap: 12,
        alignItems: "center",
      },
      children: ["title"],
    },
    title: {
      component: "Text",
      props: {
        text: "Bento Playground",
        size: 24,
        weight: 700,
        color: "#fff",
      },
    },
    description: {
      component: "Text",
      props: {
        text: "Experiment with the bento renderer by editing the JSON on the left. The preview updates in real-time as you type.",
        size: 14,
        weight: 400,
        color: "rgba(255, 255, 255, 0.5)",
      },
    },
    footer: {
      component: "Stack",
      props: {
        direction: "row",
        gap: 8,
        padding: 16,
      },
      children: ["tip_label", "tip_content"],
    },
    tip_label: {
      component: "Text",
      props: {
        text: "Tip:",
        size: 13,
        weight: 600,
        color: "#818cf8",
      },
    },
    tip_content: {
      component: "Text",
      props: {
        text: "Try changing the direction or gap!",
        size: 13,
        weight: 400,
        color: "rgba(255, 255, 255, 0.7)",
      },
    },
  },
};
