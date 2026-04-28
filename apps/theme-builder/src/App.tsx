import type { BentoTheme, ColorTheme } from "@ubento/bento-primitives";
import {
  applyTheme,
  Badge,
  baseTheme,
  Button,
  carbonTheme,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  forestTheme,
  Input,
  skyTheme,
  sunsetTheme,
} from "@ubento/bento-primitives";
import { Box, Download, Moon, Palette, Settings2, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MultiColorPicker } from "./components/MultiColorPicker";

import "./index.css";

const presetThemes: Record<string, BentoTheme> = {
  base: baseTheme,
  sunset: sunsetTheme,
  forest: forestTheme,
  carbon: carbonTheme,
  sky: skyTheme,
};

function rgbToHex(val: string) {
  if (!val) return "#000000";
  if (val.startsWith("#")) return val;
  const result = val.match(/\d+/g);
  if (!result || result.length < 3) return "#000000";
  return `#${result
    .slice(0, 3)
    .map((x) => parseInt(x).toString(16).padStart(2, "0"))
    .join("")}`;
}

export default function App() {
  const [currentPreset, setCurrentPreset] = useState<string>("base");
  const [customTheme, setCustomTheme] = useState<BentoTheme>(presetThemes.base);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeColorKey, setActiveColorKey] =
    useState<keyof ColorTheme>("primary");
  const [activeMode, setActiveMode] = useState<"light" | "dark">("light");
  const [openPicker, setOpenPicker] = useState<string | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setOpenPicker(null);
      }
    };
    if (openPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openPicker]);

  useEffect(() => {
    const newTheme = JSON.parse(JSON.stringify(presetThemes[currentPreset]));
    newTheme.name = "custom-" + currentPreset;
    setCustomTheme(newTheme);
  }, [currentPreset]);

  useEffect(() => {
    applyTheme(customTheme);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [customTheme, isDarkMode]);

  const handleColorChange = (step: string, value: string) => {
    setCustomTheme((prev) => {
      const newTheme = { ...prev };
      if (!newTheme.colors) newTheme.colors = { light: {}, dark: {} };
      if (!newTheme.colors[activeMode]) newTheme.colors[activeMode] = {};

      const modeData = newTheme.colors[activeMode] as Partial<ColorTheme>;
      const colorData = modeData[activeColorKey] || {
        100: "",
        200: "",
        300: "",
        400: "",
        500: "",
        contrast: "",
      };

      modeData[activeColorKey] = {
        ...colorData,
        [step]: value,
      } as any;

      return newTheme;
    });
  };

  const handleDownload = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(customTheme, null, 2));
    const a = document.createElement("a");
    a.href = dataStr;
    a.download = `${customTheme.name}.json`;
    a.click();
  };

  const colorKeys = Object.keys(baseTheme.colors.light || {}) as Array<
    keyof ColorTheme
  >;
  const activeColorData = customTheme.colors[activeMode]?.[activeColorKey] ||
    baseTheme.colors[activeMode]?.[activeColorKey] || {
      100: "",
      200: "",
      300: "",
      400: "",
      500: "",
      contrast: "",
    };

  return (
    <div className="flex flex-col h-screen bg-background-100 text-foreground transition-colors font-sans">
      {/* Navbar */}
      <header className="flex-none h-16 border-b border-dark-200/50 bg-white/50 dark:bg-dark-100/50 backdrop-blur flex items-center justify-between px-6 z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-md">
            <Palette size={16} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Ubento Builder</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border border-dark-200 rounded-md p-1 bg-white dark:bg-dark-100 shadow-sm">
            <span className="text-sm font-medium px-2 text-dark-400">
              Preset:
            </span>
            <select
              className="h-8 rounded bg-transparent px-2 text-sm focus:outline-none font-medium cursor-pointer"
              value={currentPreset}
              onChange={(e) => setCurrentPreset(e.target.value)}
            >
              {Object.keys(presetThemes).map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
          </Button>

          <Button onClick={handleDownload} className="gap-2 shadow-md">
            <Download size={16} />
            Export JSON
          </Button>
        </div>
      </header>

      {/* Main App */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-80 flex-none border-r border-dark-200/50 bg-white/30 dark:bg-dark-100/30 flex flex-col backdrop-blur-sm shadow-sm z-0">
          <div className="p-4 border-b border-dark-200/50">
            <div className="flex items-center gap-2 mb-4">
              <Settings2 size={18} className="text-primary-500" />
              <h2 className="font-semibold text-lg">Theme Settings</h2>
            </div>

            <div className="flex bg-dark-100 p-1 rounded-lg">
              {(["light", "dark"] as const).map((mode) => (
                <button
                  key={mode}
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                    activeMode === mode
                      ? "bg-white text-dark-500 shadow-sm dark:bg-dark-200 dark:text-white"
                      : "text-dark-400 hover:text-foreground"
                  }`}
                  onClick={() => setActiveMode(mode)}
                >
                  {mode} Mode
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-dark-300 mb-3 px-1">
                Color Palette
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {colorKeys.map((key) => {
                  const isActive = activeColorKey === key;
                  const dotColor =
                    customTheme.colors[activeMode]?.[key]?.[300] ||
                    baseTheme.colors[activeMode]?.[key]?.[300] ||
                    "#000";
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveColorKey(key)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                        isActive
                          ? "bg-primary-500/10 text-primary-500 border border-primary-500/20"
                          : "hover:bg-dark-100/50 border border-transparent text-dark-400 hover:text-foreground"
                      }`}
                    >
                      <div
                        className="w-3 h-3 rounded-full shadow-sm"
                        style={{ backgroundColor: dotColor }}
                      />
                      <span className="capitalize">{key}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-dark-200/50 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-dark-300 mb-3 px-1">
                Edit {activeColorKey} ({activeMode})
              </h3>

              <div className="space-y-3">
                {["100", "200", "300", "400", "500", "contrast"].map((step) => {
                  const val = (activeColorData as any)[step];
                  const hexVal = rgbToHex(val);

                  return (
                    <div
                      key={step}
                      className="flex items-center justify-between group"
                    >
                      <label className="text-sm font-medium text-dark-400 capitalize w-16">
                        {step}
                      </label>
                      <div className="flex items-center gap-2 flex-1 relative">
                        <div
                          className="absolute left-1.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded shadow-sm border border-dark-200 pointer-events-none"
                          style={{ backgroundColor: hexVal }}
                        />
                        <button
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 cursor-pointer opacity-0 z-10"
                          onClick={() => setOpenPicker(step)}
                        />
                        {openPicker === step && (
                          <div
                            ref={pickerRef}
                            className="absolute z-50 top-full left-0 mt-2"
                          >
                            <MultiColorPicker
                              value={hexVal}
                              onChange={(v) => handleColorChange(step, v)}
                            />
                          </div>
                        )}
                        <Input
                          value={val || ""}
                          onChange={(e) =>
                            handleColorChange(step, e.target.value)
                          }
                          className="pl-9 font-mono text-xs uppercase"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-dark-100/30 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">Preview Dashboard</h2>
                <p className="text-dark-400">
                  See your theme applied across components instantly.
                </p>
              </div>
              <Badge
                variant="outline"
                className="px-3 py-1 text-sm bg-white dark:bg-dark-100"
              >
                <Box size={14} className="mr-2 inline" /> Components
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="overflow-hidden border-0 shadow-lg ring-1 ring-dark-200/50">
                <div className="h-2 w-full bg-gradient-to-r from-primary-500 to-secondary-500" />
                <CardHeader>
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>
                    Enter your information below to register.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                      <span className="w-full border-t border-dark-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white dark:bg-dark-100 px-2 text-dark-300">
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
                </CardContent>
                <CardFooter>
                  <Button className="w-full font-bold shadow-md">
                    Create Account
                  </Button>
                </CardFooter>
              </Card>

              <div className="space-y-6">
                <Card className="border-0 shadow-md ring-1 ring-dark-200/50">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex justify-between items-center">
                      Payment Method
                      <Badge variant="secondary">Secure</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col gap-3">
                      <label className="flex items-center gap-3 p-3 border border-primary-500 bg-primary-500/5 rounded-lg cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          className="accent-primary-500"
                          defaultChecked
                        />
                        <span className="font-medium">Credit Card</span>
                      </label>
                      <label className="flex items-center gap-3 p-3 border border-dark-200 hover:bg-dark-100/50 rounded-lg cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          className="accent-primary-500"
                        />
                        <span className="font-medium text-dark-400">
                          PayPal
                        </span>
                      </label>
                    </div>
                    <Button variant="secondary" className="w-full font-bold">
                      Continue Payment
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-primary-500 text-primary-contrast border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-white">Pro Plan</CardTitle>
                    <CardDescription className="text-primary-100">
                      Everything you need to scale.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-white mb-4">
                      $29
                      <span className="text-lg text-primary-200 font-normal">
                        /mo
                      </span>
                    </div>
                    <ul className="space-y-2 text-sm text-primary-100">
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
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-white text-primary-500 hover:bg-primary-100 font-bold">
                      Upgrade Now
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
