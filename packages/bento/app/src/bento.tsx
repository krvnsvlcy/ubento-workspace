import { ErrorView } from "@/components/error";
import { BentoHostContext } from "@/contexts/host";
import { BentoHost, BentoLocation } from "@/types";
import { App } from "@/views/app/app";
import { Apps } from "@/views/apps/apps";
import { Home } from "@/views/home/home";
import { BentoSessionContext } from "./contexts/session";

export function Bento({
  host,
  location,
}: {
  host: BentoHost;
  location: BentoLocation;
}) {
  let content = <></>;

  switch (location.view) {
    case "home":
      content = <Home />;
      break;
    case "app":
      content = <App slug={location.params.slug} />;
      break;
    case "apps":
      content = <Apps />;
      break;
    default:
      content = (
        <ErrorView message={`Unknown view: ${(location as any).view}`} />
      );
  }

  return (
    <BentoHostContext value={host}>
      <BentoSessionContext value={host.session}>{content}</BentoSessionContext>
    </BentoHostContext>
  );
}
