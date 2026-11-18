import { defineTheme } from "@hyper-elements/react";

// Marigold — deep pine + warm cream paper + marigold, Fraunces over Inter.
// Small text that must stay legible on cream uses a deepened marigold
// (marigoldDeep) — the full marigold is reserved for display, bands and
// text on pine, where its contrast is strong.
export const palette = {
  pine: "#0C3433",
  pineDeep: "#082624",
  moss: "#2F5D50",
  cream: "#FBF4E6",
  creamBright: "#FFFBEF",
  sand: "#F1E3C6",
  sandLine: "#E3D2AF",
  marigold: "#E9A319",
  marigoldLight: "#F5C04E",
  marigoldDeep: "#9A6604",
  terracotta: "#CE6A45",
  terracottaDeep: "#A63F22",
  terracottaTint: "#F6DDD2",
  sage: "#A9C6B4",
  sageTint: "#DCE8DE",
  ink: "#17302C",
  muted: "#55705F",
};

export const fonts = {
  heading: "Fraunces, Georgia, 'Times New Roman', serif",
  body: "Inter, Arial, Helvetica, sans-serif",
};

// Webfont faces for the HTML outputs (Page / Document print HTML), served
// from the Fontsource CDN — the same SIL OFL files kept in assets/fonts/.
const face = (family: string, file: string, weight: number, style?: "italic") => ({
  family,
  src: `https://cdn.jsdelivr.net/fontsource/fonts/${file}.woff`,
  format: "woff" as const,
  weight,
  ...(style ? { style } : {}),
});

export const fontFaces = [
  face("Fraunces", "fraunces@latest/latin-400-normal", 400),
  face("Fraunces", "fraunces@latest/latin-400-italic", 400, "italic"),
  face("Fraunces", "fraunces@latest/latin-600-normal", 600),
  face("Fraunces", "fraunces@latest/latin-600-italic", 600, "italic"),
  face("Fraunces", "fraunces@latest/latin-900-normal", 900),
  face("Inter", "inter@latest/latin-400-normal", 400),
  face("Inter", "inter@latest/latin-500-normal", 500),
  face("Inter", "inter@latest/latin-600-normal", 600),
  face("Inter", "inter@latest/latin-700-normal", 700),
];

export const marigold = defineTheme({
  colors: {
    background: palette.cream,
    foreground: palette.ink,
    primary: palette.pine,
    primaryForeground: palette.cream,
    muted: palette.muted,
    border: palette.sandLine,
    pine: palette.pine,
    pineDeep: palette.pineDeep,
    moss: palette.moss,
    cream: palette.cream,
    creamBright: palette.creamBright,
    sand: palette.sand,
    marigold: palette.marigold,
    marigoldLight: palette.marigoldLight,
    marigoldDeep: palette.marigoldDeep,
    terracotta: palette.terracotta,
    terracottaDeep: palette.terracottaDeep,
    sage: palette.sage,
  },
  fonts: {
    body: fonts.body,
    heading: fonts.heading,
  },
  fontSizes: { body: 16 },
  lineHeights: { body: 1.55 },
  elements: {
    Heading: {
      fontFamily: fonts.heading,
      fontWeight: 600,
      lineHeight: 1.12,
      by: {
        level: {
          1: { fontSize: 40 },
          2: { fontSize: 29 },
          3: { fontSize: 21 },
        },
      },
    },
    Text: { lineHeight: 1.55 },
    Button: {
      backgroundColor: palette.pine,
      color: palette.cream,
      borderRadius: 999,
      padding: [15, 32],
      fontWeight: 600,
      fontSize: 15,
      hover: { backgroundColor: palette.moss },
    },
    Divider: { borderTop: { width: 1, style: "solid", color: palette.sandLine } },
  },
  styles: {
    card: {
      backgroundColor: palette.creamBright,
      border: { width: 1, style: "solid", color: palette.sandLine },
      borderRadius: 20,
      padding: 26,
      gap: 10,
    },
    darkCard: {
      backgroundColor: palette.pine,
      color: palette.cream,
      borderRadius: 24,
      padding: 32,
      gap: 12,
    },
    chip: { borderRadius: 999, padding: [5, 12] },
  },
});
