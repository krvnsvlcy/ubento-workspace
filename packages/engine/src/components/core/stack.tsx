import { Element } from "../element";
import { coreComponent } from "./types";

export const stack = coreComponent(
  "stack",
  (props: { children: string[]; direction?: "row" | "column" }) => (
    <div
      style={{
        display: "flex",
        flexDirection: props.direction,
      }}
    >
      {props.children.map((child, index) => (
        <Element key={index} id={child} />
      ))}
    </div>
  ),
);
