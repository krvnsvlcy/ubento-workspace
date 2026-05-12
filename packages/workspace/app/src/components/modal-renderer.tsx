import { ModalInstanceProvider, useModalStore } from "@/utils/modal-store";
import { AnimatePresence } from "motion/react";
import { Modal } from "./modal";

export function ModalRenderer() {
  const activeModal = useModalStore((s) => s.queue[0]);
  const close = useModalStore((s) => s.close);

  return (
    <>
      <AnimatePresence mode="popLayout">
        {activeModal && (
          <ModalInstanceProvider
            key={activeModal.id}
            value={{
              id: activeModal.id,
              close: (result?: any) => close(activeModal.id, result),
            }}
          >
            <Modal>
              <activeModal.component {...activeModal.props} />
            </Modal>
          </ModalInstanceProvider>
        )}
      </AnimatePresence>
    </>
  );
}
