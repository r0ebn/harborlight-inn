/**
 * Code 39, the barcode on the stay voucher.
 *
 * A real symbology, not a decorative stripe: each character is 9 elements
 * (5 bars, 4 spaces), exactly 3 of them wide, with a narrow inter-character
 * gap and `*` start/stop characters. The table below is ZXing's
 * `CHARACTER_ENCODINGS` (Code39Reader.java), copied verbatim as hex and
 * decoded bit by bit, so no pattern is ever transcribed by hand.
 *
 * Wide-to-narrow ratio 2.5:1, the recommended middle of the 2.0–3.0 range.
 * No Mod 43 check digit — it is optional in Code 39.
 */

const ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%";

/** ZXing's CHARACTER_ENCODINGS, in alphabet order; bit 8 (MSB) is the first element, 1 = wide. */
const CHARACTER_ENCODINGS = [
  0x034, 0x121, 0x061, 0x160, 0x031, 0x130, 0x070, 0x025, 0x124, 0x064, // 0-9
  0x109, 0x049, 0x148, 0x019, 0x118, 0x058, 0x00d, 0x10c, 0x04c, 0x01c, // A-J
  0x103, 0x043, 0x142, 0x013, 0x112, 0x052, 0x007, 0x106, 0x046, 0x016, // K-T
  0x181, 0x0c1, 0x1c0, 0x091, 0x190, 0x0d0, 0x085, 0x184, 0x0c4, 0x0a8, // U-$
  0x0a2, 0x08a, 0x02a, // /-%
];

const ASTERISK_ENCODING = 0x094;

const WIDE_RATIO = 2.5;

export interface BarcodeBar {
  /** x offset from the symbol's left edge, in narrow units. */
  x: number;
  /** Width in narrow units (1 or 2.5). */
  width: number;
}

export interface Barcode {
  /** The bars to draw, left to right. */
  bars: BarcodeBar[];
  /** Total symbol width in narrow units, quiet zones excluded. */
  widthUnits: number;
  /** The characters encoded, start/stop included, for the round-trip check. */
  encoded: string;
}

/** The 9 elements of one character: true where the element is wide. */
function patternOf(char: string): boolean[] {
  const code = char === "*" ? ASTERISK_ENCODING : CHARACTER_ENCODINGS[ALPHABET.indexOf(char)];
  if (code === undefined) throw new Error(`Code 39 cannot encode ${JSON.stringify(char)}`);
  return Array.from({ length: 9 }, (_, i) => ((code >> (8 - i)) & 1) === 1);
}

/**
 * Encode `text` as Code 39 bars. `text` must use the Code 39 alphabet
 * (A–Z, 0–9 and `- . space $ / + %`); `*` is added as start/stop.
 */
export function encodeCode39(text: string): Barcode {
  const upper = text.toUpperCase();
  for (const char of upper) {
    if (!ALPHABET.includes(char)) throw new Error(`Code 39 cannot encode ${JSON.stringify(char)}`);
  }
  const encoded = `*${upper}*`;
  const bars: BarcodeBar[] = [];
  let x = 0;
  for (const char of encoded) {
    const pattern = patternOf(char);
    for (let i = 0; i < 9; i++) {
      const width = pattern[i] ? WIDE_RATIO : 1;
      // Even indices are bars, odd indices spaces.
      if (i % 2 === 0) bars.push({ x, width });
      x += width;
    }
    x += 1; // Narrow inter-character gap.
  }
  return { bars, widthUnits: x - 1, encoded };
}

/**
 * Decode a bar list back to its text, the way a scanner would: re-derive
 * each character's 9-element pattern from the bar widths and look it up in
 * the same table. The build script runs this as a self-check.
 */
export function decodeCode39(barcode: Barcode): string {
  const units: number[] = [];
  let cursor = 0;
  for (const bar of barcode.bars) {
    if (bar.x > cursor) units.push(bar.x - cursor); // The space before this bar.
    units.push(bar.width);
    cursor = bar.x + bar.width;
  }
  // Walk the units 9 at a time, skipping the inter-character gap after each char.
  const chars: string[] = [];
  let i = 0;
  while (i + 9 <= units.length) {
    const pattern = units.slice(i, i + 9);
    const code = pattern.reduce((acc, w, bit) => acc + (w > 1.5 ? 1 << (8 - bit) : 0), 0);
    if (code === ASTERISK_ENCODING) {
      chars.push("*");
    } else {
      const index = CHARACTER_ENCODINGS.indexOf(code);
      if (index < 0) throw new Error(`Code 39 pattern ${code.toString(16)} does not decode`);
      chars.push(ALPHABET[index]);
    }
    i += 10; // 9 elements + the inter-character gap.
  }
  return chars.join("");
}
