import { useModalInstance } from "@/utils/modal-store";
import {
  AlertModalContainer,
  Button,
  Heading,
  Text,
} from "@ubento/bento.arlo-core";
import { Layout, Puzzle, ToyBrick } from "lucide-react";

interface UpgradeModuleModalProps {
  moduleId: string;
  versionId: string;
  latestVersionId: string;
  refs: { source: "board" | "module" | "component"; name: string }[];
}

export function UpgradeModuleModal({
  moduleId,
  versionId,
  latestVersionId,
  refs,
}: UpgradeModuleModalProps) {
  const { close } = useModalInstance();

  return (
    <AlertModalContainer className="flex flex-col max-w-md w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-border">
        <Heading>Upgrade Module</Heading>
      </div>

      {/* Content */}
      <div className="px-8 py-6 flex flex-col space-y-6">
        <div className="space-y-2">
          <Text className="text-content-muted">
            You are about to upgrade module <span className="font-mono text-foreground font-semibold">{moduleId}</span> to the latest version.
          </Text>
          <div className="text-xs text-content-muted space-y-1">
            <div>Current Version: <span className="font-mono font-semibold text-foreground">{versionId.slice(0, 8)}...</span></div>
            <div>Latest Version: <span className="font-mono font-semibold text-foreground">{latestVersionId.slice(0, 8)}...</span></div>
          </div>
        </div>

        {refs.length > 0 ? (
          <div className="space-y-3">
            <span className="text-[11px] font-bold tracking-wider text-content-subtle uppercase">
              The following references will be updated:
            </span>
            <div className="border border-border rounded-lg max-h-[180px] overflow-y-auto divide-y divide-border bg-surface/5">
              {refs.map((ref, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 text-xs">
                  {ref.source === "board" && <Layout size={14} className="text-blue-500 shrink-0" />}
                  {ref.source === "module" && <Puzzle size={14} className="text-purple-500 shrink-0" />}
                  {ref.source === "component" && <ToyBrick size={14} className="text-orange-500 shrink-0" />}
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">{ref.name}</span>
                    <span className="text-[10px] text-content-muted capitalize">{ref.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 border border-dashed border-border rounded-lg text-center bg-surface/5">
            <span className="text-xs text-content-muted">No references found for this module version.</span>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => close(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => close(true)}
            className="flex-1 bg-primary hover:bg-primary-hover text-primary-foreground"
          >
            Upgrade
          </Button>
        </div>
      </div>
    </AlertModalContainer>
  );
}
