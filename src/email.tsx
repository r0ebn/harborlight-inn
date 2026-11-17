/**
 * Harborlight Inn — booking confirmation email (600px).
 *
 * Warm welcome, stay summary as a table, a dark ticket-style card with the
 * booking code, a manage-booking button, and what to expect on arrival.
 * No Svg here: email clients can't draw it, so the email leans on the
 * theme's colors, the serif display type and the ticket card instead.
 * The plain-text twin comes from the same render — see scripts/build.ts.
 */
import {
  Button,
  Column,
  Divider,
  Email,
  Heading,
  Link,
  List,
  ListItem,
  Row,
  Section,
  Span,
  Table,
  TableCell,
  TableRow,
  Text,
  token,
} from "@hyper-elements/react";
import { arrivalNotes, balanceCents, booking, inn, subtotalCents, totalCents, usd } from "./data";
import { harborlightTheme, palette, webFonts } from "./theme";
import { FooterNote, StayFacts, Wordmark } from "./components";

const manageHref = booking.manageHref;

export default function ConfirmationEmail() {
  return (
    <Email
      width={600}
      theme={harborlightTheme}
      title={`Your stay is confirmed — ${inn.name}`}
      previewText={`${booking.guest.firstName}, your ${booking.nights}-night stay in the ${booking.room.name} is booked. Booking ${booking.code}.`}
      lang="en"
      fonts={webFonts}
      style={{ gap: 0 }}
    >
      {/* Header band: wordmark, then the welcome. */}
      <Section
        tokens={{ colors: { background: palette.navy, foreground: palette.cream } }}
        style={{ backgroundColor: palette.navy, padding: [36, 40, 40], gap: 32, mobile: { padding: [28, 24, 32] } }}
      >
        <Row style={{ alignItems: "center" }}>
          <Wordmark light />
          <Text style={{ apply: ["eyebrow"], color: palette.amberLight, textAlign: "right", mobile: { textAlign: "left" } }}>
            Booking confirmed
          </Text>
        </Row>
        <Column style={{ gap: 14 }}>
          <Heading level={1} style={{ color: palette.cream }}>
            See you at the water&rsquo;s edge, {booking.guest.firstName}.
          </Heading>
          <Text style={{ fontSize: 17, lineHeight: 1.6, color: "#D8E2E8" }}>
            Your {booking.nights}-night stay in the {booking.room.name} is booked, the kettle will be on, and the
            lighthouse will be doing its slow sweep over the cove. Everything you need is below.
          </Text>
        </Column>
      </Section>

      {/* Stay summary. */}
      <Section style={{ padding: [32, 40], gap: 24, mobile: { padding: [24, 24] } }}>
        <Column style={{ apply: ["card"] }}>
          <Text style={{ apply: ["eyebrow"], color: palette.amberDeep }}>Your stay</Text>
          <StayFacts columns={2} />
          <Divider />
          <Table style={{ cellPadding: [7, 0], rowBorder: { width: 1, style: "solid", color: token("colors.border") } }}>
            <TableRow header>
              <TableCell>Room &amp; extras</TableCell>
              <TableCell style={{ textAlign: "right" }}>Price</TableCell>
            </TableRow>
            {booking.lines.map((line) => (
              <TableRow key={line.label}>
                <TableCell>
                  {line.label}
                  <Span style={{ color: token("colors.muted") }}> · {line.detail}</Span>
                </TableCell>
                <TableCell style={{ textAlign: "right", fontWeight: 600 }}>{usd(line.amountCents)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>{booking.taxesLabel}</TableCell>
              <TableCell style={{ textAlign: "right", fontWeight: 600 }}>{usd(booking.taxesCents)}</TableCell>
            </TableRow>
            <TableRow footer>
              <TableCell style={{ fontWeight: 700 }}>Total</TableCell>
              <TableCell style={{ textAlign: "right", fontWeight: 700 }}>{usd(totalCents)}</TableCell>
            </TableRow>
          </Table>
          <Row style={{ gap: 16 }}>
            <Text style={{ fontSize: 14, color: token("colors.muted") }}>
              Subtotal {usd(subtotalCents)} · Deposit paid {usd(booking.depositCents)}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: 600, textAlign: "right" }}>Balance due at check-in: {usd(balanceCents)}</Text>
          </Row>
        </Column>

        {/* Ticket card: the booking code, big and mono. */}
        <Column
          style={{
            apply: ["darkCard"],
            alignItems: "center",
            textAlign: "center",
            padding: [32, 28],
            gap: 12,
            border: { top: `3px dashed ${palette.amber}` },
          }}
        >
          <Text style={{ apply: ["eyebrow"], color: palette.amberLight }}>Your booking code</Text>
          <Text
            style={{
              fontFamily: token("fonts.mono"),
              fontSize: 30,
              fontWeight: 500,
              letterSpacing: 4,
              lineHeight: 1.2,
              color: palette.cream,
              mobile: { fontSize: 24, letterSpacing: 2 },
            }}
          >
            {booking.code}
          </Text>
          <Text style={{ fontSize: 14, lineHeight: 1.5, color: "#C9D6DE" }}>
            Show this code at the front desk — no printout needed. Or keep the voucher attached to your arrival page.
          </Text>
          <Button href={manageHref} variant="amber" style={{ alignSelf: "center" }}>
            Manage your booking
          </Button>
        </Column>

        {/* Before you arrive. */}
        <Column style={{ gap: 12 }}>
          <Text style={{ apply: ["eyebrow"], color: palette.amberDeep }}>Before you arrive</Text>
          <List style={{ gap: 10, fontSize: 15, lineHeight: 1.55, indent: 20 }}>
            {arrivalNotes.map((note) => (
              <ListItem key={note.title}>
                <Span style={{ fontWeight: 700 }}>{note.title}. </Span>
                {note.body}
              </ListItem>
            ))}
          </List>
        </Column>

        <Column style={{ gap: 6 }}>
          <Text style={{ fontSize: 15, lineHeight: 1.6 }}>
            Questions before then? Reply to this email or call us at{" "}
            <Link href={inn.phoneHref}>{inn.phone}</Link> — a person answers, usually on the second ring.
          </Text>
          <Text style={{ fontSize: 15, color: token("colors.muted") }}>Warmly, the Harborlight Inn team</Text>
        </Column>

        <Divider />

        <Column style={{ gap: 10 }}>
          <FooterNote />
          <Text style={{ fontSize: 12, lineHeight: 1.6, color: token("colors.muted") }}>
            You&rsquo;re receiving this because you booked a stay at {inn.name}. Manage your booking any time at{" "}
            <Link href={manageHref} style={{ color: token("colors.muted") }}>
              {inn.site}/manage
            </Link>
            .
          </Text>
        </Column>
      </Section>
    </Email>
  );
}
