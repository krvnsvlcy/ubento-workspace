import { useTheme, ThemeMode } from "@/contexts/theme";
import { Content, ContentBody, ContentHeader, Heading, ScrollArea, Text } from "@ubento/bento.arlo-core";
import { Moon, Sun, Monitor } from "lucide-react";
import { FC } from "react";
import clsx from "clsx";

export const AppearanceTab: FC = () => {
  const { themeMode, setThemeMode } = useTheme();

  const options = [
    {
      mode: "light" as ThemeMode,
      label: "Light",
      description: "Always use a light appearance.",
      icon: Sun,
    },
    {
      mode: "dark" as ThemeMode,
      label: "Dark",
      description: "Always use a dark appearance.",
      icon: Moon,
    },
    {
      mode: "system" as ThemeMode,
      label: "System",
      description: "Match your system preference.",
      icon: Monitor,
    },
  ];

  return (
    <Content>
      <ContentHeader>
        <div className="space-y-1">
          <Heading>Appearance</Heading>
          <Text shade="subtle">Customize how Ubento looks on your device.</Text>
        </div>
      </ContentHeader>
      <ContentBody
        paddingX={false}
        paddingY={false}
        className="overflow-hidden flex flex-col"
      >
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-8">
            <section className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {options.map((opt) => {
                  const Icon = opt.icon;
                  const isActive = themeMode === opt.mode;
                  return (
                    <button
                      key={opt.mode}
                      onClick={() => setThemeMode(opt.mode)}
                      className={clsx(
                        "flex flex-col items-start gap-4 p-5 rounded-2xl border text-left transition-all relative overflow-hidden",
                        isActive
                          ? "bg-surface-hover border-content/30 ring-2 ring-content/10"
                          : "bg-surface border-border hover:bg-surface-hover/50"
                      )}
                    >
                      <div className={clsx(
                        "p-2.5 rounded-xl border transition-colors",
                        isActive
                          ? "bg-background border-border text-content"
                          : "bg-surface-hover border-border text-content-subtle"
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-content leading-none">
                          {opt.label}
                        </h4>
                        <p className="text-xs text-content-muted leading-normal">
                          {opt.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        </ScrollArea>
      </ContentBody>
    </Content>
  );
};
