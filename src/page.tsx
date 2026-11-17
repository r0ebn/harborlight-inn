/**
 * Harborlight Inn — "Your stay" arrival page (960px).
 *
 * The page a guest opens from the confirmation email: a dusk hero with the
 * drawn lighthouse, the stay at a glance, the room, what to expect, a local
 * guide, directions, and the barcode to show at check-in.
 */
import {
  Button,
  Column,
  Divider,
  Grid,
  Heading,
  Link,
  List,
  ListItem,
  Page,
  Row,
  Section,
  Span,
  Text,
  token,
} from "@hyper-elements/react";
import { arrivalNotes, booking, inn, localGuide, roomHighlights, usd, balanceCents } from "./data";
import { harborlightTheme, palette, webFonts } from "./theme";
import { BookingBarcode, FooterNote, HighlightCard, LighthouseScene, StayFacts, WavesStrip, Wordmark } from "./components";

export default function ArrivalPage() {
  return (
    <Page
      width={960}
      theme={harborlightTheme}
      title={`Your stay — ${inn.name}`}
      description={`Everything for ${booking.guest.firstName} ${booking.guest.lastName}'s ${booking.nights}-night stay at ${inn.name}, ${booking.checkIn.short} to ${booking.checkOut.short}.`}
      lang="en"
      fonts={webFonts}
      style={{ gap: 0 }}
    >
      {/* Hero: the lighthouse at dusk, then the welcome. */}
      <Section
        tokens={{ colors: { background: palette.navyDeep, foreground: palette.cream } }}
        style={{ backgroundColor: palette.navyDeep, padding: [32, 48, 0], gap: 0, mobile: { padding: [24, 24, 0] } }}
      >
        <Row stackOnMobile={false} style={{ alignItems: "center", justifyContent: "space-between" }}>
          <Wordmark light compact />
          <Text style={{ apply: ["pill"], flex: "none" }}>{booking.code}</Text>
        </Row>
        <Column style={{ gap: 14, padding: [48, 0, 36], maxWidth: 640 }}>
          <Text style={{ apply: ["eyebrow"], color: palette.amberLight }}>Your stay · {booking.checkIn.short} — {booking.checkOut.short}</Text>
          <Heading level={1} style={{ fontSize: 52, color: palette.cream, mobile: { fontSize: 36 } }}>
            The light is on for you, {booking.guest.firstName}.
          </Heading>
          <Text style={{ fontSize: 18, lineHeight: 1.6, color: "#D8E2E8" }}>
            Three nights in the {booking.room.name}, breakfast on the harbor each morning, and a sunset cruise on
            Saturday. Here is everything for the trip — no account, no app, just this page.
          </Text>
        </Column>
        <LighthouseScene width={864} height={378} hidden={{ mobile: true }} />
        <LighthouseScene width={327} height={143} hidden={{ desktop: true }} />
      </Section>

      {/* Stay at a glance. */}
      <Section style={{ padding: [40, 48], gap: 32, mobile: { padding: [28, 24], gap: 24 } }}>
        <Column style={{ apply: ["card"] }}>
          <Row style={{ alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <Text style={{ apply: ["eyebrow"], color: palette.amberDeep }}>Your stay at a glance</Text>
            <Text style={{ fontSize: 14, color: token("colors.muted") }}>
              Balance due at check-in: <Span style={{ fontWeight: 700, color: token("colors.foreground") }}>{usd(balanceCents)}</Span>
            </Text>
          </Row>
          <StayFacts />
          <Divider />
          <Row style={{ gap: 16, alignItems: "center" }}>
            <Button href={booking.manageHref} style={{ width: 230, mobile: { width: "100%" } }}>
              Manage your booking
            </Button>
            <Text style={{ fontSize: 15 }}>
              <Link href={booking.directionsHref}>How to get here</Link>
            </Text>
          </Row>
        </Column>

        {/* The room. */}
        <Column style={{ gap: 16 }}>
          <Column style={{ gap: 6 }}>
            <Text style={{ apply: ["eyebrow"], color: palette.amberDeep }}>The {booking.room.name}</Text>
            <Heading level={2}>
              {booking.room.kind} · {booking.room.view}
            </Heading>
          </Column>
          <Grid columns={3} style={{ gap: 20 }}>
            {roomHighlights.map((h) => (
              <HighlightCard key={h.title} title={h.title} body={h.body} />
            ))}
          </Grid>
        </Column>

        <WavesStrip width={864} hidden={{ mobile: true }} />
        <WavesStrip width={327} hidden={{ desktop: true }} />

        {/* What to expect + local guide, side by side. */}
        <Row style={{ gap: 40, alignItems: "start" }}>
          <Column style={{ gap: 16 }}>
            <Heading level={2}>What to expect</Heading>
            <Column style={{ gap: 16 }}>
              {arrivalNotes.map((note) => (
                <Column key={note.title} style={{ gap: 4 }}>
                  <Text style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.4 }}>{note.title}</Text>
                  <Text style={{ fontSize: 15, lineHeight: 1.6, color: token("colors.muted") }}>{note.body}</Text>
                </Column>
              ))}
            </Column>
          </Column>
          <Column style={{ apply: ["card"], gap: 14 }}>
            <Text style={{ apply: ["eyebrow"], color: palette.amberDeep }}>While you&rsquo;re here</Text>
            <Heading level={3}>The local guide</Heading>
            <List style={{ gap: 12, fontSize: 15, lineHeight: 1.55, indent: 20 }}>
              {localGuide.map((place) => (
                <ListItem key={place.place}>
                  <Span style={{ fontWeight: 700 }}>{place.place}. </Span>
                  {place.detail}
                </ListItem>
              ))}
            </List>
            <Text style={{ fontSize: 14 }}>
              <Link href={booking.localGuideHref}>The full guide, with a walking map</Link>
            </Text>
          </Column>
        </Row>

        {/* Directions + check-in barcode. */}
        <Row style={{ gap: 40, alignItems: "stretch" }}>
          <Column style={{ gap: 12 }}>
            <Heading level={2}>Finding us</Heading>
            <Text style={{ fontSize: 15, lineHeight: 1.6 }}>
              {inn.addressLines[0]}, {inn.addressLines[1]}. From Route 1, take Beacon Point Road at the blue
              lighthouse sign and follow it to the water — we&rsquo;re the white house with the lamp room, past the
              carriage house. The gravel lot behind it is free for guests.
            </Text>
            <Text style={{ fontSize: 15 }}>
              <Link href={booking.directionsHref}>Open directions</Link>
              {" · "}
              <Link href={inn.phoneHref}>{inn.phone}</Link>
            </Text>
          </Column>
          <Column style={{ apply: ["darkCard"], alignItems: "center", gap: 10, padding: [24, 28] }}>
            <Text style={{ apply: ["eyebrow"], color: palette.amberLight }}>Show this at check-in</Text>
            <BookingBarcode color={palette.cream} />
            <Text style={{ fontSize: 13, lineHeight: 1.5, color: "#C9D6DE", textAlign: "center" }}>
              Or just give your name — we&rsquo;ll have the key ready either way.
            </Text>
          </Column>
        </Row>
      </Section>

      {/* Footer band. */}
      <Section
        tokens={{ colors: { background: palette.navy, foreground: palette.cream } }}
        style={{ backgroundColor: palette.navy, padding: [32, 48], mobile: { padding: [28, 24] } }}
      >
        <Row style={{ gap: 24, alignItems: "center", justifyContent: "space-between" }}>
          <FooterNote light />
          <Text style={{ fontSize: 13, color: "#C9D6DE", textAlign: "right" }}>
            Booking {booking.code} · {booking.guest.fullName}
          </Text>
        </Row>
      </Section>
    </Page>
  );
}
