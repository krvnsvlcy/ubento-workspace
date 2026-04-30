import { FC } from "react";

export const UsageTab: FC = () => {
  const usageItems = [
    {
      label: "AI Credits",
      used: 850,
      total: 1000,
      unit: "credits",
    },
    {
      label: "Build Runs",
      used: 142,
      total: 500,
      unit: "runs",
    },
    { label: "Storage", used: 4.2, total: 10, unit: "GB" },
  ];

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {usageItems.map((item) => (
        <div
          key={item.label}
          className="p-5 rounded-2xl bg-background-200 border border-foreground/5 space-y-3"
        >
          <div className="flex justify-between items-end">
            <div>
              <h4 className="font-bold text-foreground">{item.label}</h4>
              <p className="text-[10px] text-foreground-400 uppercase font-bold tracking-wider">
                Usage this period
              </p>
            </div>
            <p className="text-sm font-bold">
              {item.used}{" "}
              <span className="text-foreground-400 font-medium">
                / {item.total} {item.unit}
              </span>
            </p>
          </div>
          <div className="h-2 w-full bg-background-400 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 transition-all duration-1000"
              style={{
                width: `${(item.used / item.total) * 100}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
