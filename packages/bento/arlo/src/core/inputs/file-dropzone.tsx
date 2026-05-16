"use client";

import { cx, focusRing } from "@/lib/utils.js";
import { File, UploadCloud, X } from "lucide-react";
import * as React from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { Button } from "../ui/button.js";

interface FileDropzoneProps extends DropzoneOptions {
  className?: string;
  onFilesChange?: (files: File[]) => void;
  label?: string;
  description?: string;
}

export const FileDropzone = React.forwardRef<HTMLDivElement, FileDropzoneProps>(
  (
    { className, onFilesChange, label, description, ...props },
    forwardedRef,
  ) => {
    const [files, setFiles] = React.useState<File[]>([]);

    const onDrop = React.useCallback(
      (acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
        onFilesChange?.(acceptedFiles);
        props.onDrop?.(acceptedFiles, [] as any, {} as any);
      },
      [onFilesChange, props],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      ...props,
      onDrop,
    });

    const removeFile = (index: number) => {
      const newFiles = [...files];
      newFiles.splice(index, 1);
      setFiles(newFiles);
      onFilesChange?.(newFiles);
    };

    return (
      <div className="w-full space-y-4">
        <div
          {...getRootProps()}
          className={cx(
            "relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 transition-all",
            "border-gray-300 bg-gray-50/50 hover:bg-gray-50",
            "dark:border-gray-800 dark:bg-gray-950/50 dark:hover:bg-gray-900/50",
            isDragActive && "border-blue-500 bg-blue-50/50 dark:bg-blue-500/10",
            focusRing,
            className,
          )}
        >
          <input {...getInputProps()} />
          <UploadCloud
            className={cx(
              "mb-4 h-10 w-10 text-gray-400",
              isDragActive && "text-blue-500",
            )}
          />
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
              {label ||
                (isDragActive ? "Drop files here" : "Click or drag to upload")}
            </p>
            {description && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                {description}
              </p>
            )}
          </div>
        </div>

        {files.length > 0 && (
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between rounded-md border border-gray-200 p-2 dark:border-gray-800"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <File className="h-4 w-4 shrink-0 text-gray-400" />
                  <span className="truncate text-sm text-gray-900 dark:text-gray-50">
                    {file.name}
                  </span>
                  <span className="shrink-0 text-xs text-gray-500">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="h-7 w-7 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

FileDropzone.displayName = "FileDropzone";
