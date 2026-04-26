export const themes = [
  { id: "sky", label: "Sky", color: "bg-blue-300" },
  { id: "sunset", label: "Sunset", color: "bg-orange-300" },
  { id: "forest", label: "Forest", color: "bg-green-300" },
  { id: "carbon", label: "Carbon", color: "bg-foreground-300" },
];

export const DEFAULT_TEMPLATE = {
  home: {
    id: "home",
    rootId: "root",
    elements: {
      root: {
        type: "stack",
        style: {
          layout: "flex",
          direction: "column",
          background: "transparent",
          height: "100vh",
          width: "100%",
          padding: { top: 40, left: 60 },
        },
        content: ["t1"],
      },
      t1: {
        type: "block",
        component: "text",
        props: { text: "Authorized Instance" },
        style: { size: 24 } as any,
      },
    },
  },
};
