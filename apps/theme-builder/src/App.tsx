import {
  Button,
  Tabs,
  TabsList,
  TabsTrigger,
  type HslInput,
  type ThemeRoot,
} from "@ubento/bento.arlo-core";
import {
  CheckCircle,
  FileText,
  LayoutGrid,
  Moon,
  Palette,
  PanelLeftOpen,
  Settings,
  Sun,
} from "lucide-react";
import { useEffect, useState } from "react";
import PreviewDashboard from "./components/PreviewDashboard";
import "./index.css";

const commonFonts = [
  "Geist",
  "Inter",
  "Manrope",
  "Plus Jakarta Sans",
  "IBM Plex Sans",
  "Fira Code",
  "Geist Mono",
  "JetBrains Mono",
  "IBM Plex Mono",
  "Fraunces",
  "Lora",
  "Newsreader",
  "Roboto Slab",
  "IBM Plex Serif",
  "Zilla Slab",
];

export default function App() {
  const [themeRoot, setThemeRoot] = useState<ThemeRoot>({
    colors: {
      accent: { h: 150, s: 0.8, l: 0.5 }, // Emerald-like
      neutral: { h: 220, s: 0.1, l: 0.5 }, // Cool gray-like
      background: { l: 0.98 },
    },
    fonts: {
      heading: "Inter",
      body: "Inter",
      code: "monospace",
    },
  });

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<"theme" | "preview">("theme");
  const [activePreview, setActivePreview] = useState<string>("sandbox");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // useEffect(() => {
  //   try {
  //     const theme = generateTheme(themeRoot);
  //     const css = themeToCss(theme);

  //     let styleTag = document.getElementById("theme-variables");
  //     if (!styleTag) {
  //       styleTag = document.createElement("style");
  //       styleTag.id = "theme-variables";
  //       document.head.appendChild(styleTag);
  //     }
  //     styleTag.innerHTML = css;
  //   } catch (e) {
  //     console.error("Failed to generate theme", e);
  //   }
  // }, [themeRoot]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleColorChannelChange = (
    colorKey: "accent" | "neutral",
    channel: keyof HslInput,
    value: number,
  ) => {
    setThemeRoot((prev: ThemeRoot) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorKey]: {
          ...prev.colors[colorKey],
          [channel]: value,
        },
      },
    }));
  };

  const handleBgLightnessChange = (value: number) => {
    setThemeRoot((prev: ThemeRoot) => ({
      ...prev,
      colors: {
        ...prev.colors,
        background: {
          l: value,
        },
      },
    }));
  };

  const handleFontChange = (key: keyof ThemeRoot["fonts"], value: string) => {
    setThemeRoot((prev: ThemeRoot) => ({
      ...prev,
      fonts: {
        ...prev.fonts,
        [key]: value,
      },
    }));
  };

  // const handleDownload = () => {
  //   const theme = generateTheme(themeRoot);
  //   const dataStr =
  //     "data:text/json;charset=utf-8," +
  //     encodeURIComponent(JSON.stringify(theme, null, 2));
  //   const a = document.createElement("a");
  //   a.href = dataStr;
  //   a.download = `theme.json`;
  //   a.click();
  // };

  // Gradients for sliders
  const hueGradient = `linear-gradient(to right, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%))`;

  const accentSatGradient = `linear-gradient(to right, hsl(${themeRoot.colors.accent.h}, 0%, ${(themeRoot.colors.accent.l * 100).toFixed(0)}%), hsl(${themeRoot.colors.accent.h}, 100%, ${(themeRoot.colors.accent.l * 100).toFixed(0)}%))`;
  const accentLightGradient = `linear-gradient(to right, hsl(${themeRoot.colors.accent.h}, ${(themeRoot.colors.accent.s * 100).toFixed(0)}%, 0%), hsl(${themeRoot.colors.accent.h}, ${(themeRoot.colors.accent.s * 100).toFixed(0)}%, 100%))`;

  const neutralSatGradient = `linear-gradient(to right, hsl(${themeRoot.colors.neutral.h}, 0%, ${(themeRoot.colors.neutral.l * 100).toFixed(0)}%), hsl(${themeRoot.colors.neutral.h}, 100%, ${(themeRoot.colors.neutral.l * 100).toFixed(0)}%))`;
  const neutralLightGradient = `linear-gradient(to right, hsl(${themeRoot.colors.neutral.h}, ${(themeRoot.colors.neutral.s * 100).toFixed(0)}%, 0%), hsl(${themeRoot.colors.neutral.h}, ${(themeRoot.colors.neutral.s * 100).toFixed(0)}%, 100%))`;

  // Background inherits neutral's hue and saturation, limited to 90-100% lightness
  const bgLightGradient = `linear-gradient(to right, hsl(${themeRoot.colors.neutral.h}, ${(themeRoot.colors.neutral.s * 100).toFixed(0)}%, 90%), hsl(${themeRoot.colors.neutral.h}, ${(themeRoot.colors.neutral.s * 100).toFixed(0)}%, 100%))`;

  return (
    <div className="flex flex-col h-screen bg-background text-tone-content transition-colors">
      <style>{`
        .color-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 10px;
          border-radius: 5px;
          outline: none;
          border: 1px solid rgba(0,0,0,0.1);
        }
        .color-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: white;
          border: 2px solid #6B7280;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
          transition: transform 0.1s;
        }
        .color-slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        .color-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          border: 2px solid #6B7280;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
          transition: transform 0.1s;
        }
        .color-slider::-moz-range-thumb:hover {
          transform: scale(1.1);
        }
      `}</style>

      {/* Navbar */}
      <header className="flex-none h-16 border-b border-neutral-border bg-neutral-surface/50 backdrop-blur flex items-center justify-between px-6 z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-neutral-content-muted hover:text-neutral-content"
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <PanelLeftOpen
              className={`size-[18px] transition-transform duration-300 ${isSidebarCollapsed ? "" : "rotate-180"}`}
            />
          </Button>
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-accent-contrast shadow-md">
            <Palette size={16} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Theme Builder</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
          </Button>

          {/* <Button onClick={handleDownload} className="gap-2 shadow-md">
            <Download size={16} />
            Export Theme
          </Button> */}
        </div>
      </header>

      {/* Main App */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`flex-none border-r border-neutral-border bg-neutral-surface/30 flex flex-col backdrop-blur-sm shadow-sm z-0 transition-all duration-300 ease-in-out ${
            isSidebarCollapsed ? "w-0 border-r-0 overflow-hidden" : "w-80"
          }`}
        >
          <div className="border-b border-neutral-border p-3">
            <Tabs
              value={sidebarTab}
              onValueChange={(val) => setSidebarTab(val as "theme" | "preview")}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="theme">Theme</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {sidebarTab === "theme" ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-content-muted mb-3 px-1">
                    Colors (HSL)
                  </h3>

                  {/* Accent */}
                  <div className="space-y-3 mb-6">
                    <label className="text-sm font-bold text-accent">
                      Accent Color
                    </label>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span>Hue</span>
                        <span>{Math.round(themeRoot.colors.accent.h)}°</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        step="1"
                        value={themeRoot.colors.accent.h}
                        onChange={(e) =>
                          handleColorChannelChange(
                            "accent",
                            "h",
                            parseFloat(e.target.value),
                          )
                        }
                        className="color-slider"
                        style={{ background: hueGradient }}
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span>Saturation</span>
                        <span>
                          {(themeRoot.colors.accent.s * 100).toFixed(0)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={themeRoot.colors.accent.s}
                        onChange={(e) =>
                          handleColorChannelChange(
                            "accent",
                            "s",
                            parseFloat(e.target.value),
                          )
                        }
                        className="color-slider"
                        style={{ background: accentSatGradient }}
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span>Lightness</span>
                        <span>
                          {(themeRoot.colors.accent.l * 100).toFixed(0)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={themeRoot.colors.accent.l}
                        onChange={(e) =>
                          handleColorChannelChange(
                            "accent",
                            "l",
                            parseFloat(e.target.value),
                          )
                        }
                        className="color-slider"
                        style={{ background: accentLightGradient }}
                      />
                    </div>
                  </div>

                  {/* Neutral */}
                  <div className="space-y-3 mb-6 border-t border-neutral-border pt-4">
                    <label className="text-sm font-bold">Neutral Color</label>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span>Hue</span>
                        <span>{Math.round(themeRoot.colors.neutral.h)}°</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        step="1"
                        value={themeRoot.colors.neutral.h}
                        onChange={(e) =>
                          handleColorChannelChange(
                            "neutral",
                            "h",
                            parseFloat(e.target.value),
                          )
                        }
                        className="color-slider"
                        style={{ background: hueGradient }}
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span>Saturation</span>
                        <span>
                          {(themeRoot.colors.neutral.s * 100).toFixed(0)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={themeRoot.colors.neutral.s}
                        onChange={(e) =>
                          handleColorChannelChange(
                            "neutral",
                            "s",
                            parseFloat(e.target.value),
                          )
                        }
                        className="color-slider"
                        style={{ background: neutralSatGradient }}
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span>Lightness</span>
                        <span>
                          {(themeRoot.colors.neutral.l * 100).toFixed(0)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={themeRoot.colors.neutral.l}
                        onChange={(e) =>
                          handleColorChannelChange(
                            "neutral",
                            "l",
                            parseFloat(e.target.value),
                          )
                        }
                        className="color-slider"
                        style={{ background: neutralLightGradient }}
                      />
                    </div>
                  </div>

                  {/* Background */}
                  <div className="space-y-3 border-t border-neutral-border pt-4">
                    <label className="text-sm font-bold">Background</label>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span>Lightness</span>
                        <span>
                          {(themeRoot.colors.background.l * 100).toFixed(1)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.9"
                        max="1"
                        step="0.001"
                        value={themeRoot.colors.background.l}
                        onChange={(e) =>
                          handleBgLightnessChange(parseFloat(e.target.value))
                        }
                        className="color-slider"
                        style={{ background: bgLightGradient }}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-neutral-border pt-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-content-muted mb-3 px-1">
                    Fonts
                  </h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Heading</label>
                      <select
                        value={themeRoot.fonts.heading}
                        onChange={(e) =>
                          handleFontChange("heading", e.target.value)
                        }
                        className="w-full h-10 rounded border border-neutral-border bg-neutral-surface px-2 text-sm focus:outline-none"
                      >
                        {commonFonts.map((font) => (
                          <option key={font} value={font}>
                            {font}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Body</label>
                      <select
                        value={themeRoot.fonts.body}
                        onChange={(e) =>
                          handleFontChange("body", e.target.value)
                        }
                        className="w-full h-10 rounded border border-neutral-border bg-neutral-surface px-2 text-sm focus:outline-none"
                      >
                        {commonFonts.map((font) => (
                          <option key={font} value={font}>
                            {font}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium">Code</label>
                      <select
                        value={themeRoot.fonts.code}
                        onChange={(e) =>
                          handleFontChange("code", e.target.value)
                        }
                        className="w-full h-10 rounded border border-neutral-border bg-neutral-surface px-2 text-sm focus:outline-none"
                      >
                        {commonFonts.map((font) => (
                          <option key={font} value={font}>
                            {font}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-content-muted mb-3 px-1">
                  Preview Layout
                </h3>

                <div
                  className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                    activePreview === "sandbox"
                      ? "border-accent bg-accent/5 ring-1 ring-accent/30"
                      : "border-neutral-border hover:bg-neutral-surface/50"
                  }`}
                  onClick={() => setActivePreview("sandbox")}
                >
                  <div className="flex items-center gap-2">
                    <LayoutGrid
                      size={16}
                      className={
                        activePreview === "sandbox"
                          ? "text-accent"
                          : "text-neutral-content-muted"
                      }
                    />
                    <span className="font-semibold text-sm">Bento Sandbox</span>
                  </div>
                  <p className="text-xs text-neutral-content-muted mt-1.5">
                    Re-engineered 7-column design system showcase.
                  </p>
                </div>

                <div
                  className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                    activePreview === "analytics"
                      ? "border-accent bg-accent/5 ring-1 ring-accent/30"
                      : "border-neutral-border hover:bg-neutral-surface/50"
                  }`}
                  onClick={() => setActivePreview("analytics")}
                >
                  <div className="flex items-center gap-2">
                    <Settings
                      size={16}
                      className={
                        activePreview === "analytics"
                          ? "text-accent"
                          : "text-neutral-content-muted"
                      }
                    />
                    <span className="font-semibold text-sm">
                      Executive Analytics
                    </span>
                  </div>
                  <p className="text-xs text-neutral-content-muted mt-1.5">
                    Visual dashboards, system latency stats, and charts.
                  </p>
                </div>

                <div
                  className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                    activePreview === "admin"
                      ? "border-accent bg-accent/5 ring-1 ring-accent/30"
                      : "border-neutral-border hover:bg-neutral-surface/50"
                  }`}
                  onClick={() => setActivePreview("admin")}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle
                      size={16}
                      className={
                        activePreview === "admin"
                          ? "text-accent"
                          : "text-neutral-content-muted"
                      }
                    />
                    <span className="font-semibold text-sm">
                      Admin Settings
                    </span>
                  </div>
                  <p className="text-xs text-neutral-content-muted mt-1.5">
                    User inputs, security configurations, and dialog forms.
                  </p>
                </div>

                <div
                  className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                    activePreview === "typography"
                      ? "border-accent bg-accent/5 ring-1 ring-accent/30"
                      : "border-neutral-border hover:bg-neutral-surface/50"
                  }`}
                  onClick={() => setActivePreview("typography")}
                >
                  <div className="flex items-center gap-2">
                    <FileText
                      size={16}
                      className={
                        activePreview === "typography"
                          ? "text-accent"
                          : "text-neutral-content-muted"
                      }
                    />
                    <span className="font-semibold text-sm">
                      Typography Specimen
                    </span>
                  </div>
                  <p className="text-xs text-neutral-content-muted mt-1.5">
                    Specimen breakdowns of headings, body, and inline/block
                    code.
                  </p>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Content Area */}
        <PreviewDashboard activePreview={activePreview} />
      </div>
    </div>
  );
}
