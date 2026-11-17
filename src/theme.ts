/**
 * Harborlight Inn — the brand, written once.
 *
 * One `defineTheme()` serves all four roots: the email, the page, the
 * voucher document and the share-card canvas. Deep navy, warm cream and
 * amber; Playfair Display for display type, Inter for body, IBM Plex Mono
 * for codes and labels.
 *
 * The hex palette lives in `palette` so the drawn Svg artwork (lighthouse,
 * waves, barcode) uses exactly the same colors as the theme tokens.
 */
import { defineTheme } from "@hyper-elements/react";

export const palette = {
  navy: "#0E2A3F",
  navyDeep: "#081E2D",
  navySoft: "#1B3A52",
  cream: "#FAF3E6",
  sand: "#F1E6CF",
  paper: "#FFFDF8",
  ink: "#22333F",
  muted: "#6E7F8A",
  border: "#E4D8BE",
  amber: "#D98E2B",
  amberLight: "#F2B45C",
  amberDeep: "#B06F1B",
  sea: "#7FA3B5",
  seaDeep: "#4E7A8C",
  white: "#FFFFFF",
} as const;

export const fontStacks = {
  display: "'Playfair Display', Georgia, 'Times New Roman', serif",
  body: "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif",
  mono: "'IBM Plex Mono', SFMono-Regular, Menlo, Consolas, monospace",
} as const;

/**
 * Web fonts for the HTML roots (email, page, print HTML). The latin subsets
 * only — the templates are English. The PDF and the share card do not fetch
 * these; `scripts/build.ts` hands them the same families as local TTF files.
 */
export const webFonts = [
  {
    family: "Playfair Display",
    src: "https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKeiunDXbtM.woff2",
    format: "woff2" as const,
    weight: 700,
  },
  {
    family: "Inter",
    src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiA.woff2",
    format: "woff2" as const,
    weight: 400,
  },
  {
    family: "Inter",
    src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hiA.woff2",
    format: "woff2" as const,
    weight: 600,
  },
  {
    family: "Inter",
    src: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZ9hiA.woff2",
    format: "woff2" as const,
    weight: 700,
  },
  {
    family: "IBM Plex Mono",
    src: "https://fonts.gstatic.com/s/ibmplexmono/v23/-F6qfjptAgt5VM-kVkqdyU8n3twJwlBFgg.woff2",
    format: "woff2" as const,
    weight: 500,
  },
];

export const harborlightTheme = defineTheme({
  colors: {
    background: palette.cream,
    foreground: palette.ink,
    primary: palette.navy,
    primaryForeground: palette.cream,
    muted: palette.muted,
    border: palette.border,
    accent: palette.amber,
    accentForeground: palette.navyDeep,
    navy: palette.navy,
    navyDeep: palette.navyDeep,
    cream: palette.cream,
    sand: palette.sand,
    card: palette.paper,
    sea: palette.sea,
  },
  fonts: {
    body: fontStacks.body,
    heading: fontStacks.display,
    mono: fontStacks.mono,
  },
  fontSizes: { body: 16 },
  lineHeights: { body: 1.6 },
  radii: { card: 12, pill: 999 },
  elements: {
    Heading: {
      by: {
        level: {
          1: { fontSize: 40, lineHeight: 1.08, fontWeight: 700, letterSpacing: -0.5, mobile: { fontSize: 30 } },
          2: { fontSize: 26, lineHeight: 1.2, fontWeight: 700, letterSpacing: -0.3, mobile: { fontSize: 22 } },
          3: { fontSize: 18, lineHeight: 1.3, fontWeight: 700 },
        },
      },
    },
    Button: {
      backgroundColor: "{colors.primary}",
      color: "{colors.primaryForeground}",
      fontSize: 16,
      fontWeight: 600,
      padding: [14, 28],
      borderRadius: 999,
      hover: { backgroundColor: "{colors.navyDeep}" },
      variants: {
        amber: {
          backgroundColor: "{colors.accent}",
          color: "{colors.accentForeground}",
          hover: { backgroundColor: "{colors.accent}" },
        },
        light: {
          backgroundColor: "{colors.cream}",
          color: "{colors.navy}",
          hover: { backgroundColor: "{colors.sand}" },
        },
      },
    },
    Link: {
      color: "{colors.primary}",
      fontWeight: 600,
    },
  },
  styles: {
    /** A white card on the cream ground. */
    card: {
      backgroundColor: "{colors.card}",
      border: { width: 1, style: "solid", color: "{colors.border}" },
      borderRadius: 12,
      padding: 28,
      gap: 16,
    },
    /** A navy card: the ticket, the voucher header, the footer band. */
    darkCard: {
      backgroundColor: "{colors.navy}",
      color: palette.cream,
      borderRadius: 12,
      padding: 28,
      gap: 16,
    },
    /** Small-caps mono eyebrow above a heading. */
    eyebrow: {
      fontFamily: "{fonts.mono}",
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: 2.2,
      textTransform: "uppercase",
      lineHeight: 1.4,
    },
    /** A label over a value (dates, room, code). */
    metaLabel: {
      fontFamily: "{fonts.mono}",
      fontSize: 10,
      fontWeight: 500,
      letterSpacing: 1.6,
      textTransform: "uppercase",
      lineHeight: 1.4,
      color: "{colors.muted}",
    },
    /** A rounded pill, e.g. the booking code on the share card. */
    pill: {
      backgroundColor: "{colors.accent}",
      color: "{colors.accentForeground}",
      fontFamily: "{fonts.mono}",
      fontSize: 13,
      fontWeight: 500,
      letterSpacing: 1.2,
      padding: [8, 16],
      borderRadius: 999,
    },
  },
});

/** Type every token name in templates. */
declare module "@hyper-elements/react" {
  interface Register {
    theme: typeof harborlightTheme;
  }
}
