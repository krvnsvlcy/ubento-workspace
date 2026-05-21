import { Button } from "@ubento/bento.arlo-core";
import { ArrowLeft } from "lucide-react";
import { useAppModal } from "./hook";

export function GoBack() {
  const { canGoBack, goBack } = useAppModal();

  if (!canGoBack) {
    return <></>;
  }

  return (
    <Button onClick={() => goBack()} variant="link-subtle">
      <ArrowLeft size={16} />
      Go Back
    </Button>
  );
}
