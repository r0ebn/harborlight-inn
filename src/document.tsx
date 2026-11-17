/**
 * Harborlight Inn — printable stay voucher (A5 landscape).
 *
 * One page, meant to be printed or shown on a phone at the front desk:
 * the inn and the guest, the stay, the bill, the fine print — and the
 * booking code as a real Code 39 barcode, drawn from Svg rectangles.
 * Renders to print HTML and to PDF (see scripts/build.ts).
 */
import {
  Column,
  Divider,
  Document,
  Heading,
  PageFooter,
  PageNumber,
  Row,
  Table,
  TableCell,
  TableRow,
  Text,
  token,
} from "@hyper-elements/react";
import { balanceCents, booking, finePrint, inn, totalCents, usd } from "./data";
import { harborlightTheme, palette, webFonts } from "./theme";
import { BookingBarcode, StayFactsRow, Wordmark } from "./components";

export default function StayVoucher() {
  return (
    <Document
      size="A5"
      orientation="landscape"
      margin={[28, 40, 22, 40]}
      theme={harborlightTheme}
      title={`Stay voucher ${booking.code} — ${inn.name}`}
      lang="en"
      fonts={webFonts}
      style={{ fontSize: 13, lineHeight: 1.5, gap: 14 }}
    >
      {/* Header: wordmark, voucher title, guest. */}
      <Row style={{ alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        <Wordmark />
        <Column style={{ gap: 2, alignItems: "end" }}>
          <Text style={{ apply: ["eyebrow"], color: palette.amberDeep }}>Stay voucher</Text>
          <Heading level={1} style={{ fontSize: 26, lineHeight: 1.1 }}>
            {booking.guest.fullName}
          </Heading>
          <Text style={{ fontSize: 12, color: token("colors.muted") }}>
            {booking.room.name} · {booking.room.kind} · {booking.guest.adults} adults
          </Text>
        </Column>
      </Row>

      <Divider />

      {/* The stay, then the bill. */}
      <StayFactsRow />

      <Row style={{ gap: 28, alignItems: "start" }}>
        <Column style={{ gap: 8 }}>
          <Text style={{ apply: ["metaLabel"] }}>The bill</Text>
          <Table style={{ cellPadding: [3, 0], rowBorder: { width: 1, style: "solid", color: token("colors.border") } }}>
            {booking.lines.map((line) => (
              <TableRow key={line.label}>
                <TableCell style={{ fontSize: 12.5 }}>{line.label}</TableCell>
                <TableCell style={{ textAlign: "right", fontSize: 12.5, fontWeight: 600 }}>{usd(line.amountCents)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell style={{ fontSize: 12.5 }}>{booking.taxesLabel}</TableCell>
              <TableCell style={{ textAlign: "right", fontSize: 12.5, fontWeight: 600 }}>{usd(booking.taxesCents)}</TableCell>
            </TableRow>
            <TableRow footer>
              <TableCell style={{ fontSize: 13, fontWeight: 700 }}>Total</TableCell>
              <TableCell style={{ textAlign: "right", fontSize: 13, fontWeight: 700 }}>{usd(totalCents)}</TableCell>
            </TableRow>
          </Table>
          <Text style={{ fontSize: 12, color: token("colors.muted") }}>
            Deposit paid {usd(booking.depositCents)} · Balance due at check-in {usd(balanceCents)}
          </Text>
        </Column>
        <Column style={{ width: 240, gap: 6, alignItems: "center" }}>
          <BookingBarcode unit={1} barHeight={44} />
          <Text style={{ fontSize: 11, color: token("colors.muted"), textAlign: "center" }}>
            Present at check-in, with photo ID
          </Text>
        </Column>
      </Row>

      {/* Good to know: three arrival facts, filling the page usefully. */}
      <Row style={{ gap: 20, alignItems: "start" }}>
        {[
          ["Check-in from 3:00 PM", "Main house, blue door."],
          ["Breakfast 7:30–10:00 AM", "Dining room, for two."],
          ["Parking is free", "Gravel lot, carriage house."],
        ].map(([title, body]) => (
          <Column key={title} style={{ gap: 2 }}>
            <Text style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.3, color: palette.navy }}>{title}</Text>
            <Text style={{ fontSize: 11, lineHeight: 1.45, color: token("colors.muted") }}>{body}</Text>
          </Column>
        ))}
      </Row>

      {/* Fine print. */}
      <Column style={{ gap: 4, padding: [10, 0, 0], border: { top: `1px solid ${palette.border}` } }}>
        {finePrint.map((line) => (
          <Text key={line} style={{ fontSize: 9.5, lineHeight: 1.45, color: token("colors.muted") }}>
            {line}
          </Text>
        ))}
      </Column>

      <PageFooter style={{ padding: [8, 0, 0], border: { top: `1px solid ${palette.border}` } }}>
        <Row style={{ gap: 16 }}>
          <Text style={{ fontSize: 9.5, color: token("colors.muted") }}>
            {inn.name} · {inn.addressLines.join(", ")} · {inn.phone} · {inn.email}
          </Text>
          <Text style={{ width: 120, textAlign: "right", fontSize: 9.5, color: token("colors.muted") }}>
            Page <PageNumber /> of <PageNumber total />
          </Text>
        </Row>
      </PageFooter>
    </Document>
  );
}
