/**
 * Shared blocks, reused across all four roots.
 *
 * Wordmark, StayFacts and FooterNote are text-only, so they work everywhere —
 * including the Email, where Svg is not available. LighthouseScene and
 * BookingBarcode are drawn Svg shapes, used by the Page, the Document and
 * the Canvas. Nothing here fetches an image: every visual is an element.
 */
import {
  Circle,
  Column,
  Grid,
  Path,
  Polygon,
  Rect,
  Row,
  Svg,
  Text,
  token,
} from "@hyper-elements/react";
import { booking, inn } from "./data";
import { encodeCode39 } from "./barcode";
import { palette } from "./theme";

/** The inn's wordmark: letterspaced serif name over a mono strapline. */
export function Wordmark({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  const name = light ? palette.cream : palette.navy;
  const sub = light ? palette.amberLight : palette.amberDeep;
  return (
    <Column style={{ gap: 3 }}>
      <Text
        style={{
          fontSize: compact ? 16 : 20,
          fontWeight: 700,
          letterSpacing: compact ? 2.5 : 4,
          lineHeight: 1,
          color: name,
        }}
      >
        HARBORLIGHT
      </Text>
      <Text
        style={{
          fontFamily: token("fonts.mono"),
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: compact ? 2.2 : 3.4,
          lineHeight: 1,
          color: sub,
        }}
      >
        INN · EST. 1912
      </Text>
    </Column>
  );
}

/**
 * The lighthouse at dusk, drawn entirely from Svg shapes: stars, a moon,
 * two light beams, the striped tower, rocks, layered waves and a small boat.
 * One scene, reused by the page hero, the voucher header and the share card.
 */
export function LighthouseScene({
  width,
  height,
  hidden,
}: {
  width: number;
  height: number;
  hidden?: { mobile?: boolean; desktop?: boolean };
}) {
  return (
    <Svg width={width} height={height} viewBox="0 0 960 420" hidden={hidden} title="The Harborlight lighthouse at dusk, its beam sweeping over the cove.">
      <Rect x={0} y={0} width={960} height={420} style={{ fill: palette.navyDeep }} />
      {/* Stars */}
      <Circle cx={80} cy={58} r={2} style={{ fill: palette.cream, opacity: 0.85 }} />
      <Circle cx={180} cy={38} r={1.5} style={{ fill: palette.cream, opacity: 0.7 }} />
      <Circle cx={300} cy={88} r={2} style={{ fill: palette.cream, opacity: 0.8 }} />
      <Circle cx={420} cy={48} r={1.5} style={{ fill: palette.cream, opacity: 0.65 }} />
      <Circle cx={520} cy={108} r={2} style={{ fill: palette.cream, opacity: 0.75 }} />
      <Circle cx={760} cy={42} r={2} style={{ fill: palette.cream, opacity: 0.8 }} />
      <Circle cx={880} cy={72} r={1.5} style={{ fill: palette.cream, opacity: 0.7 }} />
      <Circle cx={150} cy={140} r={1.2} style={{ fill: palette.cream, opacity: 0.6 }} />
      <Circle cx={920} cy={150} r={1.2} style={{ fill: palette.cream, opacity: 0.6 }} />
      {/* Moon and its glow */}
      <Circle cx={140} cy={92} r={48} style={{ fill: palette.amberLight, opacity: 0.14 }} />
      <Circle cx={140} cy={92} r={32} style={{ fill: palette.amberLight }} />
      <Circle cx={130} cy={84} r={6} style={{ fill: palette.amber, opacity: 0.35 }} />
      <Circle cx={152} cy={102} r={4} style={{ fill: palette.amber, opacity: 0.3 }} />
      {/* Light beams from the lantern room */}
      <Polygon points="645,120 280,58 280,168" style={{ fill: "#F6CE6B", opacity: 0.45 }} />
      <Polygon points="645,120 960,74 960,178" style={{ fill: "#F6CE6B", opacity: 0.45 }} />
      {/* Sea, in three layered wave bands */}
      <Rect x={0} y={330} width={960} height={90} style={{ fill: "#2E5A6B" }} />
      <Path
        d="M0,352 Q60,342 120,352 T240,352 T360,352 T480,352 T600,352 T720,352 T840,352 T960,352 L960,420 L0,420 Z"
        style={{ fill: palette.seaDeep }}
      />
      <Path
        d="M0,376 Q60,368 120,376 T240,376 T360,376 T480,376 T600,376 T720,376 T840,376 T960,376 L960,420 L0,420 Z"
        style={{ fill: palette.sea, opacity: 0.85 }}
      />
      <Path
        d="M0,398 Q60,392 120,398 T240,398 T360,398 T480,398 T600,398 T720,398 T840,398 T960,398 L960,420 L0,420 Z"
        style={{ fill: "#A8C6D2", opacity: 0.55 }}
      />
      {/* A small boat, heading home */}
      <Polygon points="178,352 178,322 202,352" style={{ fill: palette.cream }} />
      <Polygon points="150,352 212,352 202,366 160,366" style={{ fill: palette.navyDeep }} />
      {/* Rocks at the tower's foot */}
      <Polygon points="540,336 590,308 640,322 700,306 752,330 752,336" style={{ fill: "#061824" }} />
      {/* The tower, cream with two navy bands */}
      <Polygon points="598,330 622,150 668,150 692,330" style={{ fill: palette.cream }} />
      <Polygon points="609,250 681,250 676,210 614,210" style={{ fill: palette.navy }} />
      <Polygon points="601,310 689,310 685,280 605,280" style={{ fill: palette.navy }} />
      <Circle cx={645} cy={180} r={6} style={{ fill: palette.navy }} />
      <Rect x={636} y={288} width={18} height={42} rx={8} style={{ fill: palette.navyDeep }} />
      {/* Gallery, lantern room and dome */}
      <Rect x={612} y={138} width={66} height={12} rx={2} style={{ fill: palette.navyDeep }} />
      <Rect x={620} y={102} width={50} height={38} rx={4} style={{ fill: palette.amberLight }} />
      <Rect x={635} y={102} width={3} height={38} style={{ fill: palette.navy }} />
      <Rect x={652} y={102} width={3} height={38} style={{ fill: palette.navy }} />
      <Polygon points="618,104 645,82 672,104" style={{ fill: palette.navyDeep }} />
      <Circle cx={645} cy={80} r={4} style={{ fill: palette.amber }} />
    </Svg>
  );
}

/** A narrow wave strip, for dividing sections on the page. */
export function WavesStrip({
  width = 600,
  hidden,
}: {
  width?: number;
  hidden?: { mobile?: boolean; desktop?: boolean };
}) {
  return (
    <Svg width={width} height={18} viewBox="0 0 600 18" hidden={hidden} title="Waves">
      <Path
        d="M0,10 Q37,2 75,10 T150,10 T225,10 T300,10 T375,10 T450,10 T525,10 T600,10 L600,18 L0,18 Z"
        style={{ fill: palette.sea, opacity: 0.5 }}
      />
      <Path
        d="M0,14 Q37,8 75,14 T150,14 T225,14 T300,14 T375,14 T450,14 T525,14 T600,14 L600,18 L0,18 Z"
        style={{ fill: palette.amber, opacity: 0.55 }}
      />
    </Svg>
  );
}

/** One fact: a mono label over a value. */
function Fact({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <Column style={{ gap: 3 }}>
      <Text style={{ apply: ["metaLabel"] }}>{label}</Text>
      <Text style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.3 }}>{value}</Text>
      {sub ? <Text style={{ fontSize: 13, lineHeight: 1.4, color: token("colors.muted") }}>{sub}</Text> : null}
    </Column>
  );
}

/** Check-in, check-out, nights and guests — the stay at a glance. */
export function StayFacts({ columns = 4 }: { columns?: number }) {
  return (
    <Grid columns={columns} style={{ gap: 20 }}>
      <Fact label="Check-in" value={booking.checkIn.short} sub={`from ${booking.checkIn.time}`} />
      <Fact label="Check-out" value={booking.checkOut.short} sub={`until ${booking.checkOut.time}`} />
      <Fact label="Nights" value={`${booking.nights} nights`} sub={booking.room.kind} />
      <Fact label="Guests" value={`${booking.guest.adults} adults`} sub={booking.guest.fullName} />
    </Grid>
  );
}

/**
 * The booking code as a scannable Code 39 barcode, drawn from Rects — one
 * per bar, widths from `encodeCode39`. Change the code in `src/data.ts`
 * and the bars change with it.
 */
export function BookingBarcode({
  code = booking.code,
  unit = 1.15,
  barHeight = 56,
  color = palette.navy,
}: {
  code?: string;
  unit?: number;
  barHeight?: number;
  color?: string;
}) {
  const { bars, widthUnits } = encodeCode39(code);
  const quietZone = 10; // 10 narrow units each side, the Code 39 minimum.
  const width = Math.round((widthUnits + quietZone * 2) * unit);
  return (
    <Column style={{ gap: 8, alignItems: "center" }}>
      <Svg width={width} height={barHeight} viewBox={`0 0 ${width} ${barHeight}`} title={`Barcode for booking ${code}`}>
        {bars.map((bar, i) => (
          <Rect
            key={i}
            x={(quietZone + bar.x) * unit}
            y={0}
            width={bar.width * unit}
            height={barHeight}
            style={{ fill: color }}
          />
        ))}
      </Svg>
      <Text
        style={{
          fontFamily: token("fonts.mono"),
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: 4,
          color,
          lineHeight: 1.2,
        }}
      >
        {code}
      </Text>
    </Column>
  );
}

/** The inn's address and contact lines, for footers. */
export function FooterNote({ light = false }: { light?: boolean }) {
  const color = light ? "#C9D6DE" : token("colors.muted");
  return (
    <Column style={{ gap: 2 }}>
      <Text style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.5, color: light ? palette.cream : palette.navy }}>
        Harborlight Inn · {inn.tagline}
      </Text>
      <Text style={{ fontSize: 13, lineHeight: 1.5, color }}>
        {inn.addressLines.join(", ")} · {inn.phone} · {inn.email}
      </Text>
    </Column>
  );
}

/** A room highlight card for the arrival page. */
export function HighlightCard({ title, body }: { title: string; body: string }) {
  return (
    <Column style={{ apply: ["card"], padding: 24, gap: 8 }}>
      <Text style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.3, color: palette.navy }}>{title}</Text>
      <Text style={{ fontSize: 14, lineHeight: 1.6, color: token("colors.muted") }}>{body}</Text>
    </Column>
  );
}

/** StayFacts as a horizontal Row, for the narrow voucher page. */
export function StayFactsRow() {
  return (
    <Row style={{ gap: 20 }}>
      <Fact label="Check-in" value={booking.checkIn.short} sub={`from ${booking.checkIn.time}`} />
      <Fact label="Check-out" value={booking.checkOut.short} sub={`until ${booking.checkOut.time}`} />
      <Fact label="Nights" value={`${booking.nights} nights`} sub={booking.room.kind} />
      <Fact label="Guests" value={`${booking.guest.adults} adults`} sub={booking.guest.fullName} />
    </Row>
  );
}
