import React from "react";
import {
  Column,
  Document,
  Grid,
  Heading,
  LineBreak,
  PageBreak,
  PageFooter,
  PageHeader,
  PageNumber,
  Row,
  Span,
  Table,
  TableCell,
  TableRow,
  Text,
} from "@hyper-elements/react";
import { fontFaces, fonts, marigold, palette } from "./theme";
import { Eyebrow, LabRow, PetalDivider, StatCard } from "./components";
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

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <TableCell style={{ padding: [10, 14] }}>
      <Span
        style={{
          fontSize: 10,
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 700,
          color: palette.marigoldDeep,
        }}
      >
        {label}
      </Span>
      <LineBreak />
      <Span style={{ fontWeight: 600, fontSize: 14, color: palette.ink }}>{value}</Span>
    </TableCell>
  );
}


export default function LabReportDocument() {
  return (
    <Document
      theme={marigold}
      size="A4"
      margin={46}
      title={`Laboratory report — ${patient.fullName} — Marigold Clinic`}
      fonts={fontFaces}
      style={{ gap: 0 }}
    >
      <PageHeader
        style={{
          padding: [0, 0, 10],
          border: { bottom: { width: 2, style: "solid", color: palette.marigold } },
        }}
      >
        <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
          <Text
            style={{
              fontFamily: fonts.heading,
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: 1,
              color: palette.pine,
            }}
          >
            MARIGOLD <Span style={{ fontStyle: "italic", color: palette.marigoldDeep }}>CLINIC</Span>
          </Text>
          <Text
            style={{
              fontSize: 10,
              letterSpacing: 2,
              textTransform: "uppercase",
              fontWeight: 700,
              color: palette.muted,
            }}
          >
            Laboratory report · {appointment.reportDate}
          </Text>
        </Row>
      </PageHeader>

      <PageFooter
        style={{
          padding: [10, 0, 0],
          border: { top: { width: 1, style: "solid", color: palette.sandLine } },
        }}
      >
        <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ fontSize: 9, color: palette.muted }}>
            {disclaimer} {clinic.name} · {clinic.address}
          </Text>
          <Text style={{ fontSize: 9, fontWeight: 600, color: palette.muted }}>
            Page <PageNumber /> of <PageNumber total />
          </Text>
        </Row>
      </PageFooter>

      {/* ——— Page 1 ——— */}
      <Column style={{ gap: 18 }}>
        <Column style={{ gap: 7 }}>
          <Eyebrow>Laboratory report · Panel of {labs.length}</Eyebrow>
          <Heading level={1} style={{ fontSize: 36, color: palette.pine }}>
            {patient.firstName}'s results,{" "}
            <Span style={{ fontStyle: "italic", color: palette.marigoldDeep }}>in full</Span>.
          </Heading>
          <Text style={{ fontSize: 14, color: palette.muted }}>
            {inRangeCount} of {labs.length} results sit in range. {flaggedLabs.length} —{" "}
            {flaggedLabs.map((l) => l.name.toLowerCase()).join(" and ")} — ask for a little
            tending, and your care plan on page two is built for them.
          </Text>
        </Column>

        <Table
          style={{
            backgroundColor: palette.creamBright,
            border: { width: 1, style: "solid", color: palette.sandLine },
            cellPadding: 0,
            rowBorder: { width: 1, style: "solid", color: palette.sandLine },
          }}
        >
          <TableRow>
            <MetaCell label="Patient" value={`${patient.fullName}, ${patient.age}`} />
            <MetaCell label="Doctor" value={`${doctor.name} · ${doctor.role}`} />
          </TableRow>
          <TableRow>
            <MetaCell label="Sample taken" value={appointment.sampleDate} />
            <MetaCell label="Patient ID" value={patient.id} />
          </TableRow>
        </Table>

        <Column
          style={{
            border: { width: 1, style: "solid", color: palette.sandLine },
            borderRadius: 16,
            padding: [8, 20],
            backgroundColor: palette.creamBright,
          }}
        >
          <Row
            style={{
              gap: 18,
              padding: [10, 2],
              border: { bottom: { width: 2, style: "solid", color: palette.pine } },
            }}
          >
            <Column style={{ width: 178 }}>
              <Text style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, color: palette.muted }}>
                Test
              </Text>
            </Column>
            <Column style={{ width: 104 }}>
              <Text style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, color: palette.muted }}>
                Result
              </Text>
            </Column>
            <Column style={{ flex: 1 }}>
              <Text style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, color: palette.muted }}>
                Where it sits
              </Text>
            </Column>
            <Column style={{ width: 106, alignItems: "end" }}>
              <Text style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, color: palette.muted }}>
                Status
              </Text>
            </Column>
          </Row>
          {labs.map((l) => (
            <LabRow key={l.name} labResult={l} barWidth={196} />
          ))}
        </Column>

        <Text style={{ fontSize: 11, color: palette.muted }}>
          How to read the bars: the sand track is the scale, the sage band is the reference
          range, and the marker is your result — pine when it rests in range, terracotta when
          it needs tending. Every position is calculated from your values, never placed by hand.
        </Text>
      </Column>

      <PageBreak />

      {/* ——— Page 2 ——— */}
      <Column style={{ gap: 20 }}>
        <Column style={{ gap: 7 }}>
          <Eyebrow>Page two · The whole picture</Eyebrow>
          <Heading level={2} style={{ fontSize: 30, color: palette.pine }}>
            Vitals, meaning &amp; <Span style={{ fontStyle: "italic", color: palette.marigoldDeep }}>the plan</Span>
          </Heading>
        </Column>

        <Grid columns={3} style={{ gap: 12, rowGap: 12 }}>
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
              Results in range
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
              {inRangeCount}{" "}
              <Span style={{ fontFamily: fonts.body, fontSize: 14, fontWeight: 500, fontStyle: "normal", color: palette.sage }}>
                of {labs.length}
              </Span>
            </Text>
            <Text style={{ fontSize: 13, fontWeight: 600, color: palette.marigoldLight }}>
              {flaggedLabs.map((l) => l.name).join(" · ")} to tend
            </Text>
          </Column>
        </Grid>

        <Column style={{ gap: 10 }}>
          <Heading level={3} style={{ fontSize: 20, color: palette.pine }}>
            What this <Span style={{ fontStyle: "italic", color: palette.marigoldDeep }}>means</Span>
          </Heading>
          <Text style={{ fontSize: 14 }}>{doctorNote}</Text>
        </Column>

        <Row style={{ justifyContent: "center" }}>
          <PetalDivider />
        </Row>

        <Column style={{ gap: 10 }}>
          <Heading level={3} style={{ fontSize: 20, color: palette.pine }}>
            Your care plan
          </Heading>
          <Column style={{ gap: 12 }}>
            {carePlan.map((step, i) => (
              <Row key={step.title} style={{ gap: 16 }}>
                <Text
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: 26,
                    fontWeight: 600,
                    fontStyle: "italic",
                    color: palette.marigoldDeep,
                    lineHeight: 1.1,
                    width: 34,
                  }}
                >
                  {i + 1}.
                </Text>
                <Column style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14 }}>
                    <Span style={{ fontWeight: 700 }}>{step.title} — </Span>
                    {step.text}
                  </Text>
                </Column>
              </Row>
            ))}
          </Column>
        </Column>

        <Column
          style={{
            backgroundColor: palette.pine,
            borderRadius: 18,
            padding: [22, 26],
            gap: 6,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              letterSpacing: 2,
              textTransform: "uppercase",
              fontWeight: 700,
              color: palette.marigoldLight,
            }}
          >
            Follow-up appointment
          </Text>
          <Text style={{ fontFamily: fonts.heading, fontSize: 24, fontWeight: 600, fontStyle: "italic", color: palette.cream }}>
            {followUp.dateLong} · {followUp.time}
          </Text>
          <Text style={{ fontSize: 13, color: palette.sand }}>
            {followUp.note} · with {doctor.name}, {clinic.name}
          </Text>
        </Column>

        <Column style={{ gap: 2, padding: [6, 0, 0] }}>
          <Text style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 600, fontStyle: "italic", color: palette.ink }}>
            {doctor.name}
          </Text>
          <Text style={{ fontSize: 12, color: palette.muted }}>
            {doctor.role} · {clinic.name} · {clinic.phone}
          </Text>
        </Column>
      </Column>
    </Document>
  );
}
