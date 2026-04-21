import { coreComponent } from "./types";

export const text = coreComponent("text", (props: { text: string }) => (
  <span>{props.text}</span>
));
