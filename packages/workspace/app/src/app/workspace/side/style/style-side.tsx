import { useState, useEffect } from "react";
import { ArrowLeft, Palette, Type } from "lucide-react";
import { useUbentoEngine } from "../../../../engine/app/engine";
import { 
  generateTheme, 
  themeToCss, 
  type ThemeRoot,
  type HslInput 
} from "@ubento/bento.arlo-core";

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

const DEFAULT_THEME: ThemeRoot = {
  colors: {
    accent: { h: 150, s: 0.8, l: 0.5 },
    neutral: { h: 220, s: 0.1, l: 0.5 },
    background: { l: 0.98 },
  },
  fonts: {
    heading: "Inter",
    body: "Inter",
    code: "monospace",
  },
};

export function StyleSide() {
  const engine = useUbentoEngine();
  const location = engine.useState((s) => s.location);

  const [themeRoot, setThemeRoot] = useState<ThemeRoot>(() => {
    const saved = localStorage.getItem("themeRoot");
    return saved ? JSON.parse(saved) : DEFAULT_THEME;
  });

  useEffect(() => {
    localStorage.setItem("themeRoot", JSON.stringify(themeRoot));
    
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

      // Sync with runtime via custom event
      window.dispatchEvent(new CustomEvent("ubento:theme-changed", { detail: { css } }));
    } catch (e) {
      console.error("Failed to generate theme", e);
    }
  }, [themeRoot]);

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

  // Gradients for sliders
  const hueGradient = `linear-gradient(to right, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%))`;
  
  const accentSatGradient = `linear-gradient(to right, hsl(${themeRoot.colors.accent.h}, 0%, ${(themeRoot.colors.accent.l * 100).toFixed(0)}%), hsl(${themeRoot.colors.accent.h}, 100%, ${(themeRoot.colors.accent.l * 100).toFixed(0)}%))`;
  const accentLightGradient = `linear-gradient(to right, hsl(${themeRoot.colors.accent.h}, ${(themeRoot.colors.accent.s * 100).toFixed(0)}%, 0%), hsl(${themeRoot.colors.accent.h}, ${(themeRoot.colors.accent.s * 100).toFixed(0)}%, 100%))`;

  const neutralSatGradient = `linear-gradient(to right, hsl(${themeRoot.colors.neutral.h}, 0%, ${(themeRoot.colors.neutral.l * 100).toFixed(0)}%), hsl(${themeRoot.colors.neutral.h}, 100%, ${(themeRoot.colors.neutral.l * 100).toFixed(0)}%))`;
  const neutralLightGradient = `linear-gradient(to right, hsl(${themeRoot.colors.neutral.h}, ${(themeRoot.colors.neutral.s * 100).toFixed(0)}%, 0%), hsl(${themeRoot.colors.neutral.h}, ${(themeRoot.colors.neutral.s * 100).toFixed(0)}%, 100%))`;

  const bgLightGradient = `linear-gradient(to right, hsl(${themeRoot.colors.neutral.h}, ${(themeRoot.colors.neutral.s * 100).toFixed(0)}%, 90%), hsl(${themeRoot.colors.neutral.h}, ${(themeRoot.colors.neutral.s * 100).toFixed(0)}%, 100%))`;

  return (
    <div className="h-full w-full flex flex-col bg-neutral-surface/20 select-none">
      <style>{`
        .color-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 8px;
          border-radius: 4px;
          outline: none;
          border: 1px solid rgba(0,0,0,0.05);
        }
        .color-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: white;
          border: 1.5px solid #6B7280;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(0,0,0,0.2);
          transition: transform 0.1s;
        }
        .color-slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        .color-slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          border: 1.5px solid #6B7280;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(0,0,0,0.2);
          transition: transform 0.1s;
        }
        .color-slider::-moz-range-thumb:hover {
          transform: scale(1.1);
        }
      `}</style>

      {/* Header */}
      <div className="p-4 border-b border-neutral-border flex items-center justify-between bg-neutral-surface/50">
        <div className="flex items-center gap-2 font-semibold text-sm text-neutral-content">
          <button
            onClick={() =>
              engine.goToLocation({ ...location, style: undefined })
            }
            className="w-6 h-6 rounded hover:bg-neutral-surface-hover flex items-center justify-center text-neutral-content-muted hover:text-neutral-content transition-colors"
          >
            <ArrowLeft size={14} />
          </button>
          <span className="truncate">Styles</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 flex flex-col gap-6">
        {/* Colors Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-content-muted">
            <Palette size={12} />
            <span>Colors (HSL)</span>
          </div>

          {/* Accent */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-accent">Accent Color</label>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-neutral-content-muted">
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
              <div className="flex justify-between text-xs text-neutral-content-muted">
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
              <div className="flex justify-between text-xs text-neutral-content-muted">
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
          <div className="space-y-3 border-t border-neutral-border pt-3">
            <label className="text-xs font-bold text-neutral-content">Neutral Color</label>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-neutral-content-muted">
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
              <div className="flex justify-between text-xs text-neutral-content-muted">
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
              <div className="flex justify-between text-xs text-neutral-content-muted">
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
          <div className="space-y-3 border-t border-neutral-border pt-3">
            <label className="text-xs font-bold text-neutral-content">Background</label>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-neutral-content-muted">
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

        {/* Typography Section */}
        <div className="flex flex-col gap-3 border-t border-neutral-border pt-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-content-muted">
            <Type size={12} />
            <span>Typography</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="space-y-1">
              <label className="text-xs text-neutral-content-muted">Heading Font</label>
              <select
                value={themeRoot.fonts.heading}
                onChange={(e) => handleFontChange('heading', e.target.value)}
                className="w-full h-8 rounded border border-neutral-border bg-neutral-surface px-2 text-xs focus:outline-none text-neutral-content"
              >
                {commonFonts.map(font => (
                  <option key={font} value={font}>{font}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-neutral-content-muted">Body Font</label>
              <select
                value={themeRoot.fonts.body}
                onChange={(e) => handleFontChange('body', e.target.value)}
                className="w-full h-8 rounded border border-neutral-border bg-neutral-surface px-2 text-xs focus:outline-none text-neutral-content"
              >
                {commonFonts.map(font => (
                  <option key={font} value={font}>{font}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-neutral-content-muted">Code Font</label>
              <select
                value={themeRoot.fonts.code}
                onChange={(e) => handleFontChange('code', e.target.value)}
                className="w-full h-8 rounded border border-neutral-border bg-neutral-surface px-2 text-xs focus:outline-none text-neutral-content"
              >
                {commonFonts.map(font => (
                  <option key={font} value={font}>{font}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
