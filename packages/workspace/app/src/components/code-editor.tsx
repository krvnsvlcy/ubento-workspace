import { useDarkMode } from "@/app/hooks/use-dark-mode";
import { useUbentoEngine } from "@/hooks/app-engine";
import { Monaco } from "@/services/monaco/monaco-service";
import type * as monacoType from "monaco-editor";
import { useEffect, useRef, useState } from "react";

export function CodeEditor({
  value,
  uri,
  onChange,
  language = "json",
  folding = true,
  lineNumbers = false,
  readOnly = false,
  minimap = false,
  height = "100%",
  className,
  onSave,
}: {
  value: string;
  uri?: string;
  onChange?: (val: string) => void;
  language?: string;
  folding?: boolean;
  lineNumbers?: boolean;
  readOnly?: boolean;
  minimap?: boolean;
  height?: string;
  className?: string;
  onSave?: () => void;
}) {
  const isDark = useDarkMode();
  const appEngine = useUbentoEngine();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<monacoType.editor.IStandaloneCodeEditor | null>(
    null,
  );
  const [monaco, setMonaco] = useState<Monaco | null>(null);

  const onSaveRef = useRef(onSave);
  onSaveRef.current = onSave;

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const valueRef = useRef(value);
  valueRef.current = value;

  const monacoLanguage = language === "tsx" ? "typescript" : language;

  const getPath = () => {
    if (uri) return uri;
    if (language === "tsx") return "file:///main.tsx";
    if (language === "typescript") return "file:///main.ts";
    if (language === "javascript" || language === "jsx")
      return "file:///main.jsx";
    return `file:///main.tsx`;
  };

  const path = getPath();

  // Load monaco instance via MonacoService
  useEffect(() => {
    let active = true;
    appEngine
      .getMonacoService()
      .getMonaco()
      .then((m) => {
        if (active) {
          setMonaco(m);
        }
      });
    return () => {
      active = false;
    };
  }, [appEngine]);

  // Handle editor creation
  useEffect(() => {
    if (!monaco || !containerRef.current) return;

    const editor = monaco.editor.create(containerRef.current, {
      theme: isDark ? "vs-dark" : "vs",
      minimap: { enabled: minimap },
      fontSize: 13,
      fontFamily: "var(--font-mono)",
      lineNumbers: lineNumbers ? "on" : "off",
      readOnly: readOnly,
      padding: { top: 4, bottom: 4 },
      automaticLayout: true,
      fixedOverflowWidgets: true,
    });

    editorRef.current = editor;

    // Add save command
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      onSaveRef.current?.();
    });

    return () => {
      editor.dispose();
      editorRef.current = null;
    };
  }, [monaco]);

  // Handle model setup and switching
  useEffect(() => {
    if (!monaco || !editorRef.current) return;

    const uri = monaco.Uri.parse(path);
    let model = monaco.editor.getModel(uri);

    if (!model) {
      model = monaco.editor.createModel(valueRef.current, monacoLanguage, uri);
    } else {
      if (model.getValue() !== valueRef.current) {
        model.setValue(valueRef.current);
      }
      monaco.editor.setModelLanguage(model, monacoLanguage);
    }

    const prevPosition = editorRef.current.getPosition();
    editorRef.current.setModel(model);
    if (prevPosition) {
      editorRef.current.setPosition(prevPosition);
    }

    // Sync content changes
    const disposable = model.onDidChangeContent(() => {
      const currentVal = model.getValue();
      valueRef.current = currentVal;
      onChangeRef.current?.(currentVal);
    });

    // Refresh diagnostics
    appEngine.getMonacoService().updateFileDiagnostics(uri.toString());

    return () => {
      disposable.dispose();
      // Dispose the model on switch/unmount to avoid memory leaks
      const currentModel = monaco.editor.getModel(uri);
      if (currentModel) {
        currentModel.dispose();
      }
    };
  }, [monaco, path, monacoLanguage, appEngine]);

  // Sync value updates from parent component
  useEffect(() => {
    if (!editorRef.current) return;
    const model = editorRef.current.getModel();
    if (model && value !== model.getValue()) {
      valueRef.current = value;
      const prevPosition = editorRef.current.getPosition();
      model.setValue(value);
      if (prevPosition) {
        editorRef.current.setPosition(prevPosition);
      }
    }
  }, [value]);

  // Sync theme changes
  useEffect(() => {
    if (monaco && editorRef.current) {
      monaco.editor.setTheme(isDark ? "vs-dark" : "vs");
    }
  }, [monaco, isDark]);

  // Sync dynamic editor options
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({
        minimap: { enabled: minimap },
        lineNumbers: lineNumbers ? "on" : "off",
        readOnly: readOnly,
      });
    }
  }, [minimap, lineNumbers, readOnly]);

  return (
    <div
      className={className}
      style={{ height, width: "100%", overflow: "hidden" }}
      ref={containerRef}
    />
  );
}
