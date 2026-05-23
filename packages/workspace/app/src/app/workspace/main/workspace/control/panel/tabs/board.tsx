import { useWorkspaceEngine } from "@/contexts/workspace";
import {
  Section,
  PropertyRow,
  TextInput,
  NumberInput,
  Select,
  PaddingControl,
} from "../shared";
import {
  Check,
  Copy,
  Edit2,
  Save,
  X,
  Plus,
  Trash2,
  Sliders,
  Database,
  Settings,
  FileCode,
} from "lucide-react";
import React, { useEffect, useState } from "react";

export function BoardTab() {
  const workspaceEngine = useWorkspaceEngine();
  const location = workspaceEngine.appEngine.useState((s) => s.location);
  const boardId = location.board;
  const board = workspaceEngine.useState((s) =>
    boardId ? s.boards[boardId] : null,
  );

  const [copied, setCopied] = useState(false);
  const [isEditingJson, setIsEditingJson] = useState(false);
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);

  const [titleInput, setTitleInput] = useState("");

  useEffect(() => {
    if (board) {
      setTitleInput(board.title);
      if (!isEditingJson) {
        setJsonText(JSON.stringify(board.spec.data, null, 2));
      }
    }
  }, [board, isEditingJson]);

  if (!board) {
    return (
      <div className="p-4 text-neutral-content-muted">
        No board selected
      </div>
    );
  }

  const spec = board.spec.isValid ? board.spec.data : ((board.spec.data || {}) as any);

  const updateBoardSpec = async (updatedSpec: any) => {
    if (!boardId) return;
    await workspaceEngine.writeBoardSpec({ boardId, spec: updatedSpec });
  };

  const handleTitleBlur = async () => {
    if (!boardId) return;
    if (titleInput !== board.title && titleInput.trim()) {
      await workspaceEngine.updateBoard({ boardId, update: { title: titleInput } });
    }
  };

  const handleCopy = () => {
    const content = JSON.stringify(spec, null, 2);
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveJson = async () => {
    if (!boardId) return;
    try {
      const parsed = JSON.parse(jsonText);
      setJsonError(null);
      await workspaceEngine.writeBoardSpec({ boardId, spec: parsed });
      setIsEditingJson(false);
    } catch (e: any) {
      setJsonError(e.message || "Invalid JSON");
    }
  };

  // Style updates
  const style = spec.style || {};
  const handleStyleChange = (key: string, value: any) => {
    const updatedSpec = {
      ...spec,
      style: {
        ...style,
        [key]: value,
      },
    };
    updateBoardSpec(updatedSpec);
  };

  // State Variables
  const stateVars = spec.state || {};
  const initialStates = spec.initialState || {};

  const handleStateVarChange = (oldKey: string, newKey: string, initialVal: any) => {
    const updatedState = { ...stateVars };
    const updatedInitial = { ...initialStates };

    if (oldKey !== newKey) {
      delete updatedState[oldKey];
      delete updatedInitial[oldKey];
    }

    updatedState[newKey] = {};
    updatedInitial[newKey] = initialVal;

    updateBoardSpec({
      ...spec,
      state: updatedState,
      initialState: updatedInitial,
    });
  };

  const handleAddStateVar = () => {
    let index = 1;
    let newKey = `var_${index}`;
    while (stateVars[newKey] !== undefined) {
      index++;
      newKey = `var_${index}`;
    }

    const updatedState = { ...stateVars, [newKey]: {} };
    const updatedInitial = { ...initialStates, [newKey]: "" };

    updateBoardSpec({
      ...spec,
      state: updatedState,
      initialState: updatedInitial,
    });
  };

  const handleDeleteStateVar = (key: string) => {
    const updatedState = { ...stateVars };
    const updatedInitial = { ...initialStates };
    delete updatedState[key];
    delete updatedInitial[key];

    updateBoardSpec({
      ...spec,
      state: updatedState,
      initialState: updatedInitial,
    });
  };

  // Params
  const params = spec.params || {};

  const handleParamChange = (oldKey: string, newKey: string, label: string, type: "string" | "number" | "boolean") => {
    const updatedParams = { ...params };
    if (oldKey !== newKey) {
      delete updatedParams[oldKey];
    }
    updatedParams[newKey] = {
      label,
      type,
    };
    updateBoardSpec({
      ...spec,
      params: updatedParams,
    });
  };

  const handleAddParam = () => {
    let index = 1;
    let newKey = `param_${index}`;
    while (params[newKey] !== undefined) {
      index++;
      newKey = `param_${index}`;
    }
    const updatedParams = {
      ...params,
      [newKey]: {
        label: newKey,
        type: "string",
      },
    };
    updateBoardSpec({
      ...spec,
      params: updatedParams,
    });
  };

  const handleDeleteParam = (key: string) => {
    const updatedParams = { ...params };
    delete updatedParams[key];
    updateBoardSpec({
      ...spec,
      params: updatedParams,
    });
  };

  return (
    <div className="h-full overflow-auto flex flex-col gap-4 py-4">
      <div className="flex flex-col gap-3 pb-4 border-b border-white/10 px-4">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-neutral-content-muted uppercase">
            Board Title
          </span>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              onBlur={handleTitleBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleTitleBlur();
                  (e.target as HTMLInputElement).blur();
                }
              }}
              className="flex-1 bg-black/20 text-xs px-2 py-1.5 rounded border border-white/10 outline-none focus:border-primary-500/50"
            />
          </div>
        </div>
      </div>

      <div className="grow flex flex-col">
        <Section title="Layout & Styling" icon={Settings}>
          <div className="flex flex-col gap-1.5 py-2">
            <PropertyRow label="Layout">
              <Select
                value={style.layout || "column"}
                options={["column", "row", "center"]}
                onChange={(val) => handleStyleChange("layout", val)}
              />
            </PropertyRow>
            <PropertyRow label="Gap">
              <div className="w-[80px]">
                <NumberInput
                  value={style.gap}
                  onChange={(val) => handleStyleChange("gap", val)}
                  unit="PX"
                  min={0}
                />
              </div>
            </PropertyRow>
            <PropertyRow label="Overflow Flow">
              <Select
                value={style.flow || "scroll"}
                options={["scroll", "fixed"]}
                onChange={(val) => handleStyleChange("flow", val)}
              />
            </PropertyRow>
            <PaddingControl
              value={style.padding}
              onChange={(val) => handleStyleChange("padding", val)}
            />
          </div>
        </Section>

        <Section title="State Variables" icon={Database}>
          <div className="flex flex-col gap-2">
            {Object.keys(stateVars).length === 0 ? (
              <div className="px-4 text-xs text-neutral-content-muted">
                No state variables defined.
              </div>
            ) : (
              <div className="flex flex-col gap-2 px-4 py-2">
                <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-neutral-content-subtle">
                  <div className="w-[45%]">Name</div>
                  <div className="flex-1">Initial Value</div>
                  <div className="w-6"></div>
                </div>
                {Object.keys(stateVars).map((key) => {
                  const val = initialStates[key];
                  return (
                    <div
                      key={key}
                      className="flex items-center gap-2 border-b border-white/5 pb-2 last:border-0"
                    >
                      <div className="w-[45%]">
                        <TextInput
                          value={key}
                          onChange={(newKey) => {
                            if (newKey && newKey !== key && !stateVars[newKey]) {
                              handleStateVarChange(key, newKey, val);
                            }
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <TextInput
                          value={val !== undefined ? String(val) : ""}
                          onChange={(newVal) => {
                            let parsedVal: any = newVal;
                            if (newVal === "true") parsedVal = true;
                            else if (newVal === "false") parsedVal = false;
                            else if (!isNaN(Number(newVal)) && newVal.trim() !== "") parsedVal = Number(newVal);

                            handleStateVarChange(key, key, parsedVal);
                          }}
                        />
                      </div>
                      <button
                        onClick={() => handleDeleteStateVar(key)}
                        className="text-neutral-content-muted hover:text-red-400 transition-colors p-1"
                        title="Delete state variable"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="px-4 py-2 border-t border-white/5 mt-2">
              <button
                onClick={handleAddStateVar}
                className="flex items-center gap-1.5 text-xs bg-white/5 hover:bg-white/10 text-foreground-200 px-3 py-1.5 rounded transition-colors w-full justify-center border border-white/5"
              >
                <Plus size={12} />
                <span>Add State Variable</span>
              </button>
            </div>
          </div>
        </Section>

        <Section title="Parameters" icon={Sliders}>
          <div className="flex flex-col gap-2">
            {Object.keys(params).length === 0 ? (
              <div className="px-4 text-xs text-neutral-content-muted">
                No parameters defined.
              </div>
            ) : (
              <div className="flex flex-col gap-2 px-4 py-2">
                <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-neutral-content-subtle">
                  <div className="w-[30%]">ID</div>
                  <div className="w-[35%]">Label</div>
                  <div className="w-[25%]">Type</div>
                  <div className="w-6"></div>
                </div>
                {Object.entries(params).map(([key, paramSpec]: [string, any]) => {
                  return (
                    <div
                      key={key}
                      className="flex items-center gap-2 border-b border-white/5 pb-2 last:border-0"
                    >
                      <div className="w-[30%]">
                        <TextInput
                          value={key}
                          onChange={(newKey) => {
                            if (newKey && newKey !== key && !params[newKey]) {
                              handleParamChange(key, newKey, paramSpec.label, paramSpec.type);
                            }
                          }}
                        />
                      </div>
                      <div className="w-[35%]">
                        <TextInput
                          value={paramSpec.label || ""}
                          onChange={(newLabel) => {
                            handleParamChange(key, key, newLabel, paramSpec.type);
                          }}
                        />
                      </div>
                      <div className="w-[25%]">
                        <Select
                          value={paramSpec.type}
                          options={["string", "number", "boolean"]}
                          onChange={(newType) => {
                            handleParamChange(key, key, paramSpec.label, newType as any);
                          }}
                        />
                      </div>
                      <button
                        onClick={() => handleDeleteParam(key)}
                        className="text-neutral-content-muted hover:text-red-400 transition-colors p-1"
                        title="Delete parameter"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="px-4 py-2 border-t border-white/5 mt-2">
              <button
                onClick={handleAddParam}
                className="flex items-center gap-1.5 text-xs bg-white/5 hover:bg-white/10 text-foreground-200 px-3 py-1.5 rounded transition-colors w-full justify-center border border-white/5"
              >
                <Plus size={12} />
                <span>Add Parameter</span>
              </button>
            </div>
          </div>
        </Section>

        <Section title="Raw JSON Specification" icon={FileCode}>
          <div className="px-4 py-2 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-neutral-content-muted">
                Directly edit board JSON
              </span>
              <div className="flex gap-2">
                {!isEditingJson ? (
                  <>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1 px-2 py-1 text-[10px] bg-white/5 hover:bg-white/10 text-foreground-200 rounded transition-colors"
                      title="Copy board spec"
                    >
                      {copied ? (
                        <Check size={10} className="text-green-400" />
                      ) : (
                        <Copy size={10} />
                      )}
                      <span>{copied ? "Copied!" : "Copy"}</span>
                    </button>
                    <button
                      onClick={() => setIsEditingJson(true)}
                      className="flex items-center gap-1 px-2 py-1 text-[10px] bg-white/5 hover:bg-white/10 text-foreground-200 rounded transition-colors"
                    >
                      <Edit2 size={10} />
                      <span>Edit JSON</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleSaveJson}
                      className="flex items-center gap-1 px-2 py-1 text-[10px] bg-primary-500/10 hover:bg-primary-500/20 text-primary-400 rounded transition-colors"
                    >
                      <Save size={10} />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingJson(false);
                        setJsonError(null);
                      }}
                      className="flex items-center gap-1 px-2 py-1 text-[10px] bg-white/5 hover:bg-white/10 text-foreground-200 rounded transition-colors"
                    >
                      <X size={10} />
                      <span>Cancel</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {jsonError && (
              <div className="text-xs text-red-400 bg-red-400/10 p-2 rounded">
                {jsonError}
              </div>
            )}

            <div className="relative">
              {isEditingJson ? (
                <textarea
                  value={jsonText}
                  onChange={(e) => setJsonText(e.target.value)}
                  className="w-full h-[300px] text-[10px] font-mono leading-relaxed text-foreground-300 bg-black/20 p-2.5 rounded focus:outline-none focus:ring-1 focus:ring-primary-500/50 resize-none scrollbar-hide"
                />
              ) : (
                <pre className="max-h-[300px] overflow-auto text-[10px] font-mono leading-relaxed text-foreground-300 bg-black/20 p-2.5 rounded scrollbar-hide">
                  {JSON.stringify(spec, null, 2)}
                </pre>
              )}
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
