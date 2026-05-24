import { Skeleton } from "@ubento/bento.arlo-core";
import { createComponent, useBinding } from "@ubento/bento.core";
import { PropsWithChildren } from "react";
import { z } from "zod";
import { cx } from "../../lib/utils.js";

export const textLinePropsSchema = z.object({
  text: z.string().optional(),
  variant: z
    .enum(["display", "h1", "h2", "h3", "h4", "lead", "base", "small"])
    .default("base"),
  weight: z.enum(["regular", "medium", "semibold", "bold"]).optional(),
  align: z.enum(["left", "center", "right"]).optional(),
  className: z.string().optional(),
  loading: z.boolean().optional(),
  skeletonLength: z.number().optional(),
});

export type TextLineProps = z.infer<typeof textLinePropsSchema>;

export const TextLine = createComponent({
  props: textLinePropsSchema,
  summary:
    "TextLine component for single-line text content like headings, labels, or badges. Supports built-in skeleton loaders.",
  instructions: [
    "Use TextLine for title headings, captions, labels, and other short single-line text.",
    "Choose a variant to determine the visual styling (e.g. h1 for page headers).",
    "Pass `loading={true}` to automatically render a skeleton loader instead of the text.",
    "Specify `skeletonLength` to control the skeleton loader width in ch (character) units.",
  ].join("\n"),
  bindings: z.object({
    text: z.string(),
  }),
  render: ({ props, ref, children }) => {
    const { text, variant, weight, align, className, loading, skeletonLength } = props;

    const alignClass = cx(
      align === "center" && "text-center",
      align === "right" && "text-right",
    );

    const weightClass = cx(
      weight === "regular" && "font-normal",
      weight === "medium" && "font-medium",
      weight === "semibold" && "font-semibold",
      weight === "bold" && "font-bold",
    );

    const isHeading = ["display", "h1", "h2", "h3", "h4"].includes(variant);

    if (isHeading) {
      const Tag =
        variant === "display" ? "h1" : (variant as "h1" | "h2" | "h3" | "h4");

      const headingVariantClass = cx(
        variant === "display" && cx("text-5xl", !weight && "font-medium"),
        variant === "h1" && cx("text-4xl", !weight && "font-semibold"),
        variant === "h2" && cx("text-3xl", !weight && "font-semibold"),
        variant === "h3" && cx("text-2xl", !weight && "font-semibold"),
        variant === "h4" && cx("text-xl", !weight && "font-semibold"),
      );

      return (
        <Tag
          ref={ref as any}
          className={cx(
            "leading-tight tracking-tight",
            headingVariantClass,
            weightClass,
            alignClass,
            className,
          )}
        >
          <TextLineContent
            text={text}
            children={children}
            loading={loading}
            skeletonLength={skeletonLength}
          />
        </Tag>
      );
    }

    // Text variants: lead, base, small
    const textVariantClass = cx(
      variant === "lead" && "text-lg",
      variant === "base" && "text-sm",
      variant === "small" && "text-xs",
    );

    return (
      <p
        ref={ref as any}
        className={cx(
          "leading-normal truncate",
          textVariantClass,
          weightClass || "font-normal",
          alignClass,
          className,
        )}
      >
        <TextLineContent
          text={text}
          children={children}
          loading={loading}
          skeletonLength={skeletonLength}
        />
      </p>
    );
  },
});

function TextLineContent({
  text,
  children,
  loading,
  skeletonLength,
}: PropsWithChildren<{
  text?: string;
  loading?: boolean;
  skeletonLength?: number;
}>) {
  const [bindingText, setBindingText, hasBindingText] =
    useBinding<string>("text");

  if (loading) {
    return (
      <Skeleton
        style={{
          height: "1em",
          width:
            skeletonLength !== undefined ? `${skeletonLength}ch` : undefined,
        }}
      />
    );
  }

  if (hasBindingText) {
    return (
      <input
        type="text"
        value={bindingText}
        onChange={(e) => setBindingText(e.target.value)}
        style={{
          padding: 0,
          margin: 0,
          border: "none",
          outline: "none",
          backgroundColor: "transparent",
          color: "currentColor",
          font: "inherit",
          width: "100%",
        }}
        placeholder="Untitled"
      />
    );
  } else {
    return text || children;
  }
}
