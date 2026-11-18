import React from "react";
import {
  Column,
  Grid,
  Heading,
  LineBreak,
  Page,
  Row,
  Section,
  Span,
  Text,
} from "@hyper-elements/react";
import { fontFaces, fonts, marigold, palette } from "./theme";
import {
  Eyebrow,
  LabRow,
  HeroArt,
  MarigoldFlower,
  PetalDivider,
  PulseLine,
  StatCard,
  Wordmark,
} from "./components";
import {
  appointment,
  carePlan,
  clinic,
  disclaimer,
  doctor,
  doctorNote,
  flaggedLabs,
  followUp,
  inRangeCount,
  labs,
  patient,
  vitals,
} from "./data";

export default function VisitSummaryPage() {
  return (
    <Page
      theme={marigold}
      width={1120}
      title={`${patient.firstName}'s visit summary — Marigold Clinic`}
      description="A patient visit summary from Marigold Clinic: vitals, lab highlights, a care plan and a note from your doctor."
      fonts={fontFaces}
      style={{ gap: 0 }}
    >
      {/* ——— Hero ——— */}
      <Section style={{ backgroundColor: palette.pine, padding: [56, 48, 64] }}>
        <Row style={{ gap: 48, alignItems: "center" }}>
          <Column style={{ flex: 1.35, gap: 20 }}>
            <Wordmark onDark />
            <Eyebrow onDark>Visit summary · {appointment.dateLong}</Eyebrow>
            <Heading level={1} style={{ fontSize: 58, color: palette.cream, lineHeight: 1.05 }}>
              Care, in{" "}
              <Span style={{ fontStyle: "italic", color: palette.marigoldLight }}>full bloom</Span>,
              <LineBreak />
              {patient.firstName}.
            </Heading>
            <Text style={{ color: palette.sand, fontSize: 17, maxWidth: 520 }}>
              Everything from your visit with {doctor.name} in one place — your numbers, your
              results, and the small plan we made together.
            </Text>
            <Row style={{ gap: 12 }}>
              <Column
                style={{
                  backgroundColor: palette.marigold,
                  borderRadius: 999,
                  padding: [9, 18],
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: 700, fontSize: 13, color: palette.pineDeep }}>
                  {appointment.dateLong} · {appointment.time}
                </Text>
              </Column>
              <Column
                style={{
                  border: { width: 1, style: "solid", color: palette.moss },
                  borderRadius: 999,
                  padding: [9, 18],
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: 600, fontSize: 13, color: palette.cream }}>{appointment.type}</Text>
              </Column>
            </Row>
          </Column>
          <Column style={{ flex: 1, alignItems: "center" }}>
            <HeroArt width={400} />
          </Column>
        </Row>
      </Section>

      {/* ——— Pulse band ——— */}
      <Section style={{ backgroundColor: palette.cream, padding: [30, 48, 6] }}>
        <Column style={{ alignItems: "center", gap: 10 }}>
          <PulseLine width={880} />
          <Eyebrow center>
            {inRangeCount} of {labs.length} results in range · {flaggedLabs.length} to tend together
          </Eyebrow>
        </Column>
      </Section>

      {/* ——— Vitals ——— */}
      <Section style={{ backgroundColor: palette.cream, padding: [44, 48, 20] }}>
        <Column style={{ gap: 22 }}>
          <Column style={{ gap: 8 }}>
            <Eyebrow>At your visit</Eyebrow>
            <Heading level={2} style={{ fontSize: 34, color: palette.pine }}>
              Today, in <Span style={{ fontStyle: "italic", color: palette.marigoldDeep }}>numbers</Span>
            </Heading>
          </Column>
          <Grid columns={3} style={{ gap: 18, rowGap: 18 }}>
            {vitals.map((v) => (
              <StatCard key={v.label} vital={v} />
            ))}
            <Column
              style={{
                backgroundColor: palette.pine,
                borderRadius: 20,
                padding: 24,
                gap: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  fontWeight: 700,
                  color: palette.marigoldLight,
                }}
              >
                Results to watch
              </Text>
              <Text
                style={{
                  fontFamily: fonts.heading,
                  fontSize: 38,
                  fontWeight: 600,
                  fontStyle: "italic",
                  lineHeight: 1.05,
                  color: palette.cream,
                }}
              >
                {flaggedLabs.length}{" "}
                <Span style={{ fontFamily: fonts.body, fontSize: 14, fontWeight: 500, fontStyle: "normal", color: palette.sage }}>
                  of {labs.length}
                </Span>
              </Text>
              <Text style={{ fontSize: 13, fontWeight: 600, color: palette.marigoldLight }}>
                {flaggedLabs.map((l) => l.name).join(" · ")}
              </Text>
            </Column>
          </Grid>
        </Column>
      </Section>

      {/* ——— Lab highlights ——— */}
      <Section style={{ backgroundColor: palette.sand, padding: [52, 48] }}>
        <Column style={{ gap: 10 }}>
          <Eyebrow>Lab highlights</Eyebrow>
          <Heading level={2} style={{ fontSize: 34, color: palette.pine }}>
            Where every result <Span style={{ fontStyle: "italic", color: palette.marigoldDeep }}>sits</Span>
          </Heading>
          <Text style={{ color: palette.muted, fontSize: 15, maxWidth: 640 }}>
            The sage band is the reference range; the marker is you. Two markers rest just
            outside — those are the two we tend in your care plan.
          </Text>
          <Column
            style={{
              backgroundColor: palette.creamBright,
              border: { width: 1, style: "solid", color: palette.sandLine },
              borderRadius: 22,
              padding: [14, 26],
            }}
          >
            {labs.map((l) => (
              <LabRow key={l.name} labResult={l} barWidth={330} />
            ))}
          </Column>
        </Column>
      </Section>

      {/* ——— Care plan ——— */}
      <Section style={{ backgroundColor: palette.pine, padding: [56, 48] }}>
        <Column style={{ gap: 26 }}>
          <Column style={{ gap: 8 }}>
            <Eyebrow onDark>Your care plan</Eyebrow>
            <Heading level={2} style={{ fontSize: 34, color: palette.cream }}>
              Three small <Span style={{ fontStyle: "italic", color: palette.marigoldLight }}>tendings</Span>
            </Heading>
          </Column>
          <Grid columns={3} style={{ gap: 18, rowGap: 18 }}>
            {carePlan.map((step, i) => (
              <Column
                key={step.title}
                style={{
                  backgroundColor: palette.pineDeep,
                  border: { width: 1, style: "solid", color: palette.moss },
                  borderRadius: 20,
                  padding: 26,
                  gap: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: 34,
                    fontWeight: 600,
                    fontStyle: "italic",
                    color: palette.marigold,
                    lineHeight: 1,
                  }}
                >
                  {`0${i + 1}`}
                </Text>
                <Text style={{ fontWeight: 700, fontSize: 16, color: palette.cream }}>{step.title}</Text>
                <Text style={{ fontSize: 14, color: palette.sand }}>{step.text}</Text>
              </Column>
            ))}
          </Grid>
          <Row style={{ justifyContent: "center" }}>
            <PetalDivider onDark />
          </Row>
          <Text style={{ textAlign: "center", color: palette.cream, fontSize: 16 }}>
            Follow-up —{" "}
            <Span style={{ fontFamily: fonts.heading, fontStyle: "italic", fontSize: 19, color: palette.marigoldLight }}>
              {followUp.dateLong}, {followUp.time}
            </Span>{" "}
            · {followUp.note}
          </Text>
        </Column>
      </Section>

      {/* ——— Doctor's note ——— */}
      <Section style={{ backgroundColor: palette.cream, padding: [56, 48] }}>
        <Row style={{ gap: 40 }}>
          <Column style={{ width: 150, alignItems: "center", gap: 10 }}>
            <MarigoldFlower size={92} />
            <Eyebrow center>A note from</Eyebrow>
          </Column>
          <Column style={{ flex: 1, gap: 16 }}>
            <Text
              style={{
                fontFamily: fonts.heading,
                fontSize: 23,
                fontWeight: 400,
                fontStyle: "italic",
                lineHeight: 1.5,
                color: palette.pine,
              }}
            >
              “{doctorNote}”
            </Text>
            <Column style={{ gap: 1 }}>
              <Text style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 600, fontStyle: "italic", color: palette.ink }}>
                {doctor.name}
              </Text>
              <Text style={{ fontSize: 13, color: palette.muted }}>
                {doctor.role} · {clinic.name}
              </Text>
            </Column>
          </Column>
        </Row>
      </Section>

      {/* ——— Footer ——— */}
      <Section style={{ backgroundColor: palette.pine, padding: [30, 48, 36] }}>
        <Column style={{ gap: 10, alignItems: "center" }}>
          <Wordmark onDark />
          <Text style={{ fontSize: 12, color: palette.sage, textAlign: "center" }}>
            {clinic.name} · {clinic.address} · {clinic.phone}
          </Text>
          <Text style={{ fontSize: 12, color: palette.sage, textAlign: "center" }}>{disclaimer}</Text>
        </Column>
      </Section>
    </Page>
  );
}

