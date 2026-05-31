import { CodeEditor } from "@/components/code-editor.js";
import { Skeleton } from "@ubento/bento.arlo-core";
import clsx from "clsx";

interface CodePanelProps {
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
  readOnly?: boolean;
  className?: string;
  onSave?: () => void;
  moduleName: string;
  moduleType: "components" | "modules";
  moduleId: string;
  versionId: string;
}

export function CodePanel({
  value,
  onChange,
  isLoading,
  readOnly = false,
  className,
  onSave,
  moduleName,
  moduleType,
  moduleId,
  versionId,
}: CodePanelProps) {
  return (
    <div
      className={clsx(
        "w-full h-full flex flex-col gap-3 bg-surface/10",
        className,
      )}
    >
      {isLoading ? (
        <div className="flex-1 p-4 space-y-2">
          {/* Function/Component declaration */}
          <Skeleton className="h-4 w-[40%]" />

          {/* Variable declarations */}
          <Skeleton className="ml-6 h-4 w-[25%]" />
          <Skeleton className="ml-6 h-4 w-[35%]" />

          {/* Blank line */}
          <div className="h-4" aria-hidden="true" />

          {/* Condition or Loop opening */}
          <Skeleton className="ml-6 h-4 w-[55%]" />

          {/* Nested logic */}
          <Skeleton className="ml-12 h-4 w-[70%]" />
          <Skeleton className="ml-12 h-4 w-[45%]" />

          {/* Deeply nested logic */}
          <Skeleton className="ml-16 h-4 w-[60%]" />
          <Skeleton className="ml-16 h-4 w-[40%]" />

          {/* Closing inner block */}
          <Skeleton className="ml-12 h-4 w-[5%]" />
          <Skeleton className="ml-6 h-4 w-[5%]" />

          {/* Blank line */}
          <div className="h-4" aria-hidden="true" />

          {/* Return statement */}
          <Skeleton className="ml-6 h-4 w-[50%]" />
          <Skeleton className="ml-6 h-4 w-[20%]" />

          {/* Final closing brace */}
          <Skeleton className="h-4 w-[5%]" />
        </div>
      ) : (
        <CodeEditor
          value={value}
          onChange={onChange}
          language={moduleType === "components" ? "ubento-tsx" : "ubento-ts"}
          lineNumbers={true}
          readOnly={readOnly}
          onSave={onSave}
          moduleName={moduleName}
          moduleType={moduleType}
          moduleId={moduleId}
          versionId={versionId}
          className="w-full h-full"
        />
      )}
    </div>
  );
}
