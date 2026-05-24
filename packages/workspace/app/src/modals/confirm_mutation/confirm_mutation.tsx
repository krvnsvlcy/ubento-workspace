import { useModalInstance } from "@/utils/modal-store";
import {
  AlertModalContainer,
  Button,
  Heading,
  Text,
} from "@ubento/bento.arlo-core";

interface ConfirmMutationModalProps {
  service: string;
  action: string;
  args?: Record<string, unknown>;
}

export function ConfirmMutationModal({
  service,
  action,
  args,
}: ConfirmMutationModalProps) {
  const { close } = useModalInstance();

  return (
    <AlertModalContainer className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6">
        <Heading>Confirm Action</Heading>
      </div>

      {/* Content */}
      <div className="px-8 pb-8 flex flex-col space-y-6">
        <div className="space-y-3">
          <Text>
            Are you sure you want to execute action{" "}
            <span className="font-semibold">{action}</span> on service{" "}
            <span className="font-semibold">{service}</span>?
          </Text>
          {args && Object.keys(args).length > 0 && (
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded p-4 border border-neutral-200 dark:border-neutral-800">
              <span className="text-xs font-semibold text-neutral-500 uppercase block mb-1">
                Arguments:
              </span>
              <pre className="text-xs overflow-auto max-h-40 font-mono text-neutral-800 dark:text-neutral-200">
                {JSON.stringify(args, null, 2)}
              </pre>
            </div>
          )}
        </div>

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
            className="flex-1"
          >
            Confirm Action
          </Button>
        </div>
      </div>
    </AlertModalContainer>
  );
}
