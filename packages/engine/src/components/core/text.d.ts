export interface TextProps {
    text: string;
    size?: number;
    color?: string;
    font?: string;
    weight?: string | number;
    align?: "left" | "right" | "center" | "justify";
    lineHeight?: string | number;
    italic?: boolean;
    underline?: boolean;
}
export declare const text: {
    name: string;
    props: (props: TextProps) => TextProps;
    component: (props: TextProps) => React.ReactNode;
};
//# sourceMappingURL=text.d.ts.map