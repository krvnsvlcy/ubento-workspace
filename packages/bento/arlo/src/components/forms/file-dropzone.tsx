import { createComponent } from "@ubento/bento.core";
import { z } from "zod";
import { FileDropzone as CoreFileDropzone } from "@ubento/bento.arlo-core";
import * as React from "react";

export const FileDropzone = createComponent({
  props: z.object({
    label: z.string().optional(),
    description: z.string().optional(),
    multiple: z.boolean().default(true),
    accept: z.record(z.string(), z.array(z.string())).optional(), // e.g. { 'image/*': ['.png', '.jpg'] }
    maxFiles: z.number().optional(),
    maxSize: z.number().optional(),
  }),

  events: z.object({
    filesChange: z.array(z.any()), // Array of File objects
  }),

  summary: "A drag-and-drop file upload area.",
  instructions: [
    "Use this component to allow users to upload files.",
    "The `filesChange` event returns the current list of selected files.",
    "Supports multiple files, file type restrictions, and size limits.",
  ].join("\n"),

  render: ({ ref, props, emit }) => {
    return (
      <CoreFileDropzone
        label={props.label}
        description={props.description}
        multiple={props.multiple}
        accept={props.accept as any}
        maxFiles={props.maxFiles}
        maxSize={props.maxSize}
        onFilesChange={(files) => emit("filesChange", files)}
      />
    );
  },
});
