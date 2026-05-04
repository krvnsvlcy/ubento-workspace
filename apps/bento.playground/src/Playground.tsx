import { type BoardSpec } from "@ubento/engine";
import { useEffect, useState } from "react";
import { EditorPane } from "./components/EditorPane.js";
import { ViewerPane } from "./components/ViewerPane.js";
import { DEFAULT_SPEC } from "./constants.js";

export function Playground() {
  const [code, setCode] = useState(JSON.stringify(DEFAULT_SPEC, null, 2));
  const [spec, setSpec] = useState<BoardSpec>(DEFAULT_SPEC);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const parsed = JSON.parse(code);
      setSpec(parsed);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  }, [code]);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(code);
      setCode(JSON.stringify(parsed, null, 2));
    } catch (e) {
      // Ignore format errors
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#050505] text-white overflow-hidden font-sans selection:bg-indigo-500/30">
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .monaco-editor, .monaco-editor .margin, .monaco-editor-background {
          background-color: transparent !important;
        }
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>

      <EditorPane 
        code={code} 
        onChange={setCode} 
        onFormat={handleFormat} 
        error={error} 
      />
      
      <ViewerPane 
        spec={spec} 
        error={error} 
      />
    </div>
  );
}
