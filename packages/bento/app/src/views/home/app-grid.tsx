import { AppCard } from "@/views/home/app-card";

interface AppGridProps {
  apps: any[];
  isFetching: boolean;
  onOpenApp: (app: any) => void;
}

export function AppGrid({ apps, isFetching, onOpenApp }: AppGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {isFetching ? (
        [1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-2xl bg-background-300"
          />
        ))
      ) : apps.length > 0 ? (
        apps.map((app) => (
          <AppCard key={app.id} app={app} onClick={onOpenApp} />
        ))
      ) : (
        <div className="col-span-full py-12 text-center text-foreground-400">
          <p className="text-[13px]">No apps yet. Create your first one!</p>
        </div>
      )}
    </div>
  );
}
