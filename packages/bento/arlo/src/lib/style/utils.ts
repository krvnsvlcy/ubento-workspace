import { type EdgesSpec, type LengthSpec } from "@ubento/bento.core";

export function lengthToCSS(length?: LengthSpec, flexAxis?: "main" | "cross") {
  if (!length) return undefined;
  if (length.unit === "fr") {
    if (flexAxis === "main") {
      return undefined;
    } else {
      return "100%";
    }
  }
  return `${length.value}${length.unit}`;
}

export function getEdgesStyle(
  edges?: EdgesSpec<number>,
  type: "padding" | "margin" = "padding",
) {
  if (!edges) return {};
  return {
    [`${type}Top`]: edges.top !== undefined ? `${edges.top}px` : undefined,
    [`${type}Right`]:
      edges.right !== undefined ? `${edges.right}px` : undefined,
    [`${type}Bottom`]:
      edges.bottom !== undefined ? `${edges.bottom}px` : undefined,
    [`${type}Left`]: edges.left !== undefined ? `${edges.left}px` : undefined,
  };
}
