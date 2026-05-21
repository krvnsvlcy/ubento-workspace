import { createComponent } from "@ubento/bento.core";
import { CodeBlock as CoreCodeBlock } from "@ubento/bento.arlo-core";
import { z } from "zod";
import { cx } from "../../lib/utils.js";

export const codeBlockPropsSchema = z.object({
  code: z.string().default(""),
  language: z.string().default("typescript"),
  theme: z.string().default("github-dark"),
  showLineNumbers: z.boolean().default(false),
  className: z.string().optional(),
});

export type CodeBlockProps = z.infer<typeof codeBlockPropsSchema>;

export const CodeBlock = createComponent({
  props: codeBlockPropsSchema,
  summary: "CodeBlock component for displaying syntax-highlighted code snippets.",
  instructions: [
    "Use CodeBlock to display read-only block code snippets with syntax highlighting.",
  ].join("\n"),
  render: ({ props, ref, children }) => {
    const { code, language, theme, showLineNumbers, className } = props;

    return (
      <div
        ref={ref as any}
        className={cx(
          "w-full overflow-hidden rounded-lg border border-neutral-border bg-neutral-surface",
          className,
        )}
      >
        <CoreCodeBlock
          code={code || (typeof children === "string" ? children : "")}
          language={language}
          theme={theme}
          showLineNumbers={showLineNumbers}
        />
      </div>
    );
  },
});
