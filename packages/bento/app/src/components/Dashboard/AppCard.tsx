interface AppCardProps {
  app: any;
  onClick: (app: any) => void;
}

export function AppCard({ app, onClick }: AppCardProps) {
  return (
    <button
      onClick={() => onClick(app)}
      className="group relative flex h-28 cursor-pointer flex-col justify-end overflow-hidden rounded-2xl bg-background-300 p-4 transition-all hover:bg-background-200 text-left"
    >
      <div className="absolute left-4 top-4 h-8 w-8 rounded-lg bg-background-500 transition-transform group-hover:scale-110" />
      <h3 className="text-sm font-medium text-foreground">{app.name}</h3>
    </button>
  );
}
