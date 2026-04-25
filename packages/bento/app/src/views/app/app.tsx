import { useAppBySlug } from "@/hooks/app";
import { AppContent } from "./content";
import { AppOverlay } from "./overlay";

export function App({ slug }: { slug: string }) {
  const { data: openedApp, isLoading, error } = useAppBySlug({ slug });

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      <AppOverlay app={openedApp} />
      <AppContent app={openedApp} loading={isLoading} error={error} />
    </div>
  );
}
