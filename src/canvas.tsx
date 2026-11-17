/**
 * Harborlight Inn — social / Open Graph share card (1200 × 630).
 *
 * Composed like a poster: the inn's name in large serif type, the stay's
 * dates, the tagline and the booking code on the left; the lighthouse at
 * dusk on the right. Rendered to PNG and SVG by `renderImage()` — see
 * scripts/build.ts. No image is fetched: the lighthouse is drawn Svg.
 */
import { Canvas, Column, Heading, LineBreak, Row, Text, token } from "@hyper-elements/react";
import { booking, inn } from "./data";
import { harborlightTheme, palette } from "./theme";
import { LighthouseScene } from "./components";

export default function ShareCard() {
  return (
    <Canvas
      width={1200}
      height={630}
      theme={harborlightTheme}
      title={`${inn.name} — ${booking.checkIn.short} to ${booking.checkOut.short}`}
      lang="en"
      style={{
        backgroundColor: palette.navyDeep,
        color: palette.cream,
        padding: [56, 64],
        gap: 0,
        justifyContent: "center",
      }}
    >
      <Row style={{ gap: 48, alignItems: "center" }}>
        <Column style={{ gap: 20 }}>
          <Text style={{ apply: ["eyebrow"], color: palette.amberLight, fontSize: 13 }}>
            Harborlight Inn · Est. 1912
          </Text>
          <Heading level={1} style={{ fontSize: 68, lineHeight: 1.04, color: palette.cream }}>
            See you at the water&rsquo;s edge.
          </Heading>
          <Text style={{ fontSize: 24, lineHeight: 1.45, color: "#D8E2E8" }}>
            {booking.guest.firstName} {booking.guest.lastName} · {booking.room.name}
            <LineBreak />
            {booking.checkIn.label} — {booking.checkOut.label}
          </Text>
          <Row style={{ gap: 16, alignItems: "center" }}>
            <Text style={{ apply: ["pill"], flex: "none", fontSize: 15 }}>{booking.code}</Text>
            <Text style={{ fontSize: 16, color: "#C9D6DE" }}>{inn.site}</Text>
          </Row>
        </Column>
        <Column style={{ width: 440, flex: "none", gap: 14 }}>
          <LighthouseScene width={440} height={192} />
          <Text
            style={{
              fontFamily: token("fonts.heading"),
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: 20,
              lineHeight: 1.4,
              color: palette.amberLight,
              textAlign: "center",
            }}
          >
            {inn.tagline}
          </Text>
        </Column>
      </Row>
    </Canvas>
  );
}
