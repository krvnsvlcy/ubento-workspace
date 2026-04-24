import { Modal } from "@/components/modal";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Team Settings">
      <div className="grid grid-cols-2 gap-8 py-4">
        <div className="space-y-6">
          <h3 className="font-medium">General</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-10 w-full rounded-lg bg-background-200"
              />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="font-medium">Preference</h3>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-10 w-full rounded-lg bg-background-200"
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
