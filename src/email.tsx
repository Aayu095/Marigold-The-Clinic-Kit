import React from "react";
import {
  Button,
  Column,
  Divider,
  Email,
  Grid,
  Heading,
  Link,
  List,
  ListItem,
  Row,
  Section,
  Span,
  Text,
} from "@hyper-elements/react";
import { marigold, palette } from "./theme";
import { EmailWordmark, Eyebrow } from "./components";
import { appointment, clinic, doctor, patient } from "./data";

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <Column style={{ gap: 3 }}>
      <Text
        style={{
          fontSize: 10,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 700,
          color: palette.marigoldDeep,
        }}
      >
        {label}
      </Text>
      <Text style={{ fontWeight: 600, fontSize: 15, color: palette.ink }}>{value}</Text>
    </Column>
  );
}

export default function AppointmentEmail() {
  return (
    <Email
      theme={marigold}
      width={600}
      title="Your Marigold Clinic visit is confirmed"
      previewText={`Your visit is confirmed — ${appointment.dateLong}, ${appointment.time} with ${doctor.name}.`}
      style={{ gap: 0 }}
    >
      {/* Pine hero */}
      <Section style={{ backgroundColor: palette.pine, padding: [40, 40, 36] }}>
        <Column style={{ gap: 18 }}>
          <EmailWordmark onDark />
          <Text
            style={{
              fontSize: 10,
              letterSpacing: 2,
              textTransform: "uppercase",
              fontWeight: 700,
              color: palette.marigoldLight,
            }}
          >
            Appointment <Span style={{ color: palette.cream }}>confirmed</Span>
          </Text>
          <Heading level={1} style={{ fontSize: 37, color: palette.cream, lineHeight: 1.15 }}>
            See you soon,{" "}
            <Span style={{ fontStyle: "italic", color: palette.marigoldLight }}>{patient.firstName}</Span>.
          </Heading>
          <Text style={{ color: palette.sand, fontSize: 15 }}>
            Your annual review is booked, and {doctor.shortName} has already read your latest results — so
            your visit can be a conversation, not a queue.
          </Text>
        </Column>
      </Section>

      {/* Arch-topped appointment card */}
      <Section style={{ backgroundColor: palette.cream, padding: [36, 40, 8] }}>
        <Column
          style={{
            backgroundColor: palette.creamBright,
            border: { width: 1, style: "solid", color: palette.sandLine },
            borderRadius: [110, 110, 22, 22],
            padding: [38, 36, 30],
            gap: 20,
            alignItems: "center",
          }}
        >
          <Eyebrow center>{appointment.weekday} · {appointment.month} {appointment.year}</Eyebrow>
          <Text
            style={{
              fontFamily: "Fraunces, Georgia, serif",
              fontSize: 84,
              fontWeight: 600,
              fontStyle: "italic",
              lineHeight: 1,
              color: palette.pine,
              textAlign: "center",
            }}
          >
            {appointment.day}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: 600, color: palette.ink, textAlign: "center" }}>
            {appointment.time} — {appointment.type}
          </Text>
          <Divider style={{ width: 120, borderTop: { width: 2, style: "solid", color: palette.marigold } }} />
          <Grid columns={2} style={{ gap: 18, rowGap: 18 }}>
            <Fact label="Doctor" value={`${doctor.name} · ${doctor.role}`} />
            <Fact label="Visit" value={appointment.type} />
            <Fact label="Where" value={clinic.address} />
            <Fact label="Patient" value={`${patient.fullName}, ${patient.age}`} />
          </Grid>
        </Column>
      </Section>

      {/* Before your visit */}
      <Section style={{ backgroundColor: palette.cream, padding: [28, 40, 8] }}>
        <Column style={{ gap: 14 }}>
          <Eyebrow>Before your visit</Eyebrow>
          <Heading level={2} style={{ fontSize: 24, color: palette.pine }}>
            Three small things to <Span style={{ fontStyle: "italic", color: palette.marigoldDeep }}>bring along</Span>
          </Heading>
          <List>
            <ListItem>Arrive ten minutes early — the marigold tea is worth it.</ListItem>
            <ListItem>Bring your photo ID and insurance card for the front desk.</ListItem>
            <ListItem>Nothing to print: your lab report is already with {doctor.shortName}.</ListItem>
          </List>
          <Row style={{ justifyContent: "center", padding: [10, 0, 2] }}>
            <Button href="https://marigold-the-clinic-kit.vercel.app/visit-summary.html">View your visit summary</Button>
          </Row>
          <Text style={{ fontSize: 13, color: palette.muted, textAlign: "center" }}>
            Need to move it?{" "}
            <Link href="https://marigold-the-clinic-kit.vercel.app/" style={{ color: palette.moss, fontWeight: 600 }}>
              Reschedule your visit
            </Link>{" "}
            — no fees, no fuss.
          </Text>
        </Column>
      </Section>

      {/* Footer */}
      <Section style={{ backgroundColor: palette.pine, padding: [28, 40, 32] }}>
        <Column style={{ gap: 8, alignItems: "center" }}>
          <Text style={{ fontSize: 13, color: palette.cream, textAlign: "center", fontWeight: 600 }}>
            {clinic.name} · {clinic.address} · {clinic.phone}
          </Text>
          <Text style={{ fontSize: 12, color: palette.sage, textAlign: "center" }}>
            Care, in full bloom. This is a sample template — all names and details are fictional.
          </Text>
        </Column>
      </Section>
    </Email>
  );
}
