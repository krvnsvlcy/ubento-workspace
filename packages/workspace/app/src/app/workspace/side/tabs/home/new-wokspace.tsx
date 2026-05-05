import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useUbento, useUbentoEngine } from "../../../../../engine/engine";

export function NewWorkspaceButton() {
  const ubento = useUbento();
  const engine = useUbentoEngine();
  const session = engine.useState((s) => s.session);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const createWorkspace = ubento.workspace.useCreateWorkspace();

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSubmit = async () => {
    if (!name.trim() || !session?.teamId) {
      setIsEditing(false);
      setName("");
      return;
    }

    try {
      const workspace = await createWorkspace.mutateAsync({
        name: name.trim(),
        team_id: session.teamId,
        data: {},
      });
      engine.openWorkspace(workspace.slug);
    } catch (e) {
      console.error("Failed to create workspace", e);
    } finally {
      setIsEditing(false);
      setName("");
    }
  };

  if (isEditing) {
    return (
      <div className="mt-1 px-1">
        <input
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
            if (e.key === "Escape") {
              setIsEditing(false);
              setName("");
            }
          }}
          onBlur={() => {
            if (!name.trim()) {
              setIsEditing(false);
            } else {
              handleSubmit();
            }
          }}
          placeholder="Workspace Name..."
          className="w-full bg-neutral-surface border border-accent/30 rounded-lg px-2 py-1.5 text-xs text-neutral-content outline-none ring-2 ring-accent/10 transition-all"
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      disabled={createWorkspace.isPending}
      className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-neutral-content-muted hover:bg-neutral-surface-hover hover:text-accent transition-all w-full text-left disabled:opacity-50"
    >
      <Plus size={14} />
      <span>{createWorkspace.isPending ? "Creating..." : "New Workspace"}</span>
    </button>
  );
}
