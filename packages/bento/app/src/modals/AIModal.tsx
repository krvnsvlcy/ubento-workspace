import { Modal } from "@/components/modal";
import { Sparkles } from "lucide-react";

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIModal({ isOpen, onClose }: AIModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Start with AI">
      <div className="flex h-full flex-col items-center justify-center space-y-4">
        <div className="h-20 w-20 rounded-2xl bg-background-300 flex items-center justify-center">
          <Sparkles className="h-8 w-8 text-foreground-400" />
        </div>
        <p className="text-foreground-300 text-center px-4">
          Describe what you want to build and let AI handle the heavy lifting.
        </p>
      </div>
    </Modal>
  );
}
