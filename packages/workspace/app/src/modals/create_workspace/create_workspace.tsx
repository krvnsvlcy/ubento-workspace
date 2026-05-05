import React from "react";
import { Modal } from "../../app/components/modal";

interface CreateWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isCreating: boolean;
}

export function CreateWorkspaceModal({
  isOpen,
  onClose,
  onSubmit,
  isCreating,
}: CreateWorkspaceModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Workspace">
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
    </Modal>
  );
}
