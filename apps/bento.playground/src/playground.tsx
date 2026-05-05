import { type BoardSpec } from "@ubento/bento.engine";
import { useEffect, useState } from "react";
import { ViewerPane } from "./components/ViewerPane.js";
import { DEFAULT_SPEC } from "./constants.js";

type Generation = {
  id: string;
  prompt: string;
  spec: BoardSpec;
  timestamp: number;
};

const SYSTEM_INSTRUCTION = `You are a UI engineer specializing in the Bento Engine.
Your task is to generate a JSON BoardSpec based on the user's description.
Return ONLY the JSON object. No markdown, no explanations.

The BoardSpec schema:
{
  "title": string,
  "style": {
    "direction": "row" | "column",
    "gap": number,
    "padding": { "top": number, "right": number, "bottom": number, "left": number }
  },
  "state": Record<string, any>,
  "children": string[],
  "elements": Record<string, {
    "component": "Stack" | "Grid" | "Heading" | "Text" | "Button",
    "props": any,
    "children"?: string[]
  }>
}`;

export function Playground() {
  const [generations, setGenerations] = useState<Generation[]>(() => {
    const saved = localStorage.getItem("bento_generations");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: "init",
            prompt: "Initial Spec",
            spec: DEFAULT_SPEC,
            timestamp: Date.now(),
          },
        ];
  });
  const [activeGenId, setActiveGenId] = useState<string>(
    generations[0]?.id || "init",
  );
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [activeTab, setActiveTab] = useState<
    "preview" | "spec" | "instruction"
  >("preview");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState("openai/gpt-5.4-mini");

  const MODELS = [
    { id: "openai/gpt-5.4-mini", label: "GPT-5.4 Mini" },
    { id: "google/gemini-3-flash", label: "Gemini 3 Flash" },
    { id: "anthropic/claude-haiku-4.5", label: "Claude Haiku 4.5" },
  ];

  useEffect(() => {
    localStorage.setItem("bento_generations", JSON.stringify(generations));
  }, [generations]);

  const activeGeneration =
    generations.find((g) => g.id === activeGenId) || generations[0];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPrompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setGenerationError(null);

    try {
      const fullPrompt = `${SYSTEM_INSTRUCTION}\n\nUSER REQUEST:\n${currentPrompt}`;

      const response = await fetch("http://localhost:8900/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: fullPrompt,
          model: selectedModel,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Generation failed");
      }

      const { text } = await response.json();

      // Parse JSON from the raw response (handling potential markdown blocks)
      const jsonStr = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      const newSpec = JSON.parse(jsonStr);

      const newGen: Generation = {
        id: Math.random().toString(36).substring(7),
        prompt: currentPrompt,
        spec: newSpec,
        timestamp: Date.now(),
      };

      setGenerations((prev) => [newGen, ...prev]);
      setActiveGenId(newGen.id);
      setCurrentPrompt("");
    } catch (error: any) {
      console.error(error);
      setGenerationError(error.message || "An unexpected error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-white text-slate-900 font-sans selection:bg-indigo-500/10">
      {/* Left Panel: History & Input */}
      <div className="w-1/3 border-r border-slate-100 flex flex-col bg-slate-50/50">
        <div className="p-6 border-b border-slate-100 bg-white flex items-center justify-between">
          <h1 className="text-xs font-black tracking-[0.2em] text-slate-800 flex items-center gap-3 uppercase">
            <div className="w-2 h-2 rounded-full bg-indigo-600" />
            Bento Engine
          </h1>

          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="text-[10px] font-bold bg-slate-100 border-none rounded-lg px-3 py-1.5 outline-none cursor-pointer hover:bg-slate-200 transition-colors"
          >
            {MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {generations.map((gen) => (
            <button
              key={gen.id}
              onClick={() => setActiveGenId(gen.id)}
              className={`w-full text-left p-3 rounded-xl text-sm transition-all duration-200 ${
                activeGenId === gen.id
                  ? "bg-white border border-slate-200 shadow-sm text-indigo-600 font-medium"
                  : "text-slate-500 hover:bg-slate-100/50 hover:text-slate-700 border border-transparent"
              }`}
            >
              <div className="truncate mb-1">{gen.prompt}</div>
              <div className="text-[10px] font-medium opacity-50 uppercase tracking-wider">
                {new Date(gen.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 bg-white space-y-4">
          {generationError && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-3 h-3 text-rose-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-rose-900 mb-1">
                    Generation Failed
                  </h3>
                  <p className="text-[11px] text-rose-600 leading-relaxed">
                    {generationError}
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleGenerate} className="relative">
            <input
              type="text"
              value={currentPrompt}
              onChange={(e) => setCurrentPrompt(e.target.value)}
              disabled={isGenerating}
              placeholder={
                isGenerating ? "Generating..." : "Describe a change..."
              }
              className="w-full pl-5 pr-12 py-3 bg-slate-100/80 border-none rounded-2xl text-sm placeholder:text-slate-400 focus:ring-0 focus:bg-slate-100 transition-all outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isGenerating || !currentPrompt.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-indigo-600 transition-colors disabled:opacity-30"
            >
              {isGenerating ? (
                <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right Panel: Preview & Spec */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        <div className="h-16 border-b border-slate-100 flex items-center justify-between px-8">
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            {[
              { id: "preview", label: "Preview" },
              { id: "spec", label: "Spec" },
              { id: "instruction", label: "Instruction" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
              <span>Active</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden relative">
          {activeTab === "preview" ? (
            <div className="h-full overflow-auto">
              <ViewerPane spec={activeGeneration.spec} error={null} />
            </div>
          ) : activeTab === "spec" ? (
            <div className="h-full bg-white p-10 overflow-auto font-mono text-xs leading-relaxed text-slate-600 selection:bg-indigo-100">
              <pre>{JSON.stringify(activeGeneration.spec, null, 2)}</pre>
            </div>
          ) : (
            <div className="h-full bg-white p-10 overflow-auto font-mono text-xs leading-relaxed text-slate-400 selection:bg-indigo-100 italic">
              <pre className="whitespace-pre-wrap">{SYSTEM_INSTRUCTION}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
