import type { BoardSpec } from "@ubento/engine";

export const DEFAULT_SPEC: BoardSpec = {
  title: "Bento Playground",
  params: {},
  state: {
    title: { type: "string", value: "Modern UI Builder" },
    description: {
      type: "string",
      value: "A high-performance, schema-driven UI engine for building stunning interfaces.",
    },
  },
  style: {
    direction: "column",
    gap: 32,
    padding: { top: 64, right: 64, bottom: 64, left: 64 },
    flow: "scroll",
  },
  children: ["hero", "features_grid", "footer"],
  elements: {
    hero: {
      component: "Stack",
      props: {
        direction: "column",
        gap: 16,
        align: "start",
      },
      children: ["badge", "hero_title", "hero_description"],
    },
    badge: {
      component: "Text",
      props: {
        text: "v0.18.0 RELEASE",
        size: 10,
        weight: 800,
        color: "#818cf8",
        lineHeight: 1,
      },
    },
    hero_title: {
      component: "Heading",
      props: {
        text: "Build Faster with Bento",
        level: "h1",
        size: 48,
        weight: 800,
        color: "#0f172a",
      },
    },
    hero_description: {
      component: "Text",
      props: {
        text: "Experiment with the bento renderer by editing the JSON on the left. The preview updates in real-time as you type.",
        size: 18,
        weight: 400,
        color: "#64748b",
        width: { value: 600, unit: "px" },
      },
    },
    features_grid: {
      component: "Grid",
      props: {
        columns: 2,
        gap: 24,
      },
      children: ["card_1", "card_2", "card_3", "card_4"],
    },
    card_1: {
      component: "Stack",
      props: {
        direction: "column",
        gap: 12,
        padding: { top: 24, right: 24, bottom: 24, left: 24 },
      },
      children: ["card_1_title", "card_1_desc"],
    },
    card_1_title: {
      component: "Heading",
      props: { text: "Schema Driven", level: "h3", size: 20, weight: 600 },
    },
    card_1_desc: {
      component: "Text",
      props: {
        text: "Define your UI using a robust, typed schema.",
        size: 14,
        color: "#64748b",
      },
    },
    card_2: {
      component: "Stack",
      props: {
        direction: "column",
        gap: 12,
        padding: { top: 24, right: 24, bottom: 24, left: 24 },
      },
      children: ["card_2_title", "card_2_desc"],
    },
    card_2_title: {
      component: "Heading",
      props: { text: "Real-time Preview", level: "h3", size: 20, weight: 600 },
    },
    card_2_desc: {
      component: "Text",
      props: {
        text: "Instant feedback as you modify your UI structure.",
        size: 14,
        color: "#64748b",
      },
    },
    card_3: {
      component: "Stack",
      props: {
        direction: "column",
        gap: 12,
        padding: { top: 24, right: 24, bottom: 24, left: 24 },
      },
      children: ["card_3_title", "card_3_desc"],
    },
    card_3_title: {
      component: "Heading",
      props: { text: "Modular Design", level: "h3", size: 20, weight: 600 },
    },
    card_3_desc: {
      component: "Text",
      props: {
        text: "Encapsulated components for maximum reusability.",
        size: 14,
        color: "#64748b",
      },
    },
    card_4: {
      component: "Stack",
      props: {
        direction: "column",
        gap: 12,
        padding: { top: 24, right: 24, bottom: 24, left: 24 },
      },
      children: ["card_4_title", "card_4_desc"],
    },
    card_4_title: {
      component: "Heading",
      props: { text: "Powerful Layouts", level: "h3", size: 20, weight: 600 },
    },
    card_4_desc: {
      component: "Text",
      props: {
        text: "Flex and Grid systems integrated directly into the spec.",
        size: 14,
        color: "#64748b",
      },
    },
    footer: {
      component: "Stack",
      props: {
        direction: "row",
        justify: "space-between",
        align: "center",
      },
      children: ["footer_left", "footer_right"],
    },
    footer_left: {
      component: "Text",
      props: {
        text: "Ready to build?",
        size: 14,
        weight: 500,
        color: "#94a3b8",
      },
    },
    footer_right: {
      component: "Stack",
      props: { direction: "row", gap: 12 },
      children: ["btn_docs", "btn_start"],
    },
    btn_docs: {
      component: "Button",
      props: { label: "Documentation", variant: "outline", size: "medium" },
    },
    btn_start: {
      component: "Button",
      props: { label: "Get Started", variant: "primary", size: "medium" },
    },
  },
};
