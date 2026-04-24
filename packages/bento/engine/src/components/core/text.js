import { jsx as _jsx } from "react/jsx-runtime";
import { coreComponent } from "./types";
export const text = coreComponent("text", (props) => {
    return (_jsx("span", { style: {
            fontSize: props.size ? `${props.size}px` : undefined,
            color: props.color,
            fontFamily: props.font,
            fontWeight: props.weight,
            textAlign: props.align,
            lineHeight: props.lineHeight,
            fontStyle: props.italic ? "italic" : undefined,
            textDecoration: props.underline ? "underline" : undefined,
        }, children: props.text }));
});
//# sourceMappingURL=text.js.map