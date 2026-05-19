import React from "react";
import { useShikiHighlighter } from "react-shiki";

interface CodeBlockProps {
  code: string;
  language?: string;
  theme?: string;
  showLineNumbers?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function CodeBlock({
  code,
  language = "typescript",
  theme = "github-dark",
  showLineNumbers = false,
}: CodeBlockProps) {
  const highlighted = useShikiHighlighter(code, language, theme, {
    showLineNumbers,
  });

  return (
    <div
      className="code-block overflow-auto p-3"
      style={{
        userSelect: "text",
        width: "100%",
        height: "100%",
      }}
    >
      {highlighted}
    </div>
  );
}
