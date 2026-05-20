import { useState, useEffect } from "react";
import { 
  generateTheme, 
  themeToCss, 
  type ThemeRoot,
  type HslInput,
  Button,
  Card,
  Badge,
  Input
} from "@ubento/bento.arlo-core";
import { Palette, Box, Sun, Moon, Download } from "lucide-react";

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
  "Zilla Slab"
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

  useEffect(() => {
    try {
      const theme = generateTheme(themeRoot);
      const css = themeToCss(theme);
      
      let styleTag = document.getElementById("theme-variables");
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = "theme-variables";
        document.head.appendChild(styleTag);
      }
      styleTag.innerHTML = css;
    } catch (e) {
      console.error("Failed to generate theme", e);
    }
  }, [themeRoot]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleColorChannelChange = (colorKey: 'accent' | 'neutral', channel: keyof HslInput, value: number) => {
    setThemeRoot((prev: ThemeRoot) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorKey]: {
          ...prev.colors[colorKey],
          [channel]: value
        }
      }
    }));
  };

  const handleBgLightnessChange = (value: number) => {
    setThemeRoot((prev: ThemeRoot) => ({
      ...prev,
      colors: {
        ...prev.colors,
        background: {
          l: value
        }
      }
    }));
  };

  const handleFontChange = (key: keyof ThemeRoot['fonts'], value: string) => {
    setThemeRoot((prev: ThemeRoot) => ({
      ...prev,
      fonts: {
        ...prev.fonts,
        [key]: value
      }
    }));
  };

  const handleDownload = () => {
    const theme = generateTheme(themeRoot);
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(theme, null, 2));
    const a = document.createElement("a");
    a.href = dataStr;
    a.download = `theme.json`;
    a.click();
  };

  // Gradients for sliders
  const hueGradient = `linear-gradient(to right, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%))`;
  
  const accentSatGradient = `linear-gradient(to right, hsl(${themeRoot.colors.accent.h}, 0%, ${(themeRoot.colors.accent.l * 100).toFixed(0)}%), hsl(${themeRoot.colors.accent.h}, 100%, ${(themeRoot.colors.accent.l * 100).toFixed(0)}%))`;
  const accentLightGradient = `linear-gradient(to right, hsl(${themeRoot.colors.accent.h}, ${(themeRoot.colors.accent.s * 100).toFixed(0)}%, 0%), hsl(${themeRoot.colors.accent.h}, ${(themeRoot.colors.accent.s * 100).toFixed(0)}%, 100%))`;

  const neutralSatGradient = `linear-gradient(to right, hsl(${themeRoot.colors.neutral.h}, 0%, ${(themeRoot.colors.neutral.l * 100).toFixed(0)}%), hsl(${themeRoot.colors.neutral.h}, 100%, ${(themeRoot.colors.neutral.l * 100).toFixed(0)}%))`;
  const neutralLightGradient = `linear-gradient(to right, hsl(${themeRoot.colors.neutral.h}, ${(themeRoot.colors.neutral.s * 100).toFixed(0)}%, 0%), hsl(${themeRoot.colors.neutral.h}, ${(themeRoot.colors.neutral.s * 100).toFixed(0)}%, 100%))`;

  // Background inherits neutral's hue and saturation, limited to 90-100% lightness
  const bgLightGradient = `linear-gradient(to right, hsl(${themeRoot.colors.neutral.h}, ${(themeRoot.colors.neutral.s * 100).toFixed(0)}%, 90%), hsl(${themeRoot.colors.neutral.h}, ${(themeRoot.colors.neutral.s * 100).toFixed(0)}%, 100%))`;

  return (
    <div className="flex flex-col h-screen bg-background text-neutral-content transition-colors">
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

          <Button onClick={handleDownload} className="gap-2 shadow-md">
            <Download size={16} />
            Export Theme
          </Button>
        </div>
      </header>

      {/* Main App */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-80 flex-none border-r border-neutral-border bg-neutral-surface/30 flex flex-col backdrop-blur-sm shadow-sm z-0">
          <div className="p-4 border-b border-neutral-border">
            <h2 className="font-semibold text-lg">Theme Settings</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-content-muted mb-3 px-1">
                Colors (HSL)
              </h3>
              
              {/* Accent */}
              <div className="space-y-3 mb-6">
                <label className="text-sm font-bold text-accent">Accent Color</label>
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
                    onChange={(e) => handleColorChannelChange('accent', 'h', parseFloat(e.target.value))}
                    className="color-slider"
                    style={{ background: hueGradient }}
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span>Saturation</span>
                    <span>{(themeRoot.colors.accent.s * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={themeRoot.colors.accent.s}
                    onChange={(e) => handleColorChannelChange('accent', 's', parseFloat(e.target.value))}
                    className="color-slider"
                    style={{ background: accentSatGradient }}
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span>Lightness</span>
                    <span>{(themeRoot.colors.accent.l * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={themeRoot.colors.accent.l}
                    onChange={(e) => handleColorChannelChange('accent', 'l', parseFloat(e.target.value))}
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
                    onChange={(e) => handleColorChannelChange('neutral', 'h', parseFloat(e.target.value))}
                    className="color-slider"
                    style={{ background: hueGradient }}
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span>Saturation</span>
                    <span>{(themeRoot.colors.neutral.s * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={themeRoot.colors.neutral.s}
                    onChange={(e) => handleColorChannelChange('neutral', 's', parseFloat(e.target.value))}
                    className="color-slider"
                    style={{ background: neutralSatGradient }}
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span>Lightness</span>
                    <span>{(themeRoot.colors.neutral.l * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={themeRoot.colors.neutral.l}
                    onChange={(e) => handleColorChannelChange('neutral', 'l', parseFloat(e.target.value))}
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
                    <span>{(themeRoot.colors.background.l * 100).toFixed(1)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.9"
                    max="1"
                    step="0.001"
                    value={themeRoot.colors.background.l}
                    onChange={(e) => handleBgLightnessChange(parseFloat(e.target.value))}
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
                    onChange={(e) => handleFontChange('heading', e.target.value)}
                    className="w-full h-10 rounded border border-neutral-border bg-neutral-surface px-2 text-sm focus:outline-none"
                  >
                    {commonFonts.map(font => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Body</label>
                  <select
                    value={themeRoot.fonts.body}
                    onChange={(e) => handleFontChange('body', e.target.value)}
                    className="w-full h-10 rounded border border-neutral-border bg-neutral-surface px-2 text-sm focus:outline-none"
                  >
                    {commonFonts.map(font => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Code</label>
                  <select
                    value={themeRoot.fonts.code}
                    onChange={(e) => handleFontChange('code', e.target.value)}
                    className="w-full h-10 rounded border border-neutral-border bg-neutral-surface px-2 text-sm focus:outline-none"
                  >
                    {commonFonts.map(font => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-neutral-surface/10 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">Preview Dashboard</h2>
                <p className="text-neutral-content-muted">
                  See your theme applied across components instantly.
                </p>
              </div>
              <Badge
                variant="outline"
                className="px-3 py-1 text-sm bg-neutral-surface"
              >
                <Box size={14} className="mr-2 inline" /> Components
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="overflow-hidden border-neutral-border shadow-lg">
                <div className="h-2 w-full bg-accent" />
                <div className="p-6 space-y-1.5">
                  <h3 className="text-xl font-semibold">Create Account</h3>
                  <p className="text-sm text-neutral-content-muted">
                    Enter your information below to register.
                  </p>
                </div>
                <div className="p-6 pt-0 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full font-semibold">
                      GitHub
                    </Button>
                    <Button variant="outline" className="w-full font-semibold">
                      Google
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-neutral-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-neutral-surface px-2 text-neutral-content-muted">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input placeholder="m@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <Input type="password" />
                  </div>
                </div>
                <div className="p-6 pt-0 flex items-center">
                  <Button className="w-full font-bold shadow-md">
                    Create Account
                  </Button>
                </div>
              </Card>

              <div className="space-y-6">
                <Card className="border-neutral-border shadow-md">
                  <div className="p-6 pb-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold">Payment Method</h3>
                      <Badge variant="secondary">Secure</Badge>
                    </div>
                  </div>
                  <div className="p-6 pt-0 space-y-4">
                    <div className="flex flex-col gap-3">
                      <label className="flex items-center gap-3 p-3 border border-accent bg-accent-surface rounded-lg cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          className="accent-accent"
                          defaultChecked
                        />
                        <span className="font-medium">Credit Card</span>
                      </label>
                      <label className="flex items-center gap-3 p-3 border border-neutral-border hover:bg-neutral-surface rounded-lg cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          className="accent-accent"
                        />
                        <span className="font-medium text-neutral-content-muted">
                          PayPal
                        </span>
                      </label>
                    </div>
                    <Button variant="secondary" className="w-full font-bold">
                      Continue Payment
                    </Button>
                  </div>
                </Card>

                <Card className="bg-accent text-accent-contrast border-0 shadow-lg">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-accent-contrast">Pro Plan</h3>
                    <p className="text-sm text-accent-contrast/80">
                      Everything you need to scale.
                    </p>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="text-4xl font-bold text-accent-contrast mb-4">
                      $29
                      <span className="text-lg text-accent-contrast/70 font-normal">
                        /mo
                      </span>
                    </div>
                    <ul className="space-y-2 text-sm text-accent-contrast/80">
                      <li className="flex items-center gap-2">
                        ✓ Unlimited projects
                      </li>
                      <li className="flex items-center gap-2">
                        ✓ Priority support
                      </li>
                      <li className="flex items-center gap-2">
                        ✓ Custom domains
                      </li>
                    </ul>
                  </div>
                  <div className="p-6 pt-0 flex items-center">
                    <Button className="w-full bg-neutral-surface text-neutral-content hover:bg-neutral-surface-hover font-bold">
                      Upgrade Now
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
