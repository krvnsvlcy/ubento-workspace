import {
  ContextMenuItemGroup,
  ContextMenuItem as EngineContextMenuItem,
} from "@/engine/app/context_menu";
import { useUbentoEngine } from "@/hooks/app-engine";
import {
  Card,
  Menu,
  MenuItem,
  MenuLabel,
  MenuSeparator,
} from "@ubento/bento.arlo-core";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

function isContextMenuItem(item: any): item is EngineContextMenuItem {
  return (
    item && typeof item === "object" && "label" in item && "action" in item
  );
}

function isContextMenuItemGroup(item: any): item is ContextMenuItemGroup {
  return (
    item &&
    typeof item === "object" &&
    "items" in item &&
    Array.isArray(item.items)
  );
}

export function ContextMenuRenderer() {
  const engine = useUbentoEngine();
  const contextMenu = engine.useState((s) => s.contextMenu);
  const [adjustedPos, setAdjustedPos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!contextMenu) {
      setAdjustedPos(null);
      return;
    }
    const menu = menuRef.current;
    if (!menu) {
      setAdjustedPos({ x: contextMenu.position.x, y: contextMenu.position.y });
      return;
    }

    const rect = menu.getBoundingClientRect();
    let x = contextMenu.position.x;
    let y = contextMenu.position.y;

    if (x + rect.width > window.innerWidth) {
      x = window.innerWidth - rect.width - 8;
    }
    if (x < 8) x = 8;

    if (y + rect.height > window.innerHeight) {
      y = window.innerHeight - rect.height - 8;
    }
    if (y < 8) y = 8;

    setAdjustedPos({ x, y });
  }, [contextMenu]);

  useEffect(() => {
    if (!contextMenu) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        engine.closeContextMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [contextMenu, engine]);

  return (
    <AnimatePresence>
      {contextMenu && (
        <>
          <div
            className="fixed inset-0 z-50 pointer-events-auto bg-transparent"
            onClick={() => engine.closeContextMenu()}
            onContextMenu={(e) => {
              e.preventDefault();
              engine.closeContextMenu();
            }}
          />
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{
              opacity: adjustedPos ? 1 : 0,
              scale: adjustedPos ? 1 : 0.95,
              y: adjustedPos ? 0 : -4,
            }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ type: "spring", duration: 0.2 }}
            style={{
              position: "fixed",
              left: adjustedPos ? adjustedPos.x : contextMenu.position.x,
              top: adjustedPos ? adjustedPos.y : contextMenu.position.y,
              zIndex: 1000,
            }}
          >
            <Card
              padding="xs"
              className="min-w-[240px] max-w-[320px] bg-background shadow-xl flex flex-col gap-0.5"
            >
              <Menu>
                {renderContent(contextMenu.content, () =>
                  engine.closeContextMenu(),
                )}
              </Menu>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function renderContent(
  content: (EngineContextMenuItem | ContextMenuItemGroup | React.ReactNode)[],
  onClose: () => void,
): React.ReactNode[] {
  const renderedElements: React.ReactNode[] = [];

  content.forEach((item, index) => {
    if (isContextMenuItemGroup(item)) {
      if (renderedElements.length > 0) {
        renderedElements.push(<MenuSeparator key={`sep-${index}`} />);
      }
      if (item.title) {
        renderedElements.push(
          <MenuLabel key={`title-${index}`}>{item.title}</MenuLabel>,
        );
      }
      item.items.forEach((subItem) => {
        renderedElements.push(
          <ContextMenuItemRow
            key={subItem.id}
            item={subItem}
            onClose={onClose}
          />,
        );
      });
    } else if (isContextMenuItem(item)) {
      const prevItem = content[index - 1];
      if (
        prevItem &&
        (isContextMenuItemGroup(prevItem) || !isContextMenuItem(prevItem))
      ) {
        renderedElements.push(<MenuSeparator key={`sep-${index}`} />);
      }
      renderedElements.push(
        <ContextMenuItemRow key={item.id} item={item} onClose={onClose} />,
      );
    } else {
      // Arbitrary ReactNode
      if (renderedElements.length > 0) {
        renderedElements.push(<MenuSeparator key={`sep-${index}`} />);
      }
      renderedElements.push(<div key={`node-${index}`}>{item}</div>);
    }
  });

  return renderedElements;
}

function ContextMenuItemRow({
  item,
  onClose,
}: {
  item: EngineContextMenuItem;
  onClose: () => void;
}) {
  const handleClick = (e: React.MouseEvent) => {
    if (item.disabled) {
      e.preventDefault();
      return;
    }
    item.action();
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (item.disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      item.action();
      onClose();
    }
  };

  return (
    <MenuItem
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      data-disabled={item.disabled || undefined}
    >
      {item.icon && (
        <span className="mr-1.5 size-4 flex items-center justify-center shrink-0">
          {item.icon}
        </span>
      )}
      <span className="flex-1 truncate">{item.label}</span>
    </MenuItem>
  );
}
