import { AnimatePresence, motion } from "motion/react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { TsStatusItem } from "./ts-status-item";

interface PanelContentProps {
  anchor: Element;
  content: ReactNode;
  onClose: () => void;
}

function PanelContent({ anchor, content, onClose }: PanelContentProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const anchorRect = anchor.getBoundingClientRect();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        !anchor.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [anchor, onClose]);

  return (
    <motion.div
      ref={panelRef}
      style={{
        position: "fixed",
        top: anchorRect.top - 8,
        left: anchorRect.left + anchorRect.width / 2,
        zIndex: 1000,
      }}
      initial={{ opacity: 0, x: "-50%", y: "-90%", scale: 0.95 }}
      animate={{ opacity: 1, x: "-50%", y: "-100%", scale: 1 }}
      exit={{ opacity: 0, x: "-50%", y: "-90%", scale: 0.95 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="border rounded-xl bg-background shadow-lg"
    >
      {content}
    </motion.div>
  );
}

export function EditorFooter() {
  const [panelContent, setPanelContent] = useState<ReactNode | null>(null);
  const [anchor, setAnchor] = useState<Element | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [panelId, setPanelId] = useState(0);

  const showPanel = (node: ReactNode, targetAnchor: Element) => {
    if (isOpen && anchor === targetAnchor) {
      setIsOpen(false);
    } else {
      setPanelContent(node);
      setAnchor(targetAnchor);
      setIsOpen(true);
      setPanelId((id) => id + 1);
    }
  };

  return (
    <div className="flex flex-col border-t border-border select-none shrink-0 relative">
      <TsStatusItem showPanel={showPanel} />

      <AnimatePresence>
        {isOpen && panelContent && anchor && (
          <PanelContent
            key={panelId}
            anchor={anchor}
            content={panelContent}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
