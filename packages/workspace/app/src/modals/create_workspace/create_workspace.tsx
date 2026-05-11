import { useModalInstance } from "@/utils/modal-store";
import { X } from "lucide-react";
import React from "react";

interface CreateWorkspaceModalProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isCreating: boolean;
}

export function CreateWorkspaceModal({
  onSubmit,
  isCreating,
}: CreateWorkspaceModalProps) {
  const { close } = useModalInstance();

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Create New Workspace
        </h2>
        <button
          onClick={() => close()}
          className="group flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-background-300"
        >
          <X className="h-5 w-5 text-foreground-300 group-hover:text-foreground-200" />
        </button>
      </div>

      {/* Content */}
      <div className="px-8 pb-8">
        <form onSubmit={onSubmit} className="flex flex-col space-y-6 pt-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-[11px] font-semibold uppercase tracking-wider text-neutral-content-subtle"
            >
              Workspace Name
            </label>
            <input
              autoFocus
              id="name"
              name="name"
              placeholder="e.g. Stock Manager"
              required
              className="w-full rounded-xl border border-neutral-border bg-neutral-surface px-4 py-2.5 text-[13px] text-neutral-content placeholder:text-neutral-content-muted focus:border-neutral-border-hover focus:outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={isCreating}
            className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-neutral-content px-6 py-2.5 text-[13px] font-medium text-neutral-contrast transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isCreating ? "Creating..." : "Create Workspace"}
          </button>
        </form>
      </div>
    </div>
  );
}
