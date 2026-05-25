import {
  Button,
  ControlEntry,
  TextControl,
  SelectControl,
  DimensionControl,
  SwitchControl,
} from "@ubento/bento.arlo-core";
import {
  Link2,
  Trash2,
  Settings,
  Box,
  Database,
  Plus,
  Check,
  Copy,
  Edit2,
  Save,
  X,
  FileCode,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { WorkspaceEngine } from "../../../../../../../engine/workspace/engine";
import { Section } from "../shared";

export function SelectionTab({ controller }: { controller: WorkspaceEngine }) {
  const selection = controller.useState((s) => s.selection);
  const boards = controller.useState((s) => s.boards);
  const location = controller.appEngine.useState((s) => s.location);

  const currentBoardId = location?.board;
  const currentBoard = currentBoardId ? boards[currentBoardId] : undefined;
  const elements = (currentBoard?.spec?.data as any)?.elements || {};

  const [activeElementId, setActiveElementId] = useState<string>("");
  const [catalog, setCatalog] = useState<Record<string, any> | null>(null);
  const [newChildId, setNewChildId] = useState("");

  const activeElement = elements[activeElementId];

  const [copied, setCopied] = useState(false);
  const [isEditingJson, setIsEditingJson] = useState(false);
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);

  useEffect(() => {
    setIsEditingJson(false);
    setJsonError(null);
  }, [activeElementId]);

  useEffect(() => {
    if (activeElement && !isEditingJson) {
      setJsonText(JSON.stringify(activeElement, null, 2));
    }
  }, [activeElement, isEditingJson]);

  useEffect(() => {
    controller
      .getCatalog()
      .then((res) => {
        if (res) setCatalog(res);
      })
      .catch(console.error);
  }, [controller]);

  useEffect(() => {
    if (selection && selection.length > 0) {
      if (!selection.includes(activeElementId)) {
        setActiveElementId(selection[0]);
      }
    } else {
      setActiveElementId("");
    }
  }, [selection, activeElementId]);

  if (!selection || selection.length === 0) {
    return (
      <div className="p-4 text-neutral-content-muted">No element selected</div>
    );
  }

  if (!activeElement) {
    return (
      <div className="p-4 text-neutral-content-muted">
        Selected ID:{" "}
        <span className="font-mono text-xs text-foreground-300">
          {activeElementId}
        </span>{" "}
        not found in board elements.
      </div>
    );
  }

  const updateElement = async (elementId: string, updatedElementSpec: any) => {
    if (!currentBoardId || !currentBoard) return;
    const updatedElements = {
      ...elements,
      [elementId]: updatedElementSpec,
    };
    const updatedSpec = {
      ...(currentBoard.spec.data as any),
      elements: updatedElements,
    };
    await controller.writeBoardSpec({
      boardId: currentBoardId,
      spec: updatedSpec,
    });
  };

  const handleCopy = () => {
    const content = JSON.stringify(activeElement, null, 2);
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveJson = async () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonError(null);
      await updateElement(activeElementId, parsed);
      setIsEditingJson(false);
    } catch (e: any) {
      setJsonError(e.message || "Invalid JSON");
    }
  };

  const handleComponentChange = (newComp: string) => {
    updateElement(activeElementId, {
      component: newComp,
      props: {},
      bindings: {},
      listeners: {},
      children: activeElement.children || [],
    });
  };

  const componentInfo = catalog ? catalog[activeElement.component] : null;
  const properties = componentInfo?.props?.properties || {};

  const toggleBinding = (propName: string) => {
    const newElement = { ...activeElement };
    if (!newElement.props) newElement.props = {};
    if (!newElement.bindings) newElement.bindings = {};

    if (newElement.bindings[propName] !== undefined) {
      delete newElement.bindings[propName];
      newElement.props[propName] = "";
    } else {
      delete newElement.props[propName];
      newElement.bindings[propName] = "state.";
    }
    updateElement(activeElementId, newElement);
  };

  const renderPropertyControl = (propName: string, propSchema: any) => {
    const binding = activeElement.bindings?.[propName];
    const isBound = binding !== undefined;

    const action = {
      icon: (
        <Link2
          size={12}
          className={isBound ? "text-primary-500" : "opacity-50"}
        />
      ),
      label: isBound ? "Switch to static value" : "Bind to state path",
      handler: () => toggleBinding(propName),
      active: isBound,
    };

    if (isBound) {
      const readPath =
        typeof binding === "string" ? binding : binding.value || "";
      const writePath =
        typeof binding === "object" ? binding.setValue || "" : "";

      const handleReadChange = (v: string | undefined) => {
        const newElement = { ...activeElement };
        if (!newElement.bindings) newElement.bindings = {};
        if (typeof binding === "object") {
          newElement.bindings[propName] = {
            value: v || "",
            setValue: binding.setValue,
          };
        } else {
          newElement.bindings[propName] = v || "";
        }
        updateElement(activeElementId, newElement);
      };

      const handleWriteChange = (v: string | undefined) => {
        const newElement = { ...activeElement };
        if (!newElement.bindings) newElement.bindings = {};
        const rPath =
          typeof binding === "string" ? binding : binding.value || "";
        if (v) {
          newElement.bindings[propName] = { value: rPath, setValue: v };
        } else {
          newElement.bindings[propName] = rPath;
        }
        updateElement(activeElementId, newElement);
      };

      const isTwoWay = typeof binding === "object";

      const toggleTwoWay = () => {
        const newElement = { ...activeElement };
        if (!newElement.bindings) newElement.bindings = {};
        const rPath =
          typeof binding === "string" ? binding : binding.value || "";
        if (isTwoWay) {
          newElement.bindings[propName] = rPath;
        } else {
          newElement.bindings[propName] = { value: rPath, setValue: "" };
        }
        updateElement(activeElementId, newElement);
      };

      return (
        <ControlEntry
          key={propName}
          label={propName}
          action={action}
          variant={null as any}
        >
          <div className="flex flex-col gap-1.5">
            <TextControl
              value={readPath}
              onChange={handleReadChange}
              settings={{ placeholder: "e.g. state.myVar", stateful: true }}
            />
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={toggleTwoWay}
                className="text-[9px] uppercase tracking-wider text-neutral-content-muted hover:text-neutral-content transition-colors"
              >
                {isTwoWay ? "Remove write path" : "Add write path (Two-way)"}
              </button>
            </div>
            {isTwoWay && (
              <TextControl
                value={writePath}
                onChange={handleWriteChange}
                settings={{
                  placeholder: "e.g. state.setMyVar",
                  stateful: true,
                }}
              />
            )}
          </div>
        </ControlEntry>
      );
    }

    const val = activeElement.props?.[propName];

    const handleStaticChange = (newVal: any) => {
      const newElement = { ...activeElement };
      if (!newElement.props) newElement.props = {};
      if (newVal === undefined) {
        delete newElement.props[propName];
      } else {
        newElement.props[propName] = newVal;
      }
      updateElement(activeElementId, newElement);
    };

    if (propSchema.enum) {
      const options = propSchema.enum.map((opt: any) => ({
        label: String(opt),
        value: opt,
      }));
      return (
        <ControlEntry
          key={propName}
          label={propName}
          action={action}
          variant={null as any}
        >
          <SelectControl
            value={val}
            onChange={handleStaticChange}
            settings={{ options }}
          />
        </ControlEntry>
      );
    }

    if (propSchema.type === "boolean") {
      const options = [
        { label: "True", value: true },
        { label: "False", value: false },
      ];
      return (
        <ControlEntry
          key={propName}
          label={propName}
          action={action}
          variant={null as any}
        >
          <SwitchControl
            value={val}
            onChange={handleStaticChange}
            settings={{ options }}
          />
        </ControlEntry>
      );
    }

    if (propSchema.type === "number") {
      return (
        <ControlEntry
          key={propName}
          label={propName}
          action={action}
          variant={null as any}
        >
          <DimensionControl
            value={val}
            onChange={handleStaticChange}
            settings={{
              units: [
                { label: "px", unit: "px" },
                { label: "%", unit: "%" },
                { label: "rem", unit: "rem" },
              ],
            }}
          />
        </ControlEntry>
      );
    }

    return (
      <ControlEntry
        key={propName}
        label={propName}
        action={action}
        variant={null as any}
      >
        <TextControl
          value={val !== undefined ? String(val) : ""}
          onChange={(newVal) => handleStaticChange(newVal || "")}
          settings={{ placeholder: `Enter ${propName}...`, stateful: true }}
        />
      </ControlEntry>
    );
  };

  const renderEventsSection = () => {
    const definedListeners = activeElement.listeners || {};
    const catalogEvents = componentInfo?.events?.properties || {};

    const eventNames = Array.from(
      new Set([...Object.keys(catalogEvents), ...Object.keys(definedListeners)]),
    );

    if (eventNames.length === 0) {
      return (
        <div className="px-4 py-2 text-xs text-neutral-content-muted">
          No events defined for this component.
        </div>
      );
    }

    const typeOptions = [
      { label: "Call Context Function ($call)", value: "$call" },
      { label: "Run Custom Code ($run)", value: "$run" },
    ];

    return (
      <div className="flex flex-col gap-3 px-4 py-2">
        {eventNames.map((evtName) => {
          const listener = definedListeners[evtName];
          const isConfigured = listener !== undefined;

          // Determine current type
          let listenerType: "$call" | "$run" = "$call";
          if (listener && typeof listener === "object") {
            if ("$run" in listener) {
              listenerType = "$run";
            }
          }

          return (
            <div
              key={evtName}
              className="flex flex-col gap-2 border-b border-white/5 pb-3 last:border-0 last:pb-0"
            >
              <div className="flex justify-between items-center h-7">
                <span className="text-xs font-bold text-neutral-content-muted">
                  {evtName}
                </span>
                {!isConfigured && (
                  <button
                    onClick={() => {
                      updateElement(activeElementId, {
                        ...activeElement,
                        listeners: {
                          ...definedListeners,
                          [evtName]: { $call: { fn: "", args: {} } },
                        },
                      });
                    }}
                    className="flex items-center gap-1 text-[10px] bg-white/5 hover:bg-white/10 text-foreground-200 px-2 py-1 rounded transition-colors"
                  >
                    <Plus size={10} />
                    <span>Configure</span>
                  </button>
                )}
                {isConfigured && (
                  <button
                    onClick={() => {
                      const newElement = { ...activeElement };
                      if (newElement.listeners) {
                        delete newElement.listeners[evtName];
                        if (Object.keys(newElement.listeners).length === 0) {
                          delete newElement.listeners;
                        }
                      }
                      updateElement(activeElementId, newElement);
                    }}
                    className="text-red-400 hover:text-red-300 transition-colors"
                    title="Remove Listener"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>

              {isConfigured && (
                <div className="flex flex-col gap-2 mt-1 pl-2 border-l border-white/10">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-neutral-content-subtle font-medium">
                      Type
                    </span>
                    <SelectControl
                      value={listenerType}
                      onChange={(newType) => {
                        const newElement = { ...activeElement };
                        if (newType === "$call") {
                          newElement.listeners[evtName] = {
                            $call: { fn: "", args: {} },
                          };
                        } else {
                          newElement.listeners[evtName] = {
                            $run: "",
                          };
                        }
                        updateElement(activeElementId, newElement);
                      }}
                      settings={{ options: typeOptions }}
                    />
                  </div>

                  {listenerType === "$call" && (
                    <>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-neutral-content-subtle font-medium">
                          Function Path
                        </span>
                        <TextControl
                          value={listener.$call?.fn || ""}
                          onChange={(newVal) => {
                            const newElement = { ...activeElement };
                            newElement.listeners[evtName] = {
                              $call: {
                                ...listener.$call,
                                fn: newVal || "",
                              },
                            };
                            updateElement(activeElementId, newElement);
                          }}
                          settings={{
                            placeholder: "e.g. workspace.goTo",
                            stateful: true,
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-neutral-content-subtle font-medium">
                          Arguments (JSON)
                        </span>
                        <TextControl
                          value={JSON.stringify(listener.$call?.args || {})}
                          onChange={(newVal) => {
                            try {
                              const parsed = JSON.parse(newVal || "{}");
                              const newElement = { ...activeElement };
                              newElement.listeners[evtName] = {
                                $call: {
                                  ...listener.$call,
                                  args: parsed,
                                },
                              };
                              updateElement(activeElementId, newElement);
                            } catch (e) {
                              // Allow typing invalid JSON temporarily
                            }
                          }}
                          settings={{ placeholder: "{}", stateful: true }}
                        />
                      </div>
                    </>
                  )}

                  {listenerType === "$run" && (
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-neutral-content-subtle font-medium">
                        Script ($run)
                      </span>
                      <textarea
                        value={listener.$run || ""}
                        onChange={(e) => {
                          const newVal = e.target.value;
                          const newElement = { ...activeElement };
                          newElement.listeners[evtName] = {
                            $run: newVal || "",
                          };
                          updateElement(activeElementId, newElement);
                        }}
                        placeholder="e.g. $.setState({ selectedId: event.id });"
                        rows={4}
                        className="w-full bg-black/20 border border-white/10 rounded-md p-2 text-xs font-mono text-foreground-200 focus:outline-none focus:border-white/20 resize-y"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderChildrenSection = () => {
    const childrenList = activeElement.children || [];

    return (
      <div className="flex flex-col gap-2 px-4 py-2">
        {childrenList.map((childId: string, idx: number) => (
          <div
            key={`${childId}-${idx}`}
            className="flex justify-between items-center bg-black/10 px-2 py-1.5 rounded border border-white/5"
          >
            <span className="font-mono text-xs text-foreground-300">
              {childId}
            </span>
            <button
              onClick={() => {
                const newElement = { ...activeElement };
                newElement.children = childrenList.filter(
                  (c: string) => c !== childId,
                );
                updateElement(activeElementId, newElement);
              }}
              className="text-neutral-content-subtle hover:text-red-400 transition-colors"
            >
              <Trash2 size={12} />
            </button>
          </div>
        ))}

        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="Add child element ID..."
            value={newChildId}
            onChange={(e) => setNewChildId(e.target.value)}
            className="flex-1 bg-black/20 text-xs px-2 py-1.5 rounded border border-white/10 outline-none focus:border-primary-500/50"
          />
          <button
            onClick={() => {
              if (newChildId) {
                const newElement = { ...activeElement };
                newElement.children = [...childrenList, newChildId];
                updateElement(activeElementId, newElement);
                setNewChildId("");
              }
            }}
            className="bg-white/5 hover:bg-white/10 text-foreground-200 px-3 py-1.5 rounded text-xs transition-colors flex items-center gap-1 border border-white/10"
          >
            <Plus size={12} />
            <span>Add</span>
          </button>
        </div>
      </div>
    );
  };

  const componentOptions = Object.keys(catalog || {}).map((name) => ({
    label: name,
    value: name,
  }));

  return (
    <div className="h-full overflow-auto flex flex-col gap-4 py-4">
      <div className="flex flex-col gap-3 pb-4 border-b border-white/10 px-4">
        {selection.length > 1 && (
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-neutral-content-muted uppercase">
              Selection
            </span>
            <SelectControl
              value={activeElementId}
              onChange={(v) => {
                if (v) setActiveElementId(v);
              }}
              settings={{
                options: selection.map((id) => ({
                  label: id,
                  value: id,
                })),
              }}
            />
          </div>
        )}

        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-neutral-content-muted uppercase">
              Element ID
            </span>
            <span className="font-mono text-xs font-bold text-foreground-100">
              {activeElementId}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-neutral-content-muted uppercase">
            Component Type
          </span>
          <SelectControl
            value={activeElement.component}
            onChange={(v) => {
              if (v) handleComponentChange(v);
            }}
            settings={{
              options: componentOptions,
            }}
          />
        </div>
      </div>

      <div className="grow flex flex-col">
        <Section title="Properties" icon={Settings}>
          <div className="flex flex-col gap-2.5 px-4 py-2">
            {Object.keys(properties).length === 0 ? (
              <span className="text-xs text-neutral-content-muted">
                No properties defined.
              </span>
            ) : (
              Object.entries(properties).map(([pName, pSchema]) =>
                renderPropertyControl(pName, pSchema),
              )
            )}
          </div>
        </Section>

        <Section title="Events" icon={Box}>
          {renderEventsSection()}
        </Section>

        <Section title="Structure" icon={Database}>
          {renderChildrenSection()}
        </Section>

        <Section title="Raw JSON Specification" icon={FileCode}>
          <div className="px-4 py-2 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-neutral-content-muted">
                Directly edit element JSON
              </span>
              <div className="flex gap-2">
                {!isEditingJson ? (
                  <>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1 px-2 py-1 text-[10px] bg-white/5 hover:bg-white/10 text-foreground-200 rounded transition-colors"
                      title="Copy element spec"
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
                  {JSON.stringify(activeElement, null, 2)}
                </pre>
              )}
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
