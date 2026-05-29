import { useDarkMode } from "@/app/hooks/use-dark-mode";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  value: string;
  onChange?: (val: string) => void;
  language?: string;
  folding?: boolean;
  lineNumbers?: boolean;
  readOnly?: boolean;
  minimap?: boolean;
  height?: string;
  className?: string;
}

export function CodeEditor({
  value,
  onChange,
  language = "json",
  folding = true,
  lineNumbers = false,
  readOnly = false,
  minimap = false,
  height = "100%",
  className,
}: CodeEditorProps) {
  const isDark = useDarkMode();

  // 2. Map "tsx" to "typescript" because Monaco doesn't have a "tsx" language ID natively
  const monacoLanguage = language === "tsx" ? "typescript" : language;

  // 3. Assign a virtual file path based on the language so Monaco applies the correct syntax rules
  const getPath = () => {
    if (language === "tsx") return "file:///main.tsx";
    if (language === "typescript") return "file:///main.ts";
    if (language === "javascript" || language === "jsx")
      return "file:///main.jsx";
    return `file:///main.${language}`; // e.g., file:///main.json
  };

  return (
    <div className={className} style={{ height, width: "100%" }}>
      <Editor
        height="100%"
        language={monacoLanguage}
        path={getPath()} // CRITICAL: This tells Monaco to treat the model as a specific file type
        theme={isDark ? "vs-dark" : "light"}
        value={value}
        onChange={(val) => onChange?.(val || "")}
        options={{
          minimap: { enabled: minimap },
          fontSize: 12,
          fontFamily: "var(--font-mono)",
          lineNumbers: lineNumbers ? "on" : "off",
          glyphMargin: undefined,
          folding,
          lineDecorationsWidth: undefined,
          lineNumbersMinChars: 0,
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: readOnly,
          padding: { top: 12, bottom: 12 },
          automaticLayout: true,
        }}
      />
    </div>
  );
}
