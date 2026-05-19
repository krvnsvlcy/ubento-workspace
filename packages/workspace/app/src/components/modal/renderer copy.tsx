import { ModalInstanceProvider, useModalStore } from "@/utils/modal-store";
import { AnimatePresence, motion } from "motion/react";

export function ModalRenderer() {
  const activeModal = useModalStore((s) => s.queue[0]);
  const close = useModalStore((s) => s.close);

  console.log("activeModal", activeModal);

  return (
    <>
      <AnimatePresence mode="popLayout">
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 py-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              onClick={() => close(activeModal.id)}
              className="absolute inset-0 -z-10 bg-background/50"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="overflow-hidden rounded-3xl bg-background shadow-2xl"
            >
              <ModalInstanceProvider
                key={activeModal.id}
                value={{
                  id: activeModal.id,
                  close: (result?: any) => close(activeModal.id, result),
                }}
              >
                <activeModal.component {...activeModal.props} />
              </ModalInstanceProvider>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
