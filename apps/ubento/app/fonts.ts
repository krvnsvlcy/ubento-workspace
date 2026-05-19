import {
  Fira_Code,
  Fraunces,
  Geist,
  Geist_Mono,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  IBM_Plex_Serif,
  Inter,
  JetBrains_Mono,
  Lora,
  Manrope,
  Newsreader,
  Plus_Jakarta_Sans,
  Roboto_Slab,
  Zilla_Slab,
} from "next/font/google";

// ==========================================
// BODY & HEADING FONTS (Sans-Serif)
// ==========================================
export const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-plus-jakarta",
});

export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex-sans",
});

// ==========================================
// MONOSPACE FONTS (Code / Data)
// ==========================================
export const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-jetbrains-mono",
});

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex-mono",
});

// ==========================================
// SERIF & SLAB FONTS (High-End Headings)
// ==========================================
export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

export const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-lora",
});

export const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

export const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-slab",
});

export const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex-serif",
});

export const zillaSlab = Zilla_Slab({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-zilla-slab",
});

// A combined utility string to drop directly into your layout className
export const fontRegistryClassNames = [
  geistSans.variable,
  inter.variable,
  manrope.variable,
  plusJakartaSans.variable,
  ibmPlexSans.variable,
  firaCode.variable,
  geistMono.variable,
  jetbrainsMono.variable,
  ibmPlexMono.variable,
  fraunces.variable,
  lora.variable,
  newsreader.variable,
  robotoSlab.variable,
  ibmPlexSerif.variable,
  zillaSlab.variable,
].join(" ");
