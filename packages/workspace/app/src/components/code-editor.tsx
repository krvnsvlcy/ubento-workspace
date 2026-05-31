import { useDarkMode } from "@/app/hooks/use-dark-mode";
import { useWorkspaceEngine } from "@/contexts/workspace";
import Editor from "@monaco-editor/react";
import { useRef, useEffect } from "react";

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
  onSave?: () => void;
  moduleName?: string;
  moduleType?: "components" | "modules";
  moduleId?: string;
  versionId?: string;
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
  onSave,
  moduleName,
  moduleType,
  moduleId,
  versionId,
}: CodeEditorProps) {
  const isDark = useDarkMode();
  const workspaceEngine = useWorkspaceEngine();
  const onSaveRef = useRef(onSave);
  onSaveRef.current = onSave;

  const handleEditorMount = (editor: any, monaco: any) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      onSaveRef.current?.();
    });
  };

  // Sync initial content to TS Service
  useEffect(() => {
    if (workspaceEngine && moduleId && versionId && value) {
      const ext = moduleType === "components" ? "tsx" : "ts";
      const virtualPath = `/workspace/modules/${moduleId}/${versionId}.${ext}`;
      workspaceEngine.getTsService().writeFile(virtualPath, value);
    }
  }, [workspaceEngine, moduleId, versionId]);

  const handleValueChange = (val: string | undefined) => {
    const newVal = val || "";
    onChange?.(newVal);

    if (workspaceEngine && moduleId && versionId) {
      const ext = moduleType === "components" ? "tsx" : "ts";
      const virtualPath = `/workspace/modules/${moduleId}/${versionId}.${ext}`;
      workspaceEngine.getTsService().writeFile(virtualPath, newVal);
    }
  };

  const monacoLanguage = language === "tsx" ? "typescript" : language;

  const getPath = () => {
    if (moduleId && versionId) {
      const ext = moduleType === "components" ? "tsx" : "ts";
      return `file:///workspace/modules/${moduleId}/${versionId}.${ext}`;
    }
    if (language === "tsx") return "file:///main.tsx";
    if (language === "typescript") return "file:///main.ts";
    if (language === "javascript" || language === "jsx")
      return "file:///main.jsx";
    return `file:///main.${language}`;
  };

  return (
    <div className={className} style={{ height, width: "100%" }}>
      <Editor
        height="100%"
        language={monacoLanguage}
        path={getPath()}
        theme={isDark ? "vs-dark" : "light"}
        value={value}
        onChange={handleValueChange}
        onMount={handleEditorMount}
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
